import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppButton from "vridhee_common_component_mf/AppButton";
import configJson from "vridhee_common_component_mf/configJson";

function Congrats() {
    const location = useLocation();
    const navigate = useNavigate();

    const assetUrl = configJson.local.assetUrl;

    function goNext() {
        navigate(`${location.state.name}`);
    }

    return <div>
        <div className="congreats-text">
            <img src={`${assetUrl}/logo.png`} alt="" className="con-logo" /><br />
            <div className="consid-img"><img src={`${assetUrl}/congreates-img.png`} alt="" className="con-img" /></div>
            <h4 className="primary-color w-100">Congratulation!</h4>
            <h4 className="primary-color w-100">You won <span>{location.state.coins}</span> VCoins.</h4>
            <AppButton onClick={goNext} children="Do you want to continue and more vCoins" styleClass='btn save-btn mt-2 pt-2 pb-2' />
        </div>
    </div>
}

export default Congrats;
