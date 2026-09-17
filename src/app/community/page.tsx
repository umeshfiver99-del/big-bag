import { Github, MessagesSquare, RadioTower, UsersRound } from "lucide-react";
import { ContactForm } from "@/components/marketing/ContactForm";
import { InfoPage } from "@/components/marketing/InfoPage";

export default function CommunityPage() {
  return <InfoPage label="Community" title="Build in the open, with people who ship." description="Share useful patterns, ask clear questions, and help shape a practical AI builder around real products." items={[
    { icon: Github, title: "Open source", body: "Inspect the builder, contribute improvements, and keep complete control of the interface you run." },
    { icon: MessagesSquare, title: "Builder feedback", body: "Show what worked, where the agent got stuck, and what would make the next build clearer." },
    { icon: UsersRound, title: "Show your work", body: "Share shipped apps and reusable approaches without turning the community into a feed of empty demos." },
    { icon: RadioTower, title: "Product updates", body: "Hear about meaningful builder, connector, and security changes as they become available." },
  ]}><section className="form-section"><div><p>Talk to the team</p><h2>Tell us what you are building.</h2></div><ContactForm kind="Community" /></section></InfoPage>;
}
