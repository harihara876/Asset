import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IUser from "../Models/IUser";
import { LoginService } from "../Services/loginService";
import { ToastContainer, toast } from 'react-toastify';
import Alert from '@mui/material/Alert';
import configJson from "vridhee_common_component_mf/configJson";
import { url } from "inspector";
import jwt_decode from "jwt-decode";
import LoadingSpinner from "./loading-spinner";

interface IActor {
    actors: IUser[],
    errorMessage: string
}

const Route_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.routeUrl : configJson.server.routeUrl
const Dashboard_Route_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl



export default function Spalsh() {
    const [isLoading, setIsLoading] = useState(false);
    const assetUrl = configJson.local.assetUrl;

    const navigate = useNavigate();
    const [actor, setActor] = useState<IActor>({
        actors: [] as IUser[],
        errorMessage: ''
    })

    useEffect(() => {
            setActor({ ...actor })
                    LoginService.getActors()
                        .then(res => {
                            if (res.data.data.length) {
                                setActor({
                                    ...actor, actors: res.data.data
                                })
                            }
                            else {
                                toast.error(res.data.msg);
                            }
                        })
                        .catch(e =>
                            setActor({
                                ...actor, errorMessage: e.message
                            })
                        );
        
    }, [])

    const { actors, errorMessage } = actor;


    const getActorProfiles = (id: string | undefined, type: string | undefined) => {
        if (id) {
            localStorage.setItem('id', id);
        }
        if (type) {
            localStorage.setItem('actorType', type);
        }

        const data = { id: id, type: type };
        navigate("/login", { state: data });


    };

    return (
        <div className="contianer">
            <div className="">
                <Grid container direction="row" justifyContent="center" alignItems="center">

                    <Grid item xs={12} md={5}>
                        <div className="joinus-left-con"  >
                            <div className="joinus-inner-content">
                                <div className="joinus-inner-log">
                                    <img src={`${assetUrl}/white-logo.svg`} alt="VRIDHEE" style={{ 'width': '250px' }} />
                                </div>
                                <div className="joinus-inner-con">
                                    <h4>
                                    {/* A social learning platform A place where learning ≠ boredom */}
                                    Adaptive learning based social learning platform
                                    </h4>
                                    <div className="quote-icon position-relative">
                                        <p>
                                        Vridhee is a social learning platform provided by AI / ML and internet technologies
to make education more inclusive, affordable, equitable, and accessible to all
sections of society bringing the mentors and learners together for a seamless
knowledge sharing experience through adaptive, peer, social and activity based
learning with multilingual curriculum
                                            {/* Vridhee is the 1st social learning platform bringing all the teachers and learners together for a seamless knowledge sharing experience through community driven learning with multilingual curriculum using curated web-sourced contents to enable #educationforall */}
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <div className="joinus-right-con">
                            <div className="joinus-right-content">
                                <div className="breadcrumbs-sec">
                                    <Breadcrumbs aria-label="breadcrumb">
                                        <a color="#174392" href="/">
                                            Splash
                                        </a>
                                        <Typography>Join Us</Typography>
                                    </Breadcrumbs>
                                </div>

                                {actors.length > 0 ? actors.map((actors, i) =>
                                    <div className="content-box-j" key={i} onClick={() => getActorProfiles(actors._id, actors.type)}>
                                        <Link to="">
                                            <div className="joinus-icon-box">
                                                <img src={actors.img_url} alt="Learner" />
                                            </div>
                                            <div className="joinus-icon-box1">
                                                <h4>{actors.type}</h4>
                                                <p>{actors.desc} &nbsp;&nbsp;
                                                    <img src={`${assetUrl}/arrow.svg`} alt="" />
                                                </p>
                                            </div>
                                        </Link>
                                        <div className="clearfix"></div>
                                    </div>
                                ) : <div>  <LoadingSpinner />  </div>}

                            </div>
                        </div>
                    </Grid>

                </Grid>
            </div>
            <ToastContainer />
        </div>
    );
}
