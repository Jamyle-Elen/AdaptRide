import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/homepage.jsx";
import NotFound from "../pages/NotFound/notfound.jsx";
import AboutPage from "../pages/about/about.jsx";
import Help from "../pages/help/help.jsx"
import History from '../pages/history/history.jsx';
// Passageiro
import SignIn from "../pages/passenger/Sign_in/sign-in.jsx";
import SignUp from "../pages/passenger/Sign_up/sign-up.jsx";
import ProfilePassenger from "../pages/profilePassenger/profilePassenger.jsx";
// Parceiro
import SignInDriver from "../pages/driver/Sign_in/sign-in-driver.jsx";
import SignUpDriver from "../pages/driver/Sign_up/sign-up-driver.jsx";
import RaceRequest from "../pages/RaceRequest/raceRequest.jsx";
import Teste from "../pages/teste/teste.jsx";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path= "/aboutpage" element={<AboutPage/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path= "/history" element={<History/>}/>
          <Route path="/sign-in/driver" element={<SignInDriver />} />
          <Route path="/sign-up/driver" element={<SignUpDriver />} />
          <Route path="/profile-passenger" element={<ProfilePassenger />} />
          <Route path="/race-request" element={<RaceRequest />} />
          {/* <Route path="/profile/:id" element={<ProfilePassenger/>} /> */}
          <Route path="*" element={<NotFound />} />
          <Route path="/teste" element={<Teste/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
