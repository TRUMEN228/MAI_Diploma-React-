import { FC, useState } from "react";
import { User } from "../../api/User";
import "./AdminRequestView.css";
import { useMutation } from "@tanstack/react-query";
import { acceptRequest, rejectRequest } from "../../api/Admin";
import { queryClient } from "../../api/QueryClient";
import { Button } from "../Button";

interface IAdminRequestViewProps {
  user: User;
  instituteName?: string;
  cathedraName?: string;
  courseName?: string;
  group?: string;
}

export const AdminRequestView: FC<IAdminRequestViewProps> = ({
  user,
  instituteName,
  cathedraName,
  courseName,
  group
}) => {
  const [userStatus, setUserStatus] = useState<string>(user.accountStatus);

  const requestAcceptMutation = useMutation({
    mutationFn: () => acceptRequest(user.id, userStatus),
    mutationKey: ["requests", user.id]
  }, queryClient);

  const requestRejectMutation = useMutation({
    mutationFn: () => rejectRequest(user.id),
    mutationKey: ["requests", user.id]
  }, queryClient);

  const handleAccept = () => {
    requestAcceptMutation.mutate();
  }

  const handleReject = () => {
    requestRejectMutation.mutate();
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }

  return(
    <div className="request__container">
      <div className="request__user-info">
        <div className="user-info__main">
          <p className="p user__fullname">ФИО: {user.surname} {user.name} {user.lastname}</p>
          <p className="p user__birthday">Дата рождения: {formatDate(user.birthday)}</p>
        </div>
        <div className="user-info__second">
          <p className="p user__cred">E-mail: {user.email}</p>
          <p className="p user__cred">Логин: {user.username}</p>
          <p className="p user__cred">Статус:&nbsp;
            <select
              name="status"
              className="user__status"
              value={userStatus}
              onChange={(event) => setUserStatus(event.currentTarget.value)}
            >
              <option value="student">Студент</option>
              <option value="teacher">Преподаватель</option>
              <option value="admin">Администратор</option>
            </select>
          </p>
        </div>
        <div className="user-info__institute">
          <p className="p user-info__institute-info">ВУЗ: {instituteName}</p>
          <p className="p user-info__institute-info">Кафедра: {cathedraName}</p>
          <p className="p user-info__institute-info">Курс: {courseName}</p>
          <p className="p user-info__institute-info">Группа: {group}</p>
        </div>
      </div>
      <div className="request__controls">
        <Button onClick={handleAccept} kind="primary">Принять</Button>
        <Button onClick={handleReject} kind="primary">Отклонить</Button>
      </div>
    </div>
  );
};
