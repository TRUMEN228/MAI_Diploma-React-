import { FC, useState, ChangeEvent } from "react";
import { User } from "../../api/User";
import { Button } from "../Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchInstitute } from "../../api/Institutes";
import { queryClient } from "../../api/QueryClient";
import { acceptTeacherRequest, rejectRequest } from "../../api/Admin";
import { Subject } from "../../api/Teacher";
import { AdminTeacherSubjectForm } from "../AdminTeacherSubjectForm";
import "./AdminTeacherRequestView.css";
import { z } from "zod";

interface IAdminTeacherRequestViewProps {
  user: User;
  handleRefetch: () => void;
}

const AdminTeacherAcceptSchema = z.object({
  subjectId: z.string().min(1, { message: "Поле должно быть заполнено" }).max(6, { message: "Максимальная длина идентификатора: 6 символов" }),
  subjectName: z.string().min(1, { message: "Поле должно быть заполнено" }),
  subjects: z.array(z.custom<Subject>()).min(1, { message: "Добавьте хотя бы один предмет" })
});

type AdminTeacherAcceptType = z.infer<typeof AdminTeacherAcceptSchema>;

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
    console.log(subjects);

    if (subjects) {
      acceptTeacherRequestMutation.mutate();

      if (acceptTeacherRequestMutation.status === "success") {
        handleRefetch();
      }
    }
  };

  const handleReject = () => {
    requestRejectMutation.mutate();

    if (requestRejectMutation.status === "success") {
      handleRefetch();
    }
  };

  const handleAddSubject = () => {
    const newSubject: Subject = {
      id: "",
      name: "",
      groupId: "",
    };

    setSubjects([...subjects, newSubject]);
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newSubjects = subjects;
    newSubjects[index].id = event.currentTarget.value;

    setSubjects(newSubjects);
  };


  const handleNameChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newSubjects = subjects;
    newSubjects[index].name = event.currentTarget.value;

    setSubjects(newSubjects);
  };

  const handleGroupIdChange = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
    const newSubjects = subjects;
    newSubjects[index].groupId = event.currentTarget.value;

    setSubjects(newSubjects);
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  return (
    <form className="request__container">
      <div className="request__user-info">
        <div className="user-info__main">
          <p className="request__label user__fullname">ФИО: <span>{user.surname} {user.name} {user.lastname}</span></p>
          <p className="request__label user__birthday">Дата рождения: <span>{formatDate(user.birthday)}</span></p>
        </div>
        <div className="user-info__second">
          <p className="request__label user__cred">E-mail: <span>{user.email}</span></p>
          <p className="request__label user__cred">Статус: <span>Преподаватель</span></p>
        </div>
        <div className="user-info__subjects">
          <p className="request__label user__subjects">Предметы и группы: {!subjects.length && <span>Нет назначенных предметов и групп</span>}</p>
          {subjects.length ? subjects.map((item, index) => (
            <AdminTeacherSubjectForm
              key={index}
              index={index}
              institute={fetchInstituteQuery.data!}
              handleIdChange={handleIdChange}
              handleNameChange={handleNameChange}
              handleGroupIdChange={handleGroupIdChange}
            />
          )) : null}
          {/* <span className="errorka">Должен быть назначен хотя бы один предмет</span> */}
          <Button className="request_add-subject-button" onClick={handleAddSubject} kind="secondary">Добавить предмет</Button>
        </div>
      </div>
      <div className="request__controls">
        <Button className="request__control-button accept" onClick={handleAccept} kind="primary" type="submit">Принять</Button>
        <Button className="request__control-button reject" onClick={handleReject} kind="primary">Отклонить</Button>
      </div>
    </form>
  );
};