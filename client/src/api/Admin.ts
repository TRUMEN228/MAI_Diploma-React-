import { User } from "./User";

export function fetchRequests(): Promise<User[]> {
  return fetch("/api/admin/requests")
    .then(response => response.json());
}

export function acceptRequest(userId: string): Promise<void> {
  return fetch(`/api/admin/accept/${userId}`, {
    method: "POST"
  })
    .then(() => undefined);
}