import { FC } from "react";
import { RegisterForm } from "../RegisterForm";
import { LoginForm } from "../LoginForm";

import "./AuthForm.css";
import { Link, Route, Routes } from "react-router-dom";

export const AuthForm: FC = () => {
  return (
    <div className="auth-form">
      <Routes>
        <Route
          path="/register"
          element={
            <>
              <p className="form__title">Регистрация</p>
              <RegisterForm />
              <div className="form__switch">
                <span className="form__switch-text">Уже есть аккаунт?</span>
                <Link to={"/"}>
                  <button className="form__switch-button">Войти</button>
                </Link>
              </div>
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <p className="form__title">Авторизация</p>
              <LoginForm />
              <div className="form__switch">
                <span className="form__switch-text">Ещё нет аккаунта?</span>
                <Link to={"/register"}>
                  <button className="form__switch-button">Зарегистрироваться</button>
                </Link>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
};