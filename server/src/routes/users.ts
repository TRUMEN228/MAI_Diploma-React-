import { Router } from "express";

import { authorizeRequest } from "../auth";
import { IStudent, ITeacher, IUser, Students, Teachers, Users } from "../database";

export const usersRouter = Router();

usersRouter.get("/me", (req, res) => {
  const userId = authorizeRequest(req);

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const user = Users.getOne(userId);

  if (!user) {
    return res.status(404).send("Пользователь не найден");
  }

  let customData: IStudent | ITeacher | {};

  switch (user?.accountStatus) {
    case "student":
      customData = Students.getOne(userId);
      break;
    case "teacher":
      customData = Teachers.getOne(userId);
      break;
    case "admin":
      customData = {};
      break;
  }

  res.status(200).json({ customData, user });
});

usersRouter.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  const user = Users.getOne(userId);

  if (!user) {
    return res.status(404).send("Пользователь не найден");
  }

  res.status(200).json(user);
});
