import { FC, useState } from "react";
import { AdminStudentsTable } from "../AdminStudentsTable";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";
import { fetchStudentsByGroup } from "../../api/Student";
import { Institute } from "../../api/Institutes";
import "./AdminUsersStudentsForm.css";

interface IAdminUsersStudentsFormProps {
  institute: Institute;
}

export const AdminUsersStudentsForm: FC<IAdminUsersStudentsFormProps> = ({
  institute
}) => {
  const [cathedraId, setCathedraId] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [groupId, setGroupId] = useState<string>("");

  const getStudentsQuery = useQuery({
    queryFn: () => fetchStudentsByGroup(groupId),
    queryKey: ["students", groupId],
    retry: 0
  }, queryClient);

  return (
    <div className="users__students-container">
      <div className="users__students-select-container">
        <label className="students__label">
          Кафедра:&nbsp;
          <select
            id="cathedra"
            onChange={(event) => setCathedraId(event.currentTarget.value)}
            value={cathedraId}
          >
            <option key="none" value="">-- Не выбрано --</option>
            {institute.cathedras.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <label className="students__label">
          Курс:&nbsp;
          <select
            id="course"
            onChange={(event) => setCourse(event.currentTarget.value)}
            value={course}
          >
            <option key="none" value="">-- Не выбрано --</option>
            {cathedraId ? institute.cathedras.find(item => item.id === cathedraId)?.courses.map((item) => (
              <option key={item.course} value={item.course}>{item.course}</option>
            )) : null}
          </select>
        </label>
        <label className="students__label">
          Группа:&nbsp;
          <select
            id="group"
            onChange={(event) => setGroupId(event.currentTarget.value)}
            value={groupId}
          >
            <option key="none" value="">-- Не выбрано --</option>
            {course ? institute.cathedras.find(item => item.id === cathedraId)?.courses.find(item => item.course === course)?.groups.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            )) : null}
          </select>
        </label>
      </div>

      <AdminStudentsTable
        students={getStudentsQuery.isSuccess ? getStudentsQuery.data : []}
      />
    </div>
  );
};