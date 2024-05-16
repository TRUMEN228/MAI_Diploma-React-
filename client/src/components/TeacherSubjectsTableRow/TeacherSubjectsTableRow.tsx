import { FC } from "react";

interface ITeacherSubjectsTableRowProps {
  number: number;
  name: string;
  cathedra: string;
  course: string;
  group: string;
}

export const TeacherSubjectsTableRow: FC<ITeacherSubjectsTableRowProps> = ({
  number,
  name,
  cathedra,
  course,
  group
}) => {
  return (
    <tr className="table__row">
      <td className="table__cell column-1">{number + 1}</td>
      <td className="table__cell column-2">{name}</td>
      <td className="table__cell column-3">{cathedra}</td>
      <td className="table__cell column-4">{course}</td>
      <td className="table__cell column-5">{group}</td>
    </tr>
  );
};