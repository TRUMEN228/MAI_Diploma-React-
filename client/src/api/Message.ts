import { z } from "zod";
import { validateResponse } from "./validateResponse";
import axios from "axios";

export const MessageScheme = z.object({
  id: z.string(),
  text: z.string(),
  userId: z.string(),
  groupId:  z.string(),
  sentAt: z.number(),
  files: z.optional(z.array(z.custom<MessageFile | null>()))
});

export type Message = z.infer<typeof MessageScheme>;

export type MessageFile = {
  name?: string;
  size?: number;
  type?: string;
  lastModified?: number;
  downloadUrl?: string;
};

export function createMessage(
  text: string,
  userId: string,
  groupId: string,
  files?: (MessageFile | null)[]
): Promise<void> {
  return fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text, userId, groupId, files
    })
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function uploadFile(
  files: FormData | undefined
): Promise<void> {
  return axios.post("/api/files/upload", files, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(() => undefined);
}

export function fetchAllMessages(): Promise<Message[]> {
  return fetch("/api/messages")
    .then(response => response.json());
}

export function fetchMessagesByGroupId(
  groupId: string
): Promise<Message[]> {
  return fetch("/api/messages/groupId", {
    body: JSON.stringify({
      groupId
    })
  })
    .then(response => response.json())
    .then(data => data.filter((item: Message) => item.groupId === groupId));
}