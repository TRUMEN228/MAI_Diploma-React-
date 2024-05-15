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

export type SubjectInfo = {
  teacher: Teacher;
  subject: Subject;
};

export function fetchAllTeachers(): Promise<Teacher[]> {
  return fetch("/api/teachers")
    .then(response => response.json());
}

export function fetchTeacher(id: string): Promise<Teacher> {
  return fetch(`/api/teachers/${id}`)
    .then(response => response.json());
}

export function fetchTeachers(instituteId: string): Promise<Teacher[]> {
  return fetch(`/api/teachers/institute/${instituteId}`)
    .then(response => response.json())
}

export function fetchSubjectsByGroupId(groupId: string): Promise<SubjectInfo[]> {
  return fetch(`/api/teachers/subjects/${groupId}`)
    .then(response => response.json());
}