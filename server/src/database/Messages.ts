import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";
import { Users } from "./Users";

export interface IMessage {
  id: string;
  text: string;
  userId: string;
  userStatus: "student" | "teacher" | "admin";
  subjectId: string;
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

  static getBySubjectId(subjectId: string): IMessage[] | undefined {
    return Object.values(messagesDatabase.data).filter(item => item.subjectId === subjectId);
  }

  static async create(
    text: string,
    userId: string,
    subjectId: string,
    files?: (File | null)[]
  ): Promise<IMessage> {
    if (!text || !userId || !subjectId) {
      throw new Error("Не хватает данных");
    }

    const userStatus = Users.getOne(userId)?.accountStatus!;

    const message: IMessage = {
      id: randomUUID(),
      text,
      userId,
      userStatus,
      subjectId,
      sentAt: Date.now(),
      files
    };

    await messagesDatabase.update((data) => {
      data[message.id] = message;
    });

    return message;
  }
}
