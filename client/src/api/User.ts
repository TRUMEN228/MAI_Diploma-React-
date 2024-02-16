import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const UserScheme = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  fullName: z.string(),
  birthday: z.string(),
});

export type User = z.infer<typeof UserScheme>;

export function fetchUser(userId: string): Promise<User> {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => UserScheme.parse(data));
}

export function registerUser(
  email: string,
  username: string,
  fullName: string,
  birthday: string,
  password: string
): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email, username, fullName, birthday, password
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