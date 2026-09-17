import { AuthGate } from "@/components/auth/AuthGate";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <AuthGate>{children}</AuthGate>;
}
