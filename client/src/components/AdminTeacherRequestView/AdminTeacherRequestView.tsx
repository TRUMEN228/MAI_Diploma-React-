import { ChangeEvent, FC, useState } from "react";
import { User } from "../../api/User";
import { Button } from "../Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchInstitute } from "../../api/Institutes";
import { queryClient } from "../../api/QueryClient";
import { acceptTeacherRequest, rejectRequest } from "../../api/Admin";
import { Subject } from "../../api/Teacher";
import { AdminTeacherSubjectForm } from "../AdminTeacherSubjectForm";

interface IAdminTeacherRequestViewProps {
  user: User;
  handleRefetch: () => void;
}

export const AdminTeacherRequestView: FC<IAdminTeacherRequestViewProps> = ({
  user,
  handleRefetch
}) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchInstituteQuery = useQuery({
    queryFn: () => fetchInstitute(user.instituteId),
    queryKey: ["institutes", user.instituteId],
    retry: 0
  }, queryClient);

  const acceptTeacherRequestMutation = useMutation({
    mutationFn: () => acceptTeacherRequest(user.id, subjects),
    mutationKey: ["requests", user.id]
  }, queryClient);

  const requestRejectMutation = useMutation({
    mutationFn: () => rejectRequest(user.id),
    mutationKey: ["requests", user.id]
  }, queryClient);

  const handleAccept = () => {
    if (subjects) {
      acceptTeacherRequestMutation.mutate();
    }
  };

  const handleReject = () => {
    requestRejectMutation.mutate();
    handleRefetch();
  };

  const handleAddSubject = () => {
    const newSubject: Subject = {
      name: "",
      groupId: "",
    };

    setSubjects([...subjects, newSubject]);
  };

  const handlePropChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number, prop: "name" | "groupId") => {
    const newSubjects = subjects;
    newSubjects[index][prop] = event.currentTarget.value;

    setSubjects(newSubjects);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  return (
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
        </div>
        <div className="user-info__subjects">
          <p>Предметы и группы:</p>
          {subjects.length ? subjects.map((item, index) => (
            <AdminTeacherSubjectForm
              key={index}
              subject={item}
              index={index}
              institute={fetchInstituteQuery.data!}
              handlePropChange={handlePropChange}
            />
          )) : <span>Нет назначенных предметов и групп</span>}
          <Button onClick={handleAddSubject} kind="secondary">Добавить предмет</Button>
        </div>
      </div>
      <div className="request__controls">
        <Button onClick={handleAccept} kind="primary">Принять</Button>
        <Button onClick={handleReject} kind="primary">Отклонить</Button>
      </div>
    </div>
  );
};