import { FC } from "react";
import "./AdminStudentsTable.css";
import { User } from "../../api/User";
import { AdminStudentsTableRow } from "../AdminStudentsTableRow";

interface IAdminStudentsTableProps {
  students: User[];
}

export const AdminStudentsTable: FC<IAdminStudentsTableProps> = ({
  students
}) => {
  return (
    <div className="students-table__container">
      <table className="students__table">
        <thead className="table__header">
          <tr className="table__row">
            <th className="table__cell header__cell column-1">№ п/п</th>
            <th className="table__cell header__cell column-2">ФИО</th>
            <th className="table__cell header__cell column-3">Дата рождения</th>
            <th className="table__cell header__cell column-4">E-mail</th>
            <th className="table__cell header__cell column-5">Имя пользователя</th>
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
                username={item.username}
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