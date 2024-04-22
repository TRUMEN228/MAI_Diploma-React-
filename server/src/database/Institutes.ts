import { JSONFilePreset } from "lowdb/node";
import { userInfo } from "node:os";

type Cathedra = {
  id: string;
  name: string;
  courses: Course[];
};

type Course = {
  course: string;
  groups: Group[];
};

type Group = {
  id: string;
  direction: string;
  localName: string;
  globalName?: string;
};

export interface IInstitute {
  id: string;
  name: string;
  cathedras: Cathedra[];
};

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

  static async create(
    id: string,
    name: string,
    cathedras: Cathedra[]
  ): Promise<IInstitute> {
    if (!id || !name || !cathedras.length) {
      throw new Error("Не хватает данных");
    }

    const institute: IInstitute = {
      id,
      name,
      cathedras
    };

    await database.update((data) => {
      data[institute.id] = institute;
    });

    return institute;
  }
}