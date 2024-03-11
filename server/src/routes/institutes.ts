import { Router } from "express";

import { Institutes } from "../database/Institutes";

export const institutesRouter = Router();

institutesRouter.get("/", (req, res) => {
  const instituteList = Institutes.getAll();

  res.status(200).json(instituteList);
});

// institutesRouter.get("/cathedras", (req, res) => {
//   const instituteId = req.body.id;

//   if (!instituteId) {
//     return res.status(200).json({});
//   }

//   const cathedraList = Institutes.getOne(instituteId)?.cathedras;

//   res.status(200).json(cathedraList);
// })