import { FC } from "react";
import { RegisterForm } from "../RegisterForm";
import { LoginForm } from "../LoginForm";

import "./AuthForm.css";
import { Link, Route, Routes } from "react-router-dom";
import { Button } from "../Button";

export const AuthForm: FC = () => {
  return (
    <div className="auth-form">
      <Routes>
        <Route
          path="/register"
          element={
            <div className="container">
              <h1 className="form__title">Регистрация</h1>
              <RegisterForm />
              <div className="form__switch">
                <span className="form__switch-text">Уже есть аккаунт?</span>
                <Link to={"/"}>
                  <Button
                    className="form__switch-button"
                    kind="secondary"
                  >
                    Войти
                  </Button>
                </Link>
              </div>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="container">
              <h1 className="form__title">Авторизация</h1>
              <LoginForm />
              <div className="form__switch">
                <span className="form__switch-text">Ещё нет аккаунта?</span>
                <Link to={"/register"}>
                  <Button
                    className="form__switch-button"
                    kind="secondary"
                  >
                    Зарегистрироваться
                  </Button>
                </Link>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};