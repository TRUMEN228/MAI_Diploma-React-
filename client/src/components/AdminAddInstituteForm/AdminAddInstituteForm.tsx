import { FC } from "react";
import "./AdminAddInstituteForm.css";
import { Button } from "../Button";

export const AdminAddInstituteForm: FC = () => {
  return (
    <div className="container add-institute-form__container">
      <form className="add-institute__form">
        <label className="institute__label">
          Название ВУЗа:
          <input type="text" placeholder="Введите название"/>
        </label>
        <Button kind="secondary">Добавить кафедру</Button>
      </form>
    </div>
  );
};