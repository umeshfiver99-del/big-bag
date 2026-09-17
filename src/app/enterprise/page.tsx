import { Building2, Headphones, ShieldCheck, UsersRound } from "lucide-react";
import { ContactForm } from "@/components/marketing/ContactForm";
import { InfoPage } from "@/components/marketing/InfoPage";

export default function EnterprisePage() {
  return <InfoPage label="Enterprise" title="A direct path from workflow to internal product." description="Bring BigBag into teams that need stronger access controls, central operations, and a clear relationship with the people behind the platform." items={[
    { icon: UsersRound, title: "Team workspaces", body: "Keep projects and access organized around the teams responsible for shipping and maintaining them." },
    { icon: ShieldCheck, title: "Access controls", body: "Plan identity, ownership, and audit requirements with your security model in view from the start." },
    { icon: Building2, title: "Central operations", body: "Bring billing, usage, connectors, and project oversight together for your organization." },
    { icon: Headphones, title: "Human support", body: "Work directly with the team on rollout, architecture questions, and high-impact builder issues." },
  ]}><section className="form-section"><div><p>Talk to us</p><h2>Plan your rollout.</h2></div><ContactForm kind="Enterprise" /></section></InfoPage>;
}
