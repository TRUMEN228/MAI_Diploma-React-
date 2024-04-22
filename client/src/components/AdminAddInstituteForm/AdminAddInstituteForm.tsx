import { FC, useState, FormEventHandler } from "react";
import "./AdminAddInstituteForm.css";
import { Button } from "../Button";
import { Cathedra, Course, Group, createInstitute } from "../../api/Institutes";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";

export const AdminAddInstituteForm: FC = () => {
  const [instituteName, setInstituteName] = useState<string>("");
  const [instituteId, setInstituteId] = useState<string>("");

  const [cathedras, setCathedras] = useState<Cathedra[]>([]);

  const numbers = ["1", "2", "3", "4", "5", "6"];

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
      localName: "",
      globalName: ""
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

    createInstituteMutation.mutate();
  }

  return (
    <div className="container add-institute-form__container">
      <form className="add-institute__form" onSubmit={handleSubmit}>
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
            <div key={cathedra.id} className="cathedra-form__container">
              <label className="cathedra__label">
                Название кафедры:
                <input
                  type="text"
                  placeholder="Введите название кафедры"
                  value={cathedra.name}
                  onChange={(event) => {
                    const updatedCathedras = [...cathedras];
                    updatedCathedras[cathedraIndex].name = event.currentTarget.value;
                    setCathedras(updatedCathedras);
                  }}
                />
              </label>
              <label className="cathedra__label">
                Идентификатор кафедры:
                <input
                  type="text"
                  placeholder="Введите идентификатор кафедры"
                  value={cathedra.id}
                  onChange={(event) => {
                    const updatedCathedras = [...cathedras];
                    updatedCathedras[cathedraIndex].id = event.currentTarget.value;
                    setCathedras(updatedCathedras);
                  }}
                />
              </label>
              {cathedra.courses.map((course, courseIndex) => (
                <div key={course.course} className="course-form__container">
                  <label className="course__label">
                    Номер курса:
                    <select
                      name="courses"
                      value={course.course}
                      onChange={(event) => {
                        const updatedCathedras = [...cathedras];
                        updatedCathedras[cathedraIndex].courses[courseIndex].course = event.target.value;
                        setCathedras(updatedCathedras);
                      }}
                    >
                      {numbers.map((number) => (
                        <option key={number} value={`${number}`}>
                          {number}
                        </option>
                      ))}
                    </select>
                  </label>
                  {course.groups.map((group, groupIndex) => (
                    <div key={course.course} className="group-form__container">
                      <label>
                        Название группы:
                        <input
                          type="text"
                          placeholder="Введите название группы"
                          value={group.localName}
                          onChange={(event) => {
                            const updatedCathedras = [...cathedras];
                            updatedCathedras[cathedraIndex].courses[courseIndex].groups[groupIndex].localName = event.currentTarget.value;
                            setCathedras(updatedCathedras);
                          }}
                        />
                      </label>
                    </div>
                  ))}
                  <Button
                    kind="secondary"
                    onClick={() => handleAddGroup(cathedraIndex, courseIndex)}
                  >
                    Добавить группу
                  </Button>
                </div>
              ))}
              <Button
                kind="secondary"
                onClick={() => handleAddCourse(cathedraIndex)}
              >
                Добавить курс
              </Button>
            </div>
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
    </div>
  );
};