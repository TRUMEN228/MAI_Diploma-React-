import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Account } from './components/Account';

function App() {
  return (
    <BrowserRouter>
      <Account />
    </BrowserRouter>
  )
}

export default App
