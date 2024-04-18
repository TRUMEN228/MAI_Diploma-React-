import { User } from "./User";

export function fetchRequests(): Promise<User[]> {
  return fetch("/api/admin/requests")
    .then(response => response.json());
}

export function acceptRequest(userId: string, userStatus: string): Promise<void> {
  return fetch(`/api/admin/requests/accept/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userStatus
    })
  })
    .then(() => undefined);
}

export function rejectRequest(userId: string): Promise<void> {
  return fetch(`/api/admin/requests/reject/${userId}`, {
    method: "POST"
  })
    .then(() => undefined);
}