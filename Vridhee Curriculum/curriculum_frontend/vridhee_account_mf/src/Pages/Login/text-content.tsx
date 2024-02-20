
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
export default function TextContent() {
    return (
        <div>
            <div className="content-sec mt-3 mb-3">
                <Container fixed >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3} >
                            <div className="content-text-box" style={{ 'background': '#8869a2' }}>
                                <h2>Automate</h2>
                                <p className="mb-1 font-w500 content-text-subtitle">Processes & activities across institution</p>
                                <p className="m-0">Reduce paperwork & workload</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="content-text-box" style={{ 'background': '#85c226' }}>
                                <h2>Integrate</h2>
                                <p className="mb-1 font-w500 content-text-subtitle">Smart technology & hardware for organizational data</p>
                                <p className="m-0">Actionable interlligence for informed decision making.</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="content-text-box" style={{ 'background': '#000000' }}>
                                <h2>Empower</h2>
                                <p className="mb-1 font-w500 content-text-subtitle">Administration with real-time information</p>
                                <p className="m-0">Optimize, structured, collaborate & easy sharing</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className="content-text-box" style={{ 'background': '#e77843' }}>
                                <h2>Connect</h2>
                                <p className="mb-1 font-w500 content-text-subtitle">Stakeholders across the education ecosystem</p>
                                <p className="m-0">Management, staff, faculties, parents, students & alumni</p>
                            </div>
                        </Grid>
                    </Grid>
                </Container >
            </div>
        </div>
    );
}