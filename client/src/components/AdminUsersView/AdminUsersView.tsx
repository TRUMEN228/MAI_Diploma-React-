import { FC, useState } from "react";
import "./AdminUsersView.css";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";
import { fetchInstituteList } from "../../api/Institutes";
import { User } from "../../api/User";
import { AdminUsersStudentsForm } from "../AdminUsersStudentsForm";
import { FormField } from "../FormField";
import { AdminUsersTeachersForm } from "../AdminUsersTeachersForm";

export const AdminUsersView: FC = () => {
  const getInstituteListQuery = useQuery({
    queryFn: () => fetchInstituteList(),
    queryKey: ["institutes"],
    retry: 0
  }, queryClient);

  const [status, setStatus] = useState<User["accountStatus"]>("student");

  switch (status) {
    case "student":
      return (
        <div className="container users-view__container">
          <FormField labelText="Статус аккаунта:">
            <select
              className="form-field__input"
              value={status}
              onChange={(event) => setStatus(event.currentTarget.value as User["accountStatus"])}
            >
              <option value="student">Студенты</option>
              <option value="teacher">Преподаватели</option>
              <option value="admin">Администраторы</option>
            </select>
          </FormField>

          <AdminUsersStudentsForm institutes={getInstituteListQuery.isSuccess ? getInstituteListQuery.data : []}/>
        </div>
      );
    case "teacher":
      return (
        <div className="container users-view__container">
          <FormField labelText="Статус аккаунта:">
            <select
              className="form-field__input"
              value={status}
              onChange={(event) => setStatus(event.currentTarget.value as User["accountStatus"])}
            >
              <option value="student">Студенты</option>
              <option value="teacher">Преподаватели</option>
              <option value="admin">Администраторы</option>
            </select>
          </FormField>

          <AdminUsersTeachersForm institutes={getInstituteListQuery.isSuccess ? getInstituteListQuery.data : []}/>
        </div>
      );
    case "admin":
      return (
        <div className="container users-view__container">
          <FormField labelText="Статус аккаунта:">
            <select
              className="form-field__input"
              value={status}
              onChange={(event) => setStatus(event.currentTarget.value as User["accountStatus"])}
            >
              <option value="student">Студенты</option>
              <option value="teacher">Преподаватели</option>
              <option value="admin">Администраторы</option>
            </select>
          </FormField>

        </div>
      );
  }
};