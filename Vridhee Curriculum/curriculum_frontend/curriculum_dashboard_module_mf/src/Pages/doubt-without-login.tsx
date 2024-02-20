
import * as React from 'react';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useNavigate } from 'react-router-dom';
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import FooterCopyright from 'vridhee_common_component_mf/FooterCopyright';
import Sidebar from './Sidebar';
import configJson from "vridhee_common_component_mf/configJson";
import Grid from '@mui/material/Grid';
import AppButton from 'vridhee_common_component_mf/AppButton';
import { Autocomplete, Modal, Theme, createFilterOptions } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ReplyIcon from '@mui/icons-material/Reply';
import Textarea from '@mui/joy/Textarea';
import DashboardService from "../Services/dashboardservices";
import { ToastContainer, toast } from 'react-toastify';
import IDashboard from '../Models/IDashboard';
import { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AppInput from 'vridhee_common_component_mf/AppInput';
import LoadingSpinner from './spinner';

let replyfileData: any
const drawerWidth = 150;
let selectedFileData: any

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

let fileData: any
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

export default function DoubtWithoutLogin() {

    const inputRef = useRef<HTMLInputElement>(null);
    const inputAnswerRef = useRef<HTMLInputElement>(null);
    const inputReplyRef = useRef<HTMLInputElement>(null);

    const [commentBtn, setcommentBtn] = React.useState('Add Comment');
    const [listIndex, setListIndex] = useState<undefined | number>(undefined);

    const [listreplyIndex, setListReplyIndex] = useState<undefined | number>(undefined);
    const [listreplyreplyIndex, setListReplyReplyIndex] = useState<undefined | number>(undefined);

    const [listreplyLikeIndex, setListReplyLikeIndex] = useState<undefined | number>(undefined);
    const [listreplydisLikeIndex, setListReplydisLikeIndex] = useState<undefined | number>(undefined);
    const [searchtext, setSearchText] = useState('');
    const navigate = useNavigate()
    const assetUrl = configJson.local.assetUrl;
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);

    const [myDoubts, setMyDoubts] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [replyfile, setReplyFile] = useState('')
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
        setShow(true)
        setOpen1(true);
        setDoubtTitle('')
        setDoubtDescription('')
        setSelectedFile('')
    }

    const [doubtId, setDoubtId] = useState('');

 const deletepopupClose = () => setDeletepopup(false);

  const [deletepopup, setDeletepopup] = React.useState(false);

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

    const handleChange1 = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    const [show, setShow] = React.useState(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen1 = () => setOpen2(true);
    const handleClose1 = () => setOpen2(false);

    const [open3, setOpen3] = React.useState(false);
    const handleOpen2 = () => setOpen3(true);
    const handleClose2 = () => setOpen3(false);
    const [doubtTitle, setDoubtTitle] = React.useState('');
    const [doubtDescription, setDoubtDescription] = React.useState('')
    const [selectedFile, setSelectedFile] = React.useState('');
    const [subname, setSubname] = React.useState<FilmOptionType | null>(null);
    const [subfiltername, setSubFiltername] = React.useState<FilmOptionType | null>(null);
    const [chapterfiltername, setChapterFiltername] = React.useState<FilmOptionType | null>(null);
    const [topicfiltername, setTopicFiltername] = React.useState<FilmOptionType | null>(null);
    const filter = createFilterOptions<FilmOptionType>();
    let [subId, setSubId] = React.useState('');
    let [chapterId, setChapterId] = React.useState('');
    let [topicId, setTopicId] = React.useState('');
    let [subfilterId, setSubfilterId] = React.useState('');
    let [chapterfilterId, setChapterfilterId] = React.useState('');
    let [topicfilterId, setTopicfilterId] = React.useState('');
    const [chaptername, setChaptername] = React.useState<FilmOptionType | null>(null);
    const [topicname, setTopicname] = React.useState<FilmOptionType | null>(null);
   

    const [doubts, setDoubts] = React.useState<IDoubts>({
        doubt: [] as IDashboard[]
    });
    const [showAnswer, setShowAnswer] = React.useState(false);
    const [doubtCommentvalue, setDoubtCommentvalue] = React.useState("");
    const [file, setFile] = useState('')
    const [subject, setSubject] = React.useState<ISubject>({
        subjects: [] as IDashboard[]
    })

    const [courseDetail, setCourseDetail] = React.useState<ICourse>({
        courses: [] as IDashboard[]
    })

    const [topic, setTopic] = React.useState<ITopic>({
        topics: [] as IDashboard[]
    })


    const [replyactiveBtn, setReplyActiveBtn] = useState("none");
    const [replylikeCount, setReplyLikeCount] = useState(0);
    const [replydislikeCount, setReplyDislikeCount] = useState(0);


    const handleDoubtTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDoubtTitle(e.currentTarget.value);
        console.log("setDoubtTitle>>", doubtTitle)
    }

    const handleDoubtDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDoubtDescription(e.currentTarget.value)
        console.log("setDoubtDescription>>", doubtDescription)
    }

    const doubtCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setDoubtCommentvalue(target.value);
    }

    const handleFileChange = (e: any) => {
        const data = e.target.files[0]
        selectedFileData = e.target.files[0].name
        if (!data.name.match(/\.(jpg|jpeg|png)$/)) {
            toast.error('Please select .jpg or .jpeg or .png image only');
        } else {
            setSelectedFile(data)
        }
        e.target.value = ''
        console.log("setSelectedFile>>", selectedFile)
    };


    const myDoubt = () => {
        const obj = {
            "user_id": localStorage.getItem('Tokenuserid')
        }
        DashboardService.getDoubtsListWithBody(23, localStorage.getItem('Tokenuserid'), obj)
            .then(res => {
                if (res.data.status == 200) {
                    const updatedState = {
                        ...doubts,
                        doubt: res.data.data,
                    };
                    setDoubts(updatedState);
                    console.log("Uoubtslist>>>", updatedState);
                } else {
                    toast.error(res.data.message)
                }
            })
    };


    const handleFileUpload = () => {
        // if (selectedFile && doubtTitle) {
            console.log('formData>>selectedFile', selectedFile);
            const formData = new FormData();
            formData.append('image', selectedFile);
            console.log('formData>>', formData);
            const data = {
                "user_id": localStorage.getItem('Tokenuserid'),
                "db_metadata": 23,
                "sub_id": subId,
                "chapter_id": chapterId,
                "t_id": topicId,
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
                        setShow(false)
                        // ,topicId,subId
                        // DashboardService.getDoubtsList(23, localStorage.getItem('Tokenuserid'))
                        const obj = {
                            "db_metadata": 23,
                        }
                        DashboardService.getDoubtsWithOutLogin(obj)
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...doubts,
                                        doubt: res.data.data,
                                    };
                                    setDoubts(updatedState);
                                    console.log("Uoubtslist>>>", updatedState);
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
            // }
        // } else {
        //     console.warn('No file selected for upload.');
        // }
    };

    const postComment = (data: any) => {
        console.log('postContent_id', data?._id);
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

            handleClose();
            DashboardService.postDoubtContent(formData)
                .then(res => {

                    if (res.data.status == 200) {
                        toast.success("Comment post Successfully");
                        setListIndex(undefined)
                        setFile('')
                        setDoubtCommentvalue('')
                        // , data?.t_id, data?.sub_id
                        // DashboardService.getDoubtsList(23, localStorage.getItem('Tokenuserid'))
                        const obj = {
                            "db_metadata": 23,
                        }
                        DashboardService.getDoubtsWithOutLogin(obj)
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...doubts,
                                        doubt: res.data.data,
                                    };
                                    setDoubts(updatedState);
                                    console.log("Uoubtslist>>>", updatedState);
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
            // }
        } else {
            console.warn('Invalid Data');
        }
    };

    const replyComment = (data: any, rdata: any) => {
        console.log(data, "-----")
        if (commentBtn == 'Add Comment') {

            const req = {
                "doubtId": data?._id,
                "user_id": data.user_id,
                "db_metadata": 23,
                "sub_id": data.sub_id,
                "chapter_id": data.chapter_id,
                "t_id": data.t_id,
                "r_text": replyCommentvalue,
                "replyUserId": rdata.user_id
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
                        setListReplyReplyIndex(undefined)
                        setReplyFile('')
                        setReplyCommentvalue('')
                        // , data?.t_id, data?.sub_id
                        // DashboardService.getDoubtsList(23, data.user_id)
                        const obj = {
                            "db_metadata": 23,
                        }
                        DashboardService.getDoubtsWithOutLogin(obj)
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...doubts,
                                        doubt: res.data.data,
                                    };
                                    setDoubts(updatedState);
                                    console.log("Uoubtslist>>>", updatedState);
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
                "replyUserId": rdata.user_id,
                "replyId": rdata._id,
            }

            const formData = new FormData();
            formData.append("image", replyfile);
            formData.append("data", JSON.stringify(req))

            console.log('data>>data', req);
            handleClose();
            DashboardService.postDoubtContent(formData)
                .then(res => {

                    if (res.data.status == 200) {
                        toast.success(res.data.message);
                        setListReplyReplyIndex(undefined)
                        setReplyFile('')
                        setReplyCommentvalue('')
                        // , data?.t_id, data?.sub_id
                        // DashboardService.getDoubtsList(23, data.user_id)
                        const obj = {
                            "db_metadata": 23,
                        }
                        DashboardService.getDoubtsWithOutLogin(obj)
                            .then(res => {
                                if (res.data.status == 200) {
                                    const updatedState = {
                                        ...doubts,
                                        doubt: res.data.data,
                                    };
                                    setDoubts(updatedState);
                                    console.log("Uoubtslist>>>", updatedState);
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
    const [replyCommentvalue, setReplyCommentvalue] = React.useState("");
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

    React.useEffect(() => {
        // const obj = {
        //     "user_id": localStorage.getItem('Tokenuserid')
        // }
        // DashboardService.getDoubtsListWithBody(23, localStorage.getItem('Tokenuserid'), obj)
        const obj = {
            "db_metadata": 23,
        }
        DashboardService.getDoubtsWithOutLogin(obj)
            .then(res => {
                if (res.data.status == 200) {
                    setMyDoubts(res.data.data.length)
                } else {
                    setMyDoubts(0)
                }
            })
            .catch(e =>
                console.log(e, "e")
            );
    }, [])

    React.useEffect(() => {
        // , localStorage.getItem('Tokenuserid')
        // , localStorage.getItem('topicId'), localStorage.getItem('subId')
        const obj = {
            "db_metadata": 23
        }
        DashboardService.getDoubtsWithOutLogin(obj)
            .then(res => {
                if (res.data.status == 200) {
                    const updatedState = {
                        ...doubts,
                        doubt: res.data.data,
                    };
                    setDoubts(updatedState);
                    console.log("DUoubtslist>>>", updatedState);
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
    const { courses } = courseDetail;
    const { subjects } = subject;
    const { topics } = topic;
    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleAnswerClick = () => {
        if (inputAnswerRef.current) {
            inputAnswerRef.current.click();
        }
    };

    const handleReplyClick = () => {
        if (inputReplyRef.current) {
            inputReplyRef.current.click();
        }
    };

    const replyCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setReplyCommentvalue(target.value);
    }

    const replydislikeClick = (data: any, rdata: any) => {

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
                    // DashboardService.getDoubtsList(23, data.user_id)
                    const obj = {
                        "db_metadata": 23,
                    }
                    DashboardService.getDoubtsWithOutLogin(obj)
                        .then(res => {
                            if (res.data.status == 200) {
                                const updatedState = {
                                    ...doubts,
                                    doubt: res.data.data,
                                };
                                setDoubts(updatedState);
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

    const replylikeClick = (data: any, rdata: any) => {

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
                    // DashboardService.getDoubtsList(23, data.user_id)
                    const obj = {
                        "db_metadata": 23,
                    }
                    DashboardService.getDoubtsWithOutLogin(obj)
                        .then(res => {
                            if (res.data.status == 200) {
                                const updatedState = {
                                    ...doubts,
                                    doubt: res.data.data,
                                };
                                setDoubts(updatedState);
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
        setcommentBtn('Update Comment')
    }

    const openAnswers = (data: any, i: number) => {
        if (data.reply.length) {
            listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i)
            navigate(`/doubtanswers/${data._id}/${data.d_title.split(" ").map((item: any) => item.toLowerCase()).join("-")}/${i}`);
        }
    }


    const doubtdelete = () => {
        // data: IDashboard
        const body = {
            "user_id": localStorage.getItem('Tokenuserid'),
            "db_metadata": 23,
            // "doubtId": data._id,
            "doubtId": doubtId,
        }
        DashboardService.deleteActorContentDoubt(body)
            .then(res => {
                console.log(res.data.data, "res")
                if (res.data.status == 200) {
                    setDeletepopup(false)
                    toast.success("Doubt deleted Successfully");
                    // DashboardService.getDoubtsList(23, localStorage.getItem('Tokenuserid'))
                    const obj = {
                        "db_metadata": 23,
                    }
                    DashboardService.getDoubtsWithOutLogin(obj)
                        .then(res => {
                            if (res.data.status == 200) {
                                const updatedState = {
                                    ...doubts,
                                    doubt: res.data.data,
                                };
                                setDoubts(updatedState);
                                console.log("Uoubtslist>>>", updatedState);
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

    const doubtEdit = (data: IDashboard, i: number) => {
        console.log(data, "doubteditdata")
        setShow(true)
        setOpen1(true);
    };


    const handleImageUploadreply = (e: any) => {
        const data = e.target.files[0]
        replyfileData = e.target.files[0].name
        console.log(replyfileData, "fileDatafileData")
        if (!data.name.match(/\.(jpg|jpeg|png)$/)) {
            toast.error('Please select .jpg or .jpeg or .png image only');
        } else {
            setReplyFile(data)
        }
        e.target.value = ''
    }


    const search = () => {
        setIsLoading(true)
        const obj = {
            "db_metadata": 23,
            "searchText": searchtext
        }
        
        DashboardService.getDoubtsWithOutLogin(obj)
            .then(res => {
                setIsLoading(false)
                if (res.data.status == 200) {
                    const updatedState = {
                        ...doubts,
                        doubt: res.data.data,
                    };
                    setDoubts(updatedState);
                    console.log("Uoubtslist>>>", updatedState);
                } else {
                    const updatedState = {
                        ...doubts,
                        doubt: [],
                    };
                    setDoubts(updatedState);
                    toast.error(res.data.message)
                }
            })
        };

    return (
        <div style={{ margin: '10px' }}>
            <div className="dashboard-sec" >

                <div className="dropdown-section">

                    <Grid container spacing={2}>
                    <Grid item xs={12} md={9}>
                        
                    <div className="search-box">
                                                    <div className="form-group">
                                                        <AppInput type="text" label="Search here..." selectStyle="w-50" name="Search here..." radius="5px" 
                                                            placeholder="Search.."   
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                                                            
                                                            onKeyDown={(ev:any) => {
                                                                console.log(`Pressed keyCode ${ev.key}`);
                                                                if (ev.key === 'Enter') {
                                                                  // Do code here
                                                                  ev.preventDefault();
                                                                  console.log(searchtext)
                                                                  search();
                                                                }
                                                              }}/>
                                                    </div>
                                                    <div className="search-icon1">
                                                        <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/search1.svg" alt="" />
                                                    </div>
                                                </div>

</Grid>
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <div className="dougt-dropdown">
                                        <FormControl fullWidth>
                                            {/* <InputLabel id="demo-simple-select-label">Select Subject</InputLabel> */}
                                            <Autocomplete value={subfiltername} onChange={(event, newValue) => {

                                                if (typeof newValue === 'string') {
                                                    setSubFiltername({
                                                        name: newValue
                                                    });
                                                } else if (newValue && newValue.inputValue) {
                                                    setSubFiltername({
                                                        name: newValue.inputValue
                                                    });
                                                } else {
                                                    setSubFiltername(newValue);
                                                }
                                                console.log(newValue, "hhh")
                                                if (newValue) {
                                                    subjects.filter(sub =>
                                                        sub.name == newValue.name).filter(filteredNames => {
                                                            // let subId = filteredNames._id;
                                                            console.log(filteredNames, "filteredNames")
                                                            localStorage.setItem('subName', filteredNames.name!)
                                                            if (filteredNames._id) {
                                                                setSubfilterId(filteredNames._id);
                                                                localStorage.setItem('subId', filteredNames._id!)
                                                                DashboardService.getCourseContent(filteredNames._id)
                                                                    .then(res => {
                                                                        if (res.data.data) {
                                                                            console.log(res.data.data.course, "topicresult")
                                                                            setCourseDetail({
                                                                                ...courseDetail, courses: res.data.data.course
                                                                            })
                                                                            console.log(res.data.data.course, "fgff")
                                                                        } else {
                                                                            // toast.error(res.data.message)
                                                                        }
                                                                    })
                                                                    .catch(e =>
                                                                        console.log(e, "e")
                                                                    );
                                                                    const obj = {
                                                                        "db_metadata": 23,
                                                                        "subjectId":filteredNames._id
                                                                    }
                                                                    DashboardService.getDoubtsWithOutLogin(obj)
                                                                        .then(res => {
                                                                            if (res.data.status == 200) {
                                                                                const updatedState = {
                                                                                    ...doubts,
                                                                                    doubt: res.data.data,
                                                                                };
                                                                                setDoubts(updatedState);
                                                                                console.log("Uoubtslist>>>", updatedState);
                                                                            } else {
                                                                                const updatedState = {
                                                                                    ...doubts,
                                                                                    doubt: []
                                                                                };
                                                                                setDoubts(updatedState);
                                                                                // toast.error(res.data.message)
                                                                            }
                                                                        })
                                                            }


                                                        })
                                                }
                                                else{
                                                    setSubfilterId('');
                                                    console.log(subfilterId,"subfilterId")
                                                }
                                            }}
                                                filterOptions={(options, params) => {
                                                    const filtered = filter(options, params);
                                                    const { inputValue } = params;
                                                    const isExisting = options.some((option) => inputValue === option.name);

                                                    return filtered;
                                                }}
                                                selectOnFocus
                                                clearOnBlur
                                                handleHomeEndKeys
                                                id="free-solo-with-text-demo"
                                                options={subjects}
                                                getOptionLabel={(option: any) => {
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    return option.name;
                                                }}
                                                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="Select Subject" variant="filled" />
                                                )}
                                            />
                                        </FormControl>
                                    </div>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <div className="dougt-dropdown">
                                        <FormControl fullWidth>
                                            {/* <InputLabel id="demo-simple-select-label">Select Chapter</InputLabel> */}
                                            <Autocomplete
                                                value={chapterfiltername}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setChapterFiltername({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setChapterFiltername({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setChapterFiltername(newValue);
                                                    }
                                                    console.log(newValue, "newValue")
                                                    if (newValue) {
                                                        courses.filter(course =>
                                                            course.chapter.name == newValue.chapter.name).filter(filteredNames => {
                                                                console.log(filteredNames, "filteredNames")
                                                                let chapterId = filteredNames._id;
                                                                if (filteredNames._id) {
                                                                    setChapterfilterId(filteredNames._id);
                                                                    localStorage.setItem('chapterId', filteredNames._id!)
                                                                    const obj = {
                                                                        "db_metadata": 23,
                                                                        "subjectId":subfilterId,
                                                                        "chapterId":filteredNames._id
                                                                    }
                                                                    DashboardService.getDoubtsWithOutLogin(obj)
                                                                        .then(res => {
                                                                            if (res.data.status == 200) {
                                                                                const updatedState = {
                                                                                    ...doubts,
                                                                                    doubt: res.data.data,
                                                                                };
                                                                                setDoubts(updatedState);
                                                                                console.log("Uoubtslist>>>", updatedState);
                                                                            } else {
                                                                                const updatedState = {
                                                                                    ...doubts,
                                                                                    doubt: []
                                                                                };
                                                                                setDoubts(updatedState);
                                                                                // toast.error(res.data.message)
                                                                            }
                                                                        })
                                                                }
                                                                setTopic({
                                                                    ...topic, topics: filteredNames.chapter.topics
                                                                })
                                                            })
                                                    } else{
                                                        setChapterfilterId('');
                                                        console.log(chapterfilterId,"chapterfilterId")
                                                    }
                                                }}
                                                filterOptions={(options, params) => {
                                                    const filtered = filter(options, params);
                                                    const { inputValue } = params;
                                                    const isExisting = options.some((option) => inputValue === option.chapter.name);

                                                    return filtered;
                                                }}
                                                selectOnFocus
                                                clearOnBlur
                                                handleHomeEndKeys
                                                id="free-solo-with-text-demo"
                                                options={courses}
                                                getOptionLabel={(option: any) => {
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    return option.chapter.name;
                                                }}
                                                renderOption={(props, option) => <li {...props}>{option.chapter.name}</li>}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        placeholder="Select Chapter" variant="filled"
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <div className="dougt-dropdown">
                                        <FormControl fullWidth>
                                            {/* <InputLabel id="demo-simple-select-label">Select Topic</InputLabel> */}
                                            <Autocomplete
                                                value={topicfiltername}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setTopicFiltername({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setTopicFiltername({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setTopicFiltername(newValue);
                                                    }
                                                    console.log(newValue, "newValuetttttttttttttt")
                                                    if (newValue ) {
                                                        topics.filter(topic =>
                                                            topic.name == newValue.name).filter(filteredNames => {
                                                                console.log(filteredNames, "444444")
                                                                let topicId = filteredNames.topic_id;
                                                                if (filteredNames.topic_id) {
                                                                    setTopicfilterId(filteredNames.topic_id);
                                                                    localStorage.setItem('topicId', filteredNames.topic_id!)
                                                                
                                                                }
                                                            })
                                                    } else{
                                                        setTopicfilterId('');
                                                        console.log(topicfilterId,"topicfilterId")
                                                        // localStorage.setItem('topicId', '')
                                                    }
                                                    const obj = {
                                                        "db_metadata": 23,
                                                        "subjectId":subfilterId,
                                                        "chapterId":chapterfilterId,
                                                        "topicId": topicfilterId
                                                    }
                                                    DashboardService.getDoubtsWithOutLogin(obj)
                                                        .then(res => {
                                                            if (res.data.status == 200) {
                                                                const updatedState = {
                                                                    ...doubts,
                                                                    doubt: res.data.data,
                                                                };
                                                                setDoubts(updatedState);
                                                                console.log("Uoubtslist>>>", updatedState);
                                                            } else {
                                                                const updatedState = {
                                                                    ...doubts,
                                                                    doubt: []
                                                                };
                                                                setDoubts(updatedState);
                                                                // toast.error(res.data.message)
                                                            }
                                                        })
                                                }}
                                                filterOptions={(options, params) => {
                                                    const filtered = filter(options, params);
                                                    const { inputValue } = params;
                                                    const isExisting = options.some((option) => inputValue === option.name);

                                                    return filtered;
                                                }}
                                                selectOnFocus
                                                clearOnBlur
                                                handleHomeEndKeys
                                                id="free-solo-with-text-demo"
                                                options={topics}
                                                getOptionLabel={(option: any) => {
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    return option.name;
                                                }}
                                                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        placeholder="Select Topic" variant="filled"
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <div className="dougt-dropdown">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                label="Filter"
                                            // onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Latest</MenuItem>
                                                <MenuItem value={20}>Most Likes</MenuItem>
                                                <MenuItem value={30}>Most Replies</MenuItem>
                                                <MenuItem value={40}>Don't</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3} spacing={2}>
                            <div className="dought-right">
                                <AppButton children="Ask a Doubt" 
                                  onClick={() => {
                                    toast.error("Please Login")
                                }}
                                // onClick={handleOpen}
                                 styleClass='btn save-btn  primary-bg text-white w-100' />
                            </div>
                        </Grid>
                    </Grid>
                </div>

         {isLoading ? <LoadingSpinner/> :<div className="doubts mt-1">
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12} md={12}>
                            <div className="doubts-sec">
                                {doubts?.doubt?.length > 0 ? doubts?.doubt?.map((data: any, i: number) =>
                                    <div className="questions" key={i}>
                                        <div className="questions-left ">
                                            <div className="questions-left-img mt-3">
                                                <div className="questions-left-profile" style={{'marginLeft':'25px'}}>
                                                { `${data.profileImage}` ?  <img src={data.profileImage} alt="" /> :  <img src={`${assetUrl}/curriculim/Pop%20up%20user.svg`} alt="" />}  
                                                <div className="dought-counter-profile">
                                    <div className="dought-counter-profile-left">
                                    { `${data.profileImage}` ?  <img  src={data.profileImage} alt="" /> :  <img src={`${assetUrl}/curriculim/Pop%20up%20user.svg`} alt="" />}  
                                    </div>   
                                    <div className="dought-counter-profile-right">
                                        <h4>{data.userName}</h4>
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
                                                    <div className="answe-count-top"><i className="fa fa-sort-desc" aria-hidden="true"></i></div>
                                                    <div>{data.reply.length}</div>
                                                    <div><i className="fa fa-sort-desc" aria-hidden="true"></i></div>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="questions-right">
                                            <div className="questions-topbar">
                                                <ul>
                                                    <li>
                                                        {/* className="pundit-btn" */}
                                                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{data.userName}</div>
                                                    </li>
                                                    <li>Asked:{new Date(parseInt(data.c_ts, 10)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</li>
                                                    <li>In: <span style={{ 'color': '#6E99F9' }}>{data.subjectName}</span></li>
                                                    <li></li>
                                                </ul>
                                            </div>

                                            {(`${data.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                <span className="float-right">
                                                    {/* <i className="fa fa-pencil"
                                                                                            onClick={() =>doubtEdit(data,i)}
                                                                                                aria-hidden="true"></i> */}
                                                    &nbsp;&nbsp;
                                                    <i className="fa fa-trash"
                                                     onClick={() => {
                                                        toast.error("Please Login")
                                                        // setDoubtId(data._id)
                                                        // setDeletepopup(true)
                                                    }
                                                     }
                                                        // onClick={() => doubtdelete(data)}
                                                        style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                                                </span>


                                                : ''}
                                            <h4>{data?.d_title}</h4>
                                            <p>{data?.d_text}</p>

                                            <div className="questions-bottom">
                                                <span className="float-left">
                                                    <div className="answers-sec"
                                                        onClick={() => openAnswers(data, i)}
                                                    >
                                                        <i className="fa fa-comment-o"
                                                            aria-hidden="true"></i>&nbsp;&nbsp;{data.reply.length} Answers</div>
                                                    <div className="answers-sec" onClick={() => setShow(!show)}><i className="fa fa-eye"
                                                        aria-hidden="true"></i>&nbsp;&nbsp;0 Views</div>

                                                </span>
                                                <span className="float-right">
                                                    <AppButton children="Answer"

                                                        onClick={() => {
                                                            toast.error("Please Login")
                                                            // listIndex === i ? setListIndex(undefined) : setListIndex(i);
                                                            // setShowAnswer(!showAnswer)
                                                            // setFile('')
                                                            // setDoubtCommentvalue('')
                                                        }}

                                                        styleClass='btn save-btn  primary-bg text-white' />
                                                </span>
                                                <div className="clearfix"></div>
                                            </div>
                                            {i === listIndex ?
                                                <div className="answer-textbox mt-2">

                                                    <div className="form-group mb-2 mt-2">
                                                        <div className="upload-attachments">
                                                            <div className="upload-attachment-item">
                                                                <input type="file" multiple style={{ display: 'none' }} ref={inputAnswerRef} onChange={handleImageUpload} />
                                                                <img src={`${assetUrl}/cloud_upload.svg`} alt="" onClick={handleAnswerClick} />&nbsp;
                                                            </div>
                                                            <div>
                                                                {file &&

                                                                    <div>
                                                                        <p>{fileData}</p>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Textarea minRows={2} onChange={doubtCommentChange} value={doubtCommentvalue} placeholder="Comment" sx={{
                                                        '&::before': {
                                                            border: '1.5px solid var(--Textarea-focusedHighlight)', transform: 'scaleX(0)', left: '2.5px',
                                                            right: '2.5px', bottom: 0, top: 'unset', transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                                                            borderRadius: 0, borderBottomLeftRadius: '64px 20px', borderBottomRightRadius: '64px 20px',
                                                        }, '&:focus-within::before': { transform: 'scaleX(1)', },
                                                    }} />
                                                    <div className="text-right mt-1">
                                                        <AppButton children="Cancel" onClick={() => setListIndex(undefined)} styleClass='btn cancel-outline mr-2' />
                                                        <AppButton children="Post"
                                                            onClick={() => postComment(data)}
                                                            styleClass='btn save-btn  primary-bg text-white' />
                                                    </div>
                                                </div>
                                                : null}
                                            {i === listreplyIndex ?
                                                <div className="replyed-answer-list">
                                                    {data?.reply?.length > 0 ? data?.reply?.map((reply: any, j: number) =>
                                                        <div className="leavelone-answers-item" key={j}>
                                                            <div className="leavelone-answers-item-left">
                                                                <img src={`${assetUrl}/curriculim/img%20Event%20add%20student%20remove.svg`} alt="" />
                                                            </div>
                                                            <div className="leavelone-answers-item-right">
                                                                <div>
                                                                    <span className="float-left">
                                                                        <h4 className="m-0">{data.userName}</h4>
                                                                    </span>
                                                                    <span className="float-right">{new Date(parseInt(data.c_ts, 10)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                                    <div className="clearfix"></div>
                                                                </div>


                                                                {(`${reply.user_id}` == localStorage.getItem('Tokenuserid')) ?
                                                                    <span className="float-right">
                                                                        <i className="fa fa-pencil"
                                                                            onClick={() => replyEdit(reply, j)}
                                                                            aria-hidden="true"></i>&nbsp;&nbsp;<i className="fa fa-trash"
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
                                                                                    replylikeClick(data, reply)
                                                                                }}
                                                                            />
                                                                            {reply?.ttl_like}

                                                                        </li>
                                                                        <li style={{ 'cursor': 'pointer' }}>
                                                                            <img src={`${assetUrl}/curriculim/video%20dis%20like.svg`} alt=""

                                                                                className={(`${replyactiveBtn === "dislike"}` && j == listreplydisLikeIndex) ? "dislike-active" : ""}
                                                                                onClick={() => {
                                                                                    listreplydisLikeIndex === j ? setListReplydisLikeIndex(undefined) : setListReplydisLikeIndex(j);
                                                                                    replydislikeClick(data, reply)
                                                                                }}
                                                                            />
                                                                            {reply?.ttl_dlike}
                                                                        </li>

                                                                        <li style={{ 'cursor': 'pointer' }}
                                                                            onClick={() => {
                                                                                listreplyreplyIndex === j ? setListReplyReplyIndex(undefined) : setListReplyReplyIndex(j)
                                                                                setReplyFile('')
                                                                                setReplyCommentvalue('')
                                                                            }}
                                                                        >
                                                                            <ReplyIcon />&nbsp;Reply
                                                                        </li>

                                                                    </ul>


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
                                                                                label="Add comment here..." variant="standard" className="w-100"
                                                                                placeholder='Comment here...' />
                                                                            <div className="text-right mt-1">
                                                                                <AppButton children="Cancel"
                                                                                    onClick={() => setListReplyReplyIndex(undefined)}
                                                                                    styleClass='btn cancel-outline mr-2' />
                                                                                <AppButton children={commentBtn}
                                                                                    onClick={() => replyComment(data, reply)}
                                                                                    styleClass='btn save-btn  primary-bg text-white' />
                                                                            </div>
                                                                        </div>

                                                                        : null}

                                                                </div>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>

                                                    ) : <div className="mt-3">

                                                    </div>}
                                                </div> : null}
                                        </div>





                                        <div className="clearfix"></div>
                                    </div>
                                ) : <div className="mt-3">

                                </div>}
                            </div>

                        </Grid>
                        {/* <Grid item xs={12} sm={3} md={3}>

                            <div className="dougt-without-right-side">
                                <ul>
                                    <li>
                                        <span className="float-left">Recent</span>
                                        <span className="float-right">
                                            <div className="collaboration-box-count ">5</div>
                                        </span>
                                        <div className="clearfix"></div>
                                    </li>
                                    <li>
                                        <span className="float-left">Trending</span>
                                        <span className="float-right">
                                            <div className="collaboration-box-count ">3</div>
                                        </span>
                                        <div className="clearfix"></div>
                                    </li>
                                   
                                </ul>

                             

                            </div>
                           


                        </Grid> */}
                    </Grid>
                </div> }       


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
                                {show ? <h4><img src={`${assetUrl}/curriculim/view%20credintials.svg`} alt="" />&nbsp;&nbsp;Ask New Doubt</h4> : null}
                            </span>
                            <span className="float-right" onClick={handleClose}>
                                <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />

                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            {show ? <div className="ask-quesation-">
                                <div className="form-group mb-2">
                                    <TextField variant="filled" type="text" value={doubtTitle} label="Give Title to your doubt" name="doubtT" id="filled-basic" className="w-100"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDoubtTitleChange(e)} />
                                </div>
                                <div className="form-group mb-2">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <label className="font-w600">Subject</label>

                                            <Autocomplete value={subname} onChange={(event, newValue) => {

                                                if (typeof newValue === 'string') {
                                                    setSubname({
                                                        name: newValue
                                                    });
                                                } else if (newValue && newValue.inputValue) {
                                                    setSubname({
                                                        name: newValue.inputValue
                                                    });
                                                } else {
                                                    setSubname(newValue);
                                                }
                                                console.log(newValue, "hhh")
                                                if (newValue) {
                                                    subjects.filter(sub =>
                                                        sub.name == newValue.name).filter(filteredNames => {
                                                            // let subId = filteredNames._id;
                                                            console.log(filteredNames, "filteredNames")
                                                            localStorage.setItem('subName', filteredNames.name!)
                                                            if (filteredNames._id) {
                                                                setSubId(filteredNames._id);
                                                                localStorage.setItem('subId', filteredNames._id!)
                                                                DashboardService.getCourseContent(filteredNames._id)
                                                                    .then(res => {
                                                                        if (res.data.data) {
                                                                            console.log(res.data.data.course, "topicresult")
                                                                            setCourseDetail({
                                                                                ...courseDetail, courses: res.data.data.course
                                                                            })
                                                                            console.log(res.data.data.course, "fgff")
                                                                        } else {
                                                                            // toast.error(res.data.message)
                                                                        }
                                                                    })
                                                                    .catch(e =>
                                                                        console.log(e, "e")
                                                                    );
                                                            }


                                                        })
                                                }
                                                console.log(subId, "subId>>")
                                            }}
                                                filterOptions={(options, params) => {
                                                    const filtered = filter(options, params);
                                                    const { inputValue } = params;
                                                    const isExisting = options.some((option) => inputValue === option.name);

                                                    return filtered;
                                                }}
                                                selectOnFocus
                                                clearOnBlur
                                                handleHomeEndKeys
                                                id="free-solo-with-text-demo"
                                                options={subjects}
                                                getOptionLabel={(option: any) => {
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    return option.name;
                                                }}
                                                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="-Select-" variant="filled" />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <label className="font-w600">Chapter</label>
                                            <Autocomplete
                                                value={chaptername}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setChaptername({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setChaptername({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setChaptername(newValue);
                                                    }
                                                    console.log(newValue, "newValue")
                                                    if (newValue) {
                                                        courses.filter(course =>
                                                            course.chapter.name == newValue.chapter.name).filter(filteredNames => {
                                                                console.log(filteredNames, "filteredNames")
                                                                let chapterId = filteredNames._id;
                                                                if (filteredNames._id) {
                                                                    setChapterId(filteredNames._id);
                                                                    localStorage.setItem('chapterId', filteredNames._id!)
                                                                }
                                                                setTopic({
                                                                    ...topic, topics: filteredNames.chapter.topics
                                                                })
                                                            })
                                                    }
                                                }}
                                                filterOptions={(options, params) => {
                                                    const filtered = filter(options, params);
                                                    const { inputValue } = params;
                                                    const isExisting = options.some((option) => inputValue === option.chapter.name);

                                                    return filtered;
                                                }}
                                                selectOnFocus
                                                clearOnBlur
                                                handleHomeEndKeys
                                                id="free-solo-with-text-demo"
                                                options={courses}
                                                getOptionLabel={(option: any) => {
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    return option.chapter.name;
                                                }}
                                                renderOption={(props, option) => <li {...props}>{option.chapter.name}</li>}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        placeholder="-Select-" variant="filled"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <label className="font-w600">Topic</label>
                                            <Autocomplete
                                                value={topicname}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setTopicname({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setTopicname({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setTopicname(newValue);
                                                    }
                                                    console.log(newValue, "newValuetttttttttttttt")
                                                    if (newValue) {
                                                        topics.filter(topic =>
                                                            topic.name == newValue.name).filter(filteredNames => {
                                                                console.log(filteredNames, "444444")
                                                                let topicId = filteredNames.topic_id;
                                                                if (filteredNames.topic_id) {
                                                                    setTopicId(filteredNames.topic_id);
                                                                    localStorage.setItem('topicId', filteredNames.topic_id!)
                                                                }
                                                            })
                                                    }

                                                }}
                                                filterOptions={(options, params) => {
                                                    const filtered = filter(options, params);
                                                    const { inputValue } = params;
                                                    const isExisting = options.some((option) => inputValue === option.name);

                                                    return filtered;
                                                }}
                                                selectOnFocus
                                                clearOnBlur
                                                handleHomeEndKeys
                                                id="free-solo-with-text-demo"
                                                options={topics}
                                                getOptionLabel={(option: any) => {
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    return option.name;
                                                }}
                                                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        placeholder="-Select-" variant="filled"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
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
                                                    {selectedFileData}
                                                    {/* <img src={URL.createObjectURL(selectedFile)} className='profileImage' /> */}
                                                </div>
                                            }
                                            <img src={`${assetUrl}/cloud_upload.svg`} alt="" onClick={handleClick} />&nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mb-3 mt-2">
                                    <AppButton children="Post" onClick={() => handleFileUpload()} styleClass='btn primary-bg w150 pl-2 pr-2 mr-3 text-white' />
                                    <AppButton children="Cancel" onClick={handleClose} styleClass='btn cancel-outline w150 pl-2 pr-2 ' />
                                </div>
                            </div> : null}
                        </div>
                    </Box>
                </Modal>

                <div className="new-poll">
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
                                    {show ? <h4><img src={`${assetUrl}/curriculim/view%20credintials.svg`} alt="" />&nbsp;&nbsp;Create a New Poll</h4> : null}
                                </span>
                                <span className="float-right" onClick={handleClose1}>
                                    <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />

                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="modal-content mt-1">
                                {show ? <div className="ask-quesation-">
                                    <div className="form-group mb-2">
                                        <TextField id="filled-basic" label="Give Title to your Poll" variant="filled" placeholder='Ex:- IIT Physics Project' className="w-100" />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="font-w600 w-100">Give Description</label>
                                        <TextField
                                            id="filled-multiline-static"
                                            label="Add Description"
                                            className="w-100"
                                            multiline
                                            rows={3}
                                            defaultValue=""
                                            variant="filled"
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={4}>
                                                <label className="font-w600">Poll Type</label>
                                                <FormControl variant="filled" className="w-100">
                                                    <InputLabel id="demo-simple-select-filled-label">Poll Type</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        value={age}
                                                        onChange={handleChange1}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={10}>Academic</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={4}>
                                                <label className="font-w600">Request Replies</label>
                                                <FormControl variant="filled" className="w-100">
                                                    <InputLabel id="demo-simple-select-filled-label">Yes</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        value={age}
                                                        onChange={handleChange1}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={4}>
                                                <label className="font-w600">Mark Importance</label>
                                                <FormControl variant="filled" className="w-100">
                                                    <InputLabel id="demo-simple-select-filled-label">High</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        value={age}
                                                        onChange={handleChange1}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={10}>High</MenuItem>
                                                        <MenuItem value={20}>Low</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="form-group mb-2">
                                        <TextField id="filled-basic" label="Option 01" variant="filled" placeholder='Some Answer' className="w-100" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <TextField id="filled-basic" label="Option 02" variant="filled" placeholder='Some Answer' className="w-100" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <TextField id="filled-basic" label="Option 03" variant="filled" placeholder='Some Answer' className="w-100" />
                                    </div>

                                    <div className="text-center mb-3 mt-2">
                                        <AppButton children="Post" onClick={() => setShow(!show)} styleClass='btn primary-bg w150 pl-2 pr-2 mr-3 text-white' />
                                        <AppButton children="Cancel" onClick={handleClose} styleClass='btn cancel-outline w150 pl-2 pr-2 ' />
                                    </div>
                                </div> : null}

                                {!show ? <div className="text-center pt-3 pb-3">
                                    <h4 className="primary-color mb-3">You are all Set…!!! </h4>
                                    <p>You have successfully created Poll</p>
                                    <div className="text-center border-top pt-2 mb-3 mt-4">
                                        <AppButton children="View poll" styleClass='btn primary-bg w150 pl-2 pr-2 mr-3 text-white' />
                                        <AppButton children="Back to Home" onClick={handleClose} styleClass='btn cancel-outline w150 pl-2 pr-2 ' />
                                    </div>
                                </div> : null}

                            </div>
                        </Box>
                    </Modal>
                </div>

                <div className="all-views">
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
                                    <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Views</h4>
                                </span>
                                <span className="float-right" onClick={handleClose2}>
                                    <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="modal-content mt-1">

                                <div className="views-item">
                                    <div className="circle60">DP</div>
                                    <div className="views-item-right border-bottom mb-2 pb-2">
                                        <h4>Dipyaman</h4>
                                        <p className="m-0">July 14, 7:00PM</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="views-item">
                                    <div className="circle60">DP</div>
                                    <div className="views-item-right border-bottom mb-2 pb-2">
                                        <h4>Dipyaman</h4>
                                        <p className="m-0">July 14, 7:00PM</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="views-item">
                                    <div className="circle60">DP</div>
                                    <div className="views-item-right border-bottom mb-2 pb-2">
                                        <h4>Dipyaman</h4>
                                        <p className="m-0">July 14, 7:00PM</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="views-item">
                                    <div className="circle60">DP</div>
                                    <div className="views-item-right border-bottom mb-2 pb-2">
                                        <h4>Dipyaman</h4>
                                        <p className="m-0">July 14, 7:00PM</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="views-item">
                                    <div className="circle60">DP</div>
                                    <div className="views-item-right border-bottom mb-2 pb-2">
                                        <h4>Dipyaman</h4>
                                        <p className="m-0">July 14, 7:00PM</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="views-item">
                                    <div className="circle60">DP</div>
                                    <div className="views-item-right border-bottom mb-2 pb-2">
                                        <h4>Dipyaman</h4>
                                        <p className="m-0">July 14, 7:00PM</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="views-item">
                                    <div className="circle60">DP</div>
                                    <div className="views-item-right border-bottom mb-2 pb-2">
                                        <h4>Dipyaman</h4>
                                        <p className="m-0">July 14, 7:00PM</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="views-item">
                                    <div className="circle60">DP</div>
                                    <div className="views-item-right border-bottom mb-2 pb-2">
                                        <h4>Dipyaman</h4>
                                        <p className="m-0">July 14, 7:00PM</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>

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
                            <p>Are you sure you want to delete this Doubt?</p>
                                <div className="text-right">
                                <AppButton children="Cancel" 
                                onClick={deletepopupClose}
                                 styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                                <AppButton children="Delete"
                                onClick={doubtdelete}
                                 styleClass='btn danger-bg text-white pl-2 pr-2' />
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </React.Fragment>
            </div>
            

            </div>

            <ToastContainer />
        </div>
    );
}


