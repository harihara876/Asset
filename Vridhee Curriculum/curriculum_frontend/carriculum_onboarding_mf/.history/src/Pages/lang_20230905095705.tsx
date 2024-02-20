import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React from "react";
const drawerWidth = 300;

export default function Lang() {

    return (
        <div>
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
                    anchor="left"  >
                    <div className="sidebar-sec">
                        <div className="sidebar-logo">
                            <img src="http://localhost:3000/static/media/white-logo.0ca83c914863b54d6af7ef55177cd613.svg" alt="" />
                        </div>
                        <div className="sidebar-menu">
                            <ul>
                                <li><a className="" href="./personal-information"><img src="http://localhost:3000/assets/img/onboarding/Personal_info_Icon.png" alt="" />Personal Information</a></li>
                                <li><a className="" href="./learning-interest"><img src="http://localhost:3000/assets/img/onboarding/Learning_int_icon.png" alt="" />Learning Interest</a></li>
                                <li><a className="" href="./hobbies-passion"><img src="http://localhost:3000/assets/img/onboarding/Hobbies_and_passion_Icon.png" alt="" />Hobbies &amp; Passion</a></li>
                                <li><a className="" href="./skills-interests"><img src="http://localhost:3000/assets/img/onboarding/Skills_and_Int_Icon.png" alt="" />Skills &amp; Interests</a></li>
                                <li><a className="" href="./educational-details"><img src="http://localhost:3000/assets/img/onboarding/Education_detail_Icon.png" alt="" />Educational details</a></li>
                                <li><a className="" href="./professional-details"><img src="http://localhost:3000/assets/img/onboarding/Professional_details_Icon.png" alt="" />Professional details</a></li>
                                <li><a className="" href="./awards-certificates"><img src="http://localhost:3000/assets/img/onboarding/Awards_and_certificate_Icon.png" alt="" />Awards &amp; Certificates</a></li>
                                <li><a className="" href="./network"><img src="http://localhost:3000/assets/img/onboarding/Network_Icon.png" alt="" />Network</a></li>
                            </ul>
                        </div>
                    </div>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}  >

                    <div className="page-wrapper">
                        <div className="breadcrumbs-sec">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="#174392" to="/">
                                    Splash
                                </Link>

                                <Typography color="#62676C">Language & Location</Typography>
                            </Breadcrumbs>
                        </div>
                        <form >
                        <div className="select-language mt-4">
                            
                        </div>
                        </form>

                    </div>

                </Box>
            </Box>
        </div>
    );
}