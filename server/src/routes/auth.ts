import { Router } from "express";
import { z } from "zod";

import { authorizeResponse, unauthorizeResponse } from "../auth.js";
import { IUser, Users, Passwords } from "../database";

export const authRouter = Router();

const RegisterSchema = z.object({
  email: z.string({ required_error: "Поле \"E-mail\" должно быть заполнено" }).email({ message: 'Некорректный формат e-mail' }),
  accountStatus: z.custom<"student" | "teacher" | "admin">(),
  surname: z.string({ required_error: "Поле \"Фамилия\" должно быть заполнено" }),
  name: z.string({ required_error: "Поле \"Имя\" должно быть заполнено" }),
  lastname: z.string({ required_error: "Поле \"Отчество\" должно быть заполнено" }),
  birthday: z.string({ required_error: "Поле \"Дата рождения\" должно быть заполнено" }),
  instituteId: z.string({ required_error: "Поле \"ВУЗ\" должно быть заполнено" }),
  password: z.string({ required_error: "Поле \"Пароль\" должно быть заполнено" })
});

const LoginSchema = z.object({
  email: z.string({ required_error: "Введите e-mail и пароль" }).email({ message: 'Некорректный формат e-mail' }),
  password: z.string({ required_error: "Введите e-mail и пароль" })
});

function formatName(name: string): string {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
}

authRouter.post("/register", async (req, res) => {
  const bodyParseResult = RegisterSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.issues[0].message);
  }

  const { email, accountStatus, surname, name, lastname, birthday, instituteId, password } = bodyParseResult.data;

  let user: IUser;

  try {
    user = await Users.createRequest(email, accountStatus, formatName(surname), formatName(name), formatName(lastname), birthday, instituteId);
  } catch (error) {
    return res.status(409).send("Этот email уже занят");
  }

  await Passwords.create(user.id, password);

  authorizeResponse(res, user.id).status(201).send();
});

authRouter.post("/login", (req, res) => {
  const bodyParseResult = LoginSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.issues[0].message);
  }

  const { email, password } = bodyParseResult.data;

  const user = Users.findOne((user) => user.email === email);

  if (!user || !Passwords.verify(user.id, password)) {
    return res.status(401).send("Неверный email или пароль");
  }

  authorizeResponse(res, user.id).status(200).send();
});

authRouter.post("/logout", (req, res) => {
  unauthorizeResponse(res).status(200).send();
});
