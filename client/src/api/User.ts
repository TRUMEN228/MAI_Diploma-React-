import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const UserScheme = z.object({
  id: z.string(),
  accountStatus: z.custom<"student" | "teacher" | "admin">(),
  email: z.string(),
  username: z.string(),
  surname: z.string(),
  name: z.string(),
  lastname: z.string(),
  birthday: z.string(),
  groupId: z.string()
});

export type User = z.infer<typeof UserScheme>;

export function fetchUser(userId: string): Promise<User> {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => UserScheme.parse(data));
}

export function fetchStudentsByGroup(groupId: string): Promise<User[]> {
  return fetch(`/api/users/students/${groupId}`)
    .then(response => response.json())
}

export function registerUser(
  email: string,
  username: string,
  surname: string,
  name: string,
  lastname: string,
  birthday: string,
  groupId: string,
  password: string
): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email, username, surname, name, lastname, birthday, groupId, password
    })
  })
    .then(() => undefined);
}

export function editUser(
  id: string,
  email?: string,
  username?: string,
  surname?: string,
  name?: string,
  lastname?: string,
  birthday?: string,
  groupId?: string
): Promise<void> {
  return fetch("/api/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id, email, username, surname, name, lastname, birthday, groupId
    })
  })
    .then(() => undefined);
}

export function login(email: string, password: string): Promise<void> {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email, password
    })
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function logout(): Promise<void> {
  return fetch("/api/logout", {
    method: "POST"
  })
    .then(() => undefined);
}

export function fetchMe(): Promise<User> {
  return fetch("/api/users/me")
    .then(validateResponse)
    .then(response => response.json())
    .then(data => UserScheme.parse(data));
}