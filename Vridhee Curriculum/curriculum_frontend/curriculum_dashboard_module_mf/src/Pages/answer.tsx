
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import configJson from "vridhee_common_component_mf/configJson";
import AppButton from 'vridhee_common_component_mf/AppButton';
import { Autocomplete, Grid, Modal, Theme, createFilterOptions } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ReplyIcon from '@mui/icons-material/Reply';
import DashboardService from "../Services/dashboardservices";
import { ToastContainer, toast } from 'react-toastify';
import IDashboard from '../Models/IDashboard';
import { useRef, useState } from 'react';


const drawerWidth = 150;
let fileData: any
let doubtAnswer: any
let index: any
let prmstr: any
let selectedfileData: any
let replyfileData: any

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

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
interface IDoubts {
    doubt: [];
}

interface ISubject {
    subjects: IDashboard[]
}
interface ICourse {
    courses: IDashboard[]
}
interface ITopic {
    topics: IDashboard[]
}

interface FilmOptionType {
    inputValue?: string;
    name: string;
    year?: number;
}


interface IAnswerSingle {
    doubtAnswers: IDashboard
}

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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Answer() {


    const inputRef = useRef<HTMLInputElement>(null);
    const inputAnswerRef = useRef<HTMLInputElement>(null);
    const inputReplyRef = useRef<HTMLInputElement>(null);

    const assetUrl = configJson.local.assetUrl;
    const navigate = useNavigate()
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [commentBtn, setcommentBtn] = React.useState('Post');
    const [replyactiveBtn, setReplyActiveBtn] = useState("none");
    const [replylikeCount, setReplyLikeCount] = useState(0);
    const [replydislikeCount, setReplyDislikeCount] = useState(0);
    const [listreplyreplyIndex, setListReplyReplyIndex] = useState<undefined | number>(undefined);

    const [listreplyLikeIndex, setListReplyLikeIndex] = useState<undefined | number>(undefined);
    const [listreplydisLikeIndex, setListReplydisLikeIndex] = useState<undefined | number>(undefined);

    const [doubtAnswer, setDoubtAnswer] = useState<IAnswerSingle>({
        doubtAnswers: {} as IDashboard
    })
    const [doubtId, setDoubtId] = useState('');
    const [replyId, setReplyId] = useState('');
    const deletepopupClose = () => setDeletepopup(false);
   
     const [deletepopup, setDeletepopup] = React.useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const options = [
        { label: "Option 1", name: 'Option 1' },
        { label: "Option 2", name: 'Option 2' },
        { label: "Option 3", name: 'Option 3' }
    ];
    const myTheme = createTheme({
        // Set up your custom MUI theme here
    })
    const [open1, setOpen1] = React.useState(false);
    const handleOpen = () => {
        setOpen1(true);
        setDoubtTitle('');
        setDoubtDescription('');
        setSelectedFile('');
    }
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
    const [age, setAge] = React.useState('');
    const [show, setShow] = React.useState(true);
    const [showAnswer, setShowAnswer] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen1 = () => setOpen2(true);
    const handleClose1 = () => setOpen2(false);

    const [open3, setOpen3] = React.useState(false);
    const handleOpen2 = () => setOpen3(true);
    const handleClose2 = () => setOpen3(false);
    const [doubtTitle, setDoubtTitle] = React.useState('');
    const [doubtDescription, setDoubtDescription] = React.useState('')
    const [selectedFile, setSelectedFile] = React.useState('');
    const filter = createFilterOptions<FilmOptionType>();
    const [file, setFile] = useState('')
    const [replyfile, setReplyFile] = useState('')
    const [doubts, setDoubts] = React.useState<IDoubts>({
        doubt: []
    });

    const [doubtCommentvalue, setDoubtCommentvalue] = React.useState("");

    const [replyCommentvalue, setReplyCommentvalue] = React.useState("");
    const [indexVal, setIndexval] = React.useState('');

    const [subject, setSubject] = React.useState<ISubject>({
        subjects: [] as IDashboard[]
    })

    const handleDoubtTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDoubtTitle(e.currentTarget.value);
        console.log("setDoubtTitle>>", doubtTitle)
    }

    const handleDoubtDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDoubtDescription(e.currentTarget.value)
        console.log("setDoubtDescription>>", doubtDescription)
    }

    const replyCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setReplyCommentvalue(target.value);
    }


    const handleClick = () => {
        // 👇️ open file input box on click of another element
        if (inputRef?.current) {
            inputRef?.current?.click();
        }
    };

    const handleAnswerClick = () => {
        // 👇️ open file input box on click of another element
        if (inputAnswerRef?.current) {
            inputAnswerRef?.current?.click();
        }
    };

    const handleReplyClick = () => {
        // 👇️ open file input box on click of another element
        if (inputReplyRef?.current) {
            inputReplyRef?.current?.click();
        }
    };


    const handleImageUpload = (e: any) => {
        const data = e.target.files[0]
        fileData = e.target.files[0].name
        console.log(fileData, "fileDatafileData")
        if (!data.name.match(/\.(jpg|jpeg|png)$/)) {
            toast.error('Please select .jpg or .jpeg or .png image only');
        } else {
            setFile(data)
        }
        e.target.value = ''
    }


    const handleImageUploadreply = (e: any) => {
        const data = e.target.files[0]
        replyfileData = e.target.files[0].name
        console.log(fileData, "fileDatafileData")
        if (!data.name.match(/\.(jpg|jpeg|png)$/)) {
            toast.error('Please select .jpg or .jpeg or .png image only');
        } else {
            setReplyFile(data)
        }
        e.target.value = ''
    }

    const handleFileChange = (e: any) => {
        const data = e.target.files[0]
        selectedfileData = e.target.files[0].name
        if (!data.name.match(/\.(jpg|jpeg|png)$/)) {
            toast.error('Please select .jpg or .jpeg or .png image only');
        } else {
            setSelectedFile(data)
        }
        e.target.value = ''
        console.log("setSelectedFile>>", selectedFile)
    };

    const handleFileUpload = () => {
        if (selectedFile && doubtTitle) {
            console.log('formData>>selectedFile', selectedFile);

            const formData = new FormData();
            formData.append('image', selectedFile);
            console.log('formData>>', formData);

            const data = {
                "user_id": localStorage.getItem('Tokenuserid'),
                "db_metadata": 23,
                "sub_id": localStorage.getItem('subId'),
                "chapter_id": localStorage.getItem('chapterId'),
                "t_id": localStorage.getItem('topicId'),
                "d_text": doubtDescription,
                "d_title": doubtTitle
            }
            console.log('data>>data', data);
            formData.append('data', JSON.stringify(data));
            handleClose();

            DashboardService.addActorContentDoubt(formData)
                .then(res => {

                    if (res.data.status == 200) {
                        toast.success("Doubt added Successfully");
                        console.log('File uploaded successfully:', res);
                        // , localStorage.getItem('topicId'),localStorage.getItem('subId')
                        let index = indexVal ? indexVal : prmstr[prmstr.length - 1]
                        DashboardService.getDoubtsList(23, localStorage.getItem('Tokenuserid'))
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...doubts,
                                        doubt: res.data.data,
                                    };
                                    setDoubts(updatedState);
                                    console.log("Uoubtslist>>>", updatedState);

                                    let doubtAnswer = res.data.data[index];
                                    setDoubtAnswer({
                                        ...doubtAnswer, doubtAnswers: doubtAnswer
                                    })

                                } else {
                                    toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        } else {
            console.warn('No file selected for upload.');
        }
    };



    const postComment = (data: any) => {
        console.log('postContent_id', data);
        if (data?._id) {
            console.log('doubtCommentvalue', doubtCommentvalue);

            const req = {
                "doubtId": data?._id,
                "user_id": data.user_id,
                "db_metadata": 23,
                "sub_id": data.sub_id,
                "chapter_id": data.chapter_id,
                "t_id": data.t_id,
                "r_text": doubtCommentvalue,

                "replyUserId": localStorage.getItem('Tokenuserid')
            }

            const formData = new FormData();
            formData.append("image", file);
            formData.append("data", JSON.stringify(req))

            console.log('data>>data', req);
            handleClose();
            DashboardService.postDoubtContent(formData)
                .then(res => {

                    if (res.data.status == 200) {
                        toast.success("Comment post Successfully");
                        setShowAnswer(false);
                        setFile('')
                        setDoubtCommentvalue('')
                        // , data?.t_id, data?.sub_id
                        let index = indexVal ? indexVal : prmstr[prmstr.length - 1]
                        DashboardService.getDoubtsList(23, localStorage.getItem('Tokenuserid'))
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...doubts,
                                        doubt: res.data.data,
                                    };
                                    setDoubts(updatedState);
                                    console.log("Uoubtslist>>>", updatedState);

                                    let doubtAnswer = res.data.data[index];
                                    setDoubtAnswer({
                                        ...doubtAnswer, doubtAnswers: doubtAnswer
                                    })

                                } else {
                                    toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(e => {
                    console.error('Error Posting Comment:', e);
                });
        } else {
            console.warn('Invalid Data');
        }
    };

    const replyComment = (data: any, rdata: any) => {
        console.log('replydata', data);


        if (commentBtn == 'Post') {
            const req = {
                "doubtId": data?._id,
                "user_id": data.user_id,
                "db_metadata": 23,
                "sub_id": data.sub_id,
                "chapter_id": data.chapter_id,
                "t_id": data.t_id,
                "r_text": replyCommentvalue,
                "replyUserId": localStorage.getItem('Tokenuserid'),
            }

            const formData = new FormData();
            formData.append("image", replyfile);
            formData.append("data", JSON.stringify(req))

            console.log('data>>data', req);
            handleClose();
            DashboardService.postDoubtContent(formData)
                .then(res => {

                    if (res.data.status == 200) {
                        toast.success("Comment post Successfully");
                        setListReplyReplyIndex(undefined);
                        setReplyFile('')
                        setReplyCommentvalue('')
                        // , data?.t_id, data?.sub_id
                        let index = indexVal ? indexVal : prmstr[prmstr.length - 1]
                        DashboardService.getDoubtsList(23, localStorage.getItem('Tokenuserid'))
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...doubts,
                                        doubt: res.data.data,
                                    };
                                    setDoubts(updatedState);
                                    console.log("Uoubtslist>>>", updatedState);

                                    let doubtAnswer = res.data.data[index];
                                    setDoubtAnswer({
                                        ...doubtAnswer, doubtAnswers: doubtAnswer
                                    })

                                } else {
                                    toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(e => {
                    console.error('Error Posting Comment:', e);
                });
        } else {
            const req = {
                "doubtId": data?._id,
                "user_id": data.user_id,
                "db_metadata": 23,
                "sub_id": data.sub_id,
                "chapter_id": data.chapter_id,
                "t_id": data.t_id,
                "r_text": replyCommentvalue,
                "replyUserId": localStorage.getItem('Tokenuserid'),

                "replyId": rdata?._id,
            }

            const formData = new FormData();
            formData.append("image", replyfile);
            formData.append("data", JSON.stringify(req))

            console.log('data>>data', req);
            handleClose();
            DashboardService.postDoubtContent(formData)
                .then(res => {

                    if (res.data.status == 200) {
                        toast.success("Comment post Successfully");
                        setListReplyReplyIndex(undefined);
                        setReplyFile('')
                        setReplyCommentvalue('')
                        // , data?.t_id, data?.sub_id
                        let index = indexVal ? indexVal : prmstr[prmstr.length - 1]
                        DashboardService.getDoubtsList(23, localStorage.getItem('Tokenuserid'))
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...doubts,
                                        doubt: res.data.data,
                                    };
                                    setDoubts(updatedState);
                                    console.log("Uoubtslist>>>", updatedState);

                                    let doubtAnswer = res.data.data[index];
                                    setDoubtAnswer({
                                        ...doubtAnswer, doubtAnswers: doubtAnswer
                                    })

                                } else {
                                    toast.error(res.data.message)
                                }
                            })
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(e => {
                    console.error('Error Posting Comment:', e);
                });
        }
    }

    React.useEffect(() => {
        console.log(window.location.href, "window.location.href")
        if (window.location.href) {
            prmstr = window.location.href.split("/");
            setIndexval(prmstr[prmstr.length - 1]);
            console.log(prmstr[prmstr.length - 1])
        }

        let index = indexVal ? indexVal : prmstr[prmstr.length - 1]
        console.log(index, "indexindex")
        DashboardService.getDoubtsList(23, localStorage.getItem('Tokenuserid'))
            .then(res => {
                if (res.data.data) {
                    const updatedState = {
                        ...doubts,
                        doubt: res.data.data[index],
                    };
                    setDoubts(updatedState);
                    console.log("DUoubtslist>>>", updatedState);
                    let doubtAnswer = res.data.data[index];
                    setDoubtAnswer({
                        ...doubtAnswer, doubtAnswers: doubtAnswer
                    })
                    console.log(res.data.data[index], "res.data.data[index]")
                    console.log(doubts, "doubt")

                }
            })
            .catch(e =>
                console.log(e, "e")
            );

    }, [])

    React.useEffect(() => {
        DashboardService.getSubjectsList()
            .then(res => {
                if (res.data.data) {
                    console.log(res.data.data, "getSubjectsList")
                    setSubject({
                        ...subject, subjects: res.data.data
                    })
                } else {
                    // toast.error(res.data.message)
                }
            })
            .catch(e =>
                console.log(e, "e")
            );
    }, [])

    const { doubtAnswers } = doubtAnswer;



    const doubtreplydelete = () => {
        // data: IDashboard, reply: IDashboard
        const body = {
            "user_id": localStorage.getItem('Tokenuserid'),
            "db_metadata": 23,
            "doubtId": doubtId,
            "replyId": replyId
            // "doubtId": data._id,
            // "replyId": reply._id
        }
        DashboardService.deleteActorDoubtReply(body)
            .then(res => {
                console.log(res.data.data, "res")
                if (res.data.status == 200) {
                    setDeletepopup(false)
                    toast.success("Reply deleted Successfully");
                    let index = indexVal ? indexVal : prmstr[prmstr.length - 1]
                    DashboardService.getDoubtsList(23, localStorage.getItem('Tokenuserid'))
                        .then(res => {
                            if (res.data.status == 200) {
                                const updatedState = {
                                    ...doubts,
                                    doubt: res.data.data,
                                };
                                setDoubts(updatedState);
                                console.log("Uoubtslist>>>", updatedState);

                                let doubtAnswer = res.data.data[index];
                                setDoubtAnswer({
                                    ...doubtAnswer, doubtAnswers: doubtAnswer
                                })

                            } else {
                                toast.error(res.data.message)
                            }
                        })
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(e =>
                console.log(e, "e")
            );
    };


    const replylikeClick = (data: any, rdata: any) => {
        console.log(data, "data")
        console.log(rdata, "rdata")
        setReplyLikeCount(rdata?.ttl_like)
        setReplyDislikeCount((rdata?.ttl_dlike))
        if (replyactiveBtn === "none") {
            setReplyLikeCount(replylikeCount + 1);
            setReplyActiveBtn("like");
        }
        if (replyactiveBtn === 'like') {
            setReplyLikeCount(replylikeCount - 1);
            setReplyActiveBtn("none");
        }
        if (replyactiveBtn === "dislike") {
            setReplyLikeCount(replylikeCount + 1);
            setReplyDislikeCount(replydislikeCount - 1);
            setReplyActiveBtn("like");
        }

        const body = {
            "user_id": data.user_id,
            "doubtId": data._id,
            "db_metadata": 23,
            "sub_id": data.sub_id,
            "t_id": data.t_id,
            "replyId": rdata._id,
            "likeValue": 1,
            "disLikeValue": 0
        }

        DashboardService.updateReplyLikeDislike(body)
            .then(res => {
                if (res.data.status == 200) {
                    // , data.t_id,data.sub_id
                    let index = indexVal ? indexVal : prmstr[prmstr.length - 1]
                    DashboardService.getDoubtsList(23, data.user_id)
                        .then(res => {
                            if (res.data.status == 200) {
                                const updatedState = {
                                    ...doubts,
                                    doubt: res.data.data,
                                };
                                setDoubts(updatedState);

                                let doubtAnswer = res.data.data[index];
                                setDoubtAnswer({
                                    ...doubtAnswer, doubtAnswers: doubtAnswer
                                })

                            } else {
                                toast.error(res.data.message)
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


    const replyEdit = (data: any, j: number) => {
        setReplyFile(data.r_path)
        setReplyCommentvalue(data.r_text)
        listreplyreplyIndex === j ? setListReplyReplyIndex(undefined) : setListReplyReplyIndex(j)
        setcommentBtn('Update')
    }

    const back = () => {
        navigate(`/doubts`)
    }

    const replydislikeClick = (data: any, rdata: any) => {
        console.log(rdata, "replydata")

        setReplyLikeCount(rdata?.ttl_like)
        setReplyDislikeCount((rdata?.ttl_dlike))

        if (replyactiveBtn === "none") {
            setReplyDislikeCount(replydislikeCount + 1);
            setReplyActiveBtn("dislike");
        }
        if (replyactiveBtn === 'dislike') {
            setReplyDislikeCount(replydislikeCount - 1);
            setReplyActiveBtn("none");
        }
        if (replyactiveBtn === "like") {
            setReplyDislikeCount(replydislikeCount + 1);
            setReplyLikeCount(replylikeCount - 1);
            setReplyActiveBtn("dislike");
        }

        const body = {
            "user_id": data.user_id,
            "doubtId": data._id,
            "db_metadata": 23,
            "sub_id": data.sub_id,
            "t_id": data.t_id,
            "replyId": rdata._id,
            "likeValue": 0,
            "disLikeValue": 1
        }

        DashboardService.updateReplyLikeDislike(body)
            .then(res => {
                if (res.data.status == 200) {
                    // , data.t_id,data.sub_id
                    let index = indexVal ? indexVal : prmstr[prmstr.length - 1]
                    DashboardService.getDoubtsList(23, data.user_id)
                        .then(res => {
                            if (res.data.status == 200) {
                                const updatedState = {
                                    ...doubts,
                                    doubt: res.data.data,
                                };
                                setDoubts(updatedState);

                                let doubtAnswer = res.data.data[index];
                                setDoubtAnswer({
                                    ...doubtAnswer, doubtAnswers: doubtAnswer
                                })

                            } else {
                                toast.error(res.data.message)
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


    return (
        <div>
           
            <div className="doubts dougt-answers">
            <div className="backto-dought mb-2"     style={{ 'cursor': 'pointer' }}  onClick={back}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;&nbsp;Back
            </div>

            <Grid container spacing={2}>
            <Grid item xs={12} sm={3} md={9}>
                <div className="doubts-sec">

                    <div className="questions" >
                    <div>
                    {/* 'color': '#6E99F9', */}
                    <h3>{doubtAnswers.topicName}</h3>
                </div>
                        <div className="questions-left">
                            <div className="questions-left-img mt-3">
                            
                                <div className="circle40 questions-left-profile" style={{'marginLeft':'-8px'}}>
                                { `${doubtAnswers.profileImage}` ?  <img  src={doubtAnswers.profileImage} alt="" /> :  <img src={`${assetUrl}/curriculim/Pop%20up%20user.svg`} alt="" />}  
                                {/* <img src={doubtAnswers?.profileImage} alt="" /> */}
                                    {/* <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" /> */}
                                    <div className="dought-counter-profile">
                                    <div className="dought-counter-profile-left">
                                    { `${doubtAnswers.profileImage}` ?  <img  src={doubtAnswers.profileImage} alt="" /> :  <img src={`${assetUrl}/curriculim/Pop%20up%20user.svg`} alt="" />}  
                                    </div>   
                                    <div className="dought-counter-profile-right">
                                        <h4>{doubtAnswers.userName}</h4>
                                        <p>Software Developer at Some company</p>
                                    </div> 
                                    <div className="clearfix"></div>
                                    <div className="follow-link">
                                        <span className="float-left" style={{ 'position': 'relative','top': '2px;'}}>0 Followers</span>
                                        <span className="float-right">
                                            <button className="btn follow-btn primary-bg text-white">Follow</button>
                                        </span>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>  
                                </div>
                                <div className="clearfix"></div>
                                <div className="answe-count">
                                    <div className="answe-count-top1"><i className="fa fa-sort-asc" aria-hidden="true"></i></div>
                                    <div>{doubtAnswers.reply?.length}</div>
                                    <div><i className="fa fa-sort-desc" aria-hidden="true"></i></div>
                                </div>
                                             
                                           

                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="questions-right">
                            <h4>{doubtAnswers?.d_title?.toLowerCase()}</h4>
                            <p>{doubtAnswers?.d_text}</p>


                            <div className="replyed-answer-list">
                                {doubtAnswers?.reply?.length > 0 ? doubtAnswers?.reply?.map((reply: any, j: number) =>
                                    <div className="leavelone-answers-item" >
                                        <div className="leavelone-answers-item-left questions-left-profile">
                                            <img src={reply?.profileImage} alt="" />

                                            
                                            <div className="dought-counter-profile">
                                    <div className="dought-counter-profile-left">
                                    { `${reply.profileImage}` ?  <img  src={reply.profileImage} alt="" /> :  <img src={`${assetUrl}/curriculim/Pop%20up%20user.svg`} alt="" />}  
                                    </div>   
                                    <div className="dought-counter-profile-right">
                                        <h4>{reply.userName}</h4>
                                        <p>Software Developer at Some company</p>
                                    </div> 
                                    <div className="clearfix"></div>
                                    <div className="follow-link">
                                        <span className="float-left" style={{ 'position': 'relative','top': '2px;'}}>0 Followers</span>
                                        <span className="float-right">
                                            <button className="btn follow-btn primary-bg text-white">Follow</button>
                                        </span>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>  

                                        </div>
                                        <div className="leavelone-answers-item-right">
                                            <div>
                                                <span className="float-left">
                                                    <h4 className="m-0">{reply.userName}</h4>
                                                </span>
                                                <span className="float-right">{new Date(parseInt(doubtAnswers.c_ts!, 10)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                <div className="clearfix"></div>
                                            </div>

                                            {(`${reply.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                <span className="float-right">
                                                    <i className="fa fa-pencil"

                                                        onClick={() => replyEdit(reply, j)}
                                                        aria-hidden="true"></i>&nbsp;&nbsp;<i className="fa fa-trash"
                                                        onClick={() => {
                                                            setDoubtId(doubtAnswers._id!)
                                                            setReplyId(reply._id)
                                                            setDeletepopup(true)}
                                                         }
                                                            // onClick={() => doubtreplydelete(doubtAnswers, reply)}
                                                            style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                </span>
                                                : ''}

                                            <p>{reply?.r_text}</p>
                                            <div className="user-actions">
                                                <ul>
                                                    <li style={{ 'cursor': 'pointer' }}>
                                                        <img src={`${assetUrl}/curriculim/video%20like.svg`} alt=""
                                                            className={(`${replyactiveBtn === "like"}` && j == listreplyLikeIndex) ? "like-active" : ""}
                                                            onClick={() => {
                                                                listreplyLikeIndex === j ? setListReplyLikeIndex(undefined) : setListReplyLikeIndex(j);
                                                                replylikeClick(doubtAnswers, reply)
                                                            }}
                                                        />
                                                        {reply?.ttl_like}

                                                    </li>


                                                    <li style={{ 'cursor': 'pointer' }}>
                                                        <img src={`${assetUrl}/curriculim/video%20dis%20like.svg`} alt=""
                                                            className={(`${replyactiveBtn === "dislike"}` && j == listreplydisLikeIndex) ? "dislike-active" : ""}
                                                            onClick={() => {
                                                                listreplydisLikeIndex === j ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(j);
                                                                replydislikeClick(doubtAnswers, reply)
                                                            }}
                                                        />
                                                        {reply?.ttl_dlike}
                                                    </li>

                                                    <li style={{ 'cursor': 'pointer' }}
                                                        onClick={() => {
                                                            listreplyreplyIndex === j ? setListReplyReplyIndex(undefined) : setListReplyReplyIndex(j);
                                                            setReplyFile('')
                                                            setReplyCommentvalue('')
                                                        }}
                                                    >
                                                        <ReplyIcon />&nbsp;Reply
                                                    </li>

                                                </ul>

                                            </div>

                                            {j === listreplyreplyIndex ?

                                                <div className="reply-form">

                                                    <div className="form-group mb-2 mt-2">
                                                        <div className="upload-attachments">
                                                            <div className="upload-attachment-item">
                                                                <input type="file" multiple style={{ display: 'none' }} ref={inputReplyRef}
                                                                    onChange={handleImageUploadreply}
                                                                />
                                                                <img src={`${assetUrl}/cloud_upload.svg`} alt="" onClick={handleReplyClick} />&nbsp;
                                                            </div>
                                                            <div>
                                                                {replyfile &&

                                                                    <div>
                                                                        <p>{replyfileData}</p>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <TextField id="standard-basic"
                                                        onChange={replyCommentChange} value={replyCommentvalue}
                                                        label="Add reply here..." variant="standard" className="w-100"
                                                        placeholder='Comment here...' />
                                                    <div className="text-right mt-1">
                                                        <AppButton children="Cancel"
                                                            onClick={() => setListReplyReplyIndex(undefined)}
                                                            styleClass='btn cancel-outline mr-2' />
                                                        <AppButton children={commentBtn}
                                                            onClick={() => replyComment(doubtAnswers, reply)}
                                                            styleClass='btn save-btn  primary-bg text-white' />
                                                    </div>
                                                </div>

                                                : null}


                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                ) : <div className="mt-3">

                                </div>}
                            </div>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </div>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                <div className="recent-question">
                                        <h4>Related Questions</h4>
                                        <ul>
                                            <li>Question</li>
                                            <li>Question</li>
                                            <li>Question</li>
                                            <li>Question</li>
                                            <li>Question</li>
                                        </ul>
                                    </div>
                </Grid>
                </Grid>
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
                            {show ? <h4><img src={`${assetUrl}/curriculim/view%20credintials.svg`} alt="" />&nbsp;&nbsp;Ask New Question</h4> : null}
                        </span>
                        <span className="float-right" onClick={handleClose}>
                            <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />

                        </span>
                        <div className="clearfix"></div>
                    </div>
                    <div className="modal-content mt-1">
                        {show ? <div className="ask-quesation-">
                            <div className="form-group mb-2">
                                <TextField type="text" value={doubtTitle} label="Give Title to your doubt" name="doubtT" id="filled-basic" className="w-100"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDoubtTitleChange(e)} />
                            </div>

                            <div className="form-group mb-2">
                                <label className="font-w600 w-100">Give Description</label>
                                <TextField value={doubtDescription} label="Add Description" name="doubtDescr" multiline rows={3} id="filled-multiline-static" className="w-100" variant="filled"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDoubtDescriptionChange(e)} />
                            </div>
                            <div className="form-group mb-2">
                                <div className="upload-attachments">
                                    <label className="font-w600">Upload Attachments</label>
                                    <div className="upload-attachment-item">
                                        <input type="file" style={{ display: 'none' }} ref={inputRef} onChange={handleFileChange} />

                                        {selectedFile &&
                                            <div>
                                                {selectedfileData}
                                                {/* <img src={URL.createObjectURL(selectedFile)} className='profileImage' /> */}
                                            </div>
                                        }
                                        <img src={`${assetUrl}/cloud_upload.svg`} alt="" onClick={handleClick} />&nbsp;Upload
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-3 mt-2">
                                <AppButton children="Post" onClick={() => handleFileUpload()} styleClass='btn primary-bg w150 pl-2 pr-2 mr-3 text-white' />
                                <AppButton children="Cancel" onClick={handleClose} styleClass='btn cancel-outline w150 pl-2 pr-2 ' />
                            </div>
                        </div> : null}

                        {!show ? <div className="text-center pt-3 pb-3">
                            <h4 className="primary-color mb-3">You are all Set…!!! </h4>
                            <p>You have successfully posted your doubt</p>
                            <div className="text-center border-top pt-2 mb-3 mt-4">
                                <AppButton children="View Doubt" styleClass='btn primary-bg w150 pl-2 pr-2 mr-3 text-white' />
                                <AppButton children="Back to Home" onClick={handleClose} styleClass='btn cancel-outline w150 pl-2 pr-2 ' />
                            </div>
                        </div> : null}

                    </div>
                </Box>
            </Modal>


            <div className="delete-doubt-popup">
                <React.Fragment>
                    <Modal
                        open={deletepopup}
                        onClose={deletepopupClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={style}>
                        <div className="modal-titile">
                                    <span className="float-left">
                                        <h3>Delete Confirmation</h3>
                                    </span>
                                    <span className="float-right"
                                        onClick={deletepopupClose}
                                    >
                                        <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />

                                    </span>
                                    <div className="clearfix"></div>
                                </div>

                        
                            <div className="model-content">
                            <p>Are you sure you want to delete this Reply?</p>
                                <div className="text-right">
                                <AppButton children="Cancel" 
                                onClick={deletepopupClose}
                                 styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                <AppButton children="Delete" 
                                onClick={doubtreplydelete}
                                 styleClass='btn save-btn  danger-bg text-white pl-2 pr-2' />
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </React.Fragment>
            </div> 


            <ToastContainer />
        </div>
    );
}

