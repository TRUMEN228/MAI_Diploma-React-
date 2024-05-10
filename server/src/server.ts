import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { usersRouter, authRouter } from "./routes";
import { sleep } from "./sleep";
import { institutesRouter } from "./routes/institutes";
import { messagesRouter } from "./routes/messages";
import { adminRouter } from "./routes/admin";
import { studentsRouter } from "./routes/students";
import { teachersRouter } from "./routes/teachers";

const PORT = 4000;

const server = express();

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

server.use(json(), cookieParser(), cors(), sleep([400, 1500]));

server.use('/users', usersRouter);
server.use('/institutes', institutesRouter);
server.use('/messages', messagesRouter);
server.use('/admin', adminRouter);
server.use('/students', studentsRouter);
server.use('/teachers', teachersRouter);
server.use('/', authRouter);
