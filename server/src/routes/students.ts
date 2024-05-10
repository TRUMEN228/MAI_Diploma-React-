import { Router } from "express";
import { Students } from "../database/Students";

export const studentsRouter = Router();

studentsRouter.get("/:groupId", (req, res) => {
  const groupId = req.params.groupId;

  const students = Students.getByGroupId(groupId);

  if (!students.length) {
    return res.status(404).send("Список пуст");
  }

  res.status(200).json(students);
});