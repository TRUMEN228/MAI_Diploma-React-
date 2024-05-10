import { JSONFilePreset } from "lowdb/node";

export interface IStudent {
  id: string;
  surname: string;
  name: string;
  lastname: string;
  email: string;
  birthday: string;
  groupId: string;
}

export const studentsDatabase = await JSONFilePreset<Record<string, IStudent>>(
  "databases/students.json",
  {}
);

export class Students {
  static getAll(): IStudent[] {
    return Object.values(studentsDatabase.data);
  };

  static getOne(id: string): IStudent {
    return studentsDatabase.data[id];
  };

  static getByGroupId(groupId: string): IStudent[] {
    return Students.getAll().filter(user => user.groupId === groupId);
  };
}