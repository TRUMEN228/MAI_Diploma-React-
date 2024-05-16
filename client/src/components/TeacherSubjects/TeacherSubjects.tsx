import { FC } from "react";
import { Teacher } from "../../api/Teacher";
import { useQuery } from "@tanstack/react-query";
import { Institute, fetchInstitute } from "../../api/Institutes";
import { queryClient } from "../../api/QueryClient";
import { TeacherSubjectsTable } from "../TeacherSubjectsTable";

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
    <div className="container subjects__container">
      <TeacherSubjectsTable
        institute={getInstituteQuery.isSuccess ? getInstituteQuery.data : emptyInstitute}
        subjects={teacher.subjects}
      />
    </div>
  );
};