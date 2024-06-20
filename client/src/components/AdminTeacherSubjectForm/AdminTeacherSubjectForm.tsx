import { FC, ChangeEvent, useState } from "react";
import { Institute } from "../../api/Institutes";
import { AdminTeacherSubjectGroupSelect } from "../AdminTeacherSubjectGroupSelect";
import "./AdminTeacherSubjectForm.css";
import { z } from "zod";

interface IAdminTeacherSubjectFormProps {
  institute: Institute;
  index: number;
  handleIdChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleNameChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleGroupIdChange: (event: ChangeEvent<HTMLSelectElement>, index: number) => void;
};

const AdminTeacherSubjectSchema = z.object({
  id: z.string().min(1, { message: "Поле должно быть заполнено" }).max(6, { message: "Максимальная длина идентификатора: 6 символов" }),
  name: z.string().min(1, { message: "Поле должно быть заполнено" }),
  cathedraId: z.string().min(1, { message: "Выберите один пункт из списка" }),
  course: z.string().min(1, { message: "Выберите один пункт из списка" }),
  groupId: z.string().min(1, { message: "Выберите один пункт из списка" })
});

type AdminTeacherSubjectType = z.infer<typeof AdminTeacherSubjectSchema>;

export const AdminTeacherSubjectForm: FC<IAdminTeacherSubjectFormProps> = ({
  institute,
  index,
  handleIdChange,
  handleNameChange,
  handleGroupIdChange
}) => {
  const [cathedraId, setCathedraId] = useState<string>("");
  const [course, setCourse] = useState<string>("");

  const idChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleIdChange(event, index);
  }

  const nameChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleNameChange(event, index);
  }

  const groupIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleGroupIdChange(event, index);
  }

  return (
    <form className="subject__container">
      <label className="subject__label">
        Идентификатор предмета:&nbsp;
        <input
          type="text"
          onChange={idChange}
          placeholder="Введите идентификатор предмета"
        />
      </label>
      <label className="subject__label">
        Название предмета:&nbsp;
        <input
          type="text"
          onChange={nameChange}
          placeholder="Введите название предмета"
        />
      </label>
      <div>
        <label>
          Выберите кафедру:&nbsp;
          <select
            value={cathedraId}
            onChange={(event) => setCathedraId(event.currentTarget.value)}
          >
            <option value="">-- Не выбрано --</option>
            {institute.cathedras.map((item, itemIndex) => (
              <option key={itemIndex} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <label>
          Выберите курс:&nbsp;
          <select
            value={course}
            onChange={(event) => setCourse(event.currentTarget.value)}
          >
            <option value="">-- Не выбрано --</option>
            {institute.cathedras.find(item => item.id === cathedraId)?.courses.map((item, itemIndex) => (
              <option key={itemIndex} value={item.course}>{item.course}</option>
            ))}
          </select>
        </label>
        <label>
          <select
            onChange={groupIdChange}
          >
            <option value="">-- Не выбрано --</option>
            {institute.cathedras.find(item => item.id === cathedraId)?.courses.find(item => item.course === course)?.groups.map((item, itemIndex) => (
              <option key={itemIndex} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
      </div>
      {/* <label className="subject__label subject__group-label">
        Выберите группу:
        <AdminTeacherSubjectGroupSelect handleGroupIdChange={handleGroupIdChange} index={index} institute={institute}/>
      </label> */}
    </form>
  );
};