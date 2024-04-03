import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";

export interface IMessage {
  id: string;
  text: string;
  userId: string;
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

const database = await JSONFilePreset<Record<string, IMessage>>(
  "messages.json",
  {}
);

export class Messages {
  static getOne(id: string): IMessage | undefined {
    return database.data[id];
  }

  static getAll(): IMessage[] {
    return Object.values(database.data);
  }

  static getByGroupId(groupId: string): IMessage[] | undefined {
    let list = Object.values(database.data);

    list = list.filter(item => item.groupId === groupId);

    return list;
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

    const message: IMessage = {
      id: randomUUID(),
      text,
      userId,
      groupId,
      sentAt: Date.now(),
      files
    };

    await database.update((data) => {
      data[message.id] = message;
    });

    return message;
  }
}
