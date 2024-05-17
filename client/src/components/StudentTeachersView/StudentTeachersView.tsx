import { FC } from "react";
import { SubjectInfo } from "../../api/Teacher";
import { StudentTeachersTable } from "../StudentTeachersTable";

interface IStudentTeachersViewProps {
  subjects: SubjectInfo[];
};

export const StudentTeachersView: FC<IStudentTeachersViewProps> = ({
  subjects
}) => {
  return (
    <div>
      <StudentTeachersTable subjects={subjects} />
    </div>
  );
};