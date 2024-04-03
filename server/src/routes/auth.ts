import { Router } from "express";
import { z } from "zod";

import { authorizeResponse, unauthorizeResponse } from "../auth.js";
import { IUser, Users, Passwords } from "../database";

export const authRouter = Router();

const RegisterSchema = z.object({
  email: z.string().email({ message: 'Некорректный формат e-mail' }),
  username: z.string().min(6, "Имя пользователя должно содержать не менее 6 символов"),
  surname: z.string(),
  name: z.string(),
  lastname: z.string(),
  birthday: z.string(),
  groupId: z.string(),
  password: z.string()
});

const EditSchema = z.object({
  id: z.string(),
  email: z.optional(z.string().email({ message: 'Некорректный формат e-mail' })),
  username: z.optional(z.string().min(6, "Имя пользователя должно содержать не менее 6 символов")),
  surname: z.optional(z.string()),
  name: z.optional(z.string()),
  lastname: z.optional(z.string()),
  birthday: z.optional(z.string()),
  groupId: z.optional(z.string())
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

  const { email, username, surname, name, lastname, birthday, groupId, password } = bodyParseResult.data;

  let user: IUser;

  try {
    user = await Users.create(email, username, surname, name, lastname, birthday, groupId);
  } catch (error) {
    return res.status(409).send("Этот email уже занят");
  }

  await Passwords.create(user.id, password);

  authorizeResponse(res, user.id).status(201).json({ id: user.id });
});

authRouter.post("/edit", async (req, res) => {
  const bodyParseResult = EditSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.issues[0].message);
  }

  const { id, email, username, surname, name, lastname, birthday } = bodyParseResult.data;

  try {
    await Users.edit(id, email, username, surname, name, lastname, birthday)
  } catch (error) {
    return res.status(409).send("Пользователь не найден");
  }

  authorizeResponse(res, id).status(201).json({ id });
})

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

  authorizeResponse(res, user.id).status(200);
  res.json({ user });
});

authRouter.post("/logout", (req, res) => {
  unauthorizeResponse(res).status(200).send();
});
