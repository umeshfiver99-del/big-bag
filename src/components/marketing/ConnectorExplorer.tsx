"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { connectorCategories, connectors, type ConnectorCategory } from "@/lib/connectors";
import { ConnectorLogo } from "./ConnectorLogo";

export function ConnectorExplorer({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ConnectorCategory | "All">("All");
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return connectors.filter((connector) =>
      (category === "All" || connector.category === category)
      && (!normalized || `${connector.name} ${connector.description} ${connector.category}`.toLowerCase().includes(normalized)),
    ).slice(0, compact ? 12 : undefined);
  }, [category, compact, query]);

  return (
    <div className="connector-explorer">
      {!compact && (
        <div className="connector-tools">
          <label className="connector-search">
            <Search className="size-4" aria-hidden="true" />
            <span className="sr-only">Search connectors</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search 99 connectors" />
            {query && <button onClick={() => setQuery("")} aria-label="Clear search"><X className="size-4" /></button>}
          </label>
          <div className="connector-filters" role="group" aria-label="Connector category">
            <button aria-pressed={category === "All"} onClick={() => setCategory("All")}>All</button>
            {connectorCategories.map((item) => (
              <button key={item.name} aria-pressed={category === item.name} onClick={() => setCategory(item.name)}>{item.name}</button>
            ))}
          </div>
        </div>
      )}
      <div className="connector-grid">
        {visible.map((connector) => (
          <a key={`${connector.category}-${connector.name}`} className="connector-card" href={`https://${connector.domain}`} target="_blank" rel="noreferrer">
            <ConnectorLogo name={connector.name} domain={connector.domain} />
            <span><strong>{connector.name}</strong><small>{connector.description}</small></span>
            <ArrowUpRight className="connector-arrow" aria-hidden="true" />
          </a>
        ))}
      </div>
      {visible.length === 0 && <div className="connector-empty">No connector matches “{query}”. Try a company name or workflow.</div>}
    </div>
  );
}
