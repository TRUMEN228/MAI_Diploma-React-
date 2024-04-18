import { Router } from "express";
import { Users } from "../database";

export const adminRouter = Router();

adminRouter.get('/requests', (req, res) => {
  const requests = Users.getAllRequests();

  if (!requests.length) {
    return res.status(400).send("Заявок нет");
  }

  res.status(200).json(requests);
});

adminRouter.post('/requests/accept/:userId', (req, res) => {
  const userId = req.params.userId;
  const { userStatus } = req.body;

  const request = Users.acceptRequest(userId, userStatus);

  res.status(200).send(request);
});

adminRouter.post('/requests/reject/:userId', (req, res) => {
  const userId = req.params.userId;

  Users.removeRequest(userId);

  res.status(200).send("В регистрации отказано");
})