import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import configJson from "vridhee_common_component_mf/configJson";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import FooterCopyright from 'vridhee_common_component_mf/FooterCopyright';
import DashboardService from "../Services/dashboardservices";
import IDashboard from "../Models/IDashboard";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { BarChart } from '@mui/x-charts/BarChart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, Box, CircularProgress } from "@mui/material";
import LinesEllipsis from 'react-lines-ellipsis'
import CouseContent from "./courseContent";
import { PieChart } from '@mui/x-charts/PieChart';
import ReactStars from "react-rating-stars-component";
import LoadingSpinner from "./spinner";
import moment from "moment";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface ITopicSummaryDetails {
    topicSummaries: IDashboard,
    errorMsg: string
}

interface IBodyDetails {
    bodies: IDashboard[],
    errorMsgg: string
}

interface IMentorDetails {
    mentors: IDashboard
}

interface IContent {
    contents: IDashboard
}
interface ICourse {
    courses: IDashboard[]
}
interface IInstructor {
    instructors: IDashboard
}
interface IHeader {
    headers: IDashboard
}
interface IInclude {
    includes: IDashboard[]
}
interface ICollaboration {
    collaborations: IDashboard[]
}
interface ILeaderboard {
    leaderboards: IDashboard[]
}
interface IDetail {
    details: IDashboard
}
interface IPending {
    pendings: IDashboard
}
interface IPendingTopic {
    pendingtopics: IDashboard
}
const AssetUrl = configJson.local.AssetUrl;
const assetUrl = configJson.local.curriculumAssetUrl;

const uData = [40, 30, 20, 27, 18, 23, 34];
const pData = [24, 13, 98, 39, 48, 38, 43];
const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
];


const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
};
const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            // y: {
            //   beginAtZero: true
            // }
        }
    },
};

interface IMentor {
    userId: string;
    profileImg: string;
    userName: string;
}

interface IMentorList {
    data: IMentor[];
}


export default function SubjectDetails() {
    const navigate = useNavigate();

    const location = useLocation();
    console.log(location, "location")

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [showmore, setShowMore] = React.useState(false);
    const [showless, setShowLess] = React.useState(false);
    const [isFetching, setIsFetching] = useState(true); 
    const [content, setContent] = useState<IContent>({
        contents: {} as IDashboard
    })
    const [header, setHeader] = useState<IHeader>({
        headers: {} as IDashboard
    })
    const [include, setInclude] = useState<IInclude>({
        includes: [] as IDashboard[]
    })
    const [leaderboard, setLeaderBoard] = useState<ILeaderboard>({
        leaderboards: [] as IDashboard[]
    })
    const [collaboration, setCollaboration] = useState<ICollaboration>({
        collaborations: [] as IDashboard[]
    })
    const [detail, setDetail] = useState<IDetail>({
        details: {} as IDashboard
    })
    const [courseDetail, setCourseDetail] = useState<ICourse>({
        courses: [] as IDashboard[]
    })
    const [topicSummaryData, setTopicSummaryData] = useState<ITopicSummaryDetails>({
        topicSummaries: {} as IDashboard,
        errorMsg: ''
    })


    const [body, setBody] = useState<IBodyDetails>({
        bodies: [] as IDashboard[],
        errorMsgg: ''
    })
    const [instructor, SetInstructor] = useState<IInstructor>({
        instructors: {} as IDashboard,
    })

    const [mentor, setMentor] = useState<IMentorDetails>({
        mentors: {} as IDashboard
    })

    const [pending, setPending] = useState<IPending>({
        pendings: {} as IDashboard
    })

    const [pendingtopic, setPendingTopic] = useState<IPendingTopic>({
        pendingtopics: {} as IDashboard
    })

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
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

    function showMore() {
        setShowMore(true)
    }

    function showLess() {
        setShowMore(false)
    }

    useEffect(() => {
        if (location.state?.categoryId && location.state?.gradeId && location.state?.sub_id) {
            // DashboardService.getCurriculumSubjectDetails(location.state.categoryId, location.state.gradeId, location.state.sub_id)
            DashboardService.getCurriculumSubjectDetailsV2(location.state.categoryId, location.state.gradeId, location.state.sub_id, localStorage.getItem("Tokenuserid"))
                .then(res => {
                    console.log("getCurriculumSubjectDetails>>", localStorage.getItem("Tokenuserid"));
                    if (res.data.data) {
                        console.log(res.data.data, ",,,,,,,,,,,,,,,,,,,,,,")
                        setTopicSummaryData({
                            ...topicSummaryData, topicSummaries: res.data.data
                        })
                        setBody({
                            ...body, bodies: res.data.data.will_learn
                        })
                        SetInstructor({
                            ...instructor, instructors: res.data.data.instructors[0]
                        })
                        setMentor({
                            ...mentor, mentors: res.data.data.instructors[1]
                        })
                        setContent({
                            ...content, contents: res.data.data.t_content
                        })
                        setHeader({
                            ...header, headers: res.data.data.t_header
                        })
                        setInclude({
                            ...include, includes: res.data.data.crs_incl
                        })
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(e =>
                    console.log(e, "e")
                );
        }

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])


    function getCourseData() {

        if (location.state?.sub_id) {
            let subjectId = location.state?.sub_id;
            const data = { subId: subjectId, subName: topicSummaries.sub_name, categoryId: location.state?.categoryId, gradeId: location.state?.gradeId, pendings, pendingtopics };
            navigate("/topic-page", { state: data });
        } else {
            let subjectId = localStorage.getItem('subId');
            const data = { subId: subjectId, subName: topicSummaries.sub_name, categoryId: location.state?.categoryId, gradeId: location.state?.gradeId, pendings, pendingtopics };
            navigate("/topic-page", { state: data });
        }

    }

    useEffect(() => {
    let userId = localStorage.getItem('Tokenuserid');
    let subId = localStorage.getItem('subId')
    //    let userId = "65b2082e439d8066a1e00630"
    //    let subId = "65902f2c08f9b4e59bcf1311"
        DashboardService.getLeaderBoard(userId!,27,subId!)
            .then(res => {
                
                if(res.data.status ==200){
                 console.log(res.data.data,"result")
                 setLeaderBoard({
                    ...leaderboard, leaderboards: res.data.data
                })
                }
             
                // setDashboardHeaderCount(res.data.data)
            })
            .catch(e =>
                console.log(e, "e")
            );
        // empty dependency array means this effect will only run once (like componentDidMount in classes)

    }, [])

    useEffect(() => {
        const body = {
            "user_id": location?.state?.userId ? location?.state?.userId : localStorage.getItem('Tokenuserid'),
            "cat_id": location?.state?.categoryId ? location?.state?.categoryId : localStorage.getItem('catId'),
            "grade_id": location?.state?.gradeId ? location?.state?.gradeId : localStorage.getItem('gradeId'),
            "sub_id": location?.state?.sub_id ? location?.state?.sub_id : localStorage.getItem('subId')
        }
        DashboardService.updateCurriculumContent(body)
            .then(res => {
                console.log("updateCurriculumContent>>>", res.data.data)
                if(res.data.message){
                    setIsFetching(false)
                }
             
                // setDashboardHeaderCount(res.data.data)
            })
            .catch(e =>
                console.log(e, "e")
            );
        // empty dependency array means this effect will only run once (like componentDidMount in classes)

    }, [])

    useEffect(() => {
        let subId: string | null;
        if (location.state?.sub_id) {
            subId = location.state?.sub_id
        } else {
            subId = localStorage.getItem('subId')
        }
        DashboardService.getCourseContent(subId)
            .then(res => {
                console.log("getCourseContent>>curriculum-subject2")
                if (res.data.data) {
                    let findData = res.data.data.course.find((el: any) => el.chapter.completed_hours == "0.00");

                    console.log(findData, "findData")
                    if (findData) {
                        localStorage.setItem('chapterId', findData._id)
                    }
                    let uncompletedArray = findData.chapter
                    setPending({
                        ...pending, pendings: uncompletedArray
                    })
                    setPendingTopic({
                        ...pendingtopic, pendingtopics: uncompletedArray.topics[0]
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

    useEffect(() => {
        const body = {
            "db_metadata": 25,
            "user_id": location?.state?.userId ? location?.state?.userId : localStorage.getItem('Tokenuserid'),
            "sub_id": location?.state?.sub_id ? location?.state?.sub_id : localStorage.getItem('subId')
        }
            DashboardService.userBySubjectCollabarations(body)
                .then(res => {
                    if(res.data.status ==200){
                     console.log(res.data.details,"result")
                     setCollaboration({
                        ...collaboration, collaborations: res.data.details
                    })
                    }
                 
                    // setDashboardHeaderCount(res.data.data)
                })
                .catch(e =>
                    console.log(e, "e")
                );
            // empty dependency array means this effect will only run once (like componentDidMount in classes)
    
        }, [])


        const updateCollabarationStatusByUser = (data:IDashboard,status:number) => {
            const body = {
                "db_metadata": 25,
                "user_id": location?.state?.userId ? location?.state?.userId : localStorage.getItem('Tokenuserid'),
                "collabaration_id": data._id,
                "status": status
            }
            DashboardService.updateCollabarationStatusByUser(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success(res.data.message)
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(e =>
                    console.log(e, "e")
                );
        }

        const [mentorLists, setMentorLists] = useState<IMentorList | undefined>()


    useEffect(() => {
        let subId: string | null;
        if (location.state?.sub_id) {
            subId = location.state?.sub_id
        } else {
            subId = localStorage.getItem('subId')
        }

        DashboardService.getMentorsList(subId)
            .then(res => {
                console.log("getmetor list>>", res.data)
                if (res.data.data && res.data.status === 200) {
                    setMentorLists(res.data)

                } else {
                    toast.error(res.data.message)
                }

            })
            .catch(e =>
                console.log(e, "e")
            );

    }, []);



        const { collaborations } = collaboration;
    const { pendings } = pending;
    const { pendingtopics } = pendingtopic;
    const { contents } = content;
    const { includes } = include;
    const { leaderboards } = leaderboard;
    const { headers } = header;
    const { topicSummaries, errorMsg } = topicSummaryData;
    const { bodies, errorMsgg } = body;
    const { instructors } = instructor;
    const { mentors } = mentor;
    const data = [
        { label: 'Low', value: 200, color: '#FD346E' },
        { label: 'Medium', value: 400, color: '#FCDC00' },
        { label: 'Good', value: 600, color: '#0CD68A' },
        { label: 'Excellent', value: 800, color: '#1DE2CF', },
    ];
    console.log("headers>>", headers)
    console.log("header>>", header)
    console.log("topicSummaryData>>", topicSummaryData)
    console.log("topicSummaries>>", topicSummaries.ttl_hour)

    // if (isFetching) {
    //     return (
    //       <Box sx={{ display: "flex", justifyContent: "center" }}>
    //         <LoadingSpinner />
    //       </Box>
    //     );
    //   } else{
        return (
            <div>
                <div>
                    <HeaderCurriculum />
                    <div className="bg-lightbule p-2">
                        <div className="subject-details">
    
                            <div className="subject-details-sec">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={3}>
                                        {/* <div className="subject-details-left">
                                    <h3>Course content</h3>
                                    <p>19 sections • 168 lectures • 15h 30m total length</p>
                                    <p className="primary-color font-w400">Expand all</p> */}
    
                                        {location.state ? <CouseContent subId={location.state.sub_id} subData={location.state} /> : <CouseContent subId={localStorage.getItem('subId')} subData={location.state} />}
    
                                        {/* </div> */}
                                    </Grid>
    
                                    <Grid item xs={12} md={7}>
                                        <div className="subject-details-center">
    
                                            <div className="breadcrumbs-sec">
                                                <Breadcrumbs aria-label="breadcrumb">
                                                    <Link color="#174392" to="/dashboard">
                                                        Dashboard
                                                    </Link>
                                                    <Link color="#174392" to="/subject-details">
                                                        <Typography color="#62676C"> {localStorage.getItem('subName')}</Typography>
                                                    </Link>
                                                    {/* <Link color="#174392" to="/subject-details">
                                {`${topicSummaries?.sub_name}` ? <Typography color="#62676C"> {topicSummaries?.sub_name}</Typography> : <Typography color="#62676C"> {localStorage.getItem('subName')}</Typography>}    
                                    </Link> */}
    
                                                </Breadcrumbs>
                                            </div>
                                            {/* 
                                            <h2 className="primary-color">
                                                {topicSummaries?.sub_name} </h2> */}
                                            <div className="rating-box">
                                                <ul>
    
                                                    <li>
                                                        <div className="rating-sec">
                                                            {/* <span> {headers?.rating}
                                                            </span> */}
                                                            <span>
                                                                <ul>
                                                                    {/* <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                    <li><i className="fa fa-regular fa-star" aria-hidden="true"></i></li> */}
                                                                    {topicSummaries?.useractivityheader && (
                                                                        <ReactStars
                                                                            count={5}
                                                                            value={topicSummaries?.useractivityheader?.sub_rating}
                                                                            size={15}
                                                                            isHalf={true}
                                                                            emptyIcon={<i className="far fa-star"></i>}
                                                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                            fullIcon={<i className="fa fa-star"></i>}
                                                                            activeColor="#ffd700"
                                                                        />
                                                                    )}
                                                                </ul>
                                                            </span>
                                                            <span> ({topicSummaries?.useractivityheader?.sub_rating}/{topicSummaries?.t_header?.rating} ratings)
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <p className="m-0">
                                                            {topicSummaries?.useractivityheader?.tot_students}&nbsp; Students</p>
                                                    </li>
                                                    <li>
                                                        <p className="m-0"> {topicSummaries?.useractivityheader?.tot_mentors}&nbsp; Mentors</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="hour-sec mt-1">
                                                <ul>
                                                    <li><img src={`${assetUrl}/Total%20hr%20clock.svg`} alt="" />
                                                        {topicSummaries?.useractivityheader?.tot_hours_Completed}/{topicSummaries?.useractivityheader?.tot_hours}  &nbsp;  Hours</li>
                                                    <li><img src={`${assetUrl}/topics.svg`} alt="" />  {topicSummaries?.useractivityheader?.tot_topics_completed}/{topicSummaries?.useractivityheader?.tot_topics} &nbsp;
                                                        Topics</li>
                                                    <li><img src={`${assetUrl}/buddies%20comp.svg`} alt="" />
                                                        {topicSummaries?.useractivityheader?.buddiesCompleted} Buddies Completed</li>
                                                    <li><img src={`${assetUrl}/buddies%20inpg.svg`} alt="" />
                                                        {topicSummaries?.useractivityheader?.buddiesInprogress} Buddies Inprogress</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="desc mt-2">
                                            <h5 className="font-w600 subject-title-con">Description</h5>
                                            <p>
    
                                                <div className='lines'>
                                                    {showmore ? <span >   {location?.state?.desc}  </span> : <span style={{
                                                        maxHeight: "4rem",
                                                        overflow: "hidden",
                                                        display: "-webkit-box",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "normal",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        msTextOverflow: "ellipsis",
                                                    }}>
                                                        {topicSummaries?.desc}  </span>}
                                                </div>  </p>
                                            {!showmore ? <p style={{
                                                textDecoration: "underline",
                                                color: "#0275B1",
                                                fontSize: '12px',
                                                cursor: 'pointer'
                                            }} onClick={showMore}>Show More </p> : <p style={{
                                                textDecoration: "underline",
                                                color: "#0275B1",
                                                fontSize: '12px',
                                                cursor: 'pointer'
                                            }} onClick={showLess}>Show Less </p>}
    
                                        </div>
    
                                        <div className="content-box mt-2">
                                            <div className="content-box-con-box">
    
                                                <a
                                                // style={{ cursor: 'pointer' }} onClick={() => getCourseData()}
                                                >
                                                    <img src={`${assetUrl}/Video.svg`} alt="" />
                                                    <h5>
                                                        Video({topicSummaries?.useractivitycontent?.ttl_video_completed}/{topicSummaries?.t_content?.ttl_video})
                                                    </h5>
                                                </a>
    
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="content-box-con-box">
                                                <a >
                                                    <img src={`${assetUrl}/e%20content.png`} alt="" />
                                                    <h5>e-Content  ({topicSummaries?.useractivitycontent?.ttl_e_content_completed}/{topicSummaries?.t_content?.ttl_e_content})
                                                    </h5>
                                                </a>
    
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="content-box-con-box">
                                                <a >
                                                    <img src={`${assetUrl}/Important%20notes.svg`} alt="" />   <h5>
                                                        Important Note({topicSummaries?.useractivitycontent?.ttl_imp_notes_completed}/{topicSummaries?.t_content?.ttl_imp_notes})
                                                    </h5>
                                                </a>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="content-box-con-box">
                                                <a >
                                                    <img src={`${assetUrl}/Questions%20.svg`} alt="" />  <h5>Question    ({topicSummaries?.useractivitycontent?.ttl_question_completed}/{topicSummaries?.t_content?.ttl_question})
                                                    </h5>
                                                </a>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="content-box-con-box">
                                                <a  >
                                                    <img src={`${assetUrl}/Assignment.svg`} alt="" />
                                                    <h5>Assignment
                                                        ({topicSummaries?.useractivitycontent?.ttl_assignment_completed}/{topicSummaries?.t_content?.ttl_assignment})
                                                    </h5>
                                                </a>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="content-box-con-box">
                                                <a >
                                                    <img src={`${assetUrl}/Doubts%20.svg`} alt="" />
                                                    <h5>Doubt
                                                        ({topicSummaries?.useractivitycontent?.ttl_doubt_completed}/{topicSummaries?.t_content?.ttl_doubt})
                                                    </h5>
                                                </a>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="content-box-con-box">
                                                <a  >
                                                    <img src={`${assetUrl}/Revision.svg`} alt="" />
    
                                                    <h5>Revision
                                                        ({topicSummaries?.useractivitycontent?.ttl_revision_completed}/{topicSummaries?.t_content?.ttl_revision})
                                                    </h5>
    
                                                </a>
    
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="content-box-con-box">
                                                <a  >
                                                    <img src={`${assetUrl}/discussion.png`} alt="" />
                                                    <h5>Example
                                                        ({topicSummaries?.useractivitycontent?.ttl_example_completed}/{topicSummaries?.t_content?.ttl_example})
                                                    </h5>
                                                </a>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
    
                                        <div className="content-box-learn mt-2">
                                            <div className="what-learn mt-2">
                                                <h5 className="font-w600 subject-title-con">What you'll learn</h5>
    
                                                {/* <ul>
                                    <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    Crystal structures and lattice arrangements
                  </li>
                  <li >
                    <i className="fa fa-check" aria-hidden="true"></i>
                    Photodiodes, LEDs, and laser diodes
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    Drift and diffusion currents in semiconductors
                  </li>
                  <li >
                    <i className="fa fa-check" aria-hidden="true"></i>
                    Light detection, emission, and modulation
                    </li>
                                    <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    Mobility and conductivity in semiconductors
                  </li>
                  <li >
                    <i className="fa fa-check" aria-hidden="true"></i>
                    Emerging semiconductor materials and their applications
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    BJT structure, operation, and characteristics
                  </li>
                  <li >
                    <i className="fa fa-check" aria-hidden="true"></i>
                    Impact of semiconductors on emerging technologies
                  </li>
              </ul> */}
                                                <ul>
                                                    {
                                                        bodies.map((data, i) =>
                                                            <li key={i}>
                                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                                {data}
                                                            </li>
    
                                                        )}
                                                </ul>
    
                                            </div>
                                        </div>
    
                                        <div className="course-include mt-2">
    
                                            <div className="what-learn mt-2">
                                                <h5 className="font-w600 subject-title-con">This course includes:</h5>
    
                                                <ul>
                                                    {
                                                        includes.map((data: any, i: number) =>
                                                            <li key={i}>
                                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                                {data}
                                                            </li>
                                                        )}
                                                </ul>
                                                {/* <ul>
                <li>15.5 hours on-demand video</li>
                <li>Full lifetime access</li>
                <li>26 downloadable resources</li>
                <li>Certificate of completion</li>
              </ul> */}
    
                                            </div>
                                        </div>
    
                                        <div className="barchart mt-2">
                                            <h5 className="font-w600 subject-title-con">Learning Progress</h5>
                                            {/* <Bar options={config} data={data} /> 
       <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={500}
      height={300}
    />  */}
                                            <div className="content-box-learn mt-2">
                                                <BarChart
                                                    width={600}
                                                    height={300}
                                                    series={[
                                                        { data: pData, label: 'Study', id: 'pvId', stack: 'total', color: '#FF9053' },
                                                        { data: uData, label: 'Exams', id: 'uvId', stack: 'total', color: '#F7EEE1' },
                                                    ]}
                                                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                                                />
                                            </div>
                                        </div>
    
                                        <div className="collaboration-sec-box mt-3">
                                            <h5 className="font-w600 subject-title-con mb-2">Collaboration</h5>
                                            <Carousel responsive={responsive} autoPlay>

                                            {collaborations.length > 0 ? collaborations.map((data, i) =>       
                                                <div>
                                                    <div className="Collaboration-box-test">
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={8}>
                                                                <div className="Collaboration-box-con">
                                                                    <img className="circle40" src={data.profile_image} alt="" />
                                                                    <h3>{data.user_name}</h3>
                                                                    {/* <p className="m-0">Electrical Engineer - Dublin</p> */}
                                                                    {/* <p className="m-0"><small>Tatsiana Zhukouskaya and 810 others</small></p> */}
                                                                    <p className="m-0">{data.c_text}</p>
                                                                    <p className="m-0" style={{ 'color': '#004392' }}>
                                                                        Date :  {moment(data.c_dt).format('MMM DD YYYY')}
                                                                        <br/>
                                                                        {/* {data.c_dt} */}
                                                                         {/* 9:00 to 10:00 */}
                                                                        {/* </p>   <p className="m-0" style={{ 'color': '#004392' }}> */}

                                                                        TIme :{data.c_ts}
                                                                         {/* 9:00 to 10:00 */}
                                                                        </p>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                         {data?.j_list?.c_u_status == 'May Be' ? 
                                                         <div className="mt-2">
                                                         <button type="button" className="btn primary-bg1 text-white border-r pl-2 pr-2 mr-2" style={{ 'cursor': 'pointer' }} onClick={()=>updateCollabarationStatusByUser(data,0)}>Accept</button>
                                                         <button type="button" className="btn border-r pl-2 pr-2" style={{ 'background': '#D9D9D980' ,'cursor': 'pointer'}}  onClick={()=>updateCollabarationStatusByUser(data,0)}>Ignore</button>
                                                     </div> 
                                                     :
                                                     <div>
                                                     {data?.j_list?.c_u_status == 'Yes' ? 
                                                 
          <p className="font-w600 primary-color" style={{textAlign:'right'}}>Accepted</p>
                                                    :
                                                    <p className="font-w600" style={{textAlign:'right',color:'red'}}>Ignored</p>
                                                    
                                            }
                                             </div>
                                                 }       
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </div>
                                                  ) :
                                                  <div>
                                                  </div>}
                                              {/*   <div>
                                                    <div className="Collaboration-box-test">
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={8}>
                                                                <div className="Collaboration-box-con">
                                                                    <img src={`${assetUrl}/prn.png`} alt="" />
                                                                    <h3>Vladimir Lupinskiy</h3>
                                                                    <p className="m-0">Electrical Engineer - Dublin</p>
                                                                    <p className="m-0"><small>Tatsiana Zhukouskaya and 810 others</small></p>
                                                                    <p className="m-0" style={{ 'color': '#004392' }}>Timings : 9:00 to 10:00</p>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="mt-2">
                                                                    <button type="button" className="btn primary-bg text-white border-r pl-2 pr-2 mr-2">Accept</button>
                                                                    <button type="button" className="btn border-r pl-2 pr-2" style={{ 'background': '#D9D9D980' }}>Ignore</button>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="Collaboration-box-test">
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={8}>
                                                                <div className="Collaboration-box-con">
                                                                    <img src={`${assetUrl}/prn.png`} alt="" />
                                                                    <h3>Vladimir Lupinskiy</h3>
                                                                    <p className="m-0">Electrical Engineer - Dublin</p>
                                                                    <p className="m-0"><small>Tatsiana Zhukouskaya and 810 others</small></p>
                                                                    <p className="m-0" style={{ 'color': '#004392' }}>Timings : 9:00 to 10:00</p>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="mt-2">
                                                                    <button type="button" className="btn primary-bg text-white border-r pl-2 pr-2 mr-2">Accept</button>
                                                                    <button type="button" className="btn border-r pl-2 pr-2" style={{ 'background': '#D9D9D980' }}>Ignore</button>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="Collaboration-box-test">
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={8}>
                                                                <div className="Collaboration-box-con">
                                                                    <img src={`${assetUrl}/prn.png`} alt="" />
                                                                    <h3>Vladimir Lupinskiy</h3>
                                                                    <p className="m-0">Electrical Engineer - Dublin</p>
                                                                    <p className="m-0"><small>Tatsiana Zhukouskaya and 810 others</small></p>
                                                                    <p className="m-0" style={{ 'color': '#004392' }}>Timings : 9:00 to 10:00</p>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <div className="mt-2">
                                                                    <button type="button" className="btn primary-bg text-white border-r pl-2 pr-2 mr-2">Accept</button>
                                                                    <button type="button" className="btn border-r pl-2 pr-2" style={{ 'background': '#D9D9D980' }}>Ignore</button>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </div> */}
    
                                            </Carousel>
    
                                        </div>
                                        <div className="rounde-box mt-3">
                                            <h5 className="font-w600 subject-title-con mb-2">Leader board</h5>
                               {leaderboards.length > 0  ?  <div className="leader-board-box">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>RANK</th>
                                                            <th>NAME</th>
                                                            <th>HOUR</th>
                                                            <th>POINT</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                      {leaderboards.length > 0 ? leaderboards.map((data, i) =>  
                                                        <tr>
                                                            <td><div className="number-count">{data.Rank}</div>
                                                            {/* <div className="color-arrow" style={{ 'borderColor': '#2FB2AB' }}></div> */}
                                                            </td>
                                                            <td style={{'textAlign':'left'}}><img src={data.profileImg} alt="" />&nbsp;<span>{data.userName}</span></td>
                                                            <td>{data.hours}</td>
                                                            <td>{data.points}</td>
                                                        </tr>
                                                        ) :
                                                        <div>
                                                            {/* <LoadingSpinner />  */}
                                                        </div>
                                                    }
                                                    </tbody>
    
                                                </table>
                                            </div> : <p> No data Available</p>}            
                                        </div>
    
                                    </Grid>
                                    {/* )} */}
                                    <Grid item xs={12} md={2}>
                                        <div className="subject-con-right">
                                            <img src={topicSummaries?.imageURL} alt="" />
                                            {/* <img src="https://www.techrepublic.com/wp-content/uploads/2023/04/tr41423-semiconductor-sustainability.jpeg" alt="" /> */}
                                            <button type="button" className="btn primary-bg1 text-white w-100 pl-2 pr-2 mr-2">
                                                <p className="m-0">Enrolled&nbsp;<i className="fa fa-check-circle" aria-hidden="true"></i></p>
                                            </button>
                                            <div className="learner-chart">
                                                <h5 className="font-w600 subject-title-con">Learning Performance</h5>
                                                <div className="learner-box">
                                                    <PieChart
                                                        series={[
                                                            {
                                                                startAngle: -90,
                                                                endAngle: 90,
                                                                paddingAngle: 5,
                                                                innerRadius: 60,
                                                                outerRadius: 80,
                                                                data,
                                                            },
                                                        ]}
                                                        margin={{ right: 5 }}
                                                        width={200}
                                                        height={200}
                                                        slotProps={{
                                                            legend: { hidden: true },
                                                        }}
                                                    />
                                                    <div className="learner-border">
                                                        <div className="learning-circle">
                                                            <h4 className="m-0">650</h4>
                                                            <p className="m-0">Excellent</p>
                                                        </div>
                                                    </div>
                                                </div>
    
    
    
                                                <div className="Instructor-sec">
                                                    <h5 className="font-w600 subject-title-con mt-1">Instructor</h5>
                                                    {/* { instructors.map((insData:IDashboard, i:number) => */}
                                                    <div className="Instructor-sec-box">
                                                        <div className="Instructor-sec-box">
                                                            <img src={mentorLists?.data[0]?.profileImg || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} alt="" />
                                                            <p className="font-w600 m-0" title={mentorLists?.data[0].userName}>
    
                                                                {/* Kishore Babu Y */}
                                                                {mentorLists?.data[0].userName}
                                                            </p>
                                                            {/* <p>{instructors.designation}</p> */}
                                                        </div>
                                                        <div className="instructor-rating">
                                                            <div className="w-50">
                                                                <span><img src={`${assetUrl}/star%20profile.svg`} alt="" /></span>
                                                                {/* 4.5 */}
                                                                {instructors?.rating}
                                                                &nbsp;<span>({instructors?.ttl_reviews} review)</span>
                                                            </div>
                                                            {/* <div className="w-50">
                                                                <span><img src={`${assetUrl}/courses.svg`} alt="" /></span>&nbsp;<span>
                                                                    20
                                                                    Courses</span>
                                                            </div> */}
                                                            <div className="clearfix"></div>
                                                            <p>
                                                                {/* {instructors.desc} */}
                                                                {/* Led the design and development of high-performance semiconductor devices and integrated circuits (ICs) for various applications.Conducted in-depth research and analysis of semiconductor materials, architectures, and manufacturing processes to optimize performance and reliability. */}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* )} */}
    
    
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="other-mentors">
                                                <h5 className="font-w600 subject-title-con mt-1">Recommended Mentors</h5>
                                                { mentorLists?.data?.slice(1).map((mentor, i) =>
                                                <div className="other-mentors-box">
                                                    <div className="other-mentors-box-img">
                                                        <img src={mentor?.profileImg || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} height={30} alt="" />
                                                        <p className="secondry-color m-0">vRank #</p>
                                                    </div>
                                                    <div className="other-mentors-box-con">
                                                        <h5>    {mentor?.userName}</h5>
                                                        {/* <small>    {mentors.designation}</small> */}
                                                        <small><img src={`${assetUrl}/st%20guide.svg`} alt="" />{mentors.student_guided} Students Guided</small>
                                                        <button type="button" className="btn primary-bg1 text-white w-100 mt-1">Connect</button>
                                                    </div>
                                                </div>
                                                )} 
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <FooterCopyright />
    
    
                </div>
                <ToastContainer />
            </div>
        );
    //   }
   
}