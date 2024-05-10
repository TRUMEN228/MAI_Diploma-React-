import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";
import { IStudent, studentsDatabase } from "./Students";
import { ITeacher, teachersDatabase } from "./Teachers";
import { Admins, requestDatabase } from "./Admin";

export interface IUser {
  id: string;
  accountStatus: "student" | "teacher" | "admin";
  email: string;
  surname: string;
  name: string;
  lastname: string;
  birthday: string;
  instituteId: string;
}

export const database = await JSONFilePreset<Record<string, IUser>>(
  "databases/users.json",
  {}
);

export class Users {
  static getOne(id: string): IUser | undefined {
    return database.data[id];
  }

  static getOneToEdit(id: string): IUser {
    return database.data[id];
  }

  static getAll(): IUser[] {
    return Object.values(database.data);
  }

  static findOne(predicate: (users: IUser) => boolean): IUser | undefined {
    return Users.getAll().find(predicate);
  }

  static async createRequest(
    email: string,
    accountStatus: IUser["accountStatus"],
    surname: string,
    name: string,
    lastname: string,
    birthday: string,
    instituteId: string
  ): Promise<IUser> {
    if (Users.findOne((user) => user.email === email)) {
      throw new Error("Пользователь с таким e-mail уже зарегистрирован");
    }

    if (Admins.findOneRequest((user) => user.email === email)) {
      throw new Error("Пользователь с таким e-mail уже подал заявку на регистрацию");
    }

    const user: IUser = {
      id: randomUUID(),
      accountStatus,
      email,
      surname,
      name,
      lastname,
      birthday,
      instituteId
    };

    await requestDatabase.update((data) => {
      data[user.id] = user;
    });

    return user;
  }

  static async edit(
    id: string,
    email?: string,
    surname?: string,
    name?: string,
    lastname?: string,
    birthday?: string,
    instituteId?: string
  ): Promise<void> {
    if (!Users.findOne((user) => user.id === id)) {
      throw new Error("Пользователь не найден");
    }

    const user = Users.getOneToEdit(id);

    const updatedUser: IUser = {
      ...user,
      email: email ? email : user.email,
      surname: surname ? surname : user.surname,
      name: name ? name : user.name,
      lastname: lastname ? lastname : user.lastname,
      birthday: birthday ? birthday : user.birthday,
      instituteId: instituteId ? instituteId : user.instituteId,
    }

    await database.update((data) => {
      data[id] = updatedUser;
    });
  }
}