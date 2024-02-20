import React, { useEffect } from "react";
import configJson from "vridhee_common_component_mf/configJson";
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import FooterCopyright from 'vridhee_common_component_mf/FooterCopyright';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import AppButton from 'vridhee_common_component_mf/AppButton';
import Link from "@mui/material/Link/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import DashboardService from "../Services/dashboardservices";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Ilearning {
    vcoins: number,
    curr_cat_name: string,
    subjects: {
        name: string
    }[]
}

interface Ieducationdetails {
    vcoins: number,
    data: {
        institute_name: string,
        start_date: string,
        end_date: string,
        achievements: string,
        desc: string,
        curr_cat_name: string,
        study_field: string
    }[]
}

interface Iproffedetails {
    vcoins: number,
    data: {
        achievements: string,
        Descr: string,
        company_name: string,
        designation: string,
        area_expert: string
    }[]
}

interface Iaward {
    vcoins: number,
    data: {
        cert_img: string,
        cert_name: string
    }[]
}

interface Iskillinterest {
    skill: {
        data: {
            name: string
        }[]
    },
    interest: {
        data: {
            name: string
        }[]
    }
}

interface Ihobbiespassion {
    hobbies: {
        data: {
            name: string
        }[]
    },
    passion: {
        data: {
            name: string
        }[]
    }
}

interface Ipersonalinfo {
    gender: string,
    dob: string,
    desc: string,
    image: string,
    pref_language: string,
    pref_languageName: string
}

interface Iuserdetails {
    email: string,
    disp_name: string,
    vdisp_name: string
}

interface Iprofile {
    personal_info: Ipersonalinfo,
    userdetails: Iuserdetails,
    learning: Ilearning,
    education_details: Ieducationdetails,
    profession_details: Iproffedetails,
    awards_certificates: Iaward,
    skill_interest: Iskillinterest,
    hobbies_passion: Ihobbiespassion
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function Profile() {
    const assetUrl = configJson.local.assetUrl;
    const [value, setValue] = React.useState(0);
    const [showAllSubjects, setShowAllSubjects] = React.useState(false);
    const [showAllSkills, setShowAllSkills] = React.useState(false);
    const [showAllHobbies, setShowAllHobbies] = React.useState(false);

    const toggleSubjects = () => {
        setShowAllSubjects(!showAllSubjects);
    };

    const toggleSkills = () => {
        setShowAllSkills(!showAllSkills);
    };

    const toggleHobbies = () => {
        setShowAllHobbies(!showAllHobbies);
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const [userProfile, setUserProfile] = React.useState<Iprofile>()
    useEffect(() => {
        DashboardService.getProfileData(localStorage.getItem("profileId"))
        .then(res => {
            console.log("getProfileData>>", res.data.data);
            setUserProfile(res.data.data);
        })
        .catch(e => {
            console.log("get Profile error", e);
        })
    }, []);
    
    const displayedSubjects = showAllSubjects ? userProfile?.learning?.subjects : userProfile?.learning?.subjects?.slice(0, 2);
    
    console.log("userProfile", userProfile);
    return (
        <div>
            <div className="profile-header">
                <HeaderCurriculum />
            </div>
            <div className="subject-details">
                <div className="breadcrumbs-sec">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="#174392" to="/dashboard">
                            Dashboard
                        </Link>

                        <Typography color="#62676C">Profile</Typography>
                    </Breadcrumbs>
                </div>
            </div>

            <div className="profile-section pb-2">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={9} md={9}>
                        <div className="user-details-section">
                            <div className="user-edit"><i className="fa fa-pencil" aria-hidden="true"></i></div>
                            <div className="user-profile-img">
                                <img src={`${userProfile?.personal_info?.image}`} alt="" />
                            </div>
                        </div>
                        <div className="user-profile-section">
                            <div className="user-profile-name">
                                <div className="user-profile-title">
                                    <span className="float-left">
                                        <h4>{userProfile?.userdetails?.disp_name}</h4>
                                        <p>{userProfile?.personal_info?.desc}</p>
                                    </span>
                                    <span className="float-right">
                                        <div>
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </div>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <ul>
                                    <li><img src={`${assetUrl}/location_on-icon.svg`} alt="" />Hyderabad, Telangana, India</li>
                                    <li><img src={`${assetUrl}/groups-icons.svg`} alt="" />500+ Connections</li>
                                    <li className="primary-color"><img src={`${assetUrl}/language-icon.svg`} alt="" />www.vridhee.com</li>
                                </ul>
                            </div>
                            <div className="clearfix"></div>
                            <div className="profile-details">
                                <span className="float-left">
                                    <span className="group-img mr-2">
                                        <ul className="buddies-img">
                                            <li><img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&amp;dl=pexels-andrea-piacquadio-3763188.jpg&amp;fm=jpg" alt="" /></li>
                                            <li><img src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&amp;w=1964&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></li>
                                            <li><img src="https://img.freepik.com/free-photo/portrait-beautiful-woman-with-glasses_23-2148418596.jpg?size=626&amp;ext=jpg&amp;ga=GA1.1.1413502914.1696982400&amp;semt=ais" alt="" /></li>
                                        </ul>
                                    </span>
                                    <span><p >Bashireddy Saikumareddy, mahendra and 1 other mutual connection</p></span>
                                </span>
                                <span className="float-right pr-3">
                                    <AppButton children="+ Connect" styleClass='btn save-btn primary-bg w120 mr-2 text-white' />
                                    <AppButton children="Message" styleClass='btn message-btn  mr-2 w120 ' />
                                    <AppButton children="More" styleClass='btn more-btn w120' />
                                </span>
                                <div className="clearfix"></div>
                            </div>
                        </div>

                        <div className="analytics-profile-section">
                            <div className="analytics-profile-section-title">
                                <span className="float-left"><span className="mr-3 border-right pr-3"><h4 className="m-0">Analytics & tools</h4></span><span className="mr-3 "><span className="primary-color">Post impressions past 7 days</span> &nbsp;<span style={{ 'color': '#1C8C01' }}><i className="fa fa-caret-up" aria-hidden="true"></i>&nbsp;50%</span></span></span>
                                <span className="float-right">
                                    <img src={`${assetUrl}/arrow_right-icon.svg`} alt="" />
                                </span>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <section>
                            <div className="profile-about-content mt-3">
                                <div className="profile-about-content-title" >
                                    <span className="float-left">
                                        <h4>About</h4>
                                    </span>
                                    <span className="float-right primary-color">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                    </span>
                                    <div className="clearfix"></div>
                                </div>

                                <article>
                                    <p>{userProfile?.personal_info?.desc}</p>
                                </article>


                            </div>
                        </section>
                        <section>
                            <Grid container spacing={2}>
                            {userProfile?.learning ?
                                <Grid item xs={12} sm={12} md={12}>
                                    <div className="tabs-con">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>Learning Interests</h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        {/* <div className="tabs-contact-item">
                                            <div className="tabs-contact-item-img">
                                                <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con">
                                                <span className="float-left">
                                                    <h4>Maths</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small style={{ 'color': '#1524D9' }}>Academic</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div> */}
                                        {displayedSubjects?.map((subject, index) => {
                                            return (
                                                <div className="tabs-contact-item">
                                                    <div className="tabs-contact-item-img">
                                                        <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con">
                                                        <span className="float-left">
                                                            <h4>{subject?.name}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            <small style={{ 'color': '#1524D9' }}></small>
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        <p className="m-0"></p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        })}
                                        <div className="button-fullwidth mt-2">
                                            <AppButton onClick={toggleSubjects} children={showAllSubjects ? 'Show Less' : 'Show More'} styleClass='btn see-more w-100' />
                                        </div>

                                    </div>
                                </Grid>
                                    : <Grid item xs={12} sm={12} md={12}>
                                    <div className="tabs-con">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>Teaching Interests</h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="tabs-contact-item">
                                            <div className="tabs-contact-item-img">
                                                <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con">
                                                <span className="float-left">
                                                    <h4>Maths</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small style={{ 'color': '#1524D9' }}>Academic</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="tabs-contact-item">
                                            <div className="tabs-contact-item-img">
                                                <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con">
                                                <span className="float-left">
                                                    <h4>Maths</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small style={{ 'color': '#1524D9' }}>Academic</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="tabs-contact-item">
                                            <div className="tabs-contact-item-img">
                                                <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con">
                                                <span className="float-left">
                                                    <h4>Maths</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small style={{ 'color': '#1524D9' }}>Academic</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>

                                        <div className="button-fullwidth mt-2">
                                            <AppButton children="See More" styleClass='btn see-more w-100' />
                                        </div>

                                    </div>
                                </Grid>
                                }
                                
                                <Grid item xs={12} sm={12} md={12}>
                                    <div className="tabs-con experience-card">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>Activity <small>(Last 5 activities)</small></h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="tabs-contact-item ">
                                            <div className="tabs-contact-item-img activity-card-img">
                                                <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con ">
                                                <span className="float-left">
                                                    <h4>Maths</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small style={{ 'color': '#1524D9' }}>Academic</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="tabs-contact-item">
                                            <div className="tabs-contact-item-img activity-card-img">
                                                <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con">
                                                <span className="float-left">
                                                    <h4>Maths</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small style={{ 'color': '#1524D9' }}>Academic</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="tabs-contact-item activity-card-img">
                                            <div className="tabs-contact-item-img">
                                                <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con">
                                                <span className="float-left">
                                                    <h4>Maths</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small style={{ 'color': '#1524D9' }}>Academic</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>

                                        <div className="button-fullwidth mt-2">
                                            <AppButton children="See More" styleClass='btn see-more w-100' />
                                        </div>

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <div className="tabs-con experience-card">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>Experience</h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        {/* <div className="tabs-contact-item ">
                                            <div className="tabs-contact-item-img activity-card-img">
                                                <img className="border-no" src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con ">
                                                <span className="float-left">
                                                    <h4>Maths</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small style={{ 'color': '#1524D9' }}>Academic</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div> */}

                                        {userProfile?.profession_details?.data?.map((proffesional) => {
                                            return (
                                                <div className="tabs-contact-item ">
                                                    <div className="tabs-contact-item-img activity-card-img">
                                                        <img className="border-no" src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con ">
                                                        <span className="float-left">
                                                            <h4>{proffesional?.designation}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            <small style={{ 'color': '#1524D9' }}>{proffesional?.company_name}</small>
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        <p className="m-0">{proffesional?.Descr}</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        })}

                                        <div className="button-fullwidth mt-2">
                                            <AppButton children="See More" styleClass='btn see-more w-100' />
                                        </div>

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <div className="tabs-con experience-card">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>Education</h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        {/* <div className="tabs-contact-item ">
                                            <div className="tabs-contact-item-img activity-card-img">
                                                <img className="border-no" src={`${assetUrl}/curriculim/image 1.png`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con ">
                                                <span className="float-left">
                                                    <h4>Mahatma Jyotiba Phule Rohilkhand University</h4>
                                                    <p className="m-0">B.Tech, Computer Science & Information Technology</p>
                                                    <div className="gruated-box"><i className="fa fa-graduation-cap" aria-hidden="true"></i>&nbsp;Graduated</div>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small>Full Time</small>
                                                    <p className="m-0">1985 - 1997</p>
                                                </span>
                                                <div className="clearfix"></div>

                                            </div>
                                            <div className="clearfix"></div>
                                        </div> */}

                                        {userProfile?.education_details?.data.map((institute) => {
                                            return (
                                                <div className="tabs-contact-item ">
                                                    <div className="tabs-contact-item-img activity-card-img">
                                                        <img className="border-no" src={`${assetUrl}/curriculim/image 1.png`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con ">
                                                        <span className="float-left">
                                                            <h4>{institute?.institute_name}</h4>
                                                            <p className="m-0">{institute?.curr_cat_name}</p>
                                                            {/* <div className="gruated-box"><i className="fa fa-graduation-cap" aria-hidden="true"></i>&nbsp;{institute?.study_field}</div> */}
                                                        </span>
                                                        <span className="float-right text-right">
                                                            <small>Full Time</small>
                                                            <p className="m-0">{new Date(institute?.start_date).getFullYear()} - {new Date(institute?.end_date).getFullYear()}</p>
                                                        </span>
                                                        <div className="clearfix"></div>

                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        })}

                                        <div className="button-fullwidth mt-2">
                                            <AppButton children="See More" styleClass='btn see-more w-100' />
                                        </div>

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <div className="tabs-con">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>Skills & Interests</h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        {/* <div className="tabs-contact-item">
                                            <div className="tabs-contact-item-img">
                                                <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con">
                                                <span className="float-left">
                                                    <h4>Maths</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small style={{ 'color': '#1524D9' }}>Academic</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div> */}

                                        {showAllSkills ? userProfile?.skill_interest?.skill?.data?.map((ski) => { 
                                            return (
                                                <div className="tabs-contact-item">
                                                    <div className="tabs-contact-item-img">
                                                        <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con">
                                                        <span className="float-left">
                                                            <h4>{ski?.name}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            {/* <small style={{ 'color': '#1524D9' }}>Academic</small> */}
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        {/* <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p> */}
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        }) : userProfile?.skill_interest?.skill?.data?.slice(0, 2).map((ski) => { 
                                            return (
                                                <div className="tabs-contact-item">
                                                    <div className="tabs-contact-item-img">
                                                        <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con">
                                                        <span className="float-left">
                                                            <h4>{ski?.name}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            {/* <small style={{ 'color': '#1524D9' }}>Academic</small> */}
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        {/* <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p> */}
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        })}
                                        {showAllSkills ? userProfile?.skill_interest?.interest?.data?.map((int) => {
                                            return (
                                                <div className="tabs-contact-item">
                                                    <div className="tabs-contact-item-img">
                                                        <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con">
                                                        <span className="float-left">
                                                            <h4>{int?.name}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            {/* <small style={{ 'color': '#1524D9' }}>Academic</small> */}
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        {/* <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p> */}
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        }) : userProfile?.skill_interest?.interest?.data?.slice(0, 1).map((int) => {
                                            return (
                                                <div className="tabs-contact-item">
                                                    <div className="tabs-contact-item-img">
                                                        <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con">
                                                        <span className="float-left">
                                                            <h4>{int?.name}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            {/* <small style={{ 'color': '#1524D9' }}>Academic</small> */}
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        {/* <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p> */}
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        })}

                                        <div className="button-fullwidth mt-2">
                                            <AppButton onClick={toggleSkills} children={showAllSkills ? 'Show Less' : 'Show More'} styleClass='btn see-more w-100' />
                                        </div>

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <div className="tabs-con">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>Hobbies & Passion</h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        {/* <div className="tabs-contact-item">
                                            <div className="tabs-contact-item-img">
                                                <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con">
                                                <span className="float-left">
                                                    <h4>Maths</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small style={{ 'color': '#1524D9' }}>Academic</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div> */}

                                        {showAllHobbies ? userProfile?.hobbies_passion?.hobbies?.data?.map((hobby) => {
                                            return (
                                                <div className="tabs-contact-item">
                                                    <div className="tabs-contact-item-img">
                                                        <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con">
                                                        <span className="float-left">
                                                            <h4>{hobby?.name}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            {/* <small style={{ 'color': '#1524D9' }}>Academic</small> */}
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        {/* <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p> */}
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        }): userProfile?.hobbies_passion?.hobbies?.data?.slice(0, 2).map((hobby) => {
                                            return (
                                                <div className="tabs-contact-item">
                                                    <div className="tabs-contact-item-img">
                                                        <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con">
                                                        <span className="float-left">
                                                            <h4>{hobby?.name}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            {/* <small style={{ 'color': '#1524D9' }}>Academic</small> */}
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        {/* <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p> */}
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        })}

                                        {showAllHobbies ? userProfile?.hobbies_passion?.passion?.data?.map((pass) => {
                                            return (
                                                <div className="tabs-contact-item">
                                                    <div className="tabs-contact-item-img">
                                                        <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con">
                                                        <span className="float-left">
                                                            <h4>{pass?.name}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            {/* <small style={{ 'color': '#1524D9' }}>Academic</small> */}
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        {/* <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p> */}
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        }) : userProfile?.hobbies_passion?.passion?.data?.slice(0, 1).map((pass) => {
                                            return (
                                                <div className="tabs-contact-item">
                                                    <div className="tabs-contact-item-img">
                                                        <img src={`${assetUrl}/curriculim/Biology.png`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con">
                                                        <span className="float-left">
                                                            <h4>{pass?.name}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            {/* <small style={{ 'color': '#1524D9' }}>Academic</small> */}
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        {/* <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p> */}
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        })}

                                        <div className="button-fullwidth mt-2">
                                            <AppButton onClick={toggleHobbies} children={showAllHobbies ? 'Show Less' : 'Show More'} styleClass='btn see-more w-100' />
                                        </div>

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <div className="tabs-con">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>Awards & Certificates</h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        {/* <div className="tabs-contact-item">
                                            <div className="tabs-contact-item-img">
                                                <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                            </div>
                                            <div className="tabs-contact-item-con">
                                                <span className="float-left">
                                                    <h4>Award Name</h4>
                                                </span>
                                                <span className="float-right text-right">
                                                    <small >Badge</small>
                                                </span>
                                                <div className="clearfix"></div>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div> */}

                                        {userProfile?.awards_certificates?.data?.map((doc) => {
                                            return (
                                                <div className="tabs-contact-item">
                                                    <div className="tabs-contact-item-img">
                                                        <img src={`${assetUrl}${doc?.cert_img}`} alt="" />
                                                    </div>
                                                    <div className="tabs-contact-item-con">
                                                        <span className="float-left">
                                                            <h4>{doc?.cert_name}</h4>
                                                        </span>
                                                        <span className="float-right text-right">
                                                            {/* <small >Badge</small> */}
                                                        </span>
                                                        <div className="clearfix"></div>
                                                        {/* <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p> */}
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            )
                                        })}

                                        <div className="button-fullwidth mt-2">
                                            <AppButton children="See More" styleClass='btn see-more w-100' />
                                        </div>

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <div className="profile-curriculum">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>My Curriculum</h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <Grid container spacing={2}>
                                            {/* <Grid item xs={12} sm={6} md={4}>
                                                <div className="profile-curriculum-box">
                                                    <div className="profile-curriculum-img">
                                                        <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                    </div>
                                                    <div className="profile-curriculum-con">
                                                        <h4>IIT Maths Hyderabad </h4>
                                                        <small>By Dipyaman Baral</small>
                                                        <p className="m-0 text-right">
                                                            <span className="primary-color mr-3">View</span>
                                                            <span className="color-red">Remove</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Grid> */}

                                            {userProfile?.learning?.subjects?.map((subject) => {
                                                return (
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <div className="profile-curriculum-box">
                                                            <div className="profile-curriculum-img">
                                                                <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                            </div>
                                                            <div className="profile-curriculum-con">
                                                                <h4>{subject?.name} </h4>
                                                                {/* <small>By Dipyaman Baral</small> */}
                                                                <p className="m-0 text-right">
                                                                    <span className="primary-color mr-3">View</span>
                                                                    <span className="color-red">Remove</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                )
                                            })}

                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <div className="profile-curriculum">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>My Campus</h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div className="profile-curriculum-box">
                                                    <div className="profile-curriculum-img">
                                                        <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                    </div>
                                                    <div className="profile-curriculum-con">
                                                        <h4>Dipyaman IIT Foundation </h4>
                                                        <small>By Dipyaman Baral</small>
                                                        <p className="m-0 text-right">
                                                            <span className="primary-color mr-3">View</span>
                                                            <span className="color-red">Remove</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Grid>


                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <div className="tabs-con">
                                        <div className="tabs-title">
                                            <span className="float-left">
                                                <h4>Languages</h4>
                                            </span>
                                            <span className="float-right primary-color">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="tabs-contact-item">
                                            <div className="tabs-contact-item-con border-bottom mr-1 pb-1">
                                                <small >Expert</small>
                                                <h4>English</h4>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="tabs-contact-item">
                                            <div className="tabs-contact-item-con border-bottom mr-1 pb-1">
                                                <small >Expert</small>
                                                <h4>French</h4>
                                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>


                                    </div>
                                </Grid>



                            </Grid>
                        </section>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <div className="your-friend text-center">
                            <h4 className="mb-2">Is Anurag your colleague</h4>
                            <AppButton children="+ Join" styleClass='btn save-btn primary-bg w120 mr-2 text-white' />
                        </div>
                        <div className="people-viewed-profile">
                            <h3 className="mb-2">People who viewed your profile</h3>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <span className="float-left">
                                        <h4>Anurag</h4>
                                        <p className="m-0">Design Engineer</p>
                                    </span>
                                    <span className="float-right">
                                        <p className="m-0 primary-color">2hrs ago</p>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <span className="float-left">
                                        <h4>Akhilesh</h4>
                                        <p className="m-0">Developer</p>
                                    </span>
                                    <span className="float-right">
                                        <p className="m-0 primary-color">2hrs ago</p>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <span className="float-left">
                                        <h4>Anurag</h4>
                                        <p className="m-0">Design Engineer</p>
                                    </span>
                                    <span className="float-right">
                                        <p className="m-0 primary-color">2hrs ago</p>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>

                        <div className="people-viewed-profile">
                            <h3 className="mb-2">People you may know</h3>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <span className="float-left">
                                        <h4>Ravi Kumar</h4>
                                        <p className="m-0 primary-color">Product Manager</p>
                                    </span>
                                    <span className="float-right">
                                        <p className="m-0 primary-color">Mentor</p>
                                    </span>
                                    <div className="clearfix"></div>
                                    <div className="text-right">
                                        <AppButton children="Connect" styleClass='btn connect-btn' />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <span className="float-left">
                                        <h4>Kiran</h4>
                                        <p className="m-0 primary-color">Product Manager</p>
                                    </span>
                                    <span className="float-right">
                                        <p className="m-0" style={{ 'color': '#D80435' }}>Guru</p>
                                    </span>
                                    <div className="clearfix"></div>
                                    <div className="text-right">
                                        <AppButton children="Connect" styleClass='btn connect-btn' />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <span className="float-left">
                                        <h4>Nanda Kishore</h4>
                                        <p className="m-0 primary-color">Musician</p>
                                    </span>
                                    <span className="float-right">
                                        <p className="m-0" style={{ 'color': '#98400A' }}>Expert</p>
                                    </span>
                                    <div className="clearfix"></div>
                                    <div className="text-right">
                                        <AppButton children="Connect" styleClass='btn connect-btn' />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="button-fullwidth mt-2">
                                <AppButton children="See More" styleClass='btn see-more w-100' />
                            </div>
                        </div>

                        <div className="people-viewed-profile">
                            <h3 className="mb-2">Campus you may be Interested</h3>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <h4 className="primary-color mb-1">Dipyaman IIT Foundation</h4>
                                    <span className="float-left">
                                        <small>Recommended Campus</small>
                                    </span>
                                    <span className="float-right">
                                        <AppButton children="Enroll" styleClass='btn connect-btn' />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <h4 className="primary-color mb-1">Akhilesh IIT Academy</h4>
                                    <span className="float-left">
                                        <small>Recommended Campus</small>
                                    </span>
                                    <span className="float-right">
                                        <AppButton children="Enroll" styleClass='btn connect-btn' />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <h4 className="primary-color mb-1">Krishnamurthy Musical Academy</h4>
                                    <span className="float-left">
                                        <small>Recommended Campus</small>
                                    </span>
                                    <span className="float-right">
                                        <AppButton children="Enroll" styleClass='btn connect-btn' />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>


                        </div>

                        <div className="people-viewed-profile">
                            <h3 className="mb-2">Mentor you may like</h3>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <span className="float-left">
                                        <h4>Ravi Kumar</h4>
                                        <p className="m-0 primary-color">Product Manager</p>
                                    </span>
                                    <span className="float-right">
                                        <p className="m-0 primary-color">Mentor</p>
                                    </span>
                                    <div className="clearfix"></div>
                                    <div className="text-right">
                                        <AppButton children="Connect" styleClass='btn connect-btn' />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <span className="float-left">
                                        <h4>Ravi Kumar</h4>
                                        <p className="m-0 primary-color">Product Manager</p>
                                    </span>
                                    <span className="float-right">
                                        <p className="m-0 primary-color">Mentor</p>
                                    </span>
                                    <div className="clearfix"></div>
                                    <div className="text-right">
                                        <AppButton children="Connect" styleClass='btn connect-btn' />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <span className="float-left">
                                        <h4>Ravi Kumar</h4>
                                        <p className="m-0 primary-color">Product Manager</p>
                                    </span>
                                    <span className="float-right">
                                        <p className="m-0 primary-color">Mentor</p>
                                    </span>
                                    <div className="clearfix"></div>
                                    <div className="text-right">
                                        <AppButton children="Connect" styleClass='btn connect-btn' />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>

                            <div className="button-fullwidth mt-2">
                                <AppButton children="See More" styleClass='btn see-more w-100' />
                            </div>
                        </div>
                        <div className="people-viewed-profile">
                            <h3 className="mb-2">Community you may like</h3>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <h4 className="primary-color mb-1">IIT Maths Hyderabad</h4>
                                    <span className="float-left">
                                        <small>Recommended Community</small>
                                    </span>
                                    <span className="float-right">
                                        <AppButton children="Enroll" styleClass='btn connect-btn' />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <h4 className="primary-color mb-1">Maths Olympiad Srinagar colony</h4>
                                    <span className="float-left">
                                        <small>Recommended Community</small>
                                    </span>
                                    <span className="float-right">
                                        <AppButton children="Enroll" styleClass='btn connect-btn' />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <h4 className="primary-color mb-1">IIT Chemistry Hyderabad</h4>
                                    <span className="float-left">
                                        <small>Recommended Community</small>
                                    </span>
                                    <span className="float-right">
                                        <AppButton children="Enroll" styleClass='btn connect-btn' />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>


                        </div>

                        <div className="people-viewed-profile profile-activities">
                            <h3 className="mb-2">Activities you may like</h3>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <h4 className="primary-color mb-1">Group Discussion</h4>
                                    <span className="w-70">
                                        <small>Recommended Academic Activity</small>
                                    </span>
                                    <span className="w-30">
                                        <AppButton children="Enroll" styleClass='btn connect-btn' />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <h4 className="primary-color mb-1">Boating at Ananthagiri lake</h4>
                                    <span className="w-70">
                                        <small>Recommended Academic Activity</small>
                                    </span>
                                    <span className="w-30">
                                        <AppButton children="Enroll" styleClass='btn connect-btn' />
                                    </span>
                                    <div className="clearfix"></div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="people-viewed-profile-item">
                                <div className="people-viewed-profile-item-img">
                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                </div>
                                <div className="people-viewed-profile-item-con">
                                    <h4 className="primary-color mb-1">Trekking Hyderabad</h4>
                                    <span className="w-70">
                                        <small>Recommended Academic Activity</small>
                                    </span>
                                    <span className="w-30">
                                        <AppButton children="Enroll" styleClass='btn connect-btn' />
                                    </span>
                                    <div className="clearfix"></div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>


                        </div>
                    </Grid>
                </Grid>

            </div>
        </div>
    );
}