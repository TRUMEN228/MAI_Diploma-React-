import { FC } from "react";
import { SubjectInfo } from "../../api/Teacher";
import { StudentTeachersTableRow } from "../StudentTeachersTableRow";
import "./StudentTeachersTable.css";

interface IStudentTeachersTableProps {
  subjects: SubjectInfo[];
};

export const StudentTeachersTable: FC<IStudentTeachersTableProps> = ({
  subjects
}) => {
  return (
    <div className="teachers-table__container">
      <h2 className="teachers-table__title">Список предметов</h2>
      <table className="teachers-table">
        <thead className="teachers-table__head">
          <tr className="teachers-table__row">
            <th className="teachers-table__head-cell teachers-column-1">№ п/п</th>
            <th className="teachers-table__head-cell teachers-column-2">Предмет</th>
            <th className="teachers-table__head-cell teachers-column-3">Преподаватель</th>
          </tr>
        </thead>
        <tbody className="teachers-table__body">
          {subjects.map((item, index) => (
            <StudentTeachersTableRow
              key={index}
              subjectInfo={item}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}