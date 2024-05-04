import { JSONFilePreset } from "lowdb/node";

export interface ITeacher {
  id: string;
  surname: string;
  name: string;
  lastname: string;
};

export const database = await JSONFilePreset<Record<string, ITeacher>>(
  "database/teachers.json",
  {}
);

export class Teachers {
  static getAll(): ITeacher[] {
    return Object.values(database.data);
  }

  static getOne(id: string): ITeacher {
    return database.data[id];
  };
};