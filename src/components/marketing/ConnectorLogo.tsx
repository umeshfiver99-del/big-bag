"use client";

import { useState } from "react";

export function ConnectorLogo({ name, domain }: { name: string; domain: string }) {
  const [source, setSource] = useState<0 | 1 | 2>(0);
  const slug = iconSlug(name);
  return (
    <span className="connector-logo" aria-hidden="true">
      {source === 2 ? (
        <b>{name.slice(0, 1)}</b>
      ) : (
        // Simple Icons serves the official brand SVG and keeps the asset crisp at any scale.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={source === 0
            ? `https://cdn.simpleicons.org/${encodeURIComponent(slug)}`
            : `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`}
          alt=""
          width="32"
          height="32"
          loading="lazy"
          onError={() => setSource((current) => current === 0 ? 1 : 2)}
        />
      )}
    </span>
  );
}

function iconSlug(name: string) {
  const overrides: Record<string, string> = {
    "Figma MCP": "figma",
    "Google Calendar": "googlecalendar",
    "Google Docs": "googledocs",
    "Google Drive": "googledrive",
    "Google Sheets": "googlesheets",
    "Google Slides": "googleslides",
    "Lovable API": "lovable",
    "Microsoft Excel": "microsoftexcel",
    "Microsoft OneDrive": "microsoftonedrive",
    "Microsoft OneNote": "microsoftonenote",
    "Microsoft Outlook": "microsoftoutlook",
    "Microsoft PowerPoint": "microsoftpowerpoint",
    "Microsoft SharePoint": "microsoftsharepoint",
    "Microsoft Teams": "microsoftteams",
    "Microsoft Word": "microsoftword",
    "Paper MCP": "paper",
    "WordPress.com": "wordpress",
    "Apollo.io": "apollo",
    "Polar.sh": "polar",
    "Zoho CRM": "zoho",
    "Zoho Books": "zoho",
    "Gemini Enterprise": "googlegemini",
    "HeyGen MCP": "heygen",
    "dbt Semantic Layer": "dbt",
    "Google Analytics": "googleanalytics",
    "Google Search Console": "googlesearchconsole",
    "Firebase Cloud Messaging": "firebase",
    "Amazon S3": "amazons3",
    "Google Maps": "googlemaps",
    "Logo.dev": "logo",
  };
  return overrides[name] ?? name.toLowerCase().replace(/[^a-z0-9]/g, "");
}
