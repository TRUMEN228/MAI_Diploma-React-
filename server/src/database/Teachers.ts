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
  id: string;
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

  static getByInstituteId(instituteId: string): ITeacher[] {
    return Object.values(teachersDatabase.data).filter(item => item.instituteId === instituteId);
  }

  static getSubjectsByGroupId(groupId: string): { teacher: ITeacher; subject: Subject }[] {
    const teachers = Object.values(teachersDatabase.data);
    const returnData: { teacher: ITeacher; subject: Subject }[] = [];

    for (const teacher of teachers) {
      for (const subject of teacher.subjects) {
        if (subject.groupId === groupId) {
          returnData.push({
            teacher,
            subject
          });
        }
      }
    }

    return returnData;
  }
};