import { z } from "zod";
import { validateAxiosResponse } from "./validateResponse";
import axios from "axios";

export const MessageScheme = z.object({
  id: z.string(),
  text: z.string(),
  userId: z.string(),
  groupId:  z.string(),
  sentAt: z.number(),
  files: z.optional(z.array(z.custom<(MessageFile | null)>()))
});

export type Message = z.infer<typeof MessageScheme>;

export type MessageFile = {
  name?: string;
  storageName?: string;
  size?: number;
  type?: string;
  downloadUrl?: string;
};

export function createMessage(
  formData: FormData | undefined
): Promise<void> {
  return axios.post("/api/messages", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(validateAxiosResponse)
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