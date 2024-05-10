import { FC, ChangeEvent } from "react";
import { Subject } from "../../api/Teacher";
import { Institute } from "../../api/Institutes";
import { NestedSelect } from "../NestedSelect";

interface IAdminTeacherSubjectFormProps {
  subject: Subject;
  institute: Institute;
  index: number;
  handlePropChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number, prop: "name" | "groupId") => void;
};

export const AdminTeacherSubjectForm: FC<IAdminTeacherSubjectFormProps> = ({
  subject,
  institute,
  index,
  handlePropChange
}) => {


  return (
    <div className="subject__container">
      <label className="">
        Название предмета:
        <input
          type="text"
          className=""
          value={subject.name}
          onChange={(event) => handlePropChange(event, index, "name")}
          placeholder="Введите название предмета"
        />
      </label>
      <label>
        Выберите группу:
        <NestedSelect institute={institute}/>
      </label>
    </div>
  );
};