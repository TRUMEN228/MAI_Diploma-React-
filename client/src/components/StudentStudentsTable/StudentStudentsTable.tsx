import { FC } from "react";
import { User } from "../../api/User";
import { StudentTableRow } from "../StudentTableRow";

interface IStudentStudentsTableProps {
  students: User[];
}

export const StudentStudentsTable: FC<IStudentStudentsTableProps> = ({
  students
}) => {
  return (
    <div className="students-table__container">
      <table>
        <thead>
          <tr>
            <th>№ п/п</th>
            <th>ФИО</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {students.length ? students.map((item, index) => (
            <StudentTableRow key={index} number={index + 1} student={item} />
          )) : null}
        </tbody>
      </table>
      {!students.length && <span>Список пуст</span>}
    </div>
  );
};