import React from "react";
import { Link } from 'react-router-dom';
export default function Header() {

        const changeLocation = ()=>{
        
        window.location.href="https://v3cdemo.vridhee.com:5090/redirectPage"
    }
    
    return (
        <div>
            <div className="header-top">
                <div className="logo-icon">
                    <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/icon-logo.png" alt="Dashboard" />
                </div>
                <div className="header-search">40 In Progress
                    <input type="search" className="form-control" name="search" />
                    <div className="search-icon">
                        <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/search.svg" alt="" />
                    </div>
                </div>
                <div className="menu-sec">
                    <ul>
                        <li><Link to=""><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Mycircle.svg" alt="" />My Circle</Link></li>
                        <li><Link to=""><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/activity.svg" alt="" />Activities</Link></li>
                        <li><Link to="" onClick={changeLocation}><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Cam%20pus.svg" alt="" />Campus</Link></li>
                        <li><Link to=""><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Curriculum.svg" alt="" />Curriculum</Link></li>
                        <li><Link to=""><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/ask.svg" alt="" />Ask?</Link></li>
                    </ul>
                </div>
                <div className="profile-sec">
                    <div className="profile-name">
                        <div>
                            <div className="w-50">
                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" width="30" className="border-r" />
                                <h4 className="m-0">Dipyaman</h4>
                                <p className="m-0">367 <small>vCoins</small></p>
                            </div>
                            <div className="w-50 your-points">
                                <small className="light-color">You</small>
                                <p className="mb-0 green-color">+32&nbsp;<img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/up-arrow.svg" alt="" className="up-arrow" width={20} /></p>
                            </div>
                            <div className="clearfix"></div>
                        </div>

                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="notifications">
                    <ul>
                        <li><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Notices.svg" alt="" />Notices</li>
                    </ul>
                </div>

            </div>



        </div>);

}
