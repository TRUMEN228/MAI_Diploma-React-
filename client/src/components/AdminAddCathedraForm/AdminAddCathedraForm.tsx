import { FC } from "react";
import { Button } from "../Button";
import { ICourse } from "../AdminAddCourseForm";

export interface ICathedra {
  name: string;
  id: string;
  
};

export const AdminAddCathedraForm: FC<ICathedra> = ({
  name,
  id
}) => {
  return (
    <div className="cathedra-form__container">
      <label>
        Название кафедры:
        <input type="text" value={name} placeholder="Введите название кафедры"/>
      </label>
      <label>
        Идентификатор кафедры:
        <input type="text" value={id} placeholder="Введите идентификатор"/>
      </label>
      <Button kind="secondary">Добавить курс</Button>
    </div>
  );
};