import { FC } from "react";
import "./Loader.css";

interface ILoaderProps {
  className?: string;
  itemClassName?: string;
}

export const Loader: FC<ILoaderProps> = ({
  className, itemClassName
}) => {
  return (
    <div className={className ? "loader " + className : "loader"}>
      <div className={itemClassName ? "loader-item " + itemClassName : "loader-item"}></div>
      <div className={itemClassName ? "loader-item " + itemClassName : "loader-item"}></div>
      <div className={itemClassName ? "loader-item " + itemClassName : "loader-item"}></div>
    </div>
  );
};