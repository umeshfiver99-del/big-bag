import { BookOpenText, CircleHelp, FileCode2, Waypoints } from "lucide-react";
import { InfoPage } from "@/components/marketing/InfoPage";

export default function ResourcesPage() {
  return <InfoPage label="Resources" title="Clear help for every stage of a build." description="Learn how to write a useful brief, refine a generated product, connect services, and prepare a confident launch." items={[
    { icon: BookOpenText, title: "Build guides", body: "Practical patterns for portals, dashboards, marketplaces, booking systems, and internal tools." },
    { icon: FileCode2, title: "Developer reference", body: "Understand generated architecture, environment variables, source export, and GitHub workflows." },
    { icon: Waypoints, title: "Connector playbooks", body: "See which credentials each service requires and what a useful first integration looks like." },
    { icon: CircleHelp, title: "Support", body: "Report a bug or send a question through our monitored support form." },
  ]} />;
}
