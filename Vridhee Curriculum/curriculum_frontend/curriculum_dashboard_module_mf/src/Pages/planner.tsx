
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
import Sidebar from './Sidebar';
import configJson from "vridhee_common_component_mf/configJson";
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import AppButton from 'vridhee_common_component_mf/AppButton';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import AddIcon from '@mui/icons-material/Add';
import AppInput from 'vridhee_common_component_mf/AppInput';
import Dropdown from "vridhee_common_component_mf/Dropdown";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DashboardService from '../Services/dashboardservices';
import IDashboard from '../Models/IDashboard';
import { FormControl, FormLabel, IconButton, Radio, RadioGroup, Stack } from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers';
import { Textarea } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-big-calendar/lib/css/react-big-calendar.css';



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

interface ISubject {
    subjects: IDashboard[],
    errorMsg: string
}

interface Ifrequency {
    freqencies: [{
        name: string,
        seq: number
    }
    ]
}

interface IWeek {
    weeks: {
      id: string;
      name: string;
      seq: number;
    }[];
  }
  
  interface DayInfo {
    id: string;
    seq: number;
    name: string;
    desc: string;
  }

  interface IFreq {
    sub_id: string;
    cat_id: string;
    grade_id: string;
    f_typ: number;
    str_on: string;
    end_on: string;
    rpt_on: any[]; 
}

interface IFreqSubject {
    freqSubjects: IFreq[];
    errorMsg: string;
}

const initialSubjectState: IFreqSubject = {
    freqSubjects: [],
    errorMsg: ''
};

interface Frequency {
    sub_id: string;
    cat_id: string;
    grade_id: string;
    f_typ: number;
    str_on: string;
    end_on: string;
    rpt_on: any[]; 
    subName: string;
    startDay: string;
}

interface TimeSlot {
    f_ts: string;
    t_ts: string;
    dur: number;
    sub_id: string;
    cat_id: string;
    grade_id: string;
}

interface Plan {
    date: string;
    t_slot: TimeSlot[];
    _id: string;
}

interface DataState {
    user_id: string;
    name: string;
    desc: string;
    freq: Frequency[];
    plan: Plan[];
}

export default function Planner() {
    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [repeatdiv, setRepeatDiv] = React.useState(false);
    const [freqdiv, setFreqDiv] = React.useState(false);
    const [subdiv, setSubDiv] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState('');
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const localizer = momentLocalizer(moment)

    const [open3, setOpen3] = React.useState(false);
    // const handleOpen2 = () => setOpen3(true);
    const handleClose2 = () => setOpen3(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '1px solid #00439224',
        boxShadow: 24,
        p: 2,
    };
    const options = [
        { label: "Daily", name: 'Daily' },
        { label: "Weekly", name: 'Weekly' },
        { label: "Custom", name: 'Custom' }
    ];

    const [subject, setSubjects] = React.useState<ISubject>({
        subjects: [] as IDashboard[],
        errorMsg: ''
    })
    const [selectedSubject, setSelectedSubject] = React.useState<string | null>(null);
    const [freqSubject, setFreqSubjects] = React.useState<IFreqSubject>(initialSubjectState);

    const [freq, setfreq] = React.useState<Ifrequency>({
        freqencies: [{
            name: '',
            seq: 0
        }
        ]
    })

    const [week, setWeek] = React.useState<IWeek>({
        weeks: []
    });

    const [selectedStartTime, setSelectedStartTime] = React.useState(dayjs()); // Initialize with a default time
    const [selectedEndTime, setSelectedEndTime] = React.useState(dayjs()); 

    const handleStartTimeChange = (newTime: any) => {
        setSelectedStartTime(newTime);
    };

    const handleEndTimeChange = (newTime: any) => {
        setSelectedEndTime(newTime);
    };

    const [selectedStartDate, setSelectedStartDate] = React.useState<number | undefined | string>();
    const [selectedEndDate, setSelectedEndDate] = React.useState<number | undefined | string>();

    const handleStartOnDateChange = (date: any) => {
        setSelectedStartDate(date)
    };

    const handleEndOnDateChange = (date: any) => {
        setSelectedEndDate(date)
    };

    const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
    const [selectedOption, setSelectedOption] = React.useState<string>('');
    const [prevSubId, setPrevSubId] = React.useState<string | null>(null);

    const [studyPlanName, setStudyPlanName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleStudyPlanNameChange = (event: any) => {
        setStudyPlanName(event.target.value);
    };

    const [isDescValid, setIsDescValid] = React.useState(true);
    const [isPlannerNameValid, setIsPlannerNameValid] = React.useState(true);

    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    };


      const changeSubject = (subId: any) => {
        setSubDiv(true);
        setSelectedSubject(subId)
        if(!prevSubId || prevSubId === null) {
            setPrevSubId(subId);
            
        }
        let starttimestampInSeconds;
        let endtimestampInSeconds;

        if (selectedStartDate) {
            const selectedDateObject = new Date(selectedStartDate);
            starttimestampInSeconds = Math.floor(selectedDateObject.getTime() / 1000);
        }

        if (selectedEndDate) {
            const selectedDateObject = new Date(selectedEndDate);
            endtimestampInSeconds = Math.floor(selectedDateObject.getTime() / 1000);
        }

        let startTime;
        let endTime;
        let duration;
        if (selectedStartTime) {
            startTime = selectedStartTime.format('HH:mm');
        }

        if (selectedEndTime) {
            endTime = selectedEndTime.format('HH:mm');
            // Calculate duration in seconds
            duration = selectedEndTime.diff(selectedStartTime, 'second');
        }

        const findObjectBySubId = (subId: string | undefined) => {
            return subjects.find(obj => obj.sub_id === prevSubId);
        };
    
        // Example usage:
        const foundObject = findObjectBySubId(subId);
        console.log(foundObject); 

        console.log("onclick subject>>", subId)
        console.log("onclick subject details>>", findObjectBySubId)
        console.log("Freq seq>>", selectedOption);
        console.log("Start On>>", starttimestampInSeconds);
        console.log("Ends On>>", endtimestampInSeconds);
        console.log("startTime>>", startTime);
        console.log("endTime>>", endTime);
        console.log("duration>>", duration);
        console.log("Repeat On>>", selectedDays);
        let frequencyArr = [];
        if ( selectedOption && starttimestampInSeconds && selectedDays) {
            const freq = {
                "sub_id" : foundObject?.sub_id,
                "cat_id" : foundObject?.categoryId,
                "grade_id" : foundObject?.gradeId,
                "f_typ" : selectedOption === "weekly" ? 2 : 1,
                "str_on" : starttimestampInSeconds,
                "end_on" : endtimestampInSeconds,
                "rpt_on" : selectedDays
            }
            
            frequencyArr.push(freq);

            let plan = [];

            const slot = {
                "date": starttimestampInSeconds,
                "t_slot": [
                    {
                    "f_ts" : startTime,
                    "t_ts" : endTime,
                    "dur" : duration,
                    "sub_id" : foundObject?.sub_id,
                    "cat_id" : foundObject?.categoryId,
                    "grade_id" : foundObject?.gradeId
                    }
                ]
            }

            plan.push(slot);

            const payload = {
                "userId" : localStorage.getItem("Tokenuserid"),
                "name" : studyPlanName,
                "desc" : description,
                "freq" : frequencyArr,
                "plan" : plan
            }

            console.log("payload>>", payload)

            // DashboardService.addOrUpdateStudyPlan(payload, localStorage?.getItem("Tokenuserid"), 64)
            // .then(res => {
            //     setSubDiv(false);
            //     console.log("week_names>>", res.data)
            //     toast.success("Study plan created successfully")
            // })
            // .catch(e => {
            //    console.log("Planner error", e)
            // })
            
        }
        
        setPrevSubId(subId);
      }

      const submitStudyPlan = () => {
        setIsDescValid(description.trim() !== '');
        setIsPlannerNameValid(studyPlanName.trim() !== '');
        // setSubDiv(true);
        // setSelectedSubject(subId)
        let subId : any;
        subId = selectedSubject;
        if(!prevSubId || prevSubId === null) {
            setPrevSubId(subId);
            
        }
        let starttimestampInSeconds;
        let endtimestampInSeconds;

        if (selectedStartDate) {
            const selectedDateObject = new Date(selectedStartDate);
            starttimestampInSeconds = Math.floor(selectedDateObject.getTime() / 1000);
        }

        if (selectedEndDate) {
            const selectedDateObject = new Date(selectedEndDate);
            endtimestampInSeconds = Math.floor(selectedDateObject.getTime() / 1000);
        }

        let startTime;
        let endTime;
        let duration;
        if (selectedStartTime) {
            startTime = selectedStartTime.format('HH:mm');
        }

        if (selectedEndTime) {
            endTime = selectedEndTime.format('HH:mm');
            // Calculate duration in seconds
            duration = selectedEndTime.diff(selectedStartTime, 'second');
        }

        const findObjectBySubId = (subId: string | undefined) => {
            return subjects.find(obj => obj.sub_id === prevSubId);
        };
    
        // Example usage:
        const foundObject = findObjectBySubId(subId);
        // console.log(foundObject); 

        // console.log("onclick subject>>", subId)
        // console.log("onclick subject details>>", findObjectBySubId)
        // console.log("Freq seq>>", selectedOption);
        // console.log("Start On>>", starttimestampInSeconds);
        // console.log("Ends On>>", endtimestampInSeconds);
        // console.log("startTime>>", startTime);
        // console.log("endTime>>", endTime);
        // console.log("duration>>", duration);
        // console.log("Repeat On>>", selectedDays);
        let frequencyArr = [];
        if ( selectedOption && starttimestampInSeconds && selectedDays) {
            const freq = {
                "sub_id" : foundObject?.sub_id,
                "cat_id" : foundObject?.categoryId,
                "grade_id" : foundObject?.gradeId,
                "f_typ" : selectedOption === "weekly" ? 2 : 1,
                "str_on" : starttimestampInSeconds,
                "end_on" : endtimestampInSeconds,
                "rpt_on" : selectedDays
            }
            
            frequencyArr.push(freq);
            // console.log("frequencyArr>>", frequencyArr)

            let plan = [];

            const slot = {
                "date": starttimestampInSeconds,
                "t_slot": [
                    {
                    "f_ts" : startTime,
                    "t_ts" : endTime,
                    "dur" : duration,
                    "sub_id" : foundObject?.sub_id,
                    "cat_id" : foundObject?.categoryId,
                    "grade_id" : foundObject?.gradeId
                    }
                ]
            }

            plan.push(slot);
            // console.log("plan>>", plan)

            const payload = {
                "userId" : localStorage.getItem("Tokenuserid"),
                "name" : studyPlanName,
                "desc" : description,
                "freq" : frequencyArr,
                "plan" : plan
            }

            console.log("payload>>", payload)

            DashboardService.addOrUpdateStudyPlan(payload, localStorage?.getItem("Tokenuserid"), 64)
            .then(res => {
                handleClose2();
                DashboardService.getUserStudyPlan().
                then(res => {
                    setDataState(res.data.data);
                })
                .catch(e => {
                    console.log(e, "e")
                })
                toast.success("Study plan created successfully")
            })
            .catch(e => {
               console.log("Planner error", e)
            })
            
        }

        setPrevSubId(subId);
      }

    //   const handleCheckBoxChange = (day: string) => {
    //     console.log("day>>", day)
    //     // Toggle the selected state of the checkbox
    //     const newSelectedDays = selectedDays.includes(day)
    //       ? selectedDays.filter((selectedDay) => selectedDay !== day)
    //       : [...selectedDays, day];
    
    //     setSelectedDays(newSelectedDays);
    //   };

    const handleDayClick = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
        if(event.target.value == "weekly") {
            setFreqDiv(true)
            setRepeatDiv(true)
            
            //get frequency data
            DashboardService.getFrequencyType("week_names")
            .then(res => {
                setWeek({
                    ...week, weeks: res.data.data[0].data
                })
            })
            .catch(e => {
               console.log("week name error", e)
            })
        } else if(event.target.value == "daily") {
            setFreqDiv(true)
            setRepeatDiv(false)
            setWeek({ weeks: [] })
        } else{
            setFreqDiv(false)
            setRepeatDiv(false) 
        }
    };

    const openStudyPlanner = () => {
        setPlannerSubName("");
        setStudyPlanName("");
        setDescription("");
        setIsEditMode('');
        setSelectedStartDate("");
        setSelectedEndDate("");
        setSubDiv(false)
        setSelectedOption('')
        setFreqDiv(false)
        setRepeatDiv(false)
        setOpen3(true)
        DashboardService.getCurriculumSubjectsV2(localStorage.getItem("profileId"))
            .then(res => {
                if (res.data.data) {
                    setSubjects({
                        ...subject, subjects: res.data.data
                    })
                } else{
                    setSubjects({
                        ...subject, errorMsg: "No Data Available"
                    })
                }

                //get frequency data
                DashboardService.getFrequencyType("frequency_type")
                    .then(res => {
                        setfreq({
                            ...freq, freqencies: res.data.data[0].data
                        })
                    })
                    .catch(e => {
                       console.log("FrequencyType error", e)
                    })
            })
            .catch(e =>
                setSubjects({
                    ...subject, errorMsg: "No Data Available"
                })
            );
    }
    

    const { subjects ,errorMsg} = subject;
    const { freqencies } = freq;
    const { weeks } = week;
    const [dataState, setDataState] = React.useState<DataState>();

    React.useEffect(() => {
        DashboardService.getUserStudyPlan().
            then(res => {
                setDataState(res.data.data);
            })
            .catch(e => {
                console.log(e, "e")
            })
    }, [])

    const [plannerSubName, setPlannerSubName] = React.useState("");
    const [editPlannerCatId, setEditPlannerCatId] = React.useState("");
    const [editPlannerGradeId, setEditPlannerGradeId] = React.useState("");

    const handleEditClick = (freq: any, data: any, i: number) => {
        console.log("freq", freq)
        setIsEditMode('Update');
        setSubDiv(false)
        setSelectedOption('')
        setFreqDiv(false)
        setRepeatDiv(false)
        setOpen3(true)
        setEditPlannerCatId(freq?.cat_id)
        setEditPlannerGradeId(freq?.grade_id)
        setSelectedSubject(freq?.sub_id)
        setStudyPlanName(data?.name);
        setDescription(data?.desc);
        setPlannerSubName(freq.subName);
        setSubDiv(true);
        setSelectedOption(freq?.f_typ === 2 ? 'weekly' : 'daily');
        DashboardService.getFrequencyType("frequency_type")
            .then(res => {
                console.log("getFrequencyType>>", res.data.data[0].data)
                setfreq({
                    ...freq, freqencies: res.data.data[0].data
                })
            })
            .catch(e => {
                console.log("FrequencyType error", e)
            })
            
        setFreqDiv(true)
        setRepeatDiv(true)
        
        //get frequency data
        DashboardService.getFrequencyType("week_names")
        .then(res => {
            setWeek({
                ...week, weeks: res.data.data[0].data
            })
        })
        .catch(e => {
            console.log("week name error", e)
        })

        setSelectedDays(freq.rpt_on);

        const dateObject = new Date(`2000-01-01T${data?.plan[i]?.t_slot[0].f_ts}`);
        const formattedSTime = dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        const parsedSTime = dayjs(formattedSTime, 'h:mm A');
        handleStartTimeChange(parsedSTime);

        const formattedETime = new Date(`2000-01-01T${data?.plan[i]?.t_slot[0].t_ts}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        const parsedETime = dayjs(formattedETime, 'h:mm A');

        handleEndTimeChange(parsedETime);
        setSelectedStartDate(freq.str_on.split('T')[0])
        setSelectedEndDate(freq.end_on.split('T')[0])
        // handleStartOnDateChange(formattedDate)

        
    }
    
    const updateStudyPlan = () => {
        let subId : any;
        subId = selectedSubject;
        let starttimestampInSeconds;
        let endtimestampInSeconds;

        if (selectedStartDate) {
            const selectedDateObject = new Date(selectedStartDate);
            starttimestampInSeconds = Math.floor(selectedDateObject.getTime() / 1000);
        }

        if (selectedEndDate) {
            const selectedDateObject = new Date(selectedEndDate);
            endtimestampInSeconds = Math.floor(selectedDateObject.getTime() / 1000);
        }

        let startTime;
        let endTime;
        let duration;
        if (selectedStartTime) {
            startTime = selectedStartTime.format('HH:mm');
        }

        if (selectedEndTime) {
            endTime = selectedEndTime.format('HH:mm');
            // Calculate duration in seconds
            duration = selectedEndTime.diff(selectedStartTime, 'second');
        }

        let frequencyArr = [];
        if ( selectedOption && starttimestampInSeconds && selectedDays) {
            const freq = {
                "sub_id" : subId,
                "cat_id" : editPlannerCatId,
                "grade_id" : editPlannerGradeId,
                "f_typ" : selectedOption === "weekly" ? 2 : 1,
                "str_on" : starttimestampInSeconds,
                "end_on" : endtimestampInSeconds,
                "rpt_on" : selectedOption === "weekly" ? selectedDays : []
            }
            
            frequencyArr.push(freq);

            let plan = [];

            const slot = {
                "date": starttimestampInSeconds,
                "t_slot": [
                    {
                    "f_ts" : startTime,
                    "t_ts" : endTime,
                    "dur" : duration,
                    "sub_id" : subId,
                    "cat_id" : editPlannerCatId,
                    "grade_id" : editPlannerGradeId
                    }
                ]
            }

            plan.push(slot);

            const payload = {
                "userId" : localStorage.getItem("Tokenuserid"),
                "name" : studyPlanName,
                "desc" : description,
                "freq" : frequencyArr,
                "plan" : plan
            }

            console.log("payload>>", payload)

            DashboardService.addOrUpdateStudyPlan(payload, localStorage?.getItem("Tokenuserid"), 64)
            .then(res => {
                if( res.data.status === 400) {
                    toast.warning(res.data.message)
                } 
                else {
                    toast.success(res.data.message)
                    DashboardService.getUserStudyPlan().
                    then(res => {
                            setDataState(res.data.data);
                            handleClose2()
                    
                })
                .catch(e => {
                    console.log(e, "e")
                })
                
                }
                
            })
            .catch(e => {
               console.log("Planner error", e)
            })
        }
      }

    // Display events data in Calender
    interface Event {
        title: string;
        start: any;
        end: any;
    }

    let events: Event[] = [];
    dataState?.freq?.forEach((planner, i) => {
        const dateSString = planner?.str_on;
        const startDate = dateSString?.split('T')[0];

        const dateEString = planner?.end_on;
        const startEDate = dateEString?.split('T')[0];

        const durationInDays = moment(startEDate).diff(moment(startDate), 'days');

        for (let j= 0; j <= durationInDays; j++) {
            
            const currentDate = moment(startDate).add(j, 'days');

            events.push(
                { 
                    title : planner?.subName,
                    start: currentDate.toDate(), 
                    end: currentDate.toDate()
                }
            );
        }
        
    });

   console.log("events>>", events) 

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
                                    <Link color="#174392" to="/dashboard">Dashboard</Link>
                                    <Typography color="#62676C">Planner</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="planner mb-5 pb-5">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <div className="planner-left" onClick={openStudyPlanner}>
                                            <div className="planner-icon"><AddIcon /></div>
                                        </div>
                                        <div className="planner-list mt-2">
                                            <h4 className="mb-1">Study plan list</h4>
                                                {/* <div className="planner-item">
                                                    <div className='doto-track-box' style={{'borderColor': 'rgb(0, 150, 136)'}}>
                                                        <h4 className="font-w500 m-0">English</h4>
                                                        <p className="m-0">Monday</p>
                                                        <div>
                                                            <span className="float-left">10/02/2024, 4AM&nbsp;<small>IST</small></span>
                                                            <span className="float-right">120&nbsp;<small>Mins</small></span>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="delete-icon">
                                                        <EditIcon />
                                                        </div>
                                                    </div>
                                                </div> */}
                                                {dataState?.freq?.map((planner, i) => {

                                                    const dateString = planner?.str_on;
                                                    const startDate = dateString?.split('T')[0];

                                                    const timeString = dataState?.plan[i]?.t_slot[0]?.f_ts;

                                                    // Split the time string into hours and minutes
                                                    const [hours, minutes] = timeString?.split(":").map(Number);

                                                    // Use the Date object to convert hours to 12-hour format
                                                    const date = new Date();
                                                    date.setHours(hours, minutes);

                                                    // Get the formatted time string
                                                    const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                                                    return (
                                                    <div className="planner-item">
                                                    <div className='doto-track-box' style={{'borderColor': 'rgb(0, 150, 136)'}}>
                                                        <h4 className="font-w500 m-0">{planner?.subName}</h4>
                                                        <p className="m-0">{planner?.startDay}</p>
                                                        <div>
                                                            <span className="float-left">{startDate}&nbsp;{formattedTime}&nbsp;<small>IST</small></span>
                                                            <span className="float-right">{Math.floor(dataState?.plan[i]?.t_slot[0]?.dur / 60)}&nbsp;<small>Mins</small></span>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="delete-icon">
                                                            <EditIcon onClick={ () => handleEditClick(planner, dataState, i)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                    )
                                                })}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                    <div>
                                    <Calendar
                                        defaultDate={moment().toDate()}
                                        localizer={localizer}
                                        events={events}
                                        startAccessor="start"
                                        endAccessor="end"
                                        style={{ margin: '50px' }}
                                        />
                                </div>
                                    </Grid>
                                </Grid>
                               
                            </div>
                            <div className="clearfix"></div>
                        </div>

                    </Main>
                </Box>
                <div className="footer">
                    <FooterCopyright />
                </div>
                <div className="clearfix"></div>
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
                                <h4>Create study plan </h4>
                            </span>
                            <span className="float-right" onClick={handleClose2}>
                                
                                <CloseIcon style={{ 'width': '20px', color:'red',cursor: 'pointer'}} />
                            </span>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-content mt-1">
                           
                            <Grid container spacing={2}>

                            <Grid item xs={12} md={12}>
                            <div className="new-study-plan-input">
                                        <AppInput type="text" label="Study plan "  selectStyle="w-100" name="studyPlan" radius="5px" value={studyPlanName} onChange={handleStudyPlanNameChange} placeholder="Study plan name" required style={{ border: isPlannerNameValid ? '1px solid black' : '1px solid red' }}/>
                                        {!isPlannerNameValid && <p style={{ color: 'red' }}>Name is required.</p>}
                                        <div className="mt-1">
                                        <label>Description</label>
                                        <Textarea aria-label="minimum height" minRows={2} placeholder="Description" value={description} onChange={handleDescriptionChange} required style={{ border: isDescValid ? '1px solid black' : '1px solid red' }}/>
                                        {!isDescValid && <p style={{ color: 'red' }}>Description is required.</p>}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="subject-list ">
                                        <h4>Subjects</h4>
                                        <ul>
                                        {/* {  subjects.length > 0 ? subjects.map((subjectsData: IDashboard, i) => 
                                            <li className={selectedSubject === subjectsData.sub_id ? 'active' : ''} onClick={() => changeSubject(subjectsData?.sub_id)}>{subjectsData?.sub_name}</li>
                                        ) : <li> No Subjects </li>} */}
                                        {plannerSubName ? (
                                                <li className="active">{plannerSubName}</li>
                                            ) : (
                                                subjects.length > 0 ? (
                                                    subjects.map((subjectsData: IDashboard, i) => (
                                                        <li className={selectedSubject === subjectsData.sub_id ? 'active' : ''} onClick={() => changeSubject(subjectsData?.sub_id)}>
                                                            {subjectsData?.sub_name}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No Subjects</li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </Grid>

                        {subdiv ? 
                         <Grid item xs={12} md={8}>
                           <div className="planner-right mt-1">
                                        <div className="w-100">
                                                <div className="form-group">
                                                    <label>Frequency</label>
                                                    {/* <Dropdown
                                                        id="sort"
                                                        name="gender"
                                                        options={freqencies}
                                                        title="Select Frequency" selectStyle="w-100"
                                                        onChange={handleSelectChange}
                                                        value={selectedOption}
                                                    /> */}

                                                <Dropdown
                                                    name="frequence"
                                                    value={selectedOption} 
                                                    options={freqencies}
                                                    title="Select Frequency" selectStyle="w-100"
                                                    handleChange={(e: any) => {
                                                        handleSelectChange(e)
                                                    }}
                                                    selectedValue={selectedOption} />

                                                </div>
                                             
                                 {freqdiv ?
                                 <div>

{repeatdiv ? <div className="weekly-day mt-2 mb-2">
                                                        <p>Repeat on</p>

                                                        {weeks.map((day, index) => (
                                                            <li key={index} className={selectedDays.includes(day.name) ? 'active' : ''} onClick={() => handleDayClick(day.name)}>
                                                                {day.name.charAt(0)}
                                                            </li>
                                                        ))}
                                                        <div className='clearfix'></div>
                                                    </div> : ''}  

                                                 <div className="study-daily">
                                                    <div className="mt-2">
                                                     <FormControl>
                                                        <label id="demo-radio-buttons-group-label">Starts on</label>
                                                     {/*   <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            defaultValue="female"
                                                            name="radio-buttons-group"
                                                        >
                                                           
                                                            <FormControlLabel value="male" control={<Radio />} label="Never" /> */}
                                                            <div className="daily-date">
                                                                {/* <span className="m-0"><FormControlLabel value="On" control={<Radio />} label="On" /></span> */}
                                                                <span>
                                                                    <div className="date-pickerdate">
                                                                        <div className="w-50">
                                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DemoContainer components={['DatePicker']}>
                                                                            <DatePicker
                                                                                value={dayjs(selectedStartDate)}
                                                                                onChange={(date) => handleStartOnDateChange(date)}
                                                                            />
                                                                            </DemoContainer>
                                                                            </LocalizationProvider>
                                                                        </div>
                                                                        <div className="-w-50">
                                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DemoContainer
                                                                                    components={[
                                                                                    'MobileTimePicker',
                                                                                    ]}
                                                                                >
                                                                                    {/* <DemoItem>
                                                                                    <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                                                                                    </DemoItem> */}

                                                                                    <DemoItem>
                                                                                        <MobileTimePicker value={selectedStartTime} onChange={handleStartTimeChange} />
                                                                                    </DemoItem>
                                                                                
                                                                                </DemoContainer>
                                                                            </LocalizationProvider>
                                                                        </div>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                            
                                                            
                                                            
                                                            
                                                        {/* </RadioGroup>*/}
                                                    </FormControl> 

                                                    </div>
                                                   
                                                </div>
                                                <div className="clearfix"></div>
                                                
                                                <div className="study-plan-weekly mt-2">
                                             
                                                    <div>
                                                    <FormControl>
                                                        <label id="demo-radio-buttons-group-label">Ends on</label>
                                                        {/* <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            defaultValue="female"
                                                            name="radio-buttons-group"
                                                        >
                                                            <FormControlLabel value="male" control={<Radio />} label="Never" /> */}
                                                            <div className="daily-date">
                                                                {/* <span className="m-0"><FormControlLabel value="On" control={<Radio />} label="On" /></span> */}
                                                                <span>
                                                                    <div className="date-pickerdate">
                                                                        <div className="w-50">
                                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DemoContainer components={['DatePicker']}>
                                                                            <DatePicker
                                                                                value={dayjs(selectedEndDate)}
                                                                                onChange={(date) => handleEndOnDateChange(date)}
                                                                            />
                                                                            </DemoContainer>
                                                                            </LocalizationProvider>
                                                                        </div>
                                                                        <div className="-w-50">
                                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DemoContainer
                                                                                    components={[
                                                                                    'MobileTimePicker',
                                                                                    ]}
                                                                                >
                                                                                    <DemoItem>
                                                                                        <MobileTimePicker value={selectedEndTime} onChange={handleEndTimeChange} />
                                                                                    </DemoItem>
                                                                                
                                                                                </DemoContainer>
                                                                            </LocalizationProvider>
                                                                        </div>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                            
                                                            
                                                            
                                                        {/* </RadioGroup>*/}
                                                    </FormControl> 
                                                    </div>
                                                   

                                                    {/* <FormGroup>
                                                        {weeks.map((dayInfo) => (
                                                            <FormControlLabel
                                                            key={dayInfo.id}
                                                            control={
                                                                <Checkbox
                                                                checked={selectedDays.includes(dayInfo.name)}
                                                                onChange={() => handleCheckBoxChange(dayInfo.name)}
                                                                />
                                                            }
                                                            label={dayInfo.name}
                                                            />
                                                        ))}
                                                        </FormGroup> */}
                                                        <div className='clearfix'></div>
                                                </div>
                                                </div>
                                                :''}  
                                                </div>

                                        
                                    </div>     
                                </Grid> :''}           

                            </Grid>
                            <div className="w-100 border-top mt-2">
                            <div className="text-center mb-2 mt-2">
                                    <AppButton children={isEditMode ? "Update" : "Submit"}  styleClass='btn primary-bg w150 pl-2 pr-2 mr-3 text-white' onClick={isEditMode ? updateStudyPlan : submitStudyPlan}/>
                                    <AppButton children="Cancel"  styleClass='btn cancel-outline w150 pl-2 pr-2 ' onClick={handleClose2}/>
                                </div>
                            </div>

                        </div>
                    </Box>
                </Modal>
            </div>


        </div>
    );
}

