import { Router } from "express";
import { Users } from "../database";
import { Admins } from "../database";

export const adminRouter = Router();

adminRouter.get('/requests', (req, res) => {
  const requests = Admins.getAllRequests();

  if (!requests.length) {
    return res.status(400).send("Заявок нет");
  }

  res.status(200).json(requests);
});

adminRouter.get('/requests/:instituteId', (req, res) => {
  const instituteId = req.params.instituteId;

  const requests = Admins.getRequestsByInstituteId(instituteId);

  if (!requests.length) {
    return res.status(400).send("Заявок нет");
  }

  res.status(200).json(requests);
})

adminRouter.post('/requests/accept/student/:userId', (req, res) => {
  const userId = req.params.userId;
  const { groupId } = req.body;

  const request = Admins.acceptStudentRequest(userId, groupId);

  res.status(200).send(request);
});

adminRouter.post('/requests/accept/teacher/:userId', (req, res) => {
  const userId = req.params.userId;
  const { subjects } = req.body;

  const request = Admins.acceptTeacherRequest(userId, subjects);

  res.status(200).send(request);
});

adminRouter.post('/requests/reject/:userId', (req, res) => {
  const userId = req.params.userId;

  Admins.removeRequest(userId);

  res.status(200).send("В регистрации отказано");
})