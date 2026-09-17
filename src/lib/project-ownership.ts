import "server-only";

import { createClient, type Client } from "@libsql/client";

let client: Client | null | undefined;
let schemaReady: Promise<void> | null = null;

function database(): Client {
  if (client) return client;
  if (client === null) throw new Error("Project ownership database is not configured");

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) {
    client = null;
    throw new Error("Project ownership database is not configured");
  }

  client = createClient({ url, authToken });
  return client;
}

async function ensureSchema(): Promise<Client> {
  const db = database();
  schemaReady ??= (async () => {
    await db.batch(
      [
        "CREATE TABLE IF NOT EXISTS bigbag_project_owners (project_id TEXT PRIMARY KEY, user_id TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
        "CREATE INDEX IF NOT EXISTS bigbag_project_owners_user_id ON bigbag_project_owners(user_id)",
      ],
      "write",
    );
  })();
  await schemaReady;
  return db;
}

export async function registerProjectOwner(projectId: string, userId: string): Promise<void> {
  const db = await ensureSchema();
  await db.execute({
    sql: "INSERT INTO bigbag_project_owners (project_id, user_id) VALUES (?, ?) ON CONFLICT(project_id) DO UPDATE SET user_id = excluded.user_id, created_at = CURRENT_TIMESTAMP",
    args: [projectId, userId],
  });
}

export async function removeProjectOwner(projectId: string, userId: string): Promise<void> {
  const db = await ensureSchema();
  await db.execute({
    sql: "DELETE FROM bigbag_project_owners WHERE project_id = ? AND user_id = ?",
    args: [projectId, userId],
  });
}

export async function userOwnsProject(projectId: string, userId: string): Promise<boolean> {
  const db = await ensureSchema();
  const result = await db.execute({
    sql: "SELECT 1 FROM bigbag_project_owners WHERE project_id = ? AND user_id = ? LIMIT 1",
    args: [projectId, userId],
  });
  return result.rows.length > 0;
}

export async function ownedProjectIds(userId: string): Promise<Set<string>> {
  const db = await ensureSchema();
  const result = await db.execute({
    sql: "SELECT project_id FROM bigbag_project_owners WHERE user_id = ?",
    args: [userId],
  });
  return new Set(result.rows.map((row) => String(row.project_id)));
}
