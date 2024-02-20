import React from 'react';
import { Link } from 'react-router-dom';
import configJson from "vridhee_common_component_mf/configJson";
import { ToastContainer, toast } from 'react-toastify';
const assetUrl = configJson.local.assetUrl;


function Confirm() {
    return <div>
        <div className="confirm-text">
            <img src={`${assetUrl}/logo.png`} alt="" className="con-logo" />
            <h3 className="primary-color">Congratulation!</h3>
            <h4 className="mt-3 mb-3">You have successfully completed setting up your profile…</h4>
            <img className="mt-3 mb-3" src={`${assetUrl}/refresh.svg`} alt="" />
            <h4 className=" mt-3"><Link className="primary-color" to="/curriculum-dashboard">Loading your experience in 5 seconds…!!!</Link></h4>
        </div>
        <ToastContainer />
    </div>
}
export default Confirm;