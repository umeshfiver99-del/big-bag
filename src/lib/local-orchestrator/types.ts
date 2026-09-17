import type { ConversationMessage } from "@/lib/vcaas-types";

export interface LocalProjectRecord {
  projectId: string;
  ownerId: string;
  label?: string;
  description: string;
  createdAt: string;
  lastModifiedAt?: string;
  port: number;
  status: "init" | "done" | "idle";
  serverStatus: "Active" | "Starting" | "Stopped" | "Error";
  previewUrl?: string;
  sandboxId?: string;
  conversation: ConversationMessage[];
}
