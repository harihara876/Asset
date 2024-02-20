
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import FooterCopyright from 'vridhee_common_component_mf/FooterCopyright';
import AppInput from 'vridhee_common_component_mf/AppInput';
import Dropdown from "vridhee_common_component_mf/Dropdown";
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import TablePagination from "@material-ui/core/TablePagination";
import Sidebar from './Sidebar';
import configJson from "vridhee_common_component_mf/configJson";
import Grid from '@mui/material/Grid';






const drawerWidth = 150;

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

export default function Library() {
    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
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
                                    <Typography color="#62676C">library</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="page-title">
                                <h1>My Library Overview</h1>
                            </div>

                            <div className="courses-over-sec mt-2">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="courses-over" style={{ 'background': 'rgba(244, 255, 253, 1)', 'borderColor': 'rgba(99, 177, 167, 1)' }}>
                                            <div className="courses-over-box">
                                                <div className="courses-over-box-img" style={{ 'borderColor': 'rgba(110, 188, 177, 1)' }}>
                                                    <img src={`${assetUrl}/curriculim/librarybooks.svg`} alt="" />
                                                </div>
                                                <div className="courses-over-box-con">
                                                    <h4>35</h4>
                                                    <p className="m-0 font-w600" style={{ color: 'rgba(18, 77, 67, 1)' }}>Total Courses</p>
                                                </div>
                                                <div className='clearfix'></div>
                                            </div>
                                            <div className="courses-over-box-con-bottom">
                                                <span className="float-left font-w600" style={{ color: 'rgba(18, 77, 67, 1)' }}>See Details</span>
                                                <span className="float-right"><img src={`${assetUrl}/curriculim/right-arrow.svg`} alt="" /></span>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="courses-over" style={{ 'background': 'rgba(250, 248, 255, 1)', 'borderColor': 'rgba(150, 134, 229, 1)' }}>
                                            <div className="courses-over-box">
                                                <div className="courses-over-box-img" style={{ 'borderColor': 'rgba(154, 137, 235, 1)' }}>
                                                    <img src={`${assetUrl}/curriculim/bookmark.svg`} alt="" />
                                                </div>
                                                <div className="courses-over-box-con">
                                                    <h4>8</h4>
                                                    <p className="m-0 font-w600" style={{ color: 'rgba(79, 84, 107, 1)' }}>Saved Courses</p>
                                                </div>
                                                <div className='clearfix'></div>
                                            </div>
                                            <div className="courses-over-box-con-bottom">
                                                <span className="float-left font-w600" style={{ color: 'rgba(18, 77, 67, 1)' }}>See Details</span>
                                                <span className="float-right"> <img src={`${assetUrl}/curriculim/right-arrow.svg`} alt="" /></span>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="courses-over" style={{ 'background': 'rgba(250, 245, 240, 1)', 'borderColor': 'rgba(221, 143, 74, 1)' }}>
                                            <div className="courses-over-box">
                                                <div className="courses-over-box-img" style={{ 'borderColor': 'rgba(199, 125, 59, 1)' }}>
                                                    <img src={`${assetUrl}/curriculim/librarybooks.svg`} alt="" />
                                                </div>
                                                <div className="courses-over-box-con">
                                                    <h4>5</h4>
                                                    <p className="m-0 font-w600" style={{ color: 'rgba(79, 84, 107, 1)' }}>Liked Courses</p>
                                                </div>
                                                <div className='clearfix'></div>
                                            </div>
                                            <div className="courses-over-box-con-bottom">
                                                <span className="float-left font-w600" style={{ color: 'rgba(18, 77, 67, 1)' }}>See Details</span>
                                                <span className="float-right"><img src={`${assetUrl}/curriculim/right-arrow.svg`} alt="" /></span>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="courses-over" style={{ 'background': '#EFF9FF', 'borderColor': '#3893D2' }}>
                                            <div className="courses-over-box">
                                                <div className="courses-over-box-img" style={{ 'borderColor': '#3893D2' }}>
                                                    <img src={`${assetUrl}/curriculim/librarybooks.svg`} alt="" />
                                                </div>
                                                <div className="courses-over-box-con">
                                                    <h4>5</h4>
                                                    <p className="m-0 font-w600" style={{ color: '#4F546B' }}>Completed Courses</p>
                                                </div>
                                                <div className='clearfix'></div>
                                            </div>
                                            <div className="courses-over-box-con-bottom">
                                                <span className="float-left font-w600" style={{ color: 'rgba(18, 77, 67, 1)' }}>See Details</span>
                                                <span className="float-right"><img src={`${assetUrl}/curriculim/right-arrow.svg`} alt="" /></span>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className="total-courses mt-3">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={9}>
                                        <div className="total-couese-title">
                                            <span className='float-left'>
                                                <h4 className="font-w600">Total Courses</h4>
                                            </span>
                                            <span className='float-right'>
                                                <Link to="/total-courses">
                                                <button type="button"  className="btn light-green-btn"><img src={`${assetUrl}/show1.svg`} alt="" style={{ 'width': '20px' }} />&nbsp;View All</button>
                                                </Link>
                                                
                                            </span>
                                            <div className='clearfix'></div>
                                        </div>
                                        <div className="course-box mt-2 mb-2">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <div className="course-box-s">
                                                        <img src={`${assetUrl}/curriculim/image%201.svg`} alt="" className="w-100" />
                                                        <h4>Introduction to Computer Science</h4>
                                                        <small>A Course By Richard Bernard</small>
                                                        <p>Dive into the world of computer science, covering topics such as programming fundamentals, algorithms, and data structures.</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <div className="course-box-s">
                                                        <img src={`${assetUrl}/curriculim/image%203.svg`} alt="" className="w-100" />
                                                        <h4>Financial Accounting Basics</h4>
                                                        <small>A Course By Richard Bernard</small>
                                                        <p>Gain a solid foundation in financial accounting principles, including bookkeeping, financial statements, and analysis.</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <div className="course-box-s">
                                                        <img src={`${assetUrl}/curriculim/image%202.svg`} alt="" className="w-100" />
                                                        <h4>Introduction to Psychology</h4>
                                                        <small>A Course By Richard Bernard</small>
                                                        <p>Explore the fascinating field of psychology, learning about human behavior, cognition, and mental processes.</p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <div className="liked-courses mb-3">
                                                    <div className="total-couese-title">
                                                        <span className='float-left'>
                                                            <h4 className="font-w600">Liked Courses</h4>
                                                        </span>
                                                        <span className='float-right'>
                                                            <button type="button" className="btn light-green-btn"><img src={`${assetUrl}/show1.svg`} alt="" style={{ 'width': '20px' }} />&nbsp;View All</button>
                                                        </span>
                                                        <div className='clearfix'></div>
                                                    </div>
                                                </div>
                                                <div className="liked-course-box">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={4} md={3}>
                                                            <img src={`${assetUrl}/curriculim/image%204.svg`} alt="" className="w-100" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={8} md={9}>
                                                            <div className="liked-course-box-con">
                                                                <h4>Mastering Python with Notion</h4>
                                                                <small>A Course By John Smith</small>
                                                                <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                                <p className="text-right font-w500 primary-color join-now"><Link to="">Join Now</Link></p>

                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div className="liked-course-box">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={4} md={3}>
                                                            <img src={`${assetUrl}/curriculim/image%206.svg`} alt="" className="w-100" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={8} md={9}>
                                                            <div className="liked-course-box-con">
                                                                <h4>Introduction to Environmental Science</h4>
                                                                <small>A Course By Dr. David Wilson</small>
                                                                <p>Investigate the complex interactions between humans and the environment, covering topics such as climate change, biodiversity, and sustainability.</p>
                                                                <p className="text-right font-w500 primary-color join-now"><Link to="">Join Now</Link></p>

                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div className="liked-course-box">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={4} md={3}>
                                                            <img src={`${assetUrl}/curriculim/image%207.svg`} alt="" className="w-100" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={8} md={9}>
                                                            <div className="liked-course-box-con">
                                                                <h4>Introduction to World History</h4>
                                                                <small>A Course By Dr. Jennifer Lee</small>
                                                                <p>Embark on a journey through time, exploring major events, civilizations, and cultural developments that shaped our world.</p>
                                                                <p className="text-right font-w500 primary-color join-now"><Link to="">Join Now</Link></p>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>

                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <div className="liked-courses mb-3">
                                                    <div className="total-couese-title">
                                                        <span className='float-left'>
                                                            <h4 className="font-w600">Saved Courses</h4>
                                                        </span>
                                                        <span className='float-right'>
                                                            <button type="button" className="btn light-green-btn"><img src={`${assetUrl}/show1.svg`} alt="" style={{ 'width': '20px' }} />&nbsp;View All</button>
                                                        </span>
                                                        <div className='clearfix'></div>
                                                    </div>
                                                </div>
                                                <div className="liked-course-box">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={4} md={3}>
                                                            <img src={`${assetUrl}/curriculim/image%205.svg`} alt="" className="w-100" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={8} md={9}>
                                                            <div className="liked-course-box-con">
                                                                <h4>Introduction to Physics</h4>
                                                                <small>A Course By Dr. Mark Thompson</small>
                                                                <p>Discover the fundamental principles of physics, including motion, forces, energy, and the laws of nature.</p>
                                                                <p className="text-right font-w500 primary-color join-now"><Link to="">Join Now</Link></p>

                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div className="liked-course-box">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={4} md={3}>
                                                            <img src={`${assetUrl}/curriculim/image%208.svg`} alt="" className="w-100" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={8} md={9}>
                                                            <div className="liked-course-box-con">
                                                                <h4>Introduction to Human Anatomy &…</h4>
                                                                <small>A Course By Dr. Lisa Adams</small>
                                                                <p>Gain a comprehensive understanding of the human body, exploring its structure, functions, and systems.</p>
                                                                <p className="text-right font-w500 primary-color join-now"><Link to="">Join Now</Link></p>

                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div className="liked-course-box">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={4} md={3}>
                                                            <img src={`${assetUrl}/curriculim/image%209.svg`} alt="" className="w-100" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={8} md={9}>
                                                            <div className="liked-course-box-con">
                                                                <h4>Introduction to Programming in Python</h4>
                                                                <small>A Course By Richard Bernard</small>
                                                                <p>Learn the fundamentals of programming using the Python language, covering variables, control structures, functions, and data manipulation.</p>
                                                                <p className="text-right font-w500 primary-color join-now"><Link to="">Join Now</Link></p>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="liked-courses mb-3">
                                            <div className="total-couese-title">
                                                <span className='float-left'>
                                                    <h4 className="font-w600">Completed Courses</h4>
                                                </span>
                                                <span className='float-right'>
                                                    <button type="button" className="btn light-green-btn"><img src={`${assetUrl}/show1.svg`} alt="" style={{ 'width': '20px' }} />&nbsp;View All</button>
                                                </span>
                                                <div className='clearfix'></div>
                                            </div>
                                        </div>
                                        <div className="completed-courses-box">
                                            <div className="completed-course">
                                                <Grid container spacing={0}>
                                                    <Grid item xs={4} sm={4} md={3}>
                                                        <div className="completed-course-img">
                                                            GC
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={8} sm={8} md={9}>
                                                        <div className="completed-course-con">
                                                            <h4>Introduction To Graphic Novels And Comics</h4>
                                                            <small>By: Lisa Thompson</small>
                                                            <p><img src={`${assetUrl}/event.svg`} alt="" style={{'width': '17px'}} />&nbsp;6/23/2023</p>
                                                            

                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className="completed-course">
                                                <Grid container spacing={0}>
                                                    <Grid item xs={4} sm={4} md={3}>
                                                        <div className="completed-course-img">
                                                            GC
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={8} sm={8} md={9}>
                                                        <div className="completed-course-con">
                                                            <h4>Introduction To Graphic Novels And Comics</h4>
                                                            <small>By: Lisa Thompson</small>
                                                            <p><img src={`${assetUrl}/event.svg`} alt="" style={{'width': '17px'}} />&nbsp;6/23/2023</p>
                                                            

                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className="completed-course">
                                                <Grid container spacing={0}>
                                                    <Grid item xs={4} sm={4} md={3}>
                                                        <div className="completed-course-img">
                                                            PS
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={8} sm={8} md={9}>
                                                        <div className="completed-course-con">
                                                            <h4>Introduction To Political Science</h4>
                                                            <small>By: Lisa Thompson</small>
                                                            <p><img src={`${assetUrl}/event.svg`} alt="" style={{'width': '17px'}} />&nbsp;6/23/2023</p>
                                                            

                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className="completed-course">
                                                <Grid container spacing={0}>
                                                    <Grid item xs={4} sm={4} md={3}>
                                                        <div className="completed-course-img">
                                                            BM
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={8} sm={8} md={9}>
                                                        <div className="completed-course-con">
                                                            <h4>Introduction To Business Management</h4>
                                                            <small>By: Lisa Thompson</small>
                                                            <p><img src={`${assetUrl}/event.svg`} alt="" style={{'width': '17px'}} />&nbsp;6/23/2023</p>
                                                            

                                                        </div>
                                                    </Grid>
                                                </Grid>
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