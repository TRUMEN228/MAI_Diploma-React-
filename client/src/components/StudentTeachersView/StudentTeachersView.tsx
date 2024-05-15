import { FC } from "react";
import { SubjectsInfo } from "../../api/Teacher";
import { StudentTeachersList } from "../StudentTeachersTable";

interface IStudentTeachersViewProps {
  subjects: SubjectsInfo[];
};

export const StudentTeachersView: FC<IStudentTeachersViewProps> = ({
  subjects
}) => {
  return (
    <div>
      <StudentTeachersList subjects={subjects} />
    </div>
  );
};