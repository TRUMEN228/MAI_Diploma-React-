export type Institute = {
  id: string;
  name: string;
  shortName: string;
  cathedras: Cathedra[];
};

export type Cathedra = {
  shortName: string;
  name: string;
  courses: Course[];
};

export type Course = {
  course: string;
  groups: Group[];
};

export type Group = {
  direction: string;
  localName: string;
  globalName?: string;
};

export function fetchInstituteList(): Promise<Institute[]> {
  return fetch("/api/institutes")
    .then(response => response.json())
    .then(data => data[0]);
};

export function fetchInstitute(id: string): Promise<Institute> {
  return fetch(`/api/institutes/${id}`)
    .then(response => response.json());
}

// export function fetchCathedraList(id: string): Promise<Cathedra[]> {
//   return fetch(`/api/institutes/${id}/cathedras`)
//     .then(response => response.json());
// }