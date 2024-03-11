import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";

export interface IUser {
  id: string;
  accountStatus: string;
  email: string;
  username: string;
  surname: string;
  name: string;
  lastname: string;
  birthday: string;
  institute: string;
  cathedra: string;
  course: number;
  group: string;
}

export const database = await JSONFilePreset<Record<string, IUser>>(
  "users.json",
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

  static async create(
    email: string,
    username: string,
    surname: string,
    name: string,
    lastname: string,
    birthday: string,
    institute: string,
    cathedra: string,
    course: number,
    group: string
  ): Promise<IUser> {
    if (Users.findOne((user) => user.email === email)) {
      throw new Error("Пользователь с данным e-mail уже зарегистрирован");
    }

    const user: IUser = {
      id: randomUUID(),
      accountStatus: 'student',
      email,
      username,
      surname,
      name,
      lastname,
      birthday,
      institute,
      cathedra,
      course,
      group
    };

    await database.update((data) => {
      data[user.id] = user;
    });

    return user;
  }

  static async edit(
    id: string,
    email?: string,
    username?: string,
    surname?: string,
    name?: string,
    lastname?: string,
    birthday?: string,
    institute?: string,
    cathedra?: string,
    course?: number,
    group?: string
  ): Promise<void> {
    if (!Users.findOne((user) => user.id === id)) {
      throw new Error("Пользователь не найден");
    }

    const user = Users.getOneToEdit(id);

    const updatedUser: IUser = {
      ...user,
      email: email ? email : user.email,
      username: username ? username : user.username,
      surname: surname ? surname : user.surname,
      name: name ? name : user.name,
      lastname: lastname ? lastname : user.lastname,
      birthday: birthday ? birthday : user.birthday,
      institute: institute ? institute : user.institute,
      cathedra: cathedra ? cathedra : user.cathedra,
      course: course ? course : user.course,
      group: group ? group : user.group,
    }

    await database.update((data) => {
      data[id] = updatedUser;
    });
  }
}