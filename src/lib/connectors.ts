export interface Connector {
  name: string;
  description: string;
  domain: string;
  category: ConnectorCategory;
}

export type ConnectorCategory =
  | "Personal productivity"
  | "Business & CRM"
  | "Commerce & payments"
  | "AI & automation"
  | "Data & analytics"
  | "Communications"
  | "Maps & media"
  | "Security & infrastructure";

const entries: Array<[ConnectorCategory, string, string, string]> = [
  ["Personal productivity", "Calendly", "Build booking flows and meeting dashboards.", "calendly.com"],
  ["Personal productivity", "Contentful", "Build around your existing content model.", "contentful.com"],
  ["Personal productivity", "Figma MCP", "Use Figma files and design context.", "figma.com"],
  ["Personal productivity", "Fireflies", "Search meeting transcripts and notes.", "fireflies.ai"],
  ["Personal productivity", "Gmail", "Read, send, and label team email.", "gmail.com"],
  ["Personal productivity", "Google Calendar", "Read and write calendar events.", "calendar.google.com"],
  ["Personal productivity", "Google Docs", "Create and edit documents.", "docs.google.com"],
  ["Personal productivity", "Google Drive", "Search and read files.", "drive.google.com"],
  ["Personal productivity", "Google Sheets", "Read and write spreadsheets.", "sheets.google.com"],
  ["Personal productivity", "Google Slides", "Read presentation content.", "slides.google.com"],
  ["Personal productivity", "Granola", "Bring meeting decisions into builds.", "granola.ai"],
  ["Personal productivity", "Lovable API", "Manage workspaces, projects, and publishing.", "lovable.dev"],
  ["Personal productivity", "Microsoft Excel", "Work with Excel spreadsheets.", "microsoft.com"],
  ["Personal productivity", "Microsoft OneDrive", "Access cloud files and folders.", "onedrive.com"],
  ["Personal productivity", "Microsoft OneNote", "Capture notes and notebooks.", "onenote.com"],
  ["Personal productivity", "Microsoft Outlook", "Manage mail and calendars.", "outlook.com"],
  ["Personal productivity", "Microsoft PowerPoint", "Create and read presentations.", "microsoft.com"],
  ["Personal productivity", "Microsoft SharePoint", "Browse sites, libraries, and lists.", "sharepoint.com"],
  ["Personal productivity", "Microsoft Teams", "Work with chats and meetings.", "microsoft.com"],
  ["Personal productivity", "Microsoft Word", "Create and edit documents.", "microsoft.com"],
  ["Personal productivity", "Miro", "Turn workshop boards into prototypes.", "miro.com"],
  ["Personal productivity", "Notion", "Build from team docs and wikis.", "notion.so"],
  ["Personal productivity", "Paper MCP", "Use Paper design context in builds.", "paper.design"],
  ["Personal productivity", "Sanity", "Build with your Sanity schema.", "sanity.io"],
  ["Personal productivity", "Storyblok", "Create content-driven experiences.", "storyblok.com"],
  ["Personal productivity", "Tally", "Create forms and fetch submissions.", "tally.so"],
  ["Personal productivity", "Wispr Flow", "Use voice notes as build context.", "wisprflow.ai"],
  ["Personal productivity", "WordPress.com", "Read posts, pages, and media.", "wordpress.com"],

  ["Business & CRM", "Airtable", "Work with bases and automations.", "airtable.com"],
  ["Business & CRM", "Apollo.io", "Search and enrich B2B contacts.", "apollo.io"],
  ["Business & CRM", "Asana", "Read tasks, projects, and assignees.", "asana.com"],
  ["Business & CRM", "Ashby", "Run recruiting and hiring workflows.", "ashbyhq.com"],
  ["Business & CRM", "Atlassian", "Turn Jira specs into software.", "atlassian.com"],
  ["Business & CRM", "Attention", "Use call transcripts and scorecards.", "attention.com"],
  ["Business & CRM", "Gong", "Access calls, transcripts, and deals.", "gong.io"],
  ["Business & CRM", "HubSpot", "Connect sales and marketing workflows.", "hubspot.com"],
  ["Business & CRM", "Linear", "Read and write issues and projects.", "linear.app"],
  ["Business & CRM", "Pipedrive", "Manage deals, contacts, and activities.", "pipedrive.com"],
  ["Business & CRM", "Salesforce", "Build with live CRM data.", "salesforce.com"],
  ["Business & CRM", "Zoho CRM", "Manage leads, contacts, and accounts.", "zoho.com"],

  ["Commerce & payments", "Chargebee", "Manage subscriptions and invoices.", "chargebee.com"],
  ["Commerce & payments", "Lexware", "Manage contacts and invoices.", "lexware.de"],
  ["Commerce & payments", "Lightspeed", "Use retail products and inventory.", "lightspeedhq.com"],
  ["Commerce & payments", "Polar.sh", "Build revenue and billing dashboards.", "polar.sh"],
  ["Commerce & payments", "PrestaShop", "Manage catalogs, orders, and inventory.", "prestashop.com"],
  ["Commerce & payments", "Sevdesk", "Manage invoices and vouchers.", "sevdesk.com"],
  ["Commerce & payments", "Shopify", "Build with storefront and order data.", "shopify.com"],
  ["Commerce & payments", "Stripe", "Accept payments and subscriptions.", "stripe.com"],
  ["Commerce & payments", "Wave", "Manage invoices and accounting data.", "waveapps.com"],
  ["Commerce & payments", "Wix", "Manage sites, bookings, and commerce.", "wix.com"],
  ["Commerce & payments", "WooCommerce", "Use products, orders, and coupons.", "woocommerce.com"],
  ["Commerce & payments", "Xero", "Work with invoices and financial reports.", "xero.com"],
  ["Commerce & payments", "Zoho Books", "Manage bills and expenses.", "zoho.com"],

  ["AI & automation", "Apify", "Run actors and scraping datasets.", "apify.com"],
  ["AI & automation", "Custom", "Connect your own MCP server.", "modelcontextprotocol.io"],
  ["AI & automation", "ElevenLabs", "Add natural voice to any app.", "elevenlabs.io"],
  ["AI & automation", "Firecrawl", "Turn websites into structured data.", "firecrawl.dev"],
  ["AI & automation", "Gemini Enterprise", "Search across Google data sources.", "cloud.google.com"],
  ["AI & automation", "HeyGen MCP", "Create AI avatar and video workflows.", "heygen.com"],
  ["AI & automation", "Inngest", "Run durable background jobs.", "inngest.com"],
  ["AI & automation", "n8n", "Automate workflows across services.", "n8n.io"],
  ["AI & automation", "Perplexity", "Add cited real-time web search.", "perplexity.ai"],
  ["AI & automation", "Replicate", "Run image, video, and audio models.", "replicate.com"],

  ["Data & analytics", "Algolia", "Add AI search and discovery.", "algolia.com"],
  ["Data & analytics", "Amplitude", "Explore product behavior and analytics.", "amplitude.com"],
  ["Data & analytics", "BigQuery", "Build reports on warehouse data.", "cloud.google.com"],
  ["Data & analytics", "ClickHouse", "Build tools on live analytical data.", "clickhouse.com"],
  ["Data & analytics", "Confidence", "Manage flags and experiments.", "confidence.spotify.com"],
  ["Data & analytics", "Databricks", "Turn SQL warehouses into apps.", "databricks.com"],
  ["Data & analytics", "dbt Semantic Layer", "Query governed business metrics.", "getdbt.com"],
  ["Data & analytics", "Google Analytics", "Track traffic and conversions.", "analytics.google.com"],
  ["Data & analytics", "Google Search Console", "Read site search analytics.", "search.google.com"],
  ["Data & analytics", "Hex", "Work with analytics notebooks.", "hex.tech"],
  ["Data & analytics", "PostHog", "Query analytics and feature flags.", "posthog.com"],
  ["Data & analytics", "Semrush", "Use SEO and keyword research data.", "semrush.com"],
  ["Data & analytics", "Snowflake", "Query warehouse data live.", "snowflake.com"],

  ["Communications", "Brevo", "Send email and SMS campaigns.", "brevo.com"],
  ["Communications", "Firebase Cloud Messaging", "Send push notifications.", "firebase.google.com"],
  ["Communications", "GatewayAPI", "Send SMS and RCS messages.", "gatewayapi.com"],
  ["Communications", "LinkedIn", "Build profile and posting workflows.", "linkedin.com"],
  ["Communications", "Mailgun", "Send and track transactional email.", "mailgun.com"],
  ["Communications", "Resend", "Send transactional email at scale.", "resend.com"],
  ["Communications", "Slack", "Read messages and post updates.", "slack.com"],
  ["Communications", "Telegram", "Send messages and run bots.", "telegram.org"],
  ["Communications", "TikTok", "Access creator and video data.", "tiktok.com"],
  ["Communications", "Twilio", "Send SMS and trigger calls.", "twilio.com"],
  ["Communications", "Twitch", "Access streams and channel data.", "twitch.tv"],
  ["Communications", "X", "Search public posts and profiles.", "x.com"],

  ["Maps & media", "Google Maps", "Add maps, places, and routing.", "maps.google.com"],
  ["Maps & media", "KLIPY", "Add GIFs, stickers, and clips.", "klipy.com"],
  ["Maps & media", "Logo.dev", "Display company logos by domain.", "logo.dev"],
  ["Maps & media", "Mapbox", "Add geocoding and interactive maps.", "mapbox.com"],

  ["Security & infrastructure", "Aikido", "Scan applications for security issues.", "aikido.dev"],
  ["Security & infrastructure", "Amazon S3", "Store and retrieve files.", "aws.amazon.com"],
  ["Security & infrastructure", "GitHub", "Read repositories, issues, and PRs.", "github.com"],
  ["Security & infrastructure", "incident.io", "Build incident response tools.", "incident.io"],
  ["Security & infrastructure", "Sentry", "Track errors and performance.", "sentry.io"],
  ["Security & infrastructure", "Supabase", "Use Postgres, auth, and storage.", "supabase.com"],
  ["Security & infrastructure", "Wiz", "Work with cloud security posture.", "wiz.io"],
];

export const connectors: Connector[] = entries.map(([category, name, description, domain]) => ({
  category, name, description, domain,
}));

export const connectorCategories: Array<{ name: ConnectorCategory; description: string }> = [
  { name: "Personal productivity", description: "Notes, docs, calendars, and content." },
  { name: "Business & CRM", description: "Pipelines, hiring, and sprints." },
  { name: "Commerce & payments", description: "Stores, billing, and subscriptions." },
  { name: "AI & automation", description: "Agents, scrapers, and schedulers." },
  { name: "Data & analytics", description: "Warehouses, dashboards, and flags." },
  { name: "Communications", description: "Email, social, chat, and SMS." },
  { name: "Maps & media", description: "Locations, logos, and visual media." },
  { name: "Security & infrastructure", description: "Storage, scans, and observability." },
];
