
import React from "react";
import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "react-multi-carousel/lib/styles.css";
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import FooterCopyright from 'vridhee_common_component_mf/FooterCopyright';
import AppInput from 'vridhee_common_component_mf/AppInput';
import Dropdown from "vridhee_common_component_mf/Dropdown";
import AppBar from "@material-ui/core/AppBar";
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import TablePagination from "@material-ui/core/TablePagination";
import configJson from "vridhee_common_component_mf/configJson";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import Modal from "@mui/material/Modal";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AppButton from 'vridhee_common_component_mf/AppButton';


const drawerWidth = 150;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
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

function FacebookCircularProgress(props: CircularProgressProps) {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </Box>
    );
}



export default function TODO() {
    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
    const handleChange1 = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };

    }
    const options = [
        { label: "Male", name: 'Male' },
        { label: "Female", name: 'Female' },
        { label: "Others", name: 'Others' }
    ];

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));
    const [openModel, setOpenModel] = React.useState(false);
    const handleOpen = () => setOpenModel(true);
    const handleClose = () => setOpenModel(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '1px solid #00439224',
        boxShadow: 24,
        p: 2,
    };
    const [age, setAge] = React.useState('');

    const handleChangeF = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };
    

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
                                    <Link color="#174392" to="/dashboard">
                                        Dashboard
                                    </Link>
                                    <Typography color="#62676C">TO DO</Typography>
                                </Breadcrumbs>
                            </div>

                            <div className="todo-search mt-3">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <div className="search-box">
                                            <div className="form-group">
                                                <AppInput type="text" label="Search here..." selectStyle="w-100" name="Search here..." radius="5px" value={name}
                                                    placeholder="Search here..." />
                                            </div>
                                            <div className="search-icon1">
                                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/search1.svg" alt="" />
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <div className="search-box">
                                            <div className="w-20 sortby">
                                                Sort By
                                            </div>
                                            <div className="w-80">
                                                <div className="form-group">
                                                    <Dropdown
                                                        id="sort"
                                                        name="gender"
                                                        options={options}
                                                        title="Sort by" selectStyle="w-100"
                                                    />
                                                    {/* <img src={`${assetUrl}/gender.svg`} alt="" /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <div className="toggle-tabs-btn">

                                            <Box>
                                                <Tabs value={value} onChange={handleChange1} aria-label="basic tabs content-example">
                                                    <Tab label="Board View" {...a11yProps(0)} />
                                                    <Tab label="List View" {...a11yProps(1)} />
                                                </Tabs>

                                            </Box>

                                        </div>
                                    </Grid>
                                </Grid>
                                <div className="clearfix"></div>
                            </div>

                            <div className="doto-track">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <div className='doto-track-box'>
                                            <h4 className="font-w500">Total Tracked Time</h4>
                                            <h3 className="primary-color">4:51:39 hrs</h3>
                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/time1.svg" alt="" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <div className='doto-track-box borderColor1'>
                                            <h4 className="font-w500">Productivity</h4>
                                            <h3 style={{ 'color': '#149D7C' }}>89%</h3>
                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/chart.svg" alt="" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <div className='doto-track-box borderColor2'>
                                            <h4 className="font-w500">Due Dates</h4>
                                            <h3 style={{ 'color': '#FF4F28' }}>3</h3>
                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/due-date.svg" alt="" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <div className='doto-track-box borderColor3'>
                                            <h4 className="font-w500">Attachments</h4>
                                            <h3 style={{ 'color': '#5F28CD' }}>30</h3>
                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/attachment.svg" alt="" />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            
                            <div className="tabs-content-todo">
                                <CustomTabPanel value={value} index={0}>
                                    <div className="gridview">
                                        <div className="todo-list ">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4}>
                                                    <div className="todo-box">
                                                        <div className="doto-list-title">
                                                            <span className="float-left">
                                                                <h4><span className="circle"></span>&nbsp;To Do &nbsp;<span className="circle-white primary-color">5</span></h4>

                                                            </span>
                                                            <span className="float-right primary-color font-w600" data-toggle="modal" data-target="#taskNew" onClick={handleOpen}>
                                                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/add1.svg" width={20} alt="" />&nbsp;&nbsp;<small className="font-w600">Add New Task</small>
                                                            </span>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="height1">
                                                            <div className="doto-list-box">
                                                                <button type="button" className="btn assign-btn">Assignment</button>
                                                                <h4>Introduction to Semi conductor</h4>
                                                                <p className="m-0">Explore the difference between n-type and p-type semiconductors and their significance in device fabrication.</p>
                                                                <div className="progress-todo">
                                                                    <div className="mt-2">
                                                                        <span className="float-left">
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/list.svg" alt="" style={{ width: '20px' }} />&nbsp;&nbsp;Progress
                                                                        </span>
                                                                        <span className="float-right font-w600" style={{ color: '#BC423B' }}>4/10</span>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                    <div className="progress mt-1">

                                                                        <Box sx={{ flexGrow: 1 }}>

                                                                            <BorderLinearProgress variant="determinate" value={50} />
                                                                        </Box>
                                                                    </div>
                                                                    <div className='todo0date'>
                                                                        <span className='float-left'>
                                                                            <h4><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ 'width': '25px' }} />&nbsp;&nbsp;July 6th, 2023</h4>
                                                                        </span>
                                                                        <span className='float-right' style={{ 'position': 'relative', 'top': '9px' }}>
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/chat.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">10</span>, <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/attachment1.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">2</span>
                                                                        </span>
                                                                        <div className='clearfix'></div>
                                                                    </div>
                                                                    <div className="todo-completed mt-2">
                                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAABHNCSVQICAgIfAhkiAAAA39JREFUWEftWN1R20AQ3pN5Dx3EqSCkgshW3sEVBAqwDRUEKrAlCsBUAHmPjakAUwFOBcHvSMvunS2dpJPuDGKGyXAPDPKddvfbv29PAt5qBeFPEn0MIPaUClzQnzFMh5dvoVI0LtQf7UKrdUVy/QrZc4jjHsxPHpvU3TyQIGIQBxYjr2E66L1fIME5AUAGki2Ev/JBwOe84aIH0/51U2CajUgQkmFif23cCoQ4gD/9uXz+ce4DIhv+aV0zv6lebJFzxtkwkAhTzQhHMBtMcpZ0o0OKzEX623TQmP7GBK09fmM1MtDACtFJI+bse/PBDyAlv6ga+A8iwsj0tHk3NcLEJlpfpedvBrdOKax3LcRH8LxermslyRV1st2tu1Yn+i7fwfi+ikjNNcJ8gMmFpnQBcdKxsnExvaRyXEojhGjnnOFS6HJK8Chd12MOO0d4Ryb+KQPxR20aMR4MEZgTG3eskQlCarmC56yahW4cEkRcc35JUBx/IacqB61XGUg3HJP3hkYr4vgbCeDhr37VgUG4hSQ+sEbXH+2RQ++MihBDmA1pIK0FEs2JtFROFpepgKsgMfkBMAGu8xvu6XlcIsm693Xy1M+xM2aDXKQMEWkIiC1qtv3iFLA9kAZSy2aky/6rU6uq2A3hLNnTCffloCigTXu50Gdn6YKFYgECqXlYLlndiuxwKnbWqMbxCf2nJlWk/E5i31ig3CK9HWoOyXHWrl1cznKpnYKYkOyzatktrlnFZwArOn/o1n43NrCBOzvqmroZxYv2cfg9j0mOI/DyxYASyVPmjsj8xOvpabEdIbqYxMJzTF14iVPRtKo6oop8efR3sYXOlLuWzHNvj3JYeWGz9Hs215Hn3RVSaUWpQmmSTKxcoyJJrZnSJL1oMRAZGeaqZapXkWK2UFCqJctifWVAgnBIHjk15jlfV2eDdiY8dxNkA0Iy4NRKckXvyvryWKdGwAXW70bUGNIa0QBxfXnES/0z/lEB6UY0VxF5VS68JA+offWV5J8mMdurFlC/U5wE9K5UN2mwVIQJOflIEAjqNjCq1YR4RiPBqTyjf2AoRuqlQJQzl9kHCu3DRDfkiP2qtw9OCEj4YO06OhBdsAu3uILTOaNKX5UsmrBF7jJUfTCLSA4Ij9VEbk0sxHbqUB2I6Wpg0Pc6IE0AMMn4AGLz7LY5a5Nn239BRJ4B5jfQdFpfapMAAAAASUVORK5CYII=" alt="" /><p className="mb-0 font-w600">10 <small>Completed</small></p>
                                                                    </div>
                                                                </div>
                                                            </div> {/*boxend here */}
                                                            <div className="doto-list-box">
                                                                <button type="button" className="btn violet-btn">Group Study</button>
                                                                <h4>Altering the Semiconductor Landscape</h4>
                                                                <p className="m-0">Altering the Semiconductor Landscape</p>
                                                                <div className="progress-todo">
                                                                    <div className="mt-2">
                                                                        <span className="float-left">
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/list.svg" alt="" style={{ width: '20px' }} />&nbsp;&nbsp;Progress
                                                                        </span>
                                                                        <span className="float-right font-w600" style={{ color: '#BC423B' }}>4/10</span>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                    <div className="progress mt-1">
                                                                        <Box sx={{ flexGrow: 1 }}>

                                                                            <BorderLinearProgress variant="determinate" value={50} />
                                                                        </Box>
                                                                    </div>
                                                                    <div className='todo0date'>
                                                                        <span className='float-left'>
                                                                            <h4><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ 'width': '25px' }} />&nbsp;&nbsp;July 6th, 2023</h4>
                                                                        </span>
                                                                        <span className='float-right' style={{ 'position': 'relative', 'top': '9px' }}>
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/chat.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">10</span>, <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/attachment1.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">2</span>
                                                                        </span>
                                                                        <div className='clearfix'></div>
                                                                    </div>
                                                                    <div className="todo-completed mt-2">
                                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAABHNCSVQICAgIfAhkiAAAA39JREFUWEftWN1R20AQ3pN5Dx3EqSCkgshW3sEVBAqwDRUEKrAlCsBUAHmPjakAUwFOBcHvSMvunS2dpJPuDGKGyXAPDPKddvfbv29PAt5qBeFPEn0MIPaUClzQnzFMh5dvoVI0LtQf7UKrdUVy/QrZc4jjHsxPHpvU3TyQIGIQBxYjr2E66L1fIME5AUAGki2Ev/JBwOe84aIH0/51U2CajUgQkmFif23cCoQ4gD/9uXz+ce4DIhv+aV0zv6lebJFzxtkwkAhTzQhHMBtMcpZ0o0OKzEX623TQmP7GBK09fmM1MtDACtFJI+bse/PBDyAlv6ga+A8iwsj0tHk3NcLEJlpfpedvBrdOKax3LcRH8LxermslyRV1st2tu1Yn+i7fwfi+ikjNNcJ8gMmFpnQBcdKxsnExvaRyXEojhGjnnOFS6HJK8Chd12MOO0d4Ryb+KQPxR20aMR4MEZgTG3eskQlCarmC56yahW4cEkRcc35JUBx/IacqB61XGUg3HJP3hkYr4vgbCeDhr37VgUG4hSQ+sEbXH+2RQ++MihBDmA1pIK0FEs2JtFROFpepgKsgMfkBMAGu8xvu6XlcIsm693Xy1M+xM2aDXKQMEWkIiC1qtv3iFLA9kAZSy2aky/6rU6uq2A3hLNnTCffloCigTXu50Gdn6YKFYgECqXlYLlndiuxwKnbWqMbxCf2nJlWk/E5i31ig3CK9HWoOyXHWrl1cznKpnYKYkOyzatktrlnFZwArOn/o1n43NrCBOzvqmroZxYv2cfg9j0mOI/DyxYASyVPmjsj8xOvpabEdIbqYxMJzTF14iVPRtKo6oop8efR3sYXOlLuWzHNvj3JYeWGz9Hs215Hn3RVSaUWpQmmSTKxcoyJJrZnSJL1oMRAZGeaqZapXkWK2UFCqJctifWVAgnBIHjk15jlfV2eDdiY8dxNkA0Iy4NRKckXvyvryWKdGwAXW70bUGNIa0QBxfXnES/0z/lEB6UY0VxF5VS68JA+offWV5J8mMdurFlC/U5wE9K5UN2mwVIQJOflIEAjqNjCq1YR4RiPBqTyjf2AoRuqlQJQzl9kHCu3DRDfkiP2qtw9OCEj4YO06OhBdsAu3uILTOaNKX5UsmrBF7jJUfTCLSA4Ij9VEbk0sxHbqUB2I6Wpg0Pc6IE0AMMn4AGLz7LY5a5Nn239BRJ4B5jfQdFpfapMAAAAASUVORK5CYII=" alt="" /><p className="mb-0 font-w600">10 <small>Completed</small></p>
                                                                    </div>
                                                                </div>
                                                            </div> {/*boxend here */}
                                                            <div className="doto-list-box">
                                                                <button type="button" className="btn light-violet-btn">Class Project</button>
                                                                <h4>PN Junctions and Diodes</h4>
                                                                <p className="m-0">Understand the distinctions between valence bands, conduction bands, and band gaps.</p>
                                                                <div className="progress-todo">
                                                                    <div className="mt-2">
                                                                        <span className="float-left">
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/list.svg" alt="" style={{ width: '20px' }} />&nbsp;&nbsp;Progress
                                                                        </span>
                                                                        <span className="float-right font-w600" style={{ color: '#BC423B' }}>4/10</span>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                    <div className="progress mt-1">
                                                                        <Box sx={{ flexGrow: 1 }}>

                                                                            <BorderLinearProgress variant="determinate" value={50} />
                                                                        </Box>
                                                                    </div>
                                                                    <div className='todo0date'>
                                                                        <span className='float-left'>
                                                                            <h4><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ 'width': '25px' }} />&nbsp;&nbsp;July 6th, 2023</h4>
                                                                        </span>
                                                                        <span className='float-right' style={{ 'position': 'relative', 'top': '9px' }}>
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/chat.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">10</span>, <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/attachment1.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">2</span>
                                                                        </span>
                                                                        <div className='clearfix'></div>
                                                                    </div>
                                                                    <div className="todo-completed mt-2">
                                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAABHNCSVQICAgIfAhkiAAAA39JREFUWEftWN1R20AQ3pN5Dx3EqSCkgshW3sEVBAqwDRUEKrAlCsBUAHmPjakAUwFOBcHvSMvunS2dpJPuDGKGyXAPDPKddvfbv29PAt5qBeFPEn0MIPaUClzQnzFMh5dvoVI0LtQf7UKrdUVy/QrZc4jjHsxPHpvU3TyQIGIQBxYjr2E66L1fIME5AUAGki2Ev/JBwOe84aIH0/51U2CajUgQkmFif23cCoQ4gD/9uXz+ce4DIhv+aV0zv6lebJFzxtkwkAhTzQhHMBtMcpZ0o0OKzEX623TQmP7GBK09fmM1MtDACtFJI+bse/PBDyAlv6ga+A8iwsj0tHk3NcLEJlpfpedvBrdOKax3LcRH8LxermslyRV1st2tu1Yn+i7fwfi+ikjNNcJ8gMmFpnQBcdKxsnExvaRyXEojhGjnnOFS6HJK8Chd12MOO0d4Ryb+KQPxR20aMR4MEZgTG3eskQlCarmC56yahW4cEkRcc35JUBx/IacqB61XGUg3HJP3hkYr4vgbCeDhr37VgUG4hSQ+sEbXH+2RQ++MihBDmA1pIK0FEs2JtFROFpepgKsgMfkBMAGu8xvu6XlcIsm693Xy1M+xM2aDXKQMEWkIiC1qtv3iFLA9kAZSy2aky/6rU6uq2A3hLNnTCffloCigTXu50Gdn6YKFYgECqXlYLlndiuxwKnbWqMbxCf2nJlWk/E5i31ig3CK9HWoOyXHWrl1cznKpnYKYkOyzatktrlnFZwArOn/o1n43NrCBOzvqmroZxYv2cfg9j0mOI/DyxYASyVPmjsj8xOvpabEdIbqYxMJzTF14iVPRtKo6oop8efR3sYXOlLuWzHNvj3JYeWGz9Hs215Hn3RVSaUWpQmmSTKxcoyJJrZnSJL1oMRAZGeaqZapXkWK2UFCqJctifWVAgnBIHjk15jlfV2eDdiY8dxNkA0Iy4NRKckXvyvryWKdGwAXW70bUGNIa0QBxfXnES/0z/lEB6UY0VxF5VS68JA+offWV5J8mMdurFlC/U5wE9K5UN2mwVIQJOflIEAjqNjCq1YR4RiPBqTyjf2AoRuqlQJQzl9kHCu3DRDfkiP2qtw9OCEj4YO06OhBdsAu3uILTOaNKX5UsmrBF7jJUfTCLSA4Ij9VEbk0sxHbqUB2I6Wpg0Pc6IE0AMMn4AGLz7LY5a5Nn239BRJ4B5jfQdFpfapMAAAAASUVORK5CYII=" alt="" /><p className="mb-0 font-w600">10 <small>Completed</small></p>
                                                                    </div>
                                                                </div>
                                                            </div> {/*boxend here */}
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <div className="in-progress-sec">
                                                        <div className="doto-list-title">
                                                            <span className="float-left">
                                                                <h4><span className="circle"></span>&nbsp;In Progress &nbsp;<span className="circle-white primary-color">5</span></h4>
                                                                <span className="" ></span>
                                                            </span>
                                                            <span className="float-right primary-color font-w600"  onClick={handleOpen}>
                                                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/add1.svg" width={20} alt="" />&nbsp;&nbsp;<small className="font-w600">Add New Task</small>
                                                            </span>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="height1">
                                                            <div className="doto-list-box in-progress-box">
                                                                <button type="button" className="btn violet-btn">Group Study</button>
                                                                <h4>Semiconductor Materials and Band Theory</h4>
                                                                <p className="m-0">Discover how semiconductors revolutionised the electronics industry through their compactness and versatility.</p>
                                                                <div className="progress-todo">
                                                                    <div className="mt-2">
                                                                        <span className="float-left">
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/list.svg" alt="" style={{ width: '20px' }} />&nbsp;&nbsp;Progress
                                                                        </span>
                                                                        <span className="float-right font-w600" style={{ color: '#BC423B' }}>4/10</span>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                    <div className="progress mt-1">
                                                                        <Box sx={{ flexGrow: 1 }}>

                                                                            <BorderLinearProgress variant="determinate" value={50} />
                                                                        </Box>
                                                                    </div>
                                                                    <div className='todo0date'>
                                                                        <span className='float-left'>
                                                                            <h4><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ 'width': '25px' }} />&nbsp;&nbsp;July 6th, 2023</h4>
                                                                        </span>
                                                                        <span className='float-right' style={{ 'position': 'relative', 'top': '9px' }}>
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/chat.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">10</span>, <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/attachment1.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">2</span>
                                                                        </span>
                                                                        <div className='clearfix'></div>
                                                                    </div>
                                                                    <div className="todo-completed mt-2">
                                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAABHNCSVQICAgIfAhkiAAAA39JREFUWEftWN1R20AQ3pN5Dx3EqSCkgshW3sEVBAqwDRUEKrAlCsBUAHmPjakAUwFOBcHvSMvunS2dpJPuDGKGyXAPDPKddvfbv29PAt5qBeFPEn0MIPaUClzQnzFMh5dvoVI0LtQf7UKrdUVy/QrZc4jjHsxPHpvU3TyQIGIQBxYjr2E66L1fIME5AUAGki2Ev/JBwOe84aIH0/51U2CajUgQkmFif23cCoQ4gD/9uXz+ce4DIhv+aV0zv6lebJFzxtkwkAhTzQhHMBtMcpZ0o0OKzEX623TQmP7GBK09fmM1MtDACtFJI+bse/PBDyAlv6ga+A8iwsj0tHk3NcLEJlpfpedvBrdOKax3LcRH8LxermslyRV1st2tu1Yn+i7fwfi+ikjNNcJ8gMmFpnQBcdKxsnExvaRyXEojhGjnnOFS6HJK8Chd12MOO0d4Ryb+KQPxR20aMR4MEZgTG3eskQlCarmC56yahW4cEkRcc35JUBx/IacqB61XGUg3HJP3hkYr4vgbCeDhr37VgUG4hSQ+sEbXH+2RQ++MihBDmA1pIK0FEs2JtFROFpepgKsgMfkBMAGu8xvu6XlcIsm693Xy1M+xM2aDXKQMEWkIiC1qtv3iFLA9kAZSy2aky/6rU6uq2A3hLNnTCffloCigTXu50Gdn6YKFYgECqXlYLlndiuxwKnbWqMbxCf2nJlWk/E5i31ig3CK9HWoOyXHWrl1cznKpnYKYkOyzatktrlnFZwArOn/o1n43NrCBOzvqmroZxYv2cfg9j0mOI/DyxYASyVPmjsj8xOvpabEdIbqYxMJzTF14iVPRtKo6oop8efR3sYXOlLuWzHNvj3JYeWGz9Hs215Hn3RVSaUWpQmmSTKxcoyJJrZnSJL1oMRAZGeaqZapXkWK2UFCqJctifWVAgnBIHjk15jlfV2eDdiY8dxNkA0Iy4NRKckXvyvryWKdGwAXW70bUGNIa0QBxfXnES/0z/lEB6UY0VxF5VS68JA+offWV5J8mMdurFlC/U5wE9K5UN2mwVIQJOflIEAjqNjCq1YR4RiPBqTyjf2AoRuqlQJQzl9kHCu3DRDfkiP2qtw9OCEj4YO06OhBdsAu3uILTOaNKX5UsmrBF7jJUfTCLSA4Ij9VEbk0sxHbqUB2I6Wpg0Pc6IE0AMMn4AGLz7LY5a5Nn239BRJ4B5jfQdFpfapMAAAAASUVORK5CYII=" alt="" /><p className="mb-0 font-w600">10 <small>Completed</small></p>
                                                                    </div>
                                                                </div>
                                                            </div> {/*boxend here */}
                                                            <div className="doto-list-box in-progress-box">
                                                                <button type="button" className="btn livese-btn">Live Session</button>
                                                                <h4>Altering the Semiconductor Landscape</h4>
                                                                <p className="m-0">Altering the Semiconductor Landscape</p>
                                                                <div className="progress-todo">
                                                                    <div className="mt-2">
                                                                        <span className="float-left">
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/list.svg" alt="" style={{ width: '20px' }} />&nbsp;&nbsp;Progress
                                                                        </span>
                                                                        <span className="float-right font-w600" style={{ color: '#BC423B' }}>4/10</span>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                    <div className="progress mt-1">
                                                                        <Box sx={{ flexGrow: 1 }}>

                                                                            <BorderLinearProgress variant="determinate" value={50} />
                                                                        </Box>
                                                                    </div>
                                                                    <div className='todo0date'>
                                                                        <span className='float-left'>
                                                                            <h4><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ 'width': '25px' }} />&nbsp;&nbsp;July 6th, 2023</h4>
                                                                        </span>
                                                                        <span className='float-right' style={{ 'position': 'relative', 'top': '9px' }}>
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/chat.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">10</span>, <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/attachment1.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">2</span>
                                                                        </span>
                                                                        <div className='clearfix'></div>
                                                                    </div>
                                                                    <div className="todo-completed mt-2">
                                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAABHNCSVQICAgIfAhkiAAAA39JREFUWEftWN1R20AQ3pN5Dx3EqSCkgshW3sEVBAqwDRUEKrAlCsBUAHmPjakAUwFOBcHvSMvunS2dpJPuDGKGyXAPDPKddvfbv29PAt5qBeFPEn0MIPaUClzQnzFMh5dvoVI0LtQf7UKrdUVy/QrZc4jjHsxPHpvU3TyQIGIQBxYjr2E66L1fIME5AUAGki2Ev/JBwOe84aIH0/51U2CajUgQkmFif23cCoQ4gD/9uXz+ce4DIhv+aV0zv6lebJFzxtkwkAhTzQhHMBtMcpZ0o0OKzEX623TQmP7GBK09fmM1MtDACtFJI+bse/PBDyAlv6ga+A8iwsj0tHk3NcLEJlpfpedvBrdOKax3LcRH8LxermslyRV1st2tu1Yn+i7fwfi+ikjNNcJ8gMmFpnQBcdKxsnExvaRyXEojhGjnnOFS6HJK8Chd12MOO0d4Ryb+KQPxR20aMR4MEZgTG3eskQlCarmC56yahW4cEkRcc35JUBx/IacqB61XGUg3HJP3hkYr4vgbCeDhr37VgUG4hSQ+sEbXH+2RQ++MihBDmA1pIK0FEs2JtFROFpepgKsgMfkBMAGu8xvu6XlcIsm693Xy1M+xM2aDXKQMEWkIiC1qtv3iFLA9kAZSy2aky/6rU6uq2A3hLNnTCffloCigTXu50Gdn6YKFYgECqXlYLlndiuxwKnbWqMbxCf2nJlWk/E5i31ig3CK9HWoOyXHWrl1cznKpnYKYkOyzatktrlnFZwArOn/o1n43NrCBOzvqmroZxYv2cfg9j0mOI/DyxYASyVPmjsj8xOvpabEdIbqYxMJzTF14iVPRtKo6oop8efR3sYXOlLuWzHNvj3JYeWGz9Hs215Hn3RVSaUWpQmmSTKxcoyJJrZnSJL1oMRAZGeaqZapXkWK2UFCqJctifWVAgnBIHjk15jlfV2eDdiY8dxNkA0Iy4NRKckXvyvryWKdGwAXW70bUGNIa0QBxfXnES/0z/lEB6UY0VxF5VS68JA+offWV5J8mMdurFlC/U5wE9K5UN2mwVIQJOflIEAjqNjCq1YR4RiPBqTyjf2AoRuqlQJQzl9kHCu3DRDfkiP2qtw9OCEj4YO06OhBdsAu3uILTOaNKX5UsmrBF7jJUfTCLSA4Ij9VEbk0sxHbqUB2I6Wpg0Pc6IE0AMMn4AGLz7LY5a5Nn239BRJ4B5jfQdFpfapMAAAAASUVORK5CYII=" alt="" /><p className="mb-0 font-w600">10 <small>Completed</small></p>
                                                                    </div>
                                                                </div>
                                                            </div> {/*boxend here */}
                                                            <div className="doto-list-box in-progress-box">
                                                                <button type="button" className="btn livese-btn">Live Session</button>
                                                                <h4>PN Junctions and Diodes</h4>
                                                                <p className="m-0">Understand the distinctions between valence bands, conduction bands, and band gaps.</p>
                                                                <div className="progress-todo">
                                                                    <div className="mt-2">
                                                                        <span className="float-left">
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/list.svg" alt="" style={{ width: '20px' }} />&nbsp;&nbsp;Progress
                                                                        </span>
                                                                        <span className="float-right font-w600" style={{ color: '#BC423B' }}>4/10</span>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                    <div className="progress mt-1">
                                                                        <Box sx={{ flexGrow: 1 }}>

                                                                            <BorderLinearProgress variant="determinate" value={50} />
                                                                        </Box>
                                                                    </div>
                                                                    <div className='todo0date'>
                                                                        <span className='float-left'>
                                                                            <h4><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ 'width': '25px' }} />&nbsp;&nbsp;July 6th, 2023</h4>
                                                                        </span>
                                                                        <span className='float-right' style={{ 'position': 'relative', 'top': '9px' }}>
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/chat.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">10</span>, <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/attachment1.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">2</span>
                                                                        </span>
                                                                        <div className='clearfix'></div>
                                                                    </div>
                                                                    <div className="todo-completed mt-2">
                                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAABHNCSVQICAgIfAhkiAAAA39JREFUWEftWN1R20AQ3pN5Dx3EqSCkgshW3sEVBAqwDRUEKrAlCsBUAHmPjakAUwFOBcHvSMvunS2dpJPuDGKGyXAPDPKddvfbv29PAt5qBeFPEn0MIPaUClzQnzFMh5dvoVI0LtQf7UKrdUVy/QrZc4jjHsxPHpvU3TyQIGIQBxYjr2E66L1fIME5AUAGki2Ev/JBwOe84aIH0/51U2CajUgQkmFif23cCoQ4gD/9uXz+ce4DIhv+aV0zv6lebJFzxtkwkAhTzQhHMBtMcpZ0o0OKzEX623TQmP7GBK09fmM1MtDACtFJI+bse/PBDyAlv6ga+A8iwsj0tHk3NcLEJlpfpedvBrdOKax3LcRH8LxermslyRV1st2tu1Yn+i7fwfi+ikjNNcJ8gMmFpnQBcdKxsnExvaRyXEojhGjnnOFS6HJK8Chd12MOO0d4Ryb+KQPxR20aMR4MEZgTG3eskQlCarmC56yahW4cEkRcc35JUBx/IacqB61XGUg3HJP3hkYr4vgbCeDhr37VgUG4hSQ+sEbXH+2RQ++MihBDmA1pIK0FEs2JtFROFpepgKsgMfkBMAGu8xvu6XlcIsm693Xy1M+xM2aDXKQMEWkIiC1qtv3iFLA9kAZSy2aky/6rU6uq2A3hLNnTCffloCigTXu50Gdn6YKFYgECqXlYLlndiuxwKnbWqMbxCf2nJlWk/E5i31ig3CK9HWoOyXHWrl1cznKpnYKYkOyzatktrlnFZwArOn/o1n43NrCBOzvqmroZxYv2cfg9j0mOI/DyxYASyVPmjsj8xOvpabEdIbqYxMJzTF14iVPRtKo6oop8efR3sYXOlLuWzHNvj3JYeWGz9Hs215Hn3RVSaUWpQmmSTKxcoyJJrZnSJL1oMRAZGeaqZapXkWK2UFCqJctifWVAgnBIHjk15jlfV2eDdiY8dxNkA0Iy4NRKckXvyvryWKdGwAXW70bUGNIa0QBxfXnES/0z/lEB6UY0VxF5VS68JA+offWV5J8mMdurFlC/U5wE9K5UN2mwVIQJOflIEAjqNjCq1YR4RiPBqTyjf2AoRuqlQJQzl9kHCu3DRDfkiP2qtw9OCEj4YO06OhBdsAu3uILTOaNKX5UsmrBF7jJUfTCLSA4Ij9VEbk0sxHbqUB2I6Wpg0Pc6IE0AMMn4AGLz7LY5a5Nn239BRJ4B5jfQdFpfapMAAAAASUVORK5CYII=" alt="" /><p className="mb-0 font-w600">10 <small>Completed</small></p>
                                                                    </div>
                                                                </div>
                                                            </div> {/*boxend here */}
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <div className="done-sec">
                                                        <div className="doto-list-title">
                                                            <span className="float-left">
                                                                <h4><span className="circle"></span>&nbsp;Done &nbsp;<span className="circle-white primary-color">5</span></h4>
                                                                <span className="" ></span>
                                                            </span>
                                                            <span className="float-right primary-color font-w600"  onClick={handleOpen}>
                                                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/add1.svg" width={20} alt="" />&nbsp;&nbsp;<small className="font-w600">Add New Task</small>
                                                            </span>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="height1">
                                                            <div className="doto-list-box in-progress-box">
                                                                <button type="button" className="btn classproject-btn">Class Project</button>
                                                                <h4>Semiconductor Materials and Band Theory</h4>
                                                                <p className="m-0">Discover how semiconductors revolutionised the electronics industry through their compactness and versatility.</p>
                                                                <div className="progress-todo">
                                                                    <div className="mt-2">
                                                                        <span className="float-left">
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/list.svg" alt="" style={{ width: '20px' }} />&nbsp;&nbsp;Progress
                                                                        </span>
                                                                        <span className="float-right font-w600" style={{ color: '#BC423B' }}>4/10</span>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                    <div className="progress mt-1">
                                                                        <Box sx={{ flexGrow: 1 }}>

                                                                            <BorderLinearProgress variant="determinate" value={50} />
                                                                        </Box>
                                                                    </div>
                                                                    <div className='todo0date'>
                                                                        <span className='float-left'>
                                                                            <h4><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ 'width': '25px' }} />&nbsp;&nbsp;July 6th, 2023</h4>
                                                                        </span>
                                                                        <span className='float-right' style={{ 'position': 'relative', 'top': '9px' }}>
                                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/chat.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">10</span>, <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/attachment1.svg" alt="" style={{ 'width': '18px' }} />&nbsp;<span className="font-w600">2</span>
                                                                        </span>
                                                                        <div className='clearfix'></div>
                                                                    </div>
                                                                    <div className="todo-completed mt-2">
                                                                        <p>You are the <b>5th</b> one to complete this</p>
                                                                    </div>
                                                                </div>
                                                            </div> {/*boxend here */}
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <div className="tab-pane fade" id="list-view" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="listView mt-3">
                                            <div className="table-pagination">
                                                <TablePagination
                                                    component="div"
                                                    count={100}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    rowsPerPage={rowsPerPage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Type</th>
                                                        <th>Status</th>
                                                        <th>Priority</th>
                                                        <th>Subject</th>
                                                        <th>Due Date</th>
                                                        <th>Students Completed</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <button type="button" className="btn assign-btn">Assignment</button>
                                                        </td>
                                                        <td>
                                                            <span className="circle-table" style={{ 'background': '#C40807' }}></span>&nbsp;To Do
                                                        </td>
                                                        <td style={{ 'color': '#C40807' }}>Urgent</td>
                                                        <td>Introduction to Semi Conductor</td>
                                                        <td>
                                                            <img src={`${assetUrl}/date.svg`} alt="" style={{ width: '20px' }} />&nbsp;July 8th, 2023
                                                        </td>
                                                        <td className="primary-color">8</td>
                                                        <td>
                                                            <img src={`${assetUrl}/curriculim/edit_square.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/share.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/delete.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/vert-menu.svg`} alt="edit" style={{ 'width': '18px' }} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button type="button" className="btn violet-btn">Group Study</button>
                                                        </td>
                                                        <td>
                                                            <span className="circle-table" style={{ 'background': '#C40807' }}></span>&nbsp;To Do
                                                        </td>
                                                        <td style={{ 'color': '#C40807' }}>Urgent</td>
                                                        <td>Altering the Semiconductor Landscape</td>
                                                        <td>
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ width: '20px' }} />&nbsp;July 8th, 2023
                                                        </td>
                                                        <td className="primary-color">8</td>
                                                        <td>
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/edit_square.svg" alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/share.svg" alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/delete.svg" alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/vert-menu.svg" alt="edit" style={{ 'width': '18px' }} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button type="button" className="btn light-violet-btn">Class Project</button>
                                                        </td>
                                                        <td>
                                                            <span className="circle-table" style={{ 'background': '#C40807' }}></span>&nbsp;To Do
                                                        </td>
                                                        <td style={{ 'color': '#C40807' }}>Urgent</td>
                                                        <td>Altering the Semiconductor Landscape</td>
                                                        <td>
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ width: '20px' }} />&nbsp;July 8th, 2023
                                                        </td>
                                                        <td className="primary-color">8</td>
                                                        <td>
                                                        <img src={`${assetUrl}/curriculim/edit_square.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/share.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/delete.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/vert-menu.svg`} alt="edit" style={{ 'width': '18px' }} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button type="button" className="btn violet-btn">Group Study</button>
                                                        </td>
                                                        <td>
                                                            <span className="circle-table" style={{ 'background': '#004392' }}></span>&nbsp;Medium
                                                        </td>
                                                        <td style={{ 'color': '#004392' }}>Medium</td>
                                                        <td>Altering the Semiconductor Landscape</td>
                                                        <td>
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ width: '20px' }} />&nbsp;July 8th, 2023
                                                        </td>
                                                        <td className="primary-color">8</td>
                                                        <td>
                                                        <img src={`${assetUrl}/curriculim/edit_square.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/share.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/delete.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/vert-menu.svg`} alt="edit" style={{ 'width': '18px' }} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button type="button" className="btn livese-btn">Live Session</button>
                                                        </td>
                                                        <td>
                                                            <span className="circle-table" style={{ 'background': '#004392' }}></span>&nbsp;In Progress
                                                        </td>
                                                        <td style={{ 'color': '#004392' }}>Medium</td>
                                                        <td>Electronic Components and Semicond- -uctor Devices</td>
                                                        <td>
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ width: '20px' }} />&nbsp;July 8th, 2023
                                                        </td>
                                                        <td className="primary-color">8</td>
                                                        <td>
                                                        <img src={`${assetUrl}/curriculim/edit_square.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/share.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/delete.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/vert-menu.svg`} alt="edit" style={{ 'width': '18px' }} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button type="button" className="btn livese-btn">Live Session</button>
                                                        </td>
                                                        <td>
                                                            <span className="circle-table" style={{ 'background': '#004392' }}></span>&nbsp;In Progress
                                                        </td>
                                                        <td style={{ 'color': '#004392' }}>Medium</td>
                                                        <td>Electronic Components and Semicond- -uctor Devices</td>
                                                        <td>
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ width: '20px' }} />&nbsp;July 8th, 2023
                                                        </td>
                                                        <td className="primary-color">8</td>
                                                        <td>
                                                        <img src={`${assetUrl}/curriculim/edit_square.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/share.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/delete.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/vert-menu.svg`} alt="edit" style={{ 'width': '18px' }} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button type="button" className="btn light-violet-btn">Class Project</button>
                                                        </td>
                                                        <td>
                                                            <span className="circle-table" style={{ 'background': '#0B742B' }}></span>&nbsp;Done
                                                        </td>
                                                        <td style={{ 'color': '#0B742B' }}>Low</td>
                                                        <td>Altering the Semiconductor Landscape</td>
                                                        <td>
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/date.svg" alt="" style={{ width: '20px' }} />&nbsp;July 8th, 2023
                                                        </td>
                                                        <td className="primary-color">8</td>
                                                        <td>
                                                        <img src={`${assetUrl}/curriculim/edit_square.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/share.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/delete.svg`} alt="edit" className='mr-2' style={{ 'width': '18px' }} />
                                                            <img src={`${assetUrl}/curriculim/vert-menu.svg`} alt="edit" style={{ 'width': '18px' }} />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </CustomTabPanel>
                            </div>

                        </div>

                    </Main>
                </Box>
                <div className="footer">
                    <FooterCopyright />
                </div>
                <Modal
                    open={openModel}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">
                                <h4><img src={`${assetUrl}/curriculim/view%20credintials.svg`} alt="" />&nbsp;&nbsp;Add New Task</h4>
                            </span>
                            <span className="float-right" onClick={handleClose}>
                                <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />

                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <div className="form-group mb-2">
                                <TextField id="filled-basic" label="Give Title to your Poll" variant="filled" placeholder='Ex:- IIT Physics Project' className="w-100" />
                            </div>
                            <Grid container spacing={2} >
                                <Grid item xs={12} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Task Start Date" />
                                    </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Task End Date" />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} className="mt-2">
                                <Grid item xs={12} md={4}>
                                    <label className="font-w600">Poll Type</label>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        variant="filled"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChangeF}
                                        >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>             
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <label className="font-w600">Set Reminder</label>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        variant="filled"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChangeF}
                                        >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>             
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <label className="font-w600">Mark Importance</label>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        variant="filled"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChangeF}
                                        >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>             
                                </Grid>
                            </Grid>
                            <div className="form-group mb-2 mt-1">
                                    <label className="font-w600 w-100">Give Description</label>
                                    <TextField
                                        id="filled-multiline-static"
                                        label="Add Description"
                                        className="w-100"
                                        multiline
                                        rows={3}
                                        defaultValue=""
                                        variant="filled"
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <div className="upload-attachments">
                                        <label className="font-w600">Upload Attachments</label>
                                        <div className="upload-attachment-item">
                                            <input type="file" value="" name="" />
                                            <img src={`${assetUrl}/cloud_upload.svg`} alt="" />&nbsp;Upload
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mb-3 mt-2">
                                    <AppButton children="Create Task" styleClass='btn primary-bg w150 pl-2 pr-2 mr-3 text-white' />
                                    <AppButton children="Cancel"  styleClass='btn cancel-outline w150 pl-2 pr-2 ' />
                                </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}