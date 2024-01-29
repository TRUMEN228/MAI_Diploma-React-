import "./css/Button.css"

export const Button = ({type, btnClassName, textContent}) => {
  return (
    <button type={type} className={btnClassName ? 'btn ' + btnClassName : 'btn'}>{textContent}</button>
  );
};