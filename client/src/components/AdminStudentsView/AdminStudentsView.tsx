import { FC, useState } from "react";
import "./AdminStudentsView.css";
import { AdminStudentsTable } from "../AdminStudentsTable";
import { useQuery } from "@tanstack/react-query";
import { fetchStudentsByGroup } from "../../api/Student";
import { queryClient } from "../../api/QueryClient";
import { fetchInstituteList } from "../../api/Institutes";
import { FormField } from "../FormField";

export const AdminStudentsView: FC = () => {
  const [instituteId, setInstituteId] = useState<string>("");
  const [cathedraId, setCathedraId] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [groupId, setGroupId] = useState<string>("");

  const getStudentsQuery = useQuery({
    queryFn: () => fetchStudentsByGroup(groupId),
    queryKey: ["students", groupId],
    retry: 0
  }, queryClient);

  const getInstituteListQuery = useQuery({
    queryFn: () => fetchInstituteList(),
    queryKey: ["institutes"],
    retry: 0
  }, queryClient);

  return (
    <div className="container students-view__container">
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
            {getInstituteListQuery.data?.map((item) => (
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
            {instituteId ? getInstituteListQuery.data?.find(item => item.id === instituteId)?.cathedras.map((item) => (
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
            {cathedraId ? getInstituteListQuery.data?.find(item => item.id === instituteId)?.cathedras.find(item => item.id === cathedraId)?.courses.map((item) => (
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
            {course ? getInstituteListQuery.data?.find(item => item.id === instituteId)?.cathedras.find(item => item.id === cathedraId)?.courses.find(item => item.course === course)?.groups.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            )) : null}
          </select>
        </FormField>
      </form>

      <AdminStudentsTable
        students={getStudentsQuery.data?.length ? getStudentsQuery.data : []}
      />
    </div>
  );
};