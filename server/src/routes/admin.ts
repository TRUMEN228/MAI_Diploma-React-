import { Router } from "express";
import { Users } from "../database";

export const adminRouter = Router();

adminRouter.get('/requests', (req, res) => {
  const requests = Users.getAllRequests();

  if (!requests.length) {
    res.status(200).send("Заявок нет");
  }

  res.status(200).json(requests);
});

adminRouter.post('/accept/:userId', (req, res) => {
  const userId = req.params.userId;

  const request = Users.acceptRequest(userId);

  res.status(200).send(request);
})