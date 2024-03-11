import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import { UserProfile } from "../UserProfile";
import { User } from "../../api/User";

interface IAccountRouterProps {
  user: User;
}

export const AccountRouter: FC<IAccountRouterProps> = ({ user }) => {
  return (
    <Routes>
      <Route
        path="/account/news"
        element={<>Новости</>}
      />
      <Route
        path="/account/learning"
        element={<>Обучение</>}
      />
      <Route
        path="/account/messages"
        element={<>Сообщения</>}
      />
      <Route
        path="/account/group"
        element={<>Моя группа</>}
      />
      <Route
        path="/account/profile"
        element={<UserProfile user={user} />}
      />
    </Routes>
  )
}