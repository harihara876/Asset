import React, { useEffect, useState } from "react";
import Header from 'vridhee_common_component_mf/Header';
import AppInput from 'vridhee_common_component_mf/AppInput';
import AppButton from 'vridhee_common_component_mf/AppButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginService } from "../Services/loginService";
import jwt_decode from "jwt-decode";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../Pages/footer";

import configJson from "vridhee_common_component_mf/configJson";
import LearnN from "./Login/learner";
import CurriculumNew from "./Login/curriculum";
import Activity from "./Login/activity";
import AdvocacyFull from "./Login/advocacy-single";
import CampusLogin from "./Login/campus";
import PopularMenturs from "./Login/popular-mentors";
import InstituteService from "./Login/institute-service";
import TeacherN from "./Login/teacher";
import ParentsN from "./Login/parents";
import InstituteN from "./Login/institute";
import ProgramBuddy from "./Login/program-buddy";
import TextContent from "./Login/text-content";
import OurSolutions from "./Login/ourSolutions";
import Splash from './Login/splash'

export default function Login() {

    const assetUrl = configJson.local.assetUrl
    const [showSplash, setShowSplash] = useState(true);
    const [value, setValue] = useState('1');
    const [type, setType] = useState('password');
    const location = useLocation();
    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [isLoading, setIsLoading] = useState(false);
    const Route_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.routeUrl : configJson.server.routeUrl
    const Dashboard_Route_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl
    const Campus_Route_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.campusMFUrl : configJson.server.campusMFUrl
    const [loginCount, setLoginCount] = useState([]);
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        password: ''
    });

    const [errors, setError] = useState({
        name: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
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

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    function onClick() {
        setIsLoading(true)
        LoginService.Login(values)
            .then(res => {
                setIsLoading(false)
                if (res.data.status == "Success") {
                    console.log(res.data.data,"loginResult")
                    localStorage.setItem('sid', res.data.data.sid)
                      localStorage.setItem('Tokenuserid', res.data.data.user_id)
                    setValues({
                        ...values, name: '',
                        password: ''
                    })
                    if (res.data.data.user_id) {
                        let token: string = res.data.data.accessToken;
                        localStorage.setItem('authorizationToken', res.data.data.accessToken)
                        localStorage.setItem('Tokenuserid', res.data.data.user_id)
                        if (location.state.type == "Campus") {
                            const body = {
                                "user_id":res.data.data.user_id
                                // "user_id": "64dc3df486f01722a6f3c913"
                            }
                            LoginService.getCampusUserRelation(body)
                                .then(ress => {
                                    window.location.replace(`${Campus_Route_URL}` + "?" + token)
                                })
                                .catch(e => {
                                    toast.error(e.response.data.message);
                                });
                        } else {
                            LoginService.userVerify(res.data.data.user_id)
                                .then(result => {
                                    if (result.data.status == 200 && result.data.msg == 'Onboarding_Completed') {
                                        // window.location.replace(`${Dashboard_Route_URL}dashboard` + "?" + res.data.data.accessToken + "?" + location.state.type)
                                        window.location.replace(`${Dashboard_Route_URL}dashboard` + "?" + location.state.type  + "?" + res.data.data.sid+ "?"  + res.data.data.user_id )
                                    } else {
                                        window.location.replace(`${Route_URL}` + "?" + location.state.type  + "?" + res.data.data.sid + "?"  + res.data.data.user_id )
                                        // window.location.replace(`${Route_URL}` + "?" + res.data.data.accessToken + "?" + location.state.type)
                                    }
                                })
                                .catch(error => {
                                    toast.error(error.message);
                                });
                        }

                    }
                    
                } else {
                    toast.error(res.data.msg);
                }
            })
            .catch(e => {
                toast.error(e.response.data.message);
            });
    }


    useEffect(() => {
        if (location.state && location.state.id) {
            LoginService.getDashboardSummaryData(location.state.id, 1)
                .then(res => {
                    if (res.data.data) {
                        setLoginCount(res.data.data[0]?.login_cnt)
                    }
                })
            // .catch(e =>
            // );
            // empty dependency array means this effect will only run once (like componentDidMount in classes)
        }
    }, [])

    function authentication() {
        let act_typ = [
            {
                "typ_id": localStorage.getItem('id'),
                "sub_typ_id": "82d156c6-26e1-11ee-a743-c018502fc554",
                "is_actv": 1
            }
        ]
        if (location.state) {
            LoginService.googleAuthentication(JSON.stringify(act_typ), location.state.type)
                .then(res => {
                    window.location.replace(res.data);
                })
                .catch(e => {
                    toast.error(e.message);
                });
        }

    }
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 2
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const responsive1 = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div>
            {showSplash && location.state && location.state.type == 'Campus' ? (
                <Splash onSplashComplete={handleSplashComplete} />
            ) : (
                <div>

                    <div className="login-page">
                        <Header />
                        <div className="login-section" >
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <div className='login-box'>
                                            <div className="text-center">
                                                <h4 className="font-w500">Welcome to Vridhee</h4>
                                                <div className="login-title"><small className="font-w500">Sign up With</small></div>
                                                <div className="social-icons">
                                                    <ul>
                                                        <li><Link to="">
                                                            <img src={`${assetUrl}/google.webp`} onClick={authentication} alt="Google login" /></Link>
                                                        </li>
                                                        <li><Link to=""><img src={`${assetUrl}/facebook.png`} alt="Facebook login" /></Link></li>
                                                        <li><Link to=""><img src={`${assetUrl}/linkedin.png`} alt="Linkdin login" /></Link></li>
                                                        <li><Link to=""><img src={`${assetUrl}/apple.png`} alt="apple login" /></Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p className="text-center mb-2">Or</p>
                                            <form id="loginData">

                                                <div className="form-group mb-2">
                                                    <AppInput
                                                        type="text"  autoComplete='off' 
                                                        name="name" id="name" onChange={handleChange} value={values.name}
                                                        className="border-r"
                                                        placeholder="Enter your Username / Email / Phone number" />
                                                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                                                </div>

                                                <div className="form-group">
                                                    <AppInput  autoComplete='off'
                                                        type={type} onChange={handleChange}
                                                        name="password" id="password"
                                                        value={values.password}
                                                        className="border-r"
                                                        placeholder="Enter your password here" />
                                                    <span className="flex justify-around items-center visibility-icon" onClick={handleToggle}>
                                                        <Icon className="absolute mr-10" icon={icon} size={20} />
                                                    </span>
                                                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                                                </div>

                                                <div className="form-group">
                                                    <AppButton type="submit"
                                                        onClick={onClick}
                                                        children="Login" disabled={!values.name && !values.password}
                                                        styleClass="btn save-btn border-r primary-bg w-100" />
                                                </div>



                                                <div className="text-center mt-2">
                                                    <span className="forgot-password">
                                                        <Link to="/forgotpassword" className="font-w500">Forgot Password ?</Link>
                                                    </span>
                                                </div>

                                            </form>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        {location.state && location.state.type == 'Learner' && <LearnN />}
                                        {location.state && location.state.type == 'Parent' && <ParentsN />}
                                        {location.state && location.state.type == 'Teacher' && <TeacherN />}
                                        {location.state && location.state.type == 'Campus' && <InstituteN />}
                                        {location.state && location.state.type == 'Program Buddies' && <ProgramBuddy />}
                                        {!location.state && <LearnN />}
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>

                        <div className="login-contect-sec">
                            <React.Fragment>
                                <CssBaseline />
                                <Container fixed>
                                    <CurriculumNew />
                                </Container>
                                <Container fixed>
                                    <OurSolutions />
                                </Container>
                                <Container fixed>
                                    {location.state && location.state.type == 'Campus' && <TextContent />}
                                </Container>
                                <Container fixed>
                                    {(location.state && location.state.type == 'Campus' || location.state && location.state.type == 'Program Buddies') && <InstituteService />}
                                </Container>


                                <Container fixed>
                                    {location.state && location.state.type == 'Teacher' && <CampusLogin />}
                                </Container>


                                <Container fixed>
                                    {(location.state && location.state.type == 'Parent' || location.state && location.state.type == 'Teacher') && <PopularMenturs />}
                                </Container>

                                <div className="activitys-sec mt-5">
                                    <Container fixed>
                                        <Activity />


                                    </Container>

                                    <div className="curriculum-box mt-5">
                                        <Container >
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={2}>
                                                    <h4 className='primary-color font-w600'>Curriculum</h4>
                                                </Grid>
                                                <Grid item xs={12} md={8}>
                                                    <div className="tabls-con">
                                                        <TabContext value={value}>
                                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                                <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                                                    <Tab label="School" value="1" />
                                                                    <Tab label="Higher Education" value="2" />
                                                                    <Tab label="Professional" value="3" />
                                                                    <Tab label="Interest Based" value="4" />
                                                                </TabList>
                                                            </Box>

                                                        </TabContext>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <div className="text-right">
                                                        <button type="button" className="btn primary-bg text-white border-r pl-4 pr-4">View All</button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                        <div className='clearfix'></div>

                                        <div className='tabs-content'>
                                            <Container >
                                                <TabContext value={value}>
                                                    <TabPanel value="1">
                                                        <Grid container spacing={5}>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/best1.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>HTML & CSS</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>120 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/photo.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Photographer</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/photo.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Photographer</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/js.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>JavaScript</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>120 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/ds.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Desain Grafis</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/ds.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Desain Grafis</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </TabPanel>

                                                    <TabPanel value="2">
                                                        <Grid container spacing={5}>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/js.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>JavaScript</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>120 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/ds.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Desain Grafis</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/ds.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Desain Grafis</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                        <Grid container spacing={5}>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/best1.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>HTML & CSS</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>120 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/photo.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Photographer</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/photo.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Photographer</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>

                                                        </Grid>
                                                    </TabPanel>
                                                    <TabPanel value="4">
                                                        <Grid container spacing={5}>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/best1.png`} alt="HTML & CSS" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>HTML & CSS</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>120 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/photo.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Photographer</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/photo.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Photographer</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/js.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>JavaScript</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>120 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/ds.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Desain Grafis</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="course-box">
                                                                    <img src={`${assetUrl}/ds.png`} alt="" />
                                                                    <div className='tabs-con-box'>
                                                                        <span className='float-left'>
                                                                            <h4>Desain Grafis</h4>
                                                                        </span>
                                                                        <span className='float-right'>
                                                                            <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                        <ul>
                                                                            <li>100 Videos</li>
                                                                            <li>2 Teacher</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </TabPanel>
                                                </TabContext>

                                            </Container>
                                        </div>


                                    </div>
                                </div>

                                <AdvocacyFull />

                            </React.Fragment>

                        </div>
                        <Footer loginCountData={loginCount} />
                    </div>

                    <ToastContainer />

                </div>
            )}




        </div>
    );
}
