import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";
import Lang from "./Pages/lang"
import Personalinformation from "./Pages/personal-information";
import Teaching from "./Pages/teaching-interest";
import Learinginterest from "./Pages/learning-interest";
import Hobbiespassion from "./Pages/hobbies-passion";
import Skills from "./Pages/skills-interests";
import Education from "./Pages/educational-details";
import Professional from "./Pages/professional-details";
import Awards from "./Pages/awards-certificates";
import Network from "./Pages/network";

const App = () => (
  <div className="container">
    {/* <div>Name: curriculum_onboarding_mf</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div> */}
    <BrowserRouter>
      <Routes>
        <Route path='/lang' element={<Lang />} />
        <Route path='/personal-information' element={<Personalinformation />} />
        <Route path='/teaching-interest' element={<Teaching />} />
        <Route path='/learning-interest' element={<Learinginterest />} />
        <Route path='/hobbies-passion' element={<Hobbiespassion />} />
        <Route path='/skills-interests' element={<Skills />} />
        <Route path='/educational-details' element={<Education />} />
        <Route path='/professional-details' element={<Professional />} />
        <Route path='/awards-certificates' element={<Awards />} />
        <Route path='/network' element={<Network />} />
      </Routes>
    </BrowserRouter>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
