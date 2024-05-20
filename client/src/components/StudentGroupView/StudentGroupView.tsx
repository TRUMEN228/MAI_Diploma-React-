import { FC } from "react";
import { StudentStudentsTable } from "../StudentStudentsTable";
import { Student } from "../../api/Student";
import { StudentTeachersTable } from "../StudentTeachersTable";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjectsByGroupId } from "../../api/Teacher";
import { queryClient } from "../../api/QueryClient";
import "./StudentGroupView.css";

interface IStudentGroupViewProps {
  students: Student[];
  groupId: string;
}

export const StudentGroupView: FC<IStudentGroupViewProps> = ({
  students,
  groupId
}) => {
  const fetchSubjectsQuery = useQuery({
    queryFn: () => fetchSubjectsByGroupId(groupId),
    queryKey: ["subjects", groupId],
    retry: 0
  }, queryClient);

  return (
    <div className="group-view__container">
      <StudentStudentsTable students={students} />
      <StudentTeachersTable subjects={fetchSubjectsQuery.isSuccess ? fetchSubjectsQuery.data : []} />
    </div>
  );
};