import { JSONFilePreset } from "lowdb/node";

export interface IStudent {
  id: string;
}

export const database = await JSONFilePreset<Record<string, IStudent>>(
  "databases/student.json",
  {}
);

export class Students {
  static getAll(): IStudent[] {
    return Object.values(database.data);
  };

  static getOne(id: string): IStudent {
    return database.data[id];
  };
}