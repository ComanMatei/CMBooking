import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import { getProperties } from "./service/PropertyService";

import MainHeaderComponent from "./components/MainHeaderComponent";
import UpdateProfileComponent from "./components/UpdateProfileComponent";
import LogInComponent from "./components/LogInCompenent";
import ChooseRoleComponent from "./components/ChooseRoleCompenent";
import ClientRegistrationComponent from "./components/ClientRegistrationComponent";
import OwnerRegistrationComponent from "./components/OwnerRegistrationComponent";
import VerifyEmailComponent from "./components/VerifyEmailComponent";
import ForgotPasswordComponent from "./components/ForgotPasswordComponent";
import CreatePropertyComponent from "./components/CreatePropertyComponent";
import PropertyList from "./components/PropertyList";
import RentingList from "./components/RentingList";


function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const getAllProperties = async (page = 0, size = 4) => {
    try {
      setCurrentPage(page);
      const { data } = await getProperties(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main/:email" element={<><MainHeaderComponent />
          <PropertyList data={data} currentPage={currentPage} getAllProperties={getAllProperties} /> </>} />

        <Route path="/rentingList/:email" element={<> <MainHeaderComponent /> <RentingList /> </>}></Route>

        <Route path='/updateProfile/:email' element={<><MainHeaderComponent /><UpdateProfileComponent /></>} />
        <Route path='/chooseRegistration' element={<ChooseRoleComponent />} />
        <Route path='/createProperty/:email' element={<CreatePropertyComponent />} />
        <Route path='/updatePassword/:email' element={<ForgotPasswordComponent />} />
        <Route path='/verify-email' element={<VerifyEmailComponent />} />
        <Route path='/' element={<LogInComponent />} />
        <Route path='/registration-client' element={<ClientRegistrationComponent />} />
        <Route path='/registration-owner' element={<OwnerRegistrationComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
