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
    <div className="table__container">
      <table className="students__table">
        <thead className="table__header">
          <tr className="table__row">
            <th className="table__cell header__cell column-1">№ п/п</th>
            <th className="table__cell header__cell column-2">ФИО</th>
            <th className="table__cell header__cell column-3">Дата рождения</th>
            <th className="table__cell header__cell column-4">E-mail</th>
          </tr>
        </thead>
        {
          students.length ?
          <tbody className="table__body">
            {students.map((item, index) => (
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
            ))}
          </tbody>
          : null
        }
      </table>
      {!students.length && <span>Список пуст</span>}
    </div>
  );
};