import TabPanel from "@material-ui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import React from "react";
import TabContext from '@mui/lab/TabContext';
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import configJson from "vridhee_common_component_mf/configJson";

const assetUrl = configJson.local.assetUrl;

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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function curriculumTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div>
            <div className="curriculum-box mt-5">
                <Container >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={2}>
                            <h4 className='primary-color font-w600'>Curriculum</h4>
                        </Grid>
                        <Grid item xs={12} md={8}>

                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="School" {...a11yProps(0)} />
                                    <Tab label="Higher Education" {...a11yProps(1)} />
                                    <Tab label="Professional" {...a11yProps(2)} />
                                    <Tab label="Interest Based" {...a11yProps(3)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <div className="text-right">
                                <button type="button" className="btn primary-bg text-white border-r pl-4 pr-4">View All</button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
                <div className='clearfix'></div>

                <div className='tabs-content'>
                    <Container >
                        <CustomTabPanel value={value} index={0}>
                            <Grid container spacing={5}>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/best1.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>HTML & CSS</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>120 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/photo.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Photographer</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/photo.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Photographer</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/js.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>JavaScript</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>120 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/ds.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Desain Grafis</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/ds.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Desain Grafis</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Grid container spacing={5}>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/js.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>JavaScript</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>120 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/ds.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Desain Grafis</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/ds.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Desain Grafis</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Grid container spacing={5}>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/best1.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>HTML & CSS</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>120 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/photo.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Photographer</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/photo.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Photographer</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>

                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <Grid container spacing={5}>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/best1.png`} alt="HTML & CSS" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>HTML & CSS</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>120 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/photo.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Photographer</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/photo.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Photographer</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/js.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>JavaScript</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>120 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/ds.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Desain Grafis</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="course-box">
                                        <img src={`${assetUrl}/ds.png`} alt="" />
                                        <div className='tabs-con-box'>
                                            <span className='float-left'>
                                                <h4>Desain Grafis</h4>
                                            </span>
                                            <span className='float-right'>
                                                <small className='font-w500' style={{ 'color': '#545BE8' }} >1,500 Views</small>
                                            </span>
                                            <div className="clearfix"></div>
                                            <ul>
                                                <li>100 Videos</li>
                                                <li>2 Teacher</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </CustomTabPanel>

                    </Container>
                </div>


            </div>
        </div>
    );
}