import { ChangeEvent, FC } from "react";
import { Button } from "../../Button";
import { Group } from "../../../api/Institutes";
import { AdminAddGroupForm } from "../AdminAddGroupForm";

interface IAdminAddCourseForm {
  course: string;
  index: number;
  cathedraIndex: number;
  onChange: (event: ChangeEvent<HTMLSelectElement>, cathedraIndex: number, index: number) => void;
  onGroupChange: (event: ChangeEvent<HTMLInputElement>, cathedraIndex: number, courseIndex: number, index: number, param: "id" | "name" | "direction") => void;
  groups: Group[];
  onClick: (cathedraIndex: number, index: number) => void;
}

export const AdminAddCourseForm: FC<IAdminAddCourseForm> = ({
  course,
  index,
  cathedraIndex,
  onChange,
  onGroupChange,
  groups,
  onClick,
}) => {
  const numbers = ["1", "2", "3", "4", "5", "6"];

  return (
    <div className="course-form__container">
      <label className="course__label">
        Номер курса:
        <select
          name="courses"
          value={course}
          onChange={(event) => onChange(event, cathedraIndex, index)}
        >
          {numbers.map((number) => (
            <option key={number} value={`${number}`}>
              {number}
            </option>
          ))}
        </select>
      </label>
      {groups.map((group, groupIndex) => (
        <AdminAddGroupForm
          key={groupIndex}
          id={group.id}
          name={group.name}
          direction={group.direction}
          index={groupIndex}
          cathedraIndex={cathedraIndex}
          courseIndex={index}
          onChange={onGroupChange}
        />
      ))}
      <Button
        kind="secondary"
        onClick={() => onClick(cathedraIndex, index)}
      >
        Добавить группу
      </Button>
    </div>
  );
};