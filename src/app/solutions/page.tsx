import { BriefcaseBusiness, Building2, GraduationCap, ShoppingBag } from "lucide-react";
import { InfoPage } from "@/components/marketing/InfoPage";

export default function SolutionsPage() {
  return <InfoPage label="Solutions" title="Software shaped around the way you work." description="Build internal tools, client products, and operational systems without forcing the business into somebody else’s template." items={[
    { icon: BriefcaseBusiness, title: "Client operations", body: "Portals, approvals, invoices, project status, and reporting in one place your clients understand." },
    { icon: Building2, title: "Internal workflows", body: "Replace fragile spreadsheets with role-aware tools built around the actual handoffs in your team." },
    { icon: ShoppingBag, title: "Commerce experiences", body: "Launch catalogs, member areas, booking flows, and payment-backed services with real integrations." },
    { icon: GraduationCap, title: "Programs and communities", body: "Create learning hubs, directories, application systems, and dashboards that grow with your audience." },
  ]} />;
}
