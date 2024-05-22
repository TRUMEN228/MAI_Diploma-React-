import { FC } from "react";
import { SubjectInfo } from "../../api/Teacher";
import "./StudentTeachersTableRow.css";

interface IStudentTeachersTableRowProps {
  subjectInfo: SubjectInfo;
  index: number;
}

export const StudentTeachersTableRow: FC<IStudentTeachersTableRowProps> = ({
  subjectInfo,
  index
}) => {
  return (
    <tr className="teachers-table__row">
      <td className="teachers-table__cell teachers-column-1">{index + 1}</td>
      <td className="teachers-table__cell teachers-column-2">{subjectInfo.subject.name}</td>
      <td className="teachers-table__cell teachers-column-3">{subjectInfo.teacher.surname} {subjectInfo.teacher.name} {subjectInfo.teacher.lastname}</td>
    </tr>
  );
};