import { Router } from "express";
import { Teachers } from "../database";

export const teachersRouter = Router();

teachersRouter.get("/", (req, res) => {
  const data = Teachers.getAll();

  if (!data.length || data.length === 0) {
    return res.status(404).send("Преподаватели не найдены");
  }

  res.status(200).json(data);
});

teachersRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  const data = Teachers.getOne(id);

  if (!data) {
    return res.status(404).send("Преподаватель не найден");
  }

  res.status(200).json(data);
});

teachersRouter.get("/institute/:instituteId", (req, res) => {
  const instituteId = req.params.instituteId;

  const teachers = Teachers.getByInstituteId(instituteId);

  if (!teachers.length) {
    return res.status(404).send("Преподаватели не найдены");
  }

  res.status(200).json(teachers);
})

teachersRouter.get("/subjects/:groupId", (req, res) => {
  const groupId = req.params.groupId;

  const data = Teachers.getSubjectsByGroupId(groupId);

  if (!data.length || data.length === 0) {
    return res.status(404).send("Преподаватели не найдены");
  }

  res.status(200).json(data);
});