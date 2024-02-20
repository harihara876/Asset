
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import FooterCopyright from 'vridhee_common_component_mf/FooterCopyright';
import Sidebar from './Sidebar';
import configJson from "vridhee_common_component_mf/configJson";
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import AppButton from 'vridhee_common_component_mf/AppButton';
import AppInput from 'vridhee_common_component_mf/AppInput';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BarChart } from '@mui/x-charts/BarChart';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import IDashboard from '../Models/IDashboard';
import DashboardService from '../Services/dashboardservices';

const drawerWidth = 150;
let date = format(new Date(), 'E, dd MMM, yyyy')
// let time = new Date().toLocaleTimeString();
const now = new Date().toLocaleTimeString();

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };

}

interface IActivity {
    activities: IDashboard[]
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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


export default function Activities() {
    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [time, setTime] = useState(now);

    const [activity, setActivity] = useState<IActivity>({
        activities: [] as IDashboard[]
    })

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open1 = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
    const open2 = Boolean(anchorEl1);
    const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl(null);
    };

    const Completed = {
        color: '#165F84',
        data: [2, 3, 1, 4, 5],
        label: 'Completed',
    };
    const Pending = {
        color: '#DE8C0A',
        data: [3, 1, 4, 2, 1],
        label: 'Pending',
    };

    const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
    const open3 = Boolean(anchorEl2);
    const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };


    useEffect(() => {
        setInterval(updatetime, 1000);
    }, []);

    function updatetime() {
        const newtime = new Date().toLocaleTimeString();
        setTime(newtime);
    }

    useEffect(() => {
    //     const body = {
    //         "db_metadata": 24,
    //         "user_id": localStorage.getItem('Tokenuserid'),
    //         "sub_id": "659076e408f9b4e59bcf1cb5"
    //     }
    //    DashboardService.getSubmittedAssignments(body)

       const body = {
        // "mnt_usr_id": localStorage.getItem('Tokenuserid'),
        // "sub_id": "659076e408f9b4e59bcf1cb5",
        // "t_id": "655ccfcc2c0be6f68119b9ad" 
        "mnt_usr_id": "6570c55840a5aca8bf6ed4bf",
        "sub_id": "65902f2c08f9b4e59bcf1311",
        "t_id": "65902f4e08f9b4e59bcf1341"    
        }
       DashboardService.getAssignments(body)
           .then(res => {
            console.log(res.data.details, "getAssignments")
               if (res.data.status == 200) {
                var newData: any = res.data.details.map((data: any) => {
                    data.last_sub_dt =  new Date(data?.last_sub_dt).toLocaleDateString()?.split(',')[0]
                    //   data.last_sub_dt =  data?.last_sub_dt?.split('T')[0]
                    //   data.last_sub_dt = `${data?.last_sub_dt.getDate()}/${data?.last_sub_dt.getMonth() + 1}/${data?.last_sub_dt.getFullYear()}`;
                    return data;
                  });
                  console.log(newData,"newData")
                   setActivity({
                    ...activity, activities: newData
                })
               } else {
                   // toast.error(res.data.message)
               }
           })
           .catch(e =>
               console.log(e, "e")
           );
       // empty dependency array means this effect will only run once (like componentDidMount in classes)
   }, [])


   const { activities } = activity;

    return (
        <div>
            <div className="dashboard-sec">
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <CssBaseline />
                        <AppBar position="fixed" open={open}>
                            <HeaderCurriculum module="Curriculum"/>
                        </AppBar>
                        <Drawer
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                            variant="persistent"
                            anchor="left"
                            open={open}
                        >
                            <Sidebar />
                        </Drawer>
                    </Box>
                    <Main open={open}>
                        <div className="curriculum-page">
                            <div className="breadcrumbs-sec">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link color="#174392" to="/dashboard">Dashboard</Link>
                                    <Typography color="#62676C">Activities</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="activities-section">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={9}>
                                        <div className="activities-section-box">
                                            <h4 className="border-bottom activities-section-title">Activities</h4>

                                            <div className="search-activies">
                                                <div className="search-box">
                                                    <div className="form-group">
                                                        <AppInput type="text" label="Search here..." selectStyle="w-100" name="Search here..." radius="5px" value={name}
                                                            placeholder="Search Assignment or activity" />
                                                    </div>
                                                    <div className="search-icon1">
                                                        <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/search1.svg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="search-activies-date">
                                                    <div className="date-activities">
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker />
                                                        </LocalizationProvider>
                                                    </div>
                                                    <div className="filter-activities">
                                                        <Button
                                                            id="fade-button"
                                                            aria-controls={open1 ? 'fade-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open1 ? 'true' : undefined}
                                                            onClick={handleClick}
                                                        >
                                                            Filter&nbsp;<img src="http://localhost:3000/static/media/filter.f4da81e38619c3641b50b43e2608a815.svg" alt="" />
                                                        </Button>
                                                        <Menu
                                                            id="fade-menu"
                                                            MenuListProps={{
                                                                'aria-labelledby': 'fade-button',
                                                            }}
                                                            anchorEl={anchorEl}
                                                            open={open1}
                                                            onClose={handleClose}
                                                            TransitionComponent={Fade}
                                                        >
                                                            <MenuItem onClick={handleClose}>Completed</MenuItem>
                                                            <MenuItem onClick={handleClose}>Not Submitted</MenuItem>
                                                            <MenuItem onClick={handleClose}>Not Completed</MenuItem>
                                                            <MenuItem onClick={handleClose}>Not Started</MenuItem>
                                                        </Menu>

                                                    </div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>

                                                {/* <div className="activities-item mb-4">
                                                    <div className="circle60" style={{ 'color': '#5A0092' }}>AS</div>
                                                    <div className="activities-item-content">
                                                        <h4 style={{ 'color': '#5A0092' }}>Submit your Maths Assignment</h4>
                                                        <div><img src="" alt="" />&nbsp;<small>By: Alfredo Rhiel Madsen</small></div>
                                                        <p className="m-0">After solving problems with addition and subtraction, multiplication…</p>
                                                    </div>
                                                    <div className="activities-item-right text-right">
                                                        <div className=""><p><span><i className="fa fa-calendar-o" aria-hidden="true"></i>&nbsp;6/23/2023</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;30 Comments</span></p></div>
                                                        <a href="activities-result"><AppButton children="Result" styleClass=' btn result-btn text-white' /></a>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                    <div className="activities-item-bottom">
                                                        <div className="float-left">
                                                            <div className="doc-ref mr-2"><img src="http://localhost:3000/static/media/attach_file.0b8cb529d1bc70730b5df7eb541f3a1f.svg" alt="" />Document01.pdf</div>
                                                            <div className="doc-ref"><img src="http://localhost:3000/static/media/attach_file.0b8cb529d1bc70730b5df7eb541f3a1f.svg" alt="" />Document01.pdf</div>
                                                        </div>
                                                        <div className="float-right">
                                                            <div className="top-rankers">
                                                                <span className="mr-2">Top Rankers:</span>
                                                                <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 1</span>
                                                                <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 2</span>
                                                                <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 3</span> 
                                                            </div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div> */}
                                             
                                                {/* <div className="activities-item mb-4">
                                                    <div className="circle60" style={{ 'color': '#9F4706' }}>CP</div>
                                                    <div className="activities-item-content">
                                                        <h4 style={{ 'color': '#9F4706' }}>Chapter 5 Physics Class Test</h4>
                                                        <div><img src="" alt="" />&nbsp;<small>By: Alfredo Rhiel Madsen</small></div>
                                                        <p className="m-0">After solving problems with addition and subtraction, multiplication…</p>
                                                    </div>
                                                    <div className="activities-item-right text-right">
                                                        <div className=""><p><span><i className="fa fa-calendar-o" aria-hidden="true"></i>&nbsp;6/23/2023</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;30 Comments</span></p></div>
                                                        <AppButton children="Submit" styleClass='btn submit-btn text-white pl-2 pr-2 text-white' />
                                                    </div>
                                                    <div className="clearfix"></div>
                                                    <div className="activities-item-bottom">
                                                        <div className="float-left">
                                                            <div className="doc-ref mr-2"><img src="http://localhost:3000/static/media/attach_file.0b8cb529d1bc70730b5df7eb541f3a1f.svg" alt="" />Document01.pdf</div>
                                                            <div className="doc-ref"><img src="http://localhost:3000/static/media/attach_file.0b8cb529d1bc70730b5df7eb541f3a1f.svg" alt="" />Document01.pdf</div>
                                                        </div>
                                                        <div className="float-right">
                                                            <div className="top-rankers">
                                                                <span className="mr-2">Top Rankers:</span>
                                                              <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 1</span>
                                                                <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 2</span>
                                                                <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 3</span> 
                                                            </div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div> */}

                                            <div className="mt-3">
                                            {activities.map((activitydata: IDashboard, i) =>
                                                <div className="activities-item mb-4">
                                                <div className="circle60" style={{ 'color': '#257104' }}>CP</div>
                                                <div className="activities-item-content">
                                                    <h4 style={{ 'color': '#257104' }}>
                                                        {activitydata?.name}
                                                        {/* Chapter 5 Physics Class Test */}
                                                        </h4>
                                                    <div><img src="" alt="" />&nbsp;<small>
                                                    By: {activitydata?.userName}
                                                        {/* By: Alfredo Rhiel Madsen */}
                                                        </small></div>
                                                    <p className="m-0">
                                                    {activitydata?.a_text}
                                                        {/* After solving problems with addition and subtraction, multiplication… */}
                                                        </p>
                                                </div>
                                                <div className="activities-item-right text-right">
                                                    <div className=""><p><span><i className="fa fa-calendar-o" aria-hidden="true"></i>&nbsp;
                                                    {activitydata?.last_sub_dt}
                                                   
                                                    {/* {new Date(parseInt(activitydata?.last_sub_dt, 10)).toLocaleDateString('en-US', 'en-US', {year: 'numeric', month: '2-digit',day: '2-digit'})}/ */}
                                                    {/* 6/23/2023 */}
                                                    </span>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    {/* <span><i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;30 Comments</span> */}
                                                    </p></div>
                                                    <a href="assignment-submission">
                                                        <AppButton children="Start" styleClass='btn primary-bg text-white pl-2 pr-2 text-white' />
                                                    </a>
                                                </div>
                                                <div className="clearfix"></div>
                                                <div className="activities-item-bottom">
                                                    <div className="float-left">
                                                        {/* <div className="doc-ref mr-2"><img src="http://localhost:3000/static/media/attach_file.0b8cb529d1bc70730b5df7eb541f3a1f.svg" alt="" />Document01.pdf</div> */}
                                                        {/* <div className="doc-ref"><img src="http://localhost:3000/static/media/attach_file.0b8cb529d1bc70730b5df7eb541f3a1f.svg" alt="" />Document01.pdf</div> */}
                                                    </div>
                                                    <div className="float-right">
                                                        <div className="top-rankers">
                                                            {/* <span className="mr-2">Top Rankers:</span> */}
                                                             {/* <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 1</span>
                                                            <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 2</span>
                                                            <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 3</span>  */}
                                                        </div>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            )}
                                                <div className="show-more-activities">
                                                    <AppButton children="Show More" styleClass='btn show-more-btn w-100 pl-2 pr-2' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="activities-section-box mt-2">
                                            <h4 className="border-bottom activities-section-title">Your Buddy Assignment Requests</h4>
                                            <div className="activities-item">
                                                <div className="circle60" style={{ 'color': '#5A0092' }}>AS</div>
                                                <div className="activities-item-content">
                                                    <h4 style={{ 'color': '#5A0092' }}>Submit your Maths Assignment</h4>
                                                    <div><img src="" alt="" />&nbsp;<small>By: Alfredo Rhiel Madsen</small></div>
                                                    <p className="m-0">After solving problems with addition and subtraction, multiplication…</p>
                                                </div>
                                                <div className="activities-item-right text-right">
                                                    <div className=""><p><span><i className="fa fa-calendar-o" aria-hidden="true"></i>&nbsp;6/23/2023</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span><i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;30 Comments</span>
                                                    </p></div>
                                                    <AppButton children="Start Evalution" styleClass=' btn w-auto pl-2 pr-2 primary-bg text-white' />
                                                </div>
                                                <div className="clearfix"></div>
                                                <div className="activities-item-bottom">
                                                    <div className="float-left">
                                                        <div className="doc-ref mr-2"><img src="http://localhost:3000/static/media/attach_file.0b8cb529d1bc70730b5df7eb541f3a1f.svg" alt="" />Document01.pdf</div>
                                                        <div className="doc-ref"><img src="http://localhost:3000/static/media/attach_file.0b8cb529d1bc70730b5df7eb541f3a1f.svg" alt="" />Document01.pdf</div>
                                                    </div>
                                                    <div className="float-right">
                                                        <div className="top-rankers">
                                                            <span className="mr-2">Top Rankers:</span>
                                                            {/* <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 1</span>
                                                            <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 2</span>
                                                            <span className="top-rankers-number"><img src={`${assetUrl}/curriculim/img%20Event%20add%20student.svg`} alt="" />Rank 3</span> */}
                                                        </div>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3}>
                                        <div className="activeties-rightside">
                                            <div className="tabs-header mb-3">
                                                {/* <div className="tabs-header mb-3 community-calendar">
                                            <div className="tabs-header mb-3 community-calendar"> */}
                                                <Box>
                                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                        <Tab label="Today" {...a11yProps(0)} />
                                                        <Tab label="Tomorrow" {...a11yProps(1)} />
                                                        <Tab label="Week" {...a11yProps(2)} />
                                                    </Tabs>
                                                </Box>
                                                <div className="tabs-content">
                                                    <CustomTabPanel value={value} index={0}>
                                                        {/* <div className="tabs-con"> */}
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
                                                        {/* </div> */}
                                                    </CustomTabPanel>
                                                    <CustomTabPanel value={value} index={1}>
                                                        Item Two
                                                    </CustomTabPanel>
                                                    <CustomTabPanel value={value} index={2}>
                                                        Item Three
                                                    </CustomTabPanel>
                                                    {/* </div>
                        </div> */}
                                                </div>
                                                {/* <Box>
                                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                        <Tab label="Today" {...a11yProps(0)} />
                                                        <Tab label="Tomorrow" {...a11yProps(1)} />
                                                        <Tab label="Week" {...a11yProps(2)} />
                                                    </Tabs>
                                                </Box> */}
                                                {/* <div className="tabs-content">
                                                    <CustomTabPanel value={value} index={0}>
                                                        <div className="tabs-con">
                                                            <div className="planner-con">
                                                                <div className="mb-1 pb-1 border-bottom">
                                                                    <span className="float-left">Sat,17 June, 2023</span>
                                                                    <span className="float-right"><p className="m-0 primary-color font-w600">03:33:51 PM IST</p></span>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left ">
                                                                        <p className="m-0 pb-1"><span className="font-w600">10</span>&nbsp;<small>AM IST</small></p>
                                                                        <span><img src="http://localhost:3000/static/media/time.31bea82cf12d5e1f665eceac60112ded.svg" alt="" className="mr-2" style={{ 'width': '15px' }} /><small>60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#009688' }}>UI & Web Design using Adobe Illustrator CC</p>
                                                                        <small className="">Assignment Deadline</small>
                                                                    </div>
                                                                </div>

                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#DE8C0A' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">10</span>&nbsp;<small>AM IST</small></p>
                                                                        <span><img src="http://localhost:3000/static/media/time.31bea82cf12d5e1f665eceac60112ded.svg" alt="" className="mr-2" style={{ 'width': '15px' }} /><small>60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#DE8C0A' }}>UI & Web Design using Adobe Illustrator CC</p>
                                                                        <small className="">Assignment Deadline</small>
                                                                    </div>
                                                                </div>
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#07547C' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">10</span>&nbsp;<small>AM IST</small></p>
                                                                        <span><img src="http://localhost:3000/static/media/time.31bea82cf12d5e1f665eceac60112ded.svg" alt="" className="mr-2" style={{ 'width': '15px' }} /><small>60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#07547C' }}>UI & Web Design using Adobe Illustrator CC</p>
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
                                                </div> */}
                                            </div>

                                        </div>
                                        <div className="streak-chart">
                                            <div>
                                                <span className="float-left"><h4>Completion Streak</h4></span>
                                                <span className="float-right">
                                                    <IconButton
                                                        aria-label="more"
                                                        id="long-button"
                                                        aria-controls={open ? 'long-menu' : undefined}
                                                        aria-expanded={open ? 'true' : undefined}
                                                        aria-haspopup="true"
                                                        onClick={handleClick2}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl2}
                                                        open={open3}
                                                        onClose={handleClose2}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={handleClose}>This Week</MenuItem>
                                                        <MenuItem onClick={handleClose}>Prev Week</MenuItem>
                                                        <MenuItem onClick={handleClose}>Up Coming</MenuItem>
                                                    </Menu>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="chart-activities">
                                                <BarChart
                                                    width={350}
                                                    height={300}
                                                    series={[
                                                        { ...Completed, stack: 'total' },
                                                        { ...Pending, stack: 'total' },

                                                    ]}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Main>

                </Box>
                <div className="footer">
                    <FooterCopyright />
                </div>

            </div>

        </div>
    );
}

