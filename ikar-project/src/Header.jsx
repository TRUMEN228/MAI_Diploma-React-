import "./css/Header.css";

export const Header = () => {
  const headerItems = [
    'Новости',
    'Учеба',
    'Сообщения',
    'Моя группа',
    'Профиль'
  ];

  return (
    <header id="app-header">
      <div className="container header__container">
        <ul className="list-reset header__list">
          {headerItems.map((item) => (
            <li key={item} id={"header__item-" + (headerItems.indexOf(item) + 1)} className="header__item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};