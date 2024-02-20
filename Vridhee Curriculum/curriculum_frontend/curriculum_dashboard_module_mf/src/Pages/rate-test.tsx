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
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function RateTest() {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="quiztest-section">
            <div className="quiztest-header">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <h4>Introduction to Semi Conductors</h4>

                    </Grid>
                </Grid>
            </div>

            <div className="rate-content">
                <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                        <div className="rate-content-box">
                            <label><b>Rate this Test</b></label>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Easy" />
                                <FormControlLabel control={<Checkbox />} label="Average" />
                                <FormControlLabel control={<Checkbox />} label="Hard" />
                                <FormControlLabel control={<Checkbox />} label="Average" />
                            </FormGroup>
                        </div>
                        <div className="text-area">
                            <TextField
                                id="filled-multiline-static"
                                label="Feedback"
                                className="w-100 mt-2"
                                multiline
                                rows={4}
                                defaultValue=""
                                variant="filled"
                            />
                        </div>
                        <div className="">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Challenge Friends" />
                            </FormGroup>
                            <div className="list-friends mt-2">
                                <div className="w-80">
                                    <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                    <h4>Dipyaman</h4>
                                </div>
                                <div className="w-20">
                                    <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                    <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="list-friends mt-2">
                                <div className="w-80">
                                    <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                    <h4>Dipyaman</h4>
                                </div>
                                <div className="w-20">
                                    <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                    <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="list-friends mt-2">
                                <div className="w-80">
                                    <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                    <h4>Dipyaman</h4>
                                </div>
                                <div className="w-20">
                                    <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                    <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="list-friends mt-2">
                                <div className="w-80">
                                    <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                    <h4>Dipyaman</h4>
                                </div>
                                <div className="w-20">
                                    <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                    <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="list-friends mt-2">
                                <div className="w-80">
                                    <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                    <h4>Dipyaman</h4>
                                </div>
                                <div className="w-20">
                                    <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                    <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="list-friends mt-2">
                                <div className="w-80">
                                    <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                    <h4>Dipyaman</h4>
                                </div>
                                <div className="w-20">
                                    <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                    <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="get-result mt-2">
                            <div className="button-center text-center">
                                <a href="topic-page#simple-tab-3">
                                <AppButton
                                  children="Get Result"
                                  styleClass='btn save-btn  primary-bg text-white' />
                                  </a>
                              </div>

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>



        </div>
    );

}