import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import IActorProfile from '../Models/IActorProfile'
import jwt_decode from "jwt-decode";
import { OnboardingService } from '../Services/onboardingService';

import configJson from "vridhee_common_component_mf/configJson";
import { toast, ToastContainer } from 'react-toastify';

interface IActorProfileDetails {
  actorprofiles: IActorProfile[],
  errorMsg: string
}

let userdetails:any;

export default function Sidebar(props:any) {

console.log(props,"props")
  const assetUrl = configJson.local.assetUrl;
  const [actorprofile, setActorProfile] = useState<IActorProfileDetails>({
    actorprofiles: [] as IActorProfile[],
    errorMsg: ''
  })

  const location = useLocation();

  if (props.token) {
     userdetails = jwt_decode(props.token);
    console.log(userdetails,"000000")
    let actorId = userdetails.act_typ[0].typ_id
    localStorage.setItem('id', userdetails.act_typ[0].typ_id);
}


  useEffect(() => {
    if (localStorage.getItem('profileId')) {
      OnboardingService.getProfileData(localStorage.getItem('profileId'))
        .then(res => {
          if(res.data.status == 200){
            let personalInfoData = res.data.data.personal_info
            let learningData = res.data.data.learning
            let userData = res.data.data.userdetails;
            localStorage.setItem("email", res.data.data.userdetails.email);
            if (personalInfoData.dob && personalInfoData.gender && userData.disp_name && learningData.curr_cat_id && learningData.curr_grade_id && learningData.subjects.length) {
              localStorage.setItem('tabFlag', 'true')
            } else {
              localStorage.setItem('tabFlag', 'false')
            }
          }
          
        })
        .catch(error => {
          toast.error(error.message);

        });
    } 
  }, [])

  useEffect(() => {
    setActorProfile({ ...actorprofile })
    if (localStorage.getItem('id')) {
      let id: any = localStorage.getItem('id');
      OnboardingService.getActorProfileDetails(id)
        .then((res: any) => {
          let profileresponse: any = [];
          if (res.data.status == 200) {
            profileresponse = res.data.data.actorProfileList;
            var newData: any = profileresponse.map((data: any) => {
              if (data.val === 'Personal Information') {
                data.path = 'personal-information'
              }
              else if (data.val === 'Teaching Interest') {
                data.path = 'teaching-interest'
              }
              else if (data.val === 'Learning Interest') {
                data.path = 'learning-interest'
              }
              else if (data.val === 'Hobbies & Passion') {
                data.path = 'hobbies-passion'
              }
              else if (data.val === 'Skills & Interests') {
                data.path = 'skills-interests'
              }
              else if (data.val === 'Educational details') {
                data.path = 'educational-details'
              }
              else if (data.val === 'Professional details') {
                data.path = 'professional-details'
              }
              else if (data.val === 'Awards & Certificates') {
                data.path = 'awards-certificates'
              }
              else if (data.val === 'Network') {
                data.path = 'network'
              }
              return data;
            });
            let actorprofile = newData;
            setActorProfile({
              ...actorprofile, actorprofiles: actorprofile
            })
          } else {
            OnboardingService.checkIsUserLogin()
            .then(ress => {
                if (ress.data.code == 200) {
                    if (ress.data.data.accessToken) {
                      localStorage.setItem('Tokenuserid',  ress.data.data._id)
                      localStorage.setItem('token', ress.data.data.accessToken)
                      let id: any = localStorage.getItem('id');
                      OnboardingService.getActorProfileDetails(id)
                        .then((result: any) => {
                          let profileresponse: any = [];
                          if (result.data.status == 200) {
                            profileresponse = result.data.data.actorProfileList;
                            var newData: any = profileresponse.map((data: any) => {
                              if (data.val === 'Personal Information') {
                                data.path = 'personal-information'
                              }
                              else if (data.val === 'Teaching Interest') {
                                data.path = 'teaching-interest'
                              }
                              else if (data.val === 'Learning Interest') {
                                data.path = 'learning-interest'
                              }
                              else if (data.val === 'Hobbies & Passion') {
                                data.path = 'hobbies-passion'
                              }
                              else if (data.val === 'Skills & Interests') {
                                data.path = 'skills-interests'
                              }
                              else if (data.val === 'Educational details') {
                                data.path = 'educational-details'
                              }
                              else if (data.val === 'Professional details') {
                                data.path = 'professional-details'
                              }
                              else if (data.val === 'Awards & Certificates') {
                                data.path = 'awards-certificates'
                              }
                              else if (data.val === 'Network') {
                                data.path = 'network'
                              }
                              return data;
                            });
                            let actorprofile = newData;
                            setActorProfile({
                              ...actorprofile, actorprofiles: actorprofile
                            })
                          }
                   
                             })     }
                } else{
                   
                }
            })
            .catch(e =>
                console.log(e)
            );
            // toast.error(res.data.msg)
          }

        })
    }

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [props.id])
  

  const { actorprofiles, errorMsg } = actorprofile;
  
  return (
    <div className="">
      <div className="sidebar-sec">
        <div className="sidebar-logo">
          <img src={`${assetUrl}/white-logo.svg`} alt="" />
        </div>
        <div className="sidebar-menu">
          {localStorage.getItem('tabFlag') == 'true' ? <ul>
            {
              actorprofiles.map((profiles, i) =>
                <li key={i}>
                  <Link to={`/${profiles.path}`} className={location.pathname === `/${profiles.path}` ? "active" : ""}>
                    <img src={location.pathname === `/${profiles.path}` ? `${profiles.img_url[0].act_img_url}` : `${profiles.img_url[0].inact_img_url}`} alt="" />
                    {profiles.val}</Link>
                </li>
              )}
          </ul> :
            <ul>
              {
                actorprofiles.map((profiles, i) =>
                  <li key={i}>
                    <Link to="" className={location.pathname === `/${profiles.path}` ? "active" : ""}>
                      <img src={location.pathname === `/${profiles.path}` ? `${profiles.img_url[0].act_img_url}` : `${profiles.img_url[0].inact_img_url}`} alt="" />
                      {profiles.val}</Link>
                  </li>
                )}
            </ul>}

        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
