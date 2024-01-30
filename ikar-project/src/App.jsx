import './css/App.css'
import { ModalWindow } from './ModalWindow'
import { LoginForm } from './LoginForm';
import { useModal } from './hooks/useModal'
import { useLoginForm } from './hooks/useLoginForm';

function App() {
  const {modalActive, content, modalClose, modalActivate} = useModal();
  const {errors, userList, user, getLogin, getPassword, formSubmit} = useLoginForm();

  return (
    <div id="app">
      <ModalWindow
        active={modalActive}
        onClose={modalClose}
        contentType={content}
      />
      <LoginForm
        getLogin={getLogin}
        getPassword={getPassword}
        onSubmit={formSubmit}
        onRegister={modalActivate}
      />
    </div>
  );
}

export default App
