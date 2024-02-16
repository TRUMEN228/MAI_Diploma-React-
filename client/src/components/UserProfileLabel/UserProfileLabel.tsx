import { FC } from "react";
import "./UserProfileLabel.css";

interface IUserProfileLabelProps {
  kind?: "primary" | "secondary";
  labelText: string;
  userData: string;
  labelClassName?: string;
  dataClassName?: string;
}

export const UserProfileLabel: FC<IUserProfileLabelProps> = ({
  kind = "primary",
  labelText,
  userData,
  labelClassName,
  dataClassName
}) => {
  return (
    <>
      <span
        className={labelClassName ? "profile__" + kind + "-label " + labelClassName : "profile__" + kind + "-label"}
      >
        {labelText}
      </span>
      <span
        className={dataClassName ? "profile__" + kind + " " + dataClassName : "profile__" + kind}
      >
        {userData}
      </span>
    </>
  )
}