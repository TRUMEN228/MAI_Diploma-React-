import { Router } from "express";
import { z } from "zod";

import { authorizeResponse, unauthorizeResponse } from "../auth.js";
import { IUser, Users, Passwords } from "../database";

export const authRouter = Router();

const RegisterSchema = z.object({
  email: z.string().email({ message: 'Некорректный формат e-mail' }),
  username: z.string().min(6, "Имя пользователя должно содержать не менее 6 символов"),
  fullName: z.string().regex(/^[А-я]{1}[а-я]+\s[А-я]{1}[а-я]+\s[А-я]{1}[а-я]+$/, "ФИО должно иметь формат \"Иванов Иван Иванович\""),
  birthday: z.string(),
  password: z.string()
});

const LoginSchema = z.object({
  email: z.string().email({ message: 'Некорректный формат e-mail' }),
  password: z.string()
});

authRouter.post("/register", async (req, res) => {
  const bodyParseResult = RegisterSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.issues[0].message);
  }

  const { email, username, fullName, birthday, password } = bodyParseResult.data;

  let user: IUser;

  try {
    user = await Users.create(email, username, fullName, birthday);
  } catch (error) {
    return res.status(409).send("Этот email уже занят");
  }

  await Passwords.create(user.id, password);

  authorizeResponse(res, user.id).status(201).json({ id: user.id });
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