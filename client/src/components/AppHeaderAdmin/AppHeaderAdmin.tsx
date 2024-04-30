import { FC } from "react";
import { AppHeaderItem } from "../AppHeaderItem";

interface IAppHeaderAdminProps {
  userId: string;
}

export const AppHeaderAdmin: FC<IAppHeaderAdminProps> = ({ userId }) => {
  return (
    <header id="app-header">
      <div className="container header__container">
        <nav className="header__list">
          <AppHeaderItem to={`${userId}/admin/requests`}>Заявки</AppHeaderItem>
          <AppHeaderItem to={`${userId}/admin/profile`}>Профиль</AppHeaderItem>
          <AppHeaderItem to={`${userId}/admin/addInstitute`}>Добавление ВУЗа</AppHeaderItem>
          <AppHeaderItem to={`${userId}/admin/studentsList`}>Список студентов</AppHeaderItem>
        </nav>
      </div>
    </header>
  );
};