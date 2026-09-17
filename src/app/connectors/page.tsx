import { ConnectorExplorer } from "@/components/marketing/ConnectorExplorer";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { connectorCategories, connectors } from "@/lib/connectors";

export default function ConnectorsPage() {
  return (
    <div className="marketing-page">
      <SiteHeader />
      <main id="content" className="directory-page">
        <header className="directory-hero"><p>Connector directory</p><h1>Bring the tools that run your work.</h1><span>{connectors.length} supported services across {connectorCategories.length} practical categories. Search the catalog, then ask BigBag to use the service in your generated product.</span></header>
        <ConnectorExplorer />
      </main>
      <SiteFooter />
    </div>
  );
}
