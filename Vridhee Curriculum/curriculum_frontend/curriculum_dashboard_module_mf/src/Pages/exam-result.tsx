
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useLocation } from 'react-router-dom';
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
import GaugeChart from 'react-gauge-chart';
import { BarChart } from '@mui/x-charts/BarChart';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ShareIcon from '@mui/icons-material/Share';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Textarea from "@mui/joy/Textarea/Textarea";
import { useEffect, useState } from 'react';
import DashboardService from '../Services/dashboardservices';
import IDashboard from '../Models/IDashboard';



const drawerWidth = 150;
const assetUrl: any = configJson.local.curriculumAssetUrl;
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

interface IPracticeTest {
    practiceTests: IDashboard
}


let PId :string
// let cars:any[] = [];
// 
export default function ExamResult() {
   
    const location = useLocation();
console.log(location,"location")

       var prmstr = window.location.search.split("=");
        PId = prmstr[1];



const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [barchartArray, setBarChartArray] = useState([]);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const correct = [23, 25, 18, 19, 15];
    const wrong = [5, 3, 10, 11, 10];
    const na = [2, 2, 3, 4, 5];
    const xLabels = [
        'Test 1',
        'Test 2',
        'Test 3',
        'Test 4',
        'Test 5',
    ];
    const correct1 = [23, 5, 2];

    const xLabels1 = [
        'Correct',
        'Wrong',
        'NA',

    ];


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

    const [open1, setOpen1] = React.useState(false);
    const [totalques, setTotalQues] = React.useState(0);
    const handleOpen = () => setOpen1(true);
    const handleClose = () => setOpen1(false);

    const [practiceTest, setPracticeTest] = useState<IPracticeTest>({
        practiceTests: {} as IDashboard
    })


    useEffect(() => {
        const body = {
            "test_type": "practice_test",
            "db_metadata": 22,
            "user_id": localStorage.getItem('Tokenuserid'),
            "sub_id": localStorage.getItem('subId'),
            "t_id": localStorage.getItem('topicId'),
            "p_t_id": PId
        }
        DashboardService.getPracticeTestDetails(body)
            .then(res => {
                if (res.data.status == 200) {
                    console.log(res.data.data,"details")
                    setPracticeTest({
                        ...practiceTest, practiceTests: res.data.data
                    })
                    console.log(res.data.data.ans_sheet.length,"res.data.data.ans_sheet.length")
                    setTotalQues(practiceTests.exam_statistics.correctCount)
                    let a= practiceTests.exam_statistics.correctCount;
                    // cars = [];
                    // cars[0]= practiceTests.exam_statistics.correctCount;
                    // cars[1]= practiceTests.exam_statistics.correctCount;
                    // cars[2]=practiceTests.exam_statistics.correctCount;
                    // setBarChartArray(cars!);
                } else {
                   
                }

            })
            .catch(e =>
                console.log(e, "e")
            );
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])
    
    const { practiceTests } = practiceTest;
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
                                    <Typography color="#62676C">Exam Result</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="result-text-section mb-3">
                                <h3 className="">Exam Result</h3>
                                <div className="result-time">
                                    <div className="bp b-1 border-bottom mb-1 pb-1 mt-1">
                                        <span className="float-left">
                                            <p className="m-0">Exam Name: 
                                            <span className="primary-color font-w600 ">Mathematics</span>
                                            </p>
                                        </span>
                                        <span className="float-right">
                                            <p className="m-0 text-right">Teacher Name: <span className="primary-color font-w600">P. Srinivasa Rao</span></p>
                                        </span>
                                        <div className='clearfix'></div>
                                    </div>
                                    <Grid container className="border-bottom pb-1 mb-1 mt-1" spacing={2}>
                                        <Grid item xs={6} sm={6} md={3}>
                                            <p className="m-0">Total Question: <span className="font-w600">{practiceTests.ans_sheet?.length}</span></p>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={3}>
                                            <p className="m-0">Total time: <span className="font-w600">{practiceTests.ttl_exp_dur} Min</span></p>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={3}>
                                            <p className="m-0">Time taken: <span className="font-w600">{practiceTests.ttl_act_dur} Min</span></p>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={3}>
                                            <p className="m-0">Date: 
                                            {new Date(parseInt(practiceTests.cr_dts, 10)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            {/* <span className="font-w600">20<sup>th</sup> Mar 2023</span> */}
                                            </p>
                                        </Grid>
                                    </Grid>


                                    <div className="mt-2">
                                        <div className="dashboard-score mt-2">
                                            <Grid container spacing={2}>
                                                <Grid item xs={6} sm={6} md={3}>
                                                    <div className="bar-chart bar-chart-test mt-2">
                                                        <BarChart
                                                            height={250}
                                                            series={[
                                                                // { data: correct1, label: '', id: 'pvId', color: '#3d70f8' },
                                                                { data: [+`${practiceTests.exam_statistics?.correctCount}`,+`${practiceTests.exam_statistics?.wrongCount}`,+`${practiceTests.exam_statistics?.notAttemptedCount}`], label: '', id: 'pvId', color: '#3d70f8' },

                                                            ]}
                                                            xAxis={[{ data: xLabels1, scaleType: 'band' }]}
                                                        />
                                                        <h4 className="text-center barchat-title">Test result</h4>

                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={3}>
                                                    <div className="bar-chart mt-2">
                                                        <BarChart
                                                            height={250}
                                                            series={[
                                                                { data: correct, label: 'Correct', id: 'pvId', color: '#3d70f8' },
                                                                { data: wrong, label: 'Wrong', id: 'uvId', color: '#4768be' },
                                                                { data: na, label: 'NA', id: 'cvId', color: '#acacac' },
                                                            ]}
                                                            xAxis={[{ data: xLabels, scaleType: 'band' }]}
                                                        />
                                                        <h4 className="text-center barchat-title">Overal 5 test result</h4>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={3}>
                                                    <div className="score-chart mt-2">
                                                        <GaugeChart id="gauge-chart3"
                                                            nrOfLevels={16.7}
                                                            colors={["#004392", "#EBEBEB"]}
                                                            arcWidth={0.3}
                                                            percent={practiceTests.score}
                                                            needleColor="#F22755"

                                                        />
                                                        <div className="chart-title text-center">
                                                            <h4>{practiceTests.score}%</h4>
                                                            <p>Average score</p>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <div className="user-average">
                                                        <ul>
                                                            <li>
                                                                <span className="float-left">
                                                                    <p className="m-0">Percentage:</p>
                                                                </span>
                                                                <span className="float-right">
                                                                    <p className="m-0 text-right"><span className="primary-color font-w600">{practiceTests.score}%</span></p>
                                                                </span>
                                                                <div className='clearfix'></div>
                                                            </li>
                                                            <li>
                                                                <span className="float-left">
                                                                    <p className="m-0">Rank:</p>
                                                                </span>
                                                                <span className="float-right">
                                                                    <p className="m-0 text-right"><span className="primary-color font-w600">45th</span></p>
                                                                </span>
                                                                <div className='clearfix'></div>
                                                            </li>
                                                            <li>
                                                                <span className="float-left">
                                                                    <p className="m-0">Vcoins:</p>
                                                                </span>
                                                                <span className="float-right">
                                                                    <p className="m-0 text-right"><span className="primary-color font-w600">45/100</span></p>
                                                                </span>
                                                                <div className='clearfix'></div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </div>

                                <div className="teacher-result mt-2">
                                    <h3>AI / Teacher Remarks:</h3>
                                    <div className="result-time">
                                      
                                    </div>

                                    </div>
                                    {/* className="border-bottom pb-1 mb-1" */}
                                    <div className="teacher-result mt-2">
                                    <h4 >Answer Sheet</h4>
                                   </div>

                                   { practiceTests.ans_sheet?.map((testData:IDashboard, i:number) =>     
                                    <div className="result-time mt-2">
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} sm={6} md={10}>
                                                <h4 className="mb-1 primary-color">Question {i+1}</h4>
                                                {testData.questionData.options?.map((opt: any, index: any) => (
                                                <div className="question-checbox">
                                                    <ol style={{listStyleType:'upper-roman'}}>
                                                    {opt.ans == true ? <FormControlLabel checked className="current-answer" control={<Checkbox />} label={opt.val} /> :
                                                    <div>
 {opt.ans == false && opt.val == testData?.ans[0]  ? <FormControlLabel  className="your-answer" control={<Checkbox />} label={opt.val} /> : <FormControlLabel  control={<Checkbox />} label={opt.val} />}
                                                    </div>}
                                                        {/* <li><FormControlLabel control={<Checkbox />} label={option.val} /></li> */}
                                                        {/* <li><FormControlLabel control={<Checkbox />} label="Label 2" /></li>
                                                        <li><FormControlLabel control={<Checkbox />} label="Label 3" /></li>
                                                        <li><FormControlLabel control={<Checkbox />} label="Label 4" /> </li> */}
                                                    </ol>
                                                    <div className="clearfix"></div>
                                                </div>
                                                ))}
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={2}>
                                                <p className='border-bottom pb-1'>1/1 Vcoins </p>
                                                <p className='primary-color border-bottom pb-1'><ShareIcon />&nbsp;&nbsp;<span style={{ position: 'relative', top: '-6px' }}>Share</span></p>
                                                <p>
                                                    <AppButton children="Doubt" styleClass='btn save-btn w-100 primary-bg text-white' />
                                                </p>
                                            </Grid>
                                        </Grid>

                                        <div className="pt-2 border-top">
                                            <Grid container className="border-bottom pb-1 mb-1 mt-1" spacing={2}>
                                                <Grid item xs={6} sm={6} md={3}>
                                                    <p className="m-0">Question Marks: <span className="font-w600">{testData.marks}M</span></p>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={3}>
                                                    <p className="m-0">Question Level: <span className="font-w600"></span></p>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={3}>
                                                    <p className="m-0">Time Estimated: <span className="font-w600"> {new Date(testData.time_taken * 1000).toISOString().slice(14, 19).split(':')[0]}Mins</span></p>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={3}>
                                                    <p className="m-0">Average Time Taken: <span className="font-w600">
                                                   {new Date(testData.time_taken * 1000).toISOString().slice(14, 19).split(':')[0]}min {new Date(testData.time_taken * 1000).toISOString().slice(14, 19).split(':')[1]}sec 
                                                        {/* {testData.time_taken/60} Mins */}
                                                        </span></p>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="exam-Attempted">
                                            <ul>
                                                <li><p className="m-0">Attempted: <span className="font-w600">3</span></p></li>
                                                <li><p className="m-0">Correct: <span className="font-w600">2</span></p></li>
                                                <li><p className="m-0">Wrong: <span className="font-w600">1</span></p></li>
                                                <li><p className="m-0">NA: <span className="font-w600">0</span></p></li>
                                                <li><p className="m-0">Avg Marks: <span className="font-w600">2/3</span></p></li>
                                            </ul>
                                            <div className="clearfix"></div>
                                        </div>


                                  
                                    <div className="clearfix"></div>
                               

                                <div className="teacher-explanation mt-2">
                                    <h3 className="">Explanation</h3>
                                    <div className="result-time">
                                        <div className="bp b-1 border-bottom mb-1 pb-1 mt-1">
                                            <span className="float-left">
                                                <p className="m-0">Explanation 1</p>
                                            </span>
                                            <span className="float-right">
                                                <p className="m-0 text-right">Teacher Name: <span className="primary-color font-w600">P. Srinivasa Rao</span></p>
                                            </span>
                                            <div className='clearfix'></div>
                                        </div>
                                        <div className="explanation-content">
                                            <p>Explanation content here</p>
                                        </div>
                                        <div className="result-content-like">
                                            <div className="user-actions">
                                                <ul>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/video%20like.svg`} alt="" /><span>2</span>
                                                    </li>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/video%20dis%20like.svg`} alt="" /><span>0</span>
                                                    </li>
                                                    <li onClick={handleOpen}>
                                                        <span style={{ 'cursor': 'pointer' }} >
                                                            <CommentOutlinedIcon style={{ 'position': 'relative', 'top': '7px', 'color': '#0275b1', 'width': '18px' }} />&nbsp;&nbsp;
                                                            <span>Comment</span>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <img src={`${assetUrl}/curriculim/video%20share.svg`} alt="" /><span>Share
                                                        </span>
                                                    </li>


                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                   )}
                            </div>

                        </div>
                    </Main>
                </Box>
                <div className="footer">
                    <FooterCopyright />
                </div>

            </div>

            <Modal
                open={open1}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modal-titile">
                        <span className="float-left">
                            <h4><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;Add New comment</h4>
                        </span>
                        <span className="float-right"
                            onClick={handleClose} >
                            <img src={`${assetUrl}/close.svg`} style={{ 'width': '20px' }} alt="" />
                        </span>
                        <div className="clearfix"></div>
                    </div>
                    <div className="model-content">
                        <div className="form-group mb-1">
                            <label className="mt-1">Add Comment</label>
                            <Textarea
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
                            <AppButton children="Cancel" styleClass='btn cancel-outline pl-2 pr-2 mr-2 ' />
                            <AppButton children="Submit" styleClass='btn save-btn  primary-bg text-white pl-2 pr-2' />
                        </div>
                    </div>
                </Box>
            </Modal>



        </div>
    );
}

