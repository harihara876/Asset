import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useCallback } from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import configJson from "vridhee_common_component_mf/configJson";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Dropdown from "vridhee_common_component_mf/Dropdown"
import { ToastContainer, toast } from 'react-toastify';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import FooterCopyright from 'vridhee_common_component_mf/FooterCopyright';
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import DashboardService from "../Services/dashboardservices";
import IDashboard from "../Models/IDashboard";
import AppButton from 'vridhee_common_component_mf/AppButton';
import AppInput from 'vridhee_common_component_mf/AppInput';
import GaugeChart from 'react-gauge-chart'
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Modal from '@mui/material/Modal';
import { Alert, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import CouseContent from "./courseContent";
import Textarea from "@mui/joy/Textarea/Textarea";
// Ragting
import ReactStars from "react-rating-stars-component";
import FormControl from "@mui/joy/FormControl";
import DoubtTab from "./doubt-tab";
import ReplyIcon from '@mui/icons-material/Reply';
import Collapse from "@material-ui/core/Collapse";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ReactPlayer from "react-player";
import { useState, useRef } from "react";
import { formatTime } from "../format";
import Test from "./test";

const options = [
    { label: "practice test", name: 'practice test' },
    { label: "class test", name: 'class test' }
];

let languageType: number
interface IEContentComment {
    econtentcomments: IDashboard[]
}
interface IEContentCommentLevel1 {
    econtentcommentslevels1: IDashboard[]
}
interface IEContentCommentLevel2 {
    econtentcommentslevels2: IDashboard[]
}
interface IEContentCommentLevel3 {
    econtentcommentslevels3: IDashboard[]
}
interface IEContentCommentLevel4 {
    econtentcommentslevels4: IDashboard[]
}
interface ITeacherEContentCommentLevel1 {
    teacherecontentcommentslevels1: IDashboard[]
}
interface IExerciseContentCommentLevel1 {
    exercisecontentcommentslevels1: IDashboard[]
}
interface IExampleContentCommentLevel1 {
    examplecontentcommentslevels1: IDashboard[]
}
interface IBookEContentCommentLevel1 {
    bookEcontentcommentslevels1: IDashboard[]
}
interface IimpPointsContentCommentLevel1 {
    impPointscontentcommentslevels1: IDashboard[]
}
interface IContentComment {
    contentcomment: IDashboard[]
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
interface IHeader {
    headers: IDashboard
}
interface IEcontentFeedback {
    econtentfeedbacks: IDashboard[]
}
interface IContentType {
    contenttypes: IDashboard[]
}
interface IContentLevelType {
    contentleveltypes: IDashboard[]
}
interface IVideoFeedback {
    videofeedbacks: IDashboard[]
}
interface IAie1Feedback {
    aie1feedbacks: IDashboard[]
}
interface IVideoComment {
    videocomments: IDashboard[]
}
interface IVideoCommentReply {
    videocommentreplies: IDashboard[]
}
interface UserActivityTimeLine {
    userVideoTLine?: Array<{
        _id?: string;
        user_id?: string;
        video_id?: string;
        t_id?: string;
        f_ts?: string;
        name?: string;
        sts?: number;
    }>
}
interface ITopicSummaryDetails {
    topicSummaries: IDashboard,
    errorMsg: string
}
interface INote {
    notes: IDashboard[]
}
interface IVideoNote {
    videonotes: IDashboard[]
}
interface IVideo {
    videodetails: IDashboard[]
}
interface IVideoSingle {
    videos: IDashboard
}
interface IQuestion {
    questions: IDashboard[]
}
interface ISQuestion {
    singlequestions: IDashboard
}
interface IBookEcontentLevel1 {
    bookecontents1: IDashboard[]
}
interface ITeacherEcontentLevel1 {
    teacherecontents1: IDashboard[]
}
interface IExpEcontentLevel1 {
    expecontents1: IDashboard[]
}
interface IExerciseEcontentLevel1 {
    exerciseecontents1: IDashboard[]
}
interface IImpPointEcontentLevel1 {
    imppointsecontents1: IDashboard[]
}
interface IAIEcontentLevel1 {
    aiecontents1: IDashboard[]
}
interface IAIEcontentLevel2 {
    aiecontents2: IDashboard[]
}
interface IAIEcontentLevel3 {
    aiecontents3: IDashboard[]
}
interface IAIEcontentLevel4 {
    aiecontents4: IDashboard[]
}
interface VideoAndTLineState {
    videoAndTLine: {
        _id?: {
            s_url?: string;
        };
        t_lines?: Array<{
            name?: string;
            time?: string;
            user_id?: string;
            _id?: string;
        }>;
    };
}
interface ReplyState {
    e_c_id: string | undefined;
    reply_id: string;
    content_type_id: string | undefined;
    level_id: string | undefined;
    contentTypeName: string;
    levelType: string;
}
const assetUrl = configJson.local.curriculumAssetUrl;
let topicId: any
let noteId: string | undefined

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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TopicPage() {
    const [lista1creplyLikeIndex, setListA1CReplyLikeIndex] = useState<undefined | number>(undefined);
    const [lista1creplydisLikeIndex, setListA1CReplydisLikeIndex] = useState<undefined | number>(undefined);
    const [lista2creplyLikeIndex, setListA2CReplyLikeIndex] = useState<undefined | number>(undefined);
    const [lista2creplydisLikeIndex, setListA2CReplydisLikeIndex] = useState<undefined | number>(undefined);
    const [listaie1replyIndex, setListAie1replyIndex] = useState<undefined | number | String>(undefined);
    const [listLikeIndex, setListLikeIndex] = useState<undefined | number>(undefined);
    const [listdisLikeIndex, setListdisLikeIndex] = useState<undefined | number>(undefined);
    const [listreplyLikeIndex, setListReplyLikeIndex] = useState<undefined | number>(undefined);
    const [listreplydisLikeIndex, setListReplydisLikeIndex] = useState<undefined | number>(undefined);
    const [listvideoreplyIndex, setListVideoreplyIndex] = useState<undefined | number>(undefined);
    const [listIndex, setListIndex] = useState<undefined | number>(undefined);
    const [listreplyIndex, setListReplyIndex] = useState<undefined | number>(undefined);
    const [openvideoreplyReply, setOpenVideoReplyReply] = React.useState(false);
    const [vcommentreplyactiveBtn, setVCommentReplyActiveBtn] = useState("none");
    const [vcommentreplylikeCount, setVCommentReplyLikeCount] = useState(0);
    const [vcommentreplydislikeCount, setVCommentReplyDislikeCount] = useState(0);
    const [played1, setPlayed1] = useState(0)
    const dashboard_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl
    const [showmore, setShowMore] = React.useState(false);
    const [showTimeline, setShowTimeline] = React.useState(false);
    const [note, setNote] = React.useState('');
    const [cid, setCId] = React.useState('');
    const [vnoteId, setNoteId] = React.useState('');
    const [rid, setRId] = React.useState('');
    const [vid, setVId] = React.useState('');
    const [tid, setTId] = React.useState('');
    const [videonote, setVideoNote] = React.useState('');
    const [videonoteId, setVideoNoteId] = React.useState('');
    const ref = useRef(null);
    const [open2, setOpen2] = React.useState(false);
    const [addnewvideocomment, setAddnewvideocomment] = React.useState(false);
    const [addnewvideocommentreply, setAddnewvideocommentreply] = React.useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [contentlikeCount, setContentLikeCount] = useState(0);
    const [timeLine, setTimeLine] = React.useState('');
    const [timeLineBtn, setTimeLineBtn] = useState("Save");
    const [timeLineId, setTimeLineId] = useState("");
    const [impcontentlikeCount, setImpContentLikeCount] = useState(0);
    const [aie1contentlikeCount, setAie1ContentLikeCount] = useState(0);
    const [aie2contentlikeCount, setAie2ContentLikeCount] = useState(0);
    const [aie3contentlikeCount, setAie3ContentLikeCount] = useState(0);
    const [aie4contentlikeCount, setAie4ContentLikeCount] = useState(0);
    const [expcontentlikeCount, setExpContentLikeCount] = useState(0);
    const [exercisecontentlikeCount, setExerciseContentLikeCount] = useState(0);
    const [teachercontentlikeCount, setTeacherContentLikeCount] = useState(0);
    const [state, setState] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [impcontentlevelObjectid, setImpContentlevelObjectid] = useState('');
    const [contentlevelObjectid, setContentlevelObjectid] = useState('');
    const [testType, setTestType] = useState('practice test');
    const [aie1contentlevelObjectid, setAie1ContentlevelObjectid] = useState('');
    const [aie2contentlevelObjectid, setAie2ContentlevelObjectid] = useState('');
    const [aie3contentlevelObjectid, setAie3ContentlevelObjectid] = useState('');
    const [aie4contentlevelObjectid, setAie4ContentlevelObjectid] = useState('');
    const [expcontentlevelObjectid, setExpContentlevelObjectid] = useState('');
    const [exercisecontentlevelObjectid, setExerciseContentlevelObjectid] = useState('');
    const [teachercontentlevelObjectid, setTeacherContentlevelObjectid] = useState('');
    const [contentdislikeCount, setContentDislikeCount] = useState(0);
    const [impcontentdislikeCount, setImpContentDislikeCount] = useState(0);
    const [aie1contentdislikeCount, setAie1ContentDislikeCount] = useState(0);
    const [aie2contentdislikeCount, setAie2ContentDislikeCount] = useState(0);
    const [aie3contentdislikeCount, setAie3ContentDislikeCount] = useState(0);
    const [aie4contentdislikeCount, setAie4ContentDislikeCount] = useState(0);
    const [expcontentdislikeCount, setExpContentDislikeCount] = useState(0);
    const [exercisecontentdislikeCount, setExerciseContentDislikeCount] = useState(0);
    const [teachercontentdislikeCount, setTeacherContentDislikeCount] = useState(0);
    const [noteBtn, setNoteBtn] = useState("Save");
    const [videonoteBtn, setVideoNoteBtn] = useState("Save");
    const [feedbackBtn, setFeedbackBtn] = useState("Save");
    const [aie1feedbackBtn, setAie1FeedbackBtn] = useState("Save");
    const [videocommentBtn, setVideocommentBtn] = useState("Save");
    const [feedbackvalue, setFeedbackvalue] = useState("");
    const [aie1feedbackvalue, setAie1Feedbackvalue] = useState("");
    const [videocommentvalue, setVideocommentvalue] = useState("");
    const [videocommentreplyvalue, setVideocommentreplyvalue] = useState("");
    const [feedbackId, setFeedbackId] = useState("");
    const [aie1feedbackId, setAie1FeedbackId] = useState("");
    const [videocommentId, setVideocommentId] = useState("");
    const [videoId, setVideoId] = useState("");
    const [videocomId, setVideoComId] = useState("");
    const [feedbackRating, setFeedbackRating] = useState(0);
    const [aie1feedbackRating, setAie1FeedbackRating] = useState(0);
    const [levelId, setLevelId] = useState<string | undefined>("");
    const [contentTypeId, setContentTypeId] = useState<string | undefined>("");
    const location = useLocation();
    const [videoAndTLines, setVideoAndTLine] = useState<VideoAndTLineState>({
        videoAndTLine: { t_lines: [] }, // Initialize with an empty array
    });
    const [aie1contentType, setAie1ContentType] = useState<string | undefined>("");
    const [aie1levelType, setAie1LevelType] = useState<string | undefined>("");
    const [activeBtn, setActiveBtn] = useState("none");
    const [contentactiveBtn, setContentActiveBtn] = useState("none");
    const [aie1contentactiveBtn, setAie1ContentActiveBtn] = useState("none");
    const [aie2contentactiveBtn, setAie2ContentActiveBtn] = useState("none");
    const [aie3contentactiveBtn, setAie3ContentActiveBtn] = useState("none");
    const [aie4contentactiveBtn, setAie4ContentActiveBtn] = useState("none");
    const [expcontentactiveBtn, setExpContentActiveBtn] = useState("none");
    const [exercisecontentactiveBtn, setExerciseContentActiveBtn] = useState("none");
    const [teachercontentactiveBtn, setTeacherContentActiveBtn] = useState("none");
    const [impcontentactiveBtn, setImpContentActiveBtn] = useState("none");
    const [econtentcommentvalue, setEcontentCommentvalue] = useState("");
    const [econtentcomId, setEContentComId] = useState("");
    const [addnewecontentcomment, setAddnewEcontentcomment] = React.useState(false);
    const [econtentcommentBtn, setEContentcommentBtn] = useState("Save");
    const [econtentcommentId, setEContentcommentId] = useState("");
    const [level1Id, setLevel1Id] = useState<string | undefined>("");
    const [contentType1Id, setContentType1Id] = useState<string | undefined>("");
    const [addnewcontentcomment, setAddNewContentComment] = React.useState(false);
    const [contentcommentId, setContentcommentId] = useState("");
    const [contentcommentBtn, setContentcommentBtn] = useState("Save");
    const [contentcommentvalue, setContentCommentvalue] = useState("");
    const [ecleveltype, setEClevelType] = useState("");
    const [cmtdislikeCount, setcmtDislikeCount] = useState(0);
    const [cmtlikeCount, setcmtLikeCount] = useState(0);
    const [cmtlikeactiveBtn, setcmtlikeActiveBtn] = useState("none");
    const [contentTypeName, setContentTypeName] = useState("");

    const [econtentcomment, setEcontentcomment] = useState<IEContentComment>({
        econtentcomments: [] as IDashboard[]
    })
    const [econtentcommentlevel1, setEcontentcommentlevel1] = useState<IEContentCommentLevel1>({
        econtentcommentslevels1: [] as IDashboard[]
    })
    const [econtentcommentlevel2, setEcontentcommentlevel2] = useState<IEContentCommentLevel2>({
        econtentcommentslevels2: [] as IDashboard[]
    })
    const [econtentcommentlevel3, setEcontentcommentlevel3] = useState<IEContentCommentLevel3>({
        econtentcommentslevels3: [] as IDashboard[]
    })
    const [econtentcommentlevel4, setEcontentcommentlevel4] = useState<IEContentCommentLevel4>({
        econtentcommentslevels4: [] as IDashboard[]
    })
    const [teacherecontentcommentlevel1, setTeacherEcontentcommentlevel1] = useState<ITeacherEContentCommentLevel1>({
        teacherecontentcommentslevels1: [] as IDashboard[]
    })
    const [exercisecontentcommentlevel1, setExercisecontentcommentlevel1] = useState<IExerciseContentCommentLevel1>({
        exercisecontentcommentslevels1: [] as IDashboard[]
    })
    const [examplecontentcommentlevel1, setExamplecontentcommentlevel1] = useState<IExampleContentCommentLevel1>({
        examplecontentcommentslevels1: [] as IDashboard[]
    })
    const [bookEcontentcommentlevel1, setbookEcontentcommentlevel1] = useState<IBookEContentCommentLevel1>({
        bookEcontentcommentslevels1: [] as IDashboard[]
    })
    const [impPointscontentcommentlevel1, setimpPointscontentcommentlevel1] = useState<IimpPointsContentCommentLevel1>({
        impPointscontentcommentslevels1: [] as IDashboard[]
    })
    const [contentcomments, setcontentcomment] = useState<IContentComment>({
        contentcomment: [] as IDashboard[]
    })
    const [header, setHeader] = useState<IHeader>({
        headers: {} as IDashboard
    })
    const [question, setQuestion] = useState<IQuestion>({
        questions: [] as IDashboard[]
    })
    const [contentType, setContentType] = useState<IContentType>({
        contenttypes: [] as IDashboard[]
    })
    const [contentLevelType, setContentLevelType] = useState<IContentLevelType>({
        contentleveltypes: [] as IDashboard[]
    })
    const [singlequestion, setSingleQuestion] = useState<ISQuestion>({
        singlequestions: {} as IDashboard
    })
    const [userVideoTLines, setUserVideoTLine] = useState<UserActivityTimeLine>({
        userVideoTLine: []
    });
    const [videodetail, setVideoDetails] = useState<IVideo>({
        videodetails: [] as IDashboard[]
    })
    const [econtentfeedback, setEcontentfeedback] = useState<IEcontentFeedback>({
        econtentfeedbacks: [] as IDashboard[]
    })
    const [videofeedback, setvideofeedback] = useState<IVideoFeedback>({
        videofeedbacks: [] as IDashboard[]
    })
    const [aie1feedback, setAie1feedback] = useState<IAie1Feedback>({
        aie1feedbacks: [] as IDashboard[]
    })
    const [videocomment, setvideocomment] = useState<IVideoComment>({
        videocomments: [] as IDashboard[]
    })
    const [videocommentreply, setvideocommentReply] = useState<IVideoCommentReply>({
        videocommentreplies: [] as IDashboard[]
    })
    const [video, setVideo] = useState<IVideoSingle>({
        videos: {} as IDashboard
    })
    const [bookecontent1, setBookecontent1] = useState<IBookEcontentLevel1>({
        bookecontents1: [] as IDashboard[]
    })
    const [teacherecontent1, setTeacherecontent1] = useState<ITeacherEcontentLevel1>({
        teacherecontents1: [] as IDashboard[]
    })
    const [expecontent1, setExpecontent1] = useState<IExpEcontentLevel1>({
        expecontents1: [] as IDashboard[]
    })
    const [exerciseecontent1, setExcerciseecontent1] = useState<IExerciseEcontentLevel1>({
        exerciseecontents1: [] as IDashboard[]
    })
    const [imppointecontent1, setImpppointecontent1] = useState<IImpPointEcontentLevel1>({
        imppointsecontents1: [] as IDashboard[]
    })
    const [aiecontent1, setAiecontent1] = useState<IAIEcontentLevel1>({
        aiecontents1: [] as IDashboard[]
    })
    const [aiecontent2, setAiecontent2] = useState<IAIEcontentLevel2>({
        aiecontents2: [] as IDashboard[]
    })
    const [aiecontent3, setAiecontent3] = useState<IAIEcontentLevel3>({
        aiecontents3: [] as IDashboard[]
    })
    const [aiecontent4, setAiecontent4] = useState<IAIEcontentLevel4>({
        aiecontents4: [] as IDashboard[]
    })
    const [topicSummaryData, setTopicSummaryData] = useState<ITopicSummaryDetails>({
        topicSummaries: {} as IDashboard,
        errorMsg: ''
    })
    const [noteData, setNoteData] = useState<INote>({
        notes: [] as IDashboard[]
    })
    const [videonoteData, setVideoNoteData] = useState<IVideoNote>({
        videonotes: [] as IDashboard[]
    })
    const [value, setValue] = React.useState(0);
    const [timer, setTimer] = useState(0);
    const [isConditionMet, setIsConditionMet] = useState(false);
    const [deletepopup, setDeletepopup] = React.useState(false);
    const [vndeletepopup, setVNDeletepopup] = React.useState(false);
    const [vtlinedeletepopup, setVTlineDeletepopup] = React.useState(false);
    const deletepopupClose = () => setDeletepopup(false);
    const vndeletepopupClose = () => setVNDeletepopup(false);
    const vtlinedeletepopupClose = () => setVTlineDeletepopup(false);
    const [TID, setTID] = useState('');
    const [VCID, setVCID] = useState('');
    const [VID, setVID] = useState('');
    const [tlineId, setTlineId] = useState('');
    const [tlinevId, setTlineVId] = useState('');

    const [deletedatainfo, setDeletedatainfo] = useState<IDashboard | null>(null); 
    const [deletedatalevelt, setDeletedatalevelt] = useState<any>(null);
    const [deleteEContentId, setDeleteEContentId] = useState<any>(null);

    const [delcontentname, setDeleteContentName] = useState<any>(null);
    const [deleteContentLOId, setDeleteContentLOId] = useState<any>(null);
    const [deletecpopup, setECDeletepopup] = React.useState(false);
    const deletecpopupClose = () => setECDeletepopup(false);

    const [deletereplyinfo, setDeletereplyinfo] = useState<ReplyState | null>(null); 
    const [deletereplypopup, setDeletereplypopup] = React.useState(false);
    const deletereplypopupClose = () => setDeletereplypopup(false);

    useEffect(() => {
        const handleMessage = (event: {origin: string; data: any; }) => {
            // const navigate = useNavigate();
            // Check the origin of the message if needed
            if (event.origin === window.location.origin) {
                // Handle the received message
                console.log('Message received from child window:', event.data, window.location.origin, ">>", event.origin);
                // Reload the topic page
                window.location.reload();
                // Do something with the message data
            }
        };
    
        // Listen for messages from child window
        window.addEventListener('message', handleMessage);
    
        // Cleanup function to remove event listener
        return () => {
          window.removeEventListener('message', handleMessage);
        };
      }, []); // Empty dependency array to ensure useEffect runs only once

    useEffect(() => {
        let intervalId: any;
        const handleStopTimer = async () => {
            await clearInterval(intervalId);
            await setTimer(0);
        };
        const handleStartTimer = () => {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        };
        const calculateScreenTime = async () => {
            if (isConditionMet) {
                await handleStartTimer();
            } else {
                await handleStopTimer();
            }
        };
        calculateScreenTime();
        return () => {
            // Cleanup function to clear interval when component unmounts
            clearInterval(intervalId);
        };
    }, [isConditionMet]);

    const handleChange1 = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        handleCounter(newValue)
    };

    const handleCounter = (newValue: number) => {
        //This is code for E-content Stop timer & update user spending time in db
        if (newValue != 1 || localStorage?.getItem("screenTimeTopicId") && location.state.topicId != localStorage?.getItem("screenTimeTopicId")) {
            setTimer(0);
            setIsConditionMet(false);
            if (localStorage?.getItem("screenTimeTopicId") != null && timer > 0) {
                // Convert seconds to minutes and seconds
                const minutes = Math.floor(timer / 60);
                const seconds = timer % 60;
                const body = {
                    "summaryObj": {
                        "user_id": localStorage?.getItem("Tokenuserid"),
                        "db_metadata": 27,
                        "subjectId": localStorage?.getItem("subId"),
                        "chapterId": localStorage?.getItem("chapterId"),
                        "topicId": localStorage?.getItem("topicId"),
                        "videoDuration": 0,
                        "contentDuration": timer
                    },
                    "currActObj": {
                        "user_id": localStorage?.getItem("Tokenuserid"),
                        "db_metadata": 28,
                        "subjectId": localStorage?.getItem("subId"),
                        "chapterId": localStorage?.getItem("chapterId"),
                        "topicId": localStorage?.getItem("topicId"),
                        "contentId": "",
                        "contStatus": 1,
                        "contType": 1,
                        "contLang": "Hindi",
                        "totalDur": timer,
                        "lastWatchTime": 0
                    }
                }
                DashboardService.updateTopicEContentTimer(body)
                    .then(res => {
                        if (res.data.status == 400) {
                            toast.error(res.data.message)
                        }
                        if (res.data.status == 200) {
                            // toast.success('Your Spend time is ' + timer)

                        }
                    }).catch(e =>
                        toast.error(e.message)
                    );
            }
        }
        if (newValue == 1) {
            localStorage.setItem('screenTimeTopicId', location.state.topicId)
            setIsConditionMet(true);
            setTimer(0);
        }
    }

    let act_ype = localStorage.getItem('actorType')
    const [updateInfoforReply, setUpdateInfoforReply] = useState<ReplyState>({
        e_c_id: '',
        reply_id: '',
        content_type_id: '',
        level_id: '',
        contentTypeName: '',
        levelType: ''
    });
    const style1 = {
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
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const [open3, setOpen3] = React.useState(false);
    const [aie1open2, setAie1Open2] = React.useState(false);
    const [aie1open3, setAie1Open3] = React.useState(false);
    const aie1handleClose2 = () => setAie1Open2(false);
    const aie1handleOpen2 = () => setAie1Open2(true);
    const aie1handleClose3 = () => { setAie1Open3(false); };
    const aie1handleOpen3 = () => {
        setAie1Open3(true);
        setAie1Feedbackvalue('');
        setAie1FeedbackRating(0)
    };
    const handleOpen3 = () => {
        setOpen3(true);
        setFeedbackvalue('')
    };
    const econtentcommentedit = (data: IDashboard, econtentId: any, leveltype: any) => {
        setEContentComId("");
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            setAddnewEcontentcomment(true);
            setEContentcommentBtn('Update')
            if (data?.c_text) {
                setEcontentCommentvalue(data?.c_text)
            }
            if (data._id) {
                setEClevelType(leveltype)
                setEContentComId(econtentId)
                setEContentcommentId(data._id)
                setContentTypeId(data.content_type_id)
                setLevelId(data.level_id)
            }
        }
    };

    const contentcommenteditV2 = (data: IDashboard, contentname: any, id: any) => {
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            setAddNewContentComment(true);
            setContentcommentBtn('Update')
            if (data?.c_text) {
                setContentCommentvalue(data?.c_text)
            }
            if (data._id) {
                setEContentComId(id)
                setContentTypeName(contentname)
                setContentcommentId(data._id)
                setContentTypeId(data.content_type_id)
                setLevelId(data.level_id)
            }
        }
    };

    const econtentcommentdeleteconfirm = (data: IDashboard, leveltype: any, econtentId: any) => {
        setDeletedatainfo(data);
        setDeletedatalevelt(leveltype);
        setDeleteEContentId(econtentId);
        setDeletepopup(true);
    };

    const eContentcommentdelete = (data: IDashboard, leveltype: any, econtentId: any) => {
        // console.log("deletedatainfo", deletedatainfo);
        // console.log("deletedatalevelt", deletedatalevelt);
        // console.log("deleteEContentId", deleteEContentId);
        // console.log("data>>", data);
        // console.log("leveltype>>", leveltype);
        // console.log("econtentId", econtentId);
        setDeletepopup(false);
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            const body = {
                "db_metadata": 2,
                "e_c_id": data._id,  // for Delete this id is required
                "content_type_id": data.content_type_id,
                "level_id": data.level_id,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": data.t_id,
                "content_level_object_id": econtentId,
                "langType": 1
            }
            DashboardService.removeEContentComment(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('E-Comment Deleted Successfully')
                        const body2 = {
                            "db_metadata": 2,
                            "t_id": data.t_id,
                            "content_type_id": data.content_type_id,
                            "level_id": data.level_id
                        }
                        DashboardService.getEContentComment(body2)
                            .then(res => {
                                if (res.data.details) {
                                    if (leveltype === "level_1") {
                                        setEcontentcommentlevel1({
                                            ...econtentcommentlevel1, econtentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (leveltype === "level_2") {
                                        setEcontentcommentlevel2({
                                            ...econtentcommentlevel2, econtentcommentslevels2: res.data.details
                                        })
                                    }
                                    if (leveltype === "level_3") {
                                        setEcontentcommentlevel3({
                                            ...econtentcommentlevel3, econtentcommentslevels3: res.data.details
                                        })
                                    }
                                    if (leveltype === "level_4") {
                                        setEcontentcommentlevel4({
                                            ...econtentcommentlevel4, econtentcommentslevels4: res.data.details
                                        })
                                    }
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }
    };

    const contentcommentdeleteconfirmv2 = (data: IDashboard, contentname: any, contentLOId: any) => {
        setDeletedatainfo(data);
        setDeleteContentName(contentname);
        setDeleteContentLOId(contentLOId);
        setECDeletepopup(true);
    };

    const contentcommentdeleteV2 = (data: IDashboard, contentname: any, contentLOId: any) => {
        // console.log("data>>", data);
        // console.log("leveltype>>", contentname);
        // console.log("econtentId", contentLOId);
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            const body = {
                "db_metadata": 2,
                "e_c_id": data._id,  // for Delete this id is required
                "content_type_id": data.content_type_id,
                "level_id": data.level_id,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": data.t_id,
                "content_level_object_id": contentLOId,
                "langType": 1
            }
            DashboardService.removeContentComment(body)
                .then(res => {
                    setECDeletepopup(false);
                    if (res.data.status == 200) {
                        toast.success('Comment Deleted Successfully')
                        const body2 = {
                            "db_metadata": 2,
                            "t_id": data.t_id,
                            "content_type_id": data.content_type_id,
                            "level_id": data.level_id
                        }
                        DashboardService.getContentComment(body2)
                            .then(res => {
                                if (res.data.details) {
                                    const updatedState = {
                                        ...contentcomments,
                                        contentcomment: res.data.details,
                                    };
                                    setcontentcomment(updatedState);
                                    if (contentname === "teacher_e-content") {
                                        setTeacherEcontentcommentlevel1({
                                            ...teacherecontentcommentlevel1, teacherecontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentname === "examples") {
                                        setExamplecontentcommentlevel1({
                                            ...examplecontentcommentlevel1, examplecontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentname === "book_e-content") {
                                        setbookEcontentcommentlevel1({
                                            ...bookEcontentcommentlevel1, bookEcontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentname === "importantpoints") {
                                        setimpPointscontentcommentlevel1({
                                            ...impPointscontentcommentlevel1, impPointscontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentname === "exercise") {
                                        setExercisecontentcommentlevel1({
                                            ...exercisecontentcommentlevel1, exercisecontentcommentslevels1: res.data.details
                                        })
                                    }
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }
    };

    const feedbackedit = (data: IDashboard) => {
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            setOpen3(true);
            setFeedbackBtn('Update')
            if (data.f_text) {
                setFeedbackvalue(data.f_text)
            }
            if (data._id) {
                setFeedbackId(data._id)
            }
            if (data.rat) {
                setFeedbackRating(data.rat)
            }
        }
    };

    const aie1feedbackedit = (data: IDashboard) => {
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            setAie1Open3(true);
            setAie1FeedbackBtn('Update')
            if (data.f_text) {
                setAie1Feedbackvalue(data.f_text)
            }
            if (data.content_type_id) {
                setAie1ContentType(data.content_type_id)
            }
            if (data.level_id) {
                setAie1LevelType(data.level_id)
            }
            if (data.rat) {
                setAie1FeedbackRating(data.rat)
            }
            if (data._id) {
                setAie1FeedbackId(data._id)
            }
        }
    };

    const videocommentedit = (data: IDashboard) => {
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            setAddnewvideocomment(true);
            setVideocommentBtn('Update')
            if (data?.c_text) {
                setVideocommentvalue(data?.c_text)
            }
            if (data._id) {
                setVideocommentId(data._id)
            }
            if (data.v_id) {
                setVideoComId(data.v_id)
            }
        }
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    const handleTimeLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeLine(e.currentTarget.value);
    }

    function timelineSubmit(videoId: any) {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        let userId = localStorage.getItem('Tokenuserid')
        if (timeLineBtn == "Save" && act_ype == "Teacher") {
            const body = {
                "user_id": userId,
                "t_id": topicId,
                "video_id": videoId,
                "name": localStorage.getItem('DisplayName'),
                "time": timeLine
            }
            DashboardService.addTimeLine(body)
                .then(res => {
                    if (res.data.status == 200) {
                        const updatedState = {
                            ...videoAndTLines,
                            videoAndTLine: res.data.data[0],
                        };
                        setVideoAndTLine(updatedState);
                        toast.success("Time Line added Successfully");
                        timelinepopupclose()
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }
        else {
            const body = {
                "db_metadata": 4,
                "user_id": userId,
                "t_id": topicId,
                "video_id": videoId,
                "name": localStorage.getItem('DisplayName'),
                "f_ts": timeLine
            }
            DashboardService.userActivityTimeLine(body)
                .then(res => {
                    if (res.status == 200) {
                        toast.success("User Given Time Line added Successfully");
                        timelinepopupclose()
                        DashboardService.getTimeLine(4, userId, topicId, videoId)// 4 = db_metadata
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...userVideoTLines,
                                        userVideoTLine: res.data.data,
                                    };
                                    setUserVideoTLine(updatedState);
                                } else {
                                    toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }
    }

    const videoTimeLineEdit = (selectedData: any, ids: any) => {
        if (selectedData.user_id == localStorage.getItem('Tokenuserid')) {
            timelinepopup()
            setTimeLine(selectedData?.time);
            setTimeLineId(selectedData?._id)
            setTimeLineBtn("Update");
        }
    };

    const userTimeLineEdit = (selectedData: any) => {
        if (selectedData.user_id == localStorage.getItem('Tokenuserid')) {
            timelinepopup()
            setTimeLine(selectedData?.f_ts);
            setTimeLineId(selectedData?._id)
            setTimeLineBtn("Update");
        }
    };

    function updateTimeLine(videoId: any) {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        let userId = localStorage.getItem('Tokenuserid')
        if (timeLineBtn == "Update" && act_ype == "Teacher") {
            const body = {
                "user_id": userId,
                "t_id": topicId,
                "video_id": videoId,
                "time": timeLine,
                "time_line_id": timeLineId
            }
            DashboardService.updateTimeLine(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success("Time Line Updated Successfully");
                        timelinepopupclose()
                        DashboardService.getVideoAndTL(topicId, videoId, userId)
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...videoAndTLines,
                                        videoAndTLine: res.data.data[0],
                                    };
                                    setVideoAndTLine(updatedState);
                                } else {
                                    toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }
        else {
            const body = {
                "db_metadata": 4,
                "user_id": userId,
                "f_ts": timeLine,
                "time_line_id": timeLineId
            }
            DashboardService.userUpdateTimeLine(body)
                .then(res => {
                    if (res.status == 200) {
                        toast.success("User Given Time Line Updated Successfully");
                        timelinepopupclose()
                        DashboardService.getTimeLine(4, userId, topicId, videoId)// 4 = db_metadata
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...userVideoTLines,
                                        userVideoTLine: res.data.data,
                                    };
                                    setUserVideoTLine(updatedState);
                                } else {
                                    toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }
    }

    function deleteVideoTimeLine() {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        let userId = localStorage.getItem('Tokenuserid')
        if (act_ype == "Teacher") {
            const body = {
                "t_id": topicId,
                "video_id": tlinevId,
                "time_line_id": tlineId
            }
            DashboardService.deleteTimeLine(body)
                .then(res => {
                    if (res.data.status == 200) {
                        setVTlineDeletepopup(false)
                        toast.success("Time Line Deleted Successfully");
                        DashboardService.getVideoAndTL(topicId, tlinevId, userId)
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...videoAndTLines,
                                        videoAndTLine: res.data.data[0],
                                    };
                                    setVideoAndTLine(updatedState);
                                } else {
                                    toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }
        else {
            const body = {
                "db_metadata": 4,
                "user_id": userId,
                "time_line_id": tlineId
            }
            DashboardService.userDeleteTLine(body)
                .then(res => {
                    if (res.data.status == 200) {
                        setVTlineDeletepopup(false)
                        toast.success("Time Line Deleted Successfully");
                        DashboardService.getTimeLine(4, userId, topicId, tlinevId)// 4 = db_metadata
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...userVideoTLines,
                                        userVideoTLine: res.data.data,
                                    };
                                    setUserVideoTLine(updatedState);
                                } else {
                                    toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }
    }

    const feedbackdelete = (data: IDashboard) => {
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            let userId = localStorage.getItem('Tokenuserid')
            let fId = data._id
            let vId = data.v_id
            if (fId) {
                DashboardService.removeActorVideoFeedback(20, userId, fId)
                    .then(res => {
                        if (res.data.status == 200) {
                            toast.success('Feedback Deleted Successfully')
                            setFeedbackBtn('Save');
                            if (location.state.topicId) {
                                topicId = location.state.topicId
                            } else if (location.state.pendingtopics.topic_id) {
                                topicId = location.state.pendingtopics.topic_id
                            } else {
                                topicId = localStorage.getItem('topicId')
                            }
                            if (vId) {
                                DashboardService.getActorVideoFeedback(20, topicId, vId)
                                    .then(res => {
                                        if (res.data.details) {
                                            var newData: any = res.data.details.map((data: any) => {
                                                data.c_ts = data.c_ts.split('T')[0];
                                                return data;
                                            });
                                            setvideofeedback({
                                                ...videofeedback, videofeedbacks: newData
                                            })
                                        } else {
                                        }
                                    })
                                    .catch(e => console.log(e, "e"));
                            }
                        } else {
                            toast.error(res.data.message)
                        }

                    })
                    .catch(e => console.log(e, "e"));
            }
        }
    };

    const aie1feedbackdelete = (data: IDashboard) => {
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            let userId = localStorage.getItem('Tokenuserid')
            let cId = data._id
            if (cId) {
                DashboardService.removeActorEContentFeedback(5, userId, cId)
                    .then(res => {
                        if (res.data.status == 200) {
                            toast.success('Feedback Deleted Successfully')
                            setAie1FeedbackBtn('Save');
                            DashboardService.getActorEContentFeedback(5, topicId, data.content_type_id!, data.level_id!)
                                .then(res => {
                                    if (res.data.details) {
                                        setAie1feedback({
                                            ...aie1feedback, aie1feedbacks: res.data.details
                                        })
                                    }
                                })
                                .catch(e => console.log(e, "e"));
                        } else {
                            toast.error(res.data.message)
                        }

                    })
                    .catch(e => console.log(e, "e"));
            }
        }
    };


    const videocommentdelete = () => {
        let userId = localStorage.getItem('Tokenuserid')
        if (VID && VCID) {
            DashboardService.removeActorVideoComment(1, userId, TID, VID, VCID)
                .then(res => {
                    if (res.data.status == 200) {
                        setDeletepopup(false)
                        toast.success('Comment Deleted Successfully')
                        setVideocommentBtn('Save');
                        const body = {
                            "db_metadata": 1,
                            "v_id": VID,
                            "t_id": topicId
                        }
                        DashboardService.getActorVideoComment(body, 1)
                            .then(res => {
                                if (res.data.details) {
                                    var newData: any = res.data.details.map((data: any) => {
                                        data.c_ts = data.c_ts.split('T')[0];
                                        return data;
                                    });
                                    setvideocomment({
                                        ...videocomment, videocomments: newData
                                    })
                                    setvideocommentReply({
                                        ...videocommentreply, videocommentreplies: newData.reply
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(e => console.log(e, "e"));
        }
    };



    const videocommentreplyedit = (rdata: IDashboard, cdata: IDashboard) => {
        setAddnewvideocommentreply(true)
        if (rdata.val) {
            setVideocommentreplyvalue(rdata.val);
        }
        if (cdata._id) {
            setCId(cdata._id);
        }
        if (rdata._id) {
            setRId(rdata._id);
        }
        if (cdata.v_id) {
            setVId(cdata.v_id);
        }
        if (cdata.t_id) {
            setTId(cdata.t_id);
        }
    };

    const videoReplyEditSubmit = () => {
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }
        const body = {
            "db_metadata": 1,
            "v_c_id": cid,
            "reply_id": rid,
            "val": videocommentreplyvalue
        }
        DashboardService.updateVideoCommentReply(body)
            .then(res => {
                if (res.data.status == 200) {
                    toast.success('Reply Updated Successfully')
                    setAddnewvideocommentreply(false)
                    const body = {
                        "db_metadata": 1,
                        "v_id": vid,
                        "t_id": tid
                    }
                    DashboardService.getActorVideoComment(body, languageType)
                        .then(res => {
                            if (res.data.details) {
                                var newData: any = res.data.details.map((data: any) => {
                                    data.c_ts = data.c_ts.split('T')[0];
                                    return data;
                                });
                                setvideocomment({
                                    ...videocomment, videocomments: newData
                                })
                            }
                        })
                        .catch(e => console.log(e, "e"));
                } else {
                    toast.error(res.data.message)
                }

            })
            .catch(e => console.log(e, "e"));
    };

    const videocommentreplydelete = (rdata: IDashboard, cdata: IDashboard,) => {
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }
        if (rdata.ref_c_user_id == localStorage.getItem('Tokenuserid')) {
            const body = {
                "db_metadata": 1,
                "v_c_id": cdata._id,
                "reply_id": rdata._id
            }
            DashboardService.removeVideoCommentReply(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Reply Deleted Successfully')
                        const body = {
                            "db_metadata": 1,
                            "v_id": cdata.v_id,
                            "t_id": cdata.t_id
                        }
                        DashboardService.getActorVideoComment(body, languageType)
                            .then(res => {
                                if (res.data.details) {
                                    var newData: any = res.data.details.map((data: any) => {
                                        data.c_ts = data.c_ts.split('T')[0];
                                        return data;
                                    });
                                    setvideocomment({
                                        ...videocomment, videocomments: newData
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(e => console.log(e, "e"));
        }
    };

    const feedbackSubmit = () => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else if (location.state.pendingtopics.topic_id) {
            topicId = location.state.pendingtopics.topic_id
        } else {
            topicId = localStorage.getItem('topicId')
        }
        if (feedbackBtn == 'Save') {
            const body = {
                "db_metadata": 20,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": topicId,
                "v_id": videoId,
                "f_text": feedbackvalue,
                "rat": feedbackRating
            }
            DashboardService.actorVideoFeedback(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Feedback Added Successfully')
                        handleClose3();
                        setFeedbackBtn('Save');
                        setFeedbackvalue('');
                        DashboardService.getActorVideoFeedback(20, topicId, videoId)
                            .then(res => {
                                if (res.data.details) {
                                    setvideofeedback({
                                        ...videofeedback, videofeedbacks: res.data.details
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message);
                    }
                })
                .catch(e => console.log(e, "e"));
        } else {
            const body = {
                "v_f_id": feedbackId,
                "db_metadata": 20,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": topicId,
                "v_id": videoId,
                "f_text": feedbackvalue,
                "rat": feedbackRating
            }
            DashboardService.actorVideoFeedback(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Feedback Updated Successfully')
                        handleClose3();
                        setFeedbackBtn('Save')
                        setFeedbackvalue('');
                        DashboardService.getActorVideoFeedback(20, topicId, videoId)
                            .then(res => {
                                if (res.data.details) {
                                    setvideofeedback({
                                        ...videofeedback, videofeedbacks: res.data.details
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }

    };

    const econtentfeedbackSubmit = () => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else if (location.state.pendingtopics.topic_id) {
            topicId = location.state.pendingtopics.topic_id
        } else {
            topicId = localStorage.getItem('topicId')
        }
        if (aie1feedbackBtn == 'Save') {
            const body = {
                "db_metadata": 5,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": topicId,
                "f_text": aie1feedbackvalue,
                "content_type_id": aie1contentType,
                "level_id": aie1levelType,
                "rat": aie1feedbackRating
            }
            DashboardService.actorEContentFeedback(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Feedback Added Successfully')
                        aie1handleClose3();
                        setAie1FeedbackBtn('Save');
                        setAie1Feedbackvalue('');
                        DashboardService.getActorEContentFeedback(5, topicId, aie1contentType!, aie1levelType!)
                            .then(res => {
                                if (res.data.details) {
                                    setAie1feedback({
                                        ...aie1feedback, aie1feedbacks: res.data.details
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message);
                    }


                })
                .catch(err => {
                    toast.error(err.msg);
                });
        } else {
            const body = {
                "c_f_id": aie1feedbackId,

                "db_metadata": 5,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": topicId,
                "f_text": aie1feedbackvalue,
                "content_type_id": aie1contentType,
                "level_id": aie1levelType,
                "rat": aie1feedbackRating
            }
            DashboardService.actorEContentFeedback(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Feedback Updated Successfully')
                        aie1handleClose3();
                        setAie1FeedbackBtn('Save');
                        setAie1Feedbackvalue('');
                        DashboardService.getActorEContentFeedback(5, topicId, aie1contentType!, aie1levelType!)
                            .then(res => {
                                if (res.data.details) {
                                    setAie1feedback({
                                        ...aie1feedback, aie1feedbacks: res.data.details
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }
    };


    const videocommentSubmit = () => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else if (location.state.pendingtopics.topic_id) {
            topicId = location.state.pendingtopics.topic_id
        } else {
            topicId = localStorage.getItem('topicId')
        }
        if (videocommentBtn == 'Save') {
            const body = {
                "db_metadata": 1,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": topicId,
                "v_id": videocomId,
                "c_text": videocommentvalue,
                "new_comment": true  // if adding comment true & for edit it’s false

            }
            DashboardService.addActorVideoComment(body, 1)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Comment Added Successfully')
                        handlevideoCommentclose();
                        setVideocommentBtn('Save');
                        setVideocommentvalue('');
                        const body = {
                            "db_metadata": 1,
                            "v_id": videocomId,
                            "t_id": topicId
                        }
                        DashboardService.getActorVideoComment(body, 1)
                            .then(res => {
                                if (res.data.details) {
                                    var newData: any = res.data.details.map((data: any) => {
                                        data.c_ts = data.c_ts.split('T')[0];
                                        return data;
                                    });
                                    setvideocomment({
                                        ...videocomment, videocomments: newData
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        // toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        } else {
            const body = {
                "db_metadata": 1,
                "v_c_id": videocommentId,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": topicId,
                "v_id": videocomId,
                "c_text": videocommentvalue,
                "new_comment": false  // if adding comment true & for edit it’s false

            }
            DashboardService.addActorVideoComment(body, 1)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Comment Added Successfully')
                        handlevideoCommentclose();
                        setVideocommentBtn('Save');
                        setVideocommentvalue('');
                        const body = {
                            "db_metadata": 1,
                            "v_id": videocomId,
                            "t_id": topicId
                        }
                        DashboardService.getActorVideoComment(body, 1)
                            .then(res => {
                                if (res.data.details) {
                                    var newData: any = res.data.details.map((data: any) => {
                                        data.c_ts = data.c_ts.split('T')[0];
                                        return data;
                                    });
                                    setvideocomment({
                                        ...videocomment, videocomments: newData
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }

    };

    const eContentcommentSubmit = (leveltype: any) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else if (location.state.pendingtopics.topic_id) {
            topicId = location.state.pendingtopics.topic_id
        } else {
            topicId = localStorage.getItem('topicId')
        }
        if (econtentcommentBtn == 'Save') {
            const body = {
                "db_metadata": 2,
                "content_type_id": contentTypeId,
                "level_id": levelId,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": topicId,
                "c_text": econtentcommentvalue,
                "content_level_object_id": econtentcomId,
                "new_comment": true  // if adding comment true & for edit it’s false

            }
            DashboardService.addEContentComment(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('E-Comment Added Successfully')
                        handleEcontentCommentclose();
                        setEContentcommentBtn('Save');
                        setEcontentCommentvalue('');
                        const body = {
                            "db_metadata": 2,
                            "t_id": topicId,
                            "content_type_id": contentTypeId,
                            "level_id": levelId

                        }
                        DashboardService.getEContentComment(body)
                            .then(res => {
                                if (res.data.details) {
                                    if (leveltype === "level_1") {
                                        setEcontentcommentlevel1({
                                            ...econtentcommentlevel1, econtentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (leveltype === "level_2") {
                                        setEcontentcommentlevel2({
                                            ...econtentcommentlevel2, econtentcommentslevels2: res.data.details
                                        })
                                    }
                                    if (leveltype === "level_3") {
                                        setEcontentcommentlevel3({
                                            ...econtentcommentlevel3, econtentcommentslevels3: res.data.details
                                        })
                                    }
                                    if (leveltype === "level_4") {
                                        setEcontentcommentlevel4({
                                            ...econtentcommentlevel4, econtentcommentslevels4: res.data.details
                                        })
                                    }
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        // toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        } else {
            const body = {
                "db_metadata": 2,
                "c_c_id": econtentcommentId,  // for update this id is required
                "content_type_id": contentTypeId,
                "level_id": levelId,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": topicId,
                "c_text": econtentcommentvalue,
                "content_level_object_id": econtentcomId,
                "new_comment": false  // if adding comment true & for edit it’s false

            }
            DashboardService.addEContentComment(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('E-Comment Updated Successfully')
                        handleEcontentCommentclose();
                        setEContentcommentBtn('Save');
                        setEcontentCommentvalue('');
                        const body = {
                            "db_metadata": 2,
                            "t_id": topicId,
                            "content_type_id": contentTypeId,
                            "level_id": levelId
                        }
                        DashboardService.getEContentComment(body)
                            .then(res => {
                                if (res.data.details) {
                                    if (leveltype === "level_1") {
                                        setEcontentcommentlevel1({
                                            ...econtentcommentlevel1, econtentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (leveltype === "level_2") {
                                        setEcontentcommentlevel2({
                                            ...econtentcommentlevel2, econtentcommentslevels2: res.data.details
                                        })
                                    }
                                    if (leveltype === "level_3") {
                                        setEcontentcommentlevel3({
                                            ...econtentcommentlevel3, econtentcommentslevels3: res.data.details
                                        })
                                    }
                                    if (leveltype === "level_4") {
                                        setEcontentcommentlevel4({
                                            ...econtentcommentlevel4, econtentcommentslevels4: res.data.details
                                        })
                                    }
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }

    };

    const contentcommentSubmit = () => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else if (location.state.pendingtopics.topic_id) {
            topicId = location.state.pendingtopics.topic_id
        } else {
            topicId = localStorage.getItem('topicId')
        }
        if (contentcommentBtn == 'Save') {
            const body = {
                "db_metadata": 2,
                "content_type_id": contentTypeId,
                "level_id": levelId,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": topicId,
                "c_text": contentcommentvalue,
                "content_level_object_id": econtentcomId,
                "new_comment": true  // if adding comment true & for edit it’s false

            }
            DashboardService.addContentComment(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Teacher Comment Added Successfully')
                        handlecontentCommentclose();
                        setContentcommentBtn('Save');
                        setContentCommentvalue('');
                        const body = {
                            "db_metadata": 2,
                            "t_id": topicId,
                            "content_type_id": contentTypeId,
                            "level_id": levelId

                        }
                        DashboardService.getContentComment(body)
                            .then(res => {
                                if (res.data.details) {
                                    const updatedState = {
                                        ...contentcomments,
                                        contentcomment: res.data.details,
                                    };
                                    setcontentcomment(updatedState);
                                    if (contentTypeName === "teacher_e-content") {
                                        setTeacherEcontentcommentlevel1({
                                            ...teacherecontentcommentlevel1, teacherecontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentTypeName === "examples") {
                                        setExamplecontentcommentlevel1({
                                            ...examplecontentcommentlevel1, examplecontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentTypeName === "book_e-content") {
                                        setbookEcontentcommentlevel1({
                                            ...bookEcontentcommentlevel1, bookEcontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentTypeName === "importantpoints") {
                                        setimpPointscontentcommentlevel1({
                                            ...impPointscontentcommentlevel1, impPointscontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentTypeName === "exercise") {
                                        setExercisecontentcommentlevel1({
                                            ...exercisecontentcommentlevel1, exercisecontentcommentslevels1: res.data.details
                                        })
                                    }
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        // toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        } else {
            const body = {
                "db_metadata": 2,
                "c_c_id": contentcommentId,  // for update this id is required
                "content_type_id": contentTypeId,
                "level_id": levelId,
                "user_id": localStorage.getItem('Tokenuserid'),
                "t_id": topicId,
                "c_text": contentcommentvalue,
                "content_level_object_id": econtentcomId,
                "new_comment": false  // if adding comment true & for edit it’s false

            }
            DashboardService.addContentComment(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Teacher Comment Updated Successfully')
                        handlecontentCommentclose();
                        setContentcommentBtn('Save');
                        setContentCommentvalue('');
                        const body = {
                            "db_metadata": 2,
                            "t_id": topicId,
                            "content_type_id": contentTypeId,
                            "level_id": levelId
                        }
                        DashboardService.getContentComment(body)
                            .then(res => {
                                if (res.data.details) {
                                    if (contentTypeName === "teacher_e-content") {
                                        setTeacherEcontentcommentlevel1({
                                            ...teacherecontentcommentlevel1, teacherecontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentTypeName === "examples") {
                                        setExamplecontentcommentlevel1({
                                            ...examplecontentcommentlevel1, examplecontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentTypeName === "book_e-content") {
                                        setbookEcontentcommentlevel1({
                                            ...bookEcontentcommentlevel1, bookEcontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentTypeName === "importantpoints") {
                                        setimpPointscontentcommentlevel1({
                                            ...impPointscontentcommentlevel1, impPointscontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentTypeName === "exercise") {
                                        setExercisecontentcommentlevel1({
                                            ...exercisecontentcommentlevel1, exercisecontentcommentslevels1: res.data.details
                                        })
                                    }
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }

    };

    const handleEcontentCommentclose = () => {
        setAddnewEcontentcomment(false)
    }

    const handlecontentCommentclose = () => {
        setAddNewContentComment(false)
    }

    const handleEContentComment = (id: string | undefined, contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId('')
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId('')
            setContentTypeId(findContentType.id)
        }
        setEClevelType('')
        setEClevelType(levelType)
        setEcontentCommentvalue('')
        if (id) {
            setEContentComId(id);
        }
        setAddnewEcontentcomment(true)
    }

    const handleContentComment = (id: string | undefined, contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId('')
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId('')
            setContentTypeId(findContentType.id)
        }
        setEcontentCommentvalue('')
        if (id) {
            setEContentComId(id);
        }
        setContentTypeName(contentType)
        setAddNewContentComment(true)
    }


    const eContentcommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setEcontentCommentvalue(target.value);
    }

    const contentcommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setContentCommentvalue(target.value);
    }

    const ratingChanged = (newRating: any) => {
        setFeedbackRating(newRating)
    };
    const aie1ratingChanged = (newRating: any) => {
        setAie1FeedbackRating(newRating)
    };
    const handlevideoComment = (id: string | undefined) => {
        setVideocommentvalue('')
        if (id) {
            setVideoComId(id);
        }
        setAddnewvideocomment(true)
    }
    const handlevideoCommentclose = () => {
        setAddnewvideocomment(false)
    }
    const handlevideoCommentReplyclose = () => {
        setAddnewvideocommentreply(false)
    }
    const handleDisikeClick = (id: string | undefined, count: any) => {
        setDislikeCount(count)
        if (activeBtn === "none") {
            setDislikeCount(dislikeCount + 1);
            setActiveBtn("dislike");
        }
        if (activeBtn === 'dislike') {
            setDislikeCount(dislikeCount - 1);
            setActiveBtn("none");
        }
        if (activeBtn === "like") {
            setDislikeCount(dislikeCount + 1);
            if (likeCount) {
                setLikeCount(likeCount - 1);
            }
            setActiveBtn("dislike");
        }
        if (id) {
            if (activeBtn === "none") {
                videoLikeDislike(id, 0, 1)
            } else if (activeBtn === "dislike") {
                videoLikeDislike(id, 0, -1)
            }
        }
    };

    const aie1feedbackData = (cType: string, lType: string) => {
        setAie1feedback({
            ...aie1feedback, aie1feedbacks: []
        })
        aie1handleOpen2()
        let findLevel = contentleveltypes.find((x: any) => x.name == lType);
        let findContentType = contenttypes.find((x: any) => x.name == cType);
        if (findContentType) {
            setAie1ContentType(findContentType.id)
        }
        if (findLevel) {
            setAie1LevelType(findLevel.id)
        }
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        if (findLevel && findContentType) {
            DashboardService.getActorEContentFeedback(5, topicId, findContentType.id!, findLevel.id!)
                .then(res => {
                    if (res.data.details) {
                        setAie1feedback({
                            ...aie1feedback, aie1feedbacks: res.data.details
                        })
                    }
                })
                .catch(e => console.log(e, "e"));
        }
    };

    const handleLikeClick = (id: string | undefined, count: any) => {
        setLikeCount(count)
        if (activeBtn === "none") {
            setLikeCount(likeCount + 1);
            setActiveBtn("like");
        }
        if (activeBtn === 'like') {
            setLikeCount(likeCount - 1);
            setActiveBtn("none");
        }
        if (activeBtn === "dislike") {
            setLikeCount(likeCount + 1);
            setDislikeCount(dislikeCount - 1);
            setActiveBtn("like");
        }
        if (id) {
            if (activeBtn === "none") {
                videoLikeDislike(id, 1, 0)
            } else if (activeBtn === "like") {
                videoLikeDislike(id, -1, 0)
            }
        }
    };

    const contentLikeClick = (contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (contentactiveBtn === "none") {
            setContentLikeCount(contentlikeCount + 1);
            setContentActiveBtn("like");
            return;
        }
        if (contentactiveBtn === 'like') {
            setContentLikeCount(contentlikeCount - 1);
            setContentActiveBtn("none");
            return;
        }

        if (contentactiveBtn === "dislike") {
            setContentLikeCount(contentlikeCount + 1);
            setContentDislikeCount(contentdislikeCount - 1);
            setContentActiveBtn("like");
        }
        if (contentTypeId && levelId) {
            if (contentactiveBtn === "none") {
                actorContentLikeDislike(1, 0, contentTypeId, levelId, contentlevelObjectid);
            } else if (contentactiveBtn === "like") {
                actorContentLikeDislike(-1, 0, contentTypeId, levelId, contentlevelObjectid);
            }
        }
    };

    const teachercontentLikeClick = (contentType: string, levelType: string) => {
        if (teachercontentactiveBtn === "none") {
            setTeacherContentLikeCount(teachercontentlikeCount + 1);
            setTeacherContentActiveBtn("like");
        }
        if (teachercontentactiveBtn === 'like') {
            setTeacherContentLikeCount(teachercontentlikeCount - 1);
            setTeacherContentActiveBtn("none");
        }
        if (teachercontentactiveBtn === "dislike") {
            setTeacherContentLikeCount(teachercontentlikeCount + 1);
            setTeacherContentDislikeCount(teachercontentdislikeCount - 1);
            setTeacherContentActiveBtn("like");
        }
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) { setLevelId(findLevel.id) }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) { setContentTypeId(findContentType.id) }
        if (findContentType && findLevel) {
            if (teachercontentactiveBtn === "none" || teachercontentactiveBtn === "dislike") {
                if (teachercontentdislikeCount == 0) {
                    actorContentLikeDislike(1, 0, findContentType.id!, findLevel.id!, teachercontentlevelObjectid);
                } else {
                    actorContentLikeDislike(1, -1, findContentType.id!, findLevel.id!, teachercontentlevelObjectid);
                }
            } else if (teachercontentactiveBtn === "like") {
                if (teachercontentdislikeCount == 0) {
                    actorContentLikeDislike(-1, 0, findContentType.id!, findLevel.id!, teachercontentlevelObjectid);
                }
                else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, teachercontentlevelObjectid);
                }
            }
        }

    };

    const impcontentLikeClick = (contentType: string, levelType: string) => {
        if (impcontentactiveBtn === "none") {
            setImpContentLikeCount(impcontentlikeCount + 1);
            setImpContentActiveBtn("like");
        }
        if (impcontentactiveBtn === 'like') {
            setImpContentLikeCount(impcontentlikeCount - 1);
            setImpContentActiveBtn("none");
        }
        if (impcontentactiveBtn === "dislike") {
            setImpContentLikeCount(impcontentlikeCount + 1);
            setImpContentDislikeCount(impcontentdislikeCount - 1);
            setImpContentActiveBtn("like");
        }
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) { setLevelId(findLevel.id) }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) { setContentTypeId(findContentType.id) }
        if (findContentType && findLevel) {
            if (impcontentactiveBtn === "none" || impcontentactiveBtn === "dislike") {
                if (impcontentdislikeCount == 0) {
                    actorContentLikeDislike(1, 0, findContentType.id!, findLevel.id!, impcontentlevelObjectid);
                } else {
                    actorContentLikeDislike(1, -1, findContentType.id!, findLevel.id!, impcontentlevelObjectid);
                }
            } else if (impcontentactiveBtn === "like") {
                if (impcontentdislikeCount == 0) {
                    actorContentLikeDislike(-1, 0, findContentType.id!, findLevel.id!, impcontentlevelObjectid);
                }
                else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, impcontentlevelObjectid);
                }
            }
        }
    };

    const expcontentLikeClick = (contentType: string, levelType: string) => {
        if (expcontentactiveBtn === "none") {
            setExpContentLikeCount(expcontentlikeCount + 1);
            setExpContentActiveBtn("like");
        }
        if (expcontentactiveBtn === 'like') {
            setExpContentLikeCount(expcontentlikeCount - 1);
            setExpContentActiveBtn("none");
        }
        if (expcontentactiveBtn === "dislike") {
            setExpContentLikeCount(expcontentlikeCount + 1);
            setExpContentDislikeCount(expcontentdislikeCount - 1);
            setExpContentActiveBtn("like");
        }
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) { setLevelId(findLevel.id) }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) { setContentTypeId(findContentType.id) }
        if (findContentType && findLevel) {
            if (expcontentactiveBtn === "none" || expcontentactiveBtn === "dislike") {
                if (expcontentdislikeCount == 0) {
                    actorContentLikeDislike(1, 0, findContentType.id!, findLevel.id!, expcontentlevelObjectid);
                } else {
                    actorContentLikeDislike(1, -1, findContentType.id!, findLevel.id!, expcontentlevelObjectid);
                }
            } else if (expcontentactiveBtn === "like") {
                if (expcontentdislikeCount == 0) {
                    actorContentLikeDislike(-1, 0, findContentType.id!, findLevel.id!, expcontentlevelObjectid);
                }
                else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, expcontentlevelObjectid);
                }
            }
        }
    };

    const exercisecontentLikeClick = (contentType: string, levelType: string) => {
        if (exercisecontentactiveBtn === "none") {
            setExerciseContentLikeCount(exercisecontentlikeCount + 1);
            setExerciseContentActiveBtn("like");
        }
        if (exercisecontentactiveBtn === 'like') {
            setExerciseContentLikeCount(exercisecontentlikeCount - 1);
            setExerciseContentActiveBtn("none");
        }
        if (exercisecontentactiveBtn === "dislike") {
            setExerciseContentLikeCount(exercisecontentlikeCount + 1);
            setExerciseContentDislikeCount(exercisecontentdislikeCount - 1);
            setExerciseContentActiveBtn("like");
        }
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (findContentType && findLevel) {
            if (exercisecontentactiveBtn === "none" || exercisecontentactiveBtn === "dislike") {
                if (exercisecontentdislikeCount == 0) {
                    actorContentLikeDislike(1, 0, findContentType.id!, findLevel.id!, exercisecontentlevelObjectid);
                } else {
                    actorContentLikeDislike(1, -1, findContentType.id!, findLevel.id!, exercisecontentlevelObjectid);
                }
            } else if (exercisecontentactiveBtn === "like") {
                if (exercisecontentdislikeCount == 0) {
                    actorContentLikeDislike(-1, 0, findContentType.id!, findLevel.id!, exercisecontentlevelObjectid);
                }
                else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, exercisecontentlevelObjectid);
                }
            }
        }
    };

    const aie1contentLikeClick = (contentType: string, levelType: string) => {
        if (aie1contentactiveBtn === "none") {
            setAie1ContentLikeCount(aie1contentlikeCount + 1);
            setAie1ContentActiveBtn("like");
        }
        if (aie1contentactiveBtn === 'like') {
            setAie1ContentLikeCount(aie1contentlikeCount - 1);
            setAie1ContentActiveBtn("none");
        }
        if (aie1contentactiveBtn === "dislike") {
            setAie1ContentLikeCount(aie1contentlikeCount + 1);
            setAie1ContentDislikeCount(aie1contentdislikeCount - 1);
            setAie1ContentActiveBtn("like");
        }
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }

        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (findContentType && findLevel) {
            if (aie1contentactiveBtn === "none" || aie1contentactiveBtn === "dislike") {
                if (aie1contentdislikeCount == 0) {
                    actorContentLikeDislike(1, 0, findContentType.id!, findLevel.id!, aie1contentlevelObjectid);
                } else {
                    actorContentLikeDislike(1, -1, findContentType.id!, findLevel.id!, aie1contentlevelObjectid);
                }
            } else if (aie1contentactiveBtn === "like") {
                if (aie1contentdislikeCount == 0) {
                    actorContentLikeDislike(-1, 0, findContentType.id!, findLevel.id!, aie1contentlevelObjectid);
                }
                else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, aie1contentlevelObjectid);
                }
            }
        }

    };
    const aie2contentLikeClick = (contentType: string, levelType: string) => {
        if (aie2contentactiveBtn === "none") {
            setAie2ContentLikeCount(aie2contentlikeCount + 1);
            setAie2ContentActiveBtn("like");
        }
        if (aie2contentactiveBtn === 'like') {
            setAie2ContentLikeCount(aie2contentlikeCount - 1);
            setAie2ContentActiveBtn("none");
        }
        if (aie2contentactiveBtn === "dislike") {
            setAie2ContentLikeCount(aie2contentlikeCount + 1);
            setAie2ContentDislikeCount(aie2contentdislikeCount - 1);
            setAie2ContentActiveBtn("like");
        }
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (findContentType && findLevel) {
            if (aie2contentactiveBtn === "none" || aie2contentactiveBtn === "dislike") {
                if (aie2contentdislikeCount == 0) {
                    actorContentLikeDislike(1, 0, findContentType.id!, findLevel.id!, aie2contentlevelObjectid);
                } else {
                    actorContentLikeDislike(1, -1, findContentType.id!, findLevel.id!, aie2contentlevelObjectid);
                }
            } else if (aie2contentactiveBtn === "like") {
                if (aie2contentdislikeCount == 0) {
                    actorContentLikeDislike(-1, 0, findContentType.id!, findLevel.id!, aie2contentlevelObjectid);
                }
                else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, aie2contentlevelObjectid);
                }
            }
        }
    };
    const aie3contentLikeClick = (contentType: string, levelType: string) => {
        if (aie3contentactiveBtn === "none") {
            setAie3ContentLikeCount(aie3contentlikeCount + 1);
            setAie3ContentActiveBtn("like");
        }
        if (aie3contentactiveBtn === 'like') {
            setAie3ContentLikeCount(aie3contentlikeCount - 1);
            setAie3ContentActiveBtn("none");
        }
        if (aie3contentactiveBtn === "dislike") {
            setAie3ContentLikeCount(aie3contentlikeCount + 1);
            setAie3ContentDislikeCount(aie3contentdislikeCount - 1);
            setAie3ContentActiveBtn("like");
        }
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (findContentType && findLevel) {
            if (aie3contentactiveBtn === "none" || aie3contentactiveBtn === "dislike") {
                if (aie3contentdislikeCount == 0) {
                    actorContentLikeDislike(1, 0, findContentType.id!, findLevel.id!, aie3contentlevelObjectid);
                } else {
                    actorContentLikeDislike(1, -1, findContentType.id!, findLevel.id!, aie3contentlevelObjectid);
                }
            } else if (aie3contentactiveBtn === "like") {
                if (aie3contentdislikeCount == 0) {
                    actorContentLikeDislike(-1, 0, findContentType.id!, findLevel.id!, aie3contentlevelObjectid);
                }
                else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, aie3contentlevelObjectid);
                }
            }
        }
    };

    const aie4contentLikeClick = (contentType: string, levelType: string) => {
        if (aie4contentactiveBtn === "none") {
            setAie4ContentLikeCount(aie4contentlikeCount + 1);
            setAie4ContentActiveBtn("like");
        }
        if (aie4contentactiveBtn === 'like') {
            setAie4ContentLikeCount(aie4contentlikeCount - 1);
            setAie4ContentActiveBtn("none");
        }
        if (aie4contentactiveBtn === "dislike") {
            setAie4ContentLikeCount(aie4contentlikeCount + 1);
            setAie4ContentDislikeCount(aie4contentdislikeCount - 1);
            setAie4ContentActiveBtn("like");
        }
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (findContentType && findLevel) {
            if (aie4contentactiveBtn === "none" || aie4contentactiveBtn === "dislike") {
                if (aie4contentdislikeCount == 0) {
                    actorContentLikeDislike(1, 0, findContentType.id!, findLevel.id!, aie4contentlevelObjectid);
                } else {
                    actorContentLikeDislike(1, -1, findContentType.id!, findLevel.id!, aie4contentlevelObjectid);
                }
            } else if (aie4contentactiveBtn === "like") {
                if (aie4contentdislikeCount == 0) {
                    actorContentLikeDislike(-1, 0, findContentType.id!, findLevel.id!, aie4contentlevelObjectid);
                }
                else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, aie4contentlevelObjectid);
                }
            }
        }
    };


    const contentDisikeClick = (contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (contentactiveBtn === "none") {
            setContentDislikeCount(contentdislikeCount + 1);
            setContentActiveBtn("dislike");
            return;
        }
        if (contentactiveBtn === 'dislike') {
            setContentDislikeCount(contentdislikeCount - 1);
            setContentActiveBtn("none");
            return;
        }
        if (contentactiveBtn === "like") {
            setContentDislikeCount(contentdislikeCount + 1);
            setContentLikeCount(contentlikeCount - 1);
            setContentActiveBtn("dislike");
        }
        if (contentTypeId && levelId) {
            if (contentactiveBtn === "none") {
                actorContentLikeDislike(0, 1, contentTypeId, levelId, aie1contentlevelObjectid);
            } else if (contentactiveBtn === "dislike") {
                actorContentLikeDislike(0, -1, contentTypeId, levelId, aie1contentlevelObjectid);
            }
        }
    };

    const teachercontentDisikeClick = (contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (teachercontentactiveBtn === "none") {
            setTeacherContentDislikeCount(expcontentdislikeCount + 1);
            setTeacherContentActiveBtn("dislike");
        }
        if (teachercontentactiveBtn === 'dislike') {
            setTeacherContentDislikeCount(expcontentdislikeCount - 1);
            setTeacherContentActiveBtn("none");
        }
        if (teachercontentactiveBtn === "like") {
            setTeacherContentDislikeCount(expcontentdislikeCount + 1);
            setTeacherContentLikeCount(expcontentlikeCount - 1);
            setTeacherContentActiveBtn("dislike");
        }
        if (findContentType && findLevel) {
            if (teachercontentactiveBtn === "none" || aie1contentactiveBtn === "like") {
                if (teachercontentlikeCount == 0) {
                    actorContentLikeDislike(0, 1, findContentType.id!, findLevel.id!, teachercontentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, 1, findContentType.id!, findLevel.id!, teachercontentlevelObjectid);
                }
            } else if (teachercontentactiveBtn === "dislike") {
                if (teachercontentlikeCount == 0) {
                    actorContentLikeDislike(0, -1, findContentType.id!, findLevel.id!, teachercontentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, teachercontentlevelObjectid);
                }
            }
        }
    };

    const impcontentDisikeClick = (contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (impcontentactiveBtn === "none") {
            setImpContentDislikeCount(impcontentdislikeCount + 1);
            setImpContentActiveBtn("dislike");
        }
        if (impcontentactiveBtn === 'dislike') {
            setImpContentDislikeCount(impcontentdislikeCount - 1);
            setImpContentActiveBtn("none");
        }

        if (impcontentactiveBtn === "like") {
            setImpContentDislikeCount(impcontentdislikeCount + 1);
            setImpContentLikeCount(impcontentlikeCount - 1);
            setImpContentActiveBtn("dislike");
        }
        if (findContentType && findLevel) {
            if (impcontentactiveBtn === "none" || impcontentactiveBtn === "like") {
                if (impcontentlikeCount == 0) {
                    actorContentLikeDislike(0, 1, findContentType.id!, findLevel.id!, impcontentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, 1, findContentType.id!, findLevel.id!, impcontentlevelObjectid);
                }
            } else if (impcontentactiveBtn === "dislike") {
                if (impcontentlikeCount == 0) {
                    actorContentLikeDislike(0, -1, findContentType.id!, findLevel.id!, impcontentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, impcontentlevelObjectid);
                }
            }
        }
    };

    const expcontentDisikeClick = (contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (expcontentactiveBtn === "none") {
            setExpContentDislikeCount(expcontentdislikeCount + 1);
            setExpContentActiveBtn("dislike");
        }
        if (expcontentactiveBtn === 'dislike') {
            setExpContentDislikeCount(expcontentdislikeCount - 1);
            setExpContentActiveBtn("none");
        }
        if (expcontentactiveBtn === "like") {
            setExpContentDislikeCount(expcontentdislikeCount + 1);
            setExpContentLikeCount(expcontentlikeCount - 1);
            setExpContentActiveBtn("dislike");
        }
        if (findContentType && findLevel) {
            if (expcontentactiveBtn === "none" || expcontentactiveBtn === "like") {
                if (expcontentlikeCount == 0) {
                    actorContentLikeDislike(0, 1, findContentType.id!, findLevel.id!, expcontentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, 1, findContentType.id!, findLevel.id!, expcontentlevelObjectid);
                }
            } else if (expcontentactiveBtn === "dislike") {
                if (expcontentlikeCount == 0) {
                    actorContentLikeDislike(0, -1, findContentType.id!, findLevel.id!, expcontentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, expcontentlevelObjectid);
                }
            }
        }
    };


    const exercisecontentDisikeClick = (contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (exercisecontentactiveBtn === "none") {
            setExerciseContentDislikeCount(exercisecontentdislikeCount + 1);
            setExerciseContentActiveBtn("dislike");
        }
        if (exercisecontentactiveBtn === 'dislike') {
            setExerciseContentDislikeCount(exercisecontentdislikeCount - 1);
            setExerciseContentActiveBtn("none");
        }
        if (exercisecontentactiveBtn === "like") {
            setExerciseContentDislikeCount(exercisecontentdislikeCount + 1);
            setExerciseContentLikeCount(exercisecontentlikeCount - 1);
            setExerciseContentActiveBtn("dislike");
        }
        if (findContentType && findLevel) {
            if (exercisecontentactiveBtn === "none" || exercisecontentactiveBtn === "like") {
                if (exercisecontentlikeCount == 0) {
                    actorContentLikeDislike(0, 1, findContentType.id!, findLevel.id!, exercisecontentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, 1, findContentType.id!, findLevel.id!, exercisecontentlevelObjectid);
                }
            } else if (exercisecontentactiveBtn === "dislike") {
                if (exercisecontentlikeCount == 0) {
                    actorContentLikeDislike(0, -1, findContentType.id!, findLevel.id!, exercisecontentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, exercisecontentlevelObjectid);
                }
            }
        }
    };

    const aie1contentDisikeClick = (contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (aie1contentactiveBtn === "none") {
            setAie1ContentDislikeCount(aie1contentdislikeCount + 1);
            setAie1ContentActiveBtn("dislike");
        }
        if (aie1contentactiveBtn === 'dislike') {
            setAie1ContentDislikeCount(aie1contentdislikeCount - 1);
            setAie1ContentActiveBtn("none");
        }
        if (aie1contentactiveBtn === "like") {
            setAie1ContentDislikeCount(aie1contentdislikeCount + 1);
            setAie1ContentLikeCount(aie1contentlikeCount - 1);
            setAie1ContentActiveBtn("dislike");
        }
        if (findContentType && findLevel) {
            if (aie1contentactiveBtn === "none" || aie1contentactiveBtn === "like") {
                if (aie1contentlikeCount == 0) {
                    actorContentLikeDislike(0, 1, findContentType.id!, findLevel.id!, aie1contentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, 1, findContentType.id!, findLevel.id!, aie1contentlevelObjectid);
                }
            } else if (aie1contentactiveBtn === "dislike") {
                if (aie1contentlikeCount == 0) {
                    actorContentLikeDislike(0, -1, findContentType.id!, findLevel.id!, aie1contentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, aie1contentlevelObjectid);
                }
            }
        }
    };

    const aie2contentDisikeClick = (contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (aie2contentactiveBtn === "none") {
            setAie2ContentDislikeCount(aie2contentdislikeCount + 1);
            setAie2ContentActiveBtn("dislike");
        }
        if (aie2contentactiveBtn === 'dislike') {
            setAie2ContentDislikeCount(aie2contentdislikeCount - 1);
            setAie2ContentActiveBtn("none");
        }
        if (aie2contentactiveBtn === "like") {
            setAie2ContentDislikeCount(aie2contentdislikeCount + 1);
            setAie2ContentLikeCount(aie2contentlikeCount - 1);
            setAie2ContentActiveBtn("dislike");
        }
        if (findContentType && findLevel) {
            if (aie2contentactiveBtn === "none" || aie2contentactiveBtn === "like") {
                if (aie2contentlikeCount == 0) {
                    actorContentLikeDislike(0, 1, findContentType.id!, findLevel.id!, aie2contentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, 1, findContentType.id!, findLevel.id!, aie2contentlevelObjectid);
                }
            } else if (aie2contentactiveBtn === "dislike") {
                if (aie2contentlikeCount == 0) {
                    actorContentLikeDislike(0, -1, findContentType.id!, findLevel.id!, aie2contentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, aie2contentlevelObjectid);
                }
            }
        }
    };
    const aie3contentDisikeClick = (contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (aie3contentactiveBtn === "none") {
            setAie3ContentDislikeCount(aie3contentdislikeCount + 1);
            setAie3ContentActiveBtn("dislike");
        }
        if (aie3contentactiveBtn === 'dislike') {
            setAie3ContentDislikeCount(aie3contentdislikeCount - 1);
            setAie3ContentActiveBtn("none");
        }
        if (aie3contentactiveBtn === "like") {
            setAie3ContentDislikeCount(aie3contentdislikeCount + 1);
            setAie3ContentLikeCount(aie3contentlikeCount - 1);
            setAie3ContentActiveBtn("dislike");
        }
        if (findContentType && findLevel) {
            if (aie3contentactiveBtn === "none" || aie3contentactiveBtn === "like") {
                if (aie3contentlikeCount == 0) {
                    actorContentLikeDislike(0, 1, findContentType.id!, findLevel.id!, aie3contentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, 1, findContentType.id!, findLevel.id!, aie3contentlevelObjectid);
                }
            } else if (aie3contentactiveBtn === "dislike") {
                if (aie3contentlikeCount == 0) {
                    actorContentLikeDislike(0, -1, findContentType.id!, findLevel.id!, aie3contentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, aie3contentlevelObjectid);
                }
            }
        }
    };
    const aie4contentDisikeClick = (contentType: string, levelType: string) => {
        let findLevel = contentleveltypes.find((x: any) => x.name == levelType);
        if (findLevel) {
            setLevelId(findLevel.id)
        }
        let findContentType = contenttypes.find((x: any) => x.name == contentType);
        if (findContentType) {
            setContentTypeId(findContentType.id)
        }
        if (aie4contentactiveBtn === "none") {
            setAie4ContentDislikeCount(aie4contentdislikeCount + 1);
            setAie4ContentActiveBtn("dislike");
        }
        if (aie4contentactiveBtn === 'dislike') {
            setAie4ContentDislikeCount(aie4contentdislikeCount - 1);
            setAie4ContentActiveBtn("none");
        }
        if (aie4contentactiveBtn === "like") {
            setAie4ContentDislikeCount(aie4contentdislikeCount + 1);
            setAie4ContentLikeCount(aie4contentlikeCount - 1);
            setAie4ContentActiveBtn("dislike");
        }
        if (findContentType && findLevel) {
            if (aie4contentactiveBtn === "none" || aie4contentactiveBtn === "like") {
                if (aie4contentlikeCount == 0) {
                    actorContentLikeDislike(0, 1, findContentType.id!, findLevel.id!, aie4contentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, 1, findContentType.id!, findLevel.id!, aie4contentlevelObjectid);
                }
            } else if (aie4contentactiveBtn === "dislike") {
                if (aie4contentlikeCount == 0) {
                    actorContentLikeDislike(0, -1, findContentType.id!, findLevel.id!, aie4contentlevelObjectid);
                } else {
                    actorContentLikeDislike(-1, -1, findContentType.id!, findLevel.id!, aie4contentlevelObjectid);
                }
            }
        }
    };

    function videoLikeDislike(videoId: string | undefined, likecount: number, dislikecount: number) {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else if (location.state.pendingtopics.topic_id) {
            topicId = location.state.pendingtopics.topic_id
        } else {
            topicId = localStorage.getItem('topicId')
        }
        const body = {
            "db_metadata": 19,
            "user_id": localStorage.getItem('Tokenuserid'),
            "t_id": topicId,
            "like": likecount,  //1=like, -1=unSelect like, 0 = no Activity
            "dislike": dislikecount,//1=dislike, -1=unSelect Dis like, 0 = no Activity
            "video_id": videoId
        }
        DashboardService.videoLikeDislike(body)
            .then(res => {
                DashboardService.getVideoContent(topicId, 1)
                    .then(res => {
                        if (res.data.data.length) {
                            setVideo({
                                ...video, videos: res.data.data[0].data[0]
                            })
                        } else {
                            // toast.error(res.data.message)
                        }
                    })
                    .catch(e => console.log(e, "e"));
            })
            .catch(err => {
                // toast.error(err.msg);
            });
    }

    function actorContentLikeDislike(likecount: number, dislikecount: number, contentTypeID: string, levelID: string, contentLevelObjId: string) {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        const body = {
            "db_metadata": 3,
            "user_id": localStorage.getItem('Tokenuserid'),
            "t_id": topicId,
            "like": likecount,  //1=like, -1=unSelect like, 0 = no Activity
            "dislike": dislikecount,//1=dislike, -1=unSelect Dis like, 0 = no Activity
            "content_type_id": contentTypeID, //id from look up master
            "level_id": levelID,//id from look up master
            "content_level_object_id": contentLevelObjId
        }
        DashboardService.actorContentLikeDislike(body)
            .then(res => {
            })
            .catch(err => {
                // toast.error(err.msg);
            });
    }


    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote(e.currentTarget.value);
    }

    const videoFeedBack = (Id: string | undefined) => {
        handleOpen2();
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        if (Id) {
            setVideoId(Id)
            DashboardService.getActorVideoFeedback(20, topicId, Id)
                .then(res => {
                    if (res.data.details) {
                        var newData: any = res.data.details.map((data: any) => {
                            data.c_ts = data.c_ts.split('T')[0];
                            return data;
                        });
                        setvideofeedback({
                            ...videofeedback, videofeedbacks: newData
                        })
                    }
                })
                .catch(e => console.log(e, "e"));
        }

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

    const { videofeedbacks } = videofeedback;
    const { aie1feedbacks } = aie1feedback;

    function noteSubmit() {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        let userId = localStorage.getItem('Tokenuserid')
        if (noteBtn == "Save") {
            const body = {
                "user_id": userId,
                "db_metadata": 6,
                "t_id": topicId,
                "n_text": note,
            }
            DashboardService.actorContentNote(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success("Note added Successfully");
                        setShowhide(false)
                        DashboardService.getActorContentNote(6, userId, topicId)
                            .then(res => {
                                if (res.data.status == 200) {
                                    setNoteData({
                                        ...noteData, notes: res.data.data
                                    })
                                } else {
                                    // toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    // toast.error(err.msg);
                });
        } else {
            const body = {
                "noteId": noteId,
                "user_id": userId,
                "db_metadata": 6,
                "t_id": topicId,
                "n_text": note,

            }
            DashboardService.actorContentNote(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success("Note Updated Successfully");
                        setShowhide(false)
                        DashboardService.getActorContentNote(6, userId, topicId)
                            .then(res => {
                                if (res.data.status == 200) {
                                    setNoteData({
                                        ...noteData, notes: res.data.data
                                    })
                                } else {
                                    // toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    // toast.error(err.msg);
                });
        }

    }

    function showMore() {
        setShowMore(true)
    }

    function showLess() {
        setShowMore(false)
    }

    function previous() {
        if (state === 0) {
            return; // should not go back after first question
        }
        setState(state - 1)
    };

    function next(savedata: any) {
        let findData = savedata.options.find((el: any) => el.isChecked == true);
        let newDataVal = questions.map((data: any, j: number) => {
            if (findData) {
                let findData1 = data.options.find((x: any) => x._id == findData._id);
                if (findData == findData1) {
                    data.isChecked = true
                } else {
                    data.isChecked = false
                }
            } else {
                data.isChecked = false
            }
            return data;
        });
        setQuestion({
            ...question, questions: newDataVal
        })
        if (state === questions.length - 1) {
            return; // should not go forward after last question
        }
        setState(state + 1)
    }

    useEffect(() => {
        if (location.state?.categoryId && location.state?.gradeId && location.state?.subId) {
            DashboardService.getCurriculumSubjectDetailsV2(location.state.categoryId, location.state.gradeId, localStorage.getItem("subId"), localStorage.getItem("Tokenuserid"))
                .then(res => {
                    if (res.data.data) {
                        setTopicSummaryData({
                            ...topicSummaryData, topicSummaries: res.data.data
                        })
                        setHeader({
                            ...header, headers: res.data.data.t_header
                        })
                    } else {
                        // toast.error(res.data.message)
                    }
                })
                .catch(e => console.log(e, "e"));
        }

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])


    useEffect(() => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        let userId = localStorage.getItem('Tokenuserid')
        DashboardService.getActorContentNote(6, userId, topicId)
            .then(res => {
                if (res.data.data) {
                    var newData: any = res.data.data.map((data: any) => {
                        if (data.c_ts) {
                            data.c_ts = data.c_ts.split('T')[0];
                        }
                        return data;
                    });
                    setNoteData({
                        ...noteData, notes: newData
                    })
                } else {
                    // toast.error(res.data.message)
                }

            })
            .catch(e => console.log(e, "e"));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])


    useEffect(() => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        let userId = localStorage.getItem('Tokenuserid')
        DashboardService.getActorVideoNote(21, userId, topicId)
            .then(res => {
                if (res.data.data) {
                    var newData: any = res.data.data.map((data: any) => {
                        if (data.c_ts) {
                            data.c_ts = new Date(data?.c_ts).toLocaleDateString()?.split(',')[0]
                        }
                        return data;
                    });
                    setVideoNoteData({
                        ...videonoteData, videonotes: newData
                    })
                } else {
                    // toast.error(res.data.message)
                }

            })
            .catch(e => console.log(e, "e"));

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { headers } = header;
    const { videonotes } = videonoteData;
    const { contentleveltypes } = contentLevelType;
    const { contenttypes } = contentType;
    const { notes } = noteData;
    const { topicSummaries, errorMsg } = topicSummaryData;

    const videoAddNote = () => {
        setVideoShowhide(true);
        setVideoNoteBtn('Save');
        setVideoNote('')
    }

    const handleVideoNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVideoNote(e.currentTarget.value);
    }

    const videoCancel = () => {
        setVideoShowhide(false);
    }

    function videoNoteSubmit() {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        let userId = localStorage.getItem('Tokenuserid')
        if (videonoteBtn == "Save") {
            const body = {
                "user_id": userId,
                "db_metadata": 21,
                "t_id": topicId,
                "n_text": videonote,

            }
            DashboardService.addActorVideoNote(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success("Note added Successfully");
                        setVideoShowhide(false)
                        DashboardService.getActorVideoNote(21, userId, topicId)
                            .then(res => {
                                if (res.data.status == 200) {
                                    setVideoNoteData({
                                        ...videonoteData, videonotes: res.data.data
                                    })
                                } else {
                                    // toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    // toast.error(err.msg);
                });
        } else {
            const body = {
                "noteId": videonoteId,
                "user_id": userId,
                "db_metadata": 21,
                "t_id": topicId,
                "n_text": videonote,

            }
            DashboardService.addActorVideoNote(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success("Note Updated Successfully");
                        setVideoShowhide(false)
                        DashboardService.getActorContentNote(21, userId, topicId)
                            .then(res => {
                                if (res.data.status == 200) {
                                    setVideoNoteData({
                                        ...videonoteData, videonotes: res.data.data
                                    })
                                } else {
                                    // toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message);
                    }
                })
                .catch(err => {
                    // toast.error(err.msg);
                });
        }

    }

    const videoNoteedit = (data: IDashboard, i: number) => {
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            setVideoShowhide(true)
            setVideoNoteBtn("Update");
            if (data._id) {
                setVideoNoteId(data._id)
            }
            if (data.n_text) {
                setVideoNote(data.n_text)
            }
        }
    };

    const videoNotedelete = () => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        let noteId = vnoteId
        let userId = localStorage.getItem('Tokenuserid')
        if (noteId) {
            DashboardService.deleteActorVideoNote(21, userId, topicId, noteId)
                .then(res => {
                    if (res.data.data) {
                        setVNDeletepopup(false)
                        toast.success(res.data.message);
                        DashboardService.getActorVideoNote(21, userId, topicId)
                            .then(res => {
                                if (res.data.status == 200) {
                                    setVideoNoteData({
                                        ...videonoteData, videonotes: res.data.data
                                    })
                                } else {
                                    // toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(e => console.log(e, "e"));
        }
    };



    const feedBackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setFeedbackvalue(target.value);
    }
    const aie1feedBackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setAie1Feedbackvalue(target.value);
    }
    const videocommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setVideocommentvalue(target.value);
    }

    const videocommentReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setVideocommentreplyvalue(target.value);
    }

    const getLanguagebookContent = (langType: number) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        DashboardService.getbookEContentLevel1(topicId, langType)
            .then(res => {
                if (res.data.data[0]) {
                    setBookecontent1({
                        ...bookecontent1, bookecontents1: res.data.data[0].data
                    })
                    setContentLikeCount(res.data.data[0]?.data[0].ttl_cnt.like)
                    setContentDislikeCount(res.data.data[0]?.data[0].ttl_cnt.dlike)
                    setContentlevelObjectid(res.data.data[0]?.data[0]._id)

                    let findLevel = contentleveltypes.find((x: any) => x.name == "level_1");
                    let lvlId;
                    let contenttypId;
                    if (findLevel) {
                        lvlId = findLevel.id;
                        setLevel1Id(findLevel.id)
                    }

                    let findContentType = contenttypes.find((x: any) => x.name == "exercise");
                    if (findContentType) {
                        contenttypId = findContentType.id
                        setContentType1Id(findContentType.id)
                    }
                    const body2 = {
                        "db_metadata": 2,
                        "t_id": topicId,
                        "content_type_id": contenttypId,
                        "level_id": lvlId
                    }
                    DashboardService.getContentComment(body2)
                        .then(res => {
                            if (res.data.details) {
                                setbookEcontentcommentlevel1({
                                    ...bookEcontentcommentlevel1, bookEcontentcommentslevels1: res.data.details
                                })
                            }
                        })

                    if (res.data.data[0].data[0]?.ttl_cnt.like) {
                        setContentActiveBtn('like')
                    } else {
                        setContentActiveBtn('none')
                    }

                    if (res.data.data[0].data[0]?.ttl_cnt.dlike) {
                        setContentActiveBtn('dislike')
                    } else {
                        setContentActiveBtn('none')
                    }
                } else {

                }

            })
            .catch(e => console.log(e, "e"));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }


    const getLanguageteacherContent = (langType: number) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        DashboardService.getTeacherEContentLevel1(topicId, langType)
            .then(res => {
                if (res.data.data[0]) {
                    setTeacherecontent1({
                        ...teacherecontent1, teacherecontents1: res.data.data[0].data
                    })
                    setTeacherContentLikeCount(res.data.data[0]?.data[0].ttl_cnt.like)
                    setTeacherContentDislikeCount(res.data.data[0]?.data[0].ttl_cnt.dlike)
                    setTeacherContentlevelObjectid(res.data.data[0]?.data[0]._id)
                    let findLevel = contentleveltypes.find((x: any) => x.name == "level_1");
                    let lvlId;
                    let contenttypId;
                    if (findLevel) {
                        lvlId = findLevel.id;
                        setLevel1Id(findLevel.id)
                    }

                    let findContentType = contenttypes.find((x: any) => x.name == "teacher_e-content");
                    if (findContentType) {
                        contenttypId = findContentType.id
                        setContentType1Id(findContentType.id)
                    }
                    const body2 = {
                        "db_metadata": 2,
                        "t_id": topicId,
                        "content_type_id": contenttypId,
                        "level_id": lvlId
                    }
                    DashboardService.getContentComment(body2)
                        .then(res => {
                            if (res.data.details) {
                                setTeacherEcontentcommentlevel1({
                                    ...teacherecontentcommentlevel1, teacherecontentcommentslevels1: res.data.details
                                })
                            }
                        })

                    if (res.data.data[0].data[0]?.ttl_cnt.like) {
                        setTeacherContentActiveBtn('like')
                    } else {
                        setTeacherContentActiveBtn('none')
                    }

                    if (res.data.data[0].data[0]?.ttl_cnt.dlike) {
                        setTeacherContentActiveBtn('dislike')
                    } else {
                        setTeacherContentActiveBtn('none')
                    }
                } else {

                }
            })
            .catch(e => console.log(e, "e"));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

    const getLanguageexpContent = (langType: number) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        DashboardService.getExampleLevel(topicId, langType)
            .then(res => {
                if (res.data.data[0]) {
                    setExpecontent1({
                        ...expecontent1, expecontents1: res.data.data[0].data
                    })
                    setExpContentLikeCount(res.data.data[0]?.data[0].ttl_cnt.like)
                    setExpContentDislikeCount(res.data.data[0]?.data[0].ttl_cnt.dlike)
                    setExpContentlevelObjectid(res.data.data[0]?.data[0]._id)

                    let findLevel = contentleveltypes.find((x: any) => x.name == "level_1");
                    let lvlId;
                    let contenttypId;
                    if (findLevel) {
                        lvlId = findLevel.id;
                        setLevel1Id(findLevel.id)
                    }

                    let findContentType = contenttypes.find((x: any) => x.name == "exercise");
                    if (findContentType) {
                        contenttypId = findContentType.id
                        setContentType1Id(findContentType.id)
                    }
                    const body2 = {
                        "db_metadata": 2,
                        "t_id": topicId,
                        "content_type_id": contenttypId,
                        "level_id": lvlId
                    }
                    DashboardService.getContentComment(body2)
                        .then(res => {
                            if (res.data.details) {
                                setExamplecontentcommentlevel1({
                                    ...examplecontentcommentlevel1, examplecontentcommentslevels1: res.data.details
                                })
                            }
                        })

                    if (res.data.data[0].data[0]?.ttl_cnt.like) {
                        setExpContentActiveBtn('like')
                    } else {
                        setExpContentActiveBtn('none')
                    }

                    if (res.data.data[0].data[0]?.ttl_cnt.dlike) {
                        setExpContentActiveBtn('dislike')
                    } else {
                        setExpContentActiveBtn('none')
                    }

                } else {

                }
            })
            .catch(e => console.log(e, "e"));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

    const getLanguageexerciseContent = (langType: number) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        DashboardService.getExerciseLevel(topicId, langType)
            .then(res => {
                if (res.data.data[0]) {
                    setExcerciseecontent1({
                        ...exerciseecontent1, exerciseecontents1: res.data.data[0].data
                    })
                    setExerciseContentLikeCount(res.data.data[0]?.data[0].ttl_cnt.like)
                    setExerciseContentDislikeCount(res.data.data[0]?.data[0].ttl_cnt.dlike)
                    setExerciseContentlevelObjectid(res.data.data[0]?.data[0]._id)


                    let findLevel = contentleveltypes.find((x: any) => x.name == "level_1");
                    let lvlId;
                    let contenttypId;
                    if (findLevel) {
                        lvlId = findLevel.id;
                        setLevel1Id(findLevel.id)
                    }

                    let findContentType = contenttypes.find((x: any) => x.name == "exercise");
                    if (findContentType) {
                        contenttypId = findContentType.id
                        setContentType1Id(findContentType.id)
                    }
                    const body2 = {
                        "db_metadata": 2,
                        "t_id": topicId,
                        "content_type_id": contenttypId,
                        "level_id": lvlId
                    }
                    DashboardService.getContentComment(body2)
                        .then(res => {
                            if (res.data.details) {
                                setExercisecontentcommentlevel1({
                                    ...exercisecontentcommentlevel1, exercisecontentcommentslevels1: res.data.details
                                })
                            }
                        })
                    if (res.data.data[0].data[0]?.ttl_cnt.like) {
                        setExerciseContentActiveBtn('like')
                    } else {
                        setExerciseContentActiveBtn('none')
                    }

                    if (res.data.data[0].data[0]?.ttl_cnt.dlike) {
                        setExerciseContentActiveBtn('dislike')
                    } else {
                        setExerciseContentActiveBtn('none')
                    }

                } else {

                }
            })
            .catch(e => console.log(e, "e"));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

    const getLanguageimpContent = (langType: number) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        DashboardService.getImportantPointsLevel(topicId, langType)
            .then(res => {
                if (res.data.data[0]) {
                    setImpppointecontent1({
                        ...imppointecontent1, imppointsecontents1: res.data.data[0].data
                    })
                    setImpContentLikeCount(res.data.data[0]?.data[0].ttl_cnt.like)
                    setImpContentDislikeCount(res.data.data[0]?.data[0].ttl_cnt.dlike)
                    setImpContentlevelObjectid(res.data.data[0]?.data[0]._id)

                    let findLevel = contentleveltypes.find((x: any) => x.name == "level_1");
                    let lvlId;
                    let contenttypId;
                    if (findLevel) {
                        lvlId = findLevel.id;
                        setLevel1Id(findLevel.id)
                    }

                    let findContentType = contenttypes.find((x: any) => x.name == "exercise");
                    if (findContentType) {
                        contenttypId = findContentType.id
                        setContentType1Id(findContentType.id)
                    }
                    const body2 = {
                        "db_metadata": 2,
                        "t_id": topicId,
                        "content_type_id": contenttypId,
                        "level_id": lvlId
                    }
                    DashboardService.getContentComment(body2)
                        .then(res => {
                            if (res.data.details) {
                                setimpPointscontentcommentlevel1({
                                    ...impPointscontentcommentlevel1, impPointscontentcommentslevels1: res.data.details
                                })
                            }
                        })

                    if (res.data.data[0].data[0]?.ttl_cnt.like) {
                        setImpContentActiveBtn('like')
                    } else {
                        setImpContentActiveBtn('none')
                    }

                    if (res.data.data[0].data[0]?.ttl_cnt.dlike) {
                        setImpContentActiveBtn('dislike')
                    } else {
                        setImpContentActiveBtn('none')
                    }
                } else {

                }

            })
            .catch(e => console.log(e, "e"));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

    const getLanguageaie1Content = (langType: number) => {

        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        DashboardService.getAiEContentLevel1(topicId, langType)
            .then(res => {
                if (res.data.data[0]) {
                    setAiecontent1({
                        ...aiecontent1, aiecontents1: res.data.data[0]?.data
                    })
                    setAie1ContentLikeCount(res.data.data[0]?.data[0]?.ttl_cnt?.like)
                    setAie1ContentDislikeCount(res.data.data[0]?.data[0]?.ttl_cnt?.dlike)
                    setAie1ContentlevelObjectid(res.data.data[0]?.data[0]?._id)
                    let findLevel = contentleveltypes.find((x: any) => x.name == "level_1");
                    let lvlId;
                    let contenttypId;
                    if (findLevel) {
                        lvlId = findLevel.id;
                        setLevel1Id(findLevel.id)
                    }

                    let findContentType = contenttypes.find((x: any) => x.name == "ai_e-content");
                    if (findContentType) {
                        contenttypId = findContentType.id
                        setContentType1Id(findContentType.id)
                    }
                    const body2 = {
                        "db_metadata": 2,
                        "t_id": topicId,
                        "content_type_id": contenttypId,
                        "level_id": lvlId
                    }
                    DashboardService.getEContentComment(body2)
                        .then(res => {
                            if (res.data.details) {

                                setEcontentcommentlevel1({
                                    ...econtentcommentlevel1, econtentcommentslevels1: res.data.details
                                })
                            }
                        })

                    if (res.data.data[0].data[0]?.ttl_cnt.like) {
                        setAie1ContentActiveBtn('like')
                    } else {
                        setAie1ContentActiveBtn('none')
                    }

                    if (res.data.data[0].data[0]?.ttl_cnt.dlike) {
                        setAie1ContentActiveBtn('dislike')
                    } else {
                        setAie1ContentActiveBtn('none')
                    }
                }
                else {
                }
            })
            .catch(e => console.log(e, "e"));
    }
    const { econtentcomments } = econtentcomment;
    const { econtentcommentslevels1 } = econtentcommentlevel1;
    const { econtentcommentslevels2 } = econtentcommentlevel2;
    const { econtentcommentslevels3 } = econtentcommentlevel3;
    const { econtentcommentslevels4 } = econtentcommentlevel4;

    useEffect(() => {
        let language = localStorage.getItem('language')
        if (language && language != 'undefined') {
            setAie1Lang(language)
            setAie2Lang(language)
            setAie3Lang(language)
            setAie4Lang(language)
            setBookLang(language)
            setImpLang(language)
            setExerciseLang(language)
            setExpLang(language)
            setTeacherLang(language)
        } else {
            setAie1Lang('English')
            setAie2Lang('English')
            setAie3Lang('English')
            setAie4Lang('English')
            setBookLang('English')
            setImpLang('English')
            setExerciseLang('English')
            setExpLang('English')
            setTeacherLang('English')
        }
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

    }, [location.state.topicId])

    const getLanguageaie2Content = (langType: number) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        DashboardService.getAiEContentLevel2(topicId, langType)
            .then(res => {
                if (res.data.data[0]) {
                    setAiecontent2({
                        ...aiecontent2, aiecontents2: res.data.data[0]?.data
                    })
                    if (res.data.data[0]?.data[0]?.ttl_cnt?.like) {
                        setAie2ContentLikeCount(res.data.data[0]?.data[0]?.ttl_cnt?.like)
                    }
                    if (res.data.data[0]?.data[0]?.ttl_cnt?.dlike) {
                        setAie2ContentDislikeCount(res.data.data[0]?.data[0]?.ttl_cnt?.dlike)
                    }
                    setAie2ContentlevelObjectid(res.data.data[0]?.data[0]?._id)
                    if (res.data.data[0]?.data[0]?.ttl_cnt?.like) {
                        setAie2ContentActiveBtn('like')
                    } else {
                        setAie2ContentActiveBtn('none')
                    }
                    if (res.data.data[0].data[0]?.ttl_cnt?.dlike) {
                        setAie2ContentActiveBtn('dislike')
                    } else {
                        setAie2ContentActiveBtn('none')
                    }
                    let findLevel = contentleveltypes.find((x: any) => x.name == "level_2");
                    let lvlId;
                    let contenttypId;
                    if (findLevel) {
                        lvlId = findLevel.id;
                        setLevel1Id(findLevel.id)
                    }

                    let findContentType = contenttypes.find((x: any) => x.name == "ai_e-content");
                    if (findContentType) {
                        contenttypId = findContentType.id
                        setContentType1Id(findContentType.id)
                    }
                    const body2 = {
                        "db_metadata": 2,
                        "t_id": topicId,
                        "content_type_id": contenttypId,
                        "level_id": lvlId
                    }
                    DashboardService.getEContentComment(body2)
                        .then(res => {
                            if (res.data.details) {
                                setEcontentcommentlevel2({
                                    ...econtentcommentlevel2, econtentcommentslevels2: res.data.details
                                })
                            }
                        })

                } else {
                }
            })
            .catch(e => console.log(e, "e"));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

    const getLanguageaie3Content = (langType: number) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        DashboardService.getAiEContentLevel3(topicId, langType)
            .then(res => {
                if (res.data.data[0]) {
                    setAiecontent3({
                        ...aiecontent3, aiecontents3: res.data.data[0]?.data
                    })

                    setAie3ContentlevelObjectid(res.data.data[0]?.data[0]?._id)

                    if (res.data.data[0].data[0]?.ttl_cnt?.like) {
                        setAie3ContentLikeCount(res.data.data[0]?.data[0]?.ttl_cnt?.like)
                        setAie3ContentActiveBtn('like')
                    } else {
                        setAie3ContentActiveBtn('none')
                    }

                    if (res.data.data[0].data[0]?.ttl_cnt?.dlike) {
                        setAie3ContentDislikeCount(res.data.data[0]?.data[0]?.ttl_cnt?.dlike)
                        setAie3ContentActiveBtn('dislike')
                    } else {
                        setAie3ContentActiveBtn('none')
                    }

                    let findLevel = contentleveltypes.find((x: any) => x.name == "level_3");
                    let lvlId;
                    let contenttypId;
                    if (findLevel) {
                        lvlId = findLevel.id;
                        setLevel1Id(findLevel.id)
                    }

                    let findContentType = contenttypes.find((x: any) => x.name == "ai_e-content");
                    if (findContentType) {
                        contenttypId = findContentType.id
                        setContentType1Id(findContentType.id)
                    }
                    const body2 = {
                        "db_metadata": 2,
                        "t_id": topicId,
                        "content_type_id": contenttypId,
                        "level_id": lvlId
                    }
                    DashboardService.getEContentComment(body2)
                        .then(res => {
                            if (res.data.details) {
                                setEcontentcommentlevel3({
                                    ...econtentcommentlevel3, econtentcommentslevels3: res.data.details
                                })
                            }
                        })

                } else {
                }
            })
            .catch(e => console.log(e, "e"));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }


    const getLanguageaie4Content = (langType: number) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        DashboardService.getAiEContentLevel4(topicId, langType)
            .then(res => {
                if (res.data.data[0]) {
                    setAiecontent4({
                        ...aiecontent4, aiecontents4: res.data.data[0]?.data
                    })

                    setAie4ContentlevelObjectid(res.data.data[0]?.data[0]?._id)

                    if (res.data.data[0].data[0]?.ttl_cnt?.like) {
                        setAie4ContentLikeCount(res.data.data[0]?.data[0]?.ttl_cnt?.like)
                        setAie4ContentActiveBtn('like')
                    } else {
                        setAie4ContentActiveBtn('none')
                    }

                    if (res.data.data[0].data[0]?.ttl_cnt?.dlike) {
                        setAie4ContentDislikeCount(res.data.data[0]?.data[0]?.ttl_cnt?.dlike)
                        setAie4ContentActiveBtn('dislike')
                    } else {
                        setAie4ContentActiveBtn('none')
                    }

                    let findLevel = contentleveltypes.find((x: any) => x.name == "level_4");
                    let lvlId;
                    let contenttypId;
                    if (findLevel) {
                        lvlId = findLevel.id;
                        setLevel1Id(findLevel.id)
                    }

                    let findContentType = contenttypes.find((x: any) => x.name == "ai_e-content");
                    if (findContentType) {
                        contenttypId = findContentType.id
                        setContentType1Id(findContentType.id)
                    }
                    const body2 = {
                        "db_metadata": 2,
                        "t_id": topicId,
                        "content_type_id": contenttypId,
                        "level_id": lvlId
                    }
                    DashboardService.getEContentComment(body2)
                        .then(res => {
                            if (res.data.details) {
                                setEcontentcommentlevel4({
                                    ...econtentcommentlevel4, econtentcommentslevels4: res.data.details
                                })
                            }
                        })

                } else {
                }
            })
            .catch(e => console.log(e, "e"));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }


    const addNote = () => {
        setShowhide(true);
        setNoteBtn('Save');
        setNote('')
    }

    const Cancel = () => {
        setShowhide(false);
    }

    const noteedit = (data: IDashboard, i: number) => {
        if (data.user_id == localStorage.getItem('Tokenuserid')) {
            setShowhide(true)
            setNoteBtn("Update");
            noteId = data._id;
            if (data.n_text) {
                setNote(data.n_text)
            }
        }
    };

    const notedelete = (data: IDashboard, i: number) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        let noteId = data._id
        let userId = localStorage.getItem('Tokenuserid')
        if (noteId) {
            DashboardService.deleteActorContentNote(6, userId, topicId, noteId)
                .then(res => {
                    if (res.data.data) {
                        toast.success(res.data.message);
                        DashboardService.getActorContentNote(6, userId, topicId)
                            .then(res => {
                                if (res.data.status == 200) {
                                    setNoteData({
                                        ...noteData, notes: res.data.data
                                    })
                                } else {
                                    // toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(e => console.log(e, "e"));
        }
    };

    useEffect(() => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        let language = localStorage.getItem('language')
        if (language && language != 'undefined') {
            setVideoLang(language)
        } else {
            setVideoLang('English')
        }
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }
        DashboardService.getVideoContent(topicId, languageType)
            .then(res => {
                if (res.data.data.length) {
                    setVideoDetails({
                        ...videodetail, videodetails: res.data.data[0].data
                    })
                    setVideo({
                        ...video, videos: res.data.data[0].data[0]
                    })
                    const vId = res.data.data[0].data[0]._id;
                    if (vId && act_ype == "Teacher") {
                        const userId = localStorage.getItem('Tokenuserid');
                        DashboardService.getVideoAndTL(topicId, vId, userId)
                            .then((res) => {
                                if (res.data.data.length) {
                                    const updatedState = {
                                        ...videoAndTLines,
                                        videoAndTLine: res.data.data[0],
                                    };
                                    setVideoAndTLine(updatedState);
                                }
                            })
                            .catch((e) => console.log(e, "e"));
                    }

                    if (vId && act_ype != "Teacher") {
                        const userId = localStorage.getItem('Tokenuserid');
                        DashboardService.getTimeLine(4, userId, topicId, vId)
                            .then((res) => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...userVideoTLines,
                                        userVideoTLine: res.data.data,
                                    };
                                    setUserVideoTLine(updatedState);
                                }
                            })
                            .catch((e) => console.log(e, "e"));
                    }

                    if (res.data.data[0].data[0]._id) {
                        if (location.state.topicId) {
                            topicId = location.state.topicId
                        } else {
                            topicId = location.state.pendingtopics.topic_id
                        }
                        const body = {
                            "db_metadata": 1,
                            "v_id": res.data.data[0].data[0]._id,
                            "t_id": topicId
                        }
                        DashboardService.getActorVideoComment(body, 1)
                            .then(res => {
                                if (res.data.details) {
                                    var newData: any = res.data.details.map((data: any) => {
                                        data.c_ts = data.c_ts.split('T')[0];
                                        return data;
                                    });
                                    setvideocomment({
                                        ...videocomment, videocomments: newData
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    }
                    if (res.data.data[0].data[0]?.ttl_cnt.like) {
                        setActiveBtn('like')
                        setLikeCount(res.data.data[0].data[0]?.ttl_cnt.like)
                    } else {
                        setActiveBtn('none')
                        setLikeCount(0)
                    }
                }
            })
            .catch(e => console.log(e, "e"));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [location.state.topicId])


    const getLanguageVideoContent = (langType: number) => {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else {
            topicId = location.state.pendingtopics.topic_id
        }
        DashboardService.getVideoContent(topicId, langType)
            .then(res => {
                if (res.data.data.length) {
                    setVideoDetails({
                        ...videodetail, videodetails: res.data.data[0].data
                    })
                    setVideo({
                        ...video, videos: res.data.data[0].data[0]
                    })
                }
            })
            .catch(e => console.log(e, "e"));
    }

    const { videocomments } = videocomment;



    const handleCheckboxChange = (e: any, x: any, i: number) => {
        if (e.target.checked) {
            x.isChecked = e.target.checked
        } else {
            x.isChecked = e.target.checked
        }

    };

    // useEffect(() => {
    //     if (location.state.topicId) {
    //         topicId = location.state.topicId
    //     } else {
    //         topicId = location.state.pendingtopics.topic_id
    //     }
    //     DashboardService.getQuestionChoiceLevel1(topicId, 2, 3,'6576c3718bd542a9ad5795c7')
    //         .then(res => {
    //             // console.log(res.data.data)
    //             if (res.data.data.length) {
    //                 setQuestion({
    //                     ...question, questions: res.data.data
    //                 })
    //                 setSingleQuestion({
    //                     ...singlequestion, singlequestions: res.data.data[state]
    //                 })
    //             } else{
    //                 // toast.error(res.data.message)
    //             }

    //         })
    //         .catch(e =>
    //             console.log(e, "e")
    //         );
    //     // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, [state])

    const { singlequestions } = singlequestion;
    const { questions } = question;
    const { videodetails } = videodetail;
    const { videos } = video;
    const { teacherecontents1 } = teacherecontent1;
    const { expecontents1 } = expecontent1;
    const { exerciseecontents1 } = exerciseecontent1;
    const { imppointsecontents1 } = imppointecontent1;
    const { bookecontents1 } = bookecontent1;
    const { aiecontents1 } = aiecontent1;
    const { aiecontents2 } = aiecontent2;
    const { aiecontents3 } = aiecontent3;
    const { aiecontents4 } = aiecontent4;
    const [show, setShow] = React.useState(true);
    const [show1, setShow1] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const style = {
        position: 'absolute' as 'absolute',
        top: '2%',
        left: '1%',
        right: '1%',
        width: '98%',
        bgcolor: 'background.paper',
        boxShadow: 24,

    };
    const [showHint, setShowHint] = React.useState(false);
    const [showResult, setShowResult] = React.useState(true);
    const [showhide, setShowhide] = React.useState(false);
    const [videoshowhide, setVideoShowhide] = React.useState(false);
    const [videolang, setVideoLang] = React.useState('');
    const [aie1lang, setAie1Lang] = React.useState('');
    const [aie2lang, setAie2Lang] = React.useState('');
    const [aie3lang, setAie3Lang] = React.useState('');
    const [aie4lang, setAie4Lang] = React.useState('');
    const [booklang, setBookLang] = React.useState('');
    const [teacherlang, setTeacherLang] = React.useState('');
    const [explang, setExpLang] = React.useState('');
    const [implang, setImpLang] = React.useState('');
    const [exerciselang, setExerciseLang] = React.useState('');

    const handleChangevideo = (event: SelectChangeEvent) => {
        setVideoLang(event.target.value);
    };
    const handleChangeaie1 = (event: SelectChangeEvent) => {
        setAie1Lang(event.target.value);
    };
    const handleChangeaie2 = (event: SelectChangeEvent) => {
        setAie2Lang(event.target.value);
    };
    const handleChangeaie3 = (event: SelectChangeEvent) => {
        setAie3Lang(event.target.value);
    };
    const handleChangeaie4 = (event: SelectChangeEvent) => {
        setAie4Lang(event.target.value);
    };
    const handleChangebook = (event: SelectChangeEvent) => {
        setBookLang(event.target.value);
    };
    const handleChangeteacher = (event: SelectChangeEvent) => {
        setTeacherLang(event.target.value);
    };
    const handleChangeimp = (event: SelectChangeEvent) => {
        setImpLang(event.target.value);
    };
    const handleChangeexp = (event: SelectChangeEvent) => {
        setExpLang(event.target.value);
    };
    const handleChangeexercise = (event: SelectChangeEvent) => {
        setExerciseLang(event.target.value);
    };

   


    const timelinepopup = () => {
        setShowTimeline(true)
    }
    const timelinepopupclose = () => {
        setShowTimeline(false)
        setTimeLine("");
        setTimeLineId("");
        setTimeLineBtn("Save");
    }

    const getContentTypeIDs = () => {
        DashboardService.getContentTypes()
            .then(res => {
                if (res.data.data) {
                    setContentType({
                        ...contentType, contenttypes: res.data.data[0].data
                    })
                } else {
                    // toast.error(res.data.message)
                }
            })
            .catch(e => console.log(e, "e"));
    }
    const getLevelIDs = () => {
        DashboardService.getContentLevels()
            .then(res => {
                if (res.data.data) {
                    setContentLevelType({
                        ...contentLevelType, contentleveltypes: res.data.data[0].data
                    })

                } else {
                    // toast.error(res.data.message)
                }
            })
            .catch(e => console.log(e, "e"));
    }

    useEffect(() => {
        getContentTypeIDs();
        getLevelIDs();
        handleCounter(value);
    }, [location.state.topicId])

    useEffect(() => {
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }
        getLanguageaie1Content(languageType)
        getLanguageaie2Content(languageType)
        getLanguageaie3Content(languageType);
        getLanguageaie4Content(languageType);
        getLanguageteacherContent(languageType);
        getLanguageexerciseContent(languageType);
        getLanguageexpContent(languageType);
        getLanguageimpContent(languageType);
        getLanguagebookContent(languageType);
    }, [contentleveltypes])


    // changes

    const [vcommentactiveBtn, setVCommentActiveBtn] = useState("none");
    const [vcommentlikeCount, setVCommentLikeCount] = useState(0);
    const [vcommentdislikeCount, setVCommentDislikeCount] = useState(0);


    const [videoreplytext, setVideoReplyText] = React.useState('');
    const [openvideoreply, setOpenVideoReply] = React.useState(false);

    const videoReplyCancel = () => {
        setListIndex(undefined);
    }


    const handleVideoReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setVideoReplyText(target.value);
    }

    const videoReplySubmit = (data: any) => {

        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (videoreplytext) {
            const body = {
                "db_metadata": 1,
                "v_c_id": data._id,
                "reply": [
                    {
                        "val": videoreplytext,
                        "ref_c_user_id": localStorage.getItem('Tokenuserid')
                    }
                ]
            }
            DashboardService.updateActorVideoComment(body)
                .then(res => {
                    if (res.data.status == 200) {
                        setListIndex(undefined)
                        const body = {
                            "db_metadata": 1,
                            "v_id": data.v_id,
                            "t_id": data.t_id
                        }
                        DashboardService.getActorVideoComment(body, languageType)
                            .then(res => {
                                if (res.data.details) {
                                    var newData: any = res.data.details.map((data: any) => {
                                        data.c_ts = data.c_ts.split('T')[0];
                                        return data;
                                    });
                                    setvideocomment({
                                        ...videocomment, videocomments: newData
                                    })
                                    setvideocommentReply({
                                        ...videocommentreply, videocommentreplies: newData.reply
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    // toast.error(err.msg);
                });
        }

    }


    const [videoreplyreplytext, setVideoReplyReplyText] = React.useState('');

    const handleVideoReplyReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setVideoReplyReplyText(target.value);
    }

    const likeClick = (data: any) => {
        setVCommentLikeCount(data.like);
        setVCommentDislikeCount(data.dlike);
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (vcommentactiveBtn === "none") {
            setVCommentLikeCount(vcommentlikeCount + 1);
            setVCommentActiveBtn("like");
        }
        if (vcommentactiveBtn === 'like') {
            setVCommentLikeCount(vcommentlikeCount - 1);
            setVCommentActiveBtn("none");
        }
        if (vcommentactiveBtn === "dislike") {
            setVCommentLikeCount(vcommentlikeCount + 1);
            setVCommentDislikeCount(vcommentdislikeCount - 1);
            setVCommentActiveBtn("like");
        }
        if (vcommentactiveBtn === "none") {
            videocommentLikeDislike(data, 1, 0)
        } else if (vcommentactiveBtn === "like") {
            videocommentLikeDislike(data, -1, 0)
        }

    }


    const videocommentLikeDislike = (data: any, like: number, dislike: number) => {
        const body = {
            "db_metadata": 1,
            "v_c_id": data._id,
            "like": like,
            "dlike": dislike
        }
        DashboardService.updateActorVideoComment(body)
            .then(res => {
                if (res.data.status == 200) {
                    setOpenVideoReply(false)
                    const body = {
                        "db_metadata": 1,
                        "v_id": data.v_id,
                        "t_id": data.t_id
                    }
                    DashboardService.getActorVideoComment(body, languageType)
                        .then(res => {
                            if (res.data.details) {
                                var newData: any = res.data.details.map((data: any) => {
                                    data.c_ts = data.c_ts.split('T')[0];
                                    return data;
                                });
                                setvideocomment({
                                    ...videocomment, videocomments: newData
                                })
                            }
                        })
                        .catch(e => console.log(e, "e"));
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(err => {
                // toast.error(err.msg);
            });
    }

    const dislikeClick = (data: any) => {
        setVCommentLikeCount(data.like);
        setVCommentDislikeCount(data.dlike);
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (vcommentactiveBtn === "none") {
            setVCommentDislikeCount(vcommentdislikeCount + 1);
            setVCommentActiveBtn("dislike");
        }
        if (vcommentactiveBtn === 'dislike') {
            setVCommentDislikeCount(vcommentdislikeCount - 1);
            setVCommentActiveBtn("none");
        }
        if (vcommentactiveBtn === "like") {
            setVCommentDislikeCount(vcommentdislikeCount + 1);
            setVCommentLikeCount(vcommentlikeCount - 1);
            setVCommentActiveBtn("dislike");
        }
        if (vcommentactiveBtn === "none") {
            videocommentLikeDislike(data, 0, 1)
        } else if (vcommentactiveBtn === "dislike") {
            videocommentLikeDislike(data, 0, -1)
        }
    }

    const videocommentReplyLikeDislike = (data: any, rdata: any, like: number, dislike: number) => {
        const body = {
            "db_metadata": 1,
            "v_c_id": data._id,
            "reply_id": rdata._id,
            "like": like,
            "dlike": dislike,
        }
        DashboardService.updateVideoCommentReply(body)
            .then(res => {
                if (res.data.status == 200) {
                    setOpenVideoReplyReply(false)
                    const body = {
                        "db_metadata": 1,
                        "v_id": data.v_id,
                        "t_id": data.t_id
                    }
                    DashboardService.getActorVideoComment(body, languageType)
                        .then(res => {
                            if (res.data.details) {
                                var newData: any = res.data.details.map((data: any) => {
                                    data.c_ts = data.c_ts.split('T')[0];
                                    return data;
                                });
                                setvideocomment({
                                    ...videocomment, videocomments: newData
                                })
                            }
                        })
                        .catch(e => console.log(e, "e"));
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(err => {
                // toast.error(err.msg);
            });
    }

    const replylikeClick = (data: any, rdata: any) => {
        setVCommentReplyLikeCount(rdata.like)
        setVCommentReplyDislikeCount(rdata.dlike)
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (vcommentreplyactiveBtn === "none") {
            setVCommentReplyLikeCount(vcommentreplylikeCount + 1);
            setVCommentReplyActiveBtn("like");
        }
        if (vcommentreplyactiveBtn === 'like') {
            setVCommentReplyLikeCount(vcommentreplylikeCount - 1);
            setVCommentReplyActiveBtn("none");
        }
        if (vcommentreplyactiveBtn === "dislike") {
            setVCommentReplyLikeCount(vcommentreplylikeCount + 1);
            setVCommentReplyDislikeCount(vcommentreplydislikeCount - 1);
            setVCommentReplyActiveBtn("like");
        }
        if (vcommentreplyactiveBtn === "none") {
            videocommentReplyLikeDislike(data, rdata, 1, 0)
        } else if (vcommentreplyactiveBtn === "like") {
            videocommentReplyLikeDislike(data, rdata, -1, 0)
        }

    }

    const replydislikeClick = (data: any, rdata: any) => {
        setVCommentReplyLikeCount(rdata.like)
        setVCommentReplyDislikeCount(rdata.dlike)
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (vcommentreplyactiveBtn === "none") {
            setVCommentReplyDislikeCount(vcommentreplydislikeCount + 1);
            setVCommentReplyActiveBtn("dislike");
        }
        if (vcommentreplyactiveBtn === 'dislike') {
            setVCommentReplyDislikeCount(vcommentreplydislikeCount - 1);
            setVCommentReplyActiveBtn("none");
        }
        if (vcommentreplyactiveBtn === "like") {
            setVCommentReplyDislikeCount(vcommentreplydislikeCount + 1);
            setVCommentReplyLikeCount(vcommentreplylikeCount - 1);
            setVCommentReplyActiveBtn("dislike");
        }
        if (vcommentreplyactiveBtn === "none") {
            videocommentReplyLikeDislike(data, rdata, 0, 1)
        } else if (vcommentreplyactiveBtn === "dislike") {
            videocommentReplyLikeDislike(data, rdata, 0, -1)
        }
    }



    const videoReplyReplySubmit = (data: any) => {

        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (videoreplyreplytext) {
            const body = {
                "db_metadata": 1,
                "v_c_id": data._id,
                "reply": [
                    {
                        "val": videoreplyreplytext,
                        "ref_c_user_id": localStorage.getItem('Tokenuserid')
                    }
                ]
            }
            DashboardService.updateActorVideoComment(body)
                .then(res => {
                    if (res.data.status == 200) {
                        setListReplyIndex(undefined)
                        const body = {
                            "db_metadata": 1,
                            "v_id": data.v_id,
                            "t_id": data.t_id
                        }
                        DashboardService.getActorVideoComment(body, languageType)
                            .then(res => {
                                if (res.data.details) {
                                    var newData: any = res.data.details.map((data: any) => {
                                        data.c_ts = data.c_ts.split('T')[0];
                                        return data;
                                    });
                                    setvideocomment({
                                        ...videocomment, videocomments: newData
                                    })
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    // toast.error(err.msg);
                });
        }

    }


    const videoReplyReplyCancel = () => {
        setListReplyIndex(undefined);
    }

    const handleCommentDisikeClick = (reqInfo: any, levelType: any, contentTypeName: any) => {
        setContentTypeName(contentTypeName)
        setcmtDislikeCount(reqInfo?.dlike)
        setcmtLikeCount(reqInfo?.like)
        if (cmtlikeactiveBtn === "none") {
            setcmtDislikeCount(cmtdislikeCount + 1);
            setcmtlikeActiveBtn("dislike");
        }

        if (cmtlikeactiveBtn === 'dislike') {
            setcmtDislikeCount(cmtdislikeCount - 1);
            setcmtlikeActiveBtn("none");
        }

        if (cmtlikeactiveBtn === "like") {
            setcmtDislikeCount(cmtdislikeCount + 1);
            if (cmtlikeCount) {
                setcmtLikeCount(cmtlikeCount - 1);
            }
            setcmtlikeActiveBtn("dislike");
        }
        if (reqInfo?._id) {
            if (cmtlikeactiveBtn === "none") {
                commentLikeDislike(reqInfo, 0, 1, levelType)
            } else if (cmtlikeactiveBtn === "dislike") {
                commentLikeDislike(reqInfo, 0, -1, levelType)
            }
        }
    };

    const handleCommentLikeClick = (reqInfo: any, levelType: any, contentTypeName: any) => {
        setContentTypeName(contentTypeName)
        setcmtLikeCount(reqInfo?.like)
        setcmtDislikeCount(reqInfo?.dlike)
        if (cmtlikeactiveBtn === "none") {
            setcmtLikeCount(cmtlikeCount + 1);
            setcmtlikeActiveBtn("like");
        }
        if (cmtlikeactiveBtn === 'like') {
            setcmtLikeCount(cmtlikeCount - 1);
            setcmtlikeActiveBtn("none");
        }
        if (cmtlikeactiveBtn === "dislike") {
            setcmtLikeCount(cmtlikeCount + 1);
            setcmtDislikeCount(cmtdislikeCount - 1);
            setcmtlikeActiveBtn("like");
        }
        if (reqInfo?._id) {
            if (cmtlikeactiveBtn === "none") {
                commentLikeDislike(reqInfo, 1, 0, levelType)
            } else if (cmtlikeactiveBtn === "like") {
                commentLikeDislike(reqInfo, -1, 0, levelType)
            }
        }

    };

    function commentLikeDislike(reqInfo: any, like: number, dlike: number, leveltype: string) {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else if (location.state.pendingtopics.topic_id) {
            topicId = location.state.pendingtopics.topic_id
        } else {
            topicId = localStorage.getItem('topicId')
        }

        const body = {
            "db_metadata": 2,
            "e_c_id": reqInfo?._id,
            "like": like,
            "dlike": dlike
        }
        DashboardService.commentLikeDislike(body)
            .then(res => {
                const body2 = {
                    "db_metadata": 2,
                    "t_id": reqInfo?.t_id,
                    "content_type_id": reqInfo?.content_type_id,
                    "level_id": reqInfo?.level_id
                }
                DashboardService.getEContentComment(body2)
                    .then(res => {
                        if (res.data.details) {
                            if (contentTypeName === "ai_e-content") {
                                if (leveltype === "level_1") {
                                    setEcontentcommentlevel1({
                                        ...econtentcommentlevel1, econtentcommentslevels1: res.data.details
                                    })
                                }
                                if (leveltype === "level_2") {
                                    setEcontentcommentlevel2({
                                        ...econtentcommentlevel2, econtentcommentslevels2: res.data.details
                                    })
                                }
                                if (leveltype === "level_3") {
                                    setEcontentcommentlevel3({
                                        ...econtentcommentlevel3, econtentcommentslevels3: res.data.details
                                    })
                                }
                                if (leveltype === "level_4") {
                                    setEcontentcommentlevel4({
                                        ...econtentcommentlevel4, econtentcommentslevels4: res.data.details
                                    })
                                }
                            }
                            if (contentTypeName === "teacher_e-content") {
                                setTeacherEcontentcommentlevel1({
                                    ...teacherecontentcommentlevel1, teacherecontentcommentslevels1: res.data.details
                                })
                            }

                            if (contentTypeName === "examples") {
                                setExamplecontentcommentlevel1({
                                    ...examplecontentcommentlevel1, examplecontentcommentslevels1: res.data.details
                                })
                            }

                            if (contentTypeName === "book_e-content") {
                                setbookEcontentcommentlevel1({
                                    ...bookEcontentcommentlevel1, bookEcontentcommentslevels1: res.data.details
                                })
                            }
                            if (contentTypeName === "importantpoints") {
                                setimpPointscontentcommentlevel1({
                                    ...impPointscontentcommentlevel1, impPointscontentcommentslevels1: res.data.details
                                })
                            }
                            if (contentTypeName === "exercise") {
                                setExercisecontentcommentlevel1({
                                    ...exercisecontentcommentlevel1, exercisecontentcommentslevels1: res.data.details
                                })
                            }
                        }
                    })
                    .catch(e => console.log(e, "e"));
            })
            .catch(err => {
                // toast.error(err.msg);
            });
    }

    const initialInfoforReply = {
        _id: "",
        t_id: "",
        user_id: "",
        content_type_id: "",
        level_id: ""
    };

    const [addnewcommentReply, setAddNewCommentReply] = React.useState(false);
    const [commentReply, setCommentRepl] = useState("");
    const [commentReplyBtn, setcommentReplyBtn] = useState("Save");
    const [commentInfoforReply, setcommentInfoforReply] = useState(initialInfoforReply);
    const [commentReplyLevelType, setcommentReplyLevelType] = useState("");

    const handleCommentReply = (reqInfo: any, levelType: any, contentTypeName: any) => {
        setContentTypeName(contentTypeName)
        setAddNewCommentReply(true)
        setcommentInfoforReply(reqInfo)
        setcommentReplyLevelType(levelType);
    }

    const commentReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setCommentRepl(target.value);
    }

    const handleReplyCommentclose = () => {
        setAddNewCommentReply(false)
    }

    const commentReplySubmit = () => {

        if (commentReplyBtn == 'Save') {
            const req = {
                "db_metadata": 2,
                "e_c_id": commentInfoforReply?._id,
                "reply": [
                    {
                        "val": commentReply,
                        "ref_c_user_id": commentInfoforReply?.user_id
                    }
                ]
            }
            DashboardService.addCommentReply(req)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Reply Successfully')
                        handleReplyCommentclose();
                        setCommentRepl('');
                        const req2 = {
                            "db_metadata": 2,
                            "t_id": commentInfoforReply?.t_id,
                            "content_type_id": commentInfoforReply?.content_type_id,
                            "level_id": commentInfoforReply?.level_id
                        }
                        DashboardService.getEContentComment(req2)
                            .then(res => {
                                if (res.data.details) {
                                    if (contentTypeName === "ai_e-content") {
                                        if (commentReplyLevelType === "level_1") {
                                            setEcontentcommentlevel1({
                                                ...econtentcommentlevel1, econtentcommentslevels1: res.data.details
                                            })
                                        }
                                        if (commentReplyLevelType === "level_2") {
                                            setEcontentcommentlevel2({
                                                ...econtentcommentlevel2, econtentcommentslevels2: res.data.details
                                            })
                                        }
                                        if (commentReplyLevelType === "level_3") {
                                            setEcontentcommentlevel3({
                                                ...econtentcommentlevel3, econtentcommentslevels3: res.data.details
                                            })
                                        }
                                        if (commentReplyLevelType === "level_4") {
                                            setEcontentcommentlevel4({
                                                ...econtentcommentlevel4, econtentcommentslevels4: res.data.details
                                            })
                                        }
                                    }
                                    if (contentTypeName === "teacher_e-content") {
                                        setTeacherEcontentcommentlevel1({
                                            ...teacherecontentcommentlevel1, teacherecontentcommentslevels1: res.data.details
                                        })
                                    }

                                    if (contentTypeName === "examples") {
                                        setExamplecontentcommentlevel1({
                                            ...examplecontentcommentlevel1, examplecontentcommentslevels1: res.data.details
                                        })
                                    }

                                    if (contentTypeName === "book_e-content") {
                                        setbookEcontentcommentlevel1({
                                            ...bookEcontentcommentlevel1, bookEcontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentTypeName === "importantpoints") {
                                        setimpPointscontentcommentlevel1({
                                            ...impPointscontentcommentlevel1, impPointscontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (contentTypeName === "exercise") {
                                        setExercisecontentcommentlevel1({
                                            ...exercisecontentcommentlevel1, exercisecontentcommentslevels1: res.data.details
                                        })
                                    }
                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        // toast.error(res.data.message)
                    }


                })
                .catch(err => {
                    toast.error(err.msg);
                });
        } else {
            const req = {
                "db_metadata": 2,
                "e_c_id": updateInfoforReply?.e_c_id,
                "reply_id": updateInfoforReply?.reply_id,
                "val": commentReply
            }
            DashboardService.updateCommentReply(req)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success("Reply Updated Successfully")
                        handleReplyCommentclose();
                        setCommentRepl('');
                        setcommentReplyBtn('Save');
                        const req2 = {
                            "db_metadata": 2,
                            "t_id": localStorage.getItem('topicId'),
                            "content_type_id": updateInfoforReply?.content_type_id,
                            "level_id": updateInfoforReply?.level_id
                        }
                        DashboardService.getEContentComment(req2)
                            .then(res => {
                                if (res.data.details) {

                                    if (updateInfoforReply?.contentTypeName === "ai_e-content") {
                                        if (updateInfoforReply?.levelType === "level_1") {
                                            setEcontentcommentlevel1({
                                                ...econtentcommentlevel1, econtentcommentslevels1: res.data.details
                                            })
                                        }
                                        if (updateInfoforReply?.levelType === "level_2") {
                                            setEcontentcommentlevel2({
                                                ...econtentcommentlevel2, econtentcommentslevels2: res.data.details
                                            })
                                        }
                                        if (updateInfoforReply?.levelType === "level_3") {
                                            setEcontentcommentlevel3({
                                                ...econtentcommentlevel3, econtentcommentslevels3: res.data.details
                                            })
                                        }
                                        if (updateInfoforReply?.levelType === "level_4") {
                                            setEcontentcommentlevel4({
                                                ...econtentcommentlevel4, econtentcommentslevels4: res.data.details
                                            })
                                        }
                                    }
                                    if (updateInfoforReply?.contentTypeName === "teacher_e-content") {
                                        setTeacherEcontentcommentlevel1({
                                            ...teacherecontentcommentlevel1, teacherecontentcommentslevels1: res.data.details
                                        })
                                    }

                                    if (updateInfoforReply?.contentTypeName === "examples") {
                                        setExamplecontentcommentlevel1({
                                            ...examplecontentcommentlevel1, examplecontentcommentslevels1: res.data.details
                                        })
                                    }

                                    if (updateInfoforReply?.contentTypeName === "book_e-content") {
                                        setbookEcontentcommentlevel1({
                                            ...bookEcontentcommentlevel1, bookEcontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (updateInfoforReply?.contentTypeName === "importantpoints") {
                                        setimpPointscontentcommentlevel1({
                                            ...impPointscontentcommentlevel1, impPointscontentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (updateInfoforReply?.contentTypeName === "exercise") {
                                        setExercisecontentcommentlevel1({
                                            ...exercisecontentcommentlevel1, exercisecontentcommentslevels1: res.data.details
                                        })
                                    }

                                }
                            })
                            .catch(e => console.log(e, "e"));
                    } else {
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }

    };

    const editReplyV1 = (data: ReplyState, value: any) => {
        setAddNewCommentReply(true);
        setcommentReplyBtn('Update')
        if (value) {
            setCommentRepl(value)
        }
        if (data) {
            setUpdateInfoforReply(data)
        }
    };

    const deleteReplyconfirmV1 = (data: ReplyState) => {
        console.log("deleteReplyconfirmV1>>", deletereplypopup)
        setDeletereplyinfo(data);
        setDeletereplypopup(true);
        console.log("deleteReplyconfirmV1>>", deletereplypopup)
    }

    const deleteReplyV1 = (data: ReplyState) => {
        setUpdateInfoforReply(data)
        const body = {
            "db_metadata": 2,
            "e_c_id": data?.e_c_id,
            "reply_id": data?.reply_id,
            "langType": 1
        }
        DashboardService.removeEContentCommentReply(body)
            .then(res => {
                setDeletereplypopup(false)
                if (res.data.status == 200) {
                    toast.success('Reply Deleted Successfully')
                    const body2 = {
                        "db_metadata": 2,
                        "t_id": localStorage.getItem('topicId'),
                        "content_type_id": data?.content_type_id,
                        "level_id": data?.level_id
                    }
                    DashboardService.getEContentComment(body2)
                        .then(res => {
                            if (res.data.details) {

                                if (data?.contentTypeName === "ai_e-content") {
                                    if (data?.levelType === "level_1") {
                                        setEcontentcommentlevel1({
                                            ...econtentcommentlevel1, econtentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (data?.levelType === "level_2") {
                                        setEcontentcommentlevel2({
                                            ...econtentcommentlevel2, econtentcommentslevels2: res.data.details
                                        })
                                    }
                                    if (data?.levelType === "level_3") {
                                        setEcontentcommentlevel3({
                                            ...econtentcommentlevel3, econtentcommentslevels3: res.data.details
                                        })
                                    }
                                    if (data?.levelType === "level_4") {
                                        setEcontentcommentlevel4({
                                            ...econtentcommentlevel4, econtentcommentslevels4: res.data.details
                                        })
                                    }
                                }
                                if (data?.contentTypeName === "teacher_e-content") {
                                    setTeacherEcontentcommentlevel1({
                                        ...teacherecontentcommentlevel1, teacherecontentcommentslevels1: res.data.details
                                    })
                                }

                                if (data?.contentTypeName === "examples") {
                                    setExamplecontentcommentlevel1({
                                        ...examplecontentcommentlevel1, examplecontentcommentslevels1: res.data.details
                                    })
                                }

                                if (data?.contentTypeName === "book_e-content") {
                                    setbookEcontentcommentlevel1({
                                        ...bookEcontentcommentlevel1, bookEcontentcommentslevels1: res.data.details
                                    })
                                }
                                if (data?.contentTypeName === "importantpoints") {
                                    setimpPointscontentcommentlevel1({
                                        ...impPointscontentcommentlevel1, impPointscontentcommentslevels1: res.data.details
                                    })
                                }
                                if (data?.contentTypeName === "exercise") {
                                    setExercisecontentcommentlevel1({
                                        ...exercisecontentcommentlevel1, exercisecontentcommentslevels1: res.data.details
                                    })
                                }
                            }
                        })
                        .catch(e => console.log(e, "e"));
                } else {
                    toast.error(res.data.message)
                }


            })
            .catch(err => {
                toast.error(err.msg);
            });

    };
    const [cmtReplylikeBtn, setcmtReplylikeBtn] = useState("none");
    const [cmtreplylikeCount, setcmtreplyLikeCount] = useState(0);
    const [cmtreplydislikeCount, setcmtreplydisLikeCount] = useState(0);

    const [rliked, setRliked] = useState("");
    const [rdliked, setRDliked] = useState("");

    const handleReplyDislikeClickV1 = (reqInfo: any, contentType: any, levelType: any, commentIndex: any, replyIndex: any) => {
        const commentReplyIndexes = `${commentIndex}${replyIndex}` + contentType + levelType;
        setRDliked(commentReplyIndexes);
        setcmtDislikeCount(reqInfo?.dlike)
        setcmtLikeCount(reqInfo?.like)
        if (cmtReplylikeBtn === "none") {
            setcmtreplydisLikeCount(cmtreplydislikeCount + 1);
            setcmtReplylikeBtn("dislike");
        }
        if (cmtReplylikeBtn === 'dislike') {
            setcmtreplydisLikeCount(cmtreplydislikeCount - 1);
            setcmtReplylikeBtn("none");
        }
        if (cmtReplylikeBtn === "like") {

            setcmtreplydisLikeCount(cmtreplydislikeCount + 1);
            setcmtreplyLikeCount(cmtreplylikeCount - 1);
            setcmtReplylikeBtn("dislike");
        }
        if (reqInfo?.reply_id) {
            if (cmtReplylikeBtn === "none") {
                replyLikeDislike(reqInfo, 0, 1, levelType, contentType)
            } else if (cmtReplylikeBtn === "dislike") {
                replyLikeDislike(reqInfo, 0, -1, levelType, contentType)
            }
        }
    };

    const handleReplyLikeClickV1 = (reqInfo: any, contentType: any, levelType: any, commentIndex: any, replyIndex: any) => {
        const commentReplyIndexes = `${commentIndex}${replyIndex}` + contentType + levelType;
        setRliked(commentReplyIndexes);
        setcmtreplyLikeCount(reqInfo?.like)
        setcmtreplydisLikeCount(reqInfo?.dlike)

        if (cmtReplylikeBtn === "none") {
            setcmtreplyLikeCount(cmtreplylikeCount + 1);
            setcmtReplylikeBtn("like");
        }
        if (cmtReplylikeBtn === 'like') {
            setcmtreplyLikeCount(cmtreplylikeCount - 1);
            setcmtReplylikeBtn("none");
        }
        if (cmtReplylikeBtn === "dislike") {
            setcmtreplyLikeCount(cmtreplylikeCount + 1);
            setcmtreplydisLikeCount(cmtreplydislikeCount - 1);
            setcmtReplylikeBtn("like");
        }
        if (reqInfo?.reply_id) {
            if (cmtReplylikeBtn === "none") {
                replyLikeDislike(reqInfo, 1, 0, levelType, contentType)
            } else if (cmtReplylikeBtn === "like") {
                replyLikeDislike(reqInfo, -1, 0, levelType, contentType)
            }
        }
    }

    function replyLikeDislike(reqInfo: any, like: number, dlike: number, levelType: string, contentTypeName: string) {
        if (location.state.topicId) {
            topicId = location.state.topicId
        } else if (location.state.pendingtopics.topic_id) {
            topicId = location.state.pendingtopics.topic_id
        } else {
            topicId = localStorage.getItem('topicId')
        }

        const body = {
            "db_metadata": 2,
            "e_c_id": reqInfo?.e_c_id,
            "reply_id": reqInfo?.reply_id,
            "like": like,
            "dlike": dlike
        }
        DashboardService.updateCommentReply(body)
            .then(res => {
                if (res.data.status == 200) {
                    toast.success("Updated Successfully")
                    const req2 = {
                        "db_metadata": 2,
                        "t_id": localStorage.getItem('topicId'),
                        "content_type_id": reqInfo?.content_type_id,
                        "level_id": reqInfo?.level_id
                    }
                    DashboardService.getEContentComment(req2)
                        .then(res => {
                            if (res.data.details) {

                                if (contentTypeName === "ai_e-content") {
                                    if (levelType === "level_1") {
                                        setEcontentcommentlevel1({
                                            ...econtentcommentlevel1, econtentcommentslevels1: res.data.details
                                        })
                                    }
                                    if (levelType === "level_2") {
                                        setEcontentcommentlevel2({
                                            ...econtentcommentlevel2, econtentcommentslevels2: res.data.details
                                        })
                                    }
                                    if (levelType === "level_3") {
                                        setEcontentcommentlevel3({
                                            ...econtentcommentlevel3, econtentcommentslevels3: res.data.details
                                        })
                                    }
                                    if (levelType === "level_4") {
                                        setEcontentcommentlevel4({
                                            ...econtentcommentlevel4, econtentcommentslevels4: res.data.details
                                        })
                                    }
                                }
                                if (contentTypeName === "teacher_e-content") {
                                    setTeacherEcontentcommentlevel1({
                                        ...teacherecontentcommentlevel1, teacherecontentcommentslevels1: res.data.details
                                    })
                                }

                                if (contentTypeName === "examples") {
                                    setExamplecontentcommentlevel1({
                                        ...examplecontentcommentlevel1, examplecontentcommentslevels1: res.data.details
                                    })
                                }

                                if (contentTypeName === "book_e-content") {
                                    setbookEcontentcommentlevel1({
                                        ...bookEcontentcommentlevel1, bookEcontentcommentslevels1: res.data.details
                                    })
                                }
                                if (contentTypeName === "importantpoints") {
                                    setimpPointscontentcommentlevel1({
                                        ...impPointscontentcommentlevel1, impPointscontentcommentslevels1: res.data.details
                                    })
                                }
                                if (contentTypeName === "exercise") {
                                    setExercisecontentcommentlevel1({
                                        ...exercisecontentcommentlevel1, exercisecontentcommentslevels1: res.data.details
                                    })
                                }

                            }
                        })
                        .catch(e => console.log(e, "e"));
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(err => {
                // toast.error(err.msg);
            });
    }
    // changes
    const videoPlayerRef = useRef(null);
    // const videoPlayerRef = useRef<HTMLInputElement>(null);
    const [videoState, setVideoState] = useState({
        playing: true,
        muted: false,
        volume: 0.5,
        playbackRate: 1.0,
        played: 0,
        seeking: false,
        buffer: true,
    });

    //Destructuring the properties from the videoState
    const { playing, muted, volume, playbackRate, played, seeking, buffer } =
        videoState;

    const currentTime = videoPlayerRef.current
        ? videoPlayerRef.current?.getCurrentTime()
        : "00:00";
    const duration = videoPlayerRef.current
        ? videoPlayerRef.current?.getDuration()
        : "00:00";

    const formatCurrentTime = formatTime(currentTime);
    const formatDuration = formatTime(duration);

    const handleUserActivityOnVideo = (body: any, activity: string) => {
        DashboardService.updateTopicEContentTimer(body)
            .then(res => {
                if (res.data.status == 400) {
                    console.log("Something went wrong ");
                }
                if (res.data.status == 200) {
                    console.log("Your last watching time on video-: " + body.currActObj.lastWatchTime);
                }
            }).catch(e =>
                toast.error(e.message)
            );
    }

    if (value != 0 && (currentTime !== "00:00" && currentTime !== "0:00" && currentTime != null && currentTime != 0)) {
        let body = {
            "summaryObj": {
                "user_id": localStorage?.getItem("Tokenuserid"),
                "db_metadata": 27,
                "subjectId": localStorage?.getItem("subId"),
                "chapterId": localStorage?.getItem("chapterId"),
                "topicId": localStorage?.getItem("topicId"),
                "videoDuration": Math.round(duration),
                "contentDuration": 0
            },
            "currActObj": {
                "user_id": localStorage?.getItem("Tokenuserid"),
                "db_metadata": 28,
                "subjectId": localStorage?.getItem("subId"),
                "chapterId": localStorage?.getItem("chapterId"),
                "topicId": localStorage?.getItem("topicId"),
                "contentId": "",
                "contStatus": 1,
                "contType": 0,
                "contLang": "English",
                "totalDur": 0,
                "lastWatchTime": Math.round(currentTime)
            }
        }
        handleUserActivityOnVideo(body, "tab changing")
    }

    useEffect(() => {
        if (currentTime !== "00:00" && currentTime !== "0:00" && currentTime != null && currentTime != 0) {
            let body = {
                "summaryObj": {
                    "user_id": localStorage?.getItem("Tokenuserid"),
                    "db_metadata": 27,
                    "subjectId": localStorage?.getItem("subId"),
                    "chapterId": localStorage?.getItem("prevChapterId"),
                    "topicId": localStorage?.getItem("prevTopicId"),
                    "videoDuration": Math.round(duration),
                    "contentDuration": 0
                },
                "currActObj": {
                    "user_id": localStorage?.getItem("Tokenuserid"),
                    "db_metadata": 28,
                    "subjectId": localStorage?.getItem("subId"),
                    "chapterId": localStorage?.getItem("prevChapterId"),
                    "topicId": localStorage?.getItem("prevTopicId"),
                    "contentId": "",
                    "contStatus": 1,
                    "contType": 0,
                    "contLang": "English",
                    "totalDur": 0,
                    "lastWatchTime": Math.round(currentTime)
                }
            }
            handleUserActivityOnVideo(body, "reselection topic")
        }

    }, [location.state.topicId])

    const seekValue = useCallback((value: any) => {
        const parts = value.split(':');
        const minutes = parseInt(parts[0], 10) || 0;
        const seconds = parseInt(parts[1], 10) || 0;
        const totalSeconds = minutes * 60 + seconds;
        videoPlayerRef.current.seekTo(totalSeconds, 'seconds');
    }, [value])



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
    return (

        <div>

            <HeaderCurriculum />
            <div className="bg-lightbule p-2">
                <div className="subject-details">

                    <div className="subject-details-sec">
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>

                                <CouseContent subId={location.state.subId} />

                            </Grid>
                            <Grid item xs={12} md={9}>
                                <div className="subject-details-center">

                                    <div className="breadcrumbs-sec">
                                        <Breadcrumbs aria-label="breadcrumb">
                                            <Link color="#174392" to="/dashboard">
                                                Dashboard
                                            </Link>
                                            <Link color="#174392" to="/subject-details">
                                                <Typography color="#62676C"> {localStorage.getItem('subName')}</Typography>
                                            </Link>
                                        </Breadcrumbs>
                                    </div>
                                    <div className="rating-box">
                                        <ul>
                                            <li>
                                                <div className="rating-sec">
                                                    <span>
                                                        <ul>
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
                                                    <span>
                                                        ({topicSummaries?.useractivityheader?.sub_rating}/{topicSummaries?.t_header?.rating} ratings)
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <p className="m-0">
                                                    {topicSummaries?.useractivityheader?.tot_students}&nbsp; Students</p>
                                            </li>
                                            <li>
                                                <p className="m-0">
                                                    {topicSummaries?.useractivityheader?.tot_mentors}&nbsp; Mentors</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="hour-sec mt-1">
                                        <ul>
                                            <li><img src={`${assetUrl}/Total%20hr%20clock.svg`} alt="" />
                                                {topicSummaries?.useractivityheader?.tot_hours_Completed}/{topicSummaries?.useractivityheader?.tot_hours}  &nbsp;
                                                Hours</li>
                                            <li><img src={`${assetUrl}/topics.svg`} alt="" />
                                                {topicSummaries?.useractivityheader?.tot_topics_completed}/{topicSummaries?.useractivityheader?.tot_topics} &nbsp;
                                                Topics</li>
                                            <li><img src={`${assetUrl}/buddies%20comp.svg`} alt="" />
                                                {topicSummaries?.useractivityheader?.buddiesCompleted} Buddies Completed</li>
                                            <li><img src={`${assetUrl}/buddies%20inpg.svg`} alt="" />
                                                {topicSummaries?.useractivityheader?.buddiesInprogress} Buddies Inprogress</li>
                                        </ul>
                                    </div>
                                    <div className="desc mt-2">
                                        <h5 className="font-w600 subject-title-con">Description {timer} {isConditionMet}</h5>
                                        <p>

                                            <div className='lines'>
                                                {showmore ? <span >   {topicSummaries?.desc}  </span> : <span style={{
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
                                </div>
                                <div className="tabs-list mt-3">
                                    {location.state.chapterName ?
                                        <h5 className="font-w600 subject-title-con">{location.state.chapterName}/{location.state.topicName}</h5>
                                        :
                                        <h5 className="font-w600 subject-title-con">{location.state.pendings?.name}/{location.state.pendingtopics?.name}</h5>
                                    }
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleChange1} aria-label="basic tabs content-example">
                                                <Tab label="Video" {...a11yProps(0)} />
                                                <Tab label="e-Content" {...a11yProps(1)} />
                                                <Tab label="Test" {...a11yProps(2)} />
                                                <Tab label="Doubt" {...a11yProps(3)} />
                                                <Tab label="Assignment" {...a11yProps(4)} />
                                                <Tab label="Revision" {...a11yProps(5)} />
                                                <Tab label="Discussion" {...a11yProps(6)} />
                                            </Tabs>
                                        </Box>
                                        <CustomTabPanel value={value} index={0}>
                                            <div className="content-tab">
                                                {`${videos?.s_url}` ?
                                                    <div>
                                                        <div className="people-watching">
                                                            <img src={`${assetUrl}/video%20eye%20view.svg`} alt="" />34
                                                        </div>


                                                        <div className="video_container">

                                                        </div>

                                                        <ReactPlayer duration={formatDuration} currentTime={formatCurrentTime} ref={videoPlayerRef} width="100%" height="500px" style={{ borderRadius: '5px' }} url={videos.s_url} controls={true}

                                                            onProgress={() => {
                                                                videoPlayerRef.current.getCurrentTime() >= played1 &&
                                                                    setPlayed1(videoPlayerRef.current.getCurrentTime())
                                                                setTimeLine(formatTime(videoPlayerRef.current.getCurrentTime()))
                                                            }}

                                                            onSeek={() => {
                                                                videoPlayerRef.current.getCurrentTime() > played1 &&
                                                                    videoPlayerRef.current.seekTo(played1)
                                                            }}
                                                        />

                                                    </div> :
                                                    <div>  <Alert severity="error" >No Data Available</Alert>  </div>
                                                }

                                                <div className="video-rating video-tating-tab">
                                                    <span className="float-left">
                                                        <ul>
                                                            <li>
                                                                <img src={`${assetUrl}/video%20like.svg`} alt="" className={`${activeBtn === "like" ? "like-active" : ""}`}
                                                                    onClick={() => handleLikeClick(videos._id, videos.ttl_cnt?.like)} />
                                                                {likeCount}
                                                                <span></span>

                                                            </li>
                                                            <li>
                                                                <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`${activeBtn === "dislike" ? "dislike-active" : ""}`}
                                                                    onClick={() => handleDisikeClick(videos._id, videos.ttl_cnt?.dlike)} />
                                                                <span>
                                                                    {dislikeCount}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span style={{ 'cursor': 'pointer' }}
                                                                    onClick={() => handlevideoComment(videos._id)}
                                                                >
                                                                    <CommentOutlinedIcon style={{ 'position': 'relative', 'top': '7px', 'color': '#0275b1', 'width': '18px' }} />&nbsp;&nbsp;
                                                                    <span>Comment</span>
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <img src={`${assetUrl}/video%20share.svg`} alt="" /><span>Share
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span style={{ 'cursor': 'pointer' }}
                                                                    onClick={() => videoFeedBack(videos._id)}  ><img src={`${assetUrl}/video%20feed%20back.svg`} alt="" /><span>Feedback</span></span>
                                                            </li>
                                                            <li>
                                                                <div className="add-timeline">
                                                                    <EditNoteIcon style={{ 'color': '#0275b1' }} />
                                                                    <span style={{ 'color': 'black','cursor':'pointer' }} onClick={timelinepopup}>Timeline</span>
                                                                    {showTimeline ?
                                                                        <div className="addtimeline-form">
                                                                            <div className="form-group mb-1">
                                                                                <label>Add timeline</label>
                                                                                <AppInput type="text" value={timeLine} styleClass="w-100" label="" name="note" id="note" radius="5px" placeholder="Add Time Line here" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTimeLineChange(e)} />
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <AppButton children="Cancel" onClick={timelinepopupclose} styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                                                                {(`${timeLineBtn}` == 'Save') ?
                                                                                    <AppButton children={timeLineBtn} styleClass='btn primary-bg text-white  pl-2 pr-2' onClick={() => timelineSubmit(videos._id)} />

                                                                                    : <AppButton children={timeLineBtn} styleClass='btn primary-bg text-white  pl-2 pr-2' onClick={() => updateTimeLine(videos._id)} />}
                                                                            </div>
                                                                        </div> : ''}
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </span>

                                                    <span className="float-right topicpage-lan">
                                                        <div className="select-language">
                                                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                <Select
                                                                    value={videolang}
                                                                    onChange={handleChangevideo}
                                                                    displayEmpty
                                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                                >
                                                                    <MenuItem value="">
                                                                        <em>Select</em>
                                                                    </MenuItem>
                                                                    <MenuItem value='English' onClick={() => getLanguageVideoContent(1)}>English</MenuItem>
                                                                    <MenuItem value='Hindi' onClick={() => getLanguageVideoContent(6)} >Hindi</MenuItem>
                                                                </Select>

                                                            </FormControl>
                                                        </div>
                                                    </span>
                                                    <div className="clearfix"></div>
                                                </div>

                                                <div className="videos-line"></div>

                                                {videoAndTLines ?
                                                    <div className="play-stops">
                                                        <Carousel responsive={responsive} className="pay-stops-items">
                                                            {(`${act_ype}` == 'Teacher') ?
                                                                videoAndTLines.videoAndTLine?.t_lines?.map((tline: any, i: Number) => (
                                                                    <div>
                                                                        <div className="video-play-stopes-item">
                                                                            <div className="video-play-stopes-item-left">
                                                                            </div>
                                                                            <div className="video-play-stopes-item-center">
                                                                                {location.state.chapterName ?
                                                                                    <p className="m-0" title={location.state.topicName}>{location.state.topicName?.slice(0, 20)}...</p>
                                                                                    :
                                                                                    <p className="m-0" title={location.state.topicName}>{location.state.pendingtopics?.name?.slice(0, 20)}...</p>
                                                                                }
                                                                                <small>{tline.name}</small>
                                                                                <div className="mt-1">
                                                                                    <div className="w-50" >
                                                                                        &nbsp;<span style={{ 'cursor': 'pointer' }} onClick={() => seekValue(tline.time)}>{`${tline.time} min`}</span>
                                                                                    </div>
                                                                                    <div className="clearfix"></div>
                                                                                </div>
                                                                            </div>
                                                                            <i className="fa fa-pencil" style={{ "cursor": "pointer" }} onClick={(e: any) => videoTimeLineEdit(tline, videoAndTLines.videoAndTLine?._id)}
                                                                                aria-hidden="true"> </i>
                                                                            &nbsp;&nbsp;
                                                                            <i className="fa fa-trash" style={{ "cursor": "pointer" }}
                                                                                // onClick={() => deleteVideoTimeLine(tline?._id, videos._id)} 
                                                                                onClick={() => {
                                                                                    setTlineId(tline?._id)
                                                                                    setTlineVId(videos._id)
                                                                                    setVTlineDeletepopup(true)
                                                                                }
                                                                                }
                                                                                aria-hidden="true"></i>
                                                                            <div className="clearfix"></div>
                                                                        </div>
                                                                    </div>)) :
                                                                userVideoTLines.userVideoTLine?.map((timeline: any, i: Number) => (
                                                                    <div>
                                                                        <div className="video-play-stopes-item">
                                                                            <div className="video-play-stopes-item-left">
                                                                            </div>
                                                                            <div className="video-play-stopes-item-center">
                                                                                {location.state.chapterName ?
                                                                                    <p className="m-0" title={location.state.topicName}>{location.state.topicName?.slice(0, 20)}...</p>
                                                                                    :
                                                                                    <p className="m-0" title={location.state.topicName}>{location.state.pendingtopics?.name?.slice(0, 20)}...</p>
                                                                                }
                                                                                <small>{timeline.name}</small>
                                                                                <div className="mt-1">
                                                                                    <div className="w-50">
                                                                                        &nbsp;<span style={{ 'cursor': 'pointer' }} onClick={() => seekValue(timeline.f_ts)}>{`${timeline.f_ts} min`}</span>
                                                                                    </div>
                                                                                    <div className="clearfix"></div>
                                                                                </div>
                                                                            </div>
                                                                            <i className="fa fa-pencil" style={{ "cursor": "pointer" }} onClick={(e: any) => userTimeLineEdit(timeline)}
                                                                                aria-hidden="true"> </i>
                                                                            &nbsp;&nbsp;
                                                                            <i className="fa fa-trash" style={{ "cursor": "pointer" }}
                                                                                //  onClick={() => deleteVideoTimeLine(timeline?._id, videos._id)} 
                                                                                onClick={() => {
                                                                                    setTlineId(timeline?._id)
                                                                                    setTlineVId(videos._id!)
                                                                                    setVTlineDeletepopup(true)
                                                                                }
                                                                                }
                                                                                aria-hidden="true"></i>
                                                                            <div className="clearfix"></div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </Carousel>
                                                    </div> : ''}

                                                <div className="video-grid-section">

                                                </div>
                                                <div className="topic-fixed-content">
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} md={6}>
                                                            {videocomments.length ? <h4 className="mb-2">Comments</h4> : ''}
                                                            {videocomments.length ? videocomments.map((data: any, i: number) =>
                                                                <div className="comment-item comment-video mb-1 mt-2">
                                                                    <div className="comment-item-img">
                                                                        <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                    </div>

                                                                    <div className="comment-item-con">
                                                                        {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                            <span className="float-right">
                                                                                <i className="fa fa-pencil"  style={{ "cursor": "pointer" }}
                                                                                    onClick={(e: any) => videocommentedit(data)}
                                                                                    aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i className="fa fa-trash" 
                                                                                        onClick={() => {
                                                                                            setVID(data.v_id)
                                                                                            setVCID(data._id)
                                                                                            setTID(data.t_id)
                                                                                            setDeletepopup(true)
                                                                                        }
                                                                                        }
                                                                                        style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                            </span> : ''}
                                                                        <h5>{data?.user_name}</h5>
                                                                        <p>{data?.c_text}</p>

                                                                        <ul>
                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20like.svg`} alt="" className={(`${vcommentactiveBtn === "like"}` && i == listLikeIndex) ? "like-active" : ""}
                                                                                    onClick={() => {
                                                                                        listLikeIndex === i ? setListLikeIndex(undefined) : setListLikeIndex(i);
                                                                                        likeClick(data)
                                                                                    }} />
                                                                                {data.like}
                                                                            </li>
                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${vcommentactiveBtn === "dislike"}` && i == listdisLikeIndex) ? "dislike-active" : ""}
                                                                                    onClick={() => {
                                                                                        listdisLikeIndex === i ? setListdisLikeIndex(undefined) : setListdisLikeIndex(i);
                                                                                        dislikeClick(data)
                                                                                    }
                                                                                    } />
                                                                                {data.dlike}
                                                                            </li>
                                                                            <li style={{ 'cursor': 'pointer' }} >
                                                                                <span
                                                                                    onClick={() => {
                                                                                        listIndex === i ? setListIndex(undefined) : setListIndex(i);
                                                                                        setVideoReplyText('')
                                                                                    }}
                                                                                ><ReplyIcon style={{ 'position': 'relative', 'top': '6px', 'color': '#0275b1', }} />&nbsp;Reply</span>
                                                                            </li>

                                                                        </ul>



                                                                        {i === listIndex ?
                                                                            <div className="reply-form mt-2">
                                                                                <TextField id="standard-basic"
                                                                                    value={videoreplytext}
                                                                                    onChange={handleVideoReplyChange}
                                                                                    label="Add a reply here..." variant="standard" className="w-100" placeholder='Add a reply here...' />

                                                                                <div className="text-right mt-1">
                                                                                    <AppButton children="Cancel"
                                                                                        onClick={videoReplyCancel}
                                                                                        styleClass='btn cancel-outline mr-2' />
                                                                                    <AppButton children="Reply"
                                                                                        onClick={() => videoReplySubmit(data)}
                                                                                        styleClass='btn save-btn  primary-bg text-white' />
                                                                                </div>
                                                                            </div> : ' '
                                                                        }



                                                                        <div className="replies-content">
                                                                            {data.reply.length ? <div className="reply-btn"
                                                                                onClick={() => { listvideoreplyIndex === i ? setListVideoreplyIndex(undefined) : setListVideoreplyIndex(i); }}>

                                                                                <span>{data.reply.length}&nbsp;reply </span>
                                                                                {i === listvideoreplyIndex ? <ExpandLess /> : <ExpandMore />}</div> : ''}

                                                                            <Collapse in={i === listvideoreplyIndex} timeout="auto" unmountOnExit>
                                                                                <div className="second-reply-con">

                                                                                    {data.reply && data.reply.length && (
                                                                                        <div>
                                                                                            {data.reply.length ? data.reply.map((rdata: any, j: number) =>
                                                                                                <div className="comment-item mb-1 mt-2">
                                                                                                    <div className="comment-item-img">
                                                                                                        <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                                                    </div>

                                                                                                    <div className="comment-item-con">
                                                                                                        {(`${rdata.ref_c_user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                                                            <span className="float-right">
                                                                                                                <i className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                                                    onClick={(e: any) => videocommentreplyedit(rdata, data)}
                                                                                                                    aria-hidden="true"></i>&nbsp;&nbsp;<i className="fa fa-trash"
                                                                                                                        onClick={() => videocommentreplydelete(rdata, data)}
                                                                                                                        style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                                                            </span>


                                                                                                            : ''}
                                                                                                        <h5>{rdata?.user_name}</h5>
                                                                                                        <p>{rdata?.val}</p>

                                                                                                        <ul>
                                                                                                            <li>
                                                                                                                <img src={`${assetUrl}/video%20like.svg`} className={(`${vcommentreplyactiveBtn === "like"}` && j == listreplyLikeIndex) ? "like-active" : ""}
                                                                                                                    onClick={() => {
                                                                                                                        listreplyLikeIndex === j ? setListReplyLikeIndex(undefined) : setListReplyLikeIndex(j);
                                                                                                                        replylikeClick(data, rdata)
                                                                                                                    }} />
                                                                                                                {rdata.like}

                                                                                                            </li>
                                                                                                            <li>
                                                                                                                <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${vcommentreplyactiveBtn === "dislike"}` && j == listreplydisLikeIndex) ? "dislike-active" : ""}
                                                                                                                    onClick={() => {
                                                                                                                        listreplydisLikeIndex === j ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(j);
                                                                                                                        replydislikeClick(data, rdata)
                                                                                                                    }}
                                                                                                                /> {rdata.dlike}
                                                                                                            </li>
                                                                                                            <li style={{ 'cursor': 'pointer' }} >
                                                                                                                <span
                                                                                                                    onClick={() => {
                                                                                                                        listreplyIndex === j ? setListReplyIndex(undefined) : setListReplyIndex(j);
                                                                                                                        setVideoReplyReplyText('')
                                                                                                                    }}
                                                                                                                ><ReplyIcon style={{ 'position': 'relative', 'top': '6px', 'color': '#0275b1', }} />&nbsp;Reply</span>
                                                                                                            </li>

                                                                                                        </ul>

                                                                                                        {j === listreplyIndex ?

                                                                                                            <div className="reply-form mt-2">
                                                                                                                <TextField id="standard-basic"
                                                                                                                    value={videoreplyreplytext}
                                                                                                                    onChange={handleVideoReplyReplyChange}
                                                                                                                    label="Add a reply1 here..." variant="standard" className="w-100" placeholder='Add a reply here...' />

                                                                                                                <div className="text-right mt-1">
                                                                                                                    <AppButton children="Cancel"
                                                                                                                        onClick={videoReplyReplyCancel}
                                                                                                                        styleClass='btn cancel-outline mr-2' />
                                                                                                                    <AppButton children="Reply"
                                                                                                                        onClick={() => videoReplyReplySubmit(data)}
                                                                                                                        styleClass='btn save-btn  primary-bg text-white' />
                                                                                                                </div>
                                                                                                            </div>


                                                                                                            : null}

                                                                                                    </div>
                                                                                                </div>
                                                                                            ) : ''}
                                                                                        </div>
                                                                                    )}

                                                                                </div>
                                                                            </Collapse>

                                                                            <div className="clearfix"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                            ) : ''}
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>

                                                            <div className="topic-fixed-content-righ mt-1t">
                                                                <div className="add-notes">
                                                                    <div className="">
                                                                        <span className="float-left">
                                                                            <p className="secondry-color m-0">My Notes</p>
                                                                        </span>
                                                                        <span className="float-right" style={{ 'cursor': 'pointer' }}>
                                                                            <small className="secondry-color" onClick={videoAddNote}>Add Note &nbsp;<img src={`${assetUrl}/video%20below%20share.svg`} alt="" /></small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                    </div>

                                                                    {videoshowhide ? <div className="add-note-form">
                                                                        <div className="form-group mb-1">
                                                                            <h4>Add New Note</h4>
                                                                            <label>Note</label>
                                                                            <AppInput type="text" value={videonote} label="" name="note" id="note" className="w-100" radius="5px" placeholder="Add Note here" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleVideoNoteChange(e)} />
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <AppButton children="Cancel" styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' onClick={videoCancel} />
                                                                            <AppButton children={videonoteBtn} styleClass='btn primary-bg text-white  pl-2 pr-2' onClick={videoNoteSubmit} />
                                                                        </div>

                                                                    </div> : null}

                                                                    <div className="addnotes-box">
                                                                        {videonotes.length ? videonotes.map((data: any, i: number) =>
                                                                            <div className="addnotes-box-bg mt-2">
                                                                                <div key={i}>
                                                                                    <span className="float-left">
                                                                                        <small>
                                                                                            {data.c_ts}
                                                                                        </small>
                                                                                    </span>
                                                                                    <span className="float-right">
                                                                                        <i className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                            onClick={(e: any) => videoNoteedit(data, i)}
                                                                                            aria-hidden="true"></i>&nbsp;&nbsp;
                                                                                        <i className="fa fa-trash"
                                                                                            onClick={() => {
                                                                                                setNoteId(data._id)
                                                                                                // setVTopicId(data.t_id)
                                                                                                setVNDeletepopup(true)
                                                                                            }
                                                                                            }
                                                                                            style={{ 'color': 'red', "cursor": "pointer"}} aria-hidden="true"></i>
                                                                                    </span>
                                                                                    <div className="clearfix"></div>
                                                                                    <p >{data?.n_text}</p>
                                                                                    <div className="clearfix"></div>

                                                                                </div>

                                                                            </div>
                                                                        ) : <div className="mt-1">
                                                                        </div>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>

                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={1}>

                                            <div className="e-content">

                                                {bookecontents1.length > 0 ? <div>
                                                    <h2 className="mt-3" style={{ 'color': '#0275B1' }}>Book e-Content</h2>
                                                    <p>
                                                        {bookecontents1 && bookecontents1.map((con: any, i: number) =>
                                                            <div className="content" dangerouslySetInnerHTML={{ __html: con.text }}></div>
                                                        )}
                                                    </p>

                                                    <div className="topic-fixed-content-left">
                                                        <div className="video-rating border-top">
                                                            <ul>
                                                                <li>
                                                                    <img src={`${assetUrl}/video%20like.svg`} alt="" className={`btn ${contentactiveBtn === "like" ? "like-active" : ""}`}
                                                                        onClick={(e: any) => contentLikeClick("book_e-content", "level_1")}
                                                                    />
                                                                    <span>
                                                                        {contentlikeCount}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`btn ${contentactiveBtn === "dislike" ? "dislike-active" : ""}`}
                                                                        onClick={(e: any) => contentDisikeClick("book_e-content", "level_1")} /><span>
                                                                        {contentdislikeCount}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span style={{ 'cursor': 'pointer' }} onClick={() => handleContentComment(bookecontents1[0]?._id, "book_e-content", "level_1")}
                                                                    >
                                                                        <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                        <span>Comment</span>
                                                                    </span>
                                                                </li>

                                                                <li>
                                                                    <img src={`${assetUrl}/video%20share.svg`} alt="" /><span>
                                                                        Share
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span style={{ 'cursor': 'pointer' }}
                                                                        onClick={(e: any) => aie1feedbackData("book_e-content", "level_1")}
                                                                    ><img src={`${assetUrl}/video%20feed%20back.svg`} alt="" /><span>Feedback</span></span>
                                                                </li>
                                                                <li className="float-right">
                                                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                        <Select
                                                                            value={booklang}
                                                                            onChange={handleChangebook}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            <MenuItem value="">
                                                                                <em>Select</em>
                                                                            </MenuItem>
                                                                            <MenuItem value="English" onClick={() => getLanguagebookContent(1)}>English</MenuItem>
                                                                            <MenuItem value="Hindi" onClick={() => getLanguagebookContent(6)} >Hindi</MenuItem>
                                                                        </Select>

                                                                    </FormControl>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                    </div>


                                                    <Grid item xs={12} md={12}>
                                                        {bookEcontentcommentlevel1?.bookEcontentcommentslevels1?.length ? <h4 className="mb-2">Comments</h4> : ''}
                                                        {bookEcontentcommentlevel1?.bookEcontentcommentslevels1?.length ? bookEcontentcommentlevel1?.bookEcontentcommentslevels1?.map((data: any, i: number) =>
                                                            <div className="comment-item mb-1">
                                                                <div className="comment-item-img">
                                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                </div>

                                                                <div className="comment-item-con">
                                                                    {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                        <span className="float-right">
                                                                            <i className="fa fa-pencil" style={{ "cursor": "pointer" }} onClick={(e: any) => contentcommenteditV2(data, "book_e-content", bookecontents1[0]?._id)}
                                                                                aria-hidden="true"></i>&nbsp;&nbsp;
                                                                            <i className="fa fa-trash"  onClick={() => contentcommentdeleteconfirmv2(data, "book_e-content", bookecontents1[0]?._id)}
                                                                                style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                        </span> : ''}
                                                                    <h5>{data?.user_name}</h5>
                                                                    <p>{data?.c_text}</p>


                                                                    <ul>
                                                                        <li>

                                                                            <img src={`${assetUrl}/video%20like.svg`} className={(`${cmtlikeactiveBtn === "like"}` && i == listreplyLikeIndex) ? "like-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplyLikeIndex === i ? setListReplyLikeIndex(undefined) : setListReplyLikeIndex(i);
                                                                                    handleCommentLikeClick(data, "level_1", "book_e-content")
                                                                                }} />

                                                                            <span> {data?.like}</span>

                                                                        </li>
                                                                        <li>

                                                                            <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${cmtlikeactiveBtn === "dislike"}` && i == listreplydisLikeIndex) ? "dislike-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplydisLikeIndex === i ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(i);
                                                                                    handleCommentDisikeClick(data, "level_1", "book_e-content")
                                                                                }}
                                                                            />
                                                                            <span>
                                                                                {data?.dlike}
                                                                            </span>
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa fa-comment-o" aria-hidden="true" ></i>&nbsp;
                                                                            <span
                                                                                onClick={() => {
                                                                                    listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                    handleCommentReply(data, "level_1", "book_e-content")
                                                                                }}
                                                                            >Reply</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                {data.reply && data.reply.length > 0 && (
                                                                    <div>
                                                                        {data.reply.map((reply: any, replyIndex: any) => (
                                                                            <div key={replyIndex}>

                                                                                <div className="comment-item-img">
                                                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                                </div>

                                                                                {`${reply.ref_c_user_id}` == localStorage.getItem('Tokenuserid') && (
                                                                                    <span className="float-right">
                                                                                        <i
                                                                                            className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                            onClick={(e: any) => editReplyV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "book_e-content", "levelType": "level_1" }, reply?.val)}
                                                                                            aria-hidden="true"
                                                                                        ></i>
                                                                                        &nbsp;&nbsp;
                                                                                        <i
                                                                                            className="fa fa-trash" 
                                                                                            onClick={() => deleteReplyconfirmV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "book_e-content", "levelType": "level_1" })}
                                                                                            style={{ color: 'red', cursor: 'pointer' }}
                                                                                            aria-hidden="true"
                                                                                        ></i>
                                                                                    </span>
                                                                                )}
                                                                                <h5>{reply?.user_name}</h5>
                                                                                <p>{reply?.val}</p>
                                                                                <div className="video-rating ">
                                                                                    <ul>
                                                                                        <li>
                                                                                            <img
                                                                                                src={`${assetUrl}/video%20like.svg`}
                                                                                                className={`${cmtlikeactiveBtn === "like" && i === listreplyLikeIndex ? "like-active" : ""}`}
                                                                                                onClick={() => {
                                                                                                    listreplyLikeIndex === i ? setListReplyLikeIndex(undefined) : setListReplyLikeIndex(i);
                                                                                                    handleCommentLikeClick(data, "level_1", "book_e-content");
                                                                                                }}
                                                                                            />
                                                                                            <span>{reply?.like}</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <img
                                                                                                src={`${assetUrl}/video%20dis%20like.svg`}
                                                                                                alt=""
                                                                                                className={`${cmtlikeactiveBtn === "dislike" && i === listreplydisLikeIndex ? "dislike-active" : ""}`}
                                                                                                onClick={() => {
                                                                                                    listreplydisLikeIndex === i ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(i);
                                                                                                    handleCommentDisikeClick(data, "level_1", "book_e-content");
                                                                                                }}
                                                                                            />
                                                                                            <span>{reply?.dlike}</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                            <span
                                                                                                onClick={() => {
                                                                                                    listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                    handleCommentReply(data, "level_1", "book_e-content");
                                                                                                }}
                                                                                            >
                                                                                                Reply
                                                                                            </span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : ''}
                                                    </Grid>
                                                </div> : ''}

                                                {(aiecontents1.length > 0 || aiecontents2.length > 0 || aiecontents3.length > 0 || aiecontents4.length > 0) ?
                                                    <div>
                                                        <h2 className="mt-3" style={{ 'color': '#0275B1' }}>AI e-Content</h2>


                                                        {aiecontents1.length > 0 ?
                                                            <div>
                                                                <h3 className="mt-2" style={{ 'color': '#0275B1' }}>AI e-Content Level 1 :</h3>

                                                                <div>
                                                                    {aiecontents1?.length && aiecontents1.map((con: any, i: number) =>
                                                                        <div className="content" dangerouslySetInnerHTML={{ __html: con.text }}></div>


                                                                    )}
                                                                </div>
                                                                <div className="topic-fixed-content-left">

                                                                    <div className="video-rating border-top">
                                                                        <ul>
                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20like.svg`} alt="" className={` ${aie1contentactiveBtn === "like" ? "like-active" : ""}`}
                                                                                    onClick={(e: any) => aie1contentLikeClick("ai_e-content", "level_1")} />
                                                                                <span>
                                                                                    {aie1contentlikeCount}
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={` ${aie1contentactiveBtn === "dislike" ? "dislike-active" : ""}`} onClick={(e: any) => aie1contentDisikeClick("ai_e-content", "level_1")} /><span>
                                                                                    {aie1contentdislikeCount}
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span style={{ 'cursor': 'pointer' }} onClick={() => handleEContentComment(aiecontents1[0]?._id, "ai_e-content", "level_1")}
                                                                                >
                                                                                    <CommentOutlinedIcon style={{ 'position': 'relative', 'top': '7px', 'color': '#0275b1', 'width': '18px' }} />&nbsp;
                                                                                    <span>Comment</span>
                                                                                </span>
                                                                            </li>

                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20share.svg`} alt="" /><span>
                                                                                    Share
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span style={{ 'cursor': 'pointer' }}
                                                                                    onClick={(e: any) => aie1feedbackData("ai_e-content", "level_1")}
                                                                                ><img src={`${assetUrl}/video%20feed%20back.svg`} alt="" /><span>Feedback</span></span>
                                                                            </li>
                                                                            <li className="float-right topicpage-lan">
                                                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                                    <Select
                                                                                        value={aie1lang}
                                                                                        onChange={handleChangeaie1}
                                                                                        displayEmpty
                                                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                                                    >
                                                                                        <MenuItem value="">
                                                                                            <em>Select</em>
                                                                                        </MenuItem>
                                                                                        <MenuItem value="English" onClick={() => getLanguageaie1Content(1)}>English</MenuItem>
                                                                                        <MenuItem value="Hindi" onClick={() => getLanguageaie1Content(6)} >Hindi</MenuItem>
                                                                                    </Select>

                                                                                </FormControl>
                                                                            </li>
                                                                        </ul>

                                                                    </div>

                                                                </div>

                                                                <Grid item xs={12} md={12}>
                                                                    {econtentcommentslevels1?.length ? <h4 className="mb-2">Comments</h4> : ''}
                                                                    {econtentcommentslevels1?.length ? econtentcommentslevels1?.map((data: any, i: number) =>
                                                                        <div className="comment-item mb-1" key={i}>
                                                                            <div className="comment-item-img">
                                                                                <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                            </div>

                                                                            <div className="comment-item-con">
                                                                                <div>
                                                                                    {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                                        <div>
                                                                                            <span className="float-left">
                                                                                                <h5>{data?.user_name}</h5>
                                                                                            </span>
                                                                                            <span className="float-right">
                                                                                                <i className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                                    onClick={(e: any) => econtentcommentedit(data, aiecontents1[0]?._id, "level_1")}
                                                                                                    aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;
                                                                                                <i className="fa fa-trash"
                                                                                                    onClick={() => econtentcommentdeleteconfirm(data, "level_1", aiecontents1[0]?._id)}
                                                                                                    style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                                            </span>
                                                                                            <div className="clearfix"></div>
                                                                                            <p>{data?.c_text}</p>

                                                                                        </div>


                                                                                        : ''}
                                                                                    <div className="clearfix"></div>

                                                                                </div>

                                                                                <ul>
                                                                                    <li>
                                                                                        <img src={`${assetUrl}/video%20like.svg`} className={(`${cmtlikeactiveBtn === "like"}` && i == lista1creplyLikeIndex) ? "like-active" : ""}
                                                                                            onClick={() => {
                                                                                                lista1creplyLikeIndex === i ? setListA1CReplyLikeIndex(undefined) : setListA1CReplyLikeIndex(i);
                                                                                                handleCommentLikeClick(data, "level_1", "ai_e-content")
                                                                                            }} />
                                                                                        <span> {data?.like}</span>

                                                                                    </li>
                                                                                    <li>
                                                                                        <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${cmtlikeactiveBtn === "dislike"}` && i == lista1creplydisLikeIndex) ? "dislike-active" : ""}
                                                                                            onClick={() => {
                                                                                                lista1creplydisLikeIndex === i ? setListA1CReplydisLikeIndex(undefined) : setListA1CReplydisLikeIndex(i);
                                                                                                handleCommentDisikeClick(data, "level_1", "ai_e-content")
                                                                                            }}
                                                                                        />
                                                                                        <span>
                                                                                            {data?.dlike}
                                                                                        </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <ReplyIcon style={{ 'position': 'relative', 'top': '6px', 'color': 'rgb(2, 117, 177)' }} />
                                                                                        <span
                                                                                            onClick={() => {
                                                                                                listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                handleCommentReply(data, "level_1", "ai_e-content")
                                                                                            }}
                                                                                        >Reply</span>
                                                                                    </li>
                                                                                </ul>
                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                            <div className="clearfix"></div>

                                                                            <div className="replies-content">
                                                                                <div className="reply-btn"
                                                                                    onClick={() => {
                                                                                        listaie1replyIndex === i ? setListAie1replyIndex(undefined) : setListAie1replyIndex(i);
                                                                                    }}
                                                                                ><span>{data.reply.length}&nbsp;reply </span>
                                                                                    {i == listaie1replyIndex! ? <ExpandLess /> : <ExpandMore />}</div>

                                                                                <Collapse in={i == listaie1replyIndex} timeout="auto" unmountOnExit>
                                                                                    <div className="second-reply-con">

                                                                                        {data.reply && data.reply.length && (
                                                                                            <div>
                                                                                                {data.reply.map((reply: any, replyIndex: any) => (
                                                                                                    <div key={replyIndex}>

                                                                                                        <div className="comment-item-img">
                                                                                                            <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                                                        </div>
                                                                                                        <div className="comment-item-con">
                                                                                                            {`${reply.ref_c_user_id}` == localStorage.getItem('Tokenuserid') && (
                                                                                                                <div>
                                                                                                                    <span className="float-left"><h4>{reply?.user_name}</h4></span>
                                                                                                                    <span className="float-right">
                                                                                                                        <i
                                                                                                                            className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                                                            onClick={(e: any) => editReplyV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "ai_e-content", "levelType": "level_1" }, reply?.val)}
                                                                                                                            aria-hidden="true"
                                                                                                                        ></i>&nbsp;&nbsp;&nbsp;
                                                                                                                        <i
                                                                                                                            className="fa fa-trash" 
                                                                                                                            onClick={() => deleteReplyconfirmV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "ai_e-content", "levelType": "level_1" })}
                                                                                                                            style={{ color: 'red', cursor: 'pointer' }}
                                                                                                                            aria-hidden="true"
                                                                                                                        ></i>
                                                                                                                    </span>
                                                                                                                    <div className="clearfix"></div>
                                                                                                                    <p>{reply?.val}</p>
                                                                                                                </div>

                                                                                                            )}
                                                                                                        </div>


                                                                                                        <div className="video-rating ">
                                                                                                            <ul>
                                                                                                                <li>
                                                                                                                    <img
                                                                                                                        src={`${assetUrl}/video%20like.svg`}
                                                                                                                        className={`${cmtReplylikeBtn === "like" && rliked === i + replyIndex + "ai_e-content" + "level_1" ? "like-active" : ""}`}
                                                                                                                        onClick={() => {
                                                                                                                            handleReplyLikeClickV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "ai_e-content", "level_1", i, replyIndex);
                                                                                                                        }}
                                                                                                                    />
                                                                                                                    <span>{reply?.like}</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <img
                                                                                                                        src={`${assetUrl}/video%20dis%20like.svg`}
                                                                                                                        className={`${cmtReplylikeBtn === "dislike" && rdliked === i + replyIndex + "ai_e-content" + "level_1" ? "dislike-active" : ""}`}
                                                                                                                        onClick={() => {
                                                                                                                            handleReplyDislikeClickV1({ "e_c_id": data?._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "ai_e-content", "level_1", i, replyIndex);
                                                                                                                        }}
                                                                                                                    />
                                                                                                                    <span>{reply?.dlike}</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <ReplyIcon style={{ 'position': 'relative', 'top': '6px', 'color': 'rgb(2, 117, 177)' }} />&nbsp;
                                                                                                                    <span
                                                                                                                        onClick={() => {
                                                                                                                            listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                                            handleCommentReply(data, "level_1", "ai_e-content");
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        Reply
                                                                                                                    </span>
                                                                                                                </li>
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        )}

                                                                                    </div>
                                                                                </Collapse>

                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                        </div>
                                                                    ) : ''}
                                                                </Grid>

                                                            </div> : ''}

                                                        {aiecontents2.length > 0 ?
                                                            <div>
                                                                <h3 className="mt-2" style={{ 'color': '#0275B1' }}>AI e-Content Level 2 :</h3>

                                                                <div>
                                                                    {aiecontents2 && aiecontents2.map((con: any, i: number) =>
                                                                        <div className="content" dangerouslySetInnerHTML={{ __html: con.text }}></div>

                                                                    )}
                                                                </div>

                                                                <div className="topic-fixed-content-left">

                                                                    <div className="video-rating border-top">
                                                                        <ul>
                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20like.svg`} alt="" className={`btn ${aie2contentactiveBtn === "like" ? "like-active" : ""}`}
                                                                                    onClick={(e: any) => aie2contentLikeClick("ai_e-content", "level_2")} />
                                                                                <span>
                                                                                    {aie2contentlikeCount}
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`btn ${aie2contentactiveBtn === "dislike" ? "dislike-active" : ""}`} onClick={(e: any) => aie2contentDisikeClick("ai_e-content", "level_2")} /><span>
                                                                                    {aie2contentdislikeCount}
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span style={{ 'cursor': 'pointer' }} onClick={() => handleEContentComment(aiecontents2[0]?._id, "ai_e-content", "level_2")}
                                                                                >
                                                                                    <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                    <span>Comment</span>
                                                                                </span>
                                                                            </li>

                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20share.svg`} alt="" /><span>
                                                                                    Share
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span style={{ 'cursor': 'pointer' }}
                                                                                    onClick={(e: any) => aie1feedbackData("ai_e-content", "level_2")}
                                                                                ><img src={`${assetUrl}/video%20feed%20back.svg`} alt="" /><span>Feedback</span></span>
                                                                            </li>
                                                                            <li className="float-right">
                                                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                                    <Select
                                                                                        value={aie2lang}
                                                                                        onChange={handleChangeaie2}
                                                                                        displayEmpty
                                                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                                                    >
                                                                                        <MenuItem value="">
                                                                                            <em>Select</em>
                                                                                        </MenuItem>
                                                                                        <MenuItem value="English" onClick={() => getLanguageaie2Content(1)}>English</MenuItem>
                                                                                        <MenuItem value="Hindi" onClick={() => getLanguageaie2Content(6)} >Hindi</MenuItem>
                                                                                    </Select>

                                                                                </FormControl>
                                                                            </li>
                                                                        </ul>
                                                                    </div>

                                                                </div>


                                                                <Grid item xs={12} md={12}>
                                                                    {econtentcommentslevels2?.length ? <h4 className="mb-2">Comments</h4> : ''}
                                                                    {econtentcommentslevels2?.length ? econtentcommentslevels2?.map((data: any, i: number) =>
                                                                        <div className="comment-item mb-1">
                                                                            <div className="comment-item-img">
                                                                                <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                            </div>

                                                                            <div className="comment-item-con">
                                                                                {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                                    <span className="float-right">
                                                                                        <i className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                            onClick={(e: any) => econtentcommentedit(data, aiecontents2[0]?._id, "level_2")}
                                                                                            aria-hidden="true"></i>&nbsp;&nbsp;
                                                                                        <i className="fa fa-trash"
                                                                                            onClick={() => econtentcommentdeleteconfirm(data, "level_2", aiecontents2[0]?._id)}
                                                                                            style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                                    </span> : ''}
                                                                                <h5>{data?.user_name}</h5>
                                                                                <p>{data?.c_text}</p>


                                                                                <ul>
                                                                                    <li> <img src={`${assetUrl}/video%20like.svg`} className={(`${cmtlikeactiveBtn === "like"}` && i == lista2creplyLikeIndex) ? "like-active" : ""}
                                                                                        onClick={() => {
                                                                                            lista2creplyLikeIndex === i ? setListA2CReplyLikeIndex(undefined) : setListA2CReplyLikeIndex(i);
                                                                                            handleCommentLikeClick(data, "level_2", "ai_e-content")
                                                                                        }} />
                                                                                        <span> {data?.like}</span>

                                                                                    </li>
                                                                                    <li>
                                                                                        <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${cmtlikeactiveBtn === "dislike"}` && i == lista2creplydisLikeIndex) ? "dislike-active" : ""}
                                                                                            onClick={() => {
                                                                                                lista2creplydisLikeIndex === i ? setListA2CReplydisLikeIndex(undefined) : setListA2CReplydisLikeIndex(i);
                                                                                                handleCommentDisikeClick(data, "level_2", "ai_e-content")
                                                                                            }}
                                                                                        />
                                                                                        <span>
                                                                                            {data?.dlike}
                                                                                        </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <i className="fa fa-comment-o" aria-hidden="true" ></i>&nbsp;
                                                                                        <span
                                                                                            onClick={() => {
                                                                                                listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                handleCommentReply(data, "level_2", "ai_e-content")
                                                                                            }}
                                                                                        >Reply</span>
                                                                                    </li>
                                                                                </ul>
                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                            <div className="clearfix"></div>

                                                                            <div className="replies-content">
                                                                                <div className="reply-btn"
                                                                                    onClick={() => {
                                                                                        listaie1replyIndex === '2' + i ? setListAie1replyIndex(undefined) : setListAie1replyIndex('2' + i);
                                                                                    }}
                                                                                ><span>{data.reply.length}&nbsp;reply </span>
                                                                                    {'2' + i == listaie1replyIndex! ? <ExpandLess /> : <ExpandMore />}</div>

                                                                                <Collapse in={'2' + i == listaie1replyIndex} timeout="auto" unmountOnExit>
                                                                                    <div className="second-reply-con">
                                                                                        {data.reply && data.reply.length > 0 && (
                                                                                            <div>

                                                                                                <div className="comment-item-img">
                                                                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                                                </div>

                                                                                                {data.reply.map((reply: any, replyIndex: any) => (
                                                                                                    <div key={replyIndex}>
                                                                                                        {`${reply.ref_c_user_id}` == localStorage.getItem('Tokenuserid') && (
                                                                                                            <span className="float-right">
                                                                                                                <i
                                                                                                                    className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                                                    onClick={(e: any) => editReplyV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "ai_e-content", "levelType": "level_2" }, reply?.val)}
                                                                                                                    aria-hidden="true"
                                                                                                                ></i>
                                                                                                                &nbsp;&nbsp;
                                                                                                                <i
                                                                                                                    className="fa fa-trash"
                                                                                                                    onClick={() => deleteReplyconfirmV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "ai_e-content", "levelType": "level_2" })}
                                                                                                                    style={{ color: 'red', cursor: 'pointer' }}
                                                                                                                    aria-hidden="true"
                                                                                                                ></i>
                                                                                                            </span>
                                                                                                        )}
                                                                                                        <h5>{reply?.user_name}</h5>
                                                                                                        <p>{reply?.val}</p>
                                                                                                        <div className="video-rating ">
                                                                                                            <ul>
                                                                                                                <li>
                                                                                                                    <img
                                                                                                                        src={`${assetUrl}/video%20like.svg`}
                                                                                                                        className={`${cmtReplylikeBtn === "like" && rliked === i + replyIndex + "ai_e-content" + "level_2" ? "like-active" : ""}`}
                                                                                                                        onClick={() => {
                                                                                                                            handleReplyLikeClickV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "ai_e-content", "level_2", i, replyIndex);
                                                                                                                        }}
                                                                                                                    />
                                                                                                                    <span>{reply?.like}</span>
                                                                                                                </li>
                                                                                                                <li>

                                                                                                                    <img
                                                                                                                        src={`${assetUrl}/video%20dis%20like.svg`}
                                                                                                                        className={`${cmtReplylikeBtn === "dislike" && rdliked === i + replyIndex + "ai_e-content" + "level_2" ? "dislike-active" : ""}`}
                                                                                                                        onClick={() => {
                                                                                                                            handleReplyDislikeClickV1({ "e_c_id": data?._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "ai_e-content", "level_2", i, replyIndex);
                                                                                                                        }}
                                                                                                                    />
                                                                                                                    <span>{reply?.dlike}</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                                                    <span
                                                                                                                        onClick={() => {
                                                                                                                            listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                                            handleCommentReply(data, "level_2", "ai_e-content");
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        Reply
                                                                                                                    </span>
                                                                                                                </li>
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </Collapse>

                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                        </div>
                                                                    ) : ''}
                                                                </Grid>
                                                            </div> : ''}

                                                        {aiecontents3.length > 0 ?
                                                            <div>
                                                                <h3 className="mt-2" style={{ 'color': '#0275B1' }}>AI e-Content Level 3 :</h3>

                                                                <div>
                                                                    {aiecontents3 && aiecontents3.map((con: any, i: number) =>
                                                                        <div className="content" dangerouslySetInnerHTML={{ __html: con.text }}></div>

                                                                    )}

                                                                </div>
                                                                <div className="topic-fixed-content-left">

                                                                    <div className="video-rating border-top">
                                                                        <ul>
                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20like.svg`} alt="" className={`btn ${aie3contentactiveBtn === "like" ? "like-active" : ""}`}
                                                                                    onClick={(e: any) => aie3contentLikeClick("ai_e-content", "level_3")} />
                                                                                <span>
                                                                                    {aie3contentlikeCount}
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`btn ${aie3contentactiveBtn === "dislike" ? "dislike-active" : ""}`} onClick={(e: any) => aie3contentDisikeClick("ai_e-content", "level_3")} /><span>
                                                                                    {aie3contentdislikeCount}
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span style={{ 'cursor': 'pointer' }} onClick={() => handleEContentComment(aiecontents3[0]?._id, "ai_e-content", "level_3")}
                                                                                >
                                                                                    <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                    <span>Comment</span>
                                                                                </span>
                                                                            </li>

                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20share.svg`} alt="" /><span>
                                                                                    Share
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span style={{ 'cursor': 'pointer' }}
                                                                                    onClick={(e: any) => aie1feedbackData("ai_e-content", "level_3")}
                                                                                ><img src={`${assetUrl}/video%20feed%20back.svg`} alt="" /><span>Feedback</span></span>
                                                                            </li>
                                                                            <li className="float-right">
                                                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                                    <Select
                                                                                        value={aie3lang}
                                                                                        onChange={handleChangeaie3}
                                                                                        displayEmpty
                                                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                                                    >
                                                                                        <MenuItem value="">
                                                                                            <em>Select</em>
                                                                                        </MenuItem>
                                                                                        <MenuItem value="English" onClick={() => getLanguageaie3Content(1)}>English</MenuItem>
                                                                                        <MenuItem value="Hindi" onClick={() => getLanguageaie3Content(6)} >Hindi</MenuItem>
                                                                                    </Select>

                                                                                </FormControl>
                                                                            </li>
                                                                        </ul>
                                                                    </div>

                                                                </div>


                                                                <Grid item xs={12} md={12}>
                                                                    {econtentcommentslevels3?.length ? <h4 className="mb-2">Comments</h4> : ''}
                                                                    {econtentcommentslevels3?.length ? econtentcommentslevels3?.map((data: any, i: number) =>
                                                                        <div className="comment-item mb-1">
                                                                            <div className="comment-item-img">
                                                                                <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                            </div>

                                                                            <div className="comment-item-con">
                                                                                {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                                    <span className="float-right">
                                                                                        <i className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                            onClick={(e: any) => econtentcommentedit(data, aiecontents3[0]?._id, "level_3")}
                                                                                            aria-hidden="true"></i>&nbsp;&nbsp;
                                                                                        <i className="fa fa-trash"
                                                                                            onClick={() => econtentcommentdeleteconfirm(data, "level_3", aiecontents3[0]?._id)}
                                                                                            style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                                    </span> : ''}
                                                                                <h5>{data?.user_name}</h5>
                                                                                <p>{data?.c_text}</p>


                                                                                <ul>
                                                                                    <li> <img src={`${assetUrl}/video%20like.svg`} className={(`${cmtlikeactiveBtn === "like"}` && i == listreplyLikeIndex) ? "like-active" : ""}
                                                                                        onClick={() => {
                                                                                            listreplyLikeIndex === i ? setListReplyLikeIndex(undefined) : setListReplyLikeIndex(i);
                                                                                            handleCommentLikeClick(data, "level_3", "ai_e-content")
                                                                                        }} />
                                                                                        <span> {data?.like}</span>

                                                                                    </li>
                                                                                    <li>
                                                                                        <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${cmtlikeactiveBtn === "dislike"}` && i == listreplydisLikeIndex) ? "dislike-active" : ""}
                                                                                            onClick={() => {
                                                                                                listreplydisLikeIndex === i ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(i);
                                                                                                handleCommentDisikeClick(data, "level_3", "ai_e-content")
                                                                                            }}
                                                                                        />
                                                                                        <span>
                                                                                            {data?.dlike}
                                                                                        </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <i className="fa fa-comment-o" aria-hidden="true" ></i>&nbsp;
                                                                                        <span
                                                                                            onClick={() => {
                                                                                                listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                handleCommentReply(data, "level_3", "ai_e-content")
                                                                                            }}
                                                                                        >Reply</span>
                                                                                    </li>
                                                                                </ul>
                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                            <div className="clearfix"></div>

                                                                            <div className="replies-content">
                                                                                <div className="reply-btn"
                                                                                    onClick={() => {
                                                                                        listaie1replyIndex === '3' + i ? setListAie1replyIndex(undefined) : setListAie1replyIndex('3' + i);
                                                                                    }}
                                                                                ><span>{data.reply.length}&nbsp;reply </span>
                                                                                    {'3' + i == listaie1replyIndex! ? <ExpandLess /> : <ExpandMore />}</div>

                                                                                <Collapse in={'3' + i == listaie1replyIndex} timeout="auto" unmountOnExit>
                                                                                    <div className="second-reply-con">
                                                                                        {data.reply && data.reply.length > 0 && (
                                                                                            <div>

                                                                                                <div className="comment-item-img">
                                                                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                                                </div>
                                                                                                {data.reply.map((reply: any, replyIndex: any) => (
                                                                                                    <div key={replyIndex}>
                                                                                                        {`${reply.ref_c_user_id}` == localStorage.getItem('Tokenuserid') && (
                                                                                                            <span className="float-right">
                                                                                                                <i
                                                                                                                    className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                                                    onClick={(e: any) => editReplyV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "ai_e-content", "levelType": "level_3" }, reply?.val)}
                                                                                                                    aria-hidden="true"
                                                                                                                ></i>
                                                                                                                &nbsp;&nbsp;
                                                                                                                <i
                                                                                                                    className="fa fa-trash"
                                                                                                                    onClick={() => deleteReplyconfirmV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "ai_e-content", "levelType": "level_3" })}
                                                                                                                    style={{ color: 'red', cursor: 'pointer' }}
                                                                                                                    aria-hidden="true"
                                                                                                                ></i>
                                                                                                            </span>
                                                                                                        )}
                                                                                                        <h5>{reply?.user_name}</h5>
                                                                                                        <p>{reply?.val}</p>
                                                                                                        <div className="video-rating ">
                                                                                                            <ul>
                                                                                                                <li>

                                                                                                                    <img
                                                                                                                        src={`${assetUrl}/video%20like.svg`}
                                                                                                                        className={`${cmtReplylikeBtn === "like" && rliked === i + replyIndex + "ai_e-content" + "level_3" ? "like-active" : ""}`}
                                                                                                                        onClick={() => {
                                                                                                                            handleReplyLikeClickV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "ai_e-content", "level_3", i, replyIndex);
                                                                                                                        }}
                                                                                                                    />
                                                                                                                    <span>{reply?.like}</span>
                                                                                                                </li>
                                                                                                                <li>

                                                                                                                    <img
                                                                                                                        src={`${assetUrl}/video%20dis%20like.svg`}
                                                                                                                        className={`${cmtReplylikeBtn === "dislike" && rdliked === i + replyIndex + "ai_e-content" + "level_3" ? "dislike-active" : ""}`}
                                                                                                                        onClick={() => {
                                                                                                                            handleReplyDislikeClickV1({ "e_c_id": data?._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "ai_e-content", "level_3", i, replyIndex);
                                                                                                                        }}
                                                                                                                    />
                                                                                                                    <span>{reply?.dlike}</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                                                    <span
                                                                                                                        onClick={() => {
                                                                                                                            listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                                            handleCommentReply(data, "level_3", "ai_e-content");
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        Reply
                                                                                                                    </span>
                                                                                                                </li>
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </Collapse>

                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                        </div>
                                                                    ) : ''}
                                                                </Grid>
                                                            </div> : ''}

                                                        {aiecontents4.length > 0 ?
                                                            <div>
                                                                <h3 className="mt-2" style={{ 'color': '#0275B1' }}>AI e-Content Level 4 :</h3>

                                                                <div>
                                                                    {aiecontents4 && aiecontents4.map((con: any, i: number) =>
                                                                        <div className="content" dangerouslySetInnerHTML={{ __html: con.text }}></div>
                                                                    )}

                                                                </div>
                                                                <div className="topic-fixed-content-left">

                                                                    <div className="video-rating border-top">
                                                                        <ul>
                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20like.svg`} alt="" className={`btn ${aie4contentactiveBtn === "like" ? "like-active" : ""}`}
                                                                                    onClick={(e: any) => aie4contentLikeClick("ai_e-content", "level_4")} />
                                                                                <span>
                                                                                    {aie4contentlikeCount}
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`btn ${aie4contentactiveBtn === "dislike" ? "dislike-active" : ""}`} onClick={(e: any) => aie4contentDisikeClick("ai_e-content", "level_4")} /><span>
                                                                                    {aie4contentdislikeCount}
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span style={{ 'cursor': 'pointer' }} onClick={() => handleEContentComment(aiecontents4[0]?._id, "ai_e-content", "level_4")}
                                                                                >
                                                                                    <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                    <span>Comment</span>
                                                                                </span>
                                                                            </li>

                                                                            <li>
                                                                                <img src={`${assetUrl}/video%20share.svg`} alt="" /><span>
                                                                                    Share
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span style={{ 'cursor': 'pointer' }}
                                                                                    onClick={(e: any) => aie1feedbackData("ai_e-content", "level_4")}
                                                                                ><img src={`${assetUrl}/video%20feed%20back.svg`} alt="" /><span>Feedback</span></span>
                                                                            </li>
                                                                            <li className="float-right">
                                                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                                    <Select
                                                                                        value={aie4lang}
                                                                                        onChange={handleChangeaie4}
                                                                                        displayEmpty
                                                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                                                    >
                                                                                        <MenuItem value="">
                                                                                            <em>Select</em>
                                                                                        </MenuItem>
                                                                                        <MenuItem value="English" onClick={() => getLanguageaie4Content(1)}>English</MenuItem>
                                                                                        <MenuItem value="Hindi" onClick={() => getLanguageaie4Content(6)} >Hindi</MenuItem>
                                                                                    </Select>

                                                                                </FormControl>
                                                                            </li>
                                                                        </ul>
                                                                    </div>

                                                                </div>


                                                                <Grid item xs={12} md={12}>
                                                                    {econtentcommentslevels4?.length ? <h4 className="mb-2">Comments</h4> : ''}
                                                                    {econtentcommentslevels4?.length ? econtentcommentslevels4?.map((data: any, i: number) =>
                                                                        <div className="comment-item mb-1">
                                                                            <div className="comment-item-img">
                                                                                <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                            </div>

                                                                            <div className="comment-item-con">
                                                                                {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                                    <span className="float-right">
                                                                                        <i className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                            onClick={(e: any) => econtentcommentedit(data, aiecontents4[0]?._id, "level_4")}
                                                                                            aria-hidden="true"></i>&nbsp;&nbsp;
                                                                                        <i className="fa fa-trash"
                                                                                            onClick={() => econtentcommentdeleteconfirm(data, "level_4", aiecontents4[0]?._id)}
                                                                                            style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                                    </span> : ''}
                                                                                <h5>{data?.user_name}</h5>
                                                                                <p>{data?.c_text}</p>


                                                                                <ul>
                                                                                    <li>
                                                                                        <img src={`${assetUrl}/video%20like.svg`} className={(`${cmtlikeactiveBtn === "like"}` && i == listreplyLikeIndex) ? "like-active" : ""}
                                                                                            onClick={() => {
                                                                                                listreplyLikeIndex === i ? setListReplyLikeIndex(undefined) : setListReplyLikeIndex(i);
                                                                                                handleCommentLikeClick(data, "level_4", "ai_e-content")
                                                                                            }} />

                                                                                        <span> {data?.like}</span>

                                                                                    </li>
                                                                                    <li>
                                                                                        <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${cmtlikeactiveBtn === "dislike"}` && i == listreplydisLikeIndex) ? "dislike-active" : ""}
                                                                                            onClick={() => {
                                                                                                listreplydisLikeIndex === i ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(i);
                                                                                                handleCommentDisikeClick(data, "level_4", "ai_e-content")
                                                                                            }}
                                                                                        />
                                                                                        <span>
                                                                                            {data?.dlike}
                                                                                        </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <i className="fa fa-comment-o" aria-hidden="true" ></i>&nbsp;
                                                                                        <span
                                                                                            onClick={() => {
                                                                                                listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                handleCommentReply(data, "level_4", "ai_e-content")
                                                                                            }}
                                                                                        >Reply</span>
                                                                                    </li>
                                                                                </ul>
                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                            <div className="clearfix"></div>

                                                                            <div className="replies-content">
                                                                                <div className="reply-btn"
                                                                                    onClick={() => {
                                                                                        listaie1replyIndex === '4' + i ? setListAie1replyIndex(undefined) : setListAie1replyIndex('4' + i);
                                                                                    }}
                                                                                ><span>{data.reply.length}&nbsp;reply </span>
                                                                                    {'4' + i == listaie1replyIndex! ? <ExpandLess /> : <ExpandMore />}</div>

                                                                                <Collapse in={'4' + i == listaie1replyIndex} timeout="auto" unmountOnExit>
                                                                                    <div className="second-reply-con">
                                                                                        {data.reply && data.reply.length > 0 && (
                                                                                            <div>
                                                                                                <div className="comment-item-img">
                                                                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                                                </div>
                                                                                                {data.reply.map((reply: any, replyIndex: any) => (
                                                                                                    <div key={replyIndex}>
                                                                                                        {`${reply.ref_c_user_id}` == localStorage.getItem('Tokenuserid') && (
                                                                                                            <span className="float-right">
                                                                                                                <i
                                                                                                                    className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                                                    onClick={(e: any) => editReplyV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "ai_e-content", "levelType": "level_4" }, reply?.val)}
                                                                                                                    aria-hidden="true"
                                                                                                                ></i>
                                                                                                                &nbsp;&nbsp;
                                                                                                                <i
                                                                                                                    className="fa fa-trash"
                                                                                                                    onClick={() => deleteReplyconfirmV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "ai_e-content", "levelType": "level_4" })}
                                                                                                                    style={{ color: 'red', cursor: 'pointer' }}
                                                                                                                    aria-hidden="true"
                                                                                                                ></i>
                                                                                                            </span>
                                                                                                        )}
                                                                                                        <h5>{reply?.user_name}</h5>
                                                                                                        <p>{reply?.val}</p>
                                                                                                        <div className="video-rating ">
                                                                                                            <ul>
                                                                                                                <li>
                                                                                                                    <img
                                                                                                                        src={`${assetUrl}/video%20like.svg`}
                                                                                                                        className={`${cmtReplylikeBtn === "like" && rliked === i + replyIndex + "ai_e-content" + "level_4" ? "like-active" : ""}`}
                                                                                                                        onClick={() => {
                                                                                                                            handleReplyLikeClickV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "ai_e-content", "level_4", i, replyIndex);
                                                                                                                        }}
                                                                                                                    />
                                                                                                                    <span>{reply?.like}</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <img
                                                                                                                        src={`${assetUrl}/video%20dis%20like.svg`}
                                                                                                                        className={`${cmtReplylikeBtn === "dislike" && rdliked === i + replyIndex + "ai_e-content" + "level_4" ? "dislike-active" : ""}`}
                                                                                                                        onClick={() => {
                                                                                                                            handleReplyDislikeClickV1({ "e_c_id": data?._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "ai_e-content", "level_4", i, replyIndex);
                                                                                                                        }}
                                                                                                                    />
                                                                                                                    <span>{reply?.dlike}</span>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                                                    <span
                                                                                                                        onClick={() => {
                                                                                                                            listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                                            handleCommentReply(data, "level_4", "ai_e-content");
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        Reply
                                                                                                                    </span>
                                                                                                                </li>
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </Collapse>

                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                        </div>
                                                                    ) : ''}
                                                                </Grid>

                                                            </div> : ''}

                                                    </div> : ''}

                                                {teacherecontents1.length > 0 ? <div>
                                                    <h2 className="mt-3" style={{ 'color': '#0275B1' }}>Teacher e-Content</h2>


                                                    <div>
                                                        {teacherecontents1 && teacherecontents1.map((con: any, i: number) =>
                                                            <div className="content" dangerouslySetInnerHTML={{ __html: con.text }}></div>
                                                        )}


                                                    </div>
                                                    <div className="topic-fixed-content-left">

                                                        <div className="video-rating border-top">
                                                            <ul>
                                                                <li>
                                                                    <img src={`${assetUrl}/video%20like.svg`} alt="" className={`btn ${teachercontentactiveBtn === "like" ? "like-active" : ""}`}
                                                                        onClick={(e: any) => teachercontentLikeClick("teacher_e-content", "level_1")} />
                                                                    <span>
                                                                        {teachercontentlikeCount}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`btn ${teachercontentactiveBtn === "dislike" ? "dislike-active" : ""}`} onClick={(e: any) => teachercontentDisikeClick("teacher_e-content", "level_1")} /><span>
                                                                        {teachercontentdislikeCount}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span style={{ 'cursor': 'pointer' }} onClick={() => handleContentComment(teacherecontents1[0]?._id, "teacher_e-content", "level_1")}
                                                                    >
                                                                        <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                        <span>Comment</span>
                                                                    </span>
                                                                </li>

                                                                <li>
                                                                    <img src={`${assetUrl}/video%20share.svg`} alt="" /><span>
                                                                        Share
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span style={{ 'cursor': 'pointer' }}
                                                                        onClick={(e: any) => aie1feedbackData("teacher_e-content", "level_1")}
                                                                    ><img src={`${assetUrl}/video%20feed%20back.svg`} alt="" /><span>Feedback</span></span>
                                                                </li>
                                                                <li className="float-right">
                                                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                        <Select
                                                                            value={teacherlang}
                                                                            onChange={handleChangeteacher}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            <MenuItem value="">
                                                                                <em>Select</em>
                                                                            </MenuItem>
                                                                            <MenuItem value="English" onClick={() => getLanguageteacherContent(1)}>English</MenuItem>
                                                                            <MenuItem value="Hindi" onClick={() => getLanguageteacherContent(6)} >Hindi</MenuItem>
                                                                        </Select>

                                                                    </FormControl>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                    </div>

                                                    <Grid item xs={12} md={12}>
                                                        {teacherecontentcommentlevel1?.teacherecontentcommentslevels1?.length ? <h4 className="mb-2">Comments</h4> : ''}
                                                        {teacherecontentcommentlevel1?.teacherecontentcommentslevels1?.length ? teacherecontentcommentlevel1?.teacherecontentcommentslevels1?.map((data: any, i: number) =>
                                                            <div className="comment-item mb-1">
                                                                <div className="comment-item-img">
                                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                </div>

                                                                <div className="comment-item-con">
                                                                    {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                        <span className="float-right">
                                                                            <i className="fa fa-pencil" style={{ "cursor": "pointer" }} onClick={(e: any) => contentcommenteditV2(data, "teacher_e-content", teacherecontents1[0]?._id)}
                                                                                aria-hidden="true"></i>&nbsp;&nbsp;
                                                                            <i className="fa fa-trash" onClick={() => contentcommentdeleteconfirmv2(data, "teacher_e-content", teacherecontents1[0]?._id)}
                                                                                style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                        </span> : ''}
                                                                    <h5>{data?.user_name}</h5>
                                                                    <p>{data?.c_text}</p>


                                                                    <ul>
                                                                        <li>

                                                                            <img src={`${assetUrl}/video%20like.svg`} className={(`${cmtlikeactiveBtn === "like"}` && i == listreplyLikeIndex) ? "like-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplyLikeIndex === i ? setListReplyLikeIndex(undefined) : setListReplyLikeIndex(i);
                                                                                    handleCommentLikeClick(data, "level_1", "teacher_e-content")
                                                                                }} />
                                                                            <span> {data?.like}</span>

                                                                        </li>
                                                                        <li>

                                                                            <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${cmtlikeactiveBtn === "dislike"}` && i == listreplydisLikeIndex) ? "dislike-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplydisLikeIndex === i ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(i);
                                                                                    handleCommentDisikeClick(data, "level_1", "teacher_e-content")
                                                                                }}
                                                                            />
                                                                            <span>
                                                                                {data?.dlike}
                                                                            </span>
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa fa-comment-o" aria-hidden="true" ></i>&nbsp;
                                                                            <span
                                                                                onClick={() => {
                                                                                    listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                    handleCommentReply(data, "level_1", "teacher_e-content")
                                                                                }}
                                                                            >Reply</span>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="clearfix"></div>

                                                                <div className="replies-content">
                                                                    <div className="reply-btn"
                                                                        onClick={() => {
                                                                            listaie1replyIndex === 'T' + i ? setListAie1replyIndex(undefined) : setListAie1replyIndex('T' + i);
                                                                        }}
                                                                    ><span>{data.reply.length}&nbsp;reply </span>
                                                                        {'T' + i == listaie1replyIndex! ? <ExpandLess /> : <ExpandMore />}</div>

                                                                    <Collapse in={'T' + i == listaie1replyIndex} timeout="auto" unmountOnExit>
                                                                        <div className="second-reply-con">
                                                                            {data.reply && data.reply.length > 0 && (
                                                                                <div>
                                                                                    {data.reply.map((reply: any, replyIndex: any) => (
                                                                                        <div key={replyIndex}>

                                                                                            <div className="comment-item-img">
                                                                                                <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                                            </div>
                                                                                            {`${reply.ref_c_user_id}` == localStorage.getItem('Tokenuserid') && (
                                                                                                <span className="float-right">
                                                                                                    <i
                                                                                                        className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                                        onClick={(e: any) => editReplyV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "teacher_e-content", "levelType": "level_1" }, reply?.val)}
                                                                                                        aria-hidden="true"
                                                                                                    ></i>
                                                                                                    &nbsp;&nbsp;
                                                                                                    <i
                                                                                                        className="fa fa-trash"
                                                                                                        onClick={() => deleteReplyconfirmV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "teacher_e-content", "levelType": "level_1" })}
                                                                                                        style={{ color: 'red', cursor: 'pointer' }}
                                                                                                        aria-hidden="true"
                                                                                                    ></i>
                                                                                                </span>
                                                                                            )}
                                                                                            <h5>{reply?.user_name}</h5>
                                                                                            <p>{reply?.val}</p>
                                                                                            <div className="video-rating ">
                                                                                                <ul>
                                                                                                    <li>

                                                                                                        <img
                                                                                                            src={`${assetUrl}/video%20like.svg`}
                                                                                                            className={`${cmtReplylikeBtn === "like" && rliked === i + replyIndex + "teacher_e-content" + "level_1" ? "like-active" : ""}`}
                                                                                                            onClick={() => {
                                                                                                                handleReplyLikeClickV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "teacher_e-content", "level_1", i, replyIndex);
                                                                                                            }}
                                                                                                        />
                                                                                                        <span>{reply?.like}</span>
                                                                                                    </li>
                                                                                                    <li>

                                                                                                        <img
                                                                                                            src={`${assetUrl}/video%20dis%20like.svg`}
                                                                                                            className={`${cmtReplylikeBtn === "dislike" && rdliked === i + replyIndex + "teacher_e-content" + "level_1" ? "dislike-active" : ""}`}
                                                                                                            onClick={() => {
                                                                                                                handleReplyDislikeClickV1({ "e_c_id": data?._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "teacher_e-content", "level_1", i, replyIndex);
                                                                                                            }}
                                                                                                        />
                                                                                                        <span>{reply?.dlike}</span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                                        <span
                                                                                                            onClick={() => {
                                                                                                                listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                                handleCommentReply(data, "level_1", "teacher_e-content");
                                                                                                            }}
                                                                                                        >
                                                                                                            Reply
                                                                                                        </span>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </Collapse>

                                                                    <div className="clearfix"></div>
                                                                </div>
                                                            </div>
                                                        ) : ''}
                                                    </Grid>


                                                </div> : ''}

                                                {expecontents1.length > 0 ? <div>
                                                    <h2 className="mt-3" style={{ 'color': '#0275B1' }}>Examples</h2>

                                                    <div>
                                                        {expecontents1 && expecontents1.map((con: any, i: number) =>
                                                            <div className="content" dangerouslySetInnerHTML={{ __html: con.text }}></div>
                                                        )}


                                                    </div>
                                                    <div className="topic-fixed-content-left">

                                                        <div className="video-rating border-top">
                                                            <ul>
                                                                <li>
                                                                    <img src={`${assetUrl}/video%20like.svg`} alt="" className={`btn ${expcontentactiveBtn === "like" ? "like-active" : ""}`}
                                                                        onClick={(e: any) => expcontentLikeClick("examples", "level_1")} />
                                                                    <span>
                                                                        {expcontentlikeCount}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`btn ${expcontentactiveBtn === "dislike" ? "dislike-active" : ""}`} onClick={(e: any) => expcontentDisikeClick("examples", "level_1")} /><span>
                                                                        {expcontentdislikeCount}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span style={{ 'cursor': 'pointer' }} onClick={() => handleContentComment(expecontents1[0]?._id, "examples", "level_1")}
                                                                    >
                                                                        <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                        <span>Comment</span>
                                                                    </span>
                                                                </li>

                                                                <li>
                                                                    <img src={`${assetUrl}/video%20share.svg`} alt="" /><span>
                                                                        Share
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span style={{ 'cursor': 'pointer' }}
                                                                        onClick={(e: any) => aie1feedbackData("examples", "level_1")}
                                                                    ><img src={`${assetUrl}/video%20feed%20back.svg`} alt="" /><span>Feedback</span></span>
                                                                </li>
                                                                <li className="float-right">
                                                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                        <Select
                                                                            value={explang}
                                                                            onChange={handleChangeexp}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            <MenuItem value="">
                                                                                <em>Select</em>
                                                                            </MenuItem>
                                                                            <MenuItem value="English" onClick={() => getLanguageexpContent(1)}>English</MenuItem>
                                                                            <MenuItem value="Hindi" onClick={() => getLanguageexpContent(6)} >Hindi</MenuItem>
                                                                        </Select>

                                                                    </FormControl>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                    </div>

                                                    <Grid item xs={12} md={12}>
                                                        {examplecontentcommentlevel1?.examplecontentcommentslevels1?.length ? <h4 className="mb-2">Comments</h4> : ''}
                                                        {examplecontentcommentlevel1?.examplecontentcommentslevels1?.length ? examplecontentcommentlevel1?.examplecontentcommentslevels1?.map((data: any, i: number) =>
                                                            <div className="comment-item mb-1">
                                                                <div className="comment-item-img">
                                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                </div>

                                                                <div className="comment-item-con">
                                                                    {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                        <span className="float-right">
                                                                            <i className="fa fa-pencil" style={{ "cursor": "pointer" }} onClick={(e: any) => contentcommenteditV2(data, "examples",
                                                                                expecontents1[0]?._id)}
                                                                                aria-hidden="true"></i>&nbsp;&nbsp;
                                                                            <i className="fa fa-trash" onClick={() => contentcommentdeleteconfirmv2(data, "examples",
                                                                                expecontents1[0]?._id)}
                                                                                style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                        </span> : ''}
                                                                    <h5>{data?.user_name}</h5>
                                                                    <p>{data?.c_text}</p>


                                                                    <ul>
                                                                        <li>

                                                                            <img src={`${assetUrl}/video%20like.svg`} className={(`${cmtlikeactiveBtn === "like"}` && i == listreplyLikeIndex) ? "like-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplyLikeIndex === i ? setListReplyLikeIndex(undefined) : setListReplyLikeIndex(i);
                                                                                    handleCommentLikeClick(data, "level_1", "examples")
                                                                                }} />

                                                                        </li>
                                                                        <li>

                                                                            <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${cmtlikeactiveBtn === "dislike"}` && i == listreplydisLikeIndex) ? "dislike-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplydisLikeIndex === i ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(i);
                                                                                    handleCommentDisikeClick(data, "level_1", "examples")
                                                                                }}
                                                                            />
                                                                            <span>
                                                                                {data?.dlike}
                                                                            </span>
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa fa-comment-o" aria-hidden="true" ></i>&nbsp;
                                                                            <span
                                                                                onClick={() => {
                                                                                    listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                    handleCommentReply(data, "level_1", "examples")
                                                                                }}
                                                                            >Reply</span>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="clearfix"></div>

                                                                <div className="replies-content">
                                                                    <div className="reply-btn"
                                                                        onClick={() => {
                                                                            listaie1replyIndex === 'E' + i ? setListAie1replyIndex(undefined) : setListAie1replyIndex('E' + i);
                                                                        }}
                                                                    ><span>{data.reply.length}&nbsp;reply </span>
                                                                        {'E' + i == listaie1replyIndex! ? <ExpandLess /> : <ExpandMore />}</div>

                                                                    <Collapse in={'E' + i == listaie1replyIndex} timeout="auto" unmountOnExit>
                                                                        <div className="second-reply-con">
                                                                            {data.reply && data.reply.length > 0 && (
                                                                                <div>
                                                                                    {data.reply.map((reply: any, replyIndex: any) => (
                                                                                        <div key={replyIndex}>
                                                                                            <div className="comment-item-img">
                                                                                                <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                                            </div>
                                                                                            {`${reply.ref_c_user_id}` == localStorage.getItem('Tokenuserid') && (
                                                                                                <span className="float-right">
                                                                                                    <i
                                                                                                        className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                                        onClick={(e: any) => editReplyV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "examples", "levelType": "level_1" }, reply?.val)}
                                                                                                        aria-hidden="true"
                                                                                                    ></i>
                                                                                                    &nbsp;&nbsp;
                                                                                                    <i
                                                                                                        className="fa fa-trash"
                                                                                                        onClick={() => deleteReplyconfirmV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "examples", "levelType": "level_1" })}
                                                                                                        style={{ color: 'red', cursor: 'pointer' }}
                                                                                                        aria-hidden="true"
                                                                                                    ></i>
                                                                                                </span>
                                                                                            )}
                                                                                            <h5>{reply?.user_name}</h5>
                                                                                            <p>{reply?.val}</p>
                                                                                            <div className="video-rating ">
                                                                                                <ul>
                                                                                                    <li>
                                                                                                        <img
                                                                                                            src={`${assetUrl}/video%20like.svg`}
                                                                                                            className={`${cmtReplylikeBtn === "like" && rliked === i + replyIndex + "examples" + "level_1" ? "like-active" : ""}`}
                                                                                                            onClick={() => {
                                                                                                                handleReplyLikeClickV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "examples", "level_1", i, replyIndex);
                                                                                                            }}
                                                                                                        />
                                                                                                        <span>{reply?.like}</span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <img
                                                                                                            src={`${assetUrl}/video%20dis%20like.svg`}
                                                                                                            className={`${cmtReplylikeBtn === "dislike" && rdliked === i + replyIndex + "examples" + "level_1" ? "dislike-active" : ""}`}
                                                                                                            onClick={() => {
                                                                                                                handleReplyDislikeClickV1({ "e_c_id": data?._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "examples", "level_1", i, replyIndex);
                                                                                                            }}
                                                                                                        />
                                                                                                        <span>{reply?.dlike}</span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                                        <span
                                                                                                            onClick={() => {
                                                                                                                listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                                handleCommentReply(data, "level_1", "examples");
                                                                                                            }}
                                                                                                        >
                                                                                                            Reply
                                                                                                        </span>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </Collapse>

                                                                    <div className="clearfix"></div>
                                                                </div>
                                                            </div>
                                                        ) : ''}
                                                    </Grid>
                                                </div> : ''}

                                                {imppointsecontents1.length > 0 ? <div>
                                                    <h2 className="mt-3" style={{ 'color': '#0275B1' }}>Important Points</h2>
                                                    <p>
                                                        {imppointsecontents1 && imppointsecontents1.map((con: any, i: number) =>
                                                            <div className="content" dangerouslySetInnerHTML={{ __html: con.text }}></div>
                                                        )}
                                                    </p>
                                                    <div className="topic-fixed-content-left">

                                                        <div className="video-rating border-top">
                                                            <ul>
                                                                <li>
                                                                    <img src={`${assetUrl}/video%20like.svg`} alt="" className={`btn ${impcontentactiveBtn === "like" ? "like-active" : ""}`}
                                                                        onClick={(e: any) => impcontentLikeClick("importantpoints", "level_1")} />
                                                                    <span>
                                                                        {impcontentlikeCount}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`btn ${impcontentactiveBtn === "dislike" ? "dislike-active" : ""}`} onClick={(e: any) => impcontentDisikeClick("importantpoints", "level_1")} /><span>
                                                                        {impcontentdislikeCount}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span style={{ 'cursor': 'pointer' }} onClick={() => handleContentComment(imppointsecontents1[0]?._id, "importantpoints", "level_1")}
                                                                    >
                                                                        <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                        <span>Comment</span>
                                                                    </span>
                                                                </li>

                                                                <li>
                                                                    <img src={`${assetUrl}/video%20share.svg`} alt="" /><span>
                                                                        Share
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span style={{ 'cursor': 'pointer' }}
                                                                        onClick={(e: any) => aie1feedbackData("importantpoints", "level_1")}
                                                                    ><img src={`${assetUrl}/video%20feed%20back.svg`} alt="" /><span>Feedback</span></span>
                                                                </li>
                                                                <li className="float-right">
                                                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                        <Select
                                                                            value={implang}
                                                                            onChange={handleChangeimp}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            <MenuItem value="">
                                                                                <em>Select</em>
                                                                            </MenuItem>
                                                                            <MenuItem value="English" onClick={() => getLanguageimpContent(1)}>English</MenuItem>
                                                                            <MenuItem value="Hindi" onClick={() => getLanguageimpContent(6)} >Hindi</MenuItem>
                                                                        </Select>

                                                                    </FormControl>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                    </div>



                                                    <Grid item xs={12} md={12}>
                                                        {impPointscontentcommentlevel1?.impPointscontentcommentslevels1?.length ? <h4 className="mb-2">Comments</h4> : ''}
                                                        {impPointscontentcommentlevel1?.impPointscontentcommentslevels1?.length ? impPointscontentcommentlevel1?.impPointscontentcommentslevels1?.map((data: any, i: number) =>
                                                            <div className="comment-item mb-1">
                                                                <div className="comment-item-img">
                                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                </div>

                                                                <div className="comment-item-con">
                                                                    {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                        <span className="float-right">
                                                                            <i className="fa fa-pencil" style={{ "cursor": "pointer" }} onClick={(e: any) => contentcommenteditV2(data, "importantpoints",
                                                                                imppointsecontents1[0]?._id)}
                                                                                aria-hidden="true"></i>&nbsp;&nbsp;
                                                                            <i className="fa fa-trash" onClick={() => contentcommentdeleteconfirmv2(data, "importantpoints",
                                                                                imppointsecontents1[0]?._id)}
                                                                                style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                        </span> : ''}
                                                                    <h5>{data?.user_name}</h5>
                                                                    <p>{data?.c_text}</p>


                                                                    <ul>
                                                                        <li>

                                                                            <img src={`${assetUrl}/video%20like.svg`} className={(`${cmtlikeactiveBtn === "like"}` && i == listreplyLikeIndex) ? "like-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplyLikeIndex === i ? setListReplyLikeIndex(undefined) : setListReplyLikeIndex(i);
                                                                                    handleCommentLikeClick(data, "level_1", "importantpoints")
                                                                                }} />

                                                                        </li>
                                                                        <li>

                                                                            <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${cmtlikeactiveBtn === "dislike"}` && i == listreplydisLikeIndex) ? "dislike-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplydisLikeIndex === i ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(i);
                                                                                    handleCommentDisikeClick(data, "level_1", "importantpoints")
                                                                                }}
                                                                            />
                                                                            <span>
                                                                                {data?.dlike}
                                                                            </span>
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa fa-comment-o" aria-hidden="true" ></i>&nbsp;
                                                                            <span
                                                                                onClick={() => {
                                                                                    listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                    handleCommentReply(data, "level_1", "importantpoints")
                                                                                }}
                                                                            >Reply</span>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="clearfix"></div>

                                                                <div className="replies-content">
                                                                    <div className="reply-btn"
                                                                        onClick={() => {
                                                                            listaie1replyIndex === 'I' + i ? setListAie1replyIndex(undefined) : setListAie1replyIndex('I' + i);
                                                                        }}
                                                                    ><span>{data.reply.length}&nbsp;reply </span>
                                                                        {'I' + i == listaie1replyIndex! ? <ExpandLess /> : <ExpandMore />}</div>

                                                                    <Collapse in={'I' + i == listaie1replyIndex} timeout="auto" unmountOnExit>
                                                                        <div className="second-reply-con">
                                                                            {data.reply && data.reply.length > 0 && (
                                                                                <div>
                                                                                    {data.reply.map((reply: any, replyIndex: any) => (
                                                                                        <div key={replyIndex}>

                                                                                            <div className="comment-item-img">
                                                                                                <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                                            </div>

                                                                                            {`${reply.ref_c_user_id}` == localStorage.getItem('Tokenuserid') && (
                                                                                                <span className="float-right">
                                                                                                    <i
                                                                                                        className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                                        onClick={(e: any) => editReplyV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "importantpoints", "levelType": "level_1" }, reply?.val)}
                                                                                                        aria-hidden="true"
                                                                                                    ></i>
                                                                                                    &nbsp;&nbsp;
                                                                                                    <i
                                                                                                        className="fa fa-trash"
                                                                                                        onClick={() => deleteReplyconfirmV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "importantpoints", "levelType": "level_1" })}
                                                                                                        style={{ color: 'red', cursor: 'pointer' }}
                                                                                                        aria-hidden="true"
                                                                                                    ></i>
                                                                                                </span>
                                                                                            )}
                                                                                            <h5>{reply?.user_name}</h5>
                                                                                            <p>{reply?.val}</p>
                                                                                            <div className="video-rating ">
                                                                                                <ul>
                                                                                                    <li>
                                                                                                        <img
                                                                                                            src={`${assetUrl}/video%20like.svg`}
                                                                                                            className={`${cmtReplylikeBtn === "like" && rliked === i + replyIndex + "importantpoints" + "level_1" ? "like-active" : ""}`}
                                                                                                            onClick={() => {
                                                                                                                handleReplyLikeClickV1({ "e_c_id": data?._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "importantpoints", "level_1", i, replyIndex);
                                                                                                            }}
                                                                                                        />
                                                                                                        <span>{reply?.like}</span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <img
                                                                                                            src={`${assetUrl}/video%20dis%20like.svg`}
                                                                                                            className={`${cmtReplylikeBtn === "dislike" && rdliked === i + replyIndex + "importantpoints" + "level_1" ? "dislike-active" : ""}`}
                                                                                                            onClick={() => {
                                                                                                                handleReplyDislikeClickV1({ "e_c_id": data?._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "importantpoints", "level_1", i, replyIndex);
                                                                                                            }}
                                                                                                        />
                                                                                                        <span>{reply?.dlike}</span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                                        <span
                                                                                                            onClick={() => {
                                                                                                                listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                                handleCommentReply(data, "level_1", "importantpoints");
                                                                                                            }}
                                                                                                        >
                                                                                                            Reply
                                                                                                        </span>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </Collapse>

                                                                    <div className="clearfix"></div>
                                                                </div>
                                                            </div>
                                                        ) : ''}
                                                    </Grid>
                                                </div> : ''}

                                                {exerciseecontents1.length > 0 ? <div>
                                                    <h2 className="mt-3" style={{ 'color': '#0275B1' }}>Exercise</h2>
                                                    <p>
                                                        {exerciseecontents1 && exerciseecontents1.map((con: any, i: number) =>
                                                            <div className="content" dangerouslySetInnerHTML={{ __html: con.text }}></div>
                                                        )}
                                                    </p>
                                                    <div className="topic-fixed-content-left">

                                                        <div className="video-rating border-top">
                                                            <ul>
                                                                <li>
                                                                    <img src={`${assetUrl}/video%20like.svg`} alt="" className={`btn ${exercisecontentactiveBtn === "like" ? "like-active" : ""}`}
                                                                        onClick={(e: any) => exercisecontentLikeClick("exercise", "level_1")} />
                                                                    <span>
                                                                        {exercisecontentlikeCount}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`btn ${exercisecontentactiveBtn === "dislike" ? "dislike-active" : ""}`} onClick={(e: any) => exercisecontentDisikeClick("exercise", "level_1")} /><span>
                                                                        {exercisecontentdislikeCount}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span style={{ 'cursor': 'pointer' }} onClick={() => handleContentComment(exerciseecontents1[0]?._id, "exercise", "level_1")}
                                                                    >
                                                                        <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                        <span>Comment</span>
                                                                    </span>
                                                                </li>

                                                                <li>
                                                                    <img src={`${assetUrl}/video%20share.svg`} alt="" /><span>
                                                                        Share
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span style={{ 'cursor': 'pointer' }}
                                                                        onClick={(e: any) => aie1feedbackData("exercise", "level_1")}
                                                                    ><img src={`${assetUrl}/video%20feed%20back.svg`} alt="" /><span>Feedback</span></span>
                                                                </li>
                                                                <li className="float-right">
                                                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                        <Select
                                                                            value={exerciselang}
                                                                            onChange={handleChangeexercise}
                                                                            displayEmpty
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            <MenuItem value="">
                                                                                <em>Select</em>
                                                                            </MenuItem>
                                                                            <MenuItem value="English" onClick={() => getLanguageexerciseContent(1)}>English</MenuItem>
                                                                            <MenuItem value="Hindi" onClick={() => getLanguageexerciseContent(6)} >Hindi</MenuItem>
                                                                        </Select>

                                                                    </FormControl>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                    </div>


                                                    <Grid item xs={12} md={12}>
                                                        {exercisecontentcommentlevel1?.exercisecontentcommentslevels1?.length ? <h4 className="mb-2">Comments</h4> : ''}
                                                        {exercisecontentcommentlevel1?.exercisecontentcommentslevels1?.length ? exercisecontentcommentlevel1?.exercisecontentcommentslevels1?.map((data: any, i: number) =>
                                                            <div className="comment-item mb-1">
                                                                <div className="comment-item-img">
                                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                </div>

                                                                <div className="comment-item-con">
                                                                    {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                        <span className="float-right">
                                                                            <i className="fa fa-pencil" style={{ "cursor": "pointer" }} onClick={(e: any) => contentcommenteditV2(data, "exercise",
                                                                                exerciseecontents1[0]?._id)}
                                                                                aria-hidden="true"></i>&nbsp;&nbsp;
                                                                            <i className="fa fa-trash" onClick={() => contentcommentdeleteconfirmv2(data, "exercise",
                                                                                exerciseecontents1[0]?._id)}
                                                                                style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                                        </span> : ''}
                                                                    <h5>{data?.user_name}</h5>
                                                                    <p>{data?.c_text}</p>


                                                                    <ul>
                                                                        <li>

                                                                            <img src={`${assetUrl}/video%20like.svg`} className={(`${cmtlikeactiveBtn === "like"}` && i == listreplyLikeIndex) ? "like-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplyLikeIndex === i ? setListReplyLikeIndex(undefined) : setListReplyLikeIndex(i);
                                                                                    handleCommentLikeClick(data, "level_1", "exercise")
                                                                                }} />

                                                                        </li>
                                                                        <li>

                                                                            <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={(`${cmtlikeactiveBtn === "dislike"}` && i == listreplydisLikeIndex) ? "dislike-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplydisLikeIndex === i ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(i);
                                                                                    handleCommentDisikeClick(data, "level_1", "exercise")
                                                                                }}
                                                                            />
                                                                            <span>
                                                                                {data?.dlike}
                                                                            </span>
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa fa-comment-o" aria-hidden="true" ></i>&nbsp;
                                                                            <span
                                                                                onClick={() => {
                                                                                    listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                    handleCommentReply(data, "level_1", "exercise")
                                                                                }}
                                                                            >Reply</span>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="clearfix"></div>

                                                                <div className="replies-content">
                                                                    <div className="reply-btn"
                                                                        onClick={() => {
                                                                            listaie1replyIndex === 'EX' + i ? setListAie1replyIndex(undefined) : setListAie1replyIndex('EX' + i);
                                                                        }}
                                                                    ><span>{data.reply.length}&nbsp;reply </span>
                                                                        {'EX' + i == listaie1replyIndex! ? <ExpandLess /> : <ExpandMore />}</div>

                                                                    <Collapse in={'EX' + i == listaie1replyIndex} timeout="auto" unmountOnExit>
                                                                        <div className="second-reply-con">
                                                                            {data.reply && data.reply.length > 0 && (
                                                                                <div>
                                                                                    {data.reply.map((reply: any, replyIndex: any) => (
                                                                                        <div key={replyIndex}>
                                                                                            <div className="comment-item-img">
                                                                                                <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                                                            </div>

                                                                                            {`${reply.ref_c_user_id}` == localStorage.getItem('Tokenuserid') && (
                                                                                                <span className="float-right">
                                                                                                    <i
                                                                                                        className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                                        onClick={(e: any) => editReplyV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "exercise", "levelType": "level_1" }, reply?.val)}
                                                                                                        aria-hidden="true"
                                                                                                    ></i>
                                                                                                    &nbsp;&nbsp;
                                                                                                    <i
                                                                                                        className="fa fa-trash"
                                                                                                        onClick={() => deleteReplyconfirmV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "contentTypeName": "exercise", "levelType": "level_1" })}
                                                                                                        style={{ color: 'red', cursor: 'pointer' }}
                                                                                                        aria-hidden="true"
                                                                                                    ></i>
                                                                                                </span>
                                                                                            )}
                                                                                            <h5>{reply?.user_name}</h5>
                                                                                            <p>{reply?.val}</p>
                                                                                            <div className="video-rating ">
                                                                                                <ul>
                                                                                                    <li>
                                                                                                        <img
                                                                                                            src={`${assetUrl}/video%20like.svg`}
                                                                                                            className={`${cmtReplylikeBtn === "like" && rliked === i + replyIndex + "exercise" + "level_1" ? "like-active" : ""}`}
                                                                                                            onClick={() => {
                                                                                                                handleReplyLikeClickV1({ "e_c_id": data._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "exercise", "level_1", i, replyIndex);
                                                                                                            }}
                                                                                                        />
                                                                                                        <span>{reply?.like}</span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <img
                                                                                                            src={`${assetUrl}/video%20dis%20like.svg`}
                                                                                                            className={`${cmtReplylikeBtn === "dislike" && rdliked === i + replyIndex + "exercise" + "level_1" ? "dislike-active" : ""}`}
                                                                                                            onClick={() => {
                                                                                                                handleReplyDislikeClickV1({ "e_c_id": data?._id, "reply_id": reply?._id, "content_type_id": data?.content_type_id, "level_id": data?.level_id, "like": reply?.like, "dlike": reply?.dlike }, "exercise", "level_1", i, replyIndex);
                                                                                                            }}
                                                                                                        />
                                                                                                        <span>{reply?.dlike}</span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;
                                                                                                        <span
                                                                                                            onClick={() => {
                                                                                                                listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i);
                                                                                                                handleCommentReply(data, "level_1", "exercise");
                                                                                                            }}
                                                                                                        >
                                                                                                            Reply
                                                                                                        </span>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </Collapse>

                                                                    <div className="clearfix"></div>
                                                                </div>
                                                            </div>
                                                        ) : ''}
                                                    </Grid>
                                                </div> : ''}

                                                <div className="topic-fixed-content">
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12} md={6}>

                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <div className="topic-fixed-content-right">
                                                                <div className="add-notes">
                                                                    <div className="">
                                                                        <span className="float-left">
                                                                            <p className="secondry-color m-0">My Notes</p>
                                                                        </span>
                                                                        <span className="float-right" style={{ 'cursor': 'pointer' }}>
                                                                            <small className="secondry-color" onClick={addNote}>Add Note &nbsp;<img src={`${assetUrl}/video%20below%20share.svg`} alt="" /></small>
                                                                        </span>
                                                                        <div className="clearfix"></div>
                                                                    </div>

                                                                    {showhide ? <div className="add-note-form">
                                                                        <div className="form-group mb-1">
                                                                            <h4>Add New Note</h4>
                                                                            <label>Note</label>
                                                                            <AppInput type="text" value={note} label="" name="note" id="note" className="w-100" radius="5px" placeholder="Add Note here" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNoteChange(e)} />
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <AppButton children="Cancel" styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' onClick={Cancel} />
                                                                            <AppButton children={noteBtn} styleClass='btn primary-bg text-white  pl-2 pr-2' onClick={noteSubmit} />
                                                                        </div>

                                                                    </div> : null}

                                                                    <div className="addnotes-box">
                                                                        {notes.length ? notes.map((data: any, i: number) =>
                                                                            <div className="addnotes-box-bg mt-2">
                                                                                <div key={i}>
                                                                                    <span className="float-left">

                                                                                        <small>{data.c_ts}</small>
                                                                                        <p >{data?.n_text}</p>
                                                                                    </span>

                                                                                    <span className="float-right">
                                                                                        <i className="fa fa-pencil" style={{ "cursor": "pointer" }}
                                                                                            onClick={(e: any) => noteedit(data, i)}
                                                                                            aria-hidden="true"></i>&nbsp;&nbsp;<i className="fa fa-trash" onClick={(e: any) => notedelete(data, i)} style={{ 'color': 'red',"cursor": "pointer"  }} aria-hidden="true"></i>
                                                                                    </span>
                                                                                    <div className="clearfix"></div>
                                                                                </div>
                                                                            </div>
                                                                        ) : <div className="mt-3">
                                                                        </div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                        </CustomTabPanel>

                                        <CustomTabPanel value={value} index={2}>
                                             <Test data={location.state}/>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={3}>
                                            <DoubtTab />
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={4}>
                                            Item Three
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={5}>
                                            Item five
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={6}>
                                            Item Six
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={7}>
                                            Item Seven
                                        </CustomTabPanel>
                                    </Box>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <FooterCopyright />

                <div className="test-model-popup">
                    <Modal open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <div className="quiztest-header">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <h4>Introduction to Semi Conductors</h4>
                                    </Grid>
                                    {showResult ? <Grid item xs={12} md={6}>
                                        <div className="time-bar">
                                            <div className="time-box">Time: 29:00 / 30:00</div>
                                            <div className="progrees-header"></div>
                                            <div className="total-time">Total: 20</div>
                                        </div>
                                    </Grid> : null}
                                    {showResult ? <Grid item xs={12} md={2}>
                                        <AppButton
                                            children="FINISH TEST"
                                            styleClass='btn save-btn border-rs primary-color bg-white w-100' onClick={() => setShowResult(!showResult)} />
                                    </Grid> : null}
                                    {!showResult ? <Grid item xs={12} md={5}>
                                        <div className="text-right result-score">
                                            <span>Score 9 / 20</span>
                                            <span><div className="result-score-progress"></div></span>
                                        </div>
                                    </Grid> : null}
                                </Grid>
                            </div>
                            {showResult ? <div className="quiztest-content">
                                <div className="content-progressbar">
                                    <div className="w-80 question-left">
                                        <div className="question-bar mt-1 mb-1"></div>
                                        <div className="question-left font-w600">
                                            2 Questions Left
                                        </div>
                                        <div className="question-box-card mt-3">
                                            <div className="question-box-card-con">
                                                <h5 className="mb-1 primary-color">
                                                    Question {state + 1}
                                                </h5>
                                                <p>
                                                    {questions[state]?.question}
                                                </p>
                                                <div className="question-checbox">
                                                    {singlequestions.options?.map((opt: any, j: number) =>
                                                        <ul>
                                                            <li>
                                                                <FormControlLabel control={<Checkbox checked={opt?.isChecked}
                                                                    onChange={(e) => handleCheckboxChange(e, opt, j)}
                                                                    key={j} />} label={opt.val} />
                                                            </li>
                                                        </ul>
                                                    )}
                                                    <div className="clearfix"></div>
                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="question-box-card-footer">
                                                    <AppButton
                                                        children="Provide Hint"
                                                        styleClass='btn outlined-btn mr-3' onClick={() => setShowHint(!showHint)} />
                                                    <AppButton
                                                        children="Mark for Review"
                                                        styleClass='btn outlined-btn mr-3' />
                                                    <AppButton
                                                        children="Save & Next"
                                                        onClick={() => next(questions[state - 1])}

                                                        styleClass='btn save-btn border-rs text-white primary-color' />
                                                </div>
                                            </div>
                                            {showHint ? <div className="extra-content">
                                                <p><b className="primary-color">Hint:-</b></p>
                                                <p>Ut tristique tempor mollis. Curabitur sed purus ante. Vivamus sit amet dui id nunc semper molestie eu id nibh. Maecenas sodales in enim ut sodales. Cras pharetra tellus sem, vitae rhoncus metus rutrum eu. Nullam eleifend lobortis purus eget tincidunt. Nam vitae leo fringilla, facilisis neque id, ornare arcu. Suspendisse at turpis finibus, interdum justo in, lacinia sapien. Nam ut massa et libero convallis sagittis. Cras id mi mauris. Nulla ultrices dolor et nisl dictum ultricies.</p>
                                                <div className="text-right">
                                                    <AppButton
                                                        children="Close Hint"
                                                        styleClass='btn outlined-btn ' onClick={() => setShowHint(!showHint)} />
                                                </div>
                                            </div> : null}
                                        </div>
                                    </div>
                                    <div className="w-20 white-bg">
                                        <div className="question-count mt-2">
                                            <div className="w-50">
                                                <div className="answerd-qu"></div>
                                                Answered 11
                                            </div>
                                            <div className="w-50">
                                                <div className="unanswerd-qu"></div>UnAnswered 11</div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="totalquestions-count mt-2">
                                            {questions && questions?.map((data: any, i: number) =>

                                                <div className={data.isChecked == true ? "answerd-question-box" : "answerd-not-touch"}>{i + 1}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div> : null}

                            {!showResult ? <div className="result-questions">
                                <div className="question-box-card ">
                                    {questions && questions?.map((que: any, i: number) =>
                                        <div className="question-box-card-con">
                                            <h5 className="mb-1 primary-color"> Question {i + 1}</h5>
                                            <p>
                                                {que?.question}</p>
                                            <div className="time-taken">
                                                <div className="time-taken-test">
                                                    Time Taken: 0:00:06
                                                </div>
                                                <div className="time-taken-ideal">
                                                    Ideal Time 0:01:00
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="question-checbox">
                                                <ul>
                                                    <li> <FormControlLabel control={<Checkbox />} className="your-answer" label="Option 01" /></li>
                                                    <li> <FormControlLabel control={<Checkbox />} className="current-answer" label="Option 02" /></li>
                                                    <li> <FormControlLabel control={<Checkbox />} label="Option 03" /></li>
                                                    <li> <FormControlLabel control={<Checkbox />} label="Option 04" /></li>

                                                </ul>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    )}
                                </div>
                            </div> : null}

                        </Box>
                    </Modal>
                </div>

                <div className="delete-doubt-popup">
                    <React.Fragment>
                        <Modal
                            open={vtlinedeletepopup}
                            onClose={vtlinedeletepopupClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"   >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h3>Delete Confirmation</h3>
                                    </span>
                                    <span className="float-right"
                                        onClick={vtlinedeletepopupClose}         >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="model-content">
                                    <p>Are you sure you want to delete this Timeline?</p>
                                    <div className="text-right">
                                        <AppButton children="Cancel"
                                            onClick={vtlinedeletepopupClose}
                                            styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children="Delete"
                                            onClick={deleteVideoTimeLine}
                                            styleClass='btn danger-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>


                <div className="delete-doubt-popup">
                    <React.Fragment>
                        <Modal
                            open={vndeletepopup}
                            onClose={vndeletepopupClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"     >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h3>Delete Confirmation</h3>
                                    </span>
                                    <span className="float-right"
                                        onClick={vndeletepopupClose}  >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />

                                    </span>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="model-content">
                                    <p>Are you sure you want to delete this Note?</p>
                                    <div className="text-right">
                                        <AppButton children="Cancel"
                                            onClick={vndeletepopupClose}
                                            styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children="Delete"
                                            onClick={videoNotedelete}
                                            styleClass='btn danger-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>



                <div className="delete-doubt-popup">
                    <React.Fragment>
                        <Modal
                            open={deletepopup}
                            onClose={deletepopupClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description" >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h3>Delete Confirmation</h3>
                                    </span>
                                    <span className="float-right"
                                        onClick={deletepopupClose}  >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />

                                    </span>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="model-content">
                                    <p>Are you sure you want to delete this Comment?</p>
                                    <div className="text-right">
                                        <AppButton children="Cancel"
                                            onClick={deletepopupClose}
                                            styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children="Delete"
                                            onClick={videocommentdelete}
                                            styleClass='btn danger-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>

                <div className="delete-doubt-popup">
                    <React.Fragment>
                        <Modal
                            open={deletepopup}
                            onClose={deletepopupClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description" >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h3>Delete Confirmation</h3>
                                    </span>
                                    <span className="float-right"
                                        onClick={deletepopupClose}  >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />

                                    </span>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="model-content">
                                    <p>Are you sure you want to delete this Comment?</p>
                                    <div className="text-right">
                                        <AppButton children="Cancel"
                                            onClick={deletepopupClose}
                                            styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children="Delete"
                                            onClick={() => eContentcommentdelete(deletedatainfo, deletedatalevelt, deleteEContentId)}
                                            styleClass='btn danger-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>

                <div className="delete-doubt-popup">
                    <React.Fragment>
                        <Modal
                            open={deletecpopup}
                            onClose={deletecpopupClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description" >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h3>Delete Confirmation</h3>
                                    </span>
                                    <span className="float-right"
                                        onClick={deletecpopupClose}  >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />

                                    </span>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="model-content">
                                    <p>Are you sure you want to delete this Comment?</p>
                                    <div className="text-right">
                                        <AppButton children="Cancel"
                                            onClick={deletecpopupClose}
                                            styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children="Delete"
                                            onClick={() => contentcommentdeleteV2(deletedatainfo, delcontentname, deleteContentLOId)}
                                            styleClass='btn danger-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>

                <div className="delete-doubt-popup">
                    <React.Fragment>
                        <Modal
                            open={deletereplypopup}
                            onClose={deletereplypopupClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description" >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h3>Delete Confirmation</h3>
                                    </span>
                                    <span className="float-right"
                                        onClick={deletereplypopupClose}  >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />

                                    </span>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="model-content">
                                    <p>Are you sure you want to delete this Comment?</p>
                                    <div className="text-right">
                                        <AppButton children="Cancel"
                                            onClick={deletereplypopupClose}
                                            styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children="Delete"
                                            onClick={() => deleteReplyV1(deletereplyinfo)}
                                            styleClass='btn danger-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>

                <div className="feedback-modelpopup">
                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"  >
                        <Box sx={style1}>
                            <div className="modal-titile">
                                <span className="float-left">
                                    <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Feedback</h4>
                                </span>
                                <span className="float-right" onClick={handleClose2}>
                                    <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="modal-content mt-1">
                                <div className="text-right">
                                    <AppButton children="Add Feedback" onClick={handleOpen3} styleClass='btn save-btn  primary-bg text-white' />
                                </div>
                                <div className="feedback-content">
                                    {videofeedbacks.length > 0 ? videofeedbacks.map((data, i) =>
                                        <div className="feedback-content-item">
                                            <div className="leavelone-answers-item">
                                                <div className="leavelone-answers-item-left">
                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                </div>
                                                <div className="leavelone-answers-item-right">
                                                    <div>
                                                        <span className="float-left"><h4 className="m-0">{data.user_name}</h4></span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div>
                                                        <span className="float-left mr-3">
                                                            <span className="">{data.f_text}</span>
                                                            <p >
                                                                <ReactStars
                                                                    count={5}
                                                                    value={data.rat}
                                                                    size={15}
                                                                    edit={true}
                                                                    isHalf={true}
                                                                    emptyIcon={<i className="far fa-star"></i>}
                                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                    fullIcon={<i className="fa fa-star"></i>}
                                                                    activeColor="#ffd700"
                                                                />
                                                                {data.rat}
                                                            </p>
                                                        </span>
                                                        {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ? <span className="float-right">
                                                            <i className="fa fa-pencil"
                                                                onClick={() => feedbackedit(data)} style={{"cursor": "pointer"  }}
                                                                aria-hidden="true"></i>&nbsp;&nbsp;<i className="fa fa-trash" onClick={() => feedbackdelete(data)} style={{ 'color': 'red',"cursor": "pointer"  }} aria-hidden="true"></i>
                                                        </span> : ''}
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    ) : <div className="mt-3">
                                        <Alert severity="error" >No Data Available</Alert>
                                    </div>}
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>

                <div className="add-new-feedback">
                    <React.Fragment>
                        <Modal
                            open={open3}
                            onClose={handleClose3}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"  >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Add New Feedback</h4>
                                    </span>
                                    <span className="float-right" onClick={handleClose3}>
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />

                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="model-content">
                                    <div className="form-group mb-1">
                                        <label className="mt-1">Add Feedback</label>
                                        <Textarea onChange={feedBackChange} value={feedbackvalue}
                                            minRows={2}
                                            placeholder="Type in here…"
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
                                    </div>
                                    <div className="form-group">
                                        <label>Select rating</label>
                                        <ReactStars
                                            count={5}
                                            value={feedbackRating}
                                            onChange={ratingChanged}
                                            size={30}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <div className="text-right">
                                        <AppButton children="Cancel" onClick={handleClose3} styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children={feedbackBtn} onClick={feedbackSubmit} styleClass='btn save-btn  primary-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>

                <div className="aie1-feedback-modelpopup">
                    <Modal
                        open={aie1open2}
                        onClose={aie1handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description" >
                        <Box sx={style1}>
                            <div className="modal-titile">
                                <span className="float-left">
                                    <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Feedback</h4>
                                </span>
                                <span className="float-right" onClick={aie1handleClose2}>
                                    <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="modal-content mt-1">
                                <div className="text-right">
                                    <AppButton children="Add Feedback" onClick={aie1handleOpen3} styleClass='btn save-btn  primary-bg text-white' />
                                </div>
                                <div className="feedback-content">

                                    {aie1feedbacks?.length > 0 ? aie1feedbacks.map((data, i) =>
                                        <div className="feedback-content-item">
                                            <div className="leavelone-answers-item">
                                                <div className="leavelone-answers-item-left">
                                                    <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                </div>
                                                <div className="leavelone-answers-item-right">
                                                    <div>
                                                        <span className="float-left"><h4 className="m-0">{data.user_name}</h4></span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div>
                                                        <span className="float-left mr-3">
                                                            <span className="">{data.f_text}</span>
                                                            <p >
                                                                <ReactStars
                                                                    count={5}
                                                                    value={data.rat}
                                                                    size={15}
                                                                    edit={true}
                                                                    isHalf={true}
                                                                    emptyIcon={<i className="far fa-star"></i>}
                                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                    fullIcon={<i className="fa fa-star"></i>}
                                                                    activeColor="#ffd700"
                                                                />
                                                                {data.rat}
                                                            </p>
                                                        </span>
                                                        {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ? <span className="float-right">
                                                            <i className="fa fa-pencil"
                                                                onClick={() => aie1feedbackedit(data)} style={{"cursor": "pointer"  }}
                                                                aria-hidden="true"></i>&nbsp;&nbsp;<i className="fa fa-trash" onClick={() => aie1feedbackdelete(data)} style={{ 'color': 'red',"cursor": "pointer" }} aria-hidden="true"></i>
                                                        </span> : ''}
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    ) : <div className="mt-3">
                                        <Alert severity="error" >No Data Available</Alert>
                                    </div>}
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>

                <div className="aie1-add-new-feedback">
                    <React.Fragment>
                        <Modal
                            open={aie1open3}
                            onClose={aie1handleClose3}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"  >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Add New Feedback</h4>
                                    </span>
                                    <span className="float-right" onClick={aie1handleClose3}>
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="model-content">
                                    <div className="form-group mb-1">
                                        <label className="mt-1">Add Feedback</label>
                                        <Textarea onChange={aie1feedBackChange} value={aie1feedbackvalue}
                                            minRows={2}
                                            placeholder="Type in here…"
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
                                    </div>
                                    <div className="form-group">
                                        <label>Select rating</label>
                                        <ReactStars
                                            count={5}
                                            value={aie1feedbackRating}
                                            onChange={aie1ratingChanged}
                                            size={30}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <div className="text-right">
                                        <AppButton children="Cancel" onClick={aie1handleClose3} styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children={aie1feedbackBtn} onClick={econtentfeedbackSubmit} styleClass='btn save-btn  primary-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>

                <div className="add-new-videocomment">
                    <React.Fragment>
                        <Modal
                            open={addnewvideocomment}
                            onClose={handlevideoCommentclose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description" >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Add New comment</h4>
                                    </span>
                                    <span className="float-right"
                                        onClick={handlevideoCommentclose} >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="model-content">
                                    <div className="form-group mb-1">
                                        <label className="mt-1">Add Comment</label>
                                        <Textarea onChange={videocommentChange} value={videocommentvalue}
                                            minRows={2}
                                            placeholder="Type in here…"
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
                                    </div>
                                    <div className="text-right">
                                        <AppButton children="Cancel" onClick={handlevideoCommentclose} styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children={videocommentBtn} disabled={!videocommentvalue} onClick={videocommentSubmit} styleClass='btn save-btn  primary-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>

                <div className="add-new-videocomment">
                    <React.Fragment>
                        <Modal
                            open={addnewecontentcomment}
                            onClose={handleEcontentCommentclose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"  >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Add New comment</h4>
                                    </span>
                                    <span className="float-right"
                                        onClick={handleEcontentCommentclose}            >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="model-content">
                                    <div className="form-group mb-1">
                                        <label className="mt-1">Add Comment</label>
                                        <Textarea onChange={eContentcommentChange} value={econtentcommentvalue}
                                            minRows={2}
                                            placeholder="Type in here…"
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
                                    </div>
                                    <div className="text-right">
                                        <AppButton children="Cancel" onClick={handleEcontentCommentclose} styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children={econtentcommentBtn} disabled={!econtentcommentvalue} onClick={() => eContentcommentSubmit(ecleveltype)} styleClass='btn save-btn  primary-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>

                <div className="add-new-videocomment">
                    <React.Fragment>
                        <Modal
                            open={addnewcontentcomment}
                            onClose={handlecontentCommentclose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description" >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Add New comment</h4>
                                    </span>
                                    <span className="float-right"
                                        onClick={handlecontentCommentclose}  >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="model-content">
                                    <div className="form-group mb-1">
                                        <label className="mt-1">Add Comment</label>
                                        <Textarea onChange={contentcommentChange} value={contentcommentvalue}
                                            minRows={2}
                                            placeholder="Type in here…"
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
                                    </div>
                                    <div className="text-right">
                                        <AppButton children="Cancel" onClick={handlecontentCommentclose} styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children={contentcommentBtn} disabled={!contentcommentvalue} onClick={contentcommentSubmit} styleClass='btn save-btn  primary-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>


                <div className="add-new-videocomment-reply">
                    <React.Fragment>
                        <Modal
                            open={addnewvideocommentreply}
                            onClose={handlevideoCommentReplyclose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description" >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Edit Reply</h4>
                                    </span>
                                    <span className="float-right"
                                        onClick={handlevideoCommentReplyclose}  >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="model-content">
                                    <div className="form-group mb-1">
                                        <label className="mt-1">Add Reply</label>
                                        <Textarea onChange={videocommentReplyChange} value={videocommentreplyvalue}
                                            minRows={2}
                                            placeholder="Type in here…"
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
                                    </div>
                                    <div className="text-right">
                                        <AppButton children="Cancel" onClick={handlevideoCommentReplyclose} styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children="Update" disabled={!videocommentreplyvalue} onClick={videoReplyEditSubmit} styleClass='btn save-btn  primary-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>

                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>

                <div className="add-new-videocomment-reply">
                    <React.Fragment>
                        <Modal
                            open={addnewcommentReply}
                            onClose={handleReplyCommentclose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description" >
                            <Box sx={style1}>
                                <div className="modal-titile">
                                    <span className="float-left">
                                        <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Edit Reply</h4>
                                    </span>
                                    <span className="float-right"
                                        onClick={handlevideoCommentReplyclose} >
                                        <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="model-content">
                                    <div className="form-group mb-1">
                                        <label className="mt-1">Add Reply</label>
                                        <Textarea onChange={commentReplyChange} value={commentReply}
                                            minRows={2}
                                            placeholder="Replay in here…"
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
                                    </div>
                                    <div className="text-right">
                                        <AppButton children="Cancel" onClick={handleReplyCommentclose} styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                        <AppButton children={commentReplyBtn} disabled={!commentReply} onClick={() => commentReplySubmit()} styleClass='btn save-btn  primary-bg text-white pl-2 pr-2' />
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </React.Fragment>
                </div>

                <ToastContainer />

            </div>
        </div>

    );
}


