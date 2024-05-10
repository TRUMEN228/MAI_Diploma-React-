import { FC, useState } from "react";
import { User } from "../../api/User";
import { fetchInstitute } from "../../api/Institutes";
import "./AdminStudentRequestView.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptStudentRequest, rejectRequest } from "../../api/Admin";
import { queryClient } from "../../api/QueryClient";
import { Button } from "../Button";

interface IAdminStudentRequestViewProps {
  user: User;
  handleRefetch: () => void;
}

export const AdminStudentRequestView: FC<IAdminStudentRequestViewProps> = ({
  user,
  handleRefetch
}) => {
  const [cathedraId, setCathedraId] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [groupId, setGroupId] = useState<string>("");

  const fetchInstituteQuery = useQuery({
    queryFn: () => fetchInstitute(user.instituteId),
    queryKey: ["institutes", user.instituteId],
    retry: 0
  }, queryClient);

  const acceptStudentRequestMutation = useMutation({
    mutationFn: () => acceptStudentRequest(user.id, groupId),
    mutationKey: ["requests", user.id]
  }, queryClient);

  const requestRejectMutation = useMutation({
    mutationFn: () => rejectRequest(user.id),
    mutationKey: ["requests", user.id]
  }, queryClient);

  const handleAccept = () => {
    if (groupId) {
      acceptStudentRequestMutation.mutate();
    }
  }

  const handleReject = () => {
    requestRejectMutation.mutate();
    handleRefetch();
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
          <p className="p user__cred">Статус: {user.accountStatus}</p>
        </div>
        <div className="user-info__institute">
          <p className="p user-info__institute-info">ВУЗ: {fetchInstituteQuery.data?.name}</p>
          <p className="p user-info__institute-info">Кафедра:&nbsp;
            <select
              value={cathedraId}
              onChange={(event) => setCathedraId(event.currentTarget.value)}
            >
              <option key="none" value="">-- Не выбрано --</option>
              {fetchInstituteQuery.data?.cathedras.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option>
              ))}
            </select>
          </p>
          <p className="p user-info__institute-info">Курс:&nbsp;
            <select
              value={course}
              onChange={(event) => setCourse(event.currentTarget.value)}
            >
              <option key="none" value="">-- Не выбрано --</option>
              {cathedraId ? fetchInstituteQuery.data?.cathedras.find(item => item.id === cathedraId)?.courses.map((item, index) => (
                <option key={index} value={item.course}>{item.course}</option>
              )) : null}
            </select>
          </p>
          <p className="p user-info__institute-info">Группа:&nbsp;
            <select
              value={groupId}
              onChange={(event) => setGroupId(event.currentTarget.value)}
            >
              <option key="none" value="">-- Не выбрано --</option>
              {course ? fetchInstituteQuery.data?.cathedras.find(item => item.id === cathedraId)?.courses.find(item => item.course === course)?.groups.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option>
              )) : null}
            </select>
          </p>
        </div>
      </div>
      <div className="request__controls">
        <Button onClick={handleAccept} kind="primary">Принять</Button>
        <Button onClick={handleReject} kind="primary">Отклонить</Button>
      </div>
    </div>
  );
};
