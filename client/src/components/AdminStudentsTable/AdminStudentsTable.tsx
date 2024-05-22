import { FC } from "react";
import "./AdminStudentsTable.css";
import { AdminStudentsTableRow } from "../AdminStudentsTableRow";
import { Student } from "../../api/Student";

interface IAdminStudentsTableProps {
  students: Student[];
}

export const AdminStudentsTable: FC<IAdminStudentsTableProps> = ({
  students
}) => {
  return (
    <div className="admin-table__container">
      <h2 className="admin-students-table__title">Список пользователей</h2>
      <table className="admin-students__table">
        <thead className="admin-students-table__head">
          <tr className="admin-students-table__row">
            <th className="admin-students-table__head-cell admin-students-column-1">№ п/п</th>
            <th className="admin-students-table__head-cell admin-students-column-2">ФИО</th>
            <th className="admin-students-table__head-cell admin-students-column-3">Дата рождения</th>
            <th className="admin-students-table__head-cell admin-students-column-4">E-mail</th>
          </tr>
        </thead>
        <tbody className="admin-students-table__body">
          {
            students.length ?
            students.map((item, index) => (
              <AdminStudentsTableRow
                key={index}
                number={index}
                fullName={{
                  surname: item.surname,
                  name: item.name,
                  lastname: item.lastname
                }}
                birthday={item.birthday}
                email={item.email}
              />
            ))
            : null
          }
        </tbody>
      </table>
      {!students.length && <span>Список пуст</span>}
    </div>
  );
};