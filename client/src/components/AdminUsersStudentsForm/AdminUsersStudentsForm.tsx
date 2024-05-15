import { FC, useState } from "react";
import { FormField } from "../FormField";
import { AdminStudentsTable } from "../AdminStudentsTable";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";
import { fetchStudentsByGroup } from "../../api/Student";
import { Institute } from "../../api/Institutes";

interface IAdminUsersStudentsFormProps {
  institutes: Institute[];
}

export const AdminUsersStudentsForm: FC<IAdminUsersStudentsFormProps> = ({
  institutes
}) => {
  const [instituteId, setInstituteId] = useState<string>("");
  const [cathedraId, setCathedraId] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [groupId, setGroupId] = useState<string>("");

  const getStudentsQuery = useQuery({
    queryFn: () => fetchStudentsByGroup(groupId),
    queryKey: ["students", groupId],
    retry: 0
  }, queryClient);

  return (
    <>
      <form className="form">
        <FormField
          labelText="ВУЗ:"
        >
          <select
            id="institute"
            className="form-field__input"
            onChange={(event) => setInstituteId(event.currentTarget.value)}
            value={instituteId}
          >
            <option key="none" value="">-- Выберите ВУЗ --</option>
            {institutes.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </FormField>
        <FormField
          labelText="Кафедра:"
        >
          <select
            id="cathedra"
            className="form-field__input"
            onChange={(event) => setCathedraId(event.currentTarget.value)}
            value={cathedraId}
          >
            <option key="none" value="">-- Выберите кафедру --</option>
            {instituteId ? institutes.find(item => item.id === instituteId)?.cathedras.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            )) : null}
          </select>
        </FormField>
        <FormField
          labelText="Выберите курс:"
        >
          <select
            id="course"
            className="form-field__input"
            onChange={(event) => setCourse(event.currentTarget.value)}
            value={course}
          >
            <option key="none" value="">-- Выберите курс --</option>
            {cathedraId ? institutes.find(item => item.id === instituteId)?.cathedras.find(item => item.id === cathedraId)?.courses.map((item) => (
              <option key={item.course} value={item.course}>{item.course}</option>
            )) : null}
          </select>
        </FormField>
        <FormField
          labelText="Выберите группу:"
        >
          <select
            id="group"
            className="form-field__input"
            onChange={(event) => setGroupId(event.currentTarget.value)}
            value={groupId}
          >
            <option key="none" value="">-- Выберите группу --</option>
            {course ? institutes.find(item => item.id === instituteId)?.cathedras.find(item => item.id === cathedraId)?.courses.find(item => item.course === course)?.groups.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            )) : null}
          </select>
        </FormField>
      </form>

      <AdminStudentsTable
        students={getStudentsQuery.isSuccess ? getStudentsQuery.data : []}
      />
    </>
  );
};