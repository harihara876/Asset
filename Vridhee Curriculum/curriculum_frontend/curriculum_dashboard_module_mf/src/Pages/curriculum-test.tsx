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

export default function QuizTest() {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="quiztest-section">
            <div className="quiztest-header">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <h4>Introduction to Semi Conductors</h4>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="time-bar">
                            <div className="time-box">Time: 29:00 / 30:00</div>
                            <div className="progrees-header"></div>
                            <div className="total-time">Total: 20</div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <a href="/test-review">
                        <AppButton
                            children="FINISH TEST"
                            styleClass='btn save-btn border-rs primary-color bg-white w-100' />
                        </a>
                    </Grid>
                </Grid>
            </div>
            <div className="quiztest-content">
                <div className="content-progressbar">
                    <div className="w-80 text-center question-left">2 Questions Left</div>
                    <div className="w-20 text-right">
                        <React.Fragment>
                            <IconButton color="neutral" onClick={() => setOpen(true)}>
                                <Menu />
                            </IconButton>
                            <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        ml: 'auto',
                                        mt: 1,
                                        mr: 2,
                                    }}
                                >
                                    <Typography
                                        component="label"
                                        htmlFor="close-icon"
                                        fontSize="sm"
                                        fontWeight="lg"
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        Close
                                    </Typography>
                                    <ModalClose id="close-icon" sx={{ position: 'initial' }} />
                                </Box>
                                <div className="quation-boxs">
                                   <div className="title-popup">
                                   <IconButton color="neutral" onClick={() => setOpen(true)}><Menu /></IconButton>&nbsp;&nbsp;<h4>Question Navigator</h4>
                                   </div>
                                   <div className="question-count mt-2">
                                        <div className="w-50">
                                            <div className="answerd-qu"></div>
                                            Answered 11
                                        </div>
                                        <div className="w-50">
                                            <div className="unanswerd-qu"></div>
                                            UnAnswered 11
                                        </div>
                                        <div className="clearfix"></div>
                                   </div>
                                   <div className="totalquestions-count mt-2">
                                        <div className="answerd-question-box">1</div>
                                        <div className="answerd-question-box">2</div>
                                        <div className="answerd-question-box">3</div>
                                        <div className="answerd-question-box">4</div>
                                        <div className="answerd-question-box">5</div>
                                        <div className="unanswerd-question-box">6</div>
                                        <div className="answerd-question-box">7</div>
                                        <div className="answerd-question-box">8</div>
                                        <div className="answerd-question-box">9</div>
                                        <div className="unanswerd-question-box">10</div>
                                        <div className="unanswerd-question-box">11</div>
                                        <div className="answerd-question-box">12</div>
                                        <div className="answerd-question-box">13</div>
                                        <div className="answerd-question-box">14</div>
                                        <div className="answerd-question-box">12</div>
                                        <div className="answerd-not-touch">13</div>
                                        <div className="answerd-question-box">14</div>
                                        <div className="answerd-not-touch">15</div>
                                        <div className="answerd-question-box">16</div>
                                        <div className="answerd-question-box">17</div>
                                        <div className="answerd-question-box">18</div>
                                        <div className="answerd-not-touch">19</div>
                                        <div className="answerd-question-box">20</div>
                                   </div>
                                </div>
                            </Drawer>
                        </React.Fragment>

                    </div>
                    <div className="question-bar mt-2 mb-5"></div>
                    <div className="clearfix"></div>
                </div>

                <div className="question-box-card mt-3">
                    <div className="question-box-card-con">
                        <h5 className="mb-1 primary-color">Question 01</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor luctus libero, vel tincidunt sapien tempus eu. In a sodales odio. Quisque eu elit a ante luctus condimentum non ac magna. Phasellus faucibus convallis purus, in mollis leo laoreet vitae.?</p>
                        <div className="question-checbox">
                            <ul>
                                <li> <FormControlLabel control={<Checkbox />} label="Option 01" /></li>
                                <li> <FormControlLabel control={<Checkbox />} label="Option 02" /></li>
                                <li> <FormControlLabel control={<Checkbox />} label="Option 03" /></li>
                                <li> <FormControlLabel control={<Checkbox />} label="Option 04" /></li>

                            </ul>
                            <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="question-box-card-footer">
                        <AppButton
                            children="Provide Hint"
                            styleClass='btn outlined-btn mr-3' />
                        <AppButton
                            children="Mark for Review"
                            styleClass='btn outlined-btn mr-3' />
                        <AppButton
                            children="Save & Next"
                            styleClass='btn save-btn border-rs text-white primary-color' />
                    </div>
                    <div className="extra-content">
                        <p><b className="primary-color">Hint:-</b></p>
                        <p>Ut tristique tempor mollis. Curabitur sed purus ante. Vivamus sit amet dui id nunc semper molestie eu id nibh. Maecenas sodales in enim ut sodales. Cras pharetra tellus sem, vitae rhoncus metus rutrum eu. Nullam eleifend lobortis purus eget tincidunt. Nam vitae leo fringilla, facilisis neque id, ornare arcu. Suspendisse at turpis finibus, interdum justo in, lacinia sapien. Nam ut massa et libero convallis sagittis. Cras id mi mauris. Nulla ultrices dolor et nisl dictum ultricies.</p>
                        <div className="text-right">
                        <AppButton
                            children="Close Hint"
                            styleClass='btn outlined-btn ' />
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );

}