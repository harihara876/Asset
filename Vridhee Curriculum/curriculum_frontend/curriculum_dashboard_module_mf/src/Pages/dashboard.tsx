import React, { useCallback, useEffect, useState } from "react";
import { format } from 'date-fns';
import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from "@mui/material/Drawer";
import Stack from '@mui/material/Stack';
import _ from "lodash";
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Paper, Button, Alert, Modal } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import FooterCopyright from 'vridhee_common_component_mf/FooterCopyright';
import DashboardService from "../Services/dashboardservices"
import IDashboard from "../Models/IDashboard";
import configJson from "vridhee_common_component_mf/configJson";
import { Textarea } from "@mui/joy";
import AppButton from 'vridhee_common_component_mf/AppButton';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

const drawerWidth = 150;
let userdetails: IDashboard
let profileImage: string
let actorType: string;
let token: string
let sid :string
let userId:string

interface IChapter {
    chapters: IDashboard[],
    errorMessage: string
}

interface IMyPlanning {
    myplannings: IDashboard[]
}
interface IMyPlanning1 {
    myplannings1: IDashboard[]
}
interface IMyPlanningweek {
    myplanningsweek: IDashboard[]
}
interface ICollaboration {
    collaborationcounts: IDashboard
}


interface ISubject {
    subjects: IDashboard[],
    errorMsg: string
}

interface IActivity {
    activities: IDashboard[]
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const assetUrl = configJson.local.curriculumAssetUrl;
const assetUrl1 = configJson.local.assetUrl;
let date = format(new Date(), 'E, dd MMM, yyyy')
let tomorrow = moment().add(1, 'days');
let week = moment().add(5, 'days');
let tomorrowdate = format(tomorrow._d, 'E, dd MMM, yyyy')
let weekdate = format(week._d, 'E, dd MMM, yyyy')
// let time = new Date().toLocaleTimeString();
let tomorrowtime = tomorrow._d.toLocaleTimeString();
let weektime = week._d.toLocaleTimeString();




function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };

}
function Item(props: { item: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; description: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; }) {
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}
function FacebookCircularProgress(props: CircularProgressProps) {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </Box>
    );
}

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

const Dashboard_Route_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl



let profileId :string | undefined;

export default function Dashboard() {

    const location = useLocation();
    console.log(location.state,"location.state")

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const [showmore, setShowMore] = React.useState(false);
    const [dashboardSummaryData, setDashboardSummaryData] = useState<IDashboard | null>(null);
    const [dashboardHeaderCount, setDashboardHeaderCount] = useState<IDashboard | null>(null);
    const now = new Date().toLocaleTimeString();
    const [time, setTime] = useState(now);
    const [name, setName] = useState<string | null>('');
    const [image, setImage] = useState<string | null>('');
    
    const getcheckIsUserLogin = useCallback((actorType) => {
        if( actorType != 'Campus'){
            if(location.state?.userId){
                DashboardService.mobilecheckIsUserLogin(location?.state?.userId,location?.state?.token)
                .then(res => {
                    if (res.data.code == 200) {
                        if (res.data.data.accessToken) {
                            let userdetails: any = jwtDecode(res.data.data.accessToken);
                            localStorage.setItem('token', res.data.data.accessToken)
                            // console.log(userdetails,"userdetails")
                            const userId = userdetails.user_id;
                            localStorage.setItem('Tokenuserid', userdetails.user_id)
                                // DashboardService.userVerify(userId)
                                //     .then(result => {
                                //         if (result.data.status == 200 && result.data.msg == 'Onboarding_Completed') {
                                //             window.location.replace(`${Dashboard_Route_URL}dashboard` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid') )
                                //             // window.location.replace(`${Dashboard_Route_URL}dashboard` + "?" + res.data.data.accessToken + "?" +  localStorage.getItem('actorType'))
                                //         } 
                                //         // else {
                                //         //     window.location.replace(`${Route_URL}` + "?" + res.data.data.accessToken + "?" +  localStorage.getItem('actorType'))
                                //         // }
                                //     })
                                //     .catch(error => {
                                //         toast.error(error.message);
                                //     });
                        }else{
                            // toast.error(res.data.message)
                        }
                    } else{
                        // toast.error(res.data.message)
                    }
                })
                .catch(e =>
                    console.log(e)
                );
            } else{
                DashboardService.checkIsUserLogin()
                .then(res => {
                    if (res.data.code == 200) {
                        if (res.data.data.accessToken) {
                            let userdetails: any = jwtDecode(res.data.data.accessToken);
                            localStorage.setItem('token', res.data.data.accessToken)
                            // console.log(userdetails,"userdetails")
                            const userId = userdetails.user_id;
                            localStorage.setItem('Tokenuserid', userdetails.user_id)
                                // DashboardService.userVerify(userId)
                                //     .then(result => {
                                //         if (result.data.status == 200 && result.data.msg == 'Onboarding_Completed') {
                                //             window.location.replace(`${Dashboard_Route_URL}dashboard` + "?" + localStorage.getItem('actorType')  + "?" + localStorage.getItem('sid') + "?"  + localStorage.getItem('Tokenuserid') )
                                //             // window.location.replace(`${Dashboard_Route_URL}dashboard` + "?" + res.data.data.accessToken + "?" +  localStorage.getItem('actorType'))
                                //         } 
                                //         // else {
                                //         //     window.location.replace(`${Route_URL}` + "?" + res.data.data.accessToken + "?" +  localStorage.getItem('actorType'))
                                //         // }
                                //     })
                                //     .catch(error => {
                                //         toast.error(error.message);
                                //     });
                        }else{
                            // toast.error(res.data.message)
                        }
                    } else{
                        // toast.error(res.data.message)
                    }
                })
                .catch(e =>
                    console.log(e)
                );
            }
         
        }
    },[actorType]);
    
    // console.log(window.location.search,"window.location.search")
    
    if (window.location.search != null && window.location.search != '' && window.location.search != undefined) {
        var prmstr = window.location.search.split("?");
        // token = prmstr[1];
        // localStorage.setItem('token', token);
        actorType = prmstr[1]
        localStorage.setItem('actorType', actorType);
        sid = prmstr[2];
        localStorage.setItem('sid', sid);
        userId = prmstr[3];
        localStorage.setItem('Tokenuserid', userId);
    } else{
        let actorType = localStorage.getItem('actorType');
        if(actorType){
            // getcheckIsUserLogin(actorType!)
        }
    }
    



   

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const gotoPlanner = () => {
       navigate('/planner')
    };

    function showMore() {
        setShowMore(true)
    }

    function showLess() {
        setShowMore(false)
    }

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const [chapter, setChapters] = useState<IChapter>({
        chapters: [] as IDashboard[],
        errorMessage: ''
    })

    const [myplanning, setMyPlanning] = useState<IMyPlanning>({
        myplannings: [] as IDashboard[],
    })
    const [myplanning1, setMyPlanning1] = useState<IMyPlanning1>({
        myplannings1: [] as IDashboard[],
    })
    const [myplanningweek, setMyPlanningweek] = useState<IMyPlanningweek>({
        myplanningsweek: [] as IDashboard[],
    })
    const [collaborationcount, setCollaborationcount] = useState<ICollaboration>({
        collaborationcounts: {} as IDashboard
    })


    const [subject, setSubjects] = useState<ISubject>({
        subjects: [] as IDashboard[],
        errorMsg: ''
    })

    const [activity, setActivity] = useState<IActivity>({
        activities: [] as IDashboard[]
    })

   
    useEffect(() => {
        let todaydatee = moment(new Date()).format('MM/DD/YYYY');
        let tomorrowdatee = moment(tomorrow._d).format('MM/DD/YYYY');
        let weekdatee =moment(week._d).format('MM/DD/YYYY');

        let userId = localStorage.getItem('Tokenuserid') ;
        const body = {
            "userId": userId
          }
        DashboardService.getStudyPlan(body,userId!,64).then(res => {
                var newData: any = res.data.data.plan.map((x: any) => {
                   x.date = x.date.toString().split(',')[0]
                    return x;
                  });

                let filtered_array :any[]= _.filter(newData,
                    [  'date' ,todaydatee]
                );
                console.log(filtered_array,"todayfiltered_array")

                const filtered = _.filter(newData, (newData) => {
                    return newData.date >= todaydatee && newData.date <= weekdatee;
                  });
                  console.log(filtered,"weekfiltered")

                setMyPlanning({
                    ...myplanning, myplannings:_.filter(newData, [  'date' ,todaydatee] )
                })
                setMyPlanning1({
                    ...myplanning1, myplannings1:_.filter(newData, [  'date' ,tomorrowdatee ])
                })
                setMyPlanningweek({
                    ...myplanningweek, myplanningsweek:filtered
                })
               




            })
            .catch(e => {
                console.log(e, "e")
            })
    }, [])


    useEffect(() => {
        let userId = location.state?.userId ?  location?.state?.userId : localStorage.getItem('Tokenuserid') ;
        DashboardService.subjectNeedToJoin(userId)
            .then(res => {
                if(res.data.data){
                    setChapters({
                        ...chapter, chapters: res.data.data
                    })
                }
            })
            .catch(e =>
                setChapters({
                    ...chapter, errorMessage: e.message
                })
            );
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    useEffect(() => {
        let userId = location.state?.userId  ?  location?.state?.userId : localStorage.getItem('Tokenuserid') ;
        const body = {
            "user_id": userId
          }
        DashboardService.getCollaborationCount(body,userId,27)
            .then(res => {
                if(res.data.status == 200){
                    setCollaborationcount({
                        ...collaborationcount, collaborationcounts: res.data.data
                    })
                }
            })
            .catch(e =>
               console.log(e)
            );
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    
    const { chapters, errorMessage } = chapter;
    const { collaborationcounts} = collaborationcount;
    const { myplannings} = myplanning;
    const { myplannings1} = myplanning1;
    const { myplanningsweek} = myplanningweek;
    // useEffect(() => {
    //     DashboardService.getActivities()
    //         .then(res => {
    //             if (res.data.data) {
    //                 setActivity({
    //                     ...activity, activities: res.data.data
    //                 })
    //             }

    //         })
    //         .catch(e =>
    //             console.log(e, "e")

    //         );
    //     // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, [])

    const { activities } = activity;


    useEffect(() => {
        setInterval(updatetime, 1000);
    }, []);

    function updatetime() {
        const newtime = new Date().toLocaleTimeString();
        setTime(newtime);
    }

    useEffect(() => {
        if (window.location.search != null && window.location.search != '' && window.location.search != undefined) {
            var prmstr = window.location.search.split("?");
            actorType = prmstr[1]
            localStorage.setItem('actorType', actorType);
            sid = prmstr[2];
            localStorage.setItem('sid', sid);
            userId = prmstr[3];
            localStorage.setItem('Tokenuserid', userId);
            if(sid){
                const body = {
                    "sid": sid
                  }
                DashboardService.getToken(body)
                .then(res => {
                  console.log(res.data.data.accessToken,"tokeeennn999999") 
                  token = res.data.data.accessToken;
                        localStorage.setItem('token', res.data.data.accessToken);
                        if (token) {
                            userdetails = jwtDecode(token);
                            if (userdetails.user_id) {
                                localStorage.setItem('Tokenuserid', userdetails?.user_id);
                            }
                            if (userdetails.disp_name) {
                                localStorage.setItem('DisplayName', userdetails?.disp_name)
                            }
                            //  profileId = userdetails.profileId;
                            // localStorage.setItem('profileId', userdetails?.profileId);
                            
    profileId = location?.state ? location?.state ?.userdetails.profileId  : userdetails.profileId
    localStorage.setItem('profileId', profileId!);


    let pId = profileId ? profileId : localStorage.getItem('profileId');

                            DashboardService.getProfileData(pId)
                            .then(ress => {
                                console.log(ress.data.data,"fdfdgfg")
                                if (ress.data.data) {
                                    setImage(ress.data.data?.personal_info?.image)
                                    localStorage.setItem('profileImage', ress.data.data.personal_info.image)
                                    setName(ress.data.data?.userdetails?.vdisp_name)
                                    localStorage.setItem('displayName', ress.data.data?.userdetails?.vdisp_name)
                                }
                
                            })
    
                            // let profileId = localStorage.getItem('profileId');
                            // DashboardService.getCurriculumSubjects(profileId)
                               
                            const body = {
                                "db_metadata": 27,
                                "user_id": location?.state?.userId ? location?.state?.userId :  localStorage.getItem('Tokenuserid'),
                            }
                            // DashboardService.getCurriculumSubjectsV2(profileId)
                            DashboardService.getCurriculum(body)
                                .then(res => {
                                    console.log("getCurriculumSubjects<<>>v2", res.data.data)
                                    if (res.data.status == 200) {
                                        setSubjects({
                                            ...subject, subjects: res.data.data
                                        })
                                    } else{
                                        setSubjects({
                                            ...subject, errorMsg: "No Data Available"
                                        })
                                    }
                                })
                                .catch(e =>
                                    setSubjects({
                                        ...subject, errorMsg: "No Data Available"
                                    })
                                );
                        }
                })
                .catch(e =>
                    console.log(e)
                );  
            }

        } else{
            let actorType = location?.state?.actorType ?  location?.state?.actorType : localStorage.getItem('actorType');
            if(actorType){
                getcheckIsUserLogin(actorType!)
            }

            DashboardService.getProfileData(location?.state?.userdetails.profileId)
            .then(ress => {
                console.log(ress.data.data,"fdfdgfg")
                if (ress.data.data) {
                    setImage(ress.data.data?.personal_info?.image)
                    localStorage.setItem('profileImage', ress.data.data.personal_info.image)
                    setName(ress.data.data?.userdetails?.vdisp_name)
                    localStorage.setItem('displayName', ress.data.data?.userdetails?.vdisp_name)
                }

            })

            let profileId = location?.state?.userdetails  ? location?.state?.userdetails.profileId : localStorage.getItem('profileId')
           
            const body = {
                "db_metadata": 27,
                "user_id": location?.state?.userId ? location?.state?.userId :  localStorage.getItem('Tokenuserid'),
            }
            // DashboardService.getCurriculumSubjectsV2(profileId)
            DashboardService.getCurriculum(body)
                                .then(res => {
                                    console.log("getCurriculumSubjects<<>>v2", res.data.data)
                                    if (res.data.status == 200) {
                                        setSubjects({
                                            ...subject, subjects: res.data.data
                                        })
                                    } else{
                                        setSubjects({
                                            ...subject, errorMsg: "No Data Available"
                                        })
                                    }
                                })
                                .catch(e =>
                                    setSubjects({
                                        ...subject, errorMsg: "No Data Available"
                                    })
                                );
        }

       
       

        
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { subjects ,errorMsg} = subject;

    function getChapterData(data: IDashboard) {
        console.log(data,"subject data")
        if(data?.sub_name!){
            localStorage.setItem('subName',data?.sub_name!)
        }
        navigate("/subject-details", { state: data });
    }


    function doubt() {
        navigate("/doubts");
    }

    function reward() {
        navigate("/rewards");
    }

    // useEffect(() => {
    //     if (userdetails) {
    //         let userId = userdetails.user_id;
    //         let act_ype = actorType
    //         DashboardService.getUserDashboardSummary(userId)
    //             .then(res => {
    //                 console.log("getActorDashboardSummaryData>>>",res.data)
    //                 setDashboardSummaryData(res.data.data[0])
    //             })
    //             .catch(e =>
    //                 console.log(e, "e")
    //             );
    //     } else {
    //         let userId = location?.state?.userId ?  location?.state?.userId : localStorage.getItem('Tokenuserid')
    //         let act_ype = localStorage.getItem('actorType')
    //         if (userId) {
    //             DashboardService.getUserDashboardSummary(userId)
                
    //                 .then(res => {
    //                     console.log("getActorDashboardSummaryData>>>",res.data)
    //                     setDashboardSummaryData(res.data.data[0])
    //                 })
    //                 .catch(e =>
    //                     console.log(e, "e")
    //                 );
    //         }
    //     }

    //     // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, [])

    
    useEffect(() => {
        const body = {
            "db_metadata": 27,
            "user_id": location?.state?.userId ? location?.state?.userId :  localStorage.getItem('Tokenuserid'),
        }
            DashboardService.getCurriculumHeader(body)
                .then(res => {
                    console.log("getCurriculumHeader>>>",res.data.data)
                    setDashboardHeaderCount(res.data.data)
                })
                .catch(e =>
                    console.log(e, "e")
                );
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])
    

    const [open1, setOpen1] = React.useState(false);
    const handleOpen = () => setOpen1(true);
    const handleClose = () => setOpen1(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '1px solid #00439224',
        boxShadow: 24,
        p: 2,
    };
    const [open2, setOpen2] = React.useState(false);
    const handleOpen1 = () => setOpen2(true);
    const handleClose1 = () => setOpen2(false);

    const [open3, setOpen3] = React.useState(false);
    const handleOpen2 = () => setOpen3(true);
    const handleClose2 = () => setOpen3(false);

    const [open4, setOpen4] = React.useState(false);
    const handleOpen3 = () => setOpen4(true);
    const handleClose3 = () => setOpen4(false);

    const [open5, setOpen5] = React.useState(false);
    const handleOpen4 = () => setOpen5(true);
    const handleClose4 = () => setOpen5(false);

    const [open6, setOpen6] = React.useState(false);
    const handleOpen5 = () => setOpen6(true);
    const handleClose5 = () => setOpen6(false);

    const [open7, setOpen7] = React.useState(false);
    const handleOpen6 = () => setOpen7(true);
    const handleClose6 = () => setOpen7(false);

    const [open8, setOpen8] = React.useState(false);
    const handleOpen7 = () => setOpen8(true);
    const handleClose7 = () => setOpen8(false);


    useEffect(() => {
        const body = {
            "db_metadata": 24,
            "user_id": location?.state?.userId ? location?.state?.userId :  localStorage.getItem('Tokenuserid'),
            "sub_id": "659076e408f9b4e59bcf1cb5"
        }
        
       DashboardService.getSubmittedAssignments(body)
           .then(res => {
            console.log(res.data.details, "getAssignments")
               if (res.data.status == 200) {
                var newData: any = res.data.details.map((data: any) => {
                    data.last_sub_dt =  new Date(data?.last_sub_dt).toLocaleDateString()?.split(',')[0]
                    //   data.last_sub_dt =  data?.last_sub_dt?.split('T')[0]
                    return data;
                  });
                  console.log(newData,"newData")
                   setActivity({
                    ...activity, activities: newData
                })
               } else {
                   // toast.error(res.data.message)
               }
           })
           .catch(e =>
               console.log(e, "e")
           );
       // empty dependency array means this effect will only run once (like componentDidMount in classes)
   }, [])


    return (
        
        <div>
           
            <div className="dashboard-sec">

                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <CssBaseline />
                        <AppBar position="fixed" open={open}>
                        {userdetails ? <HeaderCurriculum userdetails={userdetails} profileId ={userdetails.profileId} name={name} image={image} actorType={localStorage.getItem('actorType')} module="Curriculum"/> : 
                        <HeaderCurriculum name={location?.state?.userdetails.disp_name} profileId ={location?.state?.userdetails?.profileId} image={image} userdetails={location?.state?.userdetails} module="Curriculum"/>}
                            {/* {userdetails ? <HeaderCurriculum userdetails={userdetails} profileId ={userdetails.profileId} name={name} image={image} actorType={localStorage.getItem('actorType')} module="Curriculum"/> : <HeaderCurriculum name={localStorage.getItem('DisplayName')} userdetails={userdetails} module="Curriculum"/>} */}
                        </AppBar>
                        <Drawer className="sidebar-left"
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                            variant="persistent"
                            anchor="left"
                            open={open}
                        >
                            <Sidebar />
                        </Drawer>
                    </Box>

                    <Main open={open}>
                        <div className="curriculum-page">
                            <div className="breadcrumbs-sec">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link color="#174392" to="/dashboard">
                                        Dashboard
                                    </Link>

                                    <Typography color="#62676C">Curriculum Dashboard</Typography>
                                </Breadcrumbs>
                            </div>
                           

                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={9} md={9}>
                                        <div>
                                            <div className="progress-box">
                                                <div className="box-count">
                                                    <img src={`${assetUrl}/Progress-Icon.svg`} alt="" />
                                                    <h4 className="m-0 primary-color">
                                                    { dashboardHeaderCount?.in_progress_count }    
                                                        &nbsp;<span>In Progress</span></h4>
                                                </div>
                                                <div className="box-count">
                                                    <img src={`${assetUrl}/Completed%20icon.svg`} alt="" />
                                                    <h4 className="m-0 primary-color">
                                                    { dashboardHeaderCount?.completed_count }   
                                                        {/* {dashboardSummaryData?.ttl_cnt?.curr_completed} */}
                                                        &nbsp;<span>Completed</span></h4>
                                                </div>

                                                <div className="box-count">
                                                    <img src={`${assetUrl}/Certificate%20Icon.svg`} alt="" />
                                                    <h4 className="m-0 primary-color">
                                                    { dashboardHeaderCount?.total_certificate  }   
                                                        {/* {dashboardSummaryData?.ttl_cnt?.certificates} */}
                                                        &nbsp;<span>Certificate</span></h4>
                                                </div>
                                                <div className="box-count">
                                                    <img src={`${assetUrl}/activities%20Icon.svg`} alt="" />
                                                    <h4 className="m-0 primary-color">
                                                    { dashboardHeaderCount?.total_assig_given  }   
                                                        {/* {dashboardSummaryData?.ttl_cnt?.activities} */}
                                                        &nbsp;<span>Assignment</span></h4>
                                                </div>
                                                <div className="box-count">
                                                    <img src={`${assetUrl}/Learning%20hr%20Icon.svg`} alt="" />
                                                    <h4 className="m-0 primary-color">
                                                    { dashboardHeaderCount?.total_learning_hrs }   
                                                        {/* {dashboardSummaryData?.ttl_cnt?.learning_hrs} */}
                                                        &nbsp;<span>Learning Hr</span></h4>
                                                </div>
                                                <div className="box-count">
                                                    <img src={`${assetUrl}/doubts%20Icon.svg`} alt="" />
                                                    <h4 className="m-0 primary-color">
                                                    { dashboardHeaderCount?.total_doubt_raised }   
                                                        {/* {dashboardSummaryData?.ttl_cnt?.doubts} */}
                                                        &nbsp;<span>Doubt</span></h4>
                                                </div>
                                                <div className="box-count">
                                                    <img src={`https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/Vcoin%20Icon.svg`} alt="" style={{ 'width': '30px' }} />
                                                    <h4 className="m-0 primary-color">
                                                    { dashboardHeaderCount?.total_vcoin  }   
                                                        {/* {dashboardSummaryData?.ttl_cnt?.vcoins_earned} */}
                                                        &nbsp;<span>vCoin</span></h4>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>

                                            {  subjects.length > 0 ? subjects.map((subjectsData: IDashboard, i) =>
                                                <div className="subject-grid">
                                                    <div className="status-button">{subjectsData?.sub_status}</div>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={9} className="border-right">
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={2} sm={2} md={1}>
                                                                    <div className="">
                                                                        <div className="subject-icon">
                                                                            <img src={`${assetUrl1}/computer.svg`} alt="Subject Icon" />
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={10} sm={10} md={11} >

                                                                    <div className="subject-con">
                                                                        <a style={{ "cursor": "pointer" }} onClick={() => getChapterData(subjectsData)}>
                                                                            <h3 >
                                                                                {subjectsData?.sub_name}
                                                                            </h3>
                                                                        </a>

                                                                        {`${subjectsData?.sub_desc}`  ?         <p>

{showmore  ? <span >
    {subjectsData?.sub_desc}  </span> : <span style={{
        maxHeight: "4rem",
        overflow: "hidden",
        display: "-webkit-box",
        textOverflow: "ellipsis",
        whiteSpace: "normal",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        msTextOverflow: "ellipsis",
    }}>
    {subjectsData?.sub_desc}       </span>}

{!showmore  ? <p style={{
    textDecoration: "underline",
    color: "#0275B1",
    fontSize: '12px',
    cursor: 'pointer'
}} onClick={showMore}>Show More </p> : <p style={{
    textDecoration: "underline",
    color: "#0275B1",
    fontSize: '12px',
    cursor: 'pointer'
}} onClick={showLess}>Show Less </p>}    </p> :''}
                                                                 

                                                                        <p className="primary-color font-w600 mb-3 subject-goto-topic">
                                                                            <span className="w-80">{subjectsData?.t_name}</span>
                                                                      {`${subjectsData?.t_name}` ?   <span className="w-20"><a className="ml-4" style={{ 'color': '#001022', "cursor": "pointer" }} 
                                                                      onClick={() => getChapterData(subjectsData)}
                                                                      >Go To Chapter&nbsp;&nbsp; <img src={`${assetUrl1}/show1.svg`} alt="" width="18px" /></a></span> :''}     
                                                                            <div className="clearfix"></div>
                                                                        </p>
                                                                        <div className="square-box border-r">
                                                                            <div className="square-box-left">
                                                                                <p className="m-0">
                                                                                    Overview of {subjectsData?.sub_name} and their significance in modern Technologies
                                                                                </p>
                                                                            </div>
                                                                            <div className="square-box-right">
                                                                                <img src={`${assetUrl1}/account.svg`} alt="" width="20px" />
                                                                            </div>
                                                                            <div className="clearfix"></div>
                                                                        </div>
                                                                        <div className="subject-progress border-bottom">
                                                                            <div className="subject-p-box subject-border-right">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAABHNCSVQICAgIfAhkiAAAA39JREFUWEftWN1R20AQ3pN5Dx3EqSCkgshW3sEVBAqwDRUEKrAlCsBUAHmPjakAUwFOBcHvSMvunS2dpJPuDGKGyXAPDPKddvfbv29PAt5qBeFPEn0MIPaUClzQnzFMh5dvoVI0LtQf7UKrdUVy/QrZc4jjHsxPHpvU3TyQIGIQBxYjr2E66L1fIME5AUAGki2Ev/JBwOe84aIH0/51U2CajUgQkmFif23cCoQ4gD/9uXz+ce4DIhv+aV0zv6lebJFzxtkwkAhTzQhHMBtMcpZ0o0OKzEX623TQmP7GBK09fmM1MtDACtFJI+bse/PBDyAlv6ga+A8iwsj0tHk3NcLEJlpfpedvBrdOKax3LcRH8LxermslyRV1st2tu1Yn+i7fwfi+ikjNNcJ8gMmFpnQBcdKxsnExvaRyXEojhGjnnOFS6HJK8Chd12MOO0d4Ryb+KQPxR20aMR4MEZgTG3eskQlCarmC56yahW4cEkRcc35JUBx/IacqB61XGUg3HJP3hkYr4vgbCeDhr37VgUG4hSQ+sEbXH+2RQ++MihBDmA1pIK0FEs2JtFROFpepgKsgMfkBMAGu8xvu6XlcIsm693Xy1M+xM2aDXKQMEWkIiC1qtv3iFLA9kAZSy2aky/6rU6uq2A3hLNnTCffloCigTXu50Gdn6YKFYgECqXlYLlndiuxwKnbWqMbxCf2nJlWk/E5i31ig3CK9HWoOyXHWrl1cznKpnYKYkOyzatktrlnFZwArOn/o1n43NrCBOzvqmroZxYv2cfg9j0mOI/DyxYASyVPmjsj8xOvpabEdIbqYxMJzTF14iVPRtKo6oop8efR3sYXOlLuWzHNvj3JYeWGz9Hs215Hn3RVSaUWpQmmSTKxcoyJJrZnSJL1oMRAZGeaqZapXkWK2UFCqJctifWVAgnBIHjk15jlfV2eDdiY8dxNkA0Iy4NRKckXvyvryWKdGwAXW70bUGNIa0QBxfXnES/0z/lEB6UY0VxF5VS68JA+offWV5J8mMdurFlC/U5wE9K5UN2mwVIQJOflIEAjqNjCq1YR4RiPBqTyjf2AoRuqlQJQzl9kHCu3DRDfkiP2qtw9OCEj4YO06OhBdsAu3uILTOaNKX5UsmrBF7jJUfTCLSA4Ij9VEbk0sxHbqUB2I6Wpg0Pc6IE0AMMn4AGLz7LY5a5Nn239BRJ4B5jfQdFpfapMAAAAASUVORK5CYII=" alt="" />
                                                                                <h4 className="primary-color font-w600">
                                                                                {subjectsData?.curriculumCount?.completed_count } 
                                                                                    {/* {subjectsData?.dashboardCountData[0]?.ttl_buddy_cnt?.completed} */}
                                                                                    &nbsp;
                                                                                    <span>Completed</span></h4>
                                                                            </div>
                                                                            <div className="subject-p-box subject-border-right">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAABHNCSVQICAgIfAhkiAAAA2RJREFUWEftWNFx2kAQXTn5jzsIqSCkgkAFhgoMBcSICgIVIJwCLFcQUoFFBYYKjCuI/R+bvHc5aY6TTneAPOPJ+GY8Rrq73X27e/v2FMkLjflYzmUrcSTSpoqtyEoiSUYzuX4JldDT7JjFcvpO5CekdhySsyeR/jiRhyY1Nw7kMlYgeh4jFxeJ9F8tkB+x9JBCBGKOe/3w0XwJD/a/JbJoCkyjEZnHsoDAM23cI373YGzGZ4DsACQN/6DPzK9R4o1cMM5GgSCtYGsxhkif1LQE8wM8X+XvMN+Y/sYEaY/f+Iw0wUJ5N49YsOsdC9+A2I75byJCYK/yjChii+QzDbyYyTIkh82qhVP/cPKvxBZV6xmlGbl8um/VuhzLV+552sraRaSVZ4R8AKVXhtIVnrs+NrbTSxu84X/IapnOCDnodCaccWO0OXTOsIp/SkCwuYUW464iAhnKZdcXGUQlhdDzunWIVhCHIFVZBTu2LLQ4n+BU5aB8lIDAkAQvR1WGQMAXCFgdCWYJOT1fdOHQNhx6W6ULjpiDTONaIPACc1rlZMUokZwLlCa/gSFrjd+JTZKe/QV5WuuWkLMTqVJEmgLii5pv3u4C9gbSRGr5jAyZPzq1ag57KZy2QbhMnUVb1Qi28LcT+nwtL1hIg9U2ksx3yXJlR9Bhp0Ldjqf4qTpVjDU2d6oOKEvkexQHlGfeBhVHhA5yDfakkD11ycaBzyBP8RkGO+pBUPnNjdAGqmuqq7Fj+FHXSXKMwMGDgDRPVVZE8hOF/0Ek9yLEEIso3GTqij2ubsBVESkiuCra+so8gjw/2UobXlJeyId5z+Y5QiRurVR6xJ4U4FIf1+hIDpgmkJ+nLy8zjAy5apPr1aRY2IE92XMkG/t8FUBwUEeQNHHk+T3qdpE+1k2QBsxhwMRHcrYXdQtCnQUB26wPIEy3/IwUInQvlyDtp3ypgGAxiYfeqRzYdA0mVfP6K8nvfKE559rve2+3NWZVqqMDLTeFk4cRQJDqZ3XKYOwUQCZcY31g2ImUz+C6edjBdFIfKODd4sMEgDBi3z2yxxEW3vmqjgnEEuzlllBwJmfU6HNlzIYRMT8YuBYWETGBaB7wNpEhYCCrlTvUygB+fWEXXDuOAuITfuj8GxCf5/bNWZ883/whEfkLk3SLhHECQYcAAAAASUVORK5CYII=" alt="" />
                                                                                <h4 className="font-w600" style={{ 'color': '#926F01' }}>
                                                                                {subjectsData?.curriculumCount?.in_progress_count } 
                                                                                    {/* {subjectsData?.dashboardCountData[0]?.ttl_buddy_cnt?.inprogress} */}
                                                                                    &nbsp;
                                                                                    <span>Progress</span></h4>
                                                                            </div>
                                                                            <div className="subject-p-box subject-border-right">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAYAAADRcLDBAAAABHNCSVQICAgIfAhkiAAAA25JREFUWEfNWNtVGzEQHe3+gP0BqQBTQaACTAfuIKYAsF1BTAXmUQCmgkAFOBVgKoipIPaHDR+slTtC2mhlrbTLSXKy53Aw65nRncedGSGo4jNq0kFK9AXiB1qlbalOSNJcSpqsJd0PXmlW0awSEzHhy23qUUJDCO7GZG1QIqPz01eaVNEpBXHdoM6aaCQEtQqGJD0BuvJau7ELIxwd/tlxZO+yFZ0MiOYhMF4Q7L1I6CJXlPSMg4fZku5CBjlliaQ+gHPa1CMBAM4cD5Y0LQOyAeKqQTc4sKsVFvjdP1vSuEpYjcxoi1ppqnSODBAcNCizUwBxtU195H+kXXjOBHVCHsSAXTWVMzexiOQguAakoG85gBUdxEKfZrSTET2H2FAAImm2XtGha1eBgOu7SYMedREuYLhdFoHLJvItwRarYFGks2RNJ2VsuGwo+a8qIpLOeysa2lFUIGwh/HlSljunXjayAVoelwGB7hS19pmVsoz27ei9g2jST9UHwIKzlUNJfdT1FrVlSg86XU+QH76taYoCbOMdM2mHmdBb0idfrRT01yjSl9/sE4UvA1Gw6NcBVVt2Xu1Iul7agBCNGaKxh5RMkZJD851AFC7gVU+FCV7EGovPy4INJ9S2fJmcQPVOIHiEVDwhFWYu+M7yvlNF3aQfOp1BG2VRFwgls4IP/46C5PxWfjSrHrR+kFXGKJxG6SiW3CIlXf7MkTAvN6gTQwNdLlQDvJRVhbrQkWdaA8R+EQRIgsruxw62PGIvVDckp9pDNnxFLCz+1kpHnsYArX1gfHWRF6ZLm1hErDTeI6ydmLyTkkJdFCkaoFedQ2KyhpGmLoRe2x7r5jZ2kFM7+X6hmdEyswdz6lC1bauT5RUbOoSpmTYw996H2G1o33Dm0oZZnjcbA8w35VxNd08omxesVwChV0NjD2fNMdq7+SiHZzzl9qqsY4UURpqcDaJsynqXGgVkiXEbWFAV1dBpsxcah+RqgdChG5sllSmLUB1/ZKDZ6asNwgOkdg9w6+dDIBRb9DzBx1pd1MeofwZCUXbrfXXbeBJMSn2F4J7g2129l5+6kXDmQVmLWaCfeK+S/wrEQkjqnq7ozofwj4PgZQXr/9gc9pbSPHaB+hsgai9H/y8IphWHE41rVuUyzBfghFmAB6mYVP2/hEnZL8AL53ZPSEDZAAAAAElFTkSuQmCC" alt="" style={{ 'width': '17px' }} />
                                                                                <h4 className="font-w600" style={{ 'color': '#920A00' }} >
                                                                                {subjectsData?.curriculumCount?.total_doubt_raised } 
                                                                                    {/* {subjectsData?.dashboardCountData[0]?.ttl_buddy_cnt?.doubt} */}
                                                                                    &nbsp;
                                                                                    <span>Doubt</span></h4>
                                                                            </div>
                                                                            <div className="subject-p-box subject-border-right">
                                                                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/curriculim/activities%20logo.png" alt="" style={{ 'width': '17px' }} />
                                                                                <h4 className="font-w600" style={{ 'color': '#549200' }}>
                                                                                {subjectsData?.curriculumCount?.total_assig_given } 
                                                                                    {/* {subjectsData?.dashboardCountData[0]?.ttl_buddy_cnt?.activity} */}
                                                                                    &nbsp;
                                                                                    <span>Activity</span></h4>
                                                                            </div>
                                                                            <div className="subject-p-box">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkCAYAAADl9UilAAAABHNCSVQICAgIfAhkiAAAAyJJREFUWEftWE16EkEQfQ0u1E3wBOIJNCcQbkB2gY3kAAlwAsMJ+MkBghvILngC4wnEE4QbSDYxC5n21UyPTGBmeqaHT/387O9jw0xXvXlV9aq6FfawGhhUnqF8rbDuTdFb7MEk1D6MtDC+pJ02oBf38Opz9FZF7RYG1sRoqKA6GyB6MUXn8I8CI1NkCcLW9ppMcXZSBJwzY01cNBT0dZJzDT2aodN1BecErIXBG6D0CVAVi+MTMjdxAecILDGEjzCQtQ9kTcKdezkBEy9M+gmT/l1yKPH1O9Y11wp1BpYGTqMYKLG9A0zE8ilQuUJvaePfCOsNjbwO3yWoOwptLYvQpvn6BewYFzUF75LhqYoT5geBlXoznM7TAIrx5yiL2r8M3lsf2kBJ8WiUB3ReC/ZoEeRz6t8o9OUDE1AlaFZZ7LJWlnEkzHVtVZhW0VGJ8YG1MPqWVvoe1q9soRXmsiQ6i+Y2jEo8DwHjyiaUhuo+aT635ZztuSUyQVCNMCuyRYfqfZpRJvTnGc5MPtjcJz/P4+vvBdbEuMtEG6Qz5q7gUbsZ0+Yj06ahjjGollC+TQPmQdWvcHrjHsRgp9G9JYk4SLHlq4Bflbsz1WbbvvIrtJiWZ9IxmMscECLKH9f79tFa4piJI2Lb16OWFJSzZ6pPLW1iWSS0RmgbgY1dX4WaeBFgtr3/gdkY2n4e9soOk496pqpxBmTS4DO2JbcxWWyanOLBRflVt7v0SkNNOFz2peeyV9oFNmLEOmnEuQy0svQlwxmBvRJzSsaRtCTZkPAV225kbvLqtnkruiuY1/yDS0YfwD3WLwhsTJB5ll548I5sY5BYNEOktLt2Hg/SaRyAiQu98lAiuOQ2ZcLHc2d2pkLwuYGJOkfne7mr4H9DEUjO+Xcclw94CK4widt8z4inzFhyDoCMz2b8TucvNzCJPW915nTyNmtowsMJQfOOI9u+3MAoF0Zexm1hyjIlSMj7vP0ZSvmz+uVMkOmDnIGFbMl8xSrlb6N/DCVDpuZkdx49A/xWYFnDKe/9O8Bk1Mn65UWmWGlJHp7Ybod8KA/4sfgJivNbamSUmh8AAAAASUVORK5CYII=" alt="" style={{ 'width': '18px' }} />
                                                                                <h4 className="font-w600" style={{ 'color': '#5A0092' }}>
                                                                                {subjectsData?.curriculumCount?.total_collabaration } 
                                                                              {/* {subjectsData?.dashboardCountData[0]?.ttl_buddy_cnt?.collabration}  */}
                                                                              &nbsp;
                                                                                    <span>Collaboration</span></h4>
                                                                            </div>
                                                                            <div className="clearfix"></div>

                                                                        </div>

                                                                        <div className="enrole mt-1">

                                                                            <img src={`${assetUrl1}/account.svg`} alt="" width="20px" mt-1 />
                                                                            <span><p>
                                                                                {/* <div className="square-box-right"> */}

                                                                                {/* </div> */}
                                                                                {/* {`${subjectsData?.sub_name}` == 'Semiconductors' && <p>Surya responded to your challenge.</p>}
                                                                                {`${subjectsData?.sub_name}` == 'Physics' &&  */}
                                                                                <p>Ashu asked help</p>
                                                                                {/* // }
                                                                                // {`${subjectsData?.sub_name}` == 'Mathematics' && <p>Dipyaman responded to your challenge.</p>}
                                                                                // {`${subjectsData?.sub_name}` == 'Chemistry' && <p>Indronil clarified your doubt</p>} */}
                                                                                {/* {subjectsData?.userMsg} */}
                                                                            </p></span>
                                                                            <span>
                                                                                {/* {`${subjectsData?.sub_name}` == 'Semiconductors' && <button type="button" className="btn primary-bg border-r text-white ml-3 mr-2">Track Challenge</button>}
                                                                                {`${subjectsData?.sub_name}` == 'Physics' &&  */}
                                                                                <button type="button" className="btn primary-bg border-r text-white ml-3 mr-2">
                                                                                    Help</button>
                                                                                    {/* } */}
                                                                                {/* {`${subjectsData?.sub_name}` == 'Mathematics' && <button type="button" className="btn primary-bg border-r text-white ml-3 mr-2">Track Challenge</button>}
                                                                                {`${subjectsData?.sub_name}` == 'Chemistry' && <button type="button" className="btn primary-bg border-r text-white ml-3 mr-2">View</button>} */}
                                                                                <button type="button" className="btn btn-dark text-white border-r">Ignore</button></span></div>
                                                                    </div>

                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={3}>

                                                            <div className="subject-right">
                                                                <div className="todo-icon">
                                                                    <img src={`${assetUrl1}/time.svg`} alt="Subject Icon" />
                                                                </div>
                                                                <p className="primary-color m-0 pt-2 font-w600">{subjectsData?.studyHrsTime}</p>
                                                                <p className="primary-color m-0 font-w600"><small>
                                                                    0
                                                                    {/* {subjectsData?.dashboardCountData[0]?.hrs_sts?.nxt_std_hr ? subjectsData?.dashboardCountData[0]?.hrs_sts?.nxt_std_hr : 0} */}
                                                                     Hr Study Time</small></p>

                                                                <div className="progress yellow">
                                                                <CircularProgressWithLabel value={20} />
                                                             {/* {  subjectsData?.dashboardCountData[0]?.hrs_sts?.prgs_percentage ?   <CircularProgressWithLabel value={subjectsData?.dashboardCountData[0]?.hrs_sts?.prgs_percentage} /> : '0%' } */}
                                                                </div>

                                                                <p className="primary-color m-0 font-w600">
                                                                    0
                                                                    {/* {subjectsData?.dashboardCountData[0]?.hrs_sts?.hrs_completed ? subjectsData?.dashboardCountData[0]?.hrs_sts?.hrs_completed : 0} */}
                                                                 hrs <small>completed</small></p>
                                                                <p className="font-w600 pt-2 pb-2 m-0" style={{ 'color': '#920027' }}>
                                                                    0
                                                                    {/* {subjectsData?.dashboardCountData[0]?.hrs_sts?.hrs_left ? subjectsData?.dashboardCountData[0]?.hrs_sts?.hrs_left : 0}  */}
                                                                    hrs left</p>
                                                                <p className="font-w600 green-color">
                                                                    0
                                                                {/* {subjectsData?.dashboardCountData[0]?.hrs_sts?.ttl_vcoin ? subjectsData?.dashboardCountData[0]?.hrs_sts?.ttl_vcoin : 0} */}
                                                                 vCoins earned</p>
                                                            </div>


                                                        </Grid>

                                                    </Grid>

                                                </div>
                                            ) :<div className="mt-3"> 
                                                  {/* <Stack sx={{ color: 'red' }} spacing={2}>
                                                <Alert severity="error">No Data Available</Alert>
                                                </Stack> */}
                                                  </div>}
                                        </div>

                                        {/* <div>
                                sid: {sid}
                                <br/>
                                userId: {userId}
                            </div> */}

                            <div style={{color:'red'}}>
                               {/* URL:{window.location.href} */}
                               {/* <br/>
                               local storage userid :{localStorage.getItem('Tokenuserid')}
                               <br/>
                               userid :{window.location.search.split("?")[3]}
                               <br/>
                               name:{name}
                               <br/> */}
                             {/* {location?.state.sid ? 
                             <div>
{location?.state.sid}
                             </div>  : '' } */}

                            </div>

                                        <div className="need-section">
                                            <div>
                                                <span className="float-left">
                                                    <h3>Need to Join</h3>
                                                </span>
                                                <span className="float-right">
                                                    <Link to="">View All</Link>
                                                </span>
                                                 <div className="clearfix"></div>
                                            </div>
                                            <div className="need-slider">
                                                <Carousel responsive={responsive}>
                                                   <div>
                                                        <div className="need-slider-box">
                                                            <img src={`${assetUrl}/English.jfif`} style={{ minHeight: '220px' }} alt="" />
                                                            <div className="wishlist-icon">
                                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                            </div>
                                                            <div>
                                                                <span className="slider-title">
                                                                    <h4>English</h4>
                                                                </span>
                                                                <span className="slider-title-rating">
                                                                    <div className="rating">
                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                        <span>4.5</span>
                                                                    </div>
                                                                </span>
                                                                <div className="clearfix"></div>
                                                            </div>
                                                            <div className="slider-buddies mt-2">
                                                                <span className="w-30">
                                                                    <ul className="buddies-img">
                                                                        <li><img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg" alt="" /></li>
                                                                        <li><img src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></li>
                                                                        <li><img src="https://img.freepik.com/free-photo/portrait-beautiful-woman-with-glasses_23-2148418596.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696982400&semt=ais" alt="" /></li>
                                                                    </ul>
                                                                    <span className="primary-color font-w400">20&nbsp;<small>Buddies</small></span>
                                                                </span>
                                                                <span className="w-70">
                                                                    <div className="person-profile">
                                                                        <img src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                                                        <h4 className="primary-color">Andrew & <Link to="">64 more</Link></h4>
                                                                        <p className="primary-color m-0">18K <small>Students Guided</small></p>
                                                                    </div>
                                                                </span>
                                                                <div className="clearfix"></div>
                                                            </div>

                                                            <div className="activity-sec">
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={4}>
                                                                        <div className="activity-box">
                                                                            <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;2 Topics
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <div className="activity-box">
                                                                            <img
                                                                                src={`${assetUrl}/activity.svg`} /> 1 Activities
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <div className="activity-box">
                                                                            <img
                                                                                src={`${assetUrl}/Total%20hr%20clock.svg`} />3hrs 20min
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                            <div className="text-center mt-2 mb-2">
                                                                <Button variant="text" className="save-btn primary-bg border-r text-white">Join to win 200 V Coins</Button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="need-slider-box">
                                                            <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/biology.jpg" style={{ maxHeight: '220px' }} alt="" />
                                                            <div className="wishlist-icon">
                                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                            </div>
                                                            <div>
                                                                <span className="slider-title">
                                                                    <h4>Biology</h4>
                                                                </span>
                                                                <span className="slider-title-rating">
                                                                    <div className="rating">
                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                        <span>5</span>
                                                                    </div>
                                                                </span>
                                                                <div className="clearfix"></div>
                                                            </div>
                                                            <div className="slider-buddies mt-2">
                                                                <span className="w-30">
                                                                    <ul className="buddies-img">
                                                                        <li><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/learnerImage4.jpg" alt="" /></li>
                                                                        <li><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/learnerImage2.jpeg" alt="" /></li>
                                                                        <li><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/learnerImage3.jpeg" alt="" /></li>
                                                                    </ul>
                                                                    <span className="primary-color font-w400">20&nbsp;<small>Buddies</small></span>
                                                                </span>
                                                                <span className="w-70">
                                                                    <div className="person-profile">
                                                                        <img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg" />
                                                                        <h4 className="primary-color">Smitha & <Link to="">10 more</Link></h4>
                                                                        <p className="primary-color m-0">9K <small>Students Guided</small></p>
                                                                    </div>
                                                                </span>
                                                                <div className="clearfix"></div>
                                                            </div>

                                                            <div className="activity-sec">
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={4}>
                                                                        <div className="activity-box">
                                                                            <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;3 Topics
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <div className="activity-box">
                                                                            <img
                                                                                src={`${assetUrl}/activity.svg`} />3 Activities
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <div className="activity-box">
                                                                            <img
                                                                                src={`${assetUrl}/Total%20hr%20clock.svg`} />5hrs 20min
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>

                                                            <div className="text-center mt-2 mb-2">
                                                                <Button variant="text" className="save-btn primary-bg border-r text-white">Join to win 200 V Coins</Button>
                                                            </div>

                                                        </div>
                                                    </div> 
                                                </Carousel>
                                            </div>




                                        </div>
                                    </Grid>

                                    <Grid item xs={3} md={3}>
                                        <div className="subject-right-con">
                                            <div className="tabs-header mb-3">
                                                <div className="my-planner-title">
                                                    <h4>
                                                        <span className="float-left">My Planning</span>
                                                        <span className="float-right" style={{cursor:'pointer'}}  onClick={gotoPlanner}><small>Go To Planner</small></span>
                                                        <div className="clearfix"></div>
                                                    </h4>
                                                </div>
                                                <Box>
                                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                        <Tab label="Today" {...a11yProps(0)} />
                                                        <Tab label="Tomorrow" {...a11yProps(1)} />
                                                        <Tab label="Week" {...a11yProps(2)} />
                                                    </Tabs>
                                                </Box>
                                                <div className="tabs-content">
                                                    <CustomTabPanel value={value} index={0}>
                                                            <div className="planner-con">
                                                                <div className="mb-1 pb-1 border-bottom">
                                                                    <span className="float-left">{date}</span>
                                                                    <span className="float-right"><p className="m-0 primary-color font-w600">
                                                                        {time} IST
                                                                    </p></span>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                {/* {subjects.map((subjectsData: IDashboard, i) =>    
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left ">
                                                                        <p className="m-0 pb-1"><span className="font-w600">{i+10}</span>&nbsp;<small>AM IST</small></p>
                                                                        <span><img src="http://localhost:3000/static/media/time.31bea82cf12d5e1f665eceac60112ded.svg" alt="" className="mr-2" style={{ 'width': '15px' }} /><small>60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#009688' }}>
                                                                            {subjectsData.sub_name}
                                                                            </p>
                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                )} */}
                                                              {myplannings.length > 0 ? myplannings.map((plandata, i) => 
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#009688' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">{plandata.t_slot[0].f_ts}</span>&nbsp;<small>{plandata.t_slot.f_ts <= 12 ? 'AM IST' : 'PM IST'}</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;{plandata.t_slot[0].dur / 60} Mins</small></span>
                                                                    </div>

                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#009688' }}>{plandata.t_slot[0].subName}</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                 ) :
                                                                 <div>
                                                                   
                                                                 </div>}
                                                                {/* <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#DE8C0A' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">3</span>&nbsp;<small>PM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#DE8C0A' }}>Chemistry</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#07547C' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">4:15</span>&nbsp;<small>PM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#07547C' }}>Mathematics</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#009688' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">5:30</span>&nbsp;<small>PM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#009688' }}>Semiconductors</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div> */}
                                                            </div>
                                                    </CustomTabPanel>
                                                    <CustomTabPanel value={value} index={1}>
                                                            <div className="planner-con">
                                                                <div className="mb-1 pb-1 border-bottom">
                                                                    <span className="float-left">{tomorrowdate}</span>
                                                                    <span className="float-right"><p className="m-0 primary-color font-w600">
                                                                        {/* {tomorrowtime} IST */}
                                                                        {time} IST
                                                                    </p></span>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                {myplannings1.length > 0 ? myplannings1.map((plandata, i) => 
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#009688' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">{plandata.t_slot[0].f_ts}</span>&nbsp;<small>{plandata.t_slot.f_ts <= 12 ? 'AM IST' : 'PM IST'}</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;{plandata.t_slot[0].dur / 60} Mins</small></span>
                                                                    </div>

                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#009688' }}>{plandata.t_slot[0].subName}</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                 ) :
                                                                 <div>
                                                                   
                                                                 </div>}
                                                                {/* <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#009688' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">4</span>&nbsp;<small>AM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;120mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#009688' }}>Physics</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#DE8C0A' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">3</span>&nbsp;<small>PM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#DE8C0A' }}>Chemistry</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#07547C' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">4:15</span>&nbsp;<small>PM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#07547C' }}>Mathematics</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#009688' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">5:30</span>&nbsp;<small>PM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#009688' }}>Semiconductors</p>
                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div> */}
                                                            </div>
                                                    </CustomTabPanel>
                                                    <CustomTabPanel value={value} index={2}>
                                                            <div className="planner-con">
                                                                <div className="mb-1 pb-1 border-bottom">
                                                                    <span className="float-left">{weekdate}</span>
                                                                    <span className="float-right"><p className="m-0 primary-color font-w600">
                                                                        {/* {weektime} IST */}
                                                                        {time} IST
                                                                    </p></span>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                {myplanningsweek.length > 0 ? myplanningsweek.map((plandata, i) => 
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#009688' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">{plandata.t_slot[0].f_ts}</span>&nbsp;<small>{plandata.t_slot.f_ts <= 12 ? 'AM IST' : 'PM IST'}</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;{plandata.t_slot[0].dur / 60} Mins</small></span>
                                                                    </div>

                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#009688' }}>{plandata.t_slot[0].subName}</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                 ) :
                                                                 <div>
                                                                   
                                                                 </div>}
                                                                {/* <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#009688' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">4</span>&nbsp;<small>AM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;120mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#009688' }}>Physics</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#DE8C0A' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">3</span>&nbsp;<small>PM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" style={{ 'width': '15px' }} /><small>&nbsp;60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#DE8C0A' }}>Chemistry</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#07547C' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">4:15</span>&nbsp;<small>PM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" className="mr-2" style={{ 'width': '15px' }} /><small>&nbsp;60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#07547C' }}>Mathematics</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="schudelur">
                                                                    <div className="schudelur-left " style={{ 'borderColor': '#009688' }}>
                                                                        <p className="m-0 pb-1"><span className="font-w600">5:30</span>&nbsp;<small>PM IST</small></p>
                                                                        <span><img src={`${assetUrl1}/time.svg`} alt="" className="mr-2" style={{ 'width': '15px' }} /><small>60mins</small></span>
                                                                    </div>
                                                                    <div className="schudelur-right">
                                                                        <p className="font-w600 m-0" style={{ 'color': '#009688' }}>Semiconductors</p>

                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div> */}
                                                            </div>
                                                       
                                                    </CustomTabPanel>
                                                </div>
                                            </div>

                                            <div className="activities-right">
                                                <div className="my-planner-title">
                                                    <h4>
                                                        <span className="float-left">Assignment</span>
                                                        <div className="clearfix"></div>
                                                    </h4>
                                                </div>
                                                <div className="activities-con">
                                                   
                                                        <div className="activities-box p-1">
                                                        {activities.map((activitydata: IDashboard, i) =>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={2}>
                                                                  <div className="activities-box-img" style={{ 'color': '#7232B7' }}> AS</div>
                                                                    {/* {`${activitydata?.sub_name}` == 'Chemistry' && <div className="activities-box-img" style={{ 'color': '#1AA54A' }}> AS</div>}
                                                                    {`${activitydata?.sub_name}` == 'Physics' && <div className="activities-box-img" style={{ 'color': '#D0480B' }}> AS</div>}
                                                                    {`${activitydata?.sub_name}` == 'Semiconductors' && <div className="activities-box-img" style={{ 'color': '#71043C' }}> AS</div>} */}
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <div className="activities-box-con">
                                                                        <h4 onClick={handleOpen} style={{ 'color': '#7232B7' }}>Submit Your {activitydata?.subjectName} Assignment</h4>
                                                                        {/* {`${activitydata?.sub_name}` == 'Chemistry' && <h4 onClick={handleOpen} style={{ 'color': '#1AA54A' }}>Submit Your {activitydata?.sub_name} Assignment</h4>}
                                                                        {`${activitydata?.sub_name}` == 'Physics' && <h4 onClick={handleOpen} style={{ 'color': '#D0480B' }}>Submit Your {activitydata?.sub_name} Assignment</h4>}
                                                                        {`${activitydata?.sub_name}` == 'Semiconductors' && <h4 onClick={handleOpen} style={{ 'color': '#71043C' }}>Submit Your {activitydata?.sub_name} Assignment</h4>} */}
                                                                        <p className="font-w400">
                                                                        {/* <img src={`${assetUrl1}/person1.jpg`} alt="" /> */}
                                                                            <img src={activitydata?.profileImage} alt="" />
                                                                            {activitydata?.userName}</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className="float-left">
                                                                            <p className="m-0"><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;
                                                                            120 Mins</p>
                                                                            {/* {activitydata?.hour} Mins</p> */}
                                                                        </div>
                                                                        <div className="float-right">
                                                                            <p ><i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
                                                                                {activitydata?.last_sub_dt}
                                                                                {/* {new Date(parseInt(activitydata?.last_sub_dt, 10)).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'})} */}
                                                                               {/* { format(${activitydata?.last_sub_dt}, 'd/MM/yyyy')} */}
                                                                            </p>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                             )}
                                                        </div>
                                                   

                                                </div>
                                            </div>



                                            <div className="collaboration-sec">
                                                <div className="my-planner-title">
                                                    <h4>
                                                        <span className="float-left">Collaboration</span>
                                                        <div className="clearfix"></div>
                                                    </h4>
                                                </div>
                                                <div className="collaboration-content">
                                                    <div className="collaboration-box" onClick={handleOpen2}>
                                                        <div className="float-left" style={{ "cursor": "pointer" }}>
                                                            <img src={`${assetUrl}/coll-challenge.png`} alt="" />
                                                            <span>Challenge</span>
                                                        </div>
                                                        <div className="float-right">
                                                            <div className="collaboration-box-count">{collaborationcounts?.Challenge}</div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>

                                                    <div className="collaboration-box" onClick={handleOpen3}>
                                                        <div className="float-left" style={{ "cursor": "pointer" }}>
                                                            <img src={`${assetUrl}/coll-mentor message.png`} alt="" />
                                                            <span>Mentor Message</span>
                                                        </div>
                                                        <div className="float-right">
                                                            <div className="collaboration-box-count">{collaborationcounts?.MentorMessage}</div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>

                                                    <div className="collaboration-box" 
                                                    onClick={doubt}
                                                    // onClick={handleOpen5}
                                                    >
                                                        <div className="float-left" style={{ "cursor": "pointer" }}>
                                                            <img src={`${assetUrl}/coll-Doubts clearence.png`} alt="" />
                                                            <span>Doubt</span>
                                                        </div>
                                                        <div className="float-right">
                                                            <div className="collaboration-box-count">{collaborationcounts?.Doubt}</div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="collaboration-box" 
                                                    // onClick={handleOpen7}
                                                    onClick={reward}
                                                    >
                                                        <div className="float-left" style={{ "cursor": "pointer" }}>
                                                            <img src={`${assetUrl}/coll-rewards.png`} alt="" />
                                                            <span>Reward</span>
                                                        </div>
                                                        <div className="float-right" >
                                                            <div className="collaboration-box-count">{collaborationcounts?.Reward}</div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="collaboration-box"  onClick={handleOpen6}>
                                                        <div className="float-left" style={{ "cursor": "pointer" }}>
                                                            <img src={`${assetUrl}/coll-certificate.png`} alt="" />
                                                            <span>Certificate</span>
                                                        </div>
                                                        <div className="float-right">
                                                            <div className="collaboration-box-count">{collaborationcounts?.Certificate}</div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </Grid>

                                </Grid>
                            </div>

                        </div>
                    </Main>
                </Box>
                <div className="footer">
                    <FooterCopyright />
                </div>
            </div>
            <Modal
                keepMounted
                open={open1}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className="modal-titile">
                        <span className="float-left">
                            <h4>Activity</h4>
                        </span>
                        <span className="float-right" onClick={handleClose}>
                            <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                        </span>
                        <div className="clearfix"></div>
                    </div>
                    <div className="modal-content mt-1">
                        <div className="subject-title1">
                            <span className="float-left">
                                <h4>Submit your assignment</h4>
                            </span>
                            <span className="float-right">
                                <AppButton children="Assignment" styleClass='btn save-btn  primary-bg mr-2 text-white' />
                                <AppButton children="Urgent" styleClass='btn urgent-btn mr-2 text-white' />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div>
                            <span>
                                <div className="circle20 mr-2">
                                    <img src={`${assetUrl}/img%20Event%20add%20student.svg`} alt="" />
                                </div>
                            </span>
                            <span><small>By: Alfredo Rhiel Madsen</small></span>
                            <div className="clearfix"></div>
                        </div>
                        <p className="mt-1">In this chapter, we have laid the foundation for our exploration of semiconductors, acknowledging their pivotal role in modern electronics. We have delved into the unique properties of semiconductors, their significance in enabling technological advancements, and the fundamental concepts of energy bands and doping. Armed with this knowledge, we are now ready to delve deeper into the exciting world of semiconductor physics and design in the subsequent chapters.</p>
                        <div>
                            <span className="float-left">
                                <p className="m-0"><i className="fa fa-bars" aria-hidden="true"></i>&nbsp;<small>Progress</small></p>
                            </span>
                            <span className="float-right">
                                <p className="m-0 primary-color">4/10</p>
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="progress">
                            <Box sx={{ flexGrow: 1 }}>
                                <LinearProgress variant="determinate" value={50} />
                            </Box>
                        </div>
                        <div className="model-footer mt-2">
                            <span className="float-left">
                                <AppButton children="Go to course" onClick={handleOpen1} styleClass='btn save-btn  primary-bg mr-2 text-white' />
                                <AppButton children="Remove from to do " styleClass='btn primary-color cancel-outline' />
                            </span>
                            <span className="float-right mt-1">
                                <ul>
                                    <li>
                                        <span>
                                            <span><img src={`${assetUrl}/Completed logo.png`} alt="" /></span>
                                            <span className="font-w600 primary-color mr-1">12</span>
                                            <span>Completed</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <span><i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;July 6th, 2023</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span><i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;10</span>
                                    </li>
                                    <li>
                                        <span><img src="http://localhost:3000/static/media/attach_file.0b8cb529d1bc70730b5df7eb541f3a1f.svg"
                                            alt="" />&nbsp;10</span>
                                    </li>


                                </ul>
                            </span>
                            <div className="clearfix"></div>
                        </div>

                    </div>
                </Box>
            </Modal>

            <div className="Congratulations-model">
                <Modal
                    keepMounted
                    open={open2}
                    onClose={handleClose1}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">

                            </span>
                            <span className="float-right" onClick={handleClose1}>
                                <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <div className="text-center">
                                <p className=""><b className="primary-color">Congratulations…!!! </b></p>
                                <p>You have successfully joined into the program. You have won 200v Icons</p>
                            </div>
                            <div className="modal-content text-center mt-3">
                                <AppButton children="Start Course" styleClass='btn save-btn  primary-bg mr-2 text-white' />
                                <AppButton children="Back to Home" styleClass='btn primary-color cancel-outline' />
                            </div>

                        </div>
                    </Box>
                </Modal>
            </div>


            <div className="challenge-model">
                <Modal
                    keepMounted
                    open={open3}
                    onClose={handleClose2}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">
                                <h4>Challenges</h4>
                            </span>
                            <span className="float-right" onClick={handleClose2}>
                                <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <div className="model-content-box">
                                <div className="circle40-model">M</div>
                                <h4>Maths Project work</h4>
                                <small>July 14, 2023 - 10pm</small>
                                <div className="clearfix"></div>
                                <div className="challenges-bottom">
                                    <span className="float-left">
                                        <ul>
                                            <li><span className="download-zip">Resources.zip</span></li>
                                            <li>
                                                <span><img src={`${assetUrl}/Completed logo.png`} alt="" /></span>
                                                <span className="font-w600 primary-color mr-1">12</span>
                                                <span>Completed</span>
                                            </li>
                                        </ul>
                                    </span>
                                    <span className="float-right">
                                        <ul>
                                            <li className="mr-2 primary-color">Accept Challenge</li>
                                            <li className="mr-2">Reject</li>
                                        </ul>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            {/* <div className="model-content-box">
                                <div className="circle40-model">M</div>
                                <h4>Maths Project work</h4>
                                <small>July 14, 2023 - 10pm</small>
                                <div className="clearfix"></div>
                                <div className="challenges-bottom">
                                    <span className="float-left">
                                        <ul>
                                            <li><span className="download-zip">Resources.zip</span></li>
                                            <li>
                                                <span><img src={`${assetUrl}/Completed logo.png`} alt="" /></span>
                                                <span className="font-w600 primary-color mr-1">12</span>
                                                <span>Completed</span>
                                            </li>
                                        </ul>
                                    </span>
                                    <span className="float-right">
                                        <ul>
                                            <li className="mr-2 primary-color">Accept Challenge</li>
                                            <li className="mr-2">Reject</li>
                                        </ul>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="model-content-box">
                                <div className="circle40-model">M</div>
                                <h4>Maths Project work</h4>
                                <small>July 14, 2023 - 10pm</small>
                                <div className="clearfix"></div>
                                <div className="challenges-bottom">
                                    <span className="float-left">
                                        <ul>
                                            <li><span className="download-zip">Resources.zip</span></li>
                                            <li>
                                                <span><img src={`${assetUrl}/Completed logo.png`} alt="" /></span>
                                                <span className="font-w600 primary-color mr-1">12</span>
                                                <span>Completed</span>
                                            </li>
                                        </ul>
                                    </span>
                                    <span className="float-right">
                                        <ul>
                                            <li className="mr-2 primary-color">Accept Challenge</li>
                                            <li className="mr-2">Reject</li>
                                        </ul>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="model-content-box">
                                <div className="circle40-model">M</div>
                                <h4>Maths Project work</h4>
                                <small>July 14, 2023 - 10pm</small>
                                <div className="clearfix"></div>
                                <div className="challenges-bottom">
                                    <span className="float-left">
                                        <ul>
                                            <li><span className="download-zip">Resources.zip</span></li>
                                            <li>
                                                <span><img src={`${assetUrl}/Completed logo.png`} alt="" /></span>
                                                <span className="font-w600 primary-color mr-1">12</span>
                                                <span>Completed</span>
                                            </li>
                                        </ul>
                                    </span>
                                    <span className="float-right">
                                        <ul>
                                            <li className="mr-2 primary-color">Accept Challenge</li>
                                            <li className="mr-2">Reject</li>
                                        </ul>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="model-content-box">
                                <div className="circle40-model">M</div>
                                <h4>Maths Project work</h4>
                                <small>July 14, 2023 - 10pm</small>
                                <div className="clearfix"></div>
                                <div className="challenges-bottom">
                                    <span className="float-left">
                                        <ul>
                                            <li><span className="download-zip">Resources.zip</span></li>
                                            <li>
                                                <span><img src={`${assetUrl}/Completed logo.png`} alt="" /></span>
                                                <span className="font-w600 primary-color mr-1">12</span>
                                                <span>Completed</span>
                                            </li>
                                        </ul>
                                    </span>
                                    <span className="float-right">
                                        <ul>
                                            <li className="mr-2 primary-color">Accept Challenge</li>
                                            <li className="mr-2">Reject</li>
                                        </ul>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                            </div> */}



                        </div>
                    </Box>
                </Modal>
            </div>

            <div className="mentor-messages">
                <Modal
                    keepMounted
                    open={open4}
                    onClose={handleClose3}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">
                                <h4><img src={`${assetUrl}/add%20collaboration.svg`} alt="" />&nbsp;&nbsp;Mentor Messages</h4>
                            </span>
                            <span className="float-right" onClick={handleClose3}>
                                <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <div className="mentor-message-con border-bottom  pb-1 mb-1" onClick={handleOpen4}>
                                <div className="w-80">
                                    <div className="circle40-model">M</div>
                                    <div className="mentor-message-con-box" >
                                        <span><h4>Maths Project work</h4></span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="w-20 text-right">
                                    <span className="text-right"><small>July 14, 7:00PM</small></span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="mentor-message-con border-bottom pb-1 mb-1">
                                <div className="w-80">
                                    <div className="circle40-model">M</div>
                                    <div className="mentor-message-con-box" >
                                        <span><h4>Maths Project work</h4></span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="w-20 text-right">
                                    <span className="text-right"><small>July 14, 7:00PM</small></span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="mentor-message-con border-bottom pb-1 mb-1">
                                <div className="w-80">
                                    <div className="circle40-model">M</div>
                                    <div className="mentor-message-con-box" >
                                        <span><h4>Maths Project work</h4></span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="w-20 text-right">
                                    <span className="text-right"><small>July 14, 7:00PM</small></span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="mentor-message-con border-bottom pb-1 mb-1">
                                <div className="w-80">
                                    <div className="circle40-model">M</div>
                                    <div className="mentor-message-con-box" >
                                        <span><h4>Maths Project work</h4></span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="w-20 text-right">
                                    <span className="text-right"><small>July 14, 7:00PM</small></span>
                                </div>
                                <div className="clearfix"></div>
                            </div>

                        </div>
                    </Box>
                </Modal>
            </div>

            <div className="reply-mentor-messages">
                <Modal
                    keepMounted
                    open={open5}
                    onClose={handleClose4}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">
                                <h4><img src={`${assetUrl}/curriculim/add%20collaboration.svg`} alt="" />&nbsp;&nbsp;Reply Mentor Message</h4>
                            </span>
                            <span className="float-right" onClick={handleClose4}>
                                <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <div className="mentor-message-con border-bottom pb-1 mb-1">
                                <div className="w-80">
                                    <div className="circle40-model">D</div>
                                    <div className="mentor-message-con-box" >
                                        <span><h4>Dipyaman Baral</h4></span>
                                        <p>Mentor / Guru</p>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="w-20 text-right">
                                    <span className="text-right"><small>July 14, 7:00PM</small></span>
                                </div>
                                <div className="clearfix"></div>

                            </div>
                            <div className="reply-menter-comment">
                                <h5 className="mb-1">Reply to Mentor Message</h5>
                                <Textarea
                                    minRows={3}
                                    placeholder="Start writing here…|"
                                    variant="soft"
                                    sx={{
                                        borderBottom: '2px solid',
                                        borderColor: 'neutral.outlinedBorder',
                                        borderRadius: 0,
                                        '&:hover': {
                                            borderColor: 'neutral.outlinedHoverBorder',
                                        },
                                        '&::before': {
                                            border: '1px solid var(--Textarea-focusedHighlight)',
                                            transform: 'scaleX(0)',
                                            left: 0,
                                            right: 0,
                                            bottom: '-2px',
                                            top: 'unset',
                                            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                                            borderRadius: 0,
                                        },
                                        '&:focus-within::before': {
                                            transform: 'scaleX(1)',
                                        },
                                    }}
                                />

                                <div className="model-footer text-center pt-2 mt-2 mb-2">
                                    <AppButton children="Go back" styleClass='btn primary-color cancel-outline mr-2' />
                                    <AppButton children="Reply" onClick={handleOpen5} styleClass='btn save-btn  primary-bg mr-2 text-white' />
                                    <AppButton children="Cancel" onClick={handleClose4} styleClass='btn cancel-outline' />
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>

            <div className="Congratulations-model">
                <Modal
                    keepMounted
                    open={open2}
                    onClose={handleClose5}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">

                            </span>
                            <span className="float-right" onClick={handleClose5}>
                                <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <div className="text-center">
                                <p className=""><b className="primary-color">You are all Set…!!!</b></p>
                                <p>You have successfully replied to your mentor</p>
                            </div>
                            <div className="modal-content text-center mt-3">
                                <AppButton children="Back to Home" styleClass='btn primary-color cancel-outline' />
                            </div>

                        </div>
                    </Box>
                </Modal>
            </div>

            <div className="doubt-clearance-model">
                <Modal
                    keepMounted
                    open={open6}
                    onClose={handleClose5}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">
                                <h4><img src={`${assetUrl}/curriculim/view%20all.svg`} alt="" />&nbsp;&nbsp;View Doubt</h4>
                            </span>
                            <span className="float-right" onClick={handleClose5}>
                                <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <div className="questions">
                                <div className="questions-left">
                                    <div className="questions-left-img mt-3">
                                        <div className="circle40">
                                            <img src={`${assetUrl}/curriculim/Pop%20up%20user.svg`} alt="" />
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="answe-count">
                                            <div className="answe-count-top"><i className="fa fa-sort-desc" aria-hidden="true"></i></div>
                                            <div >10</div>
                                            <div><i className="fa fa-sort-desc" aria-hidden="true"></i></div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="questions-right">
                                    <div className="questions-topbar">
                                        <ul>
                                            <li><div className="pundit-btn">Pundit</div></li>
                                            <li>Asked: July 16, 2022</li>
                                            <li>In: <span style={{ 'color': '#6E99F9' }}>Politics, Art</span></li>
                                            <li></li>
                                        </ul>
                                    </div>
                                    <h4>Why do evolutionists believe in their theory so much?</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <div className="questions-bottom">
                                        <span className="float-left">
                                            <div className="answers-sec"><i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;&nbsp;25 Answers</div>
                                            <div className="answers-sec"><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;500 Views</div>
                                        </span>
                                        <span className="float-right">
                                            <AppButton children="Answer" styleClass='btn save-btn  primary-bg text-white' />
                                        </span>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>

                                <div className="clearfix"></div>
                            </div>

                        </div>
                        <div className="model-footer text-center">
                            <AppButton children="View all" styleClass='btn primary-bg text-white pr-2 pl-2 mr-2' />
                            <AppButton children="Cancel" styleClass='btn cancel-outline' />
                        </div>
                    </Box>
                </Modal>
            </div>

            <div className="view-certifications-model">
                <Modal
                    keepMounted
                    open={open6}
                    onClose={handleClose5}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">
                                <h4><img src={`${assetUrl}/curriculim/view%20all.svg`} alt="" />&nbsp;&nbsp;View Certifications</h4>
                            </span>
                            <span className="float-right" onClick={handleClose5}>
                                <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <div className="questions">
                                <div className="questions-left">
                                    <div className="questions-left-img mt-3">
                                        <div className="circle40">
                                            <img src={`${assetUrl}/curriculim/Pop%20up%20user.svg`} alt="" />
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="answe-count">
                                            <div className="answe-count-top"><i className="fa fa-sort-desc" aria-hidden="true"></i></div>
                                            <div >10</div>
                                            <div><i className="fa fa-sort-desc" aria-hidden="true"></i></div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="questions-right">
                                    <div className="questions-topbar">
                                        <ul>
                                            <li><div className="pundit-btn">Pundit</div></li>
                                            <li>Asked: July 16, 2022</li>
                                            <li>In: <span style={{ 'color': '#6E99F9' }}>Politics, Art</span></li>
                                            <li></li>
                                        </ul>
                                    </div>
                                    <h4>Why do evolutionists believe in their theory so much?</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <div className="questions-bottom">
                                        <span className="float-left">
                                            <div className="answers-sec"><i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;&nbsp;25 Answers</div>
                                            <div className="answers-sec"><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;500 Views</div>
                                        </span>
                                        <span className="float-right">
                                            <AppButton children="Answer" styleClass='btn save-btn  primary-bg text-white' />
                                        </span>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>

                                <div className="clearfix"></div>
                            </div>

                        </div>
                        <div className="model-footer text-center">
                            <AppButton children="View all" styleClass='btn primary-bg text-white pr-2 pl-2 mr-2' />
                            <AppButton children="Cancel" styleClass='btn cancel-outline' />
                        </div>
                    </Box>
                </Modal>
            </div>

            <div className="view-certifications-model">
                <Modal
                    keepMounted
                    open={open7}
                    onClose={handleClose6}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">
                                <h4><img src={`${assetUrl}/curriculim/view%20all.svg`} alt="" />&nbsp;&nbsp;View Certifications</h4>
                            </span>
                            <span className="float-right" onClick={handleClose6}>
                                <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <div className="certification-box-item mb-2">
                                        <div className="certification-box-title">
                                            <span className="float-left">
                                                <div className="certification-box-title-img">
                                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                </div>
                                                <div className="certification-box-title-con">
                                                    <h4>Headline 6</h4>
                                                    <p className="m-0">Body 2</p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </span>
                                            <span className="float-right">
                                                <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <div className="certification-box-item mb-2">
                                        <div className="certification-box-title">
                                            <span className="float-left">
                                                <div className="certification-box-title-img">
                                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                </div>
                                                <div className="certification-box-title-con">
                                                    <h4>Headline 6</h4>
                                                    <p className="m-0">Body 2</p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </span>
                                            <span className="float-right">
                                                <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <div className="certification-box-item mb-2">
                                        <div className="certification-box-title">
                                            <span className="float-left">
                                                <div className="certification-box-title-img">
                                                    <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                </div>
                                                <div className="certification-box-title-con">
                                                    <h4>Headline 6</h4>
                                                    <p className="m-0">Body 2</p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </span>
                                            <span className="float-right">
                                                <div className="text-right" onClick={handleOpen}><i className="fa fa-share-alt" onClick={handleOpen} aria-hidden="true"></i></div>
                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <img src={`${assetUrl}/curriculim/certification%20title%20img.svg`} alt="" className="w-100" />
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>

                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="model-footer text-center mt-2">
                            <AppButton children="View all" styleClass='btn primary-bg text-white pr-2 pl-2 mr-2' />
                            <AppButton children="Cancel" styleClass='btn cancel-outline' />
                        </div>
                    </Box>
                </Modal>
            </div>


            <div className="view-certifications-model">
                <Modal
                    keepMounted
                    open={open8}
                    onClose={handleClose7}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">
                                <h4><img src={`${assetUrl}/curriculim/view%20all.svg`} alt="" />&nbsp;&nbsp;Rewards</h4>
                            </span>
                            <span className="float-right" onClick={handleClose7}>
                                <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <div className="rewards-model-box">
                                <img src={`${assetUrl}/congreates-img.png`} alt="" />
                                <p className="primary-color">Congratulation!</p>
                                <p className="primary-color">You won <span>200</span> VCoins.</p>
                            </div>
                        </div>
                        <div className="model-footer text-center mt-2">
                            <AppButton children="Start Redeem" styleClass='btn primary-bg text-white pr-2 pl-2 mr-2' />
                            <AppButton children="Cancel" styleClass='btn cancel-outline' />
                        </div>
                    </Box>
                </Modal>
            </div>
<ToastContainer />  

        </div>
    );
}

