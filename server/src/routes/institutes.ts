import { Router } from "express";

import { Institutes, IInstitute } from "../database/Institutes";

export const institutesRouter = Router();

institutesRouter.get("/", (req, res) => {
  const instituteList = Institutes.getAll();

  res.status(200).json(instituteList);
});

institutesRouter.get("/:instituteId", (req, res) => {
  const instituteId = req.params.instituteId;

  let institute;

  try {
    institute = Institutes.getOne(instituteId);
  } catch (error) {
    return res.status(401).send("Институт не найден");
  }

  res.status(200).json(institute);
})

institutesRouter.post("/create", async (req, res) => {
  const { id, name, cathedras } = req.body;

  let institute: IInstitute;

  try {
    institute = await Institutes.create(id, name, cathedras)
  } catch (error) {
    return res.status(400).send("Ошибка создания объекта");
  }

  res.status(200).json(institute);
});
