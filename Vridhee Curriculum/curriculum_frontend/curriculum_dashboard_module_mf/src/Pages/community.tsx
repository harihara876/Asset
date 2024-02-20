import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import configJson from "vridhee_common_component_mf/configJson";
import React, { useEffect, useState } from "react";
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import { useTheme } from "@emotion/react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import { format } from 'date-fns';




function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };

}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


let date = format(new Date(), 'E, dd MMM, yyyy')
let time = new Date().toLocaleTimeString();


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

export default function Community() {
    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const now = new Date().toLocaleTimeString();
    const [time, setTime] = useState(now);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [age, setAge] = React.useState('');

    const handleChange1 = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    }


    useEffect(() => {
        setInterval(updatetime, 1000);
    }, []);

    function updatetime() {
        const newtime = new Date().toLocaleTimeString();
        setTime(newtime);
    }


    return (
        <div>
            <HeaderCurriculum  module="Community"/>
            <div className="community-menu">
                <ul>
                    <li className="active-menu">All</li>
                    <li>My Circle</li>
                    <li>My Community</li>
                    <li>My Activity</li>
                </ul>
            </div>
            <div className="community-content ">
                <Grid container spacing={3} className="mb-2">
                    <Grid item xs={12} sm={12} md={3}>
                        <div className="community-profile">
                            <div className="profile-background-img"></div>
                            <div className="profile-img">
                                <img src="https://mariebiancuzzo.com/wp-content/uploads/2022/02/022222-IBCLC-exam-points-FEAT.png" className="w-100" alt="" />
                            </div>
                            <div className="profile-user-details">
                                <h4>Nirmal K. Rewaria</h4>
                                <p>Maths Teacher</p>
                                <div className="clearfix"></div>
                                <ul>
                                    <li>
                                        <b className="primary-color">2</b>
                                        <p>Posts</p>
                                    </li>
                                    <li>
                                        <b style={{ 'color': '#0E8309' }}>1</b>
                                        <p>Followers</p>
                                    </li>
                                    <li>
                                        <b style={{ 'color': '#A25910' }}>2</b>
                                        <p>Following</p>
                                    </li>
                                </ul>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="social-feeds mt-3">
                            <h3 className="community-title mb-2">Social Feed</h3>
                            <div className="community-social-feeds-box">
                                <div className="p-1">
                                    <div className="community-social-feeds-box-img">
                                        <img src="data:image/jpeg;base64,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" alt="" />
                                        <div className="green-bg circle-social"></div>
                                    </div>
                                    <div className="community-social-feeds-box-con">
                                        <h4>Physics</h4>
                                        <p className="m-0">Two line text string with two actions. One to two lines is preferable on mobile.</p>
                                        <p className="m-0">
                                            <span className="mr-2"><i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;August 26, 2023</span>
                                            <span className="mr-2"><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;10:30AM</span>
                                            <span><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;By Anurag</span></p>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="community-social-feeds-box-bottom">
                                    <ul>
                                        <li><i className="fa fa-heart-o" aria-hidden="true" style={{ 'color': '#E00D66' }}></i>&nbsp;Liked</li>
                                        <li><i className="fa fa-comment-o" aria-hidden="true" style={{ 'color': '#3E60D1' }}></i>&nbsp;Commented</li>
                                        <li><i className="fa fa-share-alt" aria-hidden="true"></i>&nbsp;Shared</li>
                                    </ul>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="community-social-feeds-box">
                                <div className="p-1">
                                    <div className="community-social-feeds-box-img">
                                        <img src="data:image/jpeg;base64,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" alt="" />
                                        <div className="bringal-bg circle-social"></div>
                                    </div>
                                    <div className="community-social-feeds-box-con">
                                        <h4>Semiconductor</h4>
                                        <p className="m-0">Two line text string with two actions. One to two lines is preferable on mobile.</p>
                                        <p className="m-0">
                                            <span className="mr-2"><i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;August 26, 2023</span>
                                            <span className="mr-2"><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;10:30AM</span>
                                            <span><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;By Anurag</span></p>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="community-social-feeds-box-bottom">
                                    <ul>
                                        <li><i className="fa fa-heart-o" aria-hidden="true" style={{ 'color': '#E00D66' }}></i>&nbsp;Liked</li>
                                        <li><i className="fa fa-comment-o" aria-hidden="true" style={{ 'color': '#3E60D1' }}></i>&nbsp;Commented</li>
                                        <li><i className="fa fa-share-alt" aria-hidden="true"></i>&nbsp;Shared</li>
                                    </ul>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="community-social-feeds-box">
                                <div className="p-1">
                                    <div className="community-social-feeds-box-img">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSufyGWAsTF_VHiK_FHxP5jIEeKlyAvC-_wQg&usqp=CAU" alt="" />
                                        <div className="primary-bg circle-social"></div>
                                    </div>
                                    <div className="community-social-feeds-box-con">
                                        <h4>English</h4>
                                        <p className="m-0">Two line text string with two actions. One to two lines is preferable on mobile.</p>
                                        <p className="m-0">
                                            <span className="mr-2"><i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;August 26, 2023</span>
                                            <span className="mr-2"><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;10:30AM</span>
                                            <span><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;By Anurag</span></p>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="community-social-feeds-box-bottom">
                                    <ul>
                                        <li><i className="fa fa-heart-o" aria-hidden="true" style={{ 'color': '#E00D66' }}></i>&nbsp;Liked</li>
                                        <li><i className="fa fa-comment-o" aria-hidden="true" style={{ 'color': '#3E60D1' }}></i>&nbsp;Commented</li>
                                        <li><i className="fa fa-share-alt" aria-hidden="true"></i>&nbsp;Shared</li>
                                    </ul>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="color-indication">
                                <span className="mr-2"><span className="green-bg circle-social1"></span>Academic</span>
                                <span className="mr-2"><span className="bringal-bg circle-social1"></span>Non Academic</span>
                                <span><span className="primary-bg circle-social1"></span>Popular  </span>
                            </div>
                            <button type="button" className="btn primary-color border-color-community w-100 white-bg mt-1">See More</button>
                        </div>
                        <div className="my-community-feed mt-2">
                            <div className="mb-1">
                                <span className="float-left">
                                    <h4>My Community</h4>
                                </span>
                                {/* <span className="float-right">
                                    <a href="#" className="primary-color"><i className="fa fa-plus" aria-hidden="true"></i>&nbsp;Create</a>
                                </span> */}
                                <div className="clearfix"></div>
                            </div>
                            <div className="my-community-feed-box">
                                <div className="my-community-feed-item mb-1">
                                    <div className="my-community-feed-box-img">
                                        <img src="https://physics.biu.ac.il/sites/physics/files/styles/front_hero_slide_/public/imgs/slides21/shutterstock_2146705679.jpg?itok=Xbw7zDfp" alt="" />
                                    </div>
                                    <div className="my-community-feed-box-con border-bottom mb-1 pb-1">
                                        <h4>Physics Community</h4>
                                        <p className=""><span className="online-indication"></span>24 members are active in community</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="my-community-feed-item mb-1">
                                    <div className="my-community-feed-box-img">
                                        <img src="https://www.thoughtco.com/thmb/6MsMmUK27akFhb8i89kj95J5iko=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-545286316-433dd345105e4c6ebe4cdd8d2317fdaa.jpg" alt="" />
                                    </div>
                                    <div className="my-community-feed-box-con border-bottom mb-1 pb-1">
                                        <h4>Chemistry</h4>
                                        <p className=""><span className="online-indication"></span>20 members are active in community</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="my-community-feed-item">
                                    <div className="my-community-feed-box-img">
                                        <img src="https://www.schoolnetindia.com/blog/wp-content/uploads/2022/07/How-to-Learn-English-Speaking-at-Home.jpg" alt="" />
                                    </div>
                                    <div className="my-community-feed-box-con border-bottom mb-1 pb-1">
                                        <h4>English</h4>
                                        <p className=""><span className="color-gray online-indication"></span>30 members are active in community</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <button type="button" className="btn primary-color border-color-community w-100 white-bg mt-2">See More</button>
                            </div>

                        </div>
                        {/* <div>
                            <div className="mb-1">
                                <span className="float-left">
                                    <h4>Suggested Pages</h4>
                                </span>
                                <span className="float-right">

                                </span>
                                <div className="clearfix"></div>
                            </div>

                            <div className="my-community-feed-box">
                                <div className="my-community-feed-item">
                                    <div className="my-community-feed-box-img">
                                        <img src="https://static.scientificamerican.com/blogs/cache/file/15E43A6F-3941-471A-BF4A81AECDC8C8AA_source.jpg?w=590&h=800&19535223-FF51-4AE3-A05064AFC6E375F5" alt="" />
                                    </div>
                                    <div className="my-community-feed-box-con">
                                        <h4>Biology</h4>
                                        <p className=""><span className="online-indication"></span>24 members are active in community</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>


                                <button type="button" className="btn primary-color border-color-community w-100 white-bg mt-2">See More</button>
                            </div>
                        </div> */}
                        {/* <div className="network-sec mb-2">
                            <div className="mb-1">
                                <span className="float-left">
                                    <h4>Network</h4>
                                </span>
                                <span className="float-right">

                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="network-sec-item">
                                <span className="float-left">
                                    <div className="network-sec-item-img">
                                        <img src="https://d22bbllmj4tvv8.cloudfront.net/d5/c0/efaeb96d41e3a674f8d2ed576bed/what-is-mentoring1-square.jpg" alt="" />
                                    </div>
                                    <div className="network-sec-item-con">
                                        <h4>Mentors</h4>
                                        <p className="m-0">10</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </span>
                                <span className="float-right">
                                    <i className="fa fa-share-alt" style={{ 'position': 'relative', 'top': '8px' }} aria-hidden="true"></i>
                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="network-sec-item">
                                <span className="float-left">
                                    <div className="network-sec-item-img">
                                        <img src="https://static.toiimg.com/photo/97052445.cms" alt="" />
                                    </div>
                                    <div className="network-sec-item-con">
                                        <h4>Classmates</h4>
                                        <p className="m-0">10</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </span>
                                <span className="float-right">
                                    <i className="fa fa-share-alt" style={{ 'position': 'relative', 'top': '8px' }} aria-hidden="true"></i>
                                </span>
                                <div className="clearfix"></div>
                            </div>



                        </div> */}
                        {/* <div className="network-sec mb-2">
                            <div className="mb-1">
                                <span className="float-left">
                                    <h4>Improve your Profile</h4>
                                </span>
                                <span className="float-right">

                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="network-sec-item improve-profile">
                                <span className="float-left">
                                    <div className="network-sec-item-img">
                                        <img src="https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_22019_16430188554602375.jpg" alt="" />
                                    </div>
                                    <div className="network-sec-item-con">
                                        <h4>Language</h4>
                                        <p className="m-0">One line text string.</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </span>
                                <span className="float-right">
                                    <i className="fa fa-plus-circle" style={{ 'position': 'relative', 'top': '14px' }} aria-hidden="true"></i>
                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="network-sec-item improve-profile">
                                <span className="float-left">
                                    <div className="network-sec-item-img">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkN3Y2fvXa-UIsBfgLuylKqiX90omKfGIEww&usqp=CAU" alt="" />
                                    </div>
                                    <div className="network-sec-item-con">
                                        <h4>Volunteering Experience</h4>
                                        <p className="m-0">One line text string.</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </span>
                                <span className="float-right">
                                    <i className="fa fa-plus-circle" style={{ 'position': 'relative', 'top': '14px' }} aria-hidden="true"></i>
                                </span>
                                <div className="clearfix"></div>
                            </div>
                        </div> */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className="post-community-data">
                            <div className="post-community-data-top">
                                <span className="primary-color font-w500 mr-4">What you want do ?</span>
                                <span className="mr-3"><i className="fa fa-video-camera" aria-hidden="true"></i>&nbsp;Media</span>
                                <span className="mr-3"><i className="fa fa-user" aria-hidden="true"></i>&nbsp;Activity</span>
                                <span className="mr-3"><i className="fa fa-file-text" aria-hidden="true"></i>&nbsp;Documents</span>
                                <span className="mr-3"><i className="fa fa-paperclip" aria-hidden="true"></i>&nbsp;Attach</span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="post-date-input">
                                <TextField id="filled-basic" label="Start Posting" variant="filled" className="w-100" />
                                <div className="button-right mt-2">
                                    <button type="button" className="btn primary-bg text-white border-r pr-2 pl-2">Post&nbsp;&nbsp;<i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="shome-me mb-2">
                            <Grid container spacing={2} className="mb-2">
                                <Grid item xs={12} sm={12} md={3}>
                                    <p className="m-0">Show Me</p>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3}>
                                    <div className="community-select">
                                        <FormControl variant="filled">
                                            <InputLabel id="demo-simple-select-filled-label">Articles</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                value={age}
                                                onChange={handleChange1}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3}>
                                    <div className="community-select">
                                        <FormControl variant="filled">
                                            <InputLabel id="demo-simple-select-filled-label">Events</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                value={age}
                                                onChange={handleChange1}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3}>
                                    <div className="community-select">
                                        <FormControl variant="filled">
                                            <InputLabel id="demo-simple-select-filled-label">Connections</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                value={age}
                                                onChange={handleChange1}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="social-feed-real">
                            <div className="social-feed-real-profile">
                                <div className="network-sec-item1 improve-profile">
                                    <span className="float-left">
                                        <div className="network-sec-item-img">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkN3Y2fvXa-UIsBfgLuylKqiX90omKfGIEww&usqp=CAU" alt="" />
                                        </div>
                                        <div className="network-sec-item-con">
                                            <h4>Nirmal K. Rewaria</h4>
                                            <p className="m-0">21/11/2023</p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </span>
                                    <span className="float-right">
                                        <div className="dot-menu">
                                            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                        </div>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="social-feed-real-content mt-1">
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/CjAVfW_6juw?si=XFrcz2FULq5txuYS&amp;start=19" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                            <div className="social-feed-real-comment">
                                <ul>
                                    <li><i className="fa fa-heart-o" style={{ 'color': '#E00D66' }} aria-hidden="true"></i>&nbsp;&nbsp;2 Likes</li>
                                    <li><i className="fa fa-comment-o" style={{ 'color': '#3E60D1' }} aria-hidden="true"></i>&nbsp;&nbsp;1 Comments</li>
                                    <li><i className="fa fa-share-alt" style={{ 'color': '#247914' }} aria-hidden="true"></i>&nbsp;&nbsp;Share</li>
                                    <li><i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;&nbsp;Save</li>
                                </ul>
                            </div>
                            <div className="replay-section mt-2">
                                <div className="replay-section-img">
                                    <img src="https://images.unsplash.com/photo-1531256456869-ce942a665e80?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                </div>
                                <input type="text" name="" placeholder="Write a comment…" />
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="bday-celebrations mb-2">
                            <h4 className="mb-2">Three of your buddies celebrating their birthday today</h4>
                            <div className="bday-celebrations-items">
                                <div className="bday-celebrations-box border-bottom mb-2 pb-2">
                                    <span className="float-left">
                                        <div className="bday-celebrations-box-img">
                                            <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                        </div>
                                        <div className="bday-celebrations-box-con">
                                            <h4>Ravishankar</h4>
                                            <p className="m-0"><i className="fa fa-calendar-o" aria-hidden="true"></i>&nbsp;&nbsp;25/11/2023</p>
                                        </div>
                                    </span>
                                    <span className="float-right mt-2">
                                        <span className="mr-3 primary-color font-w500">Post on timeline</span>
                                        <span className="font-w500" style={{ 'color': '#EE0009' }}>Ignore</span>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="bday-celebrations-box">
                                    <span className="float-left">
                                        <div className="bday-celebrations-box-img">
                                            <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                        </div>
                                        <div className="bday-celebrations-box-con">
                                            <h4>Ravishankar</h4>
                                            <p className="m-0"><i className="fa fa-calendar-o" aria-hidden="true"></i>&nbsp;&nbsp;25/11/2023</p>
                                        </div>
                                    </span>
                                    <span className="float-right mt-2">
                                        <span className="mr-3 primary-color font-w500">Post on timeline</span>
                                        <span className="font-w500" style={{ 'color': '#EE0009' }}>Ignore</span>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>

                        <div className="social-feed-real">
                            <div className="social-feed-real-profile">
                                <div className="network-sec-item1 improve-profile">
                                    <span className="float-left">
                                        <div className="network-sec-item-img">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkN3Y2fvXa-UIsBfgLuylKqiX90omKfGIEww&usqp=CAU" alt="" />
                                        </div>
                                        <div className="network-sec-item-con">
                                            <h4>Ronald Oliver <small>was with</small> Steve Cunningham</h4>
                                            <p className="m-0">Aug 23, 2023</p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </span>
                                    <span className="float-right">
                                        <div className="dot-menu">
                                            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                        </div>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="social-feed-real-content mt-1">
                                <p>Science is the branch of knowledge that incorporates the organized study of physical and natural phenomena. The school curriculum of science in most countries comprises of two parts: Theory and Practical.</p>
                                <img src="https://studiousguy.com/wp-content/uploads/2021/08/Physics-Lab-equipments.jpg" alt="" className="w-100" />
                            </div>
                            <div className="social-feed-real-comment">
                                <ul>
                                    <li><i className="fa fa-heart-o" style={{ 'color': '#E00D66' }} aria-hidden="true"></i>&nbsp;&nbsp;2 Likes</li>
                                    <li><i className="fa fa-comment-o" style={{ 'color': '#3E60D1' }} aria-hidden="true"></i>&nbsp;&nbsp;1 Comments</li>
                                    <li><i className="fa fa-share-alt" style={{ 'color': '#247914' }} aria-hidden="true"></i>&nbsp;&nbsp;Share</li>
                                    <li><i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;&nbsp;Save</li>
                                </ul>
                            </div>
                            <div className="replay-section mt-2">
                                <div className="replay-section-img">
                                    <img src="https://images.unsplash.com/photo-1531256456869-ce942a665e80?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                </div>
                                <input type="text" name="" placeholder="Write a comment…" />
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <h3 className="community-title mb-1">Community Calendar</h3>
                        <div className="tabs-header mb-3 community-calendar">
                            <Box>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Today" {...a11yProps(0)} />
                                    <Tab label="Tomorrow" {...a11yProps(1)} />
                                    <Tab label="Week" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <div className="tabs-content">
                                <CustomTabPanel value={value} index={0}>
                                    <div className="tabs-con">
                                        <div className="planner-con">
                                            <div className="mb-1 pb-1 border-bottom">
                                                <span className="float-left">{date}</span>
                                                <span className="float-right"><p className="m-0 primary-color font-w600">
                                                    {time} IST
                                                </p></span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="schudelur">
                                                <div className="schudelur-left ">
                                                    <p className="m-0 pb-1"><span className="font-w600">4:30</span>&nbsp;<small>AM IST</small></p>
                                                    <span><img src="http://localhost:3000/static/media/time.31bea82cf12d5e1f665eceac60112ded.svg" alt="" className="mr-2" style={{ 'width': '15px' }} /><small>60mins</small></span>
                                                </div>
                                                <div className="schudelur-right">
                                                    <p className="font-w600 m-0" style={{ 'color': '#009688' }}>Semi conductor</p>
                                                    <small className="">Assignment Deadline</small>
                                                </div>
                                            </div>

                                            <div className="schudelur">
                                                <div className="schudelur-left " style={{ 'borderColor': '#DE8C0A' }}>
                                                    <p className="m-0 pb-1"><span className="font-w600">5</span>&nbsp;<small>PM IST</small></p>
                                                    <span><img src="http://localhost:3000/static/media/time.31bea82cf12d5e1f665eceac60112ded.svg" alt="" className="mr-2" style={{ 'width': '15px' }} /><small>60mins</small></span>
                                                </div>
                                                <div className="schudelur-right">
                                                    <p className="font-w600 m-0" style={{ 'color': '#DE8C0A' }}>Physics </p>
                                                    <small className="">Assignment Deadline</small>
                                                </div>
                                            </div>
                                            <div className="schudelur">
                                                <div className="schudelur-left " style={{ 'borderColor': '#07547C' }}>
                                                    <p className="m-0 pb-1"><span className="font-w600">7</span>&nbsp;<small>PM IST</small></p>
                                                    <span><img src="http://localhost:3000/static/media/time.31bea82cf12d5e1f665eceac60112ded.svg" alt="" className="mr-2" style={{ 'width': '15px' }} /><small>60mins</small></span>
                                                </div>
                                                <div className="schudelur-right">
                                                    <p className="font-w600 m-0" style={{ 'color': '#07547C' }}>Chemistry</p>
                                                    <small className="">Assignment Deadline</small>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    Item Two
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    Item Three
                                </CustomTabPanel>
                            </div>
                        </div>
                        <div className="baking-new mb-2">
                            <div className="mb-1">
                                <span className="float-left">
                                    <h4>Baking Now</h4>
                                </span>
                                <span className="float-right">
                                    <a href="#" className="primary-color">View All</a>
                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="baking-now-box">
                                <div className="baking-new-item pb-1 mb-2">
                                    <div className="baking-new-item-img">
                                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                    </div>
                                    <div className="baking-new-item-con border-bottom">
                                        <div>
                                            <span className="float-left"><h4>Kishore liked</h4></span>
                                            <span className="float-right">12hrs</span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <p>Your post on chandrayan3</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="baking-new-item pb-1 mb-2">
                                    <div className="baking-new-item-img">
                                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                    </div>
                                    <div className="baking-new-item-con border-bottom">
                                        <div>
                                            <span className="float-left"><h4>Rajashekhar</h4></span>
                                            <span className="float-right">12hrs</span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <p>Followed you</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <div className="baking-new mb-2">
                            <div className="mb-1">
                                <span className="float-left">
                                    <h4>Activities</h4>
                                </span>
                                <span className="float-right">
                                    <a href="#" className="primary-color">View All</a>
                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="baking-now-box">
                                <div className="baking-new-item pb-1 mb-2">
                                    <div className="baking-new-item-img">
                                        <img src="https://t3.ftcdn.net/jpg/01/26/71/54/240_F_126715403_sJ2NXd3B20HN82vLxP0QVq7jVX8yqa4Z.jpg" alt="" />
                                    </div>
                                    <div className="baking-new-item-con border-bottom">
                                        <div>
                                            <h4>Cleaning At Marina Beach</h4>
                                            <p>25/11/2023</p>
                                        </div>

                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="baking-new-item pb-1 mb-2">
                                    <div className="baking-new-item-img">
                                        <img src="https://www.thestatesman.com/wp-content/uploads/2020/08/QT-Hyderabad-Zoo.jpg" alt="" />
                                    </div>
                                    <div className="baking-new-item-con border-bottom">
                                        <div>
                                            <h4>Hyderabad Zoo</h4>
                                            <p>12/12/2023</p>
                                        </div>

                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                            </div>

                        </div>
                        <div className="hashtag-box">
                            <div className="mb-1">
                                <span className="float-left">
                                    <h4>Popular HASHTAG on this day</h4>
                                </span>

                                <div className="clearfix"></div>
                            </div>
                            <div className="hashtag-box-item">
                                <ul>
                                    <li>
                                        <p className="m-0 primary-color">#Chandrayan3</p>
                                        <span>334 are posting about this</span>
                                    </li>
                                    <li>
                                        <p className="m-0 primary-color">#PrayforUkraine</p>
                                        <span>500 are posting about this</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className=""></div>
                    </Grid>
                </Grid>
                <div className="clearfix"></div>
            </div>
        </div>
    );
}