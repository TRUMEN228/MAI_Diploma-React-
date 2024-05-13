import { FC, ChangeEvent } from "react";
import { Institute } from "../../api/Institutes";
import { NestedSelect } from "../NestedSelect";

interface IAdminTeacherSubjectFormProps {
  institute: Institute;
  index: number;
  handleNameChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleGroupIdChange: (event: ChangeEvent<HTMLSelectElement>, index: number) => void;
};

export const AdminTeacherSubjectForm: FC<IAdminTeacherSubjectFormProps> = ({
  institute,
  index,
  handleNameChange,
  handleGroupIdChange
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleNameChange(event, index);
  }

  return (
    <div className="subject__container">
      <label className="">
        Название предмета:
        <input
          type="text"
          className=""
          onChange={handleChange}
          placeholder="Введите название предмета"
        />
      </label>
      <label>
        Выберите группу:
        <NestedSelect handleGroupIdChange={handleGroupIdChange} index={index} institute={institute}/>
      </label>
    </div>
  );
};