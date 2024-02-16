import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";

export interface IUser {
  id: string;
  accountStatus: string;
  email: string;
  username: string;
  fullName: string;
  birthday: string;
}

export const database = await JSONFilePreset<Record<string, IUser>>(
  "users.json",
  {}
);

export class Users {
  static getOne(id: string): IUser | undefined {
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
    fullName: string,
    birthday: string
  ): Promise<IUser> {
    if (Users.findOne((user) => user.email === email)) {
      throw new Error("Пользователь с данным e-mail уже зарегистрирован");
    }

    const user: IUser = {
      id: randomUUID(),
      accountStatus: 'student',
      email,
      username,
      fullName,
      birthday
    };

    await database.update((data) => {
      data[user.id] = user;
    });

    return user;
  }
}