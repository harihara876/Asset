import React, { lazy, Suspense } from "react";
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Join_Us from "vridhee_account_mf/Join_Us";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index"




// const App = () => (
//   const [startTime, setStartTime] = useState<null | number>(null);
//   const [screenTime, setScreenTime] = useState(0);

//   useEffect(() => {
//     // This effect runs on mount
//     setStartTime(new Date().getTime());
  
//     // This effect runs on unmount
//     return () => {
//       if (startTime) {
//         const endTime = new Date().getTime();
//         const elapsedTime = endTime - startTime;
//         setScreenTime(screenTime + elapsedTime);
//       }
//     };
//   }, []);

//   <div className="container">
//     <div>Name: vridhee_common_component_mf</div>
//     <div>Framework: react</div>
//     <div>Language: TypeScript</div>
//     <div>CSS: Empty CSS</div>
//     <p>Screen Time: {screenTime} milliseconds</p>

//     <BrowserRouter>
//       <Routes>
//         <Route path='/join-us' element={<Join_Us />} />
//       </Routes>
//     </BrowserRouter>

//   </div>
// );
// ReactDOM.render(<App />, document.getElementById("app"));


const App = () => {
  const [timer, setTimer] = useState(0);
  const [isConditionMet, setIsConditionMet] = useState(false);

  useEffect(() => {
    let intervalId: any;

    // Start the timer when the condition is met
    if (isConditionMet) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    // Clear the interval when the condition is no longer met or when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [isConditionMet]);

  const handleStartTimer = () => {
    // Set the condition to start the timer
    setTimer(0);
    setIsConditionMet(true);
  };

  const handleStopTimer = () => {
    // Reset the timer and stop it
    setIsConditionMet(false);
    setTimer(timer);
  };

  return (
    <div className="container">
      <div>Name: vridhee_common_component_mf</div>
      <div>Framework: react</div>
      <div>Language: TypeScript</div>
      <div>CSS: Empty CSS</div>
      <p>Timer: {timer} seconds</p>
      <button onClick={handleStartTimer}>Start Timer</button>
      <button onClick={handleStopTimer}>Stop Timer</button>
      <BrowserRouter>
        <Routes>
          <Route path='/join-us' element={<Join_Us />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

{/* <BrowserRouter>
  <Routes>
    <Route path='/join-us' element={<Join_Us />} />
  </Routes>
</BrowserRouter> */}

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
