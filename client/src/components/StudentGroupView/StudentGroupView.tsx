import { FC } from "react";
import { StudentStudentsTable } from "../StudentStudentsTable";
import { Student } from "../../api/Student";

interface IStudentGroupViewProps {
  students: Student[];
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