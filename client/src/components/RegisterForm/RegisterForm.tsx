import { FC, useState, FormEventHandler } from "react";
import { z } from "zod";
import "./RegisterForm.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User, registerUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { fetchInstituteList } from "../../api/Institutes";

const RegisterSchema = z.object({
  email: z.string().min(1, { message: "Поле \"E-mail\" должно быть заполнено" }).email({ message: "Некорректный формат e-mail" }),
  accountStatus: z.custom<"student" | "teacher" | "admin">(),
  surname: z.string().min(1, { message: "Поле \"Фамилия\" должно быть заполнено" }),
  name: z.string().min(1, { message: "Поле \"Имя\" должно быть заполнено" }),
  lastname: z.string().min(1, { message: "Поле \"Отчество\" должно быть заполнено" }),
  birthday: z.string().min(1, { message: "Поле \"Дата рождения\" должно быть заполнено" }),
  instituteId: z.string().min(1, { message: "Выберите ВУЗ" }),
  password: z.string().min(1, { message: "Поле \"Пароль\" должно быть заполнено" })
}).required();

export const RegisterForm: FC = () => {
  const [surname, setSurname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [instituteId, setInstituteId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [accountStatus, setAccountStatus] = useState<User["accountStatus"]>("student");

  const [errors, setErrors] = useState<z.ZodFormattedError<{
    email: string;
    accountStatus: "student" | "teacher" | "admin";
    surname: string;
    name: string;
    lastname: string;
    birthday: string;
    instituteId: string;
    password: string;
  }, string>>({
    email: { _errors: [] },
    accountStatus: { _errors: [] },
    surname: { _errors: [] },
    name: { _errors: [] },
    lastname: { _errors: [] },
    birthday: { _errors: [] },
    instituteId: { _errors: [] },
    password: { _errors: [] },
    _errors: []
  });

  const getInstituteListQuery = useQuery({
    queryFn: () => fetchInstituteList(),
    queryKey: ["institutes"],
    retry: 0
  }, queryClient);

  const createUserMutation = useMutation({
    mutationFn: () => registerUser(
      email,
      accountStatus,
      surname,
      name,
      lastname,
      birthday,
      instituteId,
      password
    )
  }, queryClient);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const result = RegisterSchema.safeParse({
      email,
      accountStatus,
      surname,
      name,
      lastname,
      birthday,
      instituteId,
      password
    });

    if (!result.success) {
      setErrors(result.error.format());
      console.log(errors);
    } else {
      createUserMutation.mutate();

      if (createUserMutation.isSuccess) {
        window.location.pathname = "/";
      }
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField
        labelText="Фамилия:"
        errorMessage={errors?.surname?._errors[0]}
      >
        <input
          className="form-field__input"
          type="text"
          name="surname"
          onChange={(event) => setSurname(event.currentTarget.value)}
          value={surname}
        />
      </FormField>
      <FormField
        labelText="Имя:"
        errorMessage={errors?.name?._errors[0]}
      >
        <input
          className="form-field__input"
          type="text"
          name="name"
          onChange={(event) => setName(event.currentTarget.value)}
          value={name}
        />
      </FormField>
      <FormField
        labelText="Отчество:"
        errorMessage={errors?.lastname?._errors[0]}
      >
        <input
          className="form-field__input"
          type="text"
          name="lastname"
          onChange={(event) => setLastname(event.currentTarget.value)}
          value={lastname}
        />
      </FormField>
      <FormField
        labelText="E-mail:"
        errorMessage={errors?.email?._errors[0]}
      >
        <input
          className="form-field__input"
          type="text"
          name="email"
          onChange={(event) => setEmail(event.currentTarget.value)}
          value={email}
        />
      </FormField>
      <FormField
        labelText="Дата рождения:"
        errorMessage={errors?.birthday?._errors[0]}
      >
        <input
          className="form-field__input"
          type="date"
          name="birthday"
          onChange={(event) => setBirthday(event.currentTarget.value)}
          value={birthday}
        />
      </FormField>
      <FormField
        labelText="ВУЗ:"
        errorMessage={errors?.instituteId?._errors[0]}
      >
        <select
          id="institute"
          className="form-field__input"
          name="instituteId"
          onChange={(event) => setInstituteId(event.currentTarget.value)}
          value={instituteId}
        >
          <option key="none" value="">-- Выберите ВУЗ --</option>
          {getInstituteListQuery.data?.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </FormField>
      <FormField
        labelText="Придумайте пароль:"
        errorMessage={errors?.password?._errors[0]}
      >
        <input
          className="form-field__input"
          type="password"
          name="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
          value={password}
        />
      </FormField>
      <FormField
        labelText="Я"
      >
        <select
          id="accountStatus"
          className="form-field__input"
          name="accountStatus"
          onChange={(event) => setAccountStatus(event.currentTarget.value as User["accountStatus"])}
          value={accountStatus}
        >
          <option value="student">Студент</option>
          <option value="teacher">Преподаватель</option>
          <option value="admin">Администратор</option>
        </select>
      </FormField>
      {createUserMutation.error && <span className="form-error__message" >{createUserMutation.error?.message}</span>}
      <Button
        kind="primary"
        type="submit"
        className="reg-form__btn"
        isLoading={createUserMutation.isPending}
      >
        Зарегистрироваться
      </Button>
    </form>
  )
}