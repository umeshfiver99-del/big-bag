import { Fingerprint, KeyRound, LockKeyhole, ScanSearch } from "lucide-react";
import { InfoPage } from "@/components/marketing/InfoPage";

export default function SecurityPage() {
  return <InfoPage label="Security" title="Access is checked at the data boundary." description="A hidden button is not security. BigBag verifies identity and project ownership on the server before protected project data is read or changed." items={[
    { icon: Fingerprint, title: "Verified identity", body: "Google sign-in is verified by Firebase before a server session is accepted." },
    { icon: LockKeyhole, title: "Project isolation", body: "Every project is mapped to its owner. Lists are filtered and direct project requests are denied across accounts." },
    { icon: KeyRound, title: "Server-only credentials", body: "AI, database, and sandbox provider keys stay in server environment variables and never ship to browser code." },
    { icon: ScanSearch, title: "Scoped request paths", body: "Proxy routes validate project identifiers and reject unsafe external URLs before the server fetches them." },
  ]} />;
}
