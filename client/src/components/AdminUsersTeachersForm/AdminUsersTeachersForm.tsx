import { FC } from "react";
import { Institute } from "../../api/Institutes";
import { useQuery } from "@tanstack/react-query";
import { fetchTeachers } from "../../api/Teacher";
import { queryClient } from "../../api/QueryClient";
import { AdminTeachersTable } from "../AdminTeachersTable";
import "./AdminUsersTeachersForm.css";

interface IAdminUsersTeachersFormProps {
  institute: Institute;
}

export const AdminUsersTeachersForm: FC<IAdminUsersTeachersFormProps> = ({
  institute
}) => {
  const getTeachersQuery = useQuery({
    queryFn: () => fetchTeachers(institute.id),
    queryKey: ["teachers", institute.id],
    retry: 0
  }, queryClient);

  return (
    <AdminTeachersTable
      institute={institute}
      teachers={getTeachersQuery.isSuccess ? getTeachersQuery.data : []}
    />
  );
};