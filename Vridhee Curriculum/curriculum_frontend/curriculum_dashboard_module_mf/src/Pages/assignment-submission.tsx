
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.css';
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
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react';
import DashboardService from '../Services/dashboardservices';

const drawerWidth = 150;
// let selectedFileData: any
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

export default function AssignmentSubmission() {
    const assetUrl = configJson.local.assetUrl;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [selectedFile, setSelectedFile] = React.useState('');
    const [selectedFileData, setSelectedFileData] = React.useState('');
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: any) => {
        const data = e.target.files[0]
        setSelectedFileData(e.target.files[0].name)
        if (!data.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            toast.error('Please select .jpg or .jpeg or .png image only');
        } else {
            setSelectedFile(data)
        }
        e.target.value = ''
        console.log("setSelectedFile>>", selectedFile)
    };

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const remove = () => {
        setSelectedFileData('')
    }

    const submit = () => {
    const formData = new FormData();
    console.log('formData>>selectedFile', selectedFile);
            formData.append('image', selectedFile);
            console.log('formData>>', formData);
            const data = {

                // "mnt_usr_id":"6570c55840a5aca8bf6ed4bf",
                // "name":"Test Assignment",
                // "src":"Test",
                // "batch_id":"20",
                // // "sub_id":"65538ee951b530dcf41fc492",
                // // "t_id":"655ccfcc2c0be6f68119b9ad",
                // "sub_id": "65902f2c08f9b4e59bcf1311",
                // "t_id": "65902f4e08f9b4e59bcf1341" , 
                // "a_text":"Test text",
                // "i_text":"Instruction text",
                // "a_pts":[{"rub_name":"ABC","rub_pt":15}],
                // "last_sub_dt":"2023-12-18"

        "db_metadata":"24",
            // "a_id":"6580132a2ca010e3018a8b9c",
            "a_id":"65a60b650ce5e05811fda982",
        //     "user_id":localStorage.getItem('Tokenuserid'),
        //      "sub_id": "65902f2c08f9b4e59bcf1311",
        // "t_id": "65902f4e08f9b4e59bcf1341"  ,
        "user_id": "6570c55840a5aca8bf6ed4bf",
        "sub_id": "65902f2c08f9b4e59bcf1311",
        "t_id": "65902f4e08f9b4e59bcf1341"  ,
            "s_text":"Test text",
            "i_text":"Instruction text",
            "rec_pts":[{"a_p_id":"ABC","rec_pt":15}],
            "oth_lnr_pts":[{"a_p_id":"ABC","user_id":"6570c55840a5aca8bf6ed4bf","t_rec_pt":2,"l_rec_pt":3,"my_rec_pt":5}],
            "last_sub_dt":"2023-12-21"
        }
            console.log('data>>data', data);
            formData.append('data', JSON.stringify(data));
       DashboardService.submitAssignments(formData)
    //    DashboardService.addAsignments(formData)
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
    };

    return (
        <div>
            <div className="dashboard-sec">
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <CssBaseline />
                        <AppBar position="fixed" open={open}>
                            <HeaderCurriculum />
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
                                    <Link color="#174392" to="/activities">Activities</Link>
                                    <Typography color="#62676C">Assignment Submissions</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="assignment-sction">
                                <div className="assignment-content">
                                    <h4>Assignment Submission</h4>
                                    <p className="font-w500">Subject : maths | Chapter : 5 | Topic : Equitation in Algebra</p>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> 
                                    <p><b>Why do we use it?</b></p>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                                    <p><b>Where does it come from?</b></p>
                                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                                </div>
                                <div className="upload-assignment">
                                <div className="mb-3">
                                    <span className="float-left">
                                        <h4 className="primary-color">Upload Assignment</h4>
                                    </span>
                                    <span className="float-right">
                                        <AppButton children="Read Instructions" styleClass='btn primary-bg text-white pl-2 pr-2 text-white' />
                                    </span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="upload-assignment-box">
                                    <div>
                                        <span className="float-left">Supports : <span className="primary-color">Doc, PPT, PDF, TEXT, Image</span></span>
                                        <span className="float-right">Last Date : <span style={{'color':'#B90404'}} className="font-w600">11th mar 2023</span></span>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="upload-assignment-cloud">
                               
                                    <input type="file"  ref={inputRef} style={{ display: 'none' }} 
                                    //  onClick={handleClick} />
                                  onChange={handleFileChange} />
                                    {/* {selectedFile &&

<div>
    {selectedFileData} */}
    {/* <img src={URL.createObjectURL(selectedFile)} className='profileImage' /> */}
{/* </div>
} */}
                                        {/* <input type="file" name="" value="" /> */}
                                         <img src={`${assetUrl}/cloud_upload.svg`} alt="Cloud upload" />
                                        <p className="mb-0">Drag and drop files here</p>
                                        <p>Or</p>
                                        <AppButton children="Browse" onClick={handleClick}  styleClass='btn primary-bg text-white pl-2 pr-2 text-white' />
                                       
                                    </div>
                               <div className="document-section mt-2">
                               {selectedFileData ?  
                                        <ul>
                                            <li>
                                                <span className="mr-3">
                                                {selectedFileData}
                                                    {/* Document1.pdf */}
                                                    </span>
                                                <span className="mr-3"><AppButton children="Remove" onClick={remove} styleClass='btn remove-btn text-white pl-2 pr-2 text-white' /></span>
                                                <span><AppButton children="Start Evaluation" styleClass='btn primary-bg text-white pl-2 pr-2 text-white' /></span>
                                            </li>
                                            {/* <li>
                                                <span className="mr-3">Document1.pdf</span>
                                                <span className="mr-3"><AppButton children="Remove" styleClass='btn remove-btn text-white pl-2 pr-2 text-white' /></span>
                                                <span><AppButton children="Start Evaluation" styleClass='btn primary-bg text-white pl-2 pr-2 text-white' /></span>
                                            </li> */}
                                        </ul>
                                         :''} 
                                        <div className="button-btn-document text-center">
                                            <AppButton children="Submit" onClick={() => submit()} styleClass='btn primary-bg pl-2 pr-2 mr-3 text-white' />
                                            <AppButton children="Cancel" styleClass='btn cancel-btn text-white pl-2 pr-2 ' />
                                        </div>
                                    </div>  
                              
                                </div>
                            </div>
                            <div className="evalution-process mt-3">
                                <h4 className="mb-3">Evaluation Process</h4>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="evalution-process-box">
                                            <span className="font-w600">4</span>
                                            <h5>Thoroughly meets standards</h5>
                                            <p>A(95%)</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="evalution-process-box">
                                            <span className="font-w600">3</span>
                                            <h5>Meets Standards</h5>
                                            <p>B(85%)</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="evalution-process-box">
                                            <span className="font-w600">2</span>
                                            <h5>Approaching Standards</h5>
                                            <p>C(975%)</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <div className="evalution-process-box">
                                            <span className="font-w600">1</span>
                                            <h5>No attempt</h5>
                                            <p>D(50%)</p>
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

            </div>
           
           <ToastContainer />
        </div>
    );
}

