import { FC, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { UserProfile } from "../UserProfile";
import { User } from "../../api/User";
import { UserMessages } from "../UserMessages";

interface IAccountRouterProps {
  user: User;
}

export const AccountRouter: FC<IAccountRouterProps> = ({ user }) => {
  const PATH = `${user.id}/account/`;

  return (
    <Routes>
      <Route
        path={`${user.id}/account/news`}
        element={<>Новости</>}
      />
      <Route
        path={`${user.id}/account/learning`}
        element={<>Обучение</>}
      />
      <Route
        path={`${user.id}/account/messages`}
        element={<UserMessages user={user} />}
      />
      <Route
        path={`${user.id}/account/group`}
        element={<>Моя группа</>}
      />
      <Route
        path={`${user.id}/account/profile`}
        element={<UserProfile user={user} />}
      />
    </Routes>
  )
}