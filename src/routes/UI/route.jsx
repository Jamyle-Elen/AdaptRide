import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/homepage/homepage.jsx'
import SignIn from '../../pages/passenger/Sign_in/sign-in.jsx'
import SignUp from '../../pages/passenger/Sign_up/sign-up.jsx'
import ProfilePassenger from '../../pages/Profile/profile.jsx'

const Router = () => {
    return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/profile-passenger' element={<ProfilePassenger/>}/>
        <Route path='*' element={<h1>Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
    </>
    )
}

export default Router;