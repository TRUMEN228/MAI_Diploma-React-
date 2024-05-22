import { FC } from "react";
import { StudentStudentsTableRow } from "../StudentStudentsTableRow";
import { Student } from "../../api/Student";
import "./StudentStudentsTable.css";

interface IStudentStudentsTableProps {
  students: Student[];
}

export const StudentStudentsTable: FC<IStudentStudentsTableProps> = ({
  students
}) => {
  return (
    <div className="students-table__container">
      <h2 className="students-table__title">Список группы</h2>
      <table className="students-table">
        <thead className="students-table__head">
          <tr className="students-table__row">
            <th className="students-table__head-cell students-column-1">№ п/п</th>
            <th className="students-table__head-cell students-column-2">ФИО</th>
            <th className="students-table__head-cell students-column-3">E-mail</th>
          </tr>
        </thead>
        <tbody className="students-table__body">
          {students.length ? students.map((item, index) => (
            <StudentStudentsTableRow key={index} number={index + 1} student={item} />
          )) : null}
        </tbody>
      </table>
      {!students.length && <span>Список пуст</span>}
    </div>
  );
};