import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ISchool from '../Models/IUser'; 
import IGrade from '../Models/IUser';
import Alert from '@mui/material/Alert';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import { ToastContainer, toast } from 'react-toastify';
import IUser from '../Models/IUser';
import { useNavigate } from 'react-router-dom';
import AppInput from "vridhee_common_component_mf/AppInput";
import AppButton from "vridhee_common_component_mf/AppButton";
import Dropdown from "vridhee_common_component_mf/Dropdown"
import { OnboardingService } from '../Services/onboardingService';
import Sidebar from './sidebar';

const drawerWidth = 300;
let instselectname: string | FilmOptionType;
let selectname: string | FilmOptionType;
let gradeSelectname: string | FilmOptionType;
let nextFlag = false;
const filter = createFilterOptions<FilmOptionType>();

interface FilmOptionType {
    inputValue?: string;
    name: string;
    year?: number;
}

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

interface ISchools {
    schools: ISchool[],
    errorMsg: string
}
interface IGradeDetails {
    grades: IGrade[],
    errorMsgs: string
}

interface IUniversityDetails {
    universities: IUser[],
    errorMs: string
}

interface ISubject {
    subjects: ISchool[],
    errorMsgg: string
}

interface ISubjectDetail {
    subjectdetails: IUser[]
}

function Teaching() {
    const navigate = useNavigate();
    const [school, setSchool] = useState<ISchools>({
        schools: [] as ISchool[],
        errorMsg: ''
    })

    const [subject, setSubject] = useState<ISubject>({
        subjects: [] as ISchool[],
        errorMsgg: ''
    })

    const [subjectdetail, setSubjectDetail] = useState<ISubjectDetail>({
        subjectdetails: [] as IUser[]
    })

    const learning = () => {
        navigate('/learning-interest');
    }



    const [values, setValues] = useState([]);
    let [select, setSelect] = useState<FilmOptionType | null>(null)
    const [instselect, setInstSelect] = useState<FilmOptionType | null>(null)
    let [gradeSelect, setGradeSelect] = useState<FilmOptionType | null>(null)
    const [value, setValue] = useState([]);
    let subArray: any = [];
    const [uname, setUname] = useState('');
    let [catid, setCatId] = useState('');
    let [gradeId, setGradeId] = useState('');
    let [subId, setSubId] = useState('');
    let [instId, setInstId] = useState('');
    let [stdCount, setStdCount] = useState('');

    const [grade, setGrade] = useState<IGradeDetails>({
        grades: [] as IGrade[],
        errorMsgs: ''
    })

    // Handles state change
    const handleChange = (event: any) => {
        let select: any = event.target.value;
        setSelect(event.target.value);
        schools.filter(sub =>
            sub.name == select).filter(filteredNames => {
                catid = filteredNames._id;
                setCatId(filteredNames._id);

            })
        OnboardingService.getGradesdropdown(catid)
            .then(res => {
                if (res.data.data) {
                    setGrade({
                        ...grade, grades: res.data.data[0].grades
                    })
                }
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
        let data: any = [...values];
        newValue.map((option: any) => {
            let index = values.findIndex((x: IUser) => x.name === option);
            if (index == -1) {
                let obj: any = {
                    "id": "",
                    "name": option,
                    "rating": 80
                }
                data.push(obj);
            }
        })
        setSubjectDetail({
            ...subjectdetail, subjectdetails: data
        })
        setValues(data);

    };



    const [university, setUniversity] = useState<IUniversityDetails>({
        universities: [] as IUser[],
        errorMs: ''
    })

    useEffect(() => {
        setUniversity({ ...university })
        OnboardingService.getInstitutionList()
            .then(res => {
                setUniversity({
                    ...university, universities: res.data.data
                })
            })
            .catch(err => setUniversity({
                ...university, errorMs: err.message
            }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { universities, errorMs } = university;

    useEffect(() => {
        if (localStorage.getItem('profileId')) {
            let profileId = localStorage.getItem('profileId');
            OnboardingService.getProfileData(profileId)
                .then((res: any) => {
                    if (res.data.data) {
                        setInstSelect(res.data.data.teaching.institute_name);
                        setGradeSelect(res.data.data.teaching.curr_grade_name);
                        setSelect(res.data.data.teaching.curr_cat_name);
                        setStdCount(res.data.data.teaching.students_count);
                        setSubjectDetail({
                            ...subjectdetail, subjectdetails: res.data.data.teaching.subjects
                        })
                        setValues(res.data.data.teaching.subjects);
                        setInstId(res.data.data.teaching.institute_id);
                        setGradeId(res.data.data.teaching.curr_grade_id)
                        setCatId(res.data.data.teaching.curr_cat_id)
                        schools.filter(sub =>
                            sub.name == res.data.data.teaching.curr_cat_name).filter(filteredNames => {
                                catid = filteredNames._id;
                                setCatId(filteredNames._id);

                            })
                        if (res.data.data.teaching.curr_cat_id) {
                            OnboardingService.getGradesdropdown(res.data.data.teaching.curr_cat_id)
                                .then(res => {
                                    if (res.data.data) {
                                        setGrade({
                                            ...grade, grades: res.data.data[0].grades
                                        })
                                    }
                                })
                        }
                        if (res.data.data.teaching.curr_cat_id && res.data.data.teaching.curr_grade_id) {

                            OnboardingService.getSubjectsdropdown(res.data.data.teaching.curr_cat_id, res.data.data.teaching.curr_grade_id
                            )
                                .then(res => {
                                    setSubject({
                                        ...subject, subjects: res.data.data
                                    })
                                })
                                .catch(err => setSubject({
                                    ...subject, errorMsgg: err.message
                                }));
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
    function handleSubmit(e: any) {
        e.preventDefault();
        let profileId: any = localStorage.getItem('profileId');
        if (select) {
            selectname = select.name ? select.name : select
        }
        if (gradeSelect) {
            gradeSelectname = gradeSelect.name ? gradeSelect.name : gradeSelect
        }
        if (instselect) {
            instselectname = instselect.name ? instselect.name : instselect
        }

        subjects.filter((sub: any) => {
            value.filter((data: any) => {
                if (sub.Subject == data) {
                    let subdata: any = {
                        "id": sub._id,
                        "name": data,
                        "rating": 2.0
                    }
                    subArray.push(subdata);
                }
            })
        })

        let profileSection = 'teaching';
        const body = {
            "teaching": {
                "curr_cat_id": catid,
                "curr_cat_name": selectname,
                "curr_grade_id": gradeId,
                "curr_grade_name": gradeSelectname,
                "institute_id": instId,
                "institute_name": instselectname,
                "students_count": stdCount,
                "subjects": values,
            }
        }
        if (select && gradeSelect && instselect && stdCount && values.length) {
            localStorage.setItem('tabFlag', 'true')
            OnboardingService.updateUserprofile(profileId, profileSection, body)
                .then((res: any) => {
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
        } else {
            localStorage.setItem('tabFlag', 'false')
            if (!select) {
                toast.error("Please select All the Required Fields");
            } else if (!gradeSelect?.name) {
                toast.error(" Please select All the Required Fields");
            } else if (!instselect?.name) {
                toast.error(" Please select All the Required Fields");
            } else if (!stdCount) {
                toast.error(" Please select All the Required Fields");
            } else if (!values.length) {
                toast.error(" Please select All the Required Fields");
            }
        }

    }

    function Previous() {
        navigate('/personal-information');
    }

    function reset(e: React.MouseEvent<EventTarget>) {
        e.preventDefault();
        setGradeSelect({
            name: '',
        });
        setSelect({
            name: '',
        });
        setInstSelect({
            name: '',
        });
        setStdCount('')
        setSubject({
            ...subject, subjects: []
        })
        setSubjectDetail({
            ...subjectdetail, subjectdetails: []
        })
        setGrade({
            ...grade, grades: []
        })
    }
    function removeOption(index: any) {
        let removedSubjectFromArray: any = subjectdetails.splice(index, 1);
        setSubjectDetail({
            ...subjectdetail, subjectdetails: subjectdetails
        })
    }

    const subjectFormHandler = (e: React.ChangeEvent<EventTarget>, newValue: number, subject: string, type: string) => {
        let target = e.target as HTMLSelectElement;
        let index = values.findIndex((x: IUser) => x.name == subject);
        let data: any = [...values];
        if (index > -1) {
            if (type === "sub-rating") {
                data[index]['rating'] = target.value;
            }

        }
        setValues(data);
        setSubjectDetail({
            ...subjectdetail, subjectdetails: data
        })
    };

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
                                    <Typography color="#62676C">Teaching Interest</Typography>
                                </Breadcrumbs>
                            </div>
                            <div className="inner-page-content">
                                <AppButton onClick={learning} children="Skip this step" styleClass='btn skip-this-btn' />
                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">Teaching Interest</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        <h4 className="primary-color m-0">STEP 02/08</h4>
                                        <p className="m-0">Complete to Win 10vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="page-forms">
                                    <form id="teachingData" >
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Institutiion<sup>*</sup></label>
                                            <Autocomplete
                                                value={instselect}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setInstSelect({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setInstSelect({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setInstSelect(newValue);
                                                    }
                                                    if (newValue) {
                                                        universities.filter(data =>
                                                            data.name == newValue.name).filter(filteredNames => {
                                                                let instId = filteredNames._id;
                                                                setInstId(instId);
                                                            })
                                                    }
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
                                                    if (inputValue !== '' && !isExisting) {
                                                        filtered.push({
                                                            inputValue,
                                                            name: `Add "${inputValue}"`,
                                                        });
                                                    }
                                                    return filtered;
                                                }}
                                                selectOnFocus
                                                clearOnBlur
                                                handleHomeEndKeys
                                                id="free-solo-with-text-demo"
                                                options={universities}
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
                                            <label htmlFor="exampleFormControlSelect1">What kind of students do you teach?<sup>*</sup></label>
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
                                                    if (newValue?.name) {
                                                        nextFlag = true
                                                    } else {
                                                        nextFlag = false
                                                        localStorage.setItem('tabFlag', 'false')
                                                    }

                                                    OnboardingService.getGradesdropdown(catid)
                                                        .then(res => {
                                                            if (res.data.data) {
                                                                setGrade({
                                                                    ...grade, grades: res.data.data[0].grades
                                                                })
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
                                            <label htmlFor="exampleInputEmail1">Grade<sup>*</sup></label>
                                            <Autocomplete
                                                value={gradeSelect}
                                                onChange={(event, newValue) => {
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
                                                    if (newValue?.name) {
                                                        nextFlag = true
                                                    } else {
                                                        nextFlag = false
                                                        localStorage.setItem('tabFlag', 'false')
                                                    }
                                                    setSubject({ ...subject })
                                                    OnboardingService.getSubjectsdropdown(catid, gradeId)
                                                        .then(res => {
                                                            setSubject({
                                                                ...subject, subjects: res.data.data
                                                            })
                                                        })
                                                        .catch(err => setSubject({
                                                            ...subject, errorMsgg: err.message
                                                        }));
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
                                            <label htmlFor="exampleInputEmail1">How many students you are guiding?<sup>*</sup></label>
                                            <AppInput
                                            placeholder="Number of student"
                                            onChange={(e: any) => {
                                                const re = /^[0-9\b]+$/;

                                                if (isNaN(e.target.value) == true) {
                                                    setStdCount('')
                                                } else {
                                                    setStdCount(e.target.value)
                                                }
                                                if (e.target.value.length > 0) {
                                                    nextFlag = true
                                                } else {
                                                    nextFlag = false
                                                    localStorage.setItem('tabFlag', 'false')
                                                }
                                            }}
/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">What you teach?<sup>*</sup></label>
                                            <div className="auto-select">
                                                <Autocomplete
                                                    sx={{ m: 1, width: 500 }}
                                                    multiple
                                                    value={subjectdetails?.map((option) => option.name)}
                                                    options={subjects?.map((option) => option.name)}
                                                    getOptionLabel={(option) => option}
                                                    disableCloseOnSelect onChange={handleOptionSelect}
                                                    renderTags={(value: readonly string[], getTagProps) =>
                                                        value.map((option: string, index: number) => (
                                                            <Chip variant="outlined" label={option} {...getTagProps({ index })}
                                                                onDelete={() => {
                                                                    removeOption(index);
                                                                }} />
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

                                        {subjectdetails.map((data, i) =>
                                            <div className="select-levels-teaching">
                                                <h4>{data.name}</h4>
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
                                            </div>)}

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
export default Teaching;