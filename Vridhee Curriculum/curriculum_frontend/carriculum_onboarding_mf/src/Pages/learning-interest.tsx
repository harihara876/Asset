import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { OnboardingService } from '../Services/onboardingService';
import IUser from '../Models/IUser';
import AppInput from "vridhee_common_component_mf/AppInput";
import AppButton from "vridhee_common_component_mf/AppButton";
import Dropdown from "vridhee_common_component_mf/Dropdown"
import configJson from "vridhee_common_component_mf/configJson";
import { MathsMentor } from "./mentors"
import { PhysicsMentor } from "./mentors"
import { ChemistryMentor } from "./mentors"
import { Mentor } from "./mentors"

let mathFlag = false

let phyFlag = false

let cheFlag = false

let mentorFlag = false

const filter = createFilterOptions<FilmOptionType>();



interface FilmOptionType {
    inputValue?: string;
    name: string;
    year?: number;
}

const drawerWidth = 300;
let mentorEmailflag: boolean = true;
let nextFlag = false;
let emailFlag: boolean = false;
const rating = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 30, label: 30 },
    { value: 40, label: 40 },
    { value: 50, label: 50 },
    { value: 60, label: 60 },
    { value: 70, label: 70 },
    { value: 80, label: 80 },
    { value: 90, label: 90 },
    { value: 100, label: 100 },

];

const options = [
    { value: 1, name: 1 },
    { value: 2, name: 2 },
    { value: 3, name: 3 },
    { value: 4, name: 4 },
    { value: 5, name: 5 },
    { value: 6, name: 6 },
    { value: 7, name: 7 },
    { value: 8, name: 8 },
    { value: 9, name: 9 },
    { value: 10, name: 10 },
    { value: 11, name: 11 },
    { value: 12, name: 12 },
];
interface ISchools {
    schools: IUser[],
    errorMsg: string
}

interface IGradeDetails {
    grades: IUser[],
    errorMsgs: string
}

interface ISubject {
    subjects: IUser[],
    errorMsgg: string
}

interface Imentor {
    mentors: IUser[]
}

interface ISubjectDetail {
    subjectdetails: IUser[]
}

function Learinginterest() {

    const [school, setSchool] = useState<ISchools>({
        schools: [] as IUser[],
        errorMsg: ''
    })

    const [mentor, setMentor] = useState<Imentor>({
        mentors: [] as IUser[],
    })

    const navigate = useNavigate();

    let [select, setSelect] = useState<FilmOptionType | null>(null)

    let [gradeSelect, setGradeSelect] = useState<FilmOptionType | null>(null)
    const [value, setValue] = useState([]);
    const [values, setValues] = useState([]);
    const assetUrl = configJson.local.assetUrl;
    let [catid, setCatId] = useState('');
    let [catName, setCatName] = useState('');
    let [error, setError] = useState('');
    let [gradeName, setGradeName] = useState('');
    let [email, setEmail] = useState([]);
    let [goal, setGoal] = useState([]);
    let [target, setTarget] = useState('');
    let [gradeId, setGradeId] = useState('');
    const [emailError, setEmailError] = useState('')
    const [mentorchecked, setMentorChecked] = useState(false)
    const [mathschecked, setMathsChecked] = useState(false)
    const [physicschecked, setPhysicsChecked] = useState(false)
    const [chechecked, setCheChecked] = useState(false)

    const [grade, setGrade] = useState<IGradeDetails>({
        grades: [] as IUser[],
        errorMsgs: ''
    })

    const [subject, setSubject] = useState<ISubject>({
        subjects: [] as IUser[],
        errorMsgg: ''
    })

    const [subjectdetail, setSubjectDetail] = useState<ISubjectDetail>({
        subjectdetails: [] as IUser[]
    })

    function reset(e: React.MouseEvent<EventTarget>) {
        e.preventDefault();
        setSelect({
            name: ''
        });
        setGradeSelect({
            name: ''
        });
        setSubjectDetail({
            ...subjectdetail, subjectdetails: [] as IUser[]
        })
        setValues([]);
        setGrade({
            ...grade, grades: []
        })
        setSubject({
            ...subject, subjects: []
        })
    }

    const { grades, errorMsgs } = grade;
    const { subjects, errorMsgg } = subject;

    useEffect(() => {
        setSchool({ ...school })
        OnboardingService.getCurriculumTypes()
            .then(res => {
                setSchool({
                    ...school, schools: res.data.data
                })

            })
            .catch(err => setSchool({
                ...school, errorMsg: err.message
            }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])



    const { schools, errorMsg } = school;

    const handleOptionSelect = (event: any, newValue: any) => {
        mentorEmailflag = true
        nextFlag = false
        if (newValue.length != 0) {
            let data: any = [...values];
            newValue.map((option: any) => {
                let index = values.findIndex((x: IUser) => x.name === option);
                if (index == -1) {
                    let obj: any = {
                        "name": option,
                        "rating": 50,
                        "no_of_months": "",
                        "target_rating": 80,
                        "have_mentor": "Yes",
                        "mentorMailId": ""
                    }
                    data.push(obj);
                }

            })


            setSubjectDetail({
                ...subjectdetail, subjectdetails: data
            })
            setValues(data)
        }
        else {
        }

        // OnboardingService.getMentors(event.target.textContent)
        //     .then(res => {
        //         console.log(res.data.data, "mentors")
        //     })
        //     .catch(err =>
        //         console.log(err)
        //     );

    };


    function mathshandleChange(e: any, newValue: any) {
        if (e.target.checked) {
            setMathsChecked(true)
            nextFlag = true
        } else {
            setMathsChecked(false)
            nextFlag = false
        }
    }
    function PhysicshandleChange(e: any) {
        if (e.target.checked) {
            setPhysicsChecked(true)
            nextFlag = true
        } else {
            setPhysicsChecked(false)
            nextFlag = false
        }
    }
    function ChemistryhandleChange(e: any) {
        if (e.target.checked) {
            setCheChecked(true)
            nextFlag = true
        } else {
            setCheChecked(false)
            nextFlag = true
        }
    }
    function mentorhandleChange(e: any) {
        if (e.target.checked) {
            setMentorChecked(true)
            nextFlag = true
        } else {
            setMentorChecked(false)
            nextFlag = true
        }
    }
    useEffect(() => {
        if (localStorage.getItem('profileId')) {
            let profileId = localStorage.getItem('profileId');

            OnboardingService.getCurriculumTypes()
                .then(res => {
                    setSchool({
                        ...school, schools: res.data.data
                    })
                })

            OnboardingService.getProfileData(profileId)
                .then(res => {
                    if (res.data.data.learning) {
                        if (res.data.data.learning.curr_cat_name && res.data.data.learning.curr_grade_name && res.data.data.learning.subjects) {
                            nextFlag = true
                            localStorage.setItem('tabFlag', 'true')
                        } else {
                            nextFlag = false
                            localStorage.setItem('tabFlag', 'false')
                        }
                        setSelect(res.data.data.learning.curr_cat_name);
                        OnboardingService.getCurriculumTypes()
                            .then(result => {
                                result.data.data.filter((sub: IUser) =>
                                    sub.name == res.data.data.learning.curr_cat_name).filter((filteredNames: IUser) => {
                                        catid = filteredNames._id;
                                        setCatId(filteredNames._id);
                                        OnboardingService.getGradesdropdown(catid)
                                            .then(res => {
                                                setGrade({
                                                    ...grade, grades: res.data.data[0].grades
                                                })
                                            })
                                    })
                            })
                        setGradeSelect(res.data.data.learning.curr_grade_name);

                        setGradeId(res.data.data.learning.curr_grade_id);
                        if (res.data.data.learning.curr_cat_id && res.data.data.learning.curr_grade_id) {
                            OnboardingService.getSubjectsdropdown(res.data.data.learning.curr_cat_id, res.data.data.learning.curr_grade_id)
                                .then(res => {
                                    let subject = res.data.data;
                                    setSubject({
                                        ...subject, subjects: res.data.data
                                    })
                                })
                        }
                        if (res.data.data.learning.subjects) {
                            setSubjectDetail({
                                ...subjectdetail, subjectdetails: res.data.data.learning.subjects
                            })
                            setValues(res.data.data.learning.subjects);
                        }


                    } else {
                        toast.error(res.data.msg);
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });

        }
    }, [])

    const { subjectdetails } = subjectdetail;
    const { mentors } = mentor;

    useEffect(() => {

    }, [])


    const subjectFormHandler = (e: React.ChangeEvent<EventTarget>, newValue: number, subject: string, type: string) => {
        let target = e.target as HTMLInputElement;
        let index = values.findIndex((x: IUser) => x.name == subject);
        let data: any = [...values];
        if (index > -1) {
            if (type === 'email') {
                if (email) {
                    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    if (!emailRegex.test(target.value)) {
                        data[index]['mentorMailId'] = target.value;
                        setEmailError('Please enter a valid email address');
                        nextFlag = false
                        localStorage.setItem('tabFlag', 'false')
                    } else {
                        data[index]['mentorMailId'] = target.value;
                        setEmailError('');
                        nextFlag = true
                    }
                }

            }
            else if (type === "goal-rating") {
                if (target.value <= data[index]['rating'] + 30) {
                    if (target.value < data[index]['rating']) {
                        setError("Goal rating should be greaterthan the current level rating")
                        nextFlag = false;
                        localStorage.setItem('tabFlag', 'false')
                    } else {
                        data[index]['target_rating'] = target.value
                        setError("")
                        nextFlag = true;
                    }

                }
                else {
                    setError("")
                    nextFlag = true;
                }

            }
            else if (type === "sub-rating") {
                data[index]['rating'] = target.value;
                data[index]['target_rating'] = target.value + 30;
            }
            else if (type === 'target') {
                data[index]['no_of_months'] = target.value;
            }
            else if (type === 'mentor') {
                data[index]['have_mentor'] = target.value;
                if (target.value == 'No') {
                    mentorEmailflag = false;

                    nextFlag = true
                } else {
                    mentorEmailflag = true;
                    if (!data[index]['mentorMailId']) {
                        nextFlag = false
                    } else {
                        nextFlag = true
                    }

                }
            }
        }

        setValues(data);
        setSubjectDetail({
            ...subjectdetail, subjectdetails: data
        })
    };



    const [subrating, setSubRating] = useState(50);
    const [goalrating, setGoalRating] = useState(50);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let profileId: string | null = localStorage.getItem('profileId');
        let profileSection = 'learning';

        localStorage.setItem('tabFlag', 'true')
        if (select && gradeSelect && values.length) {
            const body = {
                "learning": {
                    "curr_cat_id": catid,
                    "curr_cat_name": select.name ? select.name : select,
                    "curr_grade_id": gradeId,
                    "curr_grade_name": gradeSelect.name ? gradeSelect.name : gradeSelect,
                    "subjects": values,
                }
            }
            if (select.name && gradeSelect.name && values.length) {
                OnboardingService.updateUserprofile(profileId, profileSection, body)
                    .then(res => {
                        if (res.data.status == 200) {
                            toast.success('Updated Successfully');
                            const data = { name: "/hobbies-passion", coins: "20" };
                            navigate("/congratulation", { state: data });
                        } else {
                            toast.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        toast.error(err.msg);
                    });
            }
        } else {
            localStorage.setItem('tabFlag', 'false')
            if (!select?.name) {
                toast.error("Please select All the Required Fields");
            } else if (!gradeSelect?.name) {
                toast.error(" Please select All the Required Fields");
            } else if (!values.length) {
                toast.error(" Please select All the Required Fields");
            }

        }


    }

    function Previous() {
        navigate('/personal-information');
    }

    function removeOption(index: any) {
        let removedSubjectFromArray: any = subjectdetails.splice(index, 1);
        setSubjectDetail({
            ...subjectdetail, subjectdetails: subjectdetails
        })
    }

    return (
        <div>
            <div className="">
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <div className="sidebar-sec">
                            <Sidebar />
                        </div>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                    >
                        <div className="page-wrapper">

                            <div className="breadcrumbs-sec">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Typography color="#62676C">Learning Interests</Typography>
                                </Breadcrumbs>
                            </div>

                            <div className="inner-page-content">
                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">Learning Interests</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        <h4 className="primary-color m-0">STEP 02/08</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="page-forms">

                                    <form id="learningData" noValidate >

                                        <div className="form-group gender-sec">
                                            <label htmlFor="exampleFormControlSelect1">How do you define yourself?<sup>*</sup></label>
                                            <Autocomplete
                                                value={select}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setSelect({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setSelect({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setSelect(newValue);
                                                    }
                                                    setGradeSelect({
                                                        name: ''
                                                    });

                                                    if (newValue) {
                                                        schools.filter(sub =>
                                                            sub.name == newValue.name).filter(filteredNames => {
                                                                catid = filteredNames._id;
                                                                setCatId(filteredNames._id);
                                                            })
                                                    }
                                                    OnboardingService.getGradesdropdown(catid)
                                                        .then(res => {
                                                            setGrade({
                                                                ...grade, grades: res.data.data[0].grades
                                                            })
                                                        })
                                                    if (newValue?.name) {
                                                        nextFlag = true
                                                    } else {
                                                        nextFlag = false
                                                        localStorage.setItem('tabFlag', 'false')
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
                                                options={schools}
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

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Which is your current class/grade/level? <sup>*</sup></label>
                                            <Autocomplete
                                                value={gradeSelect}
                                                onChange={(event, newValue) => {

                                                    setSubjectDetail({
                                                        ...subjectdetail, subjectdetails: [] as IUser[]
                                                    })

                                                    if (typeof newValue === 'string') {
                                                        setGradeSelect({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setGradeSelect({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setGradeSelect(newValue);
                                                    }

                                                    if (newValue) {
                                                        grades.filter(sub =>
                                                            sub.name == newValue.name).filter(gradeNames => {
                                                                gradeId = gradeNames.id;
                                                                setGradeId(gradeNames.id);
                                                            })
                                                    }
                                                    setSubject({ ...subject })
                                                    OnboardingService.getSubjectsdropdown(catid, gradeId)
                                                        .then(res => {
                                                            let subject = res.data.data;
                                                            setSubject({
                                                                ...subject, subjects: res.data.data
                                                            })
                                                        })
                                                        .catch(err => setSubject({
                                                            ...subject, errorMsgg: err.message
                                                        }));

                                                    if (newValue?.name) {
                                                        nextFlag = true
                                                    } else {
                                                        nextFlag = false
                                                        localStorage.setItem('tabFlag', 'false')
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
                                                options={grades}
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
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">What do you want to learn in Vridhee? <sup>*</sup></label>
                                            <div className="auto-select">
                                                <Autocomplete
                                                    id="combo-box-demo"
                                                    sx={{ m: 1, width: 500 }}
                                                    multiple
                                                    limitTags={3}
                                                    value={subjectdetails.map((option) => option.name)}
                                                    options={subjects.map((option) => option.name)}
                                                    getOptionLabel={(option) => option}
                                                    onChange={handleOptionSelect}
                                                    renderTags={(value: string[], getTagProps) =>
                                                        value.map((option: string, index: number) => (
                                                            <Chip variant="outlined"
                                                                label={option}
                                                                {...getTagProps({ index })}
                                                                onDelete={() => {
                                                                    removeOption(index);
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            placeholder="-Select-"
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>


                                        {subjectdetails.map((data: IUser, i: number) =>
                                            <div>
                                                <div className="select-levels-teaching" >
                                                    <h4>Current level of {data.name}</h4>
                                                    <div className="line-con">
                                                        <span className="float-left">Beginner</span>
                                                        <span className="float-right">Advanced</span>
                                                    </div>
                                                    <Slider className="drag-progressbar"
                                                        aria-label="Always visible"
                                                        value={data.rating}
                                                        onChange={(e: any) => subjectFormHandler(e, i, data.name, "sub-rating")}
                                                        step={5}
                                                        marks={rating}
                                                        valueLabelDisplay="on" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlTextarea1">Write your goals for<span className="primary-color ml-1">{data.name}.</span></label>
                                                    <div className="line-con">
                                                        <span className="float-left">Beginner</span>
                                                        <span className="float-right">Advanced</span>
                                                    </div>
                                                    <Slider className="drag-progressbar"
                                                        aria-label="Always visible"
                                                        value={data.target_rating}
                                                        onChange={(e: any) => subjectFormHandler(e, i, data.name, "goal-rating")}
                                                        step={5}
                                                        marks={rating}
                                                        valueLabelDisplay="on"
                                                    />
                                                </div>
                                                {error ? <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span> : ''}
                                                <div className="form-group" >
                                                    <label htmlFor="exampleFormControlTextarea1">Set the target to achieve your goal(Months)</label>
                                                    <Dropdown name="target" id="target" value={data.no_of_months}
                                                        options={options}
                                                        title="-Select-" selectStyle="w-100"
                                                        handleChange={(e: any) => subjectFormHandler(e, i, data.name, "target")}
                                                        selectedValue={data.no_of_months}
                                                    />

                                                </div>

                                                <div className="form-group" >
                                                    <div className="radiobutton-group">
                                                        <div className='radiobutton-lable'>
                                                            <label htmlFor="exampleFormControlTextarea1">Do you have mentor?</label>
                                                        </div>
                                                        <div className='radiobutton-buttons'>
                                                            <FormControl>
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name="row-radio-buttons-group" value={data.have_mentor}
                                                                    onChange={e => subjectFormHandler(e, i, data.name, "mentor")} >
                                                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </div>

                                                {(data.have_mentor != 'Yes') && (`${data.name}` == 'Mathematics') &&

                                                    <div>

                                                        {MathsMentor.map((mentordata: any) => (
                                                            <div key={mentordata.id}>
                                                                <div className="list-group">
                                                                    <h3>Here are our recommendations for you</h3>

                                                                    <div className='list-gropu-box'>
                                                                        <div className="select-checkbox">
                                                                            <input type="checkbox" id="mathcheckbox"
                                                                                onChange={(e: any) => mathshandleChange(e, "Maths")}
                                                                            />
                                                                        </div>
                                                                        <div className="list-gropu-box-img">
                                                                            <img src={`${mentordata.image}`} alt="" />
                                                                        </div>
                                                                        <div className="list-gropu-box-con">
                                                                            <div>
                                                                                <span className="float-left"><h4>{mentordata.name}</h4></span>
                                                                                <span className="float-right green-color">{mentordata.text}</span>
                                                                                <div className="clearfix"></div>
                                                                                <p>{mentordata.exp}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                }

                                                {(data.have_mentor != 'Yes') && (`${data.name}` == 'Physics') &&

                                                    <div>

                                                        {PhysicsMentor.map((mentordata: any) => (
                                                            <div key={mentordata.id}>
                                                                <div className="list-group">
                                                                    <h3>Here are our recommendations for you</h3>

                                                                    <div className='list-gropu-box'>
                                                                        <div className="select-checkbox">
                                                                            <input type="checkbox" onChange={(e: any) => PhysicshandleChange(e)} />
                                                                        </div>
                                                                        <div className="list-gropu-box-img">
                                                                            <img src={`${mentordata.image}`} alt="" />
                                                                        </div>
                                                                        <div className="list-gropu-box-con">
                                                                            <div>
                                                                                <span className="float-left"><h4>{mentordata.name}</h4></span>
                                                                                <span className="float-right green-color">{mentordata.text}</span>
                                                                                <div className="clearfix"></div>
                                                                                <p>{mentordata.exp}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>}

                                                {(data.have_mentor != 'Yes') && (`${data.name}` == 'Chemistry') &&

                                                    <div>

                                                        {ChemistryMentor.map((mentordata: any) => (
                                                            <div key={mentordata.id}>
                                                                <div className="list-group">
                                                                    <h3>Here are our recommendations for you</h3>

                                                                    <div className='list-gropu-box'>
                                                                        <div className="select-checkbox">
                                                                            <input type="checkbox" onChange={(e: any) => ChemistryhandleChange(e)} />
                                                                        </div>
                                                                        <div className="list-gropu-box-img">
                                                                            <img src={`${mentordata.image}`} alt="" />
                                                                        </div>
                                                                        <div className="list-gropu-box-con">
                                                                            <div>
                                                                                <span className="float-left"><h4>{mentordata.name}</h4></span>
                                                                                <span className="float-right green-color">{mentordata.text}</span>
                                                                                <div className="clearfix"></div>
                                                                                <p>{mentordata.exp}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                }

                                                {(data.have_mentor != 'Yes') && ((`${data.name}` != 'Mathematics') && (`${data.name}` != 'Chemistry') && (`${data.name}` != 'Physics')) &&


                                                    <div>

                                                        {Mentor.map((mentordata: any) => (
                                                            <div key={mentordata.id}>
                                                                <div className="list-group">
                                                                    <h3>Here are our recommendations for you</h3>

                                                                    <div className='list-gropu-box'>
                                                                        <div className="select-checkbox">
                                                                            <input type="checkbox" onChange={(e: any) => mentorhandleChange(e)} />
                                                                        </div>
                                                                        <div className="list-gropu-box-img">
                                                                            <img src={`${mentordata.image}`} alt="" />
                                                                        </div>
                                                                        <div className="list-gropu-box-con">
                                                                            <div>
                                                                                <span className="float-left"><h4>{mentordata.name}</h4></span>
                                                                                <span className="float-right green-color">{mentordata.text}</span>
                                                                                <div className="clearfix"></div>
                                                                                <p>{mentordata.exp}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                }
                                                <div className="form-group">
                                                    {(data.have_mentor != 'No') ? <AppInput type="email" label="Provide your mentor's Email address." value={data.mentorMailId} name="email" id="email" radius="5px"
                                                        placeholder="sample@gmail.com" onChange={(e: any) => subjectFormHandler(e, i, data.name, "email")} /> : ''}
                                                    {data.have_mentor != 'No' && data.mentorMailId ? <span style={{
                                                        fontWeight: 'bold',
                                                        color: 'red',
                                                    }}>{emailError}</span> : ''}
                                                </div>
                                            </div>
                                        )}

                                        <div className="button-center text-center mt-4">
                                            <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn' />
                                            <AppButton children="Clear" onClick={reset} styleClass='btn clear-btn mr-2 ml-2' />
                                            <AppButton children="Next Step" disabled={!nextFlag} onClick={handleSubmit} styleClass='btn save-btn' />
                                        </div>

                                    </form>
                                </div>
                            </div>

                        </div>
                    </Box>

                </Box>
            </div>
            <ToastContainer />
        </div>
    )
}
export default Learinginterest;



