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

  static getSubjectsByGroupId(groupId: string): { teacher: ITeacher; subjects: Subject[] }[] {
    const teachers = Object.values(teachersDatabase.data);
    const returnData: { teacher: ITeacher; subjects: Subject[] }[] = [];

    for (const teacher of teachers) {
      const subjectsToReturn: Subject[] = [];

      let isTeacher = false;

      for (const subject of teacher.subjects) {
        if (subject.groupId === groupId) {
          subjectsToReturn.push(subject);
          isTeacher = true;
        }
      }

      if (isTeacher) {
        returnData.push({
          teacher: teacher,
          subjects: subjectsToReturn
        });
      }
    }

    return returnData;
  }
};