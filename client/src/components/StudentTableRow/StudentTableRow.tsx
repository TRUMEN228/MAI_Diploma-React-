import { FC } from "react";
import { User } from "../../api/User";

interface IStudentTableRowProps {
  number: number;
  student: User;
}

export const StudentTableRow: FC<IStudentTableRowProps> = ({
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