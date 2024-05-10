import { Subject } from "./Teacher";
import { User } from "./User";

export function fetchRequests(): Promise<User[]> {
  return fetch("/api/admin/requests")
    .then(response => response.json());
}

export function fetchRequestsByInstituteId(instituteId: string): Promise<User[]> {
  return fetch(`/api/admin/requests/${instituteId}`)
    .then(response => response.json());
}

export function acceptStudentRequest(userId: string, groupId: string): Promise<void> {
  return fetch(`/api/admin/requests/student/accept/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      groupId
    })
  })
    .then(() => undefined);
}

export function acceptTeacherRequest(userId: string, subjects: Subject[]): Promise<void> {
  return fetch(`/api/admin/requests/student/accept/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      subjects
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