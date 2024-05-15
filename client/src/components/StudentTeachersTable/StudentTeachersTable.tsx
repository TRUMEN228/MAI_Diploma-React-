import { FC } from "react";
import { SubjectInfo } from "../../api/Teacher";
import { StudentTeachersTableRow } from "../StudentTeachersTableRow";

interface IStudentTeachersTableProps {
  subjects: SubjectInfo[];
};

export const StudentTeachersTable: FC<IStudentTeachersTableProps> = ({
  subjects
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>№ п/п</th>
            <th>Предмет</th>
            <th>ФИО преподавателя</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((item, index) => (
            <StudentTeachersTableRow
              key={index}
              subjectInfo={item}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}