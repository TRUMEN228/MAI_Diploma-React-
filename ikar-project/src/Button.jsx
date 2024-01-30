import "./css/Button.css"

export const Button = ({
  type,
  btnClassName,
  textContent
}) => {
  return (
    <button type={type ? type : 'button'} className={btnClassName ? 'btn ' + btnClassName : 'btn'}>{textContent}</button>
  );
};