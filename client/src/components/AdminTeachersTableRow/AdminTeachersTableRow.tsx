import { FC } from "react";

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
        <tr key={index} className="table__row">
          {index === 0 && (
            <>
              <td rowSpan={subjects.length} className="table__cell">{number + 1}</td>
              <td rowSpan={subjects.length} className="table__cell">{fullName.surname} {fullName.name} {fullName.lastname}</td>
              <td rowSpan={subjects.length} className="table__cell">{formatDate(birthday)}</td>
              <td rowSpan={subjects.length} className="table__cell">{email}</td>
            </>
          )}
          <td className="table__cell">{item.name}</td>
          <td className="table__cell">{item.cathedra}</td>
          <td className="table__cell">{item.course}</td>
          <td className="table__cell">{item.group}</td>
        </tr>
      ))}
    </>
  );
};