import { FC } from "react";
import "./TeacherSubjectsTableRow.css";

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
    <tr className="subjects-table__row">
      <td className="subjects-table__cell subjects-column-1">{number + 1}</td>
      <td className="subjects-table__cell subjects-column-2">{name}</td>
      <td className="subjects-table__cell subjects-column-3">{cathedra}</td>
      <td className="subjects-table__cell subjects-column-4">{course}</td>
      <td className="subjects-table__cell subjects-column-5">{group}</td>
    </tr>
  );
};