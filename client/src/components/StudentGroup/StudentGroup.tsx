import { FC } from "react";
import { StudentGroupInfo } from "../StudentGroupInfo";
import { User, fetchStudentsByGroup } from "../../api/User";
import { Cathedra, Course, Group, Institute, fetchInstitute } from "../../api/Institutes"
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";
import { StudentGroupView } from "../StudentGroupView";

interface IStudentGroupProps {
  user: User;
}

export const StudentGroup: FC<IStudentGroupProps> = ({
  user
}) => {
  const emptyInstitute: Institute = {
    id: "",
    name: "Не найдено",
    cathedras: []
  };

  const emptyCathedra: Cathedra = {
    id: "",
    name: "Не найдено",
    courses: []
  };

  const emptyCourse: Course = {
    course: "Не найдено",
    groups: []
  };

  const emptyGroup: Group = {
    id: "",
    direction: "",
    name: "Не найдено"
  };

  const fetchInstituteQuery = useQuery({
    queryFn: () => fetchInstitute(user.groupId),
    queryKey: ["institutes", user.groupId],
    retry: 0
  }, queryClient);

  const fetchStudentListQuery = useQuery({
    queryFn: () => fetchStudentsByGroup(user.groupId),
    queryKey: ["students", user.groupId],
    retry: 0
  }, queryClient);

  return (
    <div className="container">
      <StudentGroupInfo
        institute={fetchInstituteQuery.isSuccess ? fetchInstituteQuery.data.institute : emptyInstitute}
        cathedra={fetchInstituteQuery.isSuccess ? fetchInstituteQuery.data.cathedra : emptyCathedra}
        course={fetchInstituteQuery.isSuccess ? fetchInstituteQuery.data.course : emptyCourse}
        group={fetchInstituteQuery.isSuccess ? fetchInstituteQuery.data.group : emptyGroup}
      />
      <StudentGroupView students={fetchStudentListQuery.isSuccess ? fetchStudentListQuery.data : []}/>
    </div>
  );
};