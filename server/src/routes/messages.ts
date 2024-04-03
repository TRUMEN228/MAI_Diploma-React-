import { Router } from "express";
import { z } from "zod";
import { Messages, File } from "../database/Messages";
import multer from "multer";
import fs from "fs";
import path from "path";

export const messagesRouter = Router();

const upload = multer({});

const MESSAGE_MAX_LENGTH = 100;

const formatDate = (date: Date) => {
  const dateDay = date.getDate().toString().padStart(2, '0');
  const dateMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const dateYear = date.getFullYear();

  return `${dateDay}.${dateMonth}.${dateYear}`;
}

messagesRouter.get("/", (req, res) => {
  res.status(200).json(Messages.getAll());
});

const CreateMessageSchema = z.object({
  text: z.string().max(MESSAGE_MAX_LENGTH, `Сообщение может содержать не более ${MESSAGE_MAX_LENGTH} символов`),
  userId: z.string(),
  groupId: z.string(),
});

messagesRouter.post("/", upload.array('files'), async (req, res) => {
  const bodyParseResult = CreateMessageSchema.safeParse(JSON.parse(req.body.data));

  const fileList = Array.prototype.slice.call(req.files);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.issues);
  }

  const { text, userId, groupId } = bodyParseResult.data;

  const messageFiles: File[] = [];
  const date = new Date();

  const filesDir = `uploads/${groupId}/${formatDate(date)}`;

  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
  }

  fileList.forEach((file: Express.Multer.File, index: number) => {
    const fileObj: File = {
      name: file.originalname,
      storageName: file.originalname,
      size: file.size,
      type: file.mimetype,
      downloadUrl: `http://localhost:5173/api/messages/download/${groupId}/${formatDate(date)}/${file.originalname}`
    };

    const filePath = path.join(filesDir, file.originalname);

    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        console.error(`Ошибка при сохранении файла ${index}: ${err}`);
      } else {
        console.log(`Файл ${file.originalname} успешно сохранен`);
      }
    });

    messageFiles.push(fileObj);
  });

  const message = await Messages.create(text, userId, groupId, messageFiles);

  res.status(200).send(message.id);
});

messagesRouter.get("/download/:groupId/:date/:fileName", (req, res) => {
  const groupId = req.params.groupId;
  const date = req.params.date;
  const fileName = req.params.fileName;

  const filePath = path.join('uploads', groupId, date, fileName);

  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Deposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/octet-stream');

    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(404).send("Файл не найден");
  }
});
