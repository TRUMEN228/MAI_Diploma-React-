import './css/RegisterForm.css'
import { FormInput } from "./FormInput"
import { Button } from "./Button"

export const RegisterForm = () => {
  return (
    <div id="ikar-app-register">
      <h1 className="reg-form__title">Регистрация пользователя</h1>
      <form noValidate className="register-form">
        <FormInput
          type="text"
          required={true}
          inputId="surname-reg"
          inputClassName="reg-form__surname-input"
          labelClassName="reg-form__surname-label"
          textContent="Фамилия"
        />
        <FormInput
          type="text"
          required={true}
          inputId="name-reg"
          inputClassName="reg-form__name-input"
          labelClassName="reg-form__name-label"
          textContent="Имя"
        />
        <FormInput
          type="text"
          inputId="lastname-reg"
          inputClassName="reg-form__lastname-input"
          labelClassName="reg-form__lastname-label"
          textContent="Отчество"
        />
        <FormInput
          type="date"
          inputId="birthday-reg"
          inputClassName="reg-form__birthday-input"
          labelClassName="reg-form__birthday-label"
          textContent="Дата рождения"
        />
        <FormInput
          type="text"
          required={true}
          inputId="email-reg"
          inputClassName="reg-form__email-input"
          labelClassName="reg-form__email-label"
          textContent="E_mail"
        />
        <FormInput
          type="text"
          inputId="login-reg"
          inputClassName="reg-form__login-input"
          labelClassName="reg-form__login-label"
          textContent="Логин"
        />
        <FormInput
          type="text"
          required={true}
          inputId="password-reg"
          inputClassName="reg-form__password-input"
          labelClassName="reg-form__password-label"
          textContent="Пароль"
        />
        <FormInput
          type="text"
          required={true}
          inputId="passwordconf-reg"
          inputClassName="reg-form__passwordconf-input"
          labelClassName="reg-form__passwordconf-label"
          textContent="Подтверждение пароля"
        />
        <div className='reg-form__confirm-container'>
          <Button
            btnClassName="reg-form__btn"
            textContent="Зарегистрироваться"
          />
          <label htmlFor="confirm-check" className="reg-form__confirm-label">
            <input id="confirm-check" type="checkbox" className="reg-form__confirm-check" />
            <span className="reg-form__confirm-span">Согласен на обработку данных</span>
          </label>
        </div>
      </form>
    </div>
  )
}