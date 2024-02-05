import './css/App.css';
import { ModalWindow } from './ModalWindow';
import { LoginForm } from './LoginForm';
import { Header } from './Header'
import { Profile } from './Profile';
import { useModal } from './hooks/useModal';
import { useLoginForm } from './hooks/useLoginForm';
import { useProfile } from './hooks/useProfile';

function App() {
  const {modalActive, content, modalClose, modalActivate} = useModal();
  const {loginInput, passwordInput, formSubmit} = useLoginForm();
  const {user} = useProfile();

  return (
    <>
      {/* <Header /> */}
      <div id="app-main">
        <Profile
          // user={{
          //   surname: "Коноплин",
          //   name: "Денис",
          //   lastname: "Викторович",
          //   birthday: "2002-04-01",
          //   login: "DKonoplin",
          //   email: "d_konoplin@mail.ru"
          // }}
          user={user}
        />
      </div>
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
