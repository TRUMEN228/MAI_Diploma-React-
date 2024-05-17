import { FC, ChangeEvent } from "react";
import { Institute } from "../../api/Institutes";
import { AdminTeacherSubjectGroupSelect } from "../AdminTeacherSubjectGroupSelect";
import { FormField } from "../FormField";

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
      <FormField
        labelText="Идентификатор предмета:"
      >
        <input
          type="text"
          className="form-field__input"
          onChange={idChange}
          placeholder="Введите идентификатор предмета"
        />
      </FormField>
      <FormField
        labelText="Название предмета:"
      >
        <input
          type="text"
          className="form-field__input"
          onChange={nameChange}
          placeholder="Введите название предмета"
        />
      </FormField>
      <label>
        Выберите группу:
        <AdminTeacherSubjectGroupSelect handleGroupIdChange={handleGroupIdChange} index={index} institute={institute}/>
      </label>
    </div>
  );
};