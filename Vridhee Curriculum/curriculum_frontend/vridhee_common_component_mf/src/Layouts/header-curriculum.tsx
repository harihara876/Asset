import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import commonService from "../Services/commonservices"
import configJson from "../config";
import DashboardService from "../Services/commonservices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const sign = require('jwt-encode');
import { jwtDecode } from "jwt-decode";
import { stepContentClasses } from "@mui/material";

export default function HeaderCurriculum(props: any) {
    console.log(props,"props")
    if(props.module){
        localStorage.setItem('module',props.module)
    }
    const logout_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.accountMFUrl : configJson.server.accountMFUrl
    const campus_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.campusMFUrl : configJson.server.campusMFUrl
    const dashboard_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl
    const onboarding_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.routeUrl : configJson.server.routeUrl

    const [image, setImage] = useState<string | null>('');
    const [name, setName] = useState<string | null>('');
    const [curriculumVal, setCurriculumVal] = useState(true);
    const [communityVal, setCommunityVal] = useState(false);

    const Styles: any = {

        headerTOp: {
            padding: '10px 0px',
            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
            width: '100%',
            top: 0,
            zIndex: 999,
            background: '#ffffff',
            display: 'flex',
        },
        logoIcon: {
            width: '8%',
            textAlign: 'center',
        },
        logoiconImg: {
            width: '42px',
        },
        headerSearch: {
            width: '20%',
            float: 'left',
            position: 'relative',
        },
        headersearchInput: {
            borderRadius: '50px',
            border: '1px solid #0040625D',
            width: '100%',
            height: '40px',
            paddingLeft: '20px',
            paddingRight: '20px',
            color: '#494949',
            fontWeight: 500,
            fontSize: '14px',
        },
        searchIcon: {
            position: 'absolute',
            top: '10px',
            right: '16px',
        },
        searchIcon1: {
            width: '25px',
        },
        menuSec: {
            width: '48%',
            float: 'left',
            position: 'relative',
            textAlign: 'center',
            padding: '0 10px',
        },
        menuSecUl: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
        menuSecUlLi: {
            display: 'inline-block',
            width: 'auto',
            margin: '0 20px',
            textAlign: 'center',
            borderBottom: '2px solid transparent',
            position:'relative',
        },
        menuSecUlLi1: {
            display: 'inline-block',
            width: 'auto',
            textAlign: 'center',
            margin:'0 20px',
            background: 'transparent',
            color:'white',
            borderBottom: '2px solid #004392',
        },
        // menuSecUlLiA1: {
        //     textAlign: 'center',
        //     color: 'white',
        //     fontWeight: 500,
        //     textDecoration: 'none',
        //     fontSize: '92%',
        // },
        menuSecUlLiA: {
            textAlign: 'center',
            color: '#475569',
            fontWeight: 500,
            textDecoration: 'none',
            fontSize: '92%',
        },
        menuSecImg: {
            display: 'block',
            margin: '0 auto',
            width: '20px',
        },
        profilesec: {
            width: '18%',
            cursor: 'pointer',
        },
        profileName: {
            position: 'relative',
            color: '#000000',
        },
        w50: {
            width: '50%',
            float: 'left',
        },
        w501: {
            width: '50%',
            float: 'right',
        },
        profileImg: {
            width: '40px',
            height: '40px',
            borderRadius: '50px',
            float: 'left',
            marginRight: '10px',
        },
        m0: {
            margin: 0,
        },
        greenColor: {
            margin: 0,
            color: '#1BA70299',
        },
        yourPoints: {
            position: 'relative',
            top: '6px',
            left: '8px',
            color: '#181818e3',
        },
        clearfix: {
            clear: 'both',
        },
        dropdownMenu: {
            background: '#fff',
            position: 'absolute',
            color: '#212529',
            textAlign: 'left',
            listStyle: 'none',
            backgroundColor: '#fff',
            border: '1px solid rgba(0, 0, 0, .15)',
            borderRadius: '0.25rem',
            MinWidth: '100px',
            display: 'none'

        },
        dropdownmenuA: {
            display: 'block',
            textDecoration: 'none',
            padding: '10px 20px',
            color: '#475569',
            fontWeight: 400,
            borderBottom: '1px solid #ccc'
        },
        notificationsUl: {
            margin: '0',
            padding: '0',
            listStyle: 'none',
            'text-align': 'center',
            color: '#475569',
            fontWeight: 500,
        },
        notificationsImg: {
            display: 'block',
            margin: '0 auto',
            width: '20px',
        },
        borderLeftMenu:{
            position: 'absolute',
            background: '#ccc',
            width: '1px',
            height: '100%',
            top: '0',
            right: '-20px',
        }
       
    }

    useEffect(() => {
        // if(props.image){
        //     setImage(props.image)
        // }else{
        //     setImage(localStorage.getItem('profileImage'))
        // }
        // if(props.name){
        //     setName(props.name)
           
        // } else{
        //     setName(localStorage.getItem('DisplayName')) 
        // }
    //    setImage('');
    //     console.log(66666666666666,"ggggggggggggghj")
        // if (props.userdetails) {
        //     setName(props.userdetails.disp_name)
        //     localStorage.setItem('Tokenuserid', props.userdetails.user_id)
        //     localStorage.setItem('DisplayName', props.userdetails.disp_name)
        //     commonService.getProfileData(props.userdetails.profileId)
        //         .then(res => {
        //             console.log(res.data.data,"ggggggggggggghj")
        //             if (res.data.data) {
        //                 setImage(res.data.data?.personal_info?.image)
        //                 localStorage.setItem('profileImage', res.data.data.personal_info.image)
        //             }
    
        //         })
        // } else{
        //     commonService.getProfileData(localStorage.getItem('profileId'))
        //     .then(res => {
        //         if (res.data.data) {
        //             setImage(res.data.data?.personal_info?.image)
        //             localStorage.setItem('profileImage', res.data.data.personal_info.image)
        //         }

        //     }) 
        // }
    }, [])

    function logout() {
        DashboardService.logout()
        .then(res => {
            if (res.data.code == 200) {
                  localStorage.clear();
        localStorage.removeItem('profileImage')
        localStorage.removeItem('DisplayName')
                window.location.replace(`${logout_URL}`)
            }
            else {
                DashboardService.checkIsUserLogin()
            .then(res => {
                if (res.data.code == 200) {
                    if (res.data.data.accessToken) {
                        let userdetails: any = jwtDecode(res.data.data.accessToken);
                        localStorage.setItem('token', res.data.data.accessToken)
                        console.log(userdetails,"userdetails")
                        const userId = userdetails.user_id;
                        localStorage.setItem('Tokenuserid', userdetails.user_id)
                        DashboardService.logout()
                        .then((ress:any) => {
                            if (ress.data.code == 200) {
                                  localStorage.clear();
                        localStorage.removeItem('profileImage')
                        localStorage.removeItem('DisplayName')
                                window.location.replace(`${logout_URL}`)
                            }  else{
                                toast.error(res.data.msg)
                            }
                    })
                }
            } else{
                toast.error(res.data.msg) 
            }
            })
            .catch(e =>
                console.log(e)
            );
            }
        })
        .catch(e =>
            console.log(e)
        );

    }

    function profile() {
        window.location.replace(`${dashboard_URL}profile`)
    }

    const changeLocation = () => {
        localStorage.setItem('actorType', 'Campus');
        const secret = '282828282';
        const GobalToken = sign(props.userdetails, secret);
        window.location.replace(`${campus_URL}` + "?" + GobalToken)
    }

    const community = () => {
        setCurriculumVal(false)
        setCommunityVal(true)
        window.location.replace(`${dashboard_URL}community`)
    }

    const curriculum = () => {
        window.location.replace(`${dashboard_URL}dashboard`)
    }

    const Activity = () => {
        window.location.replace(`${dashboard_URL}activities`)
    }

    const doubt = () => {
        window.location.replace(`${dashboard_URL}doubts`)
    }


//     <div style={Styles.w501}>
//     <small style={Styles.yourPoints}>You</small>
//     <p style={Styles.greenColor}>+32&nbsp;<img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/up-arrow.svg" alt="" className="up-arrow" width={20} /></p>
// </div>

    return (
        <div>
            <div style={Styles.headerTOp}>
                <div style={Styles.logoIcon}>
                    <img style={Styles.logoiconImg} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/icon-logo.png" alt="Dashboard" />
                </div>
                <div style={Styles.headerSearch} id="header-search1">
                    <input style={Styles.headersearchInput} type="search" placeholder="Search..." name="search" />
                    <div>

                    </div>
                    <div style={Styles.searchIcon}>
                        <img style={Styles.searchIcon1} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/search.svg" alt="" />
                    </div>
                </div>
                <div style={Styles.menuSec}>
                    <ul style={Styles.menuSecUl}>

                    { ( props.module == "Curriculum"  && localStorage.getItem("module") == "Curriculum" && curriculumVal == true ) ? 
                     <li style={Styles.menuSecUlLi1}><Link style={Styles.menuSecUlLiA} to="" onClick={curriculum}><img  style={Styles.menuSecImg} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Curriculum%20.svg" alt="" />Curriculum</Link></li> 
                     : 
                      <li style={Styles.menuSecUlLi}><Link style={Styles.menuSecUlLiA} to="" onClick={curriculum}><img  style={Styles.menuSecImg} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Curriculum%20.svg" alt="" />Curriculum</Link></li>
                       } 

{ (props.module == "Community") ? 
                     <li style={Styles.menuSecUlLi1}><Link style={Styles.menuSecUlLiA} to="" onClick={community}><img style={Styles.menuSecImg} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/communities.svg" alt="" />Community</Link></li> 
                     : 
                      <li style={Styles.menuSecUlLi}><Link style={Styles.menuSecUlLiA} to="" onClick={community}><img style={Styles.menuSecImg} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/communities.svg" alt="" />Community</Link></li>
                       } 


                        
                        <li style={Styles.menuSecUlLi}><Link style={Styles.menuSecUlLiA} to="" onClick={changeLocation}><img style={Styles.menuSecImg} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Campus.svg" alt="" />Campus</Link></li>
                        <li style={Styles.menuSecUlLi}><Link style={Styles.menuSecUlLiA} to="" onClick={Activity}><img style={Styles.menuSecImg} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Activities.svg" alt="" /><span style={Styles.borderLeftMenu}></span>Activity</Link></li>
                        <li style={Styles.menuSecUlLi}><Link style={Styles.menuSecUlLiA} to=""><img style={Styles.menuSecImg} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/My%20Network.svg" alt="" />My Circle</Link></li>
                        <li style={Styles.menuSecUlLi}><Link style={Styles.menuSecUlLiA} to="" onClick={doubt}><img style={Styles.menuSecImg} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Doubts.svg" alt="" width="18px" /><span style={Styles.borderLeftMenu}></span>Doubt</Link></li>
                    </ul>
                </div>
                <div style={Styles.profilesec} className="user-profile">
                    <div style={Styles.profileName}>
                        <div>
                            <div style={Styles.w50}>
                                {/* {image ? <img style={Styles.profileImg} src={image} alt="profileImage" width="30" className="border-r" /> :  */}
                             {props.image ? <img style={Styles.profileImg} src={props.image} alt="profileImage" width="30" className="border-r" /> : <img style={Styles.profileImg} src={localStorage.getItem('profileImage')!} alt="profileImage" width="30" className="border-r" />}   
                                {/* // }   */}
                                {/* // {name ? <h4 style={Styles.m0} title={name}>{name?.slice(0, 5)}...</h4> :  */}
                       {props.name ?  <h4 style={Styles.m0} title={props.name}>{props.name?.slice(0, 5)}...</h4> :  <h4 style={Styles.m0} title={localStorage.getItem('DisplayName')!}>{localStorage.getItem('DisplayName') ?.slice(0, 5)}...</h4> }        
                                {/* // } */}
                                <p style={Styles.m0}>8010 <small>vCoins</small></p>
                            </div>
                          
                            <div style={Styles.clearfix}></div>
                        </div>

                    </div>
                    <div style={Styles.dropdownMenu} className="dropdown-item">
                        <a style={Styles.dropdownmenuA} onClick={profile}><i className="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Profile</a>
                        <a style={Styles.dropdownmenuA} onClick={logout}><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Logout</a>
                    </div>
                </div>
                <div style={Styles.clearfix}></div>
                <div className="notifications">
                    <ul style={Styles.notificationsUl}>
                        <li><img style={Styles.notificationsImg} src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Notices.svg" alt=""  />Notice</li>
                    </ul>
                </div>

            </div>

            <ToastContainer />
        </div>);

}
