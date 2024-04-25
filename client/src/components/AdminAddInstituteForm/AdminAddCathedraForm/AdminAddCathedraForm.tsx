import { ChangeEvent, FC } from "react";
import { Button } from "../../Button";
import { Course } from "../../../api/Institutes";
import { AdminAddCourseForm } from "../AdminAddCourseForm";

interface IAdminAddCathedraForm {
  id: string;
  name: string;
  index: number;
  onChange: (event: ChangeEvent<HTMLInputElement>, index: number, param: "id" | "name") => void;
  onCourseChange: (event: ChangeEvent<HTMLSelectElement>, cathedraIndex: number, index: number) => void;
  onGroupChange: (event: ChangeEvent<HTMLInputElement>, cathedraIndex: number, courseIndex: number, index: number, param: "id" | "name" | "direction") => void;
  courses: Course[];
  onClick: (index: number) => void;
  onAddGroupClick: (index: number, courseIndex: number) => void;
};

export const AdminAddCathedraForm: FC<IAdminAddCathedraForm> = ({
  id,
  name,
  index,
  onChange,
  onCourseChange,
  onGroupChange,
  courses,
  onClick,
  onAddGroupClick
}) => {
  return (
    <div className="cathedra-form__container">
      <label className="cathedra__label">
        Название кафедры:
        <input
          type="text"
          placeholder="Введите название кафедры"
          value={name}
          onChange={(event) => onChange(event, index, "name")}
        />
      </label>
      <label className="cathedra__label">
        Идентификатор кафедры:
        <input
          type="text"
          placeholder="Введите идентификатор кафедры"
          value={id}
          onChange={(event) => onChange(event, index, "id")}
        />
      </label>
      {courses.map((course, courseIndex) => (
        <AdminAddCourseForm
          key={courseIndex}
          course={course.course}
          index={courseIndex}
          cathedraIndex={index}
          onChange={onCourseChange}
          onGroupChange={onGroupChange}
          groups={course.groups}
          onClick={onAddGroupClick}
        />
      ))}
      <Button
        kind="secondary"
        onClick={() => onClick(index)}
      >
        Добавить курс
      </Button>
    </div>
  );
};