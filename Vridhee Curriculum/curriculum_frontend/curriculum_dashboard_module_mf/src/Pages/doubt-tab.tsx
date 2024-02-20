
import * as React from 'react';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import configJson from "vridhee_common_component_mf/configJson";
import Grid from '@mui/material/Grid';
import AppButton from 'vridhee_common_component_mf/AppButton';
import { Autocomplete, Modal, Theme, createFilterOptions } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ReplyIcon from '@mui/icons-material/Reply';
import Textarea from '@mui/joy/Textarea';
import DashboardService from "../Services/dashboardservices";
import { toast } from 'react-toastify';
import IDashboard from '../Models/IDashboard';
import { useRef, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AppInput from 'vridhee_common_component_mf/AppInput';
import LoadingSpinner from './spinner';

const drawerWidth = 150;
let fileData: any
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

export default function DoubtTab() {

    const inputRef = useRef<HTMLInputElement>(null);
    const inputAnswerRef = useRef<HTMLInputElement>(null);
    const inputReplyRef = useRef<HTMLInputElement>(null);

    const [myDoubts, setMyDoubts] = React.useState(0);

    const navigate = useNavigate()

    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [commentBtn, setcommentBtn] = React.useState('Add Comment');
    const [replyactiveBtn, setReplyActiveBtn] = useState("none");
    const [replylikeCount, setReplyLikeCount] = useState(0);
    const [replydislikeCount, setReplyDislikeCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [listIndex, setListIndex] = useState<undefined | number>(undefined);

    const [listreplyIndex, setListReplyIndex] = useState<undefined | number>(undefined);
    const [listreplyreplyIndex, setListReplyReplyIndex] = useState<undefined | number>(undefined);

    const [listreplyLikeIndex, setListReplyLikeIndex] = useState<undefined | number>(undefined);
    const [listreplydisLikeIndex, setListReplydisLikeIndex] = useState<undefined | number>(undefined);

    const [doubtId, setDoubtId] = useState('');
    const [subId, setSubId] = useState('');
    const [topicId, setTopicId] = useState('');
    const [chapterId, setChapterId] = useState('');
    const [searchtext, setSearchText] = useState('');
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

    const handleChange1 = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
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

    const doubtCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setDoubtCommentvalue(target.value);
    }

    React.useEffect(() => {
        const obj = {
            "user_id": localStorage.getItem('Tokenuserid')
        }
        DashboardService.getDoubtsListWithBody(23, localStorage.getItem('Tokenuserid'), obj)
            .then(res => {
                if (res.data.status == 200) {
                    setMyDoubts(res.data.data.length)
                } else{
                    setMyDoubts(0)
                }
            })
            .catch(e =>
                console.log(e, "e")
            );
    }, [localStorage.getItem('topicId')])

    const replyCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setReplyCommentvalue(target.value);
    }


    const handleClick = () => {
        // 👇️ open file input box on click of another element
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleAnswerClick = () => {
        // 👇️ open file input box on click of another element
        if (inputAnswerRef.current) {
            inputAnswerRef.current.click();
        }
    };

    const handleReplyClick = () => {
        // 👇️ open file input box on click of another element
        if (inputReplyRef.current) {
            inputReplyRef.current.click();
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
        // if (selectedFile && doubtTitle) {
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
                        const obj = {
                            "sub_id": localStorage.getItem('subId'),
                            "t_id": localStorage.getItem('topicId'),
                            'chapter_id': localStorage.getItem('chapterId'),
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
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        // } else {
        //     console.warn('No file selected for upload.');
        // }
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
                        const obj = {
                            "sub_id": data?.sub_id,
                            "t_id": data?.t_id,
                            'chapter_id': data.chapter_id,
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


        if (commentBtn == 'Add Comment') {
            const req = {
                "doubtId": data?._id,
                "user_id": data.user_id,
                "db_metadata": 23,
                "sub_id": data.sub_id,
                "chapter_id": data.chapter_id,
                "t_id": data.t_id,
                "r_text": replyCommentvalue,
                "replyUserId": rdata.user_id,
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
                        const obj = {
                            "sub_id": data?.sub_id,
                            "t_id": data?.t_id,
                            'chapter_id': data.chapter_id,
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
                        const obj = {
                            "sub_id": data?.sub_id,
                            "t_id": data?.t_id,
                            'chapter_id': data.chapter_id,
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
        const obj = {
            "sub_id": localStorage.getItem('subId'),
            "t_id": localStorage.getItem('topicId'),
            'chapter_id': localStorage.getItem('chapterId')

        }
        DashboardService.getDoubtsListWithBody(23, localStorage.getItem('Tokenuserid'), obj)
            .then(res => {
                if (res.data.status == 200) {
                    const updatedState = {
                        ...doubts,
                        doubt: res.data.data,
                    };
                    setDoubts(updatedState);
                    console.log("DUoubtslist>>>", updatedState);
                    // console.log("doubts>>>", doubts);
                }
            })
            .catch(e =>
                console.log(e, "e")
            );
    }, [localStorage.getItem('topicId')])

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
                    const obj = {
                        "sub_id": data.sub_id,
                        "t_id": data.t_id,
                        'chapter_id': data.chapter_id
                    }
                    DashboardService.getDoubtsListWithBody(23, data.user_id, obj)
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
                    const obj = {
                        "sub_id": data.sub_id,
                        "t_id": data.t_id,
                        'chapter_id': data.chapter_id,
                    }
                    DashboardService.getDoubtsListWithBody(23, data.user_id, obj)
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


    const openAnswers = (data: any, i: number) => {
        if (data.reply.length) {
            listreplyIndex === i ? setListReplyIndex(undefined) : setListReplyIndex(i)
            navigate(`/tabanswers/${data._id}/${data.d_title.split(" ").map((item: any) => item.toLowerCase()).join("-")}/${i}`);
        }
    }


    const doubtdelete = (data: IDashboard) => {
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
                    const obj = {
                        // "sub_id": data.sub_id,
                        // "t_id": data.t_id,
                        // 'chapter_id': data.chapter_id
                        "sub_id": subId,
                        "t_id": topicId,
                        'chapter_id': chapterId
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
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(e =>
                console.log(e, "e")
            );
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

   
    const search = () => {
        setIsLoading(true)
        const obj = {
            "sub_id": localStorage.getItem('subId'),
            "t_id": localStorage.getItem('topicId'),
            'chapter_id': localStorage.getItem('chapterId'),
            "searchText": searchtext
        }
        
        DashboardService.getDoubtsListWithBody(23, localStorage.getItem('Tokenuserid'), obj)
            .then(res => {
                setIsLoading(false)
                if (res.data.status != 400) {
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
        <div>
            <div className="doubts">
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={3} md={8}>

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
                                                              }}
                                                              />
                                                    </div>
                                                    <div className="search-icon2">
                                                        <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/search1.svg" alt="" />
                                                    </div>
                                                </div>

                  {isLoading ? <LoadingSpinner/> : <div className="doubts-sec mt-2">
                            {doubts?.doubt?.length > 0 ? doubts?.doubt?.map((data: any, i: number) =>
                                <div className="questions" key={i}>
                                    <div className="questions-left">
                                        <div className="questions-left-img mt-3">
                                            <div className="questions-left-profile">
                                            { `${data.profileImage}` ?  <img style={{'margin':0}} src={data.profileImage} alt="" /> :  <img style={{'margin':0}} src={`${assetUrl}/curriculim/Pop%20up%20user.svg`} alt="" />}  
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
                                                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{data.userName}</div>
                                                </li>
                                                <li>Asked: {new Date(parseInt(data.c_ts, 10)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</li>
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
                                                    setDoubtId(data._id)
                                                    setSubId(data.sub_id)
                                                    setTopicId(data.t_id)
                                                    setChapterId(data.chapter_id)
                                                    setDeletepopup(true)}
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
                                                    onClick={() => openAnswers(data, i)}>
                                                    <i className="fa fa-comment-o"
                                                        aria-hidden="true"></i>&nbsp;&nbsp;{data.reply.length} Answers</div>
                                                <div className="answers-sec" onClick={() => setShow(!show)}><i className="fa fa-eye"
                                                    aria-hidden="true"></i>&nbsp;&nbsp;0 Views</div>
                                            </span>
                                            <span className="float-right">
                                                <AppButton children="Answer"
                                                    onClick={() => {
                                                        listIndex === i ? setListIndex(undefined) : setListIndex(i);
                                                        setDoubtCommentvalue('')
                                                        setFile('')
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
                                                            <img src={`${assetUrl}/cloud_upload.svg`} onClick={handleAnswerClick} alt="" />&nbsp;
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
                                                        <div className="clearfix"></div>
                                                    </div>
                                                ) : <div className="mt-3">

                                                </div>}
                                            </div> : null}
                                    </div>

                                    <div className="clearfix"></div>
                                </div>
                            ) : ''}
                        </div> }      
                    </Grid>
                    <Grid item xs={12} sm={3} md={4}>
                        <div className="dought-right">
                            <AppButton children="Ask a Doubt" onClick={handleOpen} styleClass='btn save-btn  primary-bg text-white w-100' />
                        </div>
                        <div className="dougt-right-side">
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
                                <li style={{ cursor: 'pointer' }} onClick={myDoubt}>
                                    <span className="float-left">My Doubt</span>
                                    <span className="float-right">
                                      {myDoubts ? <div className="collaboration-box-count ">{myDoubts}</div> : <div className="collaboration-box-count ">0</div>}  
                                    </span>
                                    <div className="clearfix"></div>
                                </li>
                                <li>
                                    <span className="float-left">My Reply</span>
                                    <span className="float-right">
                                        <div className="collaboration-box-count ">3</div>
                                    </span>
                                    <div className="clearfix"></div>
                                </li>
                            </ul>

                            <div className="rightside-likes">
                                <ul>
                                    <li>
                                        <span className="float-left"><ThumbUpIcon fill="#004392" />&nbsp;Like</span>
                                        <span className="float-right">12</span>
                                        <div className="clearfix"></div>
                                    </li>
                                    <li>
                                        <span className="float-left"><ThumbDownIcon />&nbsp;Dislike</span>
                                        <span className="float-right">12</span>
                                        <div className="clearfix"></div>
                                    </li>
                                    <li>
                                        <span className="float-left"><ReplyIcon />&nbsp;Reply</span>
                                        <span className="float-right">12</span>
                                        <div className="clearfix"></div>
                                    </li>
                                </ul>
                            </div>

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
    );
}
