import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/homepage.jsx";
import NotFound from "../pages/NotFound/notfound.jsx";
import AboutPage from "../pages/about/about.jsx";
import Help from "../pages/help/help.jsx"
import History from '../pages/history/history.jsx';
import SideBar from "../components/sideBar/sideBar.jsx";
import TermsAndPrivacy from "../pages/TermsAndPrivacy/termsAndPrivacy.jsx";

// Passageiro
import SignIn from "../pages/passenger/Sign_in/sign-in.jsx";
import SignUp from "../pages/passenger/Sign_up/sign-up.jsx";
import ProfilePassenger from "../pages/profilePassenger/profilePassenger.jsx";
// import HistoryPassenger from "../pages/historyPassenger/historyPassenger.jsx"
// Parceiro
import SignInDriver from "../pages/driver/Sign_in/sign-in-driver.jsx";
import SignUpDriver from "../pages/driver/Sign_up/sign-up-driver.jsx";
import RaceRequest from "../pages/RaceRequest/raceRequest.jsx";
import ProfileDriver from "../pages/driver/ProfileDriver/ProfileDriver.jsx";
import SafeAlert from "../pages/SafeAlert/index.jsx";
import DriverDashboard from "../pages/driver/Dashboard/Dashboard.jsx";

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
          {/* <Route path= "/history" element={<History/>}/> */}
          <Route path="/sign-in/driver" element={<SignInDriver />} />
          <Route path="/sign-up/driver" element={<SignUpDriver />} />
          <Route path="/profile-passenger" element={<ProfilePassenger />} />
          {/* <Route path="/historyPassenger" element={<HistoryPassenger />} /> */}
          <Route path="/race-request" element={<RaceRequest />} />
          <Route path="/sideBar" element={<SideBar/>} />
          {/* <Route path="/profile/:id" element={<ProfilePassenger/>} /> */}
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/teste" element={<Teste/>} /> */}
          <Route path="/safealert" element={<SafeAlert />} />
          <Route path="/profile/driver/:id" element={<ProfileDriver/>} />
          <Route path="/dashboard/driver" element={<DriverDashboard/>} />
          <Route path="/termsAndPrivacy" element={<TermsAndPrivacy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
