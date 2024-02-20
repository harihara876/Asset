import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OtpInputCode from './otpInput';
import { ToastContainer, toast } from 'react-toastify';
import AppButton from 'vridhee_common_component_mf/AppButton';
import { LoginService } from "../Services/loginService";
import configJson from "vridhee_common_component_mf/configJson";
import OTPInput from './otpInput';


let otpRefId: string
let otpFlag: boolean

export default function Passwordreset() {

    const location = useLocation();
    const navigate = useNavigate();

    const [otp, setOtp] = useState('');

    const assetUrl = configJson.local.assetUrl;

    function Continue(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (location.state.dataRes) {
            otpRefId = location.state.dataRes.otpRefId
        } else {
            otpRefId = location.state.otpRefId
        }
        const body = {
            "otp": otp,
            "ref": otpRefId
        }
        LoginService.verifyOTP(body)
            .then(res => {
                if (res.data.status == "Success") {
                    navigate("/set-password", { state: res.data.data });
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(err =>
                toast.error(err.response.data.message)
            );
    }

    function getOTP() {
        if (location.state) {
            const body = {
                "userId": location.state.email
            }
            LoginService.forgetPassword(body)
                .then(res => {
                    if (res.data.data.otp) {
                        toast.success(res.data.message)
                        navigate("/password-reset", { state: res.data.data });
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err =>
                    toast.error(err.response.data.message)
                );
        }


    }
    function login() {
        const data = { type: localStorage.getItem('actorType') };
        navigate("/login", { state: data });
    }

    return (
        <div className="">
            <div className="page-content">
                <Grid container direction="row">
                    <Grid item xs={12} md={4} className="sidebar_login">
                        <div className="signup-left-con">
                            <div className="signup-inner-content">
                                <div className="signup-inner-log">
                                    <img src={`${assetUrl}/white-logo.svg`} alt="VRIDHEE" />
                                </div>
                                <div className="signup-inner-con">
                                    <div className="quote-icon position-relative">
                                        <p>Vridhee is the 1st social learning platform bringing all the teachers and learners together for a seamless knowledge sharing experience through community driven learning with multilingual curriculum using curated web-sourced contents to enable #educationforall</p>
                                    </div>
                                </div>
                                <div className="leftside-con-bottm">
                                    <p>Having troubles?&nbsp;<a >Get Help</a> </p>
                                </div>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12} md={8}>
                        <div className="position-relative">
                            <div className="signup-right-content reset_password_sec">
                                <div className="page-forms pt-5">
                                    <div className="forgot-text text-left">
                                        <h4 className="primary-color font-w600 mb-2">Password Reset</h4>
                                        <p>We sent code to <b>{location.state.email}</b></p>
                                    </div>
                                    <form id="forgot-password mt-3" >
                                        <div className="form-group opt-sec">
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
                                        </div>
                                        <p className=''>Not Received OTP Yet..? <a onClick={getOTP}>Click here</a> to resend</p>
                                        <div className="button-center text-center mt-3">
                                            <AppButton
                                                disabled={!otpFlag}
                                                onClick={Continue}
                                                children="Continue"
                                                styleClass='btn save-btn border-r primary-bg w-100' />
                                        </div>
                                        <div className="text-center mt-2">
                                            <span className="text-center">
                                                <a onClick={login} className="font-w600 text-dec">
                                                    <img src={`${assetUrl}/back.svg`} alt="" width="20px" />
                                                    &nbsp;&nbsp;Back to Login</a>
                                            </span>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="copyright">
                                <p className="m-0">© Vridhee 2023</p>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <ToastContainer />
        </div>
    );
}