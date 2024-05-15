import { FC } from "react";
import { SubjectInfo } from "../../api/Teacher";

interface IStudentTeachersTableRowProps {
  subjectInfo: SubjectInfo;
  index: number;
}

export const StudentTeachersTableRow: FC<IStudentTeachersTableRowProps> = ({
  subjectInfo,
  index
}) => {
  return (
    <tr>
      <td className="table__cell">{index + 1}</td>
      <td className="table__cell">{subjectInfo.subject.name}</td>
      <td className="table__cell">{subjectInfo.teacher.surname} {subjectInfo.teacher.name} {subjectInfo.teacher.lastname}</td>
    </tr>
  );
};