import { FC } from "react";
import { Institute } from "../../api/Institutes";
import { AdminInstitutesListItem } from "../AdminInstitutesListItem";
import "./AdminInstitutesList.css";

interface IAdminInstitutesListProps {
  institutes: Institute[];
  handleRefetch: () => void;
}

export const AdminInstitutesList: FC<IAdminInstitutesListProps> = ({
  institutes,
  handleRefetch
}) => {
  return (
    <div>
      <ul className="list-reset">
        {institutes.map((item, index) => (
          <AdminInstitutesListItem key={index} institute={item}/>
        ))}
      </ul>
    </div>
  );
};