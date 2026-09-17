import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SampleDashboard } from "@/components/marketing/SampleDashboard";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SamplePage() {
  return (
    <main className="sample-page" id="content">
      <div className="sample-page-bar">
        <Link href="/"><ArrowLeft /> BigBag</Link>
        <p><span>Sample product</span> Responsive studio operations dashboard</p>
        <div className="sample-page-actions">
          <ThemeToggle className="sample-theme-toggle" />
          <Link href="/login">Build yours <ArrowUpRight /></Link>
        </div>
      </div>
      <SampleDashboard />
    </main>
  );
}
