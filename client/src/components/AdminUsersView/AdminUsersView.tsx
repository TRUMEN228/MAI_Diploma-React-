import { FC, useState } from "react";
import "./AdminUsersView.css";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";
import { Institute, fetchInstitute } from "../../api/Institutes";
import { User } from "../../api/User";
import { AdminUsersStudentsForm } from "../AdminUsersStudentsForm";
import { AdminUsersTeachersForm } from "../AdminUsersTeachersForm";

interface IAdminUsersViewProps {
  instituteId: string;
}

export const AdminUsersView: FC<IAdminUsersViewProps> = ({
  instituteId
}) => {
  const emptyInstitute: Institute = {
    id: "",
    name: "",
    cathedras: []
  };

  const getInstituteQuery = useQuery({
    queryFn: () => fetchInstitute(instituteId),
    queryKey: ["institutes", instituteId],
    retry: 0
  }, queryClient);

  const [status, setStatus] = useState<User["accountStatus"]>("student");

  switch (status) {
    case "student":
      return (
        <div className="container users-view__container">
          <h1 className="users-view__title">Список пользователей</h1>
          <label className="users-view__label">
            Статус:&nbsp;
            <select
              className=""
              value={status}
              onChange={(event) => setStatus(event.currentTarget.value as User["accountStatus"])}
            >
              <option value="student">Студенты</option>
              <option value="teacher">Преподаватели</option>
            </select>
          </label>

          <AdminUsersStudentsForm institute={getInstituteQuery.isSuccess ? getInstituteQuery.data : emptyInstitute}/>
        </div>
      );
    case "teacher":
      return (
        <div className="container users-view__container">
          <h1 className="users-view__title">Список пользователей</h1>
          <label className="users-view__label">
            Статус:&nbsp;
            <select
              className=""
              value={status}
              onChange={(event) => setStatus(event.currentTarget.value as User["accountStatus"])}
            >
              <option value="student">Студенты</option>
              <option value="teacher">Преподаватели</option>
            </select>
          </label>

          <AdminUsersTeachersForm institute={getInstituteQuery.isSuccess ? getInstituteQuery.data : emptyInstitute}/>
        </div>
      );
    case "admin":
      return (
        <></>
      );
  }
};