import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import configJson from "vridhee_common_component_mf/configJson";

const assetUrl = configJson.local.assetUrl;


export default function InstituteService() {
    return (
        <div>
            <div className="institute-service-sec bg-white">
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6}>
                            <div className="institute-service-sec-box">
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={1}>
                                        <div className="institute-service-sec-img">
                                            <img src={`${assetUrl}/login/40%20Module.svg`} alt="" className="institute-service-sec-img-normal" />
                                            <img src={`${assetUrl}/login/40Module-white.svg`} alt="" className="institute-service-sec-img-hover-image" />

                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={11}>
                                        <div className="institute-service-sec-con">
                                            <h3>More Than 40 Modules</h3>
                                            <p>Our Platform comes pre-packed with more than 40+ ready-to-use modules. On top of it, all the modules are highly flexible and customizable to cater client specific needs. Also integrated with hardware like face recognizer, RFID, barcode scanner, VTS and other resources to make the system really automated.</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <div className="institute-service-sec-box">
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={1}>
                                        <div className="institute-service-sec-img">
                                            <img src={`${assetUrl}/login/support%20serv%20icon.svg`} alt="" className="institute-service-sec-img-normal" />
                                            <img src={`${assetUrl}/login/Support%20services-white.svg`} alt="" className="institute-service-sec-img-hover-image" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={11}>
                                        <div className="institute-service-sec-con">
                                            <h3>Support & Services</h3>
                                            <p>When you become a emsVridhee user, our dedicated support teams are a phone call or click away. They understand the importance of providing prompt, professional solutions to every query. We also use ticket system to track your queries and manage regular health checkup.</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <div className="institute-service-sec-box">
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={1}>
                                        <div className="institute-service-sec-img">
                                            <img src={`${assetUrl}/login/redef%20logo.svg`} alt="" className="institute-service-sec-img-normal" />
                                            <img src={`${assetUrl}/login/Redefine%20Edu-white.svg`} alt="" className="institute-service-sec-img-hover-image" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={11}>
                                        <div className="institute-service-sec-con">
                                            <h3>Redefining Education</h3>
                                            <p>emsVridhee provides an integrated learning solution for schools, professional colleges, institutes, group of institution and universities, designed to help them deliver high quality complete technology solutions</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <div className="institute-service-sec-box">
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={1}>
                                        <div className="institute-service-sec-img">
                                            <img src={`${assetUrl}/login/Mobile-application-white.svg`} alt="" className="institute-service-sec-img-normal" />
                                            <img src={`${assetUrl}/login/mobile%20app%20icon.svg`} alt="" className="institute-service-sec-img-hover-image" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={11}>
                                        <div className="institute-service-sec-con">
                                            <h3>Mobile Application</h3>
                                            <p>emsVridhee users can access all learning activities any-time any-where with mobile applications. Institution can regulate and communicate to stakeholders. Parents can track the performance of their wards and interact with teachers and institutions.</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <div className="institute-service-sec-box">
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={1}>
                                        <div className="institute-service-sec-img">
                                            <img src={`${assetUrl}/login/personalization%20logo.svg`} alt="" className="institute-service-sec-img-normal" />
                                            <img src={`${assetUrl}/login/Personalization-white.svg`} alt="" className="institute-service-sec-img-hover-image" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={11}>
                                        <div className="institute-service-sec-con">
                                            <h3>Personalization</h3>
                                            <p>emsVridhee allows complete personalization for each institution, educator and learner. One can use own logo and customize the appearance, adapt the training content structure, methods and analytics to reflect the goals and tailor the system.</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <div className="institute-service-sec-box">
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={1}>
                                        <div className="institute-service-sec-img">
                                            <img src={`${assetUrl}/login/security%20icon.svg`} alt="" className="institute-service-sec-img-normal" />
                                            <img src={`${assetUrl}/login/Security%20and%20reliability-white.svg`} alt="" className="institute-service-sec-img-hover-image" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={11}>
                                        <div className="institute-service-sec-con">
                                            <h3>Security & Reliability</h3>
                                            <p>emsVridhee provides controlled access to all users with the highest degree of data security at all ends. We ensure content security and personal / user information security and the same cannot be accessed by anyone without consent.</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <div className="product-features pt-4">
                <Container>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                            <h4 className="primary-color font-w600">Product Features</h4>
                            <div className="product-feture-box">
                                <img src={`${assetUrl}/login/product%20feature%20icon.svg`} alt="product fetures" />
                            </div>

                        </Grid>
                    </Grid>
                </Container>
            </div>

            <div className="product-benifits pt-4">
                <Container>
                    <h4 className="primary-color font-w600 mb-3">Product Benifits</h4>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <div className="product-benifits-box">
                                <h4><i className="fa fa-money" aria-hidden="true"></i>No Major Investment needed</h4>
                                <p>Being a cloud based model, our clients do not required to invest on servers, firewall & other software.</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className="product-benifits-box">
                                <h4><i className="fa fa-thumbs-o-up" style={{ 'color': '#d43d1e', 'borderColor': '#d43d1e' }} aria-hidden="true"></i>100% uptime and backup</h4>
                                <p>Unlike on-premise software, our ERP doesn't get disrupted by barring monthly maintenance scheduled at convenient times. Hence a hassle free usage with monthly encrypted backups</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className="product-benifits-box">
                                <h4><i className="fa fa-cog" style={{ 'color': '#3ea744', 'borderColor': '#3ea744' }} aria-hidden="true"></i>Robust and Scalable</h4>
                                <p>Unlike on-premise software, our ERP doesn't get disrupted by barring monthly maintenance scheduled at convenient times. Hence a hassle free usage with monthly encrypted backups</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className="product-benifits-box">
                                <h4><i className="fa fa-cogs" style={{ 'color': '#3ea744', 'borderColor': '#3ea744' }} aria-hidden="true"></i>Service Oriented Solution</h4>
                                <p>We take pride in our service network and compatibilities. Our service cost includes license fee. Implementation cost, online support cost, and data migration cost. We provide module based ready ERP</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className="product-benifits-box">
                                <h4><i className="fa fa-pencil-square-o" style={{ 'color': '#199ed8', 'borderColor': '#199ed8' }} aria-hidden="true"></i>Customized Application</h4>
                                <p>We understand that every institution is unique and used to have their own working environments, so we provide a customized product so that system does not change the current process but work to automat them to save time and remove their pain arewa.</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className="product-benifits-box">
                                <h4><i className="fa fa-refresh" style={{ 'color': '#d73b22', 'borderColor': '#d73b22' }} aria-hidden="true"></i>Regular Updates</h4>
                                <p>We know change is part of life and that is why we keep on upgrading ourselves with new technologies, features and functionalities. we also update them to all our clients without any extra cost.</p>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}