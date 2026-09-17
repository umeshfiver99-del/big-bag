"use client";

import { useState } from "react";
import { Bell, CalendarDays, Check, ChevronDown, CircleDollarSign, FileText, LayoutDashboard, Menu, MessageCircle, Search, Settings2, Users, X } from "lucide-react";

const projects = [
  { name: "Atlas identity", client: "Atlas Coffee", due: "Sep 22", status: "Review", progress: 84 },
  { name: "Northline shop", client: "Northline Goods", due: "Sep 28", status: "In progress", progress: 62 },
  { name: "Morrow campaign", client: "Morrow Health", due: "Oct 04", status: "Planning", progress: 31 },
];

export function SampleDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const visible = projects.filter((project) => `${project.name} ${project.client}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="sample-app">
      <aside className={menuOpen ? "sample-sidebar open" : "sample-sidebar"}>
        <div className="sample-logo"><span>N</span><strong>Northstar</strong><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button></div>
        <nav aria-label="Sample app navigation">
          <a className="active" href="#overview"><LayoutDashboard /> Overview</a>
          <a href="#projects"><FileText /> Projects <span>8</span></a>
          <a href="#clients"><Users /> Clients</a>
          <a href="#messages"><MessageCircle /> Messages <span>3</span></a>
          <a href="#calendar"><CalendarDays /> Calendar</a>
        </nav>
        <div className="sample-sidebar-footer"><a href="#settings"><Settings2 /> Settings</a><div><span>JT</span><p><b>Jordan Taylor</b><small>Studio owner</small></p><ChevronDown /></div></div>
      </aside>
      {menuOpen && <button className="sample-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <main className="sample-main">
        <header className="sample-topbar">
          <button className="sample-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu /></button>
          <label><Search /><span className="sr-only">Search projects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects and clients" /></label>
          <button aria-label="Notifications" className="sample-notification"><Bell /><i /></button>
          <button className="sample-user">JT</button>
        </header>
        <div className="sample-content" id="overview">
          <div className="sample-title"><div><p>Thursday, September 17</p><h1>Good morning, Jordan.</h1></div><button>New project</button></div>
          <section className="sample-stat-grid">
            <article><span><CircleDollarSign /></span><p><small>Revenue this month</small><b>$24,860</b><em>12% ahead of August</em></p></article>
            <article><span><FileText /></span><p><small>Active projects</small><b>8</b><em>3 waiting for review</em></p></article>
            <article><span><Users /></span><p><small>Client satisfaction</small><b>96%</b><em>Across 14 responses</em></p></article>
          </section>
          <div className="sample-dashboard-grid">
            <section className="sample-projects" id="projects">
              <header><div><h2>Active projects</h2><p>The work currently moving through your studio.</p></div><button>View all</button></header>
              <div className="sample-table-header"><span>Project</span><span>Due</span><span>Status</span><span>Progress</span></div>
              {visible.map((project) => (
                <article key={project.name}>
                  <span className="project-avatar">{project.client.slice(0, 1)}</span>
                  <p><b>{project.name}</b><small>{project.client}</small></p>
                  <time>{project.due}</time>
                  <em data-status={project.status}>{project.status}</em>
                  <div><span><i style={{ width: `${project.progress}%` }} /></span><b>{project.progress}%</b></div>
                </article>
              ))}
              {visible.length === 0 && <div className="sample-empty">No project matches “{query}”.</div>}
            </section>
            <aside className="sample-activity">
              <header><h2>Today</h2><button><CalendarDays /> Sep 17</button></header>
              <div className="activity-time"><time>10:00</time><i /></div>
              <article><span className="activity-dot" /><p><b>Atlas review</b><small>With Maya Chen · 45 min</small></p><button>Join</button></article>
              <div className="activity-time"><time>13:30</time><i /></div>
              <article><span className="activity-dot coral" /><p><b>Scope call</b><small>Northline Goods · 30 min</small></p></article>
              <div className="sample-task"><span><Check /></span><p><b>Send revised proposal</b><small>Due before 5:00 PM</small></p></div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
