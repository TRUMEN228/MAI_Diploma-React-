import { Router } from "express";

import { Institutes, IInstitute } from "../database/Institutes";

export const institutesRouter = Router();

function splitInstitute(groupId: string) {
  return groupId.split(".", 3);
}

institutesRouter.get("/", (req, res) => {
  const instituteList = Institutes.getAll();

  res.status(200).json(instituteList);
});

institutesRouter.get("/group/:groupId", (req, res) => {
  const groupId = req.params.groupId;

  const [instituteId, cathedraId, courseNum] = splitInstitute(groupId);
  let institute, cathedra, course, group;

  try {
    institute = Institutes.getOne(instituteId);
    cathedra = institute?.cathedras.find(item => item.id === cathedraId);
    course = cathedra?.courses.find(item => item.course === courseNum);
    group = course?.groups.find(item => item.id === groupId);
  } catch (error) {
    return res.status(401).send("Институт не найден");
  }

  // console.log({
  //   institute, cathedra, course, group
  // });

  res.status(200).json({ institute, cathedra, course, group });
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
