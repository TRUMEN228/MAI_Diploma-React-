import { FC } from "react";
import { StudentGroupInfo } from "../StudentGroupInfo";
import { Student, fetchStudentsByGroup } from "../../api/Student";
import { Cathedra, Course, Group, Institute, fetchGroupInfo } from "../../api/Institutes"
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";
import { StudentGroupView } from "../StudentGroupView";
import "./StudentGroup.css";

interface IStudentGroupProps {
  student: Student;
}

export const StudentGroup: FC<IStudentGroupProps> = ({
  student
}) => {
  const fetchInstituteQuery = useQuery({
    queryFn: () => fetchGroupInfo(student.groupId),
    queryKey: ["institutes", student.groupId],
    retry: 0
  }, queryClient);

  const fetchStudentListQuery = useQuery({
    queryFn: () => fetchStudentsByGroup(student.groupId),
    queryKey: ["students", student.groupId],
    retry: 0
  }, queryClient);

  const emptyInstitute: Institute = {
    id: "",
    name: "Не определено",
    cathedras: []
  };

  const emptyCathedra: Cathedra = {
    id: "",
    name: "Не определено",
    courses: []
  };

  const emptyCourse: Course = {
    course: "Не определено",
    groups: []
  };

  const emptyGroup: Group = {
    id: "",
    name: "Не определено",
    direction: "Не определено"
  };

  return (
    <div className="container student-group__container">
      <h1 className="student-group__title">Моя группа</h1>
      <StudentGroupInfo
        institute={fetchInstituteQuery.isSuccess ? fetchInstituteQuery.data?.institute : emptyInstitute}
        cathedra={fetchInstituteQuery.isSuccess ? fetchInstituteQuery.data?.cathedra : emptyCathedra}
        course={fetchInstituteQuery.isSuccess ? fetchInstituteQuery.data?.course : emptyCourse}
        group={fetchInstituteQuery.isSuccess ? fetchInstituteQuery.data?.group : emptyGroup}
      />
      <StudentGroupView groupId={student.groupId} students={fetchStudentListQuery.isSuccess ? fetchStudentListQuery.data : []}/>
    </div>
  );
};