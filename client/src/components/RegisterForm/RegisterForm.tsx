import { FC } from "react";
import { z } from "zod";
import "./RegisterForm.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { FormField } from "../FormField";
import { Button } from "../Button";

const CreateUserScheme = z.object({
  email: z.string().email({ message: "E-mail должен содержать символ @"}),
  username: z.string().min(6, "Имя пользователя должно включать не менее 6 символов"),
  fullName: z.string(),
  birthday: z.string(),
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

  const createUserMutation = useMutation({
    mutationFn: (data: {
      email: string,
      username: string,
      fullName: string,
      birthday: string,
      password: string
    }) => registerUser(data.email, data.username, data.fullName, data.birthday, data.password)
  }, queryClient);

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(({
        email,
        username,
        fullName,
        birthday,
        password
      }) => {
        createUserMutation.mutate({ email, username, fullName, birthday, password })
      })}
    >
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
        labelText="Имя пользователя:"
        errorMessage={errors.username?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("username")}
        />
      </FormField>
      <FormField
        labelText="ФИО:"
        errorMessage={errors.fullName?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("fullName")}
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
        labelText="Придумайте пароль:"
        errorMessage={errors.password?.message}
      >
        <input
          className="form-field__input"
          type="password"
          {...register("password")}
        />
      </FormField>
      <Button
        kind="primary"
        type="submit"
        className="reg-form__btn"
        text="Зарегистрироваться"
        isLoading={createUserMutation.isPending}
      />
    </form>
  )
}