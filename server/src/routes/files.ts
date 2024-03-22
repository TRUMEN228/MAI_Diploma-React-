import { Router } from "express";
import multer from "multer";
import fs from "fs";

export const filesRouter = Router();

const upload = multer({
  dest: "/uploads"
})

filesRouter.post("/", upload.array('files'), (req, res) => {
  const fileList = Array.prototype.slice.call(req.files);

  fileList.forEach((file: Express.Multer.File, index: number) => {
    const newPath = `uploads/${file.originalname}`;

    fs.rename(file.path, newPath, (err) => {
      if (err) {
        console.error(`Ошибка при сохранении файла ${index}: ${err}`);
      } else {
        console.log(`Файл ${file.originalname} успешно сохранен`);
      }
    });
  });

  res.status(200).send("Файлы успешно сохранены");
});