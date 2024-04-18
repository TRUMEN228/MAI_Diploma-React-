import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";

export interface IUser {
  id: string;
  accountStatus: "student" | "teacher" | "admin";
  email: string;
  username: string;
  surname: string;
  name: string;
  lastname: string;
  birthday: string;
  groupId: string;
}

export const database = await JSONFilePreset<Record<string, IUser>>(
  "users.json",
  {}
);

export const requestDatabase = await JSONFilePreset<Record<string, IUser>>(
  "requests.json",
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

  static getOneRequest(id: string): IUser {
    return requestDatabase.data[id];
  }

  static getAllRequests(): IUser[] {
    return Object.values(requestDatabase.data);
  }

  static findOneRequest(predicate: (users: IUser) => boolean): IUser | undefined {
    return Users.getAllRequests().find(predicate);
  }

  static async removeRequest(id: string): Promise<void> {
    const data = await requestDatabase.adapter.read();

    if (data) {
      delete data[id];
      await requestDatabase.adapter.write(data);
    }
  }

  static async createRequest(
    email: string,
    username: string,
    surname: string,
    name: string,
    lastname: string,
    birthday: string,
    groupId: string
  ): Promise<IUser> {
    if (Users.findOne((user) => user.email === email)) {
      throw new Error("Пользователь с таким e-mail уже зарегистрирован");
    }

    if (Users.findOneRequest((user) => user.email === email)) {
      throw new Error("Пользователь с таким e-mail уже подал заявку на регистрацию");
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
      groupId
    };

    await requestDatabase.update((data) => {
      data[user.id] = user;
    });

    return user;
  }

  static async acceptRequest(
    id: string,
    status: string
  ): Promise<IUser> {
    const user = Users.getOneRequest(id);

    await database.update((data) => {
      data[user.id] = user;
    });

    Users.removeRequest(id);

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
    groupId?: string
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
      groupId: groupId ? groupId : user.groupId,
    }

    await database.update((data) => {
      data[id] = updatedUser;
    });
  }
}