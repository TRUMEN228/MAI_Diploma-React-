import { JSONFilePreset } from "lowdb/node";
import { IUser, usersDatabase } from "./Users";
import { IStudent, studentsDatabase } from "./Students";
import { ITeacher, Subject, teachersDatabase } from "./Teachers";
import { Passwords } from "./Passwords";

export const requestDatabase = await JSONFilePreset<Record<string, IUser>>(
  "databases/requests.json",
  {}
);

export class Admins {
  static getOneRequest(id: string): IUser {
    return requestDatabase.data[id];
  }

  static getAllRequests(): IUser[] {
    return Object.values(requestDatabase.data);
  }

  static getRequestsByInstituteId(instituteId: string): IUser[] {
    return Object.values(requestDatabase.data).filter(item => item.instituteId === instituteId);
  }

  static findOneRequest(predicate: (users: IUser) => boolean): IUser | undefined {
    return Admins.getAllRequests().find(predicate);
  }

  static async acceptStudentRequest(
    id: string,
    groupId: string
  ): Promise<IUser> {
    const user = Admins.getOneRequest(id);

    const student: IStudent = {
      id: user.id,
      surname: user.surname,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      birthday: user.birthday,
      groupId
    }

    await usersDatabase.update(data => {
      data[id] = user;
    })

    await studentsDatabase.update(data => {
      data[id] = student;
    });

    Admins.removeRequest(id);

    return user;
  };

  static async acceptTeacherRequest(
    id: string,
    subjects: Subject[]
  ): Promise<IUser> {
    const user = Admins.getOneRequest(id);

    for (const subject of subjects) {
      subject.id = subject.groupId + '.' + subject.id;
    }

    const teacher: ITeacher = {
      id: user.id,
      email: user.email,
      surname: user.surname,
      name: user.name,
      lastname: user.lastname,
      birthday: user.birthday,
      instituteId: user.instituteId,
      subjects
    };

    await usersDatabase.update(data => {
      data[id] = user;
    })

    await teachersDatabase.update(data => {
      data[id] = teacher;
    });

    Admins.removeRequest(id);
    Passwords.remove(id);

    return user;
  };

  static async removeRequest(id: string): Promise<void> {
    const data = await requestDatabase.adapter.read();

    if (data) {
      delete data[id];
      await requestDatabase.adapter.write(data);
    }
  }
}