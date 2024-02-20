import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import configJson from "vridhee_common_component_mf/configJson";

const assetUrl = configJson.local.assetUrl;

export default function PopularMenturs() {
    return (
        <div>
            <div className="popular-mentors-sec mt-5">
                <Container fixed>
                    <h4 className='primary-color font-w600 mb-3'>Popular Mentors</h4>
                </Container>
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} className="mb-3">
                            <div className="popular-mentors-box bg-white p-2">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={9}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={4}>
                                                <div className="popular-meter-img">
                                                    <img src={`${assetUrl}/prn.png`} alt="" />
                                                    <button type="button" className="btn primary-bg text-white">vRank #9</button>

                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <div className="popular-meter">
                                                    <div>
                                                        <span className="float-left">
                                                            <h4>Dipyaman Baral</h4>
                                                        </span>
                                                        <span className="float-right"><div className="online-user"></div></span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="location-name">
                                                        <span><img src={`${assetUrl}/flag.webp`} alt="" /></span>
                                                        <span>Delhi, India</span>
                                                    </div>
                                                    <div className="number-count">
                                                        <div className="w-50">
                                                            <h5>36.K</h5>
                                                            <p>Students Guided</p>
                                                        </div>
                                                        <div className="w-50">
                                                            <h5>89</h5>
                                                            <p>Students Sponsored</p>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="popular-meter-btn">
                                                        <button type="submit" className="btn">English</button>
                                                        <button type="submit" className="btn">Physics</button>
                                                        <button type="submit" className="btn">Maths</button>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={12} className="introduction-content">
                                                <p className="m-0"><b>Introduction</b></p>
                                                <p className="m-0">Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3} className="popular-mentors-box-right">
                                        <p className="m-0"><small>Speaks</small></p>
                                        <p className="font-w500">English, Hindi, Telugu</p>
                                        <div className="video-sec">
                                            <span><img src={`${assetUrl}/login/Watch%20logo%20without%20border.svg`} alt="" /></span>
                                            <span>Watch Intro</span>
                                        </div>
                                        <div className="button-lession mt-2">
                                            <button type="button" className="btn primary-bg text-white w-100">Book Trail Lesson</button>
                                            <button type="button" className="btn primary-bg text-white w-100 mt-1">Message</button>
                                        </div>
                                        <div className="teacher-social mt-1">
                                            <ul>
                                                <li><a href="#"><img src={`${assetUrl}/login/Facebook%20logo.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/twitter%20logo.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/Linkedin%20logo%20square.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/Youtube%20logo.svg`} alt="" /></a></li>

                                            </ul>
                                        </div>
                                    </Grid>
                                </Grid>

                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} className="mb-3">
                            <div className="popular-mentors-box bg-white p-2">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={9}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={4}>
                                                <div className="popular-meter-img">
                                                    <img src={`${assetUrl}/prn.png`} alt="" />
                                                    <button type="button" className="btn primary-bg text-white">vRank #9</button>

                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <div className="popular-meter">
                                                    <div>
                                                        <span className="float-left">
                                                            <h4>Dipyaman Baral</h4>
                                                        </span>
                                                        <span className="float-right"><div className="offline-user"></div></span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="location-name">
                                                        <span><img src={`${assetUrl}/flag.webp`} alt="" /></span>
                                                        <span>Delhi, India</span>
                                                    </div>
                                                    <div className="number-count">
                                                        <div className="w-50">
                                                            <h5>36.K</h5>
                                                            <p>Students Guided</p>
                                                        </div>
                                                        <div className="w-50">
                                                            <h5>89</h5>
                                                            <p>Students Sponsored</p>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="popular-meter-btn">
                                                        <button type="submit" className="btn">English</button>
                                                        <button type="submit" className="btn">Physics</button>
                                                        <button type="submit" className="btn">Maths</button>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={12} className="introduction-content">
                                                <p className="m-0"><b>Introduction</b></p>
                                                <p className="m-0">Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3} className="popular-mentors-box-right">
                                        <p className="m-0"><small>Speaks</small></p>
                                        <p className="font-w500">English, Hindi, Telugu</p>
                                        <div className="video-sec">
                                            <span><img src={`${assetUrl}/login/Watch%20logo%20without%20border.svg`} alt="" /></span>
                                            <span>Watch Intro</span>
                                        </div>
                                        <div className="button-lession mt-2">
                                            <button type="button" className="btn primary-bg text-white w-100">Book Trail Lesson</button>
                                            <button type="button" className="btn primary-bg text-white w-100 mt-1">Message</button>
                                        </div>
                                        <div className="teacher-social mt-1">
                                            <ul>
                                                <li><a href="#"><img src={`${assetUrl}/login/Facebook%20logo.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/twitter%20logo.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/Linkedin%20logo%20square.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/Youtube%20logo.svg`} alt="" /></a></li>

                                            </ul>
                                        </div>
                                    </Grid>
                                </Grid>

                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} className="mb-3">
                            <div className="popular-mentors-box bg-white p-2">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={9}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={4}>
                                                <div className="popular-meter-img">
                                                    <img src={`${assetUrl}/prn.png`} alt="" />
                                                    <button type="button" className="btn primary-bg text-white">vRank #9</button>

                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <div className="popular-meter">
                                                    <div>
                                                        <span className="float-left">
                                                            <h4>Dipyaman Baral</h4>
                                                        </span>
                                                        <span className="float-right"><div className="online-user"></div></span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="location-name">
                                                        <span><img src={`${assetUrl}/flag.webp`} alt="" /></span>
                                                        <span>Delhi, India</span>
                                                    </div>
                                                    <div className="number-count">
                                                        <div className="w-50">
                                                            <h5>36.K</h5>
                                                            <p>Students Guided</p>
                                                        </div>
                                                        <div className="w-50">
                                                            <h5>89</h5>
                                                            <p>Students Sponsored</p>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="popular-meter-btn">
                                                        <button type="submit" className="btn">English</button>
                                                        <button type="submit" className="btn">Physics</button>
                                                        <button type="submit" className="btn">Maths</button>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={12} className="introduction-content">
                                                <p className="m-0"><b>Introduction</b></p>
                                                <p className="m-0">Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3} className="popular-mentors-box-right">
                                        <p className="m-0"><small>Speaks</small></p>
                                        <p className="font-w500">English, Hindi, Telugu</p>
                                        <div className="video-sec">
                                            <span><img src={`${assetUrl}/login/Watch%20logo%20without%20border.svg`} alt="" /></span>
                                            <span>Watch Intro</span>
                                        </div>
                                        <div className="button-lession mt-2">
                                            <button type="button" className="btn primary-bg text-white w-100">Book Trail Lesson</button>
                                            <button type="button" className="btn primary-bg text-white w-100 mt-1">Message</button>
                                        </div>
                                        <div className="teacher-social mt-1">
                                            <ul>
                                                <li><a href="#"><img src={`${assetUrl}/login/Facebook%20logo.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/twitter%20logo.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/Linkedin%20logo%20square.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/Youtube%20logo.svg`} alt="" /></a></li>

                                            </ul>
                                        </div>
                                    </Grid>
                                </Grid>

                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} className="mb-3">
                            <div className="popular-mentors-box bg-white p-2">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={9}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={4}>
                                                <div className="popular-meter-img">
                                                    <img src={`${assetUrl}/prn.png`} alt="" />
                                                    <button type="button" className="btn primary-bg text-white">vRank #9</button>

                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <div className="popular-meter">
                                                    <div>
                                                        <span className="float-left">
                                                            <h4>Dipyaman Baral</h4>
                                                        </span>
                                                        <span className="float-right"><div className="offline-user"></div></span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="location-name">
                                                        <span><img src={`${assetUrl}/flag.webp`} alt="" /></span>
                                                        <span>Delhi, India</span>
                                                    </div>
                                                    <div className="number-count">
                                                        <div className="w-50">
                                                            <h5>36.K</h5>
                                                            <p>Students Guided</p>
                                                        </div>
                                                        <div className="w-50">
                                                            <h5>89</h5>
                                                            <p>Students Sponsored</p>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="popular-meter-btn">
                                                        <button type="submit" className="btn">English</button>
                                                        <button type="submit" className="btn">Physics</button>
                                                        <button type="submit" className="btn">Maths</button>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={12} className="introduction-content">
                                                <p className="m-0"><b>Introduction</b></p>
                                                <p className="m-0">Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3} className="popular-mentors-box-right">
                                        <p className="m-0"><small>Speaks</small></p>
                                        <p className="font-w500">English, Hindi, Telugu</p>
                                        <div className="video-sec">
                                            <span><img src={`${assetUrl}/login/Watch%20logo%20without%20border.svg`} alt="" /></span>
                                            <span>Watch Intro</span>
                                        </div>
                                        <div className="button-lession mt-2">
                                            <button type="button" className="btn primary-bg text-white w-100">Book Trail Lesson</button>
                                            <button type="button" className="btn primary-bg text-white w-100 mt-1">Message</button>
                                        </div>
                                        <div className="teacher-social mt-1">
                                            <ul>
                                                <li><a href="#"><img src={`${assetUrl}/login/Facebook%20logo.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/twitter%20logo.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/Linkedin%20logo%20square.svg`} alt="" /></a></li>
                                                <li><a href="#"><img src={`${assetUrl}/login/Youtube%20logo.svg`} alt="" /></a></li>

                                            </ul>
                                        </div>
                                    </Grid>
                                </Grid>

                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}