import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      {/* <div className="loading-spinner"> */}
      <TailSpin color="blue"/>
      {/* </div> */}
    </div>

//     <div className="loader-container">
//     <div className="loader"></div>
//  </div>


  );
}