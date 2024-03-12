import { FC, useState } from "react";
import { RegisterForm } from "../RegisterForm";
import { LoginForm } from "../LoginForm";

import "./AuthForm.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

type AuthFormType = "auth" | "register";

export const AuthForm: FC = () => {
  const [authType, setAuthType] = useState<AuthFormType>("auth");

  const handleClick = () => {
    setAuthType(prevState =>
      prevState === "register" ? "auth" : "register"
    );
  };

  return (
    <BrowserRouter>
      <div className="auth-form">
        <Routes>
          <Route
            path="/register"
            element={
              <>
                <p className="form__title">Регистрация</p>
                <RegisterForm />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="form__title">Авторизация</p>
                <LoginForm />
              </>
            }
          />
        </Routes>
        <div className="form__switch">
          <span className="form__switch-text">
            {authType === "register" ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}
          </span>
          {
            authType === "register" ?
            <Link to={"/"}>
              <button className="form__switch-button" onClick={handleClick}>Войти</button>
            </Link> :
            <Link to={"/register"}>
              <button className="form__switch-button" onClick={handleClick}>Зарегистрироваться</button>
            </Link>
          }
        </div>
      </div>
    </BrowserRouter>
  );
};