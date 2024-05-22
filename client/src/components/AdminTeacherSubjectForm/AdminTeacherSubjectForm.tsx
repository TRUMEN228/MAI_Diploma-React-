import { FC, ChangeEvent } from "react";
import { Institute } from "../../api/Institutes";
import { AdminTeacherSubjectGroupSelect } from "../AdminTeacherSubjectGroupSelect";
import "./AdminTeacherSubjectForm.css";

interface IAdminTeacherSubjectFormProps {
  institute: Institute;
  index: number;
  handleIdChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleNameChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleGroupIdChange: (event: ChangeEvent<HTMLSelectElement>, index: number) => void;
};

export const AdminTeacherSubjectForm: FC<IAdminTeacherSubjectFormProps> = ({
  institute,
  index,
  handleIdChange,
  handleNameChange,
  handleGroupIdChange
}) => {
  const idChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleIdChange(event, index);
  }

  const nameChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleNameChange(event, index);
  }

  return (
    <div className="subject__container">
      <label className="subject__label">
        Идентификатор предмета:&nbsp;
        <input
          type="text"
          className=""
          onChange={idChange}
          placeholder="Введите идентификатор предмета"
        />
      </label>
      <label className="subject__label">
        Название предмета:&nbsp;
        <input
          type="text"
          className=""
          onChange={nameChange}
          placeholder="Введите название предмета"
        />
      </label>
      <label className="subject__label subject__group-label">
        Выберите группу:
        <AdminTeacherSubjectGroupSelect handleGroupIdChange={handleGroupIdChange} index={index} institute={institute}/>
      </label>
    </div>
  );
};