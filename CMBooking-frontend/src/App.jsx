import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogInComponent from './components/LogInCompenent';
import MainComponent from './components/MainComponent';
import UpdateProfileComponent from './components/UpdateProfileComponent';
import ChooseRoleComponent from './components/ChooseRoleCompenent';
import ClientRegistrationComponent from './components/ClientRegistrationComponent';
import OwnerRegistrationComponent from './components/OwnerRegistrationComponent';
import VerifyEmailComponent from './components/VerifyEmailComponent';
import ForgotPasswordComponent from './components/ForgotPasswordComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LogInComponent />} />

        <Route path='/main' element={<MainComponent />} />

        <Route path='/updateProfile/:email' element={<UpdateProfileComponent />} />

        <Route path='/updatePassword/:email' element={<ForgotPasswordComponent />} />

        <Route path='/verify-email' element={<VerifyEmailComponent />} />

        <Route path='/' element={<ChooseRoleComponent />} />

        <Route path='/registration-client' element={<ClientRegistrationComponent />} /> 
        
        <Route path='/registration-owner' element={<OwnerRegistrationComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
