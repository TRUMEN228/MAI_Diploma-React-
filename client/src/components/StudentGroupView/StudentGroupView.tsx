import { FC } from "react";
import { User } from "../../api/User";
import { StudentStudentsTable } from "../StudentStudentsTable";

interface IStudentGroupViewProps {
  students: User[];
}

export const StudentGroupView: FC<IStudentGroupViewProps> = ({
  students
}) => {
  return (
    <div className="group__container">
      <StudentStudentsTable students={students} />
    </div>
  );
};