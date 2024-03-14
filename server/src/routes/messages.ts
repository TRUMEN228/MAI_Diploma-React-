import { Router } from "express";
import { z } from "zod";
import { IFile, Messages } from "../database/Messages";

export const messagesRouter = Router();

messagesRouter.get("/", (req, res) => {
  res.status(200).json(Messages.getAll());
});

messagesRouter.get("/group", (req, res) => {
  const group = req.body;

  res.status(200).json(Messages.getGroup(group));
});

const CreateMessageSchema = z.object({
  text: z.string(),
  userId: z.string(),
  group:  z.string(),
  files: z.optional(z.array(z.custom<IFile>()))
});

messagesRouter.post("/", async (req, res) => {
  const bodyParseResult = CreateMessageSchema.safeParse(req);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.issues);
  }

  const { text, userId, group, files } = bodyParseResult.data;

  const message = await Messages.create(text, userId, group, files);

  res.status(200).send(message.id);
});