import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";

export interface IMessage {
  id: string;
  text: string;
  userId: string;
  group: string;
  sentAt: number;
  files?: IFile[];
};

export interface IFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
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

  static getGroup(group: string): IMessage[] | undefined {
    let list = Object.values(database.data);

    list = list.filter(item => item.group === group);

    return list;
  }

  static async create(
    text: string,
    userId: string,
    group: string,
    files?: IFile[]
  ): Promise<IMessage> {
    const message: IMessage = {
      id: randomUUID(),
      text,
      userId,
      group,
      sentAt: Date.now(),
      files
    };

    await database.update((data) => {
      data[message.id] = message;
    });

    return message;
  }
}
