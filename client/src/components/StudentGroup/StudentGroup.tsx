import { FC } from "react";
import { StudentGroupInfo } from "../StudentGroupInfo";
import { Student, fetchStudentsByGroup } from "../../api/Student";
import { fetchGroupInfo } from "../../api/Institutes"
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";
import { StudentGroupView } from "../StudentGroupView";

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

  return (
    <div className="container">
      <StudentGroupInfo
        institute={fetchInstituteQuery.data?.institute!}
        cathedra={fetchInstituteQuery.data?.cathedra!}
        course={fetchInstituteQuery.data?.course!}
        group={fetchInstituteQuery.data?.group!}
      />
      <StudentGroupView students={fetchStudentListQuery.isSuccess ? fetchStudentListQuery.data : []}/>
    </div>
  );
};