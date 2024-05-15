import { FC } from "react";
import { Teacher } from "../../api/Teacher";
import { AdminTeachersTableRow } from "../AdminTeachersTableRow";
import { Institute, fetchGroupInfo } from "../../api/Institutes";

interface IAdminTeachersTableProps {
  institute: Institute;
  teachers: Teacher[];
}

export const AdminTeachersTable: FC<IAdminTeachersTableProps> = ({
  institute,
  teachers
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
    <div className="table__container">
      <table className="teachers__table">
        <thead className="table__header">
          <tr className="table__row">
            <th rowSpan={2} className="table__cell header__cell column-1">№ п/п</th>
            <th rowSpan={2} className="table__cell header__cell column-2">ФИО</th>
            <th rowSpan={2} className="table__cell header__cell column-3">Дата рождения</th>
            <th rowSpan={2} className="table__cell header__cell column-4">E-mail</th>
            <th colSpan={4} className="table__cell header__cell column-5">Предметы</th>
          </tr>
          <tr className="table__row">
            <th className="table__cell header__cell column-6">Название</th>
            <th className="table__cell header__cell column-7">Кафедра</th>
            <th className="table__cell header__cell column-8">Курс</th>
            <th className="table__cell header__cell column-9">Группа</th>
          </tr>
        </thead>
        <tbody>
          {
            teachers.length ?
            teachers.map((item, index) => (
              <AdminTeachersTableRow
                key={index}
                number={index}
                fullName={{
                  surname: item.surname,
                  name: item.name,
                  lastname: item.lastname
                }}
                birthday={item.birthday}
                email={item.email}
                subjects={item.subjects.map((item, index) => {
                  return {
                    number: index,
                    name: item.name,
                    cathedra: institute.cathedras.find(prop => prop.id === splitGroupId(item.groupId).cathedraId)?.name!,
                    course: institute.cathedras.find(prop => prop.id === splitGroupId(item.groupId).cathedraId)?.courses.find(prop => prop.course === splitGroupId(item.groupId).course)?.course!,
                    group: institute.cathedras.find(prop => prop.id === splitGroupId(item.groupId).cathedraId)?.courses.find(prop => prop.course === splitGroupId(item.groupId).course)?.groups.find(prop => prop.id === item.groupId)?.name!
                  }
                })}
              />
            ))
            : null
          }
        </tbody>
      </table>
      {!teachers.length && <span>Список пуст</span>}
    </div>
  );
};