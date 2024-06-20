import { FC } from "react";
import { z } from "zod";
import "./RegisterForm.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User, registerUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { fetchInstituteList } from "../../api/Institutes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

const RegisterSchema = z.object({
  email: z.string().min(1, { message: "Поле должно быть заполнено" }).email({ message: "Некорректный формат e-mail" }),
  accountStatus: z.custom<"student" | "teacher" | "admin">(),
  surname: z.string().min(1, { message: "Поле должно быть заполнено" }),
  name: z.string().min(1, { message: "Поле должно быть заполнено" }),
  lastname: z.string().min(1, { message: "Поле должно быть заполнено" }),
  birthday: z.string().min(1, { message: "Поле должно быть заполнено" }),
  instituteId: z.string().min(1, { message: "Выберите один пункт из списка" }),
  password: z.string().min(6, { message: "Пароль должен содержать минимум 6 символов" }),
  confirmPassword: z.string().min(1, { message: "Введите пароль повторно" }),
  agreement: z.boolean().refine(data => data === true, {
    message: "Необходимо согласие"
  })
}).required().refine(data => data.confirmPassword === data.password, {
  message: "Пароли должны совпадать",
  path: ["confirmPassword"]
});

type RegisterFormType = z.infer<typeof RegisterSchema>;

export const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema)
  })

  const getInstituteListQuery = useQuery({
    queryFn: () => fetchInstituteList(),
    queryKey: ["institutes"],
    retry: 0
  }, queryClient);

  const createUserMutation = useMutation({
    mutationFn: (data: {
      email: string,
      accountStatus: User["accountStatus"],
      surname: string,
      name: string,
      lastname: string,
      birthday: string,
      instituteId: string,
      password: string
    }) => registerUser(
      data.email,
      data.accountStatus,
      data.surname,
      data.name,
      data.lastname,
      data.birthday,
      data.instituteId,
      data.password
    )
  }, queryClient);

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(({
        email,
        accountStatus,
        surname,
        name,
        lastname,
        birthday,
        instituteId,
        password
      }) => {
        createUserMutation.mutate({ email, accountStatus, surname, name, lastname, birthday, instituteId, password });

        if (createUserMutation.status === 'success') {
          console.log("Здесь");
          window.location.pathname = "/";
        }
      })}
    >
      <FormField
        labelText="Фамилия:"
        errorMessage={errors.surname?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("surname")}
        />
      </FormField>
      <FormField
        labelText="Имя:"
        errorMessage={errors.name?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("name")}
        />
      </FormField>
      <FormField
        labelText="Отчество:"
        errorMessage={errors.lastname?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("lastname")}
        />
      </FormField>
      <FormField
        labelText="E-mail:"
        errorMessage={errors.email?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("email")}
        />
      </FormField>
      <FormField
        labelText="Дата рождения:"
        errorMessage={errors.birthday?.message}
      >
        <input
          className="form-field__input"
          type="date"
          {...register("birthday")}
        />
      </FormField>
      <FormField
        labelText="ВУЗ:"
        errorMessage={errors.instituteId?.message}
      >
        <select
          id="institute"
          className="form-field__input"
          {...register("instituteId")}
        >
          <option key="none" value="">-- Не выбрано --</option>
          {getInstituteListQuery.data?.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </FormField>
      <FormField
        labelText="Придумайте пароль:"
        errorMessage={errors.password?.message}
      >
        <input
          className="form-field__input"
          type="password"
          {...register("password")}
        />
      </FormField>
      <FormField
        labelText="Повторите пароль:"
        errorMessage={errors.confirmPassword?.message}
      >
        <input
          className="form-field__input"
          type="password"
          {...register("confirmPassword")}
        />
      </FormField>
      <fieldset className="register__status-inputs-container">
        <legend>Я &ndash;&nbsp;</legend>

        <div className="status-input__container">
          <input
            type="radio"
            id="student"
            value="student"
            {...register("accountStatus")}
            checked
          />
          <label htmlFor="student">студент</label>
        </div>
        <div className="status-input__container">
          <input
            type="radio"
            id="teacher"
            value="teacher"
            {...register("accountStatus")}
          />
          <label htmlFor="teacher">преподаватель</label>
        </div>
      </fieldset>
      {createUserMutation.error && <span className="form__error-message" >{createUserMutation.error?.message}</span>}
      <Button
        kind="primary"
        type="submit"
        className="register-form__btn"
        isLoading={createUserMutation.isPending}
      >
        Зарегистрироваться
      </Button>
      <div className="register__agreement-container">
        <div className="agreement__input-container">
          <input
            type="checkbox"
            id="agreement"
            {...register("agreement")}
          />
          <label htmlFor="agreement">Я даю согласие на обработку персональных данных</label>
        </div>
        {errors.agreement?.message ? <span className="agreement__error">{errors.agreement?.message}</span> : null}
      </div>

    </form>
  );
};