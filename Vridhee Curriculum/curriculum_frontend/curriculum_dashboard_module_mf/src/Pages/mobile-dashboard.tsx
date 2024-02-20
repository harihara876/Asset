import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import DashboardService from '../Services/dashboardservices';
import { jwtDecode } from 'jwt-decode';


let token :string
export const MobileDashboard = () => {
  console.log(window.location.href,"URL");
  console.log(window,"URL1");
//  let URL = "https://v3cdemo.vridhee.com:5040/mobile-dashboard?dashboard?Learner?65c0f088360a5dcb97a1f81f?659ba1969714fec18300bcaf"
// let URL = https://v3cdemo.vridhee.com:5040/mobile-dashboard?dashboard?Learner?

let URL = window.location.href;
let userdetails :string
const navigate = useNavigate();

// useEffect(() => {
      var prmstr = window.location.href.split("?");
      console.log(prmstr,"prmstr")
      let path = prmstr[1]
      let actorType = prmstr[2]
      let sid = prmstr[3];
      let userId = prmstr[4];

      console.log(path,"path")
      console.log(sid,"sid")
      console.log(userId,"userId")

      if(sid){
        const body = {
            "sid": sid
          }
        DashboardService.getMobileToken(body,userId)
        .then(res => {
          console.log(res.data.data.accessToken,"tokeeennn999999") 
        token = res.data.data.accessToken;
        userdetails = jwtDecode(token);
        console.log(userdetails,"userdetails") 

          const data = { actorType: actorType, sid: sid , userId: userId, token:token , userdetails:userdetails};
          console.log(data,"mobile data")
          const options = {
            pathname: `/${path}`,
            search: `?${actorType}?${sid}?${userId}`,
          };
          navigate(options, {state: data })
        })
        .catch(e =>
            console.log(e)
        );  
    }
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
// }, [])


  return (
    <div>
      {/* URL: {window.location.href} */}
      {/* let url =  */}
      <Navigate to={`/${path}?${actorType}?${sid}?${userId}`} />
    </div>
  )
}