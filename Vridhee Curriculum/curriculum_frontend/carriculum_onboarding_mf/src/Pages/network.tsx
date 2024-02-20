import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AppButton from "vridhee_common_component_mf/AppButton";
import configJson from "vridhee_common_component_mf/configJson";
import { OnboardingService } from '../Services/onboardingService';
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from "jwt-decode";
import { countries } from './catalog';
import IUser from '../Models/IUser';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const data = [
    {
        "name": "k.w.s.cbdk",
        "email": "k.w.s.cbdk@gmail.com",
        "photo": "https://lh3.googleusercontent.com/cm/AOgkWRYB5aNSIXSwPKKv_6DaKRd85uR1HxxmccPcv-IxiIEoczPkqrzktXkiUiA3y0EZ=s100"
    },
    {
        "name": "msahoo812",
        "email": "msahoo812@gmail.com",
        "photo": "https://lh3.googleusercontent.com/cm/AOgkWRb0WdLMQEnhviQCfVFlVAAIniZeoGUBXtwSUTWYLdUHSMznF0yh-0BvOxRl2xzk=s100"
    }
];
const drawerWidth = 300;

function Network() {
    const[syncLoad, setSyncLoad] = useState(false);
    const [userContacts, setUserContacts] = useState([]);
    const assetUrl = configJson.local.assetUrl;
    const navigate = useNavigate();
    const [checked, setChecked] = useState([{
        id: ""
    }]);
    const Dashboard_Route_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl

    function Previous() {
        navigate('/awards-certificates');
    }
    function Reset() {
        setChecked([{
            id: ""
        }])
    }

    function Complete() {
        if (localStorage.getItem('token')) {
            let token: any = localStorage.getItem('token');
            let actorType: any = localStorage.getItem('actorType');
            let userdetails: any = jwt_decode(token);
            const userId = userdetails.user_id;
            OnboardingService.userVerify(userId)
                .then(res => {
                    if (res.data.status == 200 && res.data.msg == 'Onboarding_Completed') {
                        navigate('/Completed');
                        toast.success("Onboarding Completed");
                        setTimeout(() => {
                            window.location.replace(`${Dashboard_Route_URL}dashboard` + "?" + actorType  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid') )
                            // window.location.replace(`${Dashboard_Route_URL}dashboard` + "?" + token + "?" + actorType)
                        }, 1500);
                    } else {
                        toast.error("Onboarding Not Completed");
                    }
                })
                .catch(error => {
                    toast.error(error.message);
                });
        }
    }
    const handleCheckAllChange = (e: any) => {
        setChecked(
            e.target.checked ? countries.map((c: any) => c.name) : []
        );
    };

    const handleCountryChange = (e: any, c: any) => {
        setChecked((prevChecked) =>
            e.target.checked
                ? [...prevChecked, c.name]
                : prevChecked.filter((item) => item !== c.name)
        );
    };

    // Sync Gmail Contacts
    const syncwithgmail = () => {
        const email = localStorage.getItem("email");
        if(email) {
            OnboardingService.syncGmailContacts(email)
                .then(res => {
                    console.log("syncGmailContacts>>", res)
                    // Replace the URL with the one you want to open
                    const googleAccountsURL = res.data;
                    window.location.href = googleAccountsURL;
                    setSyncLoad(true)
                    
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
    }

    useEffect(() => {
        console.log("calling contact get api>>", syncLoad);
        // if(syncLoad) {
            OnboardingService.getGmailContacts()
                .then(res => {
                    if(res.data.status != 400) {
                        console.log("getGmailContacts>>", res)
                        setUserContacts(res.data.data.circle);
                    } else {
                        console.log("first loading")
                    }

                })
                .catch(error => {
                    toast.error(error.message);
                })
        // }
    },[syncLoad])
    return (
        <div>
            <div className="">
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <div className="sidebar-sec">
                            <Sidebar />
                        </div>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                    >
                        <div className="page-wrapper">
                            <div className="breadcrumbs-sec">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Typography color="#62676C">Network</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="inner-page-content">

                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">My Network</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        <h4 className="primary-color m-0">STEP 08/08</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="page-forms ">
                                    <div className="select-check mb-1">
                                        <div className="text-right">
                                            <div className="form-check network-connect">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="selectAll"
                                                    checked={checked.length === countries.length}
                                                    onChange={handleCheckAllChange}
                                                />Select all

                                            </div>

                                        </div>
                                    </div>

                                    {/* {countries.map((c: any) => (
                                        <div key={c.id}>
                                            <div className="userbox">
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        {`${c.name}` == 'Prakash venekanti' && <img src={`${assetUrl}/prn.png`} alt="" />}
                                                        {`${c.name}` == 'Lavanya Tunigalla' && <img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg" alt="" />}
                                                        {`${c.name}` == 'Kishore babu Yarlapati' && <img src={`${assetUrl}/person1.jpg`} alt="" />}
                                                        <h4>{c.name} </h4>
                                                        <p className="primary-color m-0">{c.designation}</p>
                                                        <p className="m-0">{c.institute}</p>
                                                    </div>

                                                </div>

                                                <div className="text-right network-connect">
                                                    <span>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={c.id}
                                                            checked={checked.includes(c.name)}
                                                            onChange={(e) => handleCountryChange(e, c)}
                                                        />CONNECT
                                                    </span>

                                                </div>
                                            </div>

                                        </div>
                                    ))} */}
                                {userContacts?.map((c: IUser, id) => (
                                    
                                        <div key={id}>
                                                <div key={c._id} className="userbox">
                                                    <div className="row">
                                                        <div className="col-md-10">
                                                            {c.userName && (
                                                                <img src={c.profileImage} alt="" />
                                                            )}
                                                            <h4>{c.userName} </h4>
                                                            <p className="primary-color m-0">{c.rel_ty_id[0].src}</p>
                                                            {/* <p className="m-0">{c.institute}</p> */}
                                                        </div>
                                                    </div>

                                                    <div className="text-right network-connect">
                                                        <span>
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={c._id}
                                                                //   checked={checked.includes(c.userName)}
                                                                onChange={(e) => handleCountryChange(e, c)}
                                                            />
                                                            CONNECT
                                                        </span>
                                                    </div>
                                                </div>
                                        </div>
                                    ))}


                                    <div className="add-btn mb-2">
                                        <button type="button" className="btn add-more-btn w-100" 
                                        onClick={syncwithgmail}
                                        >
                                            Sync with GMAIL Contacts
                                        </button>
                                    </div>


                                    <div className="button-center text-center mt-4">
                                        <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn' />
                                        <AppButton children="Clear" onClick={Reset} styleClass='btn clear-btn mr-2 ml-2' />
                                        <AppButton children="Completed"
                                            disabled={localStorage.getItem('pInfoFlag') == 'false'}
                                            onClick={Complete} styleClass='btn save-btn' />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Box>

                </Box>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Network;