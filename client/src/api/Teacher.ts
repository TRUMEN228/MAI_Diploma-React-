export type Teacher = {
  id: string;
  surname: string;
  name: string;
  lastname: string;
  email: string;
  birthday: string;
  instituteId: string;
  subjects: Subject[];
};

export type Subject = {
  name: string;
  groupId: string;
};

export type SubjectsInfo = {
  teacher: Teacher;
  subjects: Subject[];
};

export function fetchTeachers(): Promise<Teacher[]> {
  return fetch("/api/teachers")
    .then(response => response.json());
}

export function fetchTeacher(id: string): Promise<Teacher> {
  return fetch(`/api/teacher/${id}`)
    .then(response => response.json());
}

export function fetchSubjectsByGroupId(groupId: string): Promise<SubjectsInfo[]> {
  return fetch(`/api/teachers/sbjects/${groupId}`)
    .then(response => response.json());
}