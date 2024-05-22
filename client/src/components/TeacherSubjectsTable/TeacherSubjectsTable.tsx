import { FC } from "react";
import { Subject } from "../../api/Teacher";
import { Institute } from "../../api/Institutes";
import { TeacherSubjectsTableRow } from "../TeacherSubjectsTableRow";
import "./TeacherSubjectsTable.css";

interface ITeacherSubjectsTableProps {
  institute: Institute;
  subjects: Subject[];
}

export const TeacherSubjectsTable: FC<ITeacherSubjectsTableProps> = ({
  institute,
  subjects
}) => {
  function splitGroupId(groupId: string) {
    const props = groupId.split(".", 3);

    return {
      instituteId: props[0],
      cathedraId: props[1],
      course: props[2],
    };
  }

  return (
    <table className="subjects-table">
      <thead className="subjects-table__head">
        <tr className="subjects-table__row">
          <th className="subjects-table__head-cell subjects-column-1">№ п/п</th>
          <th className="subjects-table__head-cell subjects-column-2">Предмет</th>
          <th className="subjects-table__head-cell subjects-column-3">Кафедра</th>
          <th className="subjects-table__head-cell subjects-column-4">Курс</th>
          <th className="subjects-table__head-cell subjects-column-5">Группа</th>
        </tr>
      </thead>
      <tbody className="subjects-table__body">
        {subjects.map((item, index) => (
          <TeacherSubjectsTableRow
            key={index}
            number={index}
            name={item.name}
            cathedra={institute.cathedras.find(prop => prop.id === splitGroupId(item.groupId).cathedraId)?.name!}
            course={institute.cathedras.find(prop => prop.id === splitGroupId(item.groupId).cathedraId)?.courses.find(prop => prop.course === splitGroupId(item.groupId).course)?.course!}
            group={institute.cathedras.find(prop => prop.id === splitGroupId(item.groupId).cathedraId)?.courses.find(prop => prop.course === splitGroupId(item.groupId).course)?.groups.find(prop => prop.id === item.groupId)?.name!}
          />
        ))}
      </tbody>
    </table>
  )
}