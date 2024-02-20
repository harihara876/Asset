import Grid from "@material-ui/core/Grid";
import { Container } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import configJson from "vridhee_common_component_mf/configJson";

const assetUrl = configJson.local.assetUrl;

export default function Advocacy() {
    const responsive1 = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div>
            <div className="multi-testmonials mt-5">
                <Container>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12}>
                            <h4 className='primary-color font-w600 mb-2'>Advocacy</h4>
                        </Grid>
                    </Grid>
                    <div className="w-90">
                        <Carousel responsive={responsive1} autoPlay>

                            <div>
                                <div className="scroll-feedback-con">
                                    <p>Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                    <div className="feedback-img">
                                        <img src={`${assetUrl}/prn.png`} alt="" />
                                        <h5>Mr. Pranav Yadav </h5>
                                        <p className="m-0"><b>Administrative Director,</b></p>
                                        <p> Virendra Tiny-Tots Paradise Jaipur, Rajasthan</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="scroll-feedback-con">
                                    <p>Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                    <div className="feedback-img">
                                        <img src={`${assetUrl}/prn.png`} alt="" />
                                        <h5>Mr. Pranav Yadav </h5>
                                        <p className="m-0"><b>Administrative Director,</b></p>
                                        <p> Virendra Tiny-Tots Paradise Jaipur, Rajasthan</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="scroll-feedback-con">
                                    <p>Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                    <div className="feedback-img">
                                        <img src={`${assetUrl}/prn.png`} alt="" />
                                        <h5>Mr. Pranav Yadav </h5>
                                        <p className="m-0"><b>Administrative Director,</b></p>
                                        <p> Virendra Tiny-Tots Paradise Jaipur, Rajasthan</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="scroll-feedback-con">
                                    <p>Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                    <div className="feedback-img">
                                        <img src={`${assetUrl}/prn.png`} alt="" />
                                        <h5>Mr. Pranav Yadav </h5>
                                        <p className="m-0"><b>Administrative Director,</b></p>
                                        <p> Virendra Tiny-Tots Paradise Jaipur, Rajasthan</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="scroll-feedback-con">
                                    <p>Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                    <div className="feedback-img">
                                        <img src={`${assetUrl}/prn.png`} alt="" />
                                        <h5>Mr. Pranav Yadav </h5>
                                        <p className="m-0"><b>Administrative Director,</b></p>
                                        <p> Virendra Tiny-Tots Paradise Jaipur, Rajasthan</p>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </Container>
            </div>
        </div>
    );
}