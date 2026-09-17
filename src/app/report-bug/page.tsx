import { Bug, MonitorSmartphone, ScanSearch, ShieldAlert } from "lucide-react";
import { ContactForm } from "@/components/marketing/ContactForm";
import { InfoPage } from "@/components/marketing/InfoPage";

export default function ReportBugPage() {
  return <InfoPage label="Report a bug" title="Help us reproduce what went wrong." description="Tell us what you expected, what happened, and where you saw it. Never include API keys, passwords, customer records, or other sensitive data." items={[
    { icon: Bug, title: "Describe the behavior", body: "Include the action you took and the exact result you saw." },
    { icon: MonitorSmartphone, title: "Name the device", body: "Browser, device size, and operating system help us narrow down interface issues." },
    { icon: ScanSearch, title: "Share the route", body: "Include the page path and project state, but leave private project content out." },
    { icon: ShieldAlert, title: "Protect secrets", body: "Do not paste provider credentials or customer data into a bug report." },
  ]}><section className="form-section" id="report"><div><p>Bug report</p><h2>Send the details.</h2></div><ContactForm kind="Bug report" /></section></InfoPage>;
}
