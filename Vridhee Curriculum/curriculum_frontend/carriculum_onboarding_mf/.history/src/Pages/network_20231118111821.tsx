import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const drawerWidth = 300;

function Network() {
    const assetUrl = configJson.local.assetUrl;
    const navigate = useNavigate();
    const [checked, setChecked] = useState([{
        id: ""
    }]);
    const Dashboard_Route_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl

    function Previous() {
        navigate('/awards-certificates');
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
                            // window.open(`http://localhost:5040`)
                            // window.open(`${Dashboard_Route_URL}`)
                            window.location.replace(`${Dashboard_Route_URL}` + "?" + token + "?" + actorType)
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
                                    {/* <Link color="#174392" to="/">
                                        Splash
                                    </Link> */}

                                    <Typography color="#62676C">Network</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="inner-page-content">

                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">My Network</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        {/* {localStorage.getItem('actorType') == 'Parent' ? <h4 className="primary-color m-0">STEP 09/09</h4> :<h4 className="primary-color m-0">STEP 08/08</h4> } */}
                                        <h4 className="primary-color m-0">STEP 08/08</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="page-forms ">
                                    <div className="select-check mb-1">
                                        <div className="text-right">
                                            {/* <FormGroup className='text-right'> */}
                                            <div className="form-check network-connect">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="selectAll"
                                                    checked={checked.length === countries.length}
                                                    onChange={handleCheckAllChange}
                                                /> Select all
                                               
                                            </div>
                                            {/* <FormControlLabel className='' control={<Checkbox defaultChecked   checked={isCheckAll}  onClick={handleSelectAll}/>}     label="Select all" /> */}
                                            {/* </FormGroup>  */}



                                        </div>
                                    </div>

                                    {countries.map((c: any) => (
                                        <div key={c.id}>

                                            <div className="userbox">
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <img src={`${assetUrl}/person1.jpg`} alt="" />
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
                                    ))}
                                    {/* {Catalogues.length > 0 ? Catalogues.map((Catalogues, i) =>
                                    <div className="userbox">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <img src={`${assetUrl}/person1.jpg`} alt="" />
                                                <h4>{Catalogues.name}</h4>
                                                <p className="primary-color m-0">{Catalogues.designation}</p>
                                                <p className="m-0">{Catalogues.institute}</p>
                                            </div>
                                            <div className="checbox-right">
                                                <Checkbox {...label} 
                                                // checked={isCheck?.includes(id)}
                                                 onClick={handleClick}/>
                                            </div>
                                        </div>
                                    
                                        <div className="text-right">
                                            <p className="primary-color font-w600 m-0">CONNECT</p>
                                        </div>
                                    </div> 
                                    ): <div>   </div>} */}

                                    {/* <div className="userbox">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <img src={`${assetUrl}/person1.jpg`} alt="" />
                                                <h4>Lavanya </h4>
                                                <p className="primary-color m-0">English Professor</p>
                                                <p className="m-0">JNTU Kakinada</p>
                                            </div>
                                            <div className="checbox-right">
                                                <Checkbox {...label} />
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-w600 m-0">CONNECT</p>
                                        </div>
                                    </div>


                                    <div className="userbox">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <img src={`${assetUrl}/person1.jpg`} alt="" />
                                                <h4>Kishore babu Yarlapati</h4>
                                                <p className="primary-color m-0">UX Designer</p>
                                                <p className="m-0">At Microsoft</p>
                                            </div>
                                            <div className="checbox-right">
                                                <Checkbox {...label} defaultChecked />
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="primary-color font-w600 m-0">CONNECT</p>
                                        </div>
                                    </div> */}


                                    <div className="add-btn mb-2">
                                        <button type="button" className="btn add-more-btn w-100">
                                            Sync with GMAIL Contacts
                                        </button>
                                    </div>
                                    {/* <div className="button-center text-center mt-4">


                                        <Button variant="outlined" className="btn prev-btn mr-2">Previous</Button>
                                        <Button variant="contained" className="btn clear-btn mr-2">Clear</Button>
                                        <Button variant="contained" className="btn save-btn"><Link to="/completed">Completed</Link></Button>
                                    </div> */}

                                    <div className="button-center text-center mt-4">
                                        <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn' />
                                        <AppButton children="Clear" styleClass='btn clear-btn mr-2 ml-2' />
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