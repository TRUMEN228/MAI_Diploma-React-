import { FC } from "react";
import { z } from "zod";
import "./RegisterForm.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User, registerUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { fetchInstituteList } from "../../api/Institutes";

const CreateUserScheme = z.object({
  email: z.string().email({ message: "E-mail должен содержать символ @"}),
  accountStatus: z.custom<"student" | "teacher" | "admin">(),
  surname: z.string(),
  name: z.string(),
  lastname: z.string(),
  birthday: z.string(),
  instituteId: z.string(),
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов")
});

type CreateUserForm = z.infer<typeof CreateUserScheme>;

export const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserForm>({
    resolver: zodResolver(CreateUserScheme)
  });

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
      onSubmit={handleSubmit(({ email, accountStatus, surname, name, lastname, birthday, instituteId, password }) => {
        createUserMutation.mutate({ email, accountStatus, surname, name, lastname, birthday, instituteId, password });

        if (createUserMutation.isSuccess) {
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
      >
        <select
          id="institute"
          className="form-field__input"
          {...register("instituteId")}
        >
          <option key="none" value="">-- Выберите ВУЗ --</option>
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
        labelText="Я"
      >
        <select
          id="accountStatus"
          className="form-field__input"
          {...register("accountStatus")}
        >
          <option value="student">Студент</option>
          <option value="teacher">Преподаватель</option>
          <option value="admin">Администратор</option>
        </select>
      </FormField>
      {createUserMutation.error?.message ? <span>{createUserMutation.error.message}</span> : null}
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