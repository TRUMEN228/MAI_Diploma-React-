import { FC, useState } from "react";
import { User } from "../../api/User";
import { fetchInstitute } from "../../api/Institutes";
import "./AdminStudentRequestView.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptStudentRequest, rejectRequest } from "../../api/Admin";
import { queryClient } from "../../api/QueryClient";
import { Button } from "../Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IAdminStudentRequestViewProps {
  user: User;
  handleRefetch: () => void;
}

const AdminStudentAcceptSchema = z.object({
  cathedraId: z.string().min(1, { message: "Выберите один пункт из списка" }),
  course: z.string().min(1, { message: "Выберите один пункт из списка" }),
  groupId: z.string().min(1, { message: "Выберите один пункт из списка" })
});

type AdminStudentAcceptType = z.infer<typeof AdminStudentAcceptSchema>;

export const AdminStudentRequestView: FC<IAdminStudentRequestViewProps> = ({
  user,
  handleRefetch
}) => {
  const [cathedraId, setCathedraId] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [groupId, setGroupId] = useState<string>("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<AdminStudentAcceptType>({
    resolver: zodResolver(AdminStudentAcceptSchema)
  });

  const fetchInstituteQuery = useQuery({
    queryFn: () => fetchInstitute(user.instituteId),
    queryKey: ["institutes", user.instituteId],
    retry: 0
  }, queryClient);

  const acceptStudentRequestMutation = useMutation({
    mutationFn: (data: {groupId: string}) => acceptStudentRequest(user.id, data.groupId),
    mutationKey: ["requests", user.id]
  }, queryClient);

  const requestRejectMutation = useMutation({
    mutationFn: () => rejectRequest(user.id),
    mutationKey: ["requests", user.id]
  }, queryClient);

  const handleReject = () => {
    requestRejectMutation.mutate();

    if (requestRejectMutation.status === "success") {
      handleRefetch();
    }
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
    <form
      className="request__container"
      onSubmit={handleSubmit(({ groupId }) => {
        acceptStudentRequestMutation.mutate({ groupId });

        if (acceptStudentRequestMutation.isSuccess) {
          handleRefetch();
        }
      })}
    >
      <div className="request__user-info">
        <div className="user-info__main">
          <p className="request__label user__fullname">ФИО: <span>{user.surname} {user.name} {user.lastname}</span></p>
          <p className="request__label user__birthday">Дата рождения: <span>{formatDate(user.birthday)}</span></p>
        </div>
        <div className="user-info__second">
          <p className="request__label user__cred">E-mail: <span>{user.email}</span></p>
          <p className="request__label user__cred">Статус: <span>Студент</span></p>
        </div>
        <div className="user-info__institute">
          <label className={errors.cathedraId?.message ? "request__label user-info__institute-info error" : "request__label user-info__institute-info"}>
            Кафедра:&nbsp;
            <select
              {...register("cathedraId")}
              // value={cathedraId}
              onChange={(event) => setCathedraId(event.currentTarget.value)}
            >
              <option key="none" value="">-- Не выбрано --</option>
              {fetchInstituteQuery.data?.cathedras.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option>
              ))}
            </select>
            {errors.cathedraId?.message ? <span className="request__label-error">{errors.cathedraId.message}</span> : null}
          </label>
          <label className={errors.course?.message ? "request__label user-info__institute-info error" : "request__label user-info__institute-info"}>
            Курс:&nbsp;
            <select
              {...register("course")}
              // value={course}
              onChange={(event) => setCourse(event.currentTarget.value)}
            >
              <option key="none" value="">-- Не выбрано --</option>
              {fetchInstituteQuery.data?.cathedras.find(item => item.id === cathedraId)?.courses.map((item, index) => (
                <option key={index} value={item.course}>{item.course}</option>
              ))}
            </select>
            {errors.course?.message ? <span className="request__label-error">{errors.course.message}</span> : null}
          </label>
          <label className={errors.groupId?.message ? "request__label user-info__institute-info error" : "request__label user-info__institute-info"}>
            Группа:&nbsp;
            <select
              {...register("groupId")}
              // value={groupId}
              onChange={(event) => setGroupId(event.currentTarget.value)}
            >
              <option key="none" value="">-- Не выбрано --</option>
              {fetchInstituteQuery.data?.cathedras.find(item => item.id === cathedraId)?.courses.find(item => item.course === course)?.groups.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option>
              ))}
            </select>
            {errors.groupId?.message ? <span className="request__label-error">{errors.groupId.message}</span> : null}
          </label>
        </div>
      </div>
      <div className="request__controls">
        <Button className="request__control-button accept" /*onClick={handleAccept}*/ kind="primary" type="submit">Принять</Button>
        <Button className="request__control-button reject" onClick={handleReject} kind="primary">Отклонить</Button>
      </div>
    </form>
  );
};
