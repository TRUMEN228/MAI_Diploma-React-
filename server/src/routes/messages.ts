import { Router } from "express";
import { z } from "zod";
import { Messages, File } from "../database/Messages";
import multer from "multer";
import path from "path";

export const messagesRouter = Router();

const upload = multer({
  dest: "uploads/"
})

const MESSAGE_MAX_LENGTH = 100;
const FILES_DIR = "../../uploads/";

messagesRouter.get("/", (req, res) => {
  res.status(200).json(Messages.getAll());
});

messagesRouter.get("/groupId", (req, res) => {
  const groupId = req.body;

  res.status(200).json(Messages.getByGroupId(groupId));
});

const CreateMessageSchema = z.object({
  text: z.string().max(MESSAGE_MAX_LENGTH, `Сообщение может содержать не более ${MESSAGE_MAX_LENGTH} символов`),
  userId: z.string(),
  groupId: z.string(),
  files: z.optional(z.array(z.custom<File | null>()))
});

messagesRouter.post("/", async (req, res) => {
  const bodyParseResult = CreateMessageSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.issues);
  }

  const { text, userId, groupId, files } = bodyParseResult.data;

  const message = await Messages.create(text, userId, groupId, files);

  res.status(200).send(message.id);
});

// messagesRouter.post("/files", upload.array('messageFiles'), (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(200).send("Файлов не было обнаружено");
//   }

//   const files = req.files;
//   const uploadPath = FILES_DIR + files.name;

//   for (let i in files) {
//     files[i].mv()
//   }

// })