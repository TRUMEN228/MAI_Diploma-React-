import { FC } from "react";
import { Teacher } from "../../api/Teacher";
import { useQuery } from "@tanstack/react-query";
import { Institute, fetchInstitute } from "../../api/Institutes";
import { queryClient } from "../../api/QueryClient";
import { TeacherSubjectsTable } from "../TeacherSubjectsTable";
import "./TeacherSubjects.css";

interface ITeacherSubjectsProps {
  teacher: Teacher;
}

export const TeacherSubjects: FC<ITeacherSubjectsProps> = ({
  teacher
}) => {
  const emptyInstitute: Institute = {
    id: "",
    name: "",
    cathedras: []
  };

  const getInstituteQuery = useQuery({
    queryFn: () => fetchInstitute(teacher.instituteId),
    queryKey: ["institutes", teacher.instituteId],
    retry: 0
  }, queryClient);

  return (
    <div className="container teacher-subjects__container">
      <h1 className="teacher-subjects__title">Мои предметы</h1>
      <TeacherSubjectsTable
        institute={getInstituteQuery.isSuccess ? getInstituteQuery.data : emptyInstitute}
        subjects={teacher.subjects}
      />
    </div>
  );
};