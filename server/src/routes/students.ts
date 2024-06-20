import { Router } from "express";
import { IStudent, Students } from "../database/Students";

export const studentsRouter = Router();

function sortStudentList(list: IStudent[]): IStudent[] {
  return list.sort((a, b) => {
    if (a.surname > b.surname) {
      return 1;
    } else if (a.surname < b.surname) {
      return -1;
    } else {
      return 0;
    }
  });0
}

studentsRouter.get("/:groupId", (req, res) => {
  const groupId = req.params.groupId;

  const students = Students.getByGroupId(groupId);

  if (!students.length) {
    return res.status(404).send("Список пуст");
  }

  res.status(200).json(sortStudentList(students));
});