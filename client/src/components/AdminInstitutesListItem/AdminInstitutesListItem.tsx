import { FC, useState } from "react";
import { Institute } from "../../api/Institutes";
import "./AdminInstitutesListItem.css";

interface IAdminInstitutesListItemProps {
  institute: Institute;
}

export const AdminInstitutesListItem: FC<IAdminInstitutesListItemProps> = ({
  institute
}) => {
  const [updatedInstitute, setUpdatedInstitute] = useState<Institute>(institute);

  return (
    <li>
      <div className="institute__container">
        <p>Идентификатор: {institute.id}</p>
        <p>Название: {institute.name}</p>
        {
          institute.cathedras.length ?
          <div>
            <p>Кафедры:</p>
            <ul className="list-reset">
              {institute.cathedras.map((catherda, cathedraIndex) => (
                <li key={cathedraIndex}>
                  <div className="cathedra__container">
                    <p>Идентификатор: {catherda.id}</p>
                    <p>Название: {catherda.name}</p>
                    {
                      catherda.courses.length ?
                      <div>
                        <p>Курсы:</p>
                        <ul className="list-reset">
                          {catherda.courses.map((course, courseIndex) => (
                            <li key={courseIndex}>
                              <div className="course__container">
                                <p>Курс: {course.course}</p>
                                {
                                  course.groups.length ?
                                  <div>
                                    <p>Группы:</p>
                                    <ul className="list-reset">
                                      {course.groups.map((group, groupIndex) => (
                                        <li key={groupIndex}>
                                          <div className="group__container">
                                            <p>Идентификатор: {group.id}</p>
                                            <p>Название: {group.name}</p>
                                            <p>Направление: {group.direction}</p>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  : null
                                }
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      : null
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
          : null
        }
      </div>
    </li>
  );
};