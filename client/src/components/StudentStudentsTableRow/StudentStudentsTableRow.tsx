import { FC } from "react";
import { Student } from "../../api/Student";
import "./StudentStudentsTableRow.css";

interface IStudentStudentsTableRowProps {
  number: number;
  student: Student;
}

export const StudentStudentsTableRow: FC<IStudentStudentsTableRowProps> = ({
  number,
  student
}) => {
  return (
    <tr className="students-table__row">
      <td className="students-table__cell students-column-1">{number}</td>
      <td className="students-table__cell students-column-2">{student.surname} {student.name} {student.lastname}</td>
      <td className="students-table__cell students-column-3">{student.email}</td>
    </tr>
  )
}