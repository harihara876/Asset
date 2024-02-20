
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import HeaderCurriculum from 'vridhee_common_component_mf/HeaderCurriculum';
import FooterCopyright from 'vridhee_common_component_mf/FooterCopyright';
import AppInput from 'vridhee_common_component_mf/AppInput';
import Dropdown from "vridhee_common_component_mf/Dropdown";
import Sidebar from './Sidebar';
import configJson from "vridhee_common_component_mf/configJson";
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppButton from 'vridhee_common_component_mf/AppButton';
import Textarea from '@mui/joy/Textarea';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import DashboardService from '../Services/dashboardservices';
import IDashboard from '../Models/IDashboard';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

interface ISubject {
    subjects: IDashboard[]
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


export default function Collaboration() {
    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    let [subId, setSubId] = useState('');
    let [topicId, setTopicId] = useState('');
    let [chapterId, setChapterId] = useState('');
    const filter = createFilterOptions<FilmOptionType>();

    const [startdate, setStartDate] = useState(new Date());
    const [endddate, setEndDate] = useState('');

    const [subject, setSubject] = useState<ISubject>({
        subjects: [] as IDashboard[]
    })

    const [collaboration, setCollaboration] = useState<ICollaboration>({
        collaborations: [] as IDashboard[]
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
    const [age, setAge] = React.useState('');

    const handleChange1 = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };

    const [open2, setOpen2] = React.useState(false);
    const handleOpen1 = () => setOpen2(true);
    const handleClose1 = () => setOpen2(false);

     const ctextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setCtext(target.value);
        console.log(target.value,"target.value")
    }
    
    const clinkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setClink(target.value);
        console.log(target.value,"target.value")
    }

    const cnameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setCname(target.value);
        console.log(target.value,"target.value")
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

    useEffect(() => {
         const body = {
        "db_metadata":25
      }
        DashboardService.getAllCollabarations(body)
            .then(res => {
                console.log(res.data.details, "getAllCollabarations")
                if (res.data.status == 200) {

                    // var newData: any = res.data.details.map((data: any) => {
                    //     data.c_date = data.up_dts.split('T')[0];
                    //     // data.c_ts =new Date(data.c_ts).toLocaleString();
                    //     return data;
                    // });

                    // let date = format(startdate, 'yyyy-dd-MM')
                    // console.log(date,"date")
                    // let time = format(startdate, 'hh:mm')
                    // console.log(time,"time")


                    setCollaboration({
                        ...collaboration, collaborations:res.data.details
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
    
    const getUserWiseCollabaration = () => {
        const body = {
            "db_metadata": 25,
            "user_id": localStorage.getItem('Tokenuserid')       
     }
       DashboardService.getUserWiseCollabaration(body)
           .then(res => {
            console.log(res.data.details, "getUserWiseCollabaration")
               if (res.data.status == 200) {
                   setUserCollaboration({
                    ...usercollaboration, usercollaborations: res.data.details
                })
               } else {
                   // toast.error(res.data.message)
               }
               console.log(usercollaboration,"usercollaboration")
           })
           .catch(e =>
               console.log(e, "e")
           );
    }

    useEffect(() => {
        getUserWiseCollabaration();
       // empty dependency array means this effect will only run once (like componentDidMount in classes)
   }, [])

    const { usercollaborations } = usercollaboration;
    const { collaborations } = collaboration;
    const { courses } = courseDetail;

const { subjects } = subject;
const { topics } = topic;


const handleImageUpload = (e: any) => {
    const data = e.target.files[0]
    fileData = e.target.files[0].name
    console.log(fileData,"fileDatafileData")
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

      let date = format(startdate, 'yyyy-dd-MM')
    console.log(date,"date")
    let time = format(startdate, 'hh:mm')
    console.log(time,"time")

    const obj = {
        "db_metadata":25,
        "user_id":localStorage.getItem('Tokenuserid'),
        "name":cname,
        "sub_id":subId,

        "chap_id":localStorage.getItem('chapterId'),

        "t_id":topicId,
        "c_text":ctext,
        "c_dt":date,
        "c_ts":time,

        "c_type": 1,

        "t_allow":1,
        "is_allow":1,

        "j_list": [
            {
                "c_u_id": "65c5ffe861b870936e24114b"
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
             getUserWiseCollabaration();
            } else {
              toast.error(res.data.msg);
            }
          })
          .catch(err => {
            toast.error(err.message);
          });
};

    return (
        <div>
            <div className="dashboard-sec">
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <CssBaseline />
                        <AppBar position="fixed" open={open}>
                            <HeaderCurriculum module="Curriculum"/>
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
                                    <Link color="#174392" to="/dashboard">
                                        Dashboard
                                    </Link>
                                    <Typography color="#62676C">Collaboration</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="content-tabs-collab">

                                <div className="mt-2">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <div className="search-box">
                                                <div className="form-group">
                                                    <AppInput type="text" label="Search here..." selectStyle="w-100" name="Search here..." radius="5px" value={name}
                                                        placeholder="Search Collaborations or Member" />
                                                </div>
                                                <div className="search-icon1">
                                                    <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/search1.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="add-project" onClick={handleOpen}>
                                                <AppButton children="Add New Collaboration +" styleClass='verify-btn primary-bg text-white w-100' />
                                            </div>

                                            <div className="students-dashboard">
                                            {usercollaborations?.length > 0 ? usercollaborations?.map((data, i) =>
                                                <div className="w-50">
                                               
                                                    <div className="student-dashboard text-center">
                                                        <div className="student-dashboard-con">
                                                            <span><img src={`${assetUrl}/curriculim/Completed%20logo.png`} alt="" /></span>
                                                            <span className="font-w600">0</span>
                                                            <span>Students</span>
                                                            <div className="clearfix"></div>
                                                            <h4>{data.name}</h4>
                                                            <p className="m-0">0 New comments</p>
                                                        </div>
                                                        <div className="add-new-people-btn">
                                                            Add New People&nbsp;<span><i className="fa fa-user-plus" aria-hidden="true"></i></span>
                                                        </div>

                                                    </div>

                                                </div>
                                                 ) :''} 
                                                
                                                {/* <div className="w-50">
                                                    <div className="student-dashboard text-center">
                                                        <div className="student-dashboard-con">
                                                            <span><img src={`${assetUrl}/curriculim/Completed%20logo.png`} alt="" /></span>
                                                            <span className="font-w600">3</span>
                                                            <span>Students</span>
                                                            <div className="clearfix"></div>
                                                            <h4>Dashboard</h4>
                                                            <p className="m-0">3 New comments</p>
                                                        </div>
                                                        <div className="add-new-people-btn">
                                                            Add New People&nbsp;<span><i className="fa fa-user-plus" aria-hidden="true"></i></span>
                                                        </div>

                                                    </div>
                                                </div> */}
                                                {/* <div className="w-50">
                                                    <div className="student-dashboard text-center">
                                                        <div className="student-dashboard-con">
                                                            <span><img src={`${assetUrl}/curriculim/Completed%20logo.png`} alt="" /></span>
                                                            <span className="font-w600">3</span>
                                                            <span>Students</span>
                                                            <div className="clearfix"></div>
                                                            <h4>Dashboard</h4>
                                                            <p className="m-0">3 New comments</p>
                                                        </div>
                                                        <div className="add-new-people-btn">
                                                            Add New People&nbsp;<span><i className="fa fa-user-plus" aria-hidden="true"></i></span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="w-50">
                                                    <div className="student-dashboard text-center">
                                                        <div className="student-dashboard-con">
                                                            <span><img src={`${assetUrl}/curriculim/Completed%20logo.png`} alt="" /></span>
                                                            <span className="font-w600">3</span>
                                                            <span>Students</span>
                                                            <div className="clearfix"></div>
                                                            <h4>Dashboard</h4>
                                                            <p className="m-0">3 New comments</p>
                                                        </div>
                                                        <div className="add-new-people-btn">
                                                            Add New People&nbsp;<span><i className="fa fa-user-plus" aria-hidden="true"></i></span>
                                                        </div>

                                                    </div>
                                                </div> */}
                                                <div className="clearfix"></div>
                                            </div>


                                            <div className="new-request-sec">
                                                <div className="new-request-btn">
                                                    <span className='float-left'>
                                                        <h4 className="font-w600 primary-color">New Requests <div className="tooltips">3</div></h4>
                                                    </span>
                                                    <span className='float-right'>
                                                        <button type="button" className="btn light-green-btn"><img src={`${assetUrl}/show1.svg`} alt="" style={{ 'width': '20px' }} />&nbsp;View All</button>
                                                    </span>
                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="new-request-list">

                                                {collaborations?.map((data, i) =>
                                                    <div className="new-request-list-item">
                                                        <div className="new-request-list-item-title">
                                                            p
                                                        </div>
                                                        <div className="new-request-list-item-con">
                                                            <h4>{data.name}</h4>
                                                            <p className="m-0">
                                                                {/* July 14, 2023 - 10pm */}
                                                                {data.c_dt} - {data.c_ts}
                                                                </p>
                                                        </div>
                                                        <div className="new-request-list-bottom">
                                                            <div className="float-left">
                                                                <span><img src={`${assetUrl}/attachment1.svg`} style={{ "position": "relative", "top": "6px" }} alt="" /></span>&nbsp;&nbsp;<span><div className="download-zip">
                                                                Resources.zip
                                                                {/* {data.c_link} */}
                                                                </div></span></div>
                                                            <div className="float-right">
                                                                <span className="mr-1"><img src={`${assetUrl}/curriculim/Completed%20logo.png`} alt="" /></span>
                                                                <span className="font-w600 mr-1">3</span>
                                                                <span>Students</span>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                )}
                                                    {/* <div className="new-request-list-item">
                                                        <div className="new-request-list-item-title">
                                                            p
                                                        </div>
                                                        <div className="new-request-list-item-con">
                                                            <h4>Maths Project work</h4>
                                                            <p className="m-0">July 14, 2023 - 10pm</p>
                                                        </div>
                                                        <div className="new-request-list-bottom">
                                                            <div className="float-left"><span><img src={`${assetUrl}/attachment1.svg`} style={{ "position": "relative", "top": "6px" }} alt="" /></span>&nbsp;&nbsp;<span><div className="download-zip">Resources.zip</div></span></div>
                                                            <div className="float-right">
                                                                <span className="mr-1"><img src={`${assetUrl}/curriculim/Completed%20logo.png`} alt="" /></span>
                                                                <span className="font-w600 mr-1">3</span>
                                                                <span>Students</span>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div className="new-request-list-item">
                                                        <div className="new-request-list-item-title">
                                                            p
                                                        </div>
                                                        <div className="new-request-list-item-con">
                                                            <h4>Maths Project work</h4>
                                                            <p className="m-0">July 14, 2023 - 10pm</p>
                                                        </div>
                                                        <div className="new-request-list-bottom">
                                                            <div className="float-left"><span><img src={`${assetUrl}/attachment1.svg`} style={{ "position": "relative", "top": "6px" }} alt="" /></span>&nbsp;&nbsp;<span><div className="download-zip">Resources.zip</div></span></div>
                                                            <div className="float-right">
                                                                <span className="mr-1"><img src={`${assetUrl}/curriculim/Completed%20logo.png`} alt="" /></span>
                                                                <span className="font-w600 mr-1">3</span>
                                                                <span>Students</span>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div className="new-request-list-item">
                                                        <div className="new-request-list-item-title">
                                                            p
                                                        </div>
                                                        <div className="new-request-list-item-con">
                                                            <h4>Maths Project work</h4>
                                                            <p className="m-0">July 14, 2023 - 10pm</p>
                                                        </div>
                                                        <div className="new-request-list-bottom">
                                                            <div className="float-left"><span><img src={`${assetUrl}/attachment1.svg`} style={{ "position": "relative", "top": "6px" }} alt="" /></span>&nbsp;&nbsp;<span><div className="download-zip">Resources.zip</div></span></div>
                                                            <div className="float-right">
                                                                <span className="mr-1"><img src={`${assetUrl}/curriculim/Completed%20logo.png`} alt="" /></span>
                                                                <span className="font-w600 mr-1">3</span>
                                                                <span>Students</span>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div className="new-request-list-item">
                                                        <div className="new-request-list-item-title">
                                                            p
                                                        </div>
                                                        <div className="new-request-list-item-con">
                                                            <h4>Maths Project work</h4>
                                                            <p className="m-0">July 14, 2023 - 10pm</p>
                                                        </div>
                                                        <div className="new-request-list-bottom">
                                                            <div className="float-left"><span><img src={`${assetUrl}/attachment1.svg`} style={{ "position": "relative", "top": "6px" }} alt="" /></span>&nbsp;&nbsp;<span><div className="download-zip">Resources.zip</div></span></div>
                                                            <div className="float-right">
                                                                <span className="mr-1"><img src={`${assetUrl}/curriculim/Completed%20logo.png`} alt="" /></span>
                                                                <span className="font-w600 mr-1">3</span>
                                                                <span>Students</span>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div className="new-request-list-item">
                                                        <div className="new-request-list-item-title">
                                                            p
                                                        </div>
                                                        <div className="new-request-list-item-con">
                                                            <h4>Maths Project work</h4>
                                                            <p className="m-0">July 14, 2023 - 10pm</p>
                                                        </div>
                                                        <div className="new-request-list-bottom">
                                                            <div className="float-left"><span><img src={`${assetUrl}/attachment1.svg`} style={{ "position": "relative", "top": "6px" }} alt="" /></span>&nbsp;&nbsp;<span><div className="download-zip">Resources.zip</div></span></div>
                                                            <div className="float-right">
                                                                <span className="mr-1"><img src={`${assetUrl}/curriculim/Completed%20logo.png`} alt="" /></span>
                                                                <span className="font-w600 mr-1">3</span>
                                                                <span>Students</span>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <div className="collaboration-tabs mb-2">
                                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                    <Tab label="My Collaboration" {...a11yProps(0)} />
                                                    <Tab label="Other Request" {...a11yProps(1)} />

                                                </Tabs>
                                            </div>
                                            <CustomTabPanel value={value} index={0}>
                                                <div className="collaboration-section">
                                                    <div className="task-project">
                                                        <p className="m-0">
                                                            <span className="float-left">Section</span>
                                                            <span className="float-right"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                                            <div className="clearfix"></div>
                                                        </p>
                                                        <h4 className="primary-color">How do I add a task to this Project?</h4>
                                                        <div className="dropdown mt-2">
                                                            <Dropdown
                                                                id="Select Project"
                                                                name="text"
                                                                options={options}
                                                                title="Sort by" selectStyle="w-100"
                                                            />
                                                        </div>
                                                        <div className="accept-request">
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="#259D08" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" /></svg>&nbsp;&nbsp;3 Accepted this request
                                                        </div>
                                                        <div className="giveto-person mt-1">
                                                            <div className="float-left" style={{ 'position': 'relative', 'top': '3px' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>&nbsp;&nbsp;Give to Dipyaman
                                                            </div>
                                                            <div className="float-right">
                                                                <div className="circle30">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
                                                                </div>

                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="priority-sec mt-1 mb-1">
                                                            <span><FormControlLabel control={<Checkbox />} label="Priority" /></span>
                                                            <span className="tooltip">High</span>
                                                        </div>
                                                        <div className="acceptance"><svg xmlns="http://www.w3.org/2000/svg" style={{ "position": 'relative', 'top': '2px' }} height="1em" fill="#174290" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>&nbsp;&nbsp;Source of Acceptance</div>
                                                        <div className="add-button-collaboration" onClick={handleOpen}>
                                                            <img src={`${assetUrl}/add1.svg`} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="task-project">
                                                    <p className="m-0">
                                                            <span className="float-left">Section</span>
                                                            <span className="float-right"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                                            <div className="clearfix"></div>
                                                        </p>
                                                        <h4 className="primary-color">How do I add a task to this Project?</h4>
                                                        <div className="dropdown mt-2">
                                                            <Dropdown
                                                                id="Select Project"
                                                                name="text"
                                                                options={options}
                                                                title="Sort by" selectStyle="w-100"
                                                            />
                                                        </div>
                                                        <div className="accept-request">
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="#259D08" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" /></svg>&nbsp;&nbsp;3 Accepted this request
                                                        </div>
                                                        <div className="giveto-person mt-1">
                                                            <div className="float-left" style={{ 'position': 'relative', 'top': '3px' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>&nbsp;&nbsp;Give to Dipyaman
                                                            </div>
                                                            <div className="float-right">
                                                                <div className="circle30">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
                                                                </div>

                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="priority-sec mt-1 mb-1">
                                                            <span><FormControlLabel control={<Checkbox />} label="Priority" /></span>
                                                            <span className="tooltip">High</span>
                                                        </div>
                                                        <div className="acceptance"><svg xmlns="http://www.w3.org/2000/svg" style={{ "position": 'relative', 'top': '2px' }} height="1em" fill="#174290" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>&nbsp;&nbsp;Source of Acceptance</div>
                                                        <div className="add-button-collaboration" onClick={handleOpen}>
                                                            <img src={`${assetUrl}/add1.svg`} alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={1}>
                                                <div className="other-request-sec">
                                                {usercollaborations?.length > 0 ? usercollaborations?.map((data, i) =>
                                                    <div className="other-request-sec-title">
                                                        <span className="float-left">
                                                            <h4>{data.name}</h4>
                                                            <p>Updated July 15th, 2023</p>
                                                        </span>
                                                        <span className="float-right">
                                                            <AppButton children="Add New Task +" styleClass='verify-btn primary-bg text-white' />
                                                        </span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                ) : ''}
                                                    {/* <div className="other-request-sec-title">
                                                        <span className="float-left">
                                                            <h4>Maths Olympiad</h4>
                                                            <p>Updated July 15th, 2023</p>
                                                        </span>
                                                        <span className="float-right">
                                                            <AppButton children="Add New Task +" styleClass='verify-btn primary-bg text-white' />
                                                        </span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="today-list">
                                                        <p><b>Today</b></p>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div className="today-list mt-3">
                                                        <p><b>July 14th, 2023</b></p>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div className="today-lis mt-2">
                                                        <p><b>July 13th, 2023</b></p>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="today-list-item">
                                                            <ul>
                                                                <li>
                                                                    <span><div className="circle40">F</div></span>
                                                                    <span><b>Final Assignment</b></span>
                                                                </li>
                                                                <li>The fonts are too close….</li>
                                                                <li></li>
                                                                <li className="text-right">
                                                                    <div className="circle20 mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg></div>
                                                                    <div className="circle20">+2</div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </CustomTabPanel>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <div className="share-project">
                                                <h3 className="mb-1">Share Project</h3>
                                                <div className="invite-email">
                                                    <p className="font-w600">Invite with Email</p>
                                                    <div className="position-relative mb-1">
                                                        <div className="w-80">
                                                            <AppInput type="text" label="" selectStyle="w-100 border-r" name="Search here..." radius="5px" value={name}
                                                                placeholder="Dipyaman.baral@gmail.com" />
                                                            <div className="inputtype-circle">
                                                                D
                                                            </div>
                                                        </div>
                                                        <div className="w-20">
                                                            <img src={`${assetUrl}/add_circle.svg`} alt="" />
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="position-relative mb-1">
                                                        <Dropdown
                                                            id="Select Project"
                                                            name="text"
                                                            options={options}
                                                            title="Sort by" selectStyle="w-100"
                                                        />
                                                    </div>
                                                    <div className="position-relative mb-1">
                                                        <Textarea name="Outlined" minRows={3} placeholder="Type in here…" variant="outlined" />
                                                        <div className="text-right invit-btn mt-2">
                                                            <span className="mr-2">Cancel</span>
                                                            <span><AppButton children="Save" styleClass='verify-btn primary-bg text-white border-r ' /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="invit-files mt-3">
                                                    <div className="invit-files-title mb-1">
                                                        <span className='float-left'>
                                                            <h4 className="font-w600 ">Files</h4>
                                                        </span>
                                                        <span className='float-right' onClick={handleOpen1}>
                                                            <button type="button" className="btn light-green-btn"><img src={`${assetUrl}/show1.svg`} alt="" style={{ 'width': '20px', 'position': 'relative', 'top': '4px' }} />&nbsp;View All</button>
                                                        </span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div>
                                                        <div className="circle50">
                                                            <img src={`${assetUrl}/curriculim/video%20below%20add%20note.svg`} alt="" />
                                                        </div>
                                                        <div className="invit-files-content border-bottom pb-1 mb-1">
                                                            <h4>File Name</h4>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div>
                                                        <div className="circle50">
                                                            <img src={`${assetUrl}/curriculim/video%20below%20add%20note.svg`} alt="" />
                                                        </div>
                                                        <div className="invit-files-content border-bottom pb-1 mb-1">
                                                            <h4>File Name</h4>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div>
                                                        <div className="circle50">
                                                            <img src={`${assetUrl}/curriculim/video%20below%20add%20note.svg`} alt="" />
                                                        </div>
                                                        <div className="invit-files-content border-bottom pb-1 mb-1">
                                                            <h4>File Name</h4>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="invit-files mt-2">
                                                    <div className="invit-files-title mb-2">
                                                        <span className='float-left'>
                                                            <h4 className="font-w600 ">Updates</h4>
                                                        </span>
                                                        <span className='float-right'>
                                                            <button type="button" className="btn light-green-btn"><img src={`${assetUrl}/show1.svg`} alt="" style={{ 'width': '20px', 'position': 'relative', 'top': '4px' }} />&nbsp;View All</button>
                                                        </span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div>
                                                        <div className="circle50">
                                                            <img src={`${assetUrl}/curriculim/video%20below%20add%20note.svg`} alt="" />
                                                        </div>
                                                        <div className="invit-files-content border-bottom pb-1 mb-1">
                                                            <h4>
                                                                <span className="float-left">Subject name</span>
                                                                <span className="float-right"><small>July 14, 7:00PM</small></span>
                                                                <div className="clearfix"></div>
                                                            </h4>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div>
                                                        <div className="circle50">
                                                            <img src={`${assetUrl}/curriculim/video%20below%20add%20note.svg`} alt="" />
                                                        </div>
                                                        <div className="invit-files-content border-bottom pb-1 mb-1">
                                                            <h4>
                                                                <span className="float-left">Subject name</span>
                                                                <span className="float-right"><small>July 14, 7:00PM</small></span>
                                                                <div className="clearfix"></div>
                                                            </h4>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>

                                                    <div className="clearfix"></div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>



                        </div>
                    </Main>
                </Box>
                <div className="footer">
                    <FooterCopyright />
                </div>
                <div className="collaboration-model">
                    <Modal
                        open={open1}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="modal-titile">
                                <span className="float-left">
                                    <h4><img src={`${assetUrl}/curriculim/view%20credintials.svg`} alt="" />&nbsp;&nbsp;Create a New Poll</h4>
                                </span>
                                <span className="float-right" onClick={handleClose}>
                                    <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />

                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="modal-content mt-1">
                                <div className="new-collaboration">
                                    <div className="form-group mb-2">
                                        <TextField id="filled-basic" label="Collaboration Name" variant="filled" placeholder='Ex:- IIT Physics Project' className="w-100" />
                                    </div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']} > 
                                                <DatePicker label="Start Date" />
                                            </DemoContainer>
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker label="End Date" />
                                            </DemoContainer>
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                   
                                    <div className="form-group mb-2 mt-2">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <label className="font-w600">Collaboration Type</label>
                                            <FormControl variant="filled" className="w-100">
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
                                                    <MenuItem value="">this
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    </div>
                                    <div className="form-group mb-2 mt-2">
                                    <div className="upload-attachments">
                                        <label className="font-w600">Upload Attachments</label>
                                        <div className="upload-attachment-item">
                                            <input type="file" value="" name="" />
                                           
                                            <img src={`${assetUrl}/cloud_upload.svg`} alt="" />&nbsp;Upload
                                        </div>
                                    </div>
                                </div>
                                    <div className="form-group mb-2">
                                    <label className="font-w600 w-100">Add Collaboration Notes</label>
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
                                    <div className="text-center mb-3 mt-2">
                                    <AppButton children="Create" styleClass='btn primary-bg w150 pl-2 pr-2 mr-3 text-white' />
                                    <AppButton children="Cancel" onClick={handleClose} styleClass='btn cancel-outline w150 pl-2 pr-2 ' />
                                </div>
                                   
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
                <div className="all-views">
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
                                    <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Files</h4>
                                </span>
                                <span className="float-right" onClick={handleClose1}>
                                    <img src={`${assetUrl}/curriculim/close.svg`} style={{ 'width': '20px' }} alt="" />
                                </span>
                                <div className="clearfix"></div>
                            </div>
                            <div className="modal-content mt-1">
                           
                            <div className="views-item">
                                <div className="circle60">DP</div>
                                <div className="views-item-right border-bottom mb-2 pb-2">
                                    <span className="float-left">
                                        <h4>File Name</h4>
                                    </span>
                                    <span className="float-right">
                                         <p className="m-0">July 14, 7:00PM</p>
                                    </span>
                                    <div className="clearfix"></div>
                                    <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="views-item">
                                <div className="circle60">DP</div>
                                <div className="views-item-right border-bottom mb-2 pb-2">
                                    <span className="float-left">
                                        <h4>File Name</h4>
                                    </span>
                                    <span className="float-right">
                                         <p className="m-0">July 14, 7:00PM</p>
                                    </span>
                                    <div className="clearfix"></div>
                                    <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="views-item">
                                <div className="circle60">DP</div>
                                <div className="views-item-right border-bottom mb-2 pb-2">
                                    <span className="float-left">
                                        <h4>File Name</h4>
                                    </span>
                                    <span className="float-right">
                                         <p className="m-0">July 14, 7:00PM</p>
                                    </span>
                                    <div className="clearfix"></div>
                                    <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            
                           
                           
                            


                            </div>
                        </Box>
                    </Modal>
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
                                        <TextField id="filled-basic" label="Collaboration Name" variant="filled" placeholder='Ex:- IIT Physics Project' className="w-100"   value={cname}  onChange={cnameHandler}/>
                                    </div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6}>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Start Date" disableFuture={true} onChange={(date: any) => {
                              let today = date.$d;
                              setStartDate(today)
                            }
                            } />
                          </DemoContainer>
                        </LocalizationProvider>
{/* 
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']} > 
                                                <DatePicker label="Start Date" value={startdate} disableFuture={true} onChange={(start: any) => {
                              setStartDate(start)
                            }} /> */}
                                            {/* </DemoContainer>
                                            </LocalizationProvider> */}
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker label="End Date" value={endddate} onChange={(date: any) => {
                              setEndDate(date)
                            }}/>
                                            </DemoContainer>
                                            </LocalizationProvider>
                                        </Grid>
                                        <p>This Collaboration starts on July 23th, 2023 and need to be completed by Some date.</p>
                                    </Grid>
                                   
                                    <div className="form-group mb-2 mt-2">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <label className="font-w600">Subject</label>
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
console.log(newValue,"hhh")
                                                    if (newValue) {
                                                        subjects.filter(sub =>
                                                            sub.name == newValue.name).filter(filteredNames => {
                                                                console.log("getCourseContent>>collaboration")
                                                            //    let subId = filteredNames._id;
                                                                // console.log(subId,"hhyyh")
                                                                if(filteredNames._id){
                                                                    setSubId(filteredNames._id); 
                                                                    DashboardService.getCourseContent(filteredNames._id)
                                                                    .then(res => {
                                                                        if (res.data.data) {
                                                                            console.log(res.data.data.course, "topicresult")
                                                                            setCourseDetail({
                                                                                ...courseDetail, courses: res.data.data.course
                                                                            })
                                                                            console.log(res.data.data.course,"fgff")
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
                                                    console.log(subId,"h")
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
                                                    console.log(newValue,"newValue")
                                                    if (newValue) {
                                                        courses.filter(course =>
                                                            course.chapter.name == newValue.chapter.name).filter(filteredNames => {
                                                                console.log(filteredNames,"filteredNames")
                                                                let chapterId = filteredNames._id;
                                                                if(filteredNames._id){
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
                                                    console.log(newValue,"newValuetttttttttttttt")
                                                    if (newValue) {
                                                        topics.filter(topic =>
                                                            topic.name == newValue.name).filter(filteredNames => {
                                                                console.log(filteredNames,"444444")
                                                                let topicId = filteredNames.topic_id;
                                                                if(filteredNames.topic_id){
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
                                       name="clink"  value={clink}  onChange={clinkHandler}
                                   />
                                   </div>
                                    <div className="form-group mb-2">
                                   
                                    <TextField
                                        id="filled-multiline-static"
                                        label="Add Description"
                                        className="w-100"
                                        multiline
                                        rows={3}
                                        name="ctext"  value={ctext}  onChange={ctextHandler}
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
                                    <AppButton children="Create" onClick={collaborationSubmit} styleClass='btn primary-bg w150 pl-2 pr-2 mr-3 text-white' />
                                    <AppButton children="Cancel" onClick={handleClose} styleClass='btn cancel-outline w150 pl-2 pr-2 ' />
                                </div>
                                   
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    )
}