import { FC } from "react";
import "./AdminStudentsTableRow.css";

interface IAdminStudentsTableRowProps {
  number: number;
  fullName: {
    surname: string;
    name: string;
    lastname: string;
  };
  birthday: string;
  email: string;
};

export const AdminStudentsTableRow: FC<IAdminStudentsTableRowProps> = ({
  number,
  fullName,
  birthday,
  email,
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
    <tr className="table__row">
      <td className="table__cell column-1">{number + 1}</td>
      <td className="table__cell column-2">{fullName.surname} {fullName.name} {fullName.lastname}</td>
      <td className="table__cell column-3">{formatDate(birthday)}</td>
      <td className="table__cell column-4">{email}</td>
    </tr>
  );
};