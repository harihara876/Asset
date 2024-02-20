import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Carousel from "react-multi-carousel";
import React from "react";
import configJson from "vridhee_common_component_mf/configJson";

const assetUrl = configJson.local.assetUrl;
export default function AdvocacyFull() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 2
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div>
            <div className="feedback mt-2">
                <Container >
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12}>
                            <h4 className='primary-color font-w600 mb-2'>Advocacy</h4>
                        </Grid>
                    </Grid>
                    <Carousel responsive={responsive} autoPlay>
                        <div>
                            <div className="feedback-box">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={9}>
                                        <div className="feedback-con">
                                            <p>Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="feedback-img">
                                            <img src={`${assetUrl}/prn.png`} alt="" />
                                            <h5>Mr. Pranav Yadav </h5>
                                            <p className="m-0"><b>Administrative Director,</b></p>
                                            <p> Virendra Tiny-Tots Paradise Jaipur, Rajasthan</p>
                                        </div>
                                    </Grid>

                                </Grid>
                            </div>
                        </div>
                        <div>
                            <div className="feedback-box">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={9}>
                                        <div className="feedback-con">
                                            <p>Vridhee is the one of the most user-friendly Integrated School solutions out there. Their Fee Module has helped keep a tab on the collection and dues. I recommend Vridhee to anyone who wants to digitize their school.</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="feedback-img">
                                            <img src={`${assetUrl}/prn.png`} alt="" />
                                            <h5>Mr. Pranav Yadav </h5>
                                            <p className="m-0"><b>Administrative Director,</b></p>
                                            <p> Virendra Tiny-Tots Paradise Jaipur, Rajasthan</p>
                                        </div>
                                    </Grid>

                                </Grid>
                            </div>
                        </div>
                    </Carousel>

                </Container >
            </div>
        </div>
    );
}