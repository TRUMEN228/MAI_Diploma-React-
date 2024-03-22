import { JSONFilePreset } from "lowdb/node";

type Cathedra = {
  name: string;
  courses: Course[];
};

type Course = {
  course: string;
  groups: Group[];
};

type Group = {
  groupId: string;
  direction: string;
  localName: string;
  globalName?: string;
};

export interface IInstitute {
  id: string;
  name: string;
  shortName: string;
  cathedras: Cathedra[];
}

const database = await JSONFilePreset<Record<string, IInstitute>>(
  "institutes.json",
  {}
);

export class Institutes {
  static getOne(id: string): IInstitute | undefined {
    return database.data[id];
  }

  static getAll(): IInstitute[] {
    return Object.values(database.data);
  }
}