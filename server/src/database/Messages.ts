import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";
import { Users } from "./Users";

export interface IMessage {
  id: string;
  text: string;
  userId: string;
  userStatus: "student" | "teacher" | "admin";
  groupId: string;
  sentAt: number;
  files?: (File | null)[];
};

export type File = {
  name?: string;
  storageName?: string;
  size?: number;
  type?: string;
  downloadUrl: string;
};

export const messagesDatabase = await JSONFilePreset<Record<string, IMessage>>(
  "databases/messages.json",
  {}
);

export class Messages {
  static getOne(id: string): IMessage | undefined {
    return messagesDatabase.data[id];
  }

  static getAll(): IMessage[] {
    return Object.values(messagesDatabase.data);
  }

  static getByGroupId(groupId: string): IMessage[] | undefined {
    return Object.values(messagesDatabase.data).filter(item => item.groupId === groupId);
  }

  static async create(
    text: string,
    userId: string,
    groupId: string,
    files?: (File | null)[]
  ): Promise<IMessage> {
    if (!text || !userId || !groupId) {
      throw new Error("Не хватает данных");
    }

    const userStatus = Users.getOne(userId)?.accountStatus!;

    const message: IMessage = {
      id: randomUUID(),
      text,
      userId,
      userStatus,
      groupId,
      sentAt: Date.now(),
      files
    };

    await messagesDatabase.update((data) => {
      data[message.id] = message;
    });

    return message;
  }
}
