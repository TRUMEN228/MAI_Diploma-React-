import { FC, useState } from "react";
import { Cathedra, Course, Group, Institute } from "../../api/Institutes";

interface INestedSelectProps {
  institute: Institute;
}

export const NestedSelect: FC<INestedSelectProps> = ({
  institute
}) => {
  const [cathedra, setCathedra] = useState<Cathedra | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [group, setGroup] = useState<Group | null>(null);

  const handleCathedraSelect = (cathedra: Cathedra) => {
    setCathedra(cathedra);
    setCourse(null);
    setGroup(null);
  };

  const handleCourseSelect = (course: Course) => {
    setCourse(course);
    setGroup(null);
  };

  const handleGroupSelect = (group: Group) => {
    setGroup(group);
  };

  const renderCathedras = (cathedras: Cathedra[]) => {
    return cathedras.map((item, index) => (
      <option key={index} value={item.id}>
        {item.name}
      </option>
    ));
  };

  const renderCourses = (courses: Course[]) => {
    return courses.map((item, index) => (
      <option key={index} value={item.course}>
        {item.course}
      </option>
    ));
  };

  const renderGroups = (groups: Group[]) => {
    return groups.map((item, index) => (
      <option key={index} value={item.id}>
        {item.name}
      </option>
    ));
  };

  const renderNestedCathedraSelect = (
    courses: Course[] | null,
    onSelect: (course: Course) => void
  ) => {
    if (!courses) {
      return null;
    }

    return (
      <select
        onChange={(event) => {onSelect(courses.find(item => item.course === event.target.value)!)}}
      >
        <option value="">-- Не выбрано --</option>
        {renderCourses(courses)}
      </select>
    );
  };

  const renderNestedCourseSelect = (
    groups: Group[] | null,
    onSelect: (group: Group) => void
  ) => {
    if (!groups) {
      return null;
    }

    return (
      <select
        onChange={(event) => {onSelect(groups.find(item => item.id === event.target.value)!)}}
      >
        <option value="">-- Не выбрано --</option>
        {renderGroups(groups)}
      </select>
    );
  };

  return (
    <div>
      <select
        onChange={(event) => handleCathedraSelect(institute.cathedras.find(item => item.id === event.target.value)!)}
      >
        <option value="">-- Кафедра --</option>
        {renderCathedras(institute.cathedras)}
      </select>
      {renderNestedCathedraSelect(cathedra?.courses!, handleCourseSelect)}
      {renderNestedCourseSelect(course?.groups!, handleGroupSelect)}
      {group && <p>{group.name}</p>}
    </div>
  );
};