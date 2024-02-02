import './css/App.css';
import { ModalWindow } from './ModalWindow';
import { LoginForm } from './LoginForm';
import { Header } from './Header'
import { Profile } from './Profile';
import { useModal } from './hooks/useModal';
import { useLoginForm } from './hooks/useLoginForm';

function App() {
  const {modalActive, content, modalClose, modalActivate} = useModal();
  const {error, userList, user, loginInput, passwordInput, formSubmit} = useLoginForm();

  return (
    <>
      {/* <Header /> */}
      {/* <div id="app-main">
        <Profile
          user={{
            surname: "Коноплин",
            name: "Денис",
            lastname: "Викторович",
            birthday: "2002-04-01",
            login: "DKonoplin",
            email: "d_konoplin@mail.ru"
          }}
        />
      </div> */}
      <div id="app">
        <ModalWindow
          active={modalActive}
          onClose={modalClose}
          contentType={content}
        />
        <LoginForm
          loginInputRef={loginInput}
          passwordInputRef={passwordInput}
          onSubmit={formSubmit}
          onRegister={modalActivate}
        />
      </div>
    </>
  );
}

export default App
