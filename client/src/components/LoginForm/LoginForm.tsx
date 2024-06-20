import { FC } from "react";
import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
  email: z.string().min(1, { message: "Поле должно быть заполнено" }).email({ message: "Некорректный формат e-mail" }),
  password: z.string().min(1, { message: "Поле должно быть заполнено" })
});

type LoginFormType = z.infer<typeof LoginSchema>;

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (data: {email: string, password: string}) => login(data.email, data.password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"]})
    }
  }, queryClient);

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(({ email, password }) => {
        loginMutation.mutate({ email, password })
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
        labelText="Пароль:"
        errorMessage={errors.password?.message}
      >
        <input
          className="form-field__input"
          type="password"
          {...register("password")}
        />
      </FormField>

      {loginMutation.error && <span className="form__error-message">{loginMutation.error.message}</span>}

      <Button
        type="submit"
        kind="primary"
        className="form__btn"
        isLoading={loginMutation.isPending}
      >
        Войти
      </Button>
    </form>
  );
};