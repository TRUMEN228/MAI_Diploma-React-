import { FC, useState } from "react";
import { FormField } from "../FormField";
import { Institute } from "../../api/Institutes";
import { useQuery } from "@tanstack/react-query";
import { fetchTeachers } from "../../api/Teacher";
import { queryClient } from "../../api/QueryClient";
import { AdminTeachersTable } from "../AdminTeachersTable";

interface IAdminUsersTeachersFormProps {
  institutes: Institute[];
}

export const AdminUsersTeachersForm: FC<IAdminUsersTeachersFormProps> = ({
  institutes
}) => {
  const [instituteId, setInstituteId] = useState<string>("");

  const getTeachersQuery = useQuery({
    queryFn: () => fetchTeachers(instituteId),
    queryKey: ["teachers", instituteId],
    retry: 0
  }, queryClient);

  return (
    <form>
      <FormField
        labelText="ВУЗ:"
      >
        <select
          className="form-field__input"
          onChange={(event) => setInstituteId(event.currentTarget.value)}
          value={instituteId}
        >
          <option key="none" value="">-- Выберите ВУЗ --</option>
          {institutes.map((item, index) => (
            <option key={index} value={item.id}>{item.name}</option>
          ))}
        </select>
      </FormField>

      <AdminTeachersTable
        institute={institutes.find(item => item.id === instituteId)!}
        teachers={getTeachersQuery.isSuccess ? getTeachersQuery.data : []}
      />
    </form>
  );
};