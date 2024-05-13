import { FC } from "react";
import { StudentStudentsTableRow } from "../StudentStudentsTableRow";
import { Student } from "../../api/Student";

interface IStudentStudentsTableProps {
  students: Student[];
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
            <StudentStudentsTableRow key={index} number={index + 1} student={item} />
          )) : null}
        </tbody>
      </table>
      {!students.length && <span>Список пуст</span>}
    </div>
  );
};