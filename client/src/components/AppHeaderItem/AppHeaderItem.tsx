import { FC } from "react";
import "./AppHeaderItem.css";
import { HeaderPage } from "../AppHeader";

interface IAppHeaderItemProps {
  id: HeaderPage;
  children: React.ReactNode;
  onClick: (id: HeaderPage) => void;
  currentPage: HeaderPage;
}

export const AppHeaderItem: FC<IAppHeaderItemProps> = ({
  id,
  children,
  onClick,
  currentPage
}) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <li key={id} className={currentPage === id ? "header__item " + "header__item-focused" : "header__item"}>
      <div onClick={handleClick}>
        {children}
      </div>
    </li>
  );
};