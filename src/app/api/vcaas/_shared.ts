import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyFirebaseToken } from "@/lib/firebase-admin";
import { userOwnsProject } from "@/lib/project-ownership";
import { isLocalOrchestratorEnabled } from "@/lib/orchestrator-mode";
import { localProjectStore } from "@/lib/local-orchestrator/project-store";

export { isRoutableProjectSlug } from "@/lib/project-slug";

const SESSION_COOKIE = "bigbag_session";

export interface VcaasContext {
  accountUserId: string;
}

export interface VcaasTeamContext {
  userId: string;
}

export interface VcaasAuthOk {
  ok: true;
  ctx: VcaasContext;
  team: VcaasTeamContext;
}

export type VcaasAuthResult = VcaasAuthOk | { ok: false; response: NextResponse };
export type VcaasAuthFailed = Extract<VcaasAuthResult, { ok: false }>;

export function authFailed(result: VcaasAuthResult): result is VcaasAuthFailed {
  return result.ok === false;
}

function authResponse(status: 401 | 403 | 503, error: string, code: string) {
  return NextResponse.json({ ok: false, error, code, data: null }, { status });
}

export async function resolveVcaasContext(): Promise<VcaasAuthResult> {
  if (isLocalOrchestratorEnabled() && !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    const userId = "local-developer";
    return { ok: true, ctx: { accountUserId: userId }, team: { userId } };
  }

  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) {
    return { ok: false, response: authResponse(401, "Sign in to continue", "UNAUTHENTICATED") };
  }

  try {
    const decoded = await verifyFirebaseToken(token);
    return {
      ok: true,
      ctx: { accountUserId: decoded.uid },
      team: { userId: decoded.uid },
    };
  } catch {
    return { ok: false, response: authResponse(401, "Your session has expired", "SESSION_EXPIRED") };
  }
}

export async function enforceProjectScope(
  team: VcaasTeamContext,
  _method: string,
  path: string[],
): Promise<NextResponse | null> {
  if (path[0] !== "projects" || !path[1] || path[1] === "launch") return null;

  try {
    const allowed = isLocalOrchestratorEnabled()
      ? localProjectStore.isOwnedBy(path[1], team.userId)
      : await userOwnsProject(path[1], team.userId);

    return allowed
      ? null
      : authResponse(403, "You do not have access to this project", "PROJECT_FORBIDDEN");
  } catch {
    return authResponse(503, "Project access checks are temporarily unavailable", "OWNERSHIP_UNAVAILABLE");
  }
}
