import { z } from "zod";
import { validateResponse } from "./validateResponse";

export type File = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
};

export const MessageScheme = z.object({
  id: z.string(),
  text: z.string(),
  userId: z.string(),
  group:  z.string(),
  sentAt: z.number(),
  files: z.optional(z.array(z.custom<File>()))
});

export type Message = z.infer<typeof MessageScheme>;

export function createMessage(
  text: string,
  userId: string,
  group: string,
  files?: File[]
): Promise<void> {
  return fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text, userId, group, files
    })
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function fetchMessagesByGroup(
  group: string
): Promise<Message[]> {
  return fetch("/api/messages", {
    body: JSON.stringify({
      group
    })
  })
    .then(response => response.json())
    .then(data => data.filter((item: Message) => item.group === group));
}