
import * as React from 'react';
import _ from "lodash";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import FooterCopyright from 'vridhee_common_component_mf/FooterCopyright';
import Sidebar from './Sidebar';
import configJson from "vridhee_common_component_mf/configJson";
import Grid from '@mui/material/Grid';
import Dropdown from "vridhee_common_component_mf/Dropdown";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import AppButton from 'vridhee_common_component_mf/AppButton';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import IDashboard from '../Models/IDashboard';
import { useEffect, useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { toast } from 'react-toastify';
import DashboardService from '../Services/dashboardservices';
import { format } from 'date-fns';
import dayjs from 'dayjs';

interface ISubject {
    subjects: IDashboard[]
}
interface ICtype {
    ctypes: IDashboard[]
}
interface ICollaboration {
    collaborations: IDashboard[]
}
interface IUserCollaboration {
    usercollaborations: IDashboard[]
}

interface ICourse {
    courses: IDashboard[]
}
interface ITopic {
    topics: IDashboard[]
}
let fileData: any;

const drawerWidth = 150;

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
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


let date:any
let time:any

export default function CollaborationOne() {
    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [selectedTime, setSelectedTime] = React.useState(); // Initialize with a default time
    const [open, setOpen] = React.useState(true);
    const [selectedType, setSelectedType] = useState('');
    
    const [showtable, setShowTable] = useState(false);
    const [value, setValue] = React.useState(0);
    let [subId, setSubId] = useState('');
    let [topicId, setTopicId] = useState('');
    let [chapterId, setChapterId] = useState('');
    const filter = createFilterOptions<FilmOptionType>();
    const [saveBtn, setSaveBtn] = React.useState('Create');
    const [startdate, setStartDate] = useState(new Date());
    const [endddate, setEndDate] = useState('');

    const [subject, setSubject] = useState<ISubject>({
        subjects: [] as IDashboard[]
    })

    const [collaboration, setCollaboration] = useState<ICollaboration>({
        collaborations: [] as IDashboard[]
    })


    const [ctype, setctype] = useState<ICtype>({
        ctypes: [] as IDashboard[]
    })

    const [usercollaboration, setUserCollaboration] = useState<IUserCollaboration>({
        usercollaborations: [] as IDashboard[]
    })

    const [courseDetail, setCourseDetail] = useState<ICourse>({
        courses: [] as IDashboard[]
    })

    const [topic, setTopic] = useState<ITopic>({
        topics: [] as IDashboard[]
    })

    interface FilmOptionType {
        inputValue?: string;
        name: string;
        year?: number;
    }
    const [ctext, setCtext] = useState('')
    const [clink, setClink] = useState('')
    const [cname, setCname] = useState('')
    const [file, setFile] = useState('')
    const [subname, setSubname] = React.useState<FilmOptionType | null>(null);
    const [subfiltername, setSubFiltername] = React.useState<FilmOptionType | null>(null);
    const [chaptername, setChaptername] = React.useState<FilmOptionType | null>(null);
    const [topicname, setTopicname] = React.useState<FilmOptionType | null>(null);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const options = [
        { label: "Option 1", name: 'Option 1' },
        { label: "Option 2", name: 'Option 2' },
        { label: "Option 3", name: 'Option 3' }
    ];
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

    const [age, setAge] = React.useState('11');
    const [type, setType] = React.useState('');

    const handleChange1 = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const handleEdit = (data: any) => {
        handleOpen();
        setSaveBtn('Update')
        console.log(data)
        setClink(data.c_link)
        setCname(data.name)
        setCtext(data.c_text)
        setChaptername(data.chap_name)
        setSubname(data.sub_name)
        setTopicname(data.topic_name)
        setSelectedTime(data.c_ts)
        setStartDate(data.c_dt)
    };

    const handletypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };
    const [open2, setOpen2] = React.useState(false);
    const handleOpen1 = () => setOpen2(true);
    const handleClose1 = () => setOpen2(false);

    const ctextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setCtext(target.value);
        console.log(target.value, "target.value")
    }


    const handleCTypeChange = (event: any) => {
 
    
               setSelectedType(event.target.value);
       
    };

    const clinkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setClink(target.value);
        console.log(target.value, "target.value")
    }

    const cnameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setCname(target.value);
        console.log(target.value, "target.value")
    }
    useEffect(() => {
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
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    // useEffect(() => {
    //     getAllCollabarations();
    //     // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, [])


    const getAllCollabarations = () => {
        const body = {
            "db_metadata": 25
        }
        DashboardService.getAllCollabarations(body)
            .then(res => {
                console.log(res.data.details, "getAllCollabarations")
                if (res.data.status == 200) {
                    const sortedata = _.orderBy(res.data.details, ['c_dt','c_ts'], ['desc','desc']);
                    console.log(sortedata, "sortedata")

                    setCollaboration({
                        ...collaboration, collaborations: sortedata
                    })
                } else {
                    // toast.error(res.data.message)
                }
            })
            .catch(e =>
                console.log(e, "e")
            );
    }

    const getAllUserCollabarations = () => {
        const body = {
            "db_metadata": 25
        }
        DashboardService.getAllCollabarations(body)
            .then(res => {
                console.log(res.data.details, "getAllCollabarations")
                if (res.data.status == 200) {
                    // setCollaboration({
                    //     ...collaboration, collaborations:res.data.details
                    // })
                    const sortedata = _.orderBy(res.data.details, ['c_dt','c_ts'], ['desc','desc']);
                    console.log(sortedata, "sortedata")

                    setCollaboration({
                        ...collaboration, collaborations: sortedata
                    })
                } else {
                    // toast.error(res.data.message)
                }
            })
            .catch(e =>
                console.log(e, "e")
            );
    }

    const getUserWiseCollabaration = () => {
        const body = {
            "db_metadata": 25,
            "user_id": localStorage.getItem('Tokenuserid')
        }
        DashboardService.getUserWiseCollabaration(body)
            .then(res => {
                console.log(res.data.details, "getUserWiseCollabaration")
                if (res.data.status == 200) {
                    //    setUserCollaboration({
                    //     ...usercollaboration, usercollaborations: res.data.details
                    // })

                    const sortedata = _.orderBy(res.data.details, ['c_dt','c_ts'], ['desc','desc']);
                    console.log(sortedata, "sortedata")

                    setCollaboration({
                        ...collaboration, collaborations: sortedata
                    })
                } else {
                    // toast.error(res.data.message)
                }
                console.log(usercollaboration, "usercollaboration")
            })
            .catch(e =>
                console.log(e, "e")
            );
    }

    useEffect(() => {

        DashboardService.getCType()
        .then(res => {
            console.log("getctype>>", res.data.data[0].data)
            setctype({
                ...ctype, ctypes: res.data.data[0].data
            })
        })
        .catch(e => {
            console.log("FrequencyType error", e)
        })

        getUserWiseCollabaration();
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])


    const { usercollaborations } = usercollaboration;
    const { collaborations } = collaboration;
    const { courses } = courseDetail;
    const { ctypes } = ctype;
    const { subjects } = subject;
    const { topics } = topic;


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



    const collaborationSubmit = () => {
        console.log(subname)
        console.log(subId)
        console.log(chapterId)
        console.log(topicId)
        console.log(file)
        console.log(startdate)
        console.log(endddate)
        console.log(cname)
        console.log(ctext)

        let findData1 = ctypes.find((x: any) => x.name == selectedType);
        console.log(findData1,"findData1")

        if(startdate){
            date = format(startdate, 'yyyy-dd-MM')
            console.log(date, "date")
        }
        if(selectedTime){
            let time = format(selectedTime, 'hh:mm')
        console.log(time, "time")
        }

        const obj = {
            "db_metadata": 25,
            "user_id": localStorage.getItem('Tokenuserid'),
            "name": cname,
            "sub_id": subId,

            "chap_id": chapterId,

            "t_id": topicId,
            "c_text": ctext,
            "c_dt": date,
            "c_ts": time,

            "c_type": findData1?.seq,

            "t_allow": 1,
            "is_allow": 1,

            "j_list": [
                {
                    "c_u_id": "65c5ffe861b870936e24114b",
                    "name": "Lakshmi"
                }
            ],


            "c_link": clink

        }
        //   const formData = new FormData();
        //   formData.append("image", file);
        //   formData.append("data", JSON.stringify(obj))
        DashboardService.addCollabaration(obj)
            .then(res => {
                if (res.data.status == 200) {
                    toast.success(res.data.message)
                    setOpen1(false);
                    getAllCollabarations();
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    };



    const handleTimeChange = (newTime: any) => {
        console.log(newTime, "newTime")
        setSelectedTime(newTime);
    };


    return (
        <div>
            <div className="dashboard-sec">
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <CssBaseline />
                        <AppBar position="fixed" open={open}>
                            <HeaderCurriculum module="Curriculum" />
                        </AppBar>
                        <Drawer
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
                                    <Link color="#174392" to="/dashboard">Dashboard</Link>
                                    <Typography color="#62676C">Collaboration</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="add-group-section-box mt-1 text-right">
                                <AppButton children="Add New Task" onClick={handleOpen} styleClass='verify-btn primary-bg text-white pl-2 pr-2' />
                            </div>
                            <div className="add-group-section">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="add-group-section-box">
                                            <fieldset>
                                                <legend>Challenge</legend>
                                                <div className="group-section-box">
                                                    <div className="group-section-box-item border-right">
                                                        <h4>5</h4>
                                                        <p className="m-0">Created</p>
                                                    </div>
                                                    <div className="group-section-box-item border-right">
                                                        <h4>5</h4>
                                                        <p className="m-0">Joined</p>
                                                    </div>
                                                    <div className="group-section-box-item">
                                                        <h4>5</h4>
                                                        <p className="m-0">vCoins</p>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="add-group-section-box">
                                            <fieldset>
                                                <legend>Group Study</legend>
                                                <div className="group-section-box">
                                                    <div className="group-section-box-item border-right">
                                                        <h4>7</h4>
                                                        <p className="m-0">Created</p>
                                                    </div>
                                                    <div className="group-section-box-item border-right">
                                                        <h4>5</h4>
                                                        <p className="m-0">Joined</p>
                                                    </div>
                                                    <div className="group-section-box-item">
                                                        <h4>30</h4>
                                                        <p className="m-0">vCoins</p>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="add-group-section-box">
                                            <fieldset>
                                                <legend>Help</legend>
                                                <div className="group-section-box">
                                                    <div className="group-section-box-item border-right">
                                                        <h4>7</h4>
                                                        <p className="m-0">Given</p>
                                                    </div>
                                                    <div className="group-section-box-item border-right">
                                                        <h4>5</h4>
                                                        <p className="m-0">Joined</p>
                                                    </div>
                                                    <div className="group-section-box-item">
                                                        <h4>30</h4>
                                                        <p className="m-0">vCoins</p>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </Grid>

                                </Grid>
                            </div>
                            <div className="collbration-select mt-2">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <FormControl sx={{ m: 1, minWidth: '100%' }}>
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
                                                                // setSubfilterId(filteredNames._id);
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
                                                else {
                                                    // setSubfilterId('');
                                                    // console.log(subfilterId,"subfilterId")
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
                                                id="combo-box-demo"
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
                                                    <TextField {...params} placeholder="Select Subject" />
                                                )}
                                            />

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <FormControl sx={{ m: 1, minWidth: '100%' }}>
                                            <Select
                                                value={age}
                                                onChange={handleChange1}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="">Select request type</MenuItem>
                                                <MenuItem value={11} onClick={getUserWiseCollabaration}>My request</MenuItem>
                                                <MenuItem value={21} onClick={getAllCollabarations}>Other request</MenuItem>
                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <FormControl sx={{ m: 1, minWidth: '100%' }}>
                                            <Select
                                                value={type}
                                                onChange={handletypeChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="">Type</MenuItem>
                                                <MenuItem value={13}>Challange</MenuItem>
                                                <MenuItem value={23}>Group study</MenuItem>
                                                <MenuItem value={33}>Help</MenuItem>
                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div className="month-date">
                                            <FormControl sx={{ m: 1, minWidth: '100%' }}>
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                                        <DatePicker views={['month', 'year']} />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </FormControl>
                                        </div>
                                    </Grid>

                                </Grid>
                            </div>

                            {collaborations.length > 0 ? collaborations.map((cdata, i) =>
                                <div className="collbaration-subject-content mt-2 result-time">
                                    <div className="today-date border-bottom mb-1 pb-1">
                                        Date: <b>{dayjs(cdata.c_dt).format('DD/MM/YYYY')}</b>
                                    </div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={5}>
                                            <div className="collbaration-subject-content-left">
                                                <p className="m-0">By:&nbsp;<span className="font-w600 primary-color">{cdata.user_name}</span></p>
                                                <p className="m-0">Subject:&nbsp;<span className="font-w600 primary-color">{cdata.sub_name}</span></p>
                                                <div>Chapter:&nbsp;<span className="font-w600 primary-color">{cdata.topic_name}</span></div>
                                                <div>Topic:&nbsp;<span className="font-w600 primary-color">{cdata.chap_name}</span></div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={7}>
                                            <div className='collbaration-vcoins'>
                                                <ul>
                                                    <li>
                                                        <span className="m-0">vCoins:<span className="primary-color font-w600 pl-1">50/100</span></span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <span className='pr-1'>Rating:</span>
                                                            <span className='rating-number-collbaration pl-1'>&nbsp;4</span>
                                                            <span className="primary-color rating-icons-collbaration pl-1">
                                                                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarHalfIcon />
                                                            </span>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="collbaration-time">
                                                            <span>Time: <span className="font-w600 primary-color">{cdata.c_ts}</span></span>
                                                        </span>
                                                    </li>
                                                    <li onClick={() => {
                                                        setShowTable(true);
                                                        getAllUserCollabarations();
                                                    }}>
                                                        <ul className="buddies-img">
                                                            <li><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/learnerImage4.jpg" alt="" /></li>
                                                            <li><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/learnerImage2.jpeg" alt="" /></li>
                                                            <li><img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/learnerImage3.jpeg" alt="" /></li>
                                                        </ul>
                                                    </li>
                                                    {/* <li>
                                                     <i className="fa fa-pencil" style={{ "cursor": "pointer" }} onClick={() => handleEdit(cdata)}
                                                                                aria-hidden="true"> </i>
                                              </li> */}
                                                    <li>
                                                        <AppButton children="Accept" styleClass='verify-btn primary-bg text-white w-10 pl-2 pr-2' />
                                                    </li>
                                                    <li>
                                                        <AppButton children="Ingore" styleClass='cancel-outline w-10 pl-2 pr-2' />
                                                    </li>
                                                </ul>




                                            </div>
                                        </Grid>

                                    </Grid>
                                    <div className="clearfix"></div>
                                </div>
                            ) :
                                <div>
                                    {/* <LoadingSpinner />  */}
                                </div>
                            }

                            {showtable ? <div className="result-time result-table mt-2">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>vCoins</th>
                                            <th>Rating</th>
                                            <th>Marks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usercollaborations.length > 0 ? usercollaborations.map((cdata, i) =>
                                            <tr>
                                                <td>{cdata.user_name}</td>
                                                <td>Joined</td>
                                                <td>50/100</td>
                                                <td>4</td>
                                                <td>25</td>
                                            </tr>
                                        ) :
                                            <div>
                                                {/* <LoadingSpinner />  */}
                                            </div>
                                        }
                                    </tbody>
                                </table>
                            </div>
                                : ''}

                        </div>
                    </Main>
                </Box>
                <div className="footer">
                    <FooterCopyright />
                </div>

            </div>

            <div className="new-collaboration-model">
                <Modal
                    open={open1}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-titile">
                            <span className="float-left">
                                <h4><img src={`${assetUrl}/curriculim/view%20credintials.svg`} alt="" />&nbsp;&nbsp;Add New Collaboration</h4>
                            </span>
                            <span className="float-right" onClick={handleClose}>
                                <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />

                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                            <div className="new-collaboration">
                                <div className="form-group mb-2">
                                    <TextField id="filled-basic" label="Collaboration Name" variant="filled" placeholder='Ex:- IIT Physics Project' className="w-100" value={cname} onChange={cnameHandler} />
                                </div>


                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={5}>
                                        <label>Date</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker label="Start Date" disableFuture={true} value={dayjs(startdate)} onChange={(date: any) => {
                                                    let today = date.$d;
                                                    setStartDate(today)
                                                }
                                                } />
                                            </DemoContainer>
                                        </LocalizationProvider>

                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <label>Time</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={[
                                                    'MobileTimePicker',
                                                ]}
                                            >

                                                <DemoItem>
                                                    <MobileTimePicker
                                                        value={selectedTime}
                                                        onChange={(date: any) => {
                                                            let today = date.$d;
                                                            setSelectedTime(today)
                                                        }
                                                        }
                                                    //    onChange={handleTimeChange} 
                                                    />
                                                </DemoItem>

                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <label>Type</label>
                                        {/* <FormControl sx={{ m: 1, minWidth: '100%' }}>
                                            <Select
                                                value={type}
                                                // onChange={typeChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="">Type</MenuItem>
                                                <MenuItem value={13}>Challange</MenuItem>
                                                <MenuItem value={23}>Group study</MenuItem>
                                                <MenuItem value={33}>Help</MenuItem>
                                            </Select>

                                        </FormControl> */}

                                        <Dropdown
                                                    name="frequence"
                                                    value={selectedType} 
                                                    options={ctypes}
                                                    title="Select Type" selectStyle="w-100"
                                                    handleChange={(e: any) => {
                                                        handleCTypeChange(e)
                                                    }}
                                                    selectedValue={selectedType} />
                                    </Grid>
                                    {/* <p>This Collaboration starts on July 23th, 2023 and need to be completed by Some date.</p> */}
                                </Grid>


                                <div className="form-group mb-2 mt-2">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <label>Subject</label>
                                            {/* <FormControl variant="filled" className="w-100">
                                                <InputLabel id="demo-simple-select-filled-label">Academic</InputLabel>
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
                                            </FormControl> */}
                                            <Autocomplete
                                                value={subname}
                                                onChange={(event, newValue) => {

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
                                                                console.log("getCourseContent>>collaboration")
                                                                //    let subId = filteredNames._id;
                                                                // console.log(subId,"hhyyh")
                                                                if (filteredNames._id) {
                                                                    setSubId(filteredNames._id);
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
                                                    console.log(subId, "h")
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
                                                    <TextField {...params}
                                                        placeholder="-Select-"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <label >Chapter</label>
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
                                                                localStorage.setItem('chapterId', filteredNames._id!)
                                                                if (filteredNames._id) {
                                                                    setChapterId(filteredNames._id);
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
                                                        placeholder="-Select-"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <label >Topic</label>
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
                                                        placeholder="-Select-"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                {/* <div className="form-group mb-2 mt-2">
                                    <div className="upload-attachments">
                                        <label className="font-w600">Upload Attachments</label>
                                        <div className="upload-attachment-item">

                                            <input type="file" multiple onChange={handleImageUpload} />
                                            <img src={`${assetUrl}/cloud_upload.svg`} alt="" />&nbsp;
                                        </div>
                                        <div>
                                        {file &&

<div>
  <p>{fileData}</p>
</div>
}
                                        </div>
                                    </div>
                                </div> */}
                                <div className="form-group mb-2">

                                    <TextField
                                        id="filled-multiline-static"
                                        label="LInk URL"
                                        className="w-100"
                                        name="clink" value={clink} onChange={clinkHandler}
                                    />
                                </div>
                                <div className="form-group mb-2">

                                    <TextField
                                        id="filled-multiline-static"
                                        label="Add Description"
                                        className="w-100"
                                        multiline
                                        rows={3}
                                        name="ctext" value={ctext} onChange={ctextHandler}
                                        variant="filled"
                                    />
                                </div>
                                {/* 
<div className="form-group w-100">
<label className="font-w600 w-100">Add Collaboration Notes</label>
                                            <TextField name="ctext" className="w-100" value={ctext} id="ctext" onChange={ctextHandler}  radius="5px"
                                                placeholder="Add Description" />
                                        </div> */}

                                <div className="text-center mb-3 mt-2">
                                    <AppButton children={saveBtn} onClick={collaborationSubmit} styleClass='btn primary-bg w150 pl-2 pr-2 mr-3 text-white' />
                                    <AppButton children="Cancel" onClick={handleClose} styleClass='btn cancel-outline w150 pl-2 pr-2 ' />
                                </div>

                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>


        </div>
    );
}


