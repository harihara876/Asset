import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import "./index.css";
import Lang from "./Pages/lang"

const App = () => (
  <div className="container">
    {/* <div>Name: curriculum_onboarding_mf</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div> */}
      <BrowserRouter>
              <Routes>
              <Route path='/lang' element={<Lang/>} />
              </Routes>
            </BrowserRouter>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
