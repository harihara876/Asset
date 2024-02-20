
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

export default function TotalCourses() {
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
                                    <Link color="#174392" to="/library">My Library Overview</Link>
                                    <Typography color="#62676C">Total Courses</Typography>
                                </Breadcrumbs>
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
                                                        <h4>Headline 6</h4>
                                                        <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{ 'color': '#004392' }}><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Enroll</li>
                                                    <li style={{ 'color': '#C4091E' }}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
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
                                                        <h4>Headline 6</h4>
                                                        <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{ 'color': '#004392' }}><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Enroll</li>
                                                    <li style={{ 'color': '#C4091E' }}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
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
                                                        <h4>Headline 6</h4>
                                                        <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{ 'color': '#004392' }}><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Enroll</li>
                                                    <li style={{ 'color': '#C4091E' }}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
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
                                                        <h4>Headline 6</h4>
                                                        <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{ 'color': '#004392' }}><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Enroll</li>
                                                    <li style={{ 'color': '#C4091E' }}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
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
                                                        <h4>Headline 6</h4>
                                                        <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{ 'color': '#004392' }}><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Enroll</li>
                                                    <li style={{ 'color': '#C4091E' }}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
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
                                                        <h4>Headline 6</h4>
                                                        <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{ 'color': '#004392' }}><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Enroll</li>
                                                    <li style={{ 'color': '#C4091E' }}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
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
                                                        <h4>Headline 6</h4>
                                                        <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{ 'color': '#004392' }}><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Enroll</li>
                                                    <li style={{ 'color': '#C4091E' }}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
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
                                                        <h4>Headline 6</h4>
                                                        <p className="m-0">Body 2</p>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </span>
                                                <span className="float-right">
                                                    <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                            <div className="certification-box-item-bottom">
                                                <ul>
                                                    <li style={{ 'color': '#004392' }}><i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Enroll</li>
                                                    <li style={{ 'color': '#C4091E' }}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</li>
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
                            <h4><i className="fa fa-bars" aria-hidden="true"></i>&nbsp;&nbsp;Share Course</h4>
                        </span>
                        <span className="float-right">
                            <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                        </span>
                        <div className="clearfix"></div>
                    </div>
                    <div className="modal-content mt-3">
                        <div className="modal-autocomplte position-relative">
                            <Autocomplete
                                multiple
                                id="size-small-filled-multi"
                                size="small"
                                options={top100Films}
                                getOptionLabel={(option) => option.title1}

                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            variant="outlined"
                                            label={option.title1}
                                            size="small"
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="filled"
                                        label="Add Students"
                                        placeholder="Add Students"
                                    />
                                )}
                            />
                            <div className="add-people">
                                Add People
                            </div>
                        </div>

                        <div className="notification-modal mt-3">
                            <p>Send Notifications on?</p>
                            <span className="mr-2"><img src={`${assetUrl}/curriculim/gmail.svg`} style={{ 'width': '20px' }} alt="" />&nbsp;Gmail</span> <span><img src={`${assetUrl}/curriculim/slack.svg`} style={{ 'width': '20px' }} alt="" />&nbsp;Slack</span>
                        </div>
                        <div className="text-center mt-4">
                            <AppButton children="Share" styleClass='btn save-btn  primary-bg mr-3 text-white' />
                            <AppButton children="Cancel" styleClass='btn cancel-outline' />
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

const top100Films = [
    { title1: 'The Shawshank Redemption', year: 1994 },
    { title1: 'The Godfather', year: 1972 },
    { title1: 'The Godfather: Part II', year: 1974 },
    { title1: 'The Dark Knight', year: 2008 },
    { title1: '12 Angry Men', year: 1957 },
    { title1: "Schindler's List", year: 1993 },
    { title1: 'Pulp Fiction', year: 1994 },
]