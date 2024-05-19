import { z } from "zod";
import { validateResponse } from "./validateResponse";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

const UserScheme = z.object({
  id: z.string(),
  accountStatus: z.custom<"student" | "teacher" | "admin">(),
  email: z.string(),
  surname: z.string(),
  name: z.string(),
  lastname: z.string(),
  birthday: z.string(),
  instituteId: z.string()
});

export type User = z.infer<typeof UserScheme>;

export function fetchUser(userId: string): Promise<User> {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => UserScheme.parse(data));
}

export function registerUser(
  email: string,
  accountStatus: User["accountStatus"],
  surname: string,
  name: string,
  lastname: string,
  birthday: string,
  instituteId: string,
  password: string
): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email, accountStatus, surname, name, lastname, birthday, instituteId, password
    })
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function editUser(
  id: string,
  email?: string,
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
      id, email, surname, name, lastname, birthday, groupId
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

export function fetchMe(): Promise<{ customData: Student | Teacher | {}; user: User }> {
  return fetch("/api/users/me")
    .then(validateResponse)
    .then(response => response.json());
}