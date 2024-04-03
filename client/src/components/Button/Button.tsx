import { FC, HTMLAttributes } from "react";
import "./Button.css";
import { Loader } from "../Loader";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: "submit" | "reset" | "button";
  className?: string;
  kind: "primary" | "secondary";
  children?: React.ReactNode;
}

export const Button: FC<IButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  type = "button",
  className,
  kind = "primary",
  children,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={className ? "button " + className : "button"}
      data-kind={kind}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};