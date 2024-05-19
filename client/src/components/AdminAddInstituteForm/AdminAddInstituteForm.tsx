import { FC, useState, FormEventHandler, ChangeEvent } from "react";
import "./AdminAddInstituteForm.css";
import { Button } from "../Button";
import { Cathedra, Course, Group, Institute, createInstitute } from "../../api/Institutes";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";
import { AdminAddCathedraForm } from "./AdminAddCathedraForm";
import { AdminInstitutesList } from "../AdminInstitutesList";

interface IAdminAddInstituteFormProps {
  institutes: Institute[];
  handleRefetch: () => void;
}

export const AdminAddInstituteForm: FC<IAdminAddInstituteFormProps> = ({
  institutes,
  handleRefetch
}) => {
  const [instituteName, setInstituteName] = useState<string>("");
  const [instituteId, setInstituteId] = useState<string>("");

  const [cathedras, setCathedras] = useState<Cathedra[]>([]);

  const createInstituteMutation = useMutation({
    mutationFn: () => createInstitute(instituteId, instituteName, cathedras),
    mutationKey: ["institute", instituteId]
  }, queryClient);

  const handleAddCathedra = () => {
    const newCathedra: Cathedra = {
      id: "",
      name: "",
      courses: []
    };

    setCathedras([...cathedras, newCathedra]);
  };

  const handleAddCourse = (cathedraIndex: number) => {
    const newCourse: Course = {
      course: "1",
      groups: []
    };

    const updatedCathedras = [...cathedras];
    updatedCathedras[cathedraIndex].courses.push(newCourse);

    setCathedras(updatedCathedras);
  };

  const handleAddGroup = (cathedraIndex: number, courseIndex: number) => {
    const newGroup: Group = {
      id: "",
      direction: "",
      name: ""
    };

    const updatedCathedras = [...cathedras];
    updatedCathedras[cathedraIndex].courses[courseIndex].groups.push(newGroup);

    setCathedras(updatedCathedras);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!instituteId || !instituteName || !cathedras.length) {
      return;
    }

    // console.log(instituteId);
    // console.log(instituteName);
    // console.log(cathedras);

    createInstituteMutation.mutate();
    handleRefetch();
  }

  const onCathedraChange = (event: ChangeEvent<HTMLInputElement>, index: number, param: "id" | "name") => {
    const updatedCathedras = [...cathedras];
    updatedCathedras[index][param] = event.currentTarget.value;
    setCathedras(updatedCathedras);
  };

  const onCourseChange = (event: ChangeEvent<HTMLSelectElement>, cathedraIndex: number, index: number) => {
    const updatedCathedras = [...cathedras];
    updatedCathedras[cathedraIndex].courses[index].course = event.currentTarget.value;
    setCathedras(updatedCathedras);
  };

  const onGroupChange = (event: ChangeEvent<HTMLInputElement>, cathedraIndex: number, courseIndex: number, index: number, param: "id" | "name" | "direction") => {
    const updatedCathedras = [...cathedras];
    updatedCathedras[cathedraIndex].courses[courseIndex].groups[index][param] = event.currentTarget.value;
    setCathedras(updatedCathedras);
  };

  return (
    <form className="add-institute__form" onSubmit={handleSubmit}>
      <AdminInstitutesList
        institutes={institutes}
        handleRefetch={handleRefetch}
      />
      <div>
        <label className="institute__label">
          Название ВУЗа:
          <input
            type="text"
            placeholder="Введите название ВУЗа"
            value={instituteName}
            onChange={(event) => setInstituteName(event.currentTarget.value)}
          />
        </label>
        <label className="institute__label">
          Идентификатор ВУЗа:
          <input
            type="text"
            placeholder="Введите название"
            value={instituteId}
            onChange={(event) => setInstituteId(event.currentTarget.value)}
          />
        </label>
        {cathedras.map((cathedra, cathedraIndex) => (
          <AdminAddCathedraForm
            key={cathedraIndex}
            id={cathedra.id}
            name={cathedra.name}
            index={cathedraIndex}
            onChange={onCathedraChange}
            onCourseChange={onCourseChange}
            onGroupChange={onGroupChange}
            courses={cathedra.courses}
            onClick={handleAddCourse}
            onAddGroupClick={handleAddGroup}
          />
        ))}
        <Button
          kind="secondary"
          onClick={handleAddCathedra}
        >
          Добавить кафедру
        </Button>
      </div>
      <Button type="submit" kind="primary">Отправить</Button>
    </form>
  );
};