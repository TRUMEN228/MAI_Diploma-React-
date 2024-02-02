import "./css/ProfileDataLabel.css";

export const ProfileDataLabel = ({
  type,
  labelText,
  userData,
  labelClassName,
  dataClassName
}) => {
  return (
    <>
      <span className={labelClassName ? labelClassName + " profile__" + type + "-label" : "profile__" + type + "-label"}>
        {labelText}
      </span>
      <span className={dataClassName ? dataClassName + " profile__" + type : "profile__" + type}>
        {userData}
      </span>
    </>
  );
};