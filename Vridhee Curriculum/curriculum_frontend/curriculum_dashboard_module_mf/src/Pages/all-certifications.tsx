
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

export default function AllCertifications() {
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
        width: 800,
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
                                    <Typography color="#62676C">All Certifications</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="certifications-section">
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
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom mt-1">
                                                <ul>
                                                    <li onClick={handleOpen} style={{'color':'#004392'}}><i className="fa fa-eye" aria-hidden="true"></i>&nbsp; View</li>
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
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom mt-1">
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
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom mt-1">
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
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom mt-1">
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
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom mt-1">
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
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom mt-1">
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
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom mt-1">
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
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom mt-1">
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
                            </Main>
                </Box>
                <div className="footer">
                    <FooterCopyright />
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
                            <h4><img src={`${assetUrl}/curriculim/view%20credintials.svg`} alt="" />&nbsp;&nbsp;View my Credential</h4>
                        </span>
                        <span className="float-right" onClick={handleClose}>
                            <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                            
                        </span>
                        <div className="clearfix"></div>
                    </div>
                    <div className="modal-content mt-1">
                        <div className="view-certification">
                            <div className="view-certification-left">
                                <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} className="w-100" alt="" />
                                <div className="share-button">
                                    Share&nbsp;&nbsp;<i className="fa fa-share-alt" aria-hidden="true"></i>
                                </div>
                                <div className="view-certification-social">
                                    <ul>
                                        <li><a href="#" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                        <li><a href="#" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                        <li><a href="#" target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                        <li><a href="#" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                        <li><a href="#" target="_blank"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                    </ul>
                                    <div className="copy-url">
                                    <TextField id="filled-basic" label="Copy URL" variant="filled" placeholder='Some url here...' />
                                    <div className="copy-text text-right">
                                        <span className="primary-color mr-2">Copy</span>
                                        <span>Close</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="view-certification-right">
                                <h4>Course Title</h4>
                                <small>From Guru Dipyaman</small>
                                <p>March 2023 - August 2023, Hyderabad, Telangana, India.</p>
                                <p className="border-bottm">Aliquam accumsan lectus id facilisis viverra. Duis a dui imperdiet magna rhoncus convallis quis eu enim. Cras eget auctor sapien. Sed non risus vitae tortor semper condimentum. Nulla in commodo ipsum. In blandit quam non ullamcorper congue. Ut aliquam mauris vel risus suscipit faucibus.</p>
                                <h5>Credintials</h5>
                                <ul>
                                    <li>
                                        <img src={`${assetUrl}/curriculim/medal%20title.svg`} className="w-100" alt="" />
                                        <span>Medal Title</span>
                                    </li>
                                    <li>
                                        <img src={`${assetUrl}/curriculim/medal%20title.svg`} className="w-100" alt="" />
                                        <span>Medal Title</span>
                                    </li>
                                    <li>
                                        <img src={`${assetUrl}/curriculim/medal%20title.svg`} className="w-100" alt="" />
                                        <span>Medal Title</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </Box>
            </Modal>

            

            </div>
           
        </div>
    );
}

