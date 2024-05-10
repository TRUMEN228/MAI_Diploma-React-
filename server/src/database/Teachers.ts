import { JSONFilePreset } from "lowdb/node";

export interface ITeacher {
  id: string;
  surname: string;
  name: string;
  lastname: string;
  email: string;
  birthday: string;
  instituteId: string;
  subjects: Subject[];
};

export type Subject = {
  name: string;
  groupId: string;
};

export const teachersDatabase = await JSONFilePreset<Record<string, ITeacher>>(
  "databases/teachers.json",
  {}
);

export class Teachers {
  static getAll(): ITeacher[] {
    return Object.values(teachersDatabase.data);
  };

  static getOne(id: string): ITeacher {
    return teachersDatabase.data[id];
  };
};