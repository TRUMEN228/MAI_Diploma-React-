import { FC } from "react";
import { Subject } from "../../api/Teacher";
import { Institute } from "../../api/Institutes";
import { TeacherSubjectsTableRow } from "../TeacherSubjectsTableRow";

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
    <table>
      <thead className="table__head">
        <tr className="table__row">
          <th className="table__cell header__cell column-1">№ п/п</th>
          <th className="table__cell header__cell column-2">Предмет</th>
          <th className="table__cell header__cell column-3">Кафедра</th>
          <th className="table__cell header__cell column-4">Курс</th>
          <th className="table__cell header__cell column-5">Группа</th>
        </tr>
      </thead>
      <tbody>
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