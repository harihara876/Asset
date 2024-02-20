import Grid from "@mui/material/Grid";
import configJson from "vridhee_common_component_mf/configJson";
import React from "react";
import { Link } from "react-router-dom";

export default function CurriculumNew() {
    const assetUrl = configJson.local.assetUrl
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <div className="community-box">
                        <img src={`${assetUrl}/curriculim/Curriculum.svg`} alt="Curriculum" />
                        <h4>Curriculum</h4>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div className="community-box">
                        <img src={`${assetUrl}/login/community profile.svg`} alt="Community" />
                        <h4>Community</h4>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div className="community-box">
                        <img src={`${assetUrl}/login/Campus profile.svg`} alt="Campus" />
                        <h4>Campus</h4>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div className="free-education text-center">
                        <h4 className="primary-color font-w600">72 M+</h4>
                        <p className="m-0">Children does not have access to affordable quality education globally</p>
                        <Link to="" style={{ 'color': '#000000' }}><small>Access to quality teacher</small></Link>
                        <button type="button" className="btn primary-bg text-white border-r mt-2 pl-2 pr-2">Support Free Education</button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}