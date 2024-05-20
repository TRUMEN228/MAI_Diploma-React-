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
  const [institutesList, setInstitutesList] = useState<Institute[]>(institutes);

  const [instituteName, setInstituteName] = useState<string>("");
  const [instituteId, setInstituteId] = useState<string>("");

  const [cathedras, setCathedras] = useState<Cathedra[]>([]);

  const createInstituteMutation = useMutation({
    mutationFn: () => createInstitute(instituteId, instituteName, cathedras),
    mutationKey: ["institute", instituteId]
  }, queryClient);

  const handleAddInstitute = () => {
    const newInstitute: Institute = {
      id: "",
      name: "",
      cathedras: []
    };

    setInstitutesList([...institutesList, newInstitute]);
  }

  const handleAddCathedra = (instituteIndex: number) => {
    const newCathedra: Cathedra = {
      id: "",
      name: "",
      courses: []
    };

    const updatedInstitutes = [...institutesList];
    updatedInstitutes[instituteIndex].cathedras.push(newCathedra);

    setInstitutesList(updatedInstitutes);
  };

  const handleAddCourse = (instituteIndex: number, cathedraIndex: number) => {
    const newCourse: Course = {
      course: "1",
      groups: []
    };

    const updatedInstitutes = [...institutesList];
    updatedInstitutes[instituteIndex].cathedras[cathedraIndex].courses.push(newCourse);

    setInstitutesList(updatedInstitutes);
  };

  const handleAddGroup = (instituteIndex: number, cathedraIndex: number, courseIndex: number) => {
    const newGroup: Group = {
      id: "",
      direction: "",
      name: ""
    };

    const updatedInstitutes = [...institutesList];
    updatedInstitutes[instituteIndex].cathedras[cathedraIndex].courses[courseIndex].groups.push(newGroup);

    setInstitutesList(updatedInstitutes);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    createInstituteMutation.mutate();
    handleRefetch();
  }

  const onIstituteChange = (event: ChangeEvent<HTMLInputElement>, index: number, param: "id" | "name") => {
    const updatedInstitutes = [...institutesList];
    updatedInstitutes[index][param] = event.currentTarget.value;

    setInstitutesList(updatedInstitutes);
  }

  const onCathedraChange = (event: ChangeEvent<HTMLInputElement>, instituteIndex: number, index: number, param: "id" | "name") => {
    const updatedInstitutes = [...institutesList];
    updatedInstitutes[instituteIndex].cathedras[index][param] = event.currentTarget.value;

    setInstitutesList(updatedInstitutes);
  };

  const onCourseChange = (event: ChangeEvent<HTMLSelectElement>, instituteIndex: number, cathedraIndex: number, index: number) => {
    const updatedInstitutes = [...institutesList];
    updatedInstitutes[instituteIndex].cathedras[cathedraIndex].courses[index].course = event.currentTarget.value;

    setInstitutesList(updatedInstitutes);
  };

  const onGroupChange = (event: ChangeEvent<HTMLInputElement>, instituteIndex: number, cathedraIndex: number, courseIndex: number, index: number, param: "id" | "name" | "direction") => {
    const updatedInstitutes = [...institutesList];
    updatedInstitutes[instituteIndex].cathedras[cathedraIndex].courses[courseIndex].groups[index][param] = event.currentTarget.value;

    setInstitutesList(updatedInstitutes);
  };

  return (
    <form className="add-institute__form" onSubmit={handleSubmit}>
      <AdminInstitutesList
        institutes={institutesList}
        handleRefetch={handleRefetch}
      />
      <Button type="submit" kind="primary">Отправить</Button>
    </form>
  );
};