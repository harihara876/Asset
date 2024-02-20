import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { LoginService } from "../Services/loginService";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AppInput from 'vridhee_common_component_mf/AppInput';
import AppButton from 'vridhee_common_component_mf/AppButton';
import configJson from "vridhee_common_component_mf/configJson";

export default function Forgotpassword() {

    let [email, setEmail] = useState('');
    const navigate = useNavigate();

    const assetUrl = configJson.local.assetUrl;


    function login() {
        const data = { type: localStorage.getItem('actorType') };
        navigate("/login", { state: data });
    }

    function Reset(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const body = {
            "userId": email
        }
        LoginService.forgetPassword(body)
            .then(res => {
                if (res.data.data.otp) {
                    toast.success(res.data.message)
                    const data = { dataRes: res.data.data, email: email };
                    navigate("/password-reset", { state: data });
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(err =>
                toast.error(err.response.data.message)
            );
    }

    return (
        <div className="">
            <div className="page-content">
                <Grid container>

                    <Grid item xs={12} md={4} className="sidebar_login">
                        <div className="signup-left-con">
                            <div className="signup-inner-content">
                                <div className="signup-inner-log">
                                    <img src={`${assetUrl}/white-logo.svg`} alt="VIDRHEE" />
                                </div>
                                <div className="signup-inner-con">
                                    <div className="quote-icon position-relative">
                                        <p>Vridhee is the 1st social learning platform bringing all the teachers and learners together for a seamless knowledge sharing experience through community driven learning with multilingual curriculum using curated web-sourced contents to enable #educationforall</p>
                                    </div>
                                    <div className="leftside-con-bottm">
                                        <p>Having troubles?&nbsp;<Link to="">Get Help</Link> </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <div className="position-relative">
                            <div className="signup-right-content">
                                <div className="page-forms pt-5">
                                    <div className="forgot-text text-left">
                                        <h4 className="primary-color font-w600 mb-2">Forgot password?</h4>
                                        <p>No worries, We will send you reset instructions</p>
                                    </div>

                                    <form id="forgot-password mt-3" >
                                        <div className="form-group">
                                            <AppInput
                                                type="text"
                                                label="Enter your recovery Account"
                                                name="email"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                                placeholder="Ex:- Email address, Phone number" />
                                        </div>

                                        <div className="button-center text-center mt-2">
                                            <AppButton
                                                children="Reset Password" disabled={!email} onClick={Reset}
                                                styleClass='btn save-btn border-r primary-bg w-100' />
                                        </div>

                                        <div className="text-center mt-2 back-to">
                                            <span className="text-center">
                                                <a onClick={login}>
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