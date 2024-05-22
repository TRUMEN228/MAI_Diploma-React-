import { FC } from "react";
import "./AdminTeachersTableRow.css";

interface IAdminTeachersTableRowProps {
  number: number;
  fullName: {
    surname: string;
    name: string;
    lastname: string;
  };
  birthday: string;
  email: string;
  subjects: {
    name: string;
    cathedra: string;
    course: string;
    group: string;
  }[];
}

export const AdminTeachersTableRow: FC<IAdminTeachersTableRowProps> = ({
  number,
  fullName,
  birthday,
  email,
  subjects
}) => {
  function formatDate(dateStr: string) {
    const date = new Date(dateStr);

    return date.toLocaleDateString('ru', {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  return (
    <>
      {subjects.map((item, index) => (
        <tr key={index} className="admin-teachers-table__row">
          {index === 0 && (
            <>
              <td rowSpan={subjects.length} className="admin-teachers-table__cell admin-teachers-column-1">{number + 1}</td>
              <td rowSpan={subjects.length} className="admin-teachers-table__cell admin-teachers-column-2">{fullName.surname} {fullName.name} {fullName.lastname}</td>
              <td rowSpan={subjects.length} className="admin-teachers-table__cell admin-teachers-column-3">{formatDate(birthday)}</td>
              <td rowSpan={subjects.length} className="admin-teachers-table__cell admin-teachers-column-4">{email}</td>
            </>
          )}
          <td className="admin-teachers-table__cell admin-teachers-column-5">{item.name}</td>
          <td className="admin-teachers-table__cell admin-teachers-column-6">{item.group}</td>
        </tr>
      ))}
    </>
  );
};