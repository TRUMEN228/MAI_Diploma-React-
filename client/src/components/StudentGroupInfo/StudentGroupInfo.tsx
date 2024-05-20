import { FC } from "react";
import { Cathedra, Course, Group, Institute } from "../../api/Institutes";
import "./StudentGroupInfo.css";

interface IStudentGroupInfoProps {
  institute: Institute;
  cathedra: Cathedra;
  course: Course;
  group: Group;
};

export const StudentGroupInfo: FC<IStudentGroupInfoProps> = ({
  institute,
  cathedra,
  course,
  group
}) => {
  return (
    <div className="group-info__container">
      <div className="info__container">
        <p className="info__label">ВУЗ:</p>
        <p className="info__item">{institute.name}</p>
      </div>
      <div className="info__container">
        <p className="info__label">Кафедра:</p>
        <p className="info__item">{cathedra.name}</p>
      </div>
      <div className="info__container">
        <p className="info__label">Курс:</p>
        <p className="info__item">{course.course}</p>
      </div>
      <div className="info__container">
        <p className="info__label">Группа:</p>
        <p className="info__item">{group.name}</p>
      </div>
    </div>
  );
};