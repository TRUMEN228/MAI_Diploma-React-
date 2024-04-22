import { validateResponse } from "./validateResponse";

export type Institute = {
  id: string;
  name: string;
  cathedras: Cathedra[];
};

export type Cathedra = {
  id: string;
  name: string;
  courses: Course[];
};

export type Course = {
  course: string;
  groups: Group[];
};

export type Group = {
  id: string;
  direction: string;
  localName: string;
  globalName?: string;
};

export function fetchInstituteList(): Promise<Institute[]> {
  return fetch("/api/institutes")
    .then(response => response.json())
    .then(data => data[0]);
};

export function createInstitute(id: string, name: string, cathedras: Cathedra[]): Promise<void> {
  return fetch("/api/institutes/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id, name, cathedras
    })
  })
    .then(validateResponse)
    .then(() => undefined);
}