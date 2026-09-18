export interface ModelProviderConfig {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  maxTokens: number;
  timeoutMs: number;
  reasoningEffort?: "low";
  isZhipu?: boolean;
}

export interface RouterCompletionResult {
  text: string;
  usedModel: string;
  providerName: string;
}

export type StatusCallback = (statusMessage: string) => void;

class MultiModelRouter {
  // Provider-level concurrency locks (mutex) to avoid concurrent calls on single free keys
  private providerQueues: Map<string, Promise<void>> = new Map();

  private enqueue<T>(providerId: string, task: () => Promise<T>): Promise<T> {
    const previous = this.providerQueues.get(providerId) || Promise.resolve();
    const run = previous.catch(() => undefined).then(task);
    const tail = run.then(() => undefined, () => undefined);
    this.providerQueues.set(providerId, tail);
    void tail.finally(() => {
      if (this.providerQueues.get(providerId) === tail) {
        this.providerQueues.delete(providerId);
      }
    });
    return run;
  }

  public getProviders(): ModelProviderConfig[] {
    const providers: ModelProviderConfig[] = [];

    // Gemini is the fast primary path. Its OpenAI-compatible endpoint lets the
    // rest of the failover pipeline keep one request/response contract.
    const geminiKey = process.env.GEMINI_API_KEY?.trim() || "";
    if (geminiKey) {
      providers.push({
        id: "gemini-2.5-flash",
        name: "Google Gemini 2.5 Flash",
        baseUrl: process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai",
        apiKey: geminiKey,
        model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
        maxTokens: parsePositiveInteger(process.env.GEMINI_MAX_TOKENS, 16_384),
        timeoutMs: 90_000,
        reasoningEffort: "low",
      });
    }

    // First fallback: the newer GLM account/model.
    const zhipuKey2 = process.env.GLM_API_KEY_2 || "";
    if (zhipuKey2) {
      providers.push({
        id: "zhipu-acc-2",
        name: "Zhipu AI (GLM-4.7-Flash / Acc 2)",
        baseUrl: process.env.GLM_BASE_URL || "https://open.bigmodel.cn/api/paas/v4",
        apiKey: zhipuKey2,
        model: process.env.GLM_MODEL_2 || "glm-4.7-flash",
        maxTokens: parsePositiveInteger(process.env.GLM_MAX_TOKENS, 16_384),
        timeoutMs: 120_000,
        isZhipu: true,
      });
    }

    // Final fallback: the older GLM flash model.
    const zhipuKey1 = process.env.GLM_API_KEY || "";
    if (zhipuKey1) {
      providers.push({
        id: "zhipu-acc-1",
        name: "Zhipu AI (GLM-4.5-Flash)",
        baseUrl: process.env.GLM_BASE_URL || "https://open.bigmodel.cn/api/paas/v4",
        apiKey: zhipuKey1,
        model: process.env.GLM_MODEL || "glm-4.5-flash",
        maxTokens: parsePositiveInteger(process.env.GLM_MAX_TOKENS, 16_384),
        timeoutMs: 120_000,
        isZhipu: true,
      });
    }

    return providers;
  }

  public async complete(
    messages: Array<{ role: string; content: string }>,
    onStatus?: StatusCallback
  ): Promise<RouterCompletionResult> {
    const providers = this.getProviders();

    if (providers.length === 0) {
      throw new Error(
        "No AI API keys configured. Add GEMINI_API_KEY, GLM_API_KEY_2, or GLM_API_KEY."
      );
    }

    const errors: string[] = [];

    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i];
      const isLast = i === providers.length - 1;

      console.log(`[MultiModelRouter] Attempting provider [${provider.name}] (${provider.model})...`);

      try {
        const payload: Record<string, unknown> = {
          model: provider.model,
          messages,
          temperature: 0.2,
          max_tokens: provider.maxTokens,
        };

        if (provider.isZhipu) {
          payload.thinking = { type: "disabled" };
        }
        if (provider.reasoningEffort) {
          payload.reasoning_effort = provider.reasoningEffort;
        }

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${provider.apiKey}`,
        };

        const res: Response = await this.enqueue(provider.id, () =>
          fetch(`${provider.baseUrl.replace(/\/$/, "")}/chat/completions`, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(provider.timeoutMs),
          })
        );

        if (res.ok) {
          const json = await res.json() as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const text = json.choices?.[0]?.message?.content || "";
          if (!text || text.trim().length === 0) {
            throw new Error("Received empty response body from provider");
          }

          console.log(`[MultiModelRouter] Provider [${provider.name}] succeeded! Generated ${text.length} chars.`);
          return {
            text,
            usedModel: provider.model,
            providerName: provider.name,
          };
        }

        // Handle error responses
        const rawErr = await res.text();
        let errMsg = `Request failed (${res.status})`;
        let isTrafficSpike = false;
        let isRateLimit = false;

        try {
          const parsed = JSON.parse(rawErr) as { error?: { code?: string | number; message?: string } };
          const code = String(parsed.error?.code || "");
          const msg = String(parsed.error?.message || "");

          if (code === "1305" || msg.includes("访问量过大") || res.status === 503) {
            isTrafficSpike = true;
            errMsg = `Traffic spike on ${provider.model} (1305: 该模型当前访问量过大)`;
          } else if (code === "1302" || res.status === 429) {
            isRateLimit = true;
            errMsg = `Rate limit reached on ${provider.model} (429/1302)`;
          } else if (parsed.error?.message) {
            errMsg = parsed.error.message;
          }
        } catch {
          if (rawErr.trim()) errMsg = rawErr.trim().slice(0, 300);
        }

        const errSummary = `Provider [${provider.name}] HTTP ${res.status}: ${errMsg}`;
        console.warn(`[MultiModelRouter] ${errSummary}`);
        errors.push(errSummary);

        if (!isLast) {
          const nextProvider = providers[i + 1];
          const reason = isTrafficSpike
            ? "traffic spike"
            : isRateLimit
            ? "rate limit"
            : "busy server";

          const failoverMsg = `⚡ Switched from ${provider.name} (${reason}) to ${nextProvider.name}...`;
          console.log(`[MultiModelRouter] ${failoverMsg}`);
          onStatus?.(failoverMsg);
        }
      } catch (err: unknown) {
        const detail = err instanceof Error ? err.message : String(err);
        const netErr = `Provider [${provider.name}] exception: ${detail}`;
        console.warn(`[MultiModelRouter] ${netErr}`);
        errors.push(netErr);

        if (!isLast) {
          const nextProvider = providers[i + 1];
          const failoverMsg = `⚡ Network retry: connecting to ${nextProvider.name}...`;
          console.log(`[MultiModelRouter] ${failoverMsg}`);
          onStatus?.(failoverMsg);
        }
      }
    }

    throw new Error(
      `All configured AI providers failed:\n` + errors.map((e) => `• ${e}`).join("\n")
    );
  }
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const candidate = value?.trim() || "";
  if (!/^\d+$/.test(candidate)) return fallback;
  const parsed = Number(candidate);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export const multiModelRouter = new MultiModelRouter();
