import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import configJson from "vridhee_common_component_mf/configJson";

const assetUrl = configJson.local.assetUrl;

export default function Activity() {
    return (
        <div>
            <div className="activitys-sec mt-5">
                <Container fixed>
                    <h4 className='primary-color font-w600'>Activity</h4>
                    <p>Participate in activity driven learning mechanism and win various rewords, certificates and VCoins</p>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <div className="activity-box">
                                <img src={`${assetUrl}/aca.png`} alt="" />
                                <h4>Academic</h4>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="activity-box">
                                <img src={`${assetUrl}/non.png`} alt="Non-academic" />
                                <h4>Non-academic</h4>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="activity-box">
                                <img src={`${assetUrl}/comm.png`} alt="Community Service" />
                                <h4>Community Service</h4>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="activity-box">
                                <img src={`${assetUrl}/fam.png`} alt="Family Bonding" />
                                <h4>Family Bonding</h4>
                            </div>
                        </Grid>
                    </Grid>
                </Container>

            </div>
        </div>
    );
}