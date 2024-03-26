import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogInComponent from './components/LogInCompenent';
import ChooseRoleComponent from './components/ChooseRoleCompenent';
import ClientRegistrationComponent from './components/ClientRegistrationComponent';
import OwnerRegistrationComponent from './components/OwnerRegistrationComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LogInComponent />} />

          <Route path='/' element={<ChooseRoleComponent />} />

          <Route path='/registration-client' element={<ClientRegistrationComponent />} /> 

          <Route path='/registration-owner' element={<OwnerRegistrationComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
