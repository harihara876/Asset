
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
import AppInput from 'vridhee_common_component_mf/AppInput';
import Dropdown from "vridhee_common_component_mf/Dropdown";
import Sidebar from './Sidebar';
import configJson from "vridhee_common_component_mf/configJson";
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppButton from 'vridhee_common_component_mf/AppButton';
import Textarea from '@mui/joy/Textarea';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

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

export default function Rewards() {
    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const options = [
        { label: "Option 1", name: 'Option 1' },
        { label: "Option 2", name: 'Option 2' },
        { label: "Option 3", name: 'Option 3' }
    ];
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
                                    <Typography color="#62676C">Rewards</Typography>
                                </Breadcrumbs>
                            </div>
                        

                        <div className="rewards-section">
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <div className="user-section">
                                        <div className="user-section-img">
                                            <img src={`${assetUrl}/curriculim/Event%20add%20student.svg`} alt="" />
                                        </div>
                                        <div className="user-section-con">
                                            <h4>Dipyaman Baral</h4>
                                            <p className="m-0">Bonus Booster, Grade Level</p>
                                            <div className="progress mt-1">
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <LinearProgress variant="determinate" value={50} />
                                                </Box>
                                                <div className="text-right mt-1">
                                                    7000 Points to unlock 20 rewards
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <div className="student-credentials-sec position-relative">
                                        <p>Student Credentials</p>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div className="student-credentials-box">
                                                    <img src={`${assetUrl}/curriculim/Mile%20stone.svg`} alt="" />
                                                    <h5 style={{ 'color': '#0E8E5C' }}>27</h5>
                                                    <p className="m-0">Mile Stones</p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div className="student-credentials-box">
                                                    <img src={`${assetUrl}/curriculim/high%20score.svg`} alt="" />
                                                    <h5 style={{ 'color': '#0C7C9D' }}>910</h5>
                                                    <p className="m-0">High Score</p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div className="student-credentials-box">
                                                    <img src={`${assetUrl}/curriculim/doubt%20clear.svg`} alt="" />
                                                    <h5 style={{ 'color': '#1042A3' }}>50</h5>
                                                    <p className="m-0">Doubts cleared</p>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="achivement-sec mt-3">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <div className="achivement-sec-box">
                                            <div className="achivement-sec-box-title">
                                                <div className="w-50">
                                                    <div className="achivement-sec-box-title-img">
                                                        <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                    </div>
                                                    <div className="achivement-sec-box-title-content">
                                                        <div className="float-left">
                                                            <h4>Achievements</h4>
                                                            <p>Sub description of the section</p>
                                                        </div>
                                                        <div className="float-right">
                                                            <div className="achivment-share">
                                                                <i className="fa fa-share-alt" aria-hidden="true"></i>
                                                            </div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>


                                                </div>
                                                <div className="w-50">
                                                    <div className="text-right primary-color mb-1">4/10</div>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <LinearProgress variant="determinate" value={50} />
                                                    </Box>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="achivment-list">
                                                <ul>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/medal%20title.svg`} alt="" />
                                                        <div>Medal Title</div>
                                                    </li>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/medal%20title.svg`} alt="" />
                                                        <div>Medal Title</div>
                                                    </li>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/medal%20title.svg`} alt="" />
                                                        <div>Medal Title</div>
                                                    </li>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/medal%20title.svg`} alt="" />
                                                        <div>Medal Title</div>
                                                    </li>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/medal%20title.svg`} alt="" />
                                                        <div>Medal Title</div>
                                                    </li>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/medal%20title.svg`} alt="" />
                                                        <div>Medal Title</div>
                                                    </li>
                                                </ul>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <div className="achivement-sec-box">
                                            <div className="achivement-sec-box-title">
                                                <div className="w-50">
                                                    <div className="achivement-sec-box-title-img">
                                                        <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                    </div>
                                                    <div className="achivement-sec-box-title-content">
                                                        <div className="float-left">
                                                            <h4>Inventories</h4>
                                                            <p>Sub description of the section</p>
                                                        </div>
                                                        <div className="float-right">
                                                            <div className="achivment-share">
                                                                <i className="fa fa-share-alt" aria-hidden="true"></i>
                                                            </div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>


                                                </div>
                                                <div className="w-50">
                                                    <div className="text-right primary-color mb-1">4/10</div>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <LinearProgress variant="determinate" value={50} />
                                                    </Box>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="Inventories-list">
                                                <ul>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/learning%20time.svg`} alt="" />
                                                        <div>300hrs Learning time</div>
                                                    </li>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/learner%20streak.svg`} alt="" />
                                                        <div>5 Day learner streak</div>
                                                    </li>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/collaborations.svg`} alt="" />
                                                        <div>30 Collaborations</div>
                                                    </li>



                                                </ul>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="certification-box mt-4">
                                <div className="certification-box-title">
                                    <div className="w-50">
                                        <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                        <h4>Certifications</h4>
                                        <p className="m-0">Body 2</p>
                                    </div>
                                    <div className="w-50">
                                        <div className="text-right"><i className="fa fa-share-alt" aria-hidden="true"></i></div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="certification-box-sec">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="certification-box-item">
                                            <div className="certification-box-title">
                                                <span className="float-left">
                                                    <div className="certification-box-title-img">
                                                     <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                    </div>
                                                    <div className="certification-box-title-con">
                                                    <h4>Certifications</h4>
                                                    <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right"><i className="fa fa-share-alt" aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{'color':'#004392'}}><i className="fa fa-eye" aria-hidden="true"></i>&nbsp; View</li>
                                                    <li style={{'color':'#C4091E'}}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="certification-box-item">
                                            <div className="certification-box-title">
                                                <span className="float-left">
                                                    <div className="certification-box-title-img">
                                                     <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                    </div>
                                                    <div className="certification-box-title-con">
                                                    <h4>Certifications</h4>
                                                    <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right"><i className="fa fa-share-alt" aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{'color':'#004392'}}><i className="fa fa-eye" aria-hidden="true"></i>&nbsp; View</li>
                                                    <li style={{'color':'#C4091E'}}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="certification-box-item">
                                            <div className="certification-box-title">
                                                <span className="float-left">
                                                    <div className="certification-box-title-img">
                                                     <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                    </div>
                                                    <div className="certification-box-title-con">
                                                    <h4>Certifications</h4>
                                                    <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right"><i className="fa fa-share-alt" aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{'color':'#004392'}}><i className="fa fa-eye" aria-hidden="true"></i>&nbsp; View</li>
                                                    <li style={{'color':'#C4091E'}}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="certification-box-item">
                                            <div className="certification-box-title">
                                                <span className="float-left">
                                                    <div className="certification-box-title-img">
                                                     <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                    </div>
                                                    <div className="certification-box-title-con">
                                                    <h4>Certifications</h4>
                                                    <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right"><i className="fa fa-share-alt" aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{'color':'#004392'}}><i className="fa fa-eye" aria-hidden="true"></i>&nbsp; View</li>
                                                    <li style={{'color':'#C4091E'}}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
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