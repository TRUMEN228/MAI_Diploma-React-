import { ChangeEvent, FC } from "react";

interface IAdminAddGroupForm {
  id: string;
  direction: string;
  name: string;
  index: number;
  cathedraIndex: number;
  courseIndex: number;
  onChange: (event: ChangeEvent<HTMLInputElement>, cathedraIndex: number, courseIndex: number, index: number, param: "id" | "name" | "direction") => void;
}

export const AdminAddGroupForm: FC<IAdminAddGroupForm> = ({
  id,
  direction,
  name,
  index,
  cathedraIndex,
  courseIndex,
  onChange
}) => {
  return (
    <div className="group-form__container">
      <label className="group__label">
        Название группы:
        <input
          type="text"
          placeholder="Введите название группы"
          value={name}
          onChange={(event) => onChange(event, cathedraIndex, courseIndex, index, "name")}
        />
      </label>
      <label className="group__label">
        Идентификатор группы:
        <input
          type="text"
          placeholder="Введите идентификатор группы"
          value={id}
          onChange={(event) => onChange(event, cathedraIndex, courseIndex, index, "id")}
        />
      </label>
      <label className="group__label">
        Направление:
        <input
          type="text"
          placeholder="Введите название группы"
          value={direction}
          onChange={(event) => onChange(event, cathedraIndex, courseIndex, index, "direction")}
        />
      </label>
    </div>
  );
};