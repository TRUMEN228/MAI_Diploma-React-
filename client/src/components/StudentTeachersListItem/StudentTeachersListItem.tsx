import { FC } from "react";
import { SubjectsInfo } from "../../api/Teacher";

interface IStudentTeachersListItemProps {
  subject: SubjectsInfo;
}

export const StudentTeachersListItem: FC<IStudentTeachersListItemProps> = ({
  subject
}) => {
  return (
    <li>
      <div>
        {subject.teacher.surname} {subject.teacher.name} {subject.teacher.lastname}
      </div>
      <div>
        <ul className="list-reset">
          {subject.subjects.map((item, index) => (
            <li key={index}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};