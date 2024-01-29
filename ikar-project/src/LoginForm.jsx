import './css/LoginForm.css';
import { FormInput } from './FormInput';
import { Button } from './Button';

export const LoginForm = ({getLogin, getPassword, onRegister, onSubmit}) => {
  const handleRegister = () => {
    onRegister();
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onSubmit();
  }

  return (
    <div id='ikar-app-login' className='container'>
      <h1 className="form__title">Вход</h1>
      <form noValidate className='login-form' onSubmit={handleFormSubmit}>
        <FormInput
          type="text"
          inputId="login-auth"
          labelClassName='form__login-label'
          inputClassName='form__login-input'
          textContent='Логин'
          getValue={getLogin}
        />
        <FormInput
          type="password"
          inputId="password-auth"
          labelClassName='form__password-label'
          inputClassName='form__password-input'
          textContent='Пароль'
          getValue={getPassword}
        />
        <Button
          type="confirm"
          textContent="Войти"
          btnClassName="form__btn"
        />
        <a href="#" className='form__register' onClick={handleRegister}>Зарегистрироваться</a>
      </form>
    </div>
  );
};