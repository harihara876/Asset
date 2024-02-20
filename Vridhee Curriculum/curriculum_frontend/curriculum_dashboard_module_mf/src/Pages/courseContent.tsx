import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import IDashboard from "../Models/IDashboard";
import DashboardService from "../Services/dashboardservices";
import Typography from "@mui/material/Typography";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

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

interface ICourse {
    courses: IDashboard[]
}
interface ITopic {
    topics: IDashboard
}
export default function CouseContent(props: any) {
    // console.log(props, "oooppp")
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [courseDetail, setCourseDetail] = useState<ICourse>({
        courses: [] as IDashboard[]
    })
    const [topic, setTopic] = useState<ITopic>({
        topics: {} as IDashboard
    })
    const [totalHours, setTotalHours] = React.useState<string | false>('panel1');

    const [expandedAll, setExpandedAll] = useState(false);

    const handleExpandAll = () => {
        setExpandedAll(!expandedAll);
    };

    useEffect(() => {
        // let sub_id= "65538ee951b530dcf41fc492";
        console.log("subjectPropsData>>", props)
        let sub_id = props.subId;
        if(props?.subData) {
            localStorage.setItem("gradeId", props?.subData?.gradeId);
            localStorage.setItem("catId", props?.subData?.categoryId);
        }
        const payload = {
            "gradeId": localStorage.getItem("gradeId"),
            "userId": localStorage.getItem("Tokenuserid"),
            "subjectId": sub_id,
            "catId" : localStorage.getItem("catId")
        }
        if(sub_id){
            localStorage.setItem('subId',sub_id)
        }
        console.log("getCourseContent>>courseContent", payload);
        // DashboardService.getCourseContent(sub_id)
        DashboardService.getCourseContentV1(payload)
            .then(res => {
                if (res.data.data) {
                    console.log(res.data.data, "result")
                    setTopic({
                        ...topic, topics: res.data.data
                    })
                    setCourseDetail({
                        ...courseDetail, courses: res.data.data.activitySummaryData.data
                    })
                    setTotalHours(res.data.data[0]?.total_hour)
                } else {
                    // toast.error(res.data.message)
                }

            })
            .catch(e =>
                console.log(e, "e")
            );
        // empty dependency array means this effect will only run once (like componentDidMount in classes)

    }, [])

    function chapterContent(data: any, chapterName: any,chapterId:string) {
        console.log("topic_idd>>", data?.topic_id);
        console.log("topic_sub>>", data);
        console.log("localStorage.getItem-topicId", localStorage.getItem("topicId"))
        /*Below code is used for user activity on video watching */
        const prevTopicId = localStorage.getItem("topicId");
        const prevChapterId = localStorage.getItem("chapterId");
        if (prevTopicId !== null) {
            localStorage.setItem("prevTopicId", prevTopicId);
        }

        if( prevChapterId !== null) {
            localStorage.setItem("prevChapterId", prevChapterId);
        }
        /*ABOVE CODE USED FOR user activity on video watching */
        const body = {
            "db_metadata": 27,
            "user_id": localStorage.getItem("Tokenuserid"),
            "sub_id": localStorage.getItem("subId"),
            "chap_id": chapterId,
            "t_id": data?.t_id
        }
        console.log("body<<<???",body)
        DashboardService.addOrUpdateActorCurrActivity(body)
            .then(res => {
                if (res.data.status == 200) {
                    console.log(res.data, "addOrUpdateActorCurrActivity")
                } else {
                    //if metadata is not available in userprofile collection we will get Request failed with status code 500
                    console.log(res.data, "Something Wrong")
                    // toast.error(res.data.message)
                }

            })
            .catch(e =>
                console.log(e, "e")
            );

        console.log(data, "topicId: data.topic_id")
        console.log(chapterName, "chapterName")
localStorage.setItem('topicId',data.t_id)
localStorage.setItem('chapterId',chapterId)
        if (props.subData) {
            localStorage.setItem('subName',props.subData.sub_name)
            const dataRes = { subId: props.subData.sub_id, subName: props.subData.sub_name,categoryId: props?.subData?.categoryId, gradeId: props?.subData?.gradeId, topicId: data?.t_id, topicName: data.t_name, chapterName: chapterName ,chapterId: chapterId,subTopics:topics};
            navigate("/topic-page", { state: dataRes });
        } else {
            let subjectId = localStorage.getItem('subId')
            const dataRes = { subId: subjectId,topicId: data?.t_id, chapterId: chapterId,topicName: data.t_name, chapterName: chapterName ,subTopics:topics};
            navigate("/topic-page", { state: dataRes });
        }

        // navigate("/topic-page", { state: data.topic_id });
    }

    const { courses } = courseDetail;
    const { topics } = topic;
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            // setExpandedAll(!expandedAll)
            // console.log(panel,"panel")
            // console.log(newExpanded,"newExpanded")
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <div className="subject-details-left">
                <h3>Course content</h3>
                <p>{topics?.totalChapter} sections •    {topics?.totalTopicsLength} lectures •
                    {/* 15h 30m total length */}
                    {topics?.totalTime} Hours total length
                </p>
                {expandedAll ? <p className="primary-color font-w400" style={{ 'cursor': 'pointer' }}
                    onClick={handleExpandAll}
                >Collapse all</p> : <p className="primary-color font-w400" style={{ 'cursor': 'pointer' }}
                    onClick={handleExpandAll}
                >Expand all</p>}
                <div className="course-list">
                    {courses?.map((data, i) =>
                        <Accordion
                            expanded={expandedAll ? expandedAll : expanded === `panel${i + 1}`}
                            //    expanded={expanded === `panel${i+1}`} 
                            onChange={handleChange(`panel${i + 1}`)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>
                                    <p className="m-0">{data.chap_name}</p>
                                    <small style={{ 'color': '#84818A' }}>{data?.completed_topics}/{data?.totalTopics} Topics | {data?.completed_hours}/{data?.totalTopicHours} hrs | {data?.buddiesCompleted} Buddies Completed</small>

                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                    <div className="subject-title">
                                        {data?.t_data.map((sub: any, i: any) =>
                                            <ul className="con-title"  >
                                                <li className={`${sub?.completed === 'True' ? "active" : ""}`}>
                                                    <a style={{ cursor: 'pointer' }} className="float-left" onClick={() => chapterContent(sub, data.chap_name,data.chap_id!)}>  {sub?.t_name}
                                                    </a>
                                                    <div className="clearfix"></div>
                                                </li>

                                            </ul>
                                        )}
                                    </div>

                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                    )}
                </div>
            </div>
        </div>
    );
}