export type Student = {
  id: string;
  surname: string;
  name: string;
  lastname: string;
  email: string;
  birthday: string;
  groupId: string;
};

export function fetchStudentsByGroup(groupId: string): Promise<Student[]> {
  return fetch(`/api/students/${groupId}`)
    .then(response => response.json());
}