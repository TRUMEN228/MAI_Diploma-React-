import { FC } from "react";
import { Student } from "../../api/Student";

interface IStudentStudentsTableRowProps {
  number: number;
  student: Student;
}

export const StudentStudentsTableRow: FC<IStudentStudentsTableRowProps> = ({
  number,
  student
}) => {
  return (
    <tr className="table__row">
      <td className="table__cell">{number}</td>
      <td className="table__cell">{student.surname} {student.name} {student.lastname}</td>
      <td className="table__cell">{student.email}</td>
    </tr>
  )
}