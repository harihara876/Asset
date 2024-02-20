import { Menu } from "@material-ui/icons";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import AppButton from 'vridhee_common_component_mf/AppButton';
import ModalClose from '@mui/joy/ModalClose';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function TestReview() {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="quiztest-section">
            <div className="quiztest-header">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <h4>Introduction to Semi Conductors</h4>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="time-bar">
                            <div className="time-box">Score 9 / 20</div>
                            <div className="progrees-header"></div>
                            
                        </div>
                    </Grid>
                    
                </Grid>
            </div>
            <div className="quiztest-content">
                <div className="content-progressbar">
                    <div className="w-100 text-left test-attempted mt-2 mb-2">Attempted on August 10th, 2023 | 10:30 PM IST <span className="ml-5">Time Taken 0:21:17</span></div>
                    
                    <div className="clearfix"></div>
                </div>

                <div className="question-box-card ">
                    <div className="question-box-card-con">
                        <h5 className="mb-1 primary-color">Question 01</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor luctus libero, vel tincidunt sapien tempus eu. In a sodales odio. Quisque eu elit a ante luctus condimentum non ac magna. Phasellus faucibus convallis purus, in mollis leo laoreet vitae.?</p>
                        <div className="time-taken">
                            <div className="time-taken-test">
                                Time Taken: 0:00:06
                            </div>
                            <div className="time-taken-ideal">
                                 Ideal Time 0:01:00
                            </div>
                          <div className="clearfix"></div>
                        </div>
                        <div className="question-checbox">
                            <ul>
                                <li> <FormControlLabel control={<Checkbox />} className="your-answer" label="Option 01" /></li>
                                <li> <FormControlLabel control={<Checkbox />} className="current-answer" label="Option 02" /></li>
                                <li> <FormControlLabel control={<Checkbox />} label="Option 03" /></li>
                                <li> <FormControlLabel control={<Checkbox />} label="Option 04" /></li>

                            </ul>
                            <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                   
                    
                </div>

                <div className="question-box-card ">
                    <div className="question-box-card-con">
                        <h5 className="mb-1 primary-color">Question 02</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor luctus libero, vel tincidunt sapien tempus eu. In a sodales odio. Quisque eu elit a ante luctus condimentum non ac magna. Phasellus faucibus convallis purus, in mollis leo laoreet vitae.?</p>
                        <div className="time-taken">
                            <div className="time-taken-test">
                                Time Taken: 0:00:06
                            </div>
                            <div className="time-taken-ideal">
                                 Ideal Time 0:01:00
                            </div>
                          <div className="clearfix"></div>
                        </div>
                        <div className="question-checbox">
                            <ul>
                                <li> <FormControlLabel control={<Checkbox />} className="your-answer" label="Option 01" /></li>
                                <li> <FormControlLabel control={<Checkbox />}  label="Option 02" /></li>
                                <li> <FormControlLabel control={<Checkbox />} className="current-answer" label="Option 03" /></li>
                                <li> <FormControlLabel control={<Checkbox />} label="Option 04" /></li>

                            </ul>
                            <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                   
                    
                </div>

                <div className="question-box-card ">
                    <div className="question-box-card-con">
                        <h5 className="mb-1 primary-color">Question 03</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor luctus libero, vel tincidunt sapien tempus eu. In a sodales odio. Quisque eu elit a ante luctus condimentum non ac magna. Phasellus faucibus convallis purus, in mollis leo laoreet vitae.?</p>
                        <div className="time-taken">
                            <div className="time-taken-test">
                                Time Taken: 0:00:06
                            </div>
                            <div className="time-taken-ideal">
                                 Ideal Time 0:01:00
                            </div>
                          <div className="clearfix"></div>
                        </div>
                        <div className="question-checbox">
                            <ul>
                                <li> <FormControlLabel control={<Checkbox />}  label="Option 01" /></li>
                                <li> <FormControlLabel control={<Checkbox />} className="current-answer" label="Option 02" /></li>
                                <li> <FormControlLabel control={<Checkbox />} label="Option 03" /></li>
                                <li> <FormControlLabel control={<Checkbox />} className="your-answer" label="Option 04" /></li>

                            </ul>
                            <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                   
                    
                </div>

               

            </div>


        </div>
    );

}