import { FC } from "react";
import { SubjectsInfo } from "../../api/Teacher";
import { StudentTeachersListItem } from "../StudentTeachersListItem";

interface IStudentTeachersListProps {
  subjects: SubjectsInfo[];
};

export const StudentTeachersList: FC<IStudentTeachersListProps> = ({
  subjects
}) => {
  return (
    <div>
      <ul className="list-reset">
        {subjects.map((item, index) => (
          <StudentTeachersListItem key={index} subject={item} />
        ))}
      </ul>
    </div>
  )
}