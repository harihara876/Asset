import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import PasswordStrengthMeter from "./passwordStrengthMeter";
import Icon from 'react-icons-kit';
import AppInput from 'vridhee_common_component_mf/AppInput';
import AppButton from 'vridhee_common_component_mf/AppButton';
import { LoginService } from "../Services/loginService";
import { ToastContainer, toast } from 'react-toastify';
import configJson from "vridhee_common_component_mf/configJson";

export default function Setpassword() {

  const [isError, setPwdError] = useState('');
  const navigate = useNavigate();
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const assetUrl = configJson.local.assetUrl;

  const location = useLocation();

  const [pwdInput, initValue] = useState({
    password: "",
  });
  const [input, setInput] = useState({
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  })
  const [isStrong, initRobustPassword] = useState(null);
  const initPwdInput = async (childData: any) => {
    initRobustPassword(childData);
  };


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setInput(prev => ({
      ...prev,
      [name]: value
    }));


    let password = e.target.value;
    initValue({
      ...pwdInput,
      password: e.target.value,
    });
    setPwdError('');
    let caps, small, num, specialSymbol;
    if (password.length < 4) {
      setPwdError(
        "Password should contain atleast 4 characters"
        //   "Password should contain minimum 4 characters, with one UPPERCASE, lowercase, number and special character: @$! % * ? &"
      );
      return;
    } else {
      caps = (password.match(/[A-Z]/g) || []).length;
      small = (password.match(/[a-z]/g) || []).length;
      num = (password.match(/[0-9]/g) || []).length;
      specialSymbol = (password.match(/\W/g) || []).length;
      if (caps < 1) {
        setPwdError("Must add one UPPERCASE letter");
        return;
      } else if (small < 1) {
        setPwdError("Must add one lowercase letter");
        return;
      } else if (num < 1) {
        setPwdError("Must add one number");
        return;
      } else if (specialSymbol < 1) {
        setPwdError("Must add one special symbol: @$! % * ? &");
        return;
      }
    }
    validateInput(e);
  };

  function Continue() {
    const body = {
      "token": location.state.accessToken,
      "pwd": input.password,
      "confPwd": input.confirmPassword
    }
    LoginService.setPassword(body)
      .then((res: any) => {
        if (res.data.status == "Success") {
          toast.success(res.data.data.message)
          setTimeout(() => {
            const data = { type: localStorage.getItem('actorType') };
            navigate("/login", { state: data });
          }, 1000);

        } else {
          toast.error(res.data.message)
        }
      })
      .catch(err =>
        toast.error(err.response.data.message)
      );
  }

  const validateInput = (e: any) => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj: any = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }
      return stateObj;
    });
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
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
          <Grid item xs={12} sm={6} md={4} className="sidebar_login">
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
                  <p>Having troubles?&nbsp;<Link to="">Get Help</Link> </p>
                </div>
              </div>
            </div>

          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <div className="position-relative">
              <div className="signup-right-content setnew-password">
                <div className="page-forms pt-5">
                  <div className="text-left">
                    <h4 className="primary-color font-w600 mb-2">Set New Password</h4>
                    <p>Please create a new password that you don’t use on any other site.</p>
                  </div>


                  <form id="forgot-password mt-3" >
                    <div className="form-group setpassword">
                      <AppInput
                        type={type}
                        label="Create New Password"
                        name="password"
                        onChange={onChange} onBlur={validateInput}
                        placeholder="Enter your password here" />
                      {input.password ? isError !== null && <p className="errors m-0" style={{ color: 'red' }}>  {isError}</p> : ''}

                      <div className="show-password">
                        <span className="flex justify-around items-center" onClick={handleToggle}>
                          <Icon className="absolute mr-10" icon={icon} size={20} />
                        </span>
                      </div>
                      {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
                      <div className="password-info">
                        <div className="password-infoicon">
                          <i className="fa fa-info-circle" aria-hidden="true"></i>
                          <div className="password-ins">
                            <ul>
                              <li><i className="fa fa-circle" aria-hidden="true"></i>Cannot have the old password</li>
                              <li><i className="fa fa-circle" aria-hidden="true"></i>At least 8 characters long but 14 or more is better.</li>
                              <li><i className="fa fa-circle" aria-hidden="true"></i>A combination of uppercase letters, lowercase letters, numbers, & symbols.</li>
                              <li><i className="fa fa-circle" aria-hidden="true"></i>Significantly different from your previous passwords.</li>

                            </ul>
                          </div>
                        </div>

                      </div>
                    </div>

                    {input.password ? <div className='password-strenght'>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={5}>
                          <p className='m-0'>Password Strength</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={7}>
                          <PasswordStrengthMeter password={pwdInput.password} actions={initPwdInput} />
                          <div className="clearfix"></div>
                        </Grid>
                      </Grid>
                    </div> : ''}

                    <div className="form-group mt-2">

                      <AppInput
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        onChange={onInputChange} onBlur={validateInput}
                        placeholder="Enter your password here" />
                      {error.confirmPassword && <span style={{ color: 'red' }}>{error.confirmPassword}</span>}

                    </div>

                    <div className="button-center text-center mt-3">
                      <AppButton

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