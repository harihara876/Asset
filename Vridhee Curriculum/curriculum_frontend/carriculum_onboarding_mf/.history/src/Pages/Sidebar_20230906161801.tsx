import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import IActorProfile from '../../models/IActorProfile'
import { OnboardingService } from "curriculum_onboarding_mf/OnboardingService";
import jwt_decode from "jwt-decode";

interface IActorProfileDetails {
    actorprofiles: IActorProfile[],
    errorMsg: string
  }


export default function Sidebar() {

    const [actorprofile, setActorProfile] = useState<IActorProfileDetails>({
        actorprofiles: [] as IActorProfile[],
        errorMsg: ''
      })
    
      useEffect(() => {
        setActorProfile({ ...actorprofile })
        // console.log(localStorage.getItem('id'),"ifff")
        let token : any = localStorage.getItem('token');
            console.log(token,"token");
             let userdetails:any  = jwt_decode(token);
             let id = userdetails.act_typ[0].typ_id;
        OnboardingService.getActorProfileDetails(id)
          .then((res: any) => {
            let profileresponse: any = [];
            profileresponse = res.data.data.actorProfileList;
            var newData = profileresponse.map((data: any) => {
                data.img_url[0].act_img_url = "http://localhost:3000/" + data.img_url[0].act_img_url
                data.img_url[0].inact_img_url = "http://localhost:3000/" + data.img_url[0].inact_img_url
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
          })
          .catch(err => setActorProfile({
            ...actorprofile, errorMsg: err.message
          }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
      }, [])
    
      const { actorprofiles, errorMsg } = actorprofile;
    
      const location = useLocation();
      // console.log(location.pathname,"location.pathname");
      // console.log(actorprofiles,"actorprofiles");
      
    return (
        <div className="">
            <div className="sidebar-sec">
                <div className="sidebar-logo">
                <img src="http://localhost:3000/static/media/white-logo.0ca83c914863b54d6af7ef55177cd613.svg" alt="" />
                </div>
                <div className="sidebar-menu">
                    <ul>
                    
          {
            actorprofiles.map((profiles, i) =>
              <li key={i}>
                <Link to={`/${profiles.path}`} className={location.pathname === `/${profiles.path}` ? "active" : ""}>
                  <img src={location.pathname === `/${profiles.path}` ? `${profiles.img_url[0].act_img_url}` : `${profiles.img_url[0].inact_img_url}`} alt="" />
                  {profiles.val}</Link>
              </li>
            )}
                        {/* <li><a className="" href="./personal-information"><img src="assets/img/onboarding/Personal_info_Icon.png" alt="" />Personal Information</a></li>
                        <li><a className="" href="./learning-interest"><img src="assets/img/onboarding/Learning_Int_dark.png" alt="" />Learning Interest</a></li>
                        <li><a className="" href="./hobbies-passion"><img src="assets/img/onboarding/Hobbies_and_passion_Icon.png" alt="" />Hobbies &amp; Passion</a></li>
                        <li><a className="" href="./skills-interests"><img src="assets/img/onboarding/Skills_and_Int_Icon.png" alt="" />Skills &amp; Interests</a></li>
                        <li><a className="" href="./educational-details"><img src="assets/img/onboarding/Education_detail_Icon.png" alt="" />Educational details</a></li>
                        <li><a className="" href="./professional-details"><img src="assets/img/onboarding/Professional_details_Icon.png" alt="" />Professional details</a></li>
                        <li><a className="" href="./awards-certificates"><img src="assets/img/onboarding/Awards_and_certificate_Icon.png" alt="" />Awards &amp; Certificates</a></li>
                        <li><a className="" href="./network"><img src="assets/img/onboarding/Network_Icon.png" alt="" />Network</a></li> */}
                        </ul>
                </div>
            </div>
        </div>
    );
}