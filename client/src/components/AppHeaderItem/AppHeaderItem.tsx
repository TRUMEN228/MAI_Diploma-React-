import { FC } from "react";
import "./AppHeaderItem.css";
import { Link } from "react-router-dom";

interface IAppHeaderItemProps {
  children: React.ReactNode;
  to: string;
}

export const AppHeaderItem: FC<IAppHeaderItemProps> = ({
  to,
  children
}) => {
  return (
    <Link to={to} className="header__item">
      {children}
    </Link>
  );
};