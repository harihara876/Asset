import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AppButton from 'vridhee_common_component_mf/AppButton';
import { useLocation } from 'react-router-dom';
import OtpInputCode from "./otpInput"
import configJson from "vridhee_common_component_mf/configJson";
import OTPInput from './otpInput';


let otpFlag: boolean = false
export default function OTP() {

    const navigate = useNavigate();
    const location = useLocation();

    const assetUrl = configJson.local.assetUrl;
    const [otp, setOtp] = useState('');

    function Verify() {
        if (location.state.OTP == otp && location.state.OTP != "1234") {
            const data = { email: location.state.email, };
            navigate("/joinus-form", { state: data });
        }
        else if (location.state.OTP == "1234") {
            if (otp == location.state.OTP) {
                const data = { mobile: location.state.mobile };
                navigate("/joinus-form", { state: data });
            } else {
                toast.error("Incorrect OTP")
            }

        }
        else {

        }

    }

    return (
        <div>
            <div className="page-content">
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={5}>
                        <div className="joinus-left-con">
                            <div className="joinus-inner-content">
                                <div className="joinus-inner-log">
                                    <img src={`${assetUrl}/white-logo.svg`} alt="VRIDHEE" style={{ 'width': '250px' }} />
                                </div>
                                <div className="joinus-inner-con">
                                    <h4>
                                    Adaptive learning based social learning platform
                                        {/* A social learning platform A place where learning ≠ boredom */}
                                        </h4>
                                    <div className="quote-icon position-relative">
                                        <p>
                                        Vridhee is a social learning platform provided by AI / ML and internet technologies
to make education more inclusive, affordable, equitable, and accessible to all
sections of society bringing the mentors and learners together for a seamless
knowledge sharing experience through adaptive, peer, social and activity based
learning with multilingual curriculum
                                            {/* Vridhee is the 1st social learning platform bringing all the teachers and learners together for a seamless knowledge sharing experience through community driven learning with multilingual curriculum using curated web-sourced contents to enable #educationforall */}
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <div className="signup-right-content">
                            <div className="page-forms pt-5">
                                <div className="mail-form">
                                    <img src={`${assetUrl}/signup/Mail-art-image.svg`} alt="" />
                                    <p className="text-center">Please check your email or mobile for the OTP and enter it below.</p>
                                </div>
                                <form id="otpData" >
                                    <div className="opt-sec mb-2">
                                        <label className="w-100" htmlFor="exampleInputEmail1">Enter OTP</label>
                                        <OTPInput
                                            autoFocus
                                            isNumberInput
                                            length={4}
                                            className="otp-inputs container"
                                            onChangeOTP={val => {
                                                setOtp(val);
                                                if (otp.length == 3)
                                                    otpFlag = true;
                                            }}

                                        />
                                        <div className='clearfix'></div>
                                    </div>

                                    <div className="button-center text-center">
                                        <AppButton
                                            disabled={!otpFlag}
                                            onClick={Verify}
                                            children="Verify"
                                            styleClass='btn save-btn border-r primary-bg w-100' />
                                    </div>


                                </form>
                            </div>
                        </div>
                        <div className="copyright">
                            <p className="m-0">© Vridhee 2023</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <ToastContainer />
        </div>
    );
}
