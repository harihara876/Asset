import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Joinus from "./Pages/joinus"
import Login from "./Pages/login"
import Join_Us from "./Pages/Join-us"
import OTP from "./Pages/otp";
import Forgotpassword from "./Pages/forgot-password"
import Passwordreset from "./Pages/password-reset"
import Setpassword from "./Pages/set-new-password"
import "./index.css";
import JoinusForm from "./Pages/joinus-form";

const App = () => (
  <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Joinus />} />
        <Route path="login" element={<Login />} />
        <Route path='/join-us' element={<Join_Us />} />
        <Route path='/otp' element={<OTP />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/password-reset' element={<Passwordreset />} />
        <Route path='/set-password' element={<Setpassword />} />
        <Route path='/joinus-form' element={<JoinusForm />} />
        
      </Routes>
    </BrowserRouter>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
