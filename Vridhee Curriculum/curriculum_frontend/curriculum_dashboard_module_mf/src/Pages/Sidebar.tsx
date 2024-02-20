
import React from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import configJson from "vridhee_common_component_mf/configJson";

console.log(window.innerWidth,"window.innerWidth")
// let width  =  window.innerWidth;
// let width  =  500;


const Dashboard_Route_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl

export default function Sidebar(){

    const todo = () => {
         window.location.replace(`todo` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid'));
     };

     const library = () => {
        window.location.replace(`library` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid'));
    };

    const planner = () => {
        window.location.replace(`planner` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid'));
    };

    const analytics = () => {
        window.location.replace(`analytics` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid'));
    };

    const activities = () => {
        window.location.replace(`activities` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid'));
    };

    const explore = () => {
        window.location.replace(`explore` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid'));
    };

    const collaboration = () => {
        window.location.replace(`collaboration` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid'));
    };

    const doubts = () => {
        window.location.replace(`${Dashboard_Route_URL}mobile-dashboard` + "?"  + 'doubts' + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid') )
        // window.location.replace(`doubts` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid'));
    };

    const rewards = () => {
        window.location.replace(`rewards` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid'));
    };

    return(
        <div>
            <div className="sidebar">

            <div className="menu-item-curriculum">
                    <ul>
                        <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/dashboard.svg" alt=""  />Dashboard</Link></li>
                        <li><Link to="/todo" className={location.pathname === '/todo' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/To%20do.svg" alt=""  />To Do</Link></li>
                        <li><Link to="/library" className={location.pathname === '/library' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/library.svg" alt=""  />Library</Link></li>
                        <li><Link to="/planner" className={location.pathname === '/planner' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/Planner.svg" alt=""  />Planner</Link></li>
                        <li><Link to="/analytics" className={location.pathname === '/analytics' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/analytics.svg" alt=""  />Analytics</Link></li>               
                        <li><Link to="/activities" className={location.pathname === '/activities' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/Activities.svg" alt=""  />Assignment</Link></li>
                        <li><Link to="/doubts" className={location.pathname === '/doubts' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/doubts.svg" alt=""  />Doubt</Link></li>
                        {/* <li><a onClick={doubts} className={location.pathname === '/doubts' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/doubts.svg" alt=""  />Doubt</a></li> */}
                        <li><Link to="/collaboration" className={location.pathname === '/collaboration' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/collaboration.svg" alt=""  />Collabaration</Link></li>
                        {/* <li><Link to="/explore" className={location.pathname === '/explore' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/explore.svg" alt=""  />Explore</Link></li> */}
                        <li><Link to="/rewards" className={location.pathname === '/rewards' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/rewards.svg" alt=""  />Reward</Link></li>
                    </ul>
                </div>
{/* 
            {width >= 800 ?

                 
                :
                 
                <div className="menu-item-curriculum">
                <ul>
                    <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/dashboard.svg" alt=""  />Dashboard</Link></li>
                    <li><a onClick={todo} className={location.pathname === '/todo' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/To%20do.svg" alt=""  />To Do</a></li>
                    <li><a onClick={library} className={location.pathname === '/library' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/library.svg" alt=""  />Library</a></li>
                    <li><a onClick={planner} className={location.pathname === '/planner' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/Planner.svg" alt=""  />Planner</a></li>
                    <li><a onClick={analytics} className={location.pathname === '/analytics' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/analytics.svg" alt=""  />Analytics</a></li>               
                    <li><a onClick={activities} className={location.pathname === '/activities' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/Activities.svg" alt=""  />Assignment</a></li>
                    <li><a onClick={doubts} className={location.pathname === '/doubts' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/doubts.svg" alt=""  />Doubt</a></li>
                    <li><a onClick={collaboration} className={location.pathname === '/collaboration' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/collaboration.svg" alt=""  />Collabaration</a></li>
                     <li><a onClick={rewards} className={location.pathname === '/rewards' ? "active" : ""}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/menu/rewards.svg" alt=""  />Reward</a></li>
                </ul>
            </div> } */}

            </div>
        </div>
    );
}