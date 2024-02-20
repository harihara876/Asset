
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

export default function ActivitiesResult() {
    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [open1, setOpen1] = React.useState(false);
    const handleOpen = () => setOpen1(true);
    const handleClose = () => setOpen1(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '1px solid #00439224',
        boxShadow: 24,
        p: 2,
    };
    const [open2, setOpen2] = React.useState(false);
    const handleOpen1 = () => setOpen2(true);
    const handleClose1 = () => setOpen2(false);
    const style1 = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '1px solid #00439224',
        boxShadow: 24,
        p: 2,
    };

    return (
        <div>
            <div className="dashboard-sec">
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <CssBaseline />
                        <AppBar position="fixed" open={open}>
                            <HeaderCurriculum />
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
                                    <Link color="#174392" to="/activities">Activities</Link>
                                    <Typography color="#62676C">Results</Typography>

                                </Breadcrumbs>
                            </div>
                            <div className="activities-result">

                                <div className="activities-result-title">
                                    <div>
                                        <h4 className="mb-2 border-bottom pb-1">Submission Name</h4>
                                    </div>
                                    <span className="float-left">
                                        <h5>Your Submission</h5>
                                        <h4 className="primary-color">Maths Assignment</h4>
                                    </span>
                                    <span className="float-right">
                                        <h5>Assignment Score</h5>
                                        <h4 className="primary-color text-right">39/55</h4>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="result-box">
                                    <div className="p-2">
                                    <div className="w-80">
                                    <div className="circle40 primary-bg text-white">
                                      <i className="fa fa-laptop" aria-hidden="true"></i>
                                    </div>
                                    <h4 className="primary-color">Section 1: Calculus (25 points)</h4>
                                    <div>
                                        <ul>
                                            <li>Problem 1: Differentiation Points Awarded: 5 out of 5</li>
                                            <li>Problem 2: Integration Points Awarded: 4 out of 5</li>
                                            <li>Problem 3: Limits Points Awarded: 5 out of 5</li>
                                        </ul>
                                    </div>
                                    </div>
                                    <div className="w-20">
                                        <div className="text-right">
                                            <div className="circle70 mt-2">
                                                20/20
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    </div>
                                    
                                    
                                    <div className="result-box-bottom">
                                        <ul>
                                            <li><span className="mr-2">Was this Helpful?</span></li>
                                            <li><i className="fa fa-hand-o-right" style={{'color':'#004392'}} aria-hidden="true"></i></li>
                                            <li><i className="fa fa-thumbs-o-down" style={{'color':'#B20808'}} aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="result-box">
                                    <div className="p-2">
                                    <div className="w-80">
                                    <div className="circle40 primary-bg text-white">
                                      <i className="fa fa-laptop" aria-hidden="true"></i>
                                    </div>
                                    <h4 className="primary-color">Section 1: Calculus (25 points)</h4>
                                    <div>
                                        <ul>
                                            <li>Problem 1: Differentiation Points Awarded: 5 out of 5</li>
                                            <li>Problem 2: Integration Points Awarded: 4 out of 5</li>
                                            <li>Problem 3: Limits Points Awarded: 5 out of 5</li>
                                        </ul>
                                    </div>
                                    </div>
                                    <div className="w-20">
                                        <div className="text-right">
                                            <div className="circle70 mt-2">
                                                20/20
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    </div>
                                    
                                    
                                    <div className="result-box-bottom">
                                        <ul>
                                            <li><span className="mr-2">Was this Helpful?</span></li>
                                            <li><i className="fa fa-hand-o-right" style={{'color':'#004392'}} aria-hidden="true"></i></li>
                                            <li><i className="fa fa-thumbs-o-down" style={{'color':'#B20808'}} aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="result-box">
                                    <div className="p-2">
                                    <div className="w-80">
                                    <div className="circle40 primary-bg text-white">
                                      <i className="fa fa-laptop" aria-hidden="true"></i>
                                    </div>
                                    <h4 className="primary-color">Section 1: Calculus (25 points)</h4>
                                    <div>
                                        <ul>
                                            <li>Problem 1: Differentiation Points Awarded: 5 out of 5</li>
                                            <li>Problem 2: Integration Points Awarded: 4 out of 5</li>
                                            <li>Problem 3: Limits Points Awarded: 5 out of 5</li>
                                        </ul>
                                    </div>
                                    </div>
                                    <div className="w-20">
                                        <div className="text-right">
                                            <div className="circle70 mt-2">
                                                20/20
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    </div>
                                    
                                    
                                    <div className="result-box-bottom">
                                        <ul>
                                            <li><span className="mr-2">Was this Helpful?</span></li>
                                            <li><i className="fa fa-hand-o-right" style={{'color':'#004392'}} aria-hidden="true"></i></li>
                                            <li><i className="fa fa-thumbs-o-down" style={{'color':'#B20808'}} aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="result-box p-2">
                                    <h4 className="primary-color mb-1">Feedback:</h4>
                                    <p>Congratulations, John! You scored 39 out of 55 points on your IIT Mathematics assignment. You demonstrated a strong understanding of Calculus concepts, and your performance in the Linear Algebra section was also commendable. However, there is room for improvement in some areas. Be sure to review the feedback provided for each problem to enhance your understanding. Please feel free to reach out if you have any questions or need further clarification on the assignment. Keep up the good work! This sample content provides a structured format for displaying assignment results, including details such as the assignment name, student name, submission date, and a breakdown of points awarded for each section and problem. It also offers a feedback section where you can provide comments and encouragement to the student. You can customize this template to match your web app's design and functionality.</p>
                                </div>

                                <div className="text-right mt-2 mb-2">
                                    <AppButton children="Request for Re-Evaluation" onClick={handleOpen} styleClass=' btn w-auto pl-2 pr-2 primary-bg text-white' />
                                </div> 


                            </div>
                        </div>
                        <Modal
                keepMounted
                open={open1}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className="modal-titile">
                        <span className="float-left">
                            <h4>
                            <img src={`${assetUrl}/contract_edit.svg`} style={{ 'width': '20px' }} alt="" />&nbsp;&nbsp;Re-Evaluation Request</h4>
                        </span>
                        <span className="float-right">
                            <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                        </span>
                        <div className="clearfix"></div>
                    </div>
                    <div className="modal-content text-center mt-3">
                      <p className="m-0"><b className="primary-color">You may ask for a re-evaluation of your assignment</b></p>
                      <small>Note: Invalid claims may attract a penlty of 15%</small>
                        <div className="text-center mt-4">
                            <AppButton children="Proceed" onClick={handleOpen1} styleClass='btn save-btn  primary-bg mr-2 text-white' />
                            <AppButton children="Cancel" styleClass='btn cancel-outline' />
                        </div>
                    </div>
                </Box>
                         </Modal>


                         <Modal
                keepMounted
                open={open2}
                onClose={handleClose1}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className="modal-titile">
                        <span className="float-left">
                            <h4><img src="http://localhost:3000/static/media/contract_edit.2e012f24b99edd8db75b53f1d266b2ea.svg" alt="" />&nbsp;&nbsp;Re-Evaluation Request</h4>
                        </span>
                        <span className="float-right">
                            <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                        </span>
                        <div className="clearfix"></div>
                    </div>
                    <div className="modal-content text-center mt-3">
                      <p className="m-0"><b className="primary-color">Re-evaluation Request Successfully Submitted</b></p>
                      <small>It may take 5 to 7 working days to get your result</small>
                        <div className="text-center mt-4">
                            <a href="activities-result"><AppButton children="Back to Home" styleClass='btn cancel-outline' /></a>
                        </div>
                    </div>
                </Box>
                         </Modal>

                       
                    </Main>
                </Box>
                <div className="footer">
                    <FooterCopyright />
                </div>

            </div>

        </div>
    );
}

