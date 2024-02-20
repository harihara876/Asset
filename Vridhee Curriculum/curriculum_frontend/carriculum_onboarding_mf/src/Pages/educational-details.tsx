import React, { TextareaHTMLAttributes } from 'react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';
import IUser from '../Models/IUser';
import { OnboardingService } from '../Services/onboardingService';
import IEducation from '../Models/IActorProfile'
import AppInput from "vridhee_common_component_mf/AppInput";
import AppButton from "vridhee_common_component_mf/AppButton";
import AppTextarea from "vridhee_common_component_mf/AppTextarea"
import Dropdown from "vridhee_common_component_mf/Dropdown"
import Grid from '@mui/material/Grid';
import configJson from "vridhee_common_component_mf/configJson";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const filter = createFilterOptions<FilmOptionType>();

interface FilmOptionType {
    inputValue?: string;
    name: string;
    year?: number;
}

const drawerWidth = 300;
let nextFlag = false
let Id: string;
let educationId: string;
let btnName: string = 'Add Education'
let selectInstitutename: string
let selectedClassname: string
let instituteSelect: string[];
let fieldOfSelect: string[];
let selectStudyFieldname: string
let selectGradename: string
interface IInstitutions {
    institutions: IUser[],
    errorMsg: string
}

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


const startyear = [
    { value: 2007, name: 2007 },
    { value: 2008, name: 2008 },
    { value: 2009, name: 2009 },
    { value: 2010, name: 2010 },
    { value: 2011, name: 2011 },
    { value: 2012, name: 2012 },
    { value: 2013, name: 2013 },
    { value: 2014, name: 2014 },
    { value: 2015, name: 2015 },
    { value: 2016, name: 2016 },
    { value: 2017, name: 2017 },
    { value: 2018, name: 2018 },
    { value: 2019, name: 2019 },
    { value: 2020, name: 2020 },
    { value: 2021, name: 2021 },
    { value: 2022, name: 2022 },
    { value: 2023, name: 2023 }
];

const year = [
    { value: 2007, name: 2007 },
    { value: 2008, name: 2008 },
    { value: 2009, name: 2009 },
    { value: 2010, name: 2010 },
    { value: 2011, name: 2011 },
    { value: 2012, name: 2012 },
    { value: 2013, name: 2013 },
    { value: 2014, name: 2014 },
    { value: 2015, name: 2015 },
    { value: 2016, name: 2016 },
    { value: 2017, name: 2017 },
    { value: 2018, name: 2018 },
    { value: 2019, name: 2019 },
    { value: 2020, name: 2020 },
    { value: 2021, name: 2021 },
    { value: 2022, name: 2022 },
    { value: 2023, name: 2023 },
    { value: 2024, name: 2024 },
    { value: 2025, name: 2025 },
    { value: 2026, name: 2026 },
    { value: 2027, name: 2027 },
    { value: 2028, name: 2028 },
    { value: 2029, name: 2029 },
    { value: 2030, name: 2030 },
];


interface ICurriculumTypes {
    curriculumTypes: IUser[],
    errorMessage: string
}

interface IGradeDetails {
    grades: IUser[],
    errorMsgs: string
}

interface IStudyField {
    studyFields: IUser[],
    studyError: string
}

interface IEducationDetails {
    educationDetails: IEducation[]
}

function Education() {

    const [Show, setShow] = useState(false);
    const assetUrl = configJson.local.assetUrl;
    const [count, setCount] = useState(0);
    const [errors, setError] = useState({
        selectInstitute: '',
        selectedClass: '',
        selectStudyField: '',
        startMonth: '',
        startYear: '',
        countError: '',
    });

    const [institute, setInstitute] = useState<IInstitutions>({
        institutions: [],
        errorMsg: ''
    })

    const [curriculum, setCurriculum] = useState<ICurriculumTypes>({
        curriculumTypes: [],
        errorMessage: ''
    })

    const [grade, setGrade] = useState<IGradeDetails>({
        grades: [],
        errorMsgs: ''
    })

    const [studyField, setStudyField] = useState<IStudyField>({
        studyFields: [],
        studyError: ''
    })

    const [details, setDetails] = useState<IEducationDetails>({
        educationDetails: []
    })

    const [startMonth, setStartMonth] = useState(0);
    const [startYear, setStartYear] = useState(0);
    const [endMonth, setEndMonth] = useState(0);
    const [endYear, setEndYear] = useState(0);

    const [achievement, setAchievement] = useState('');
    const [percentage, setPercentage] = useState('');
    const [description, setDescription] = useState('');
    const [selectInstitute, setSelectInstitute] = useState<FilmOptionType | null>(null)
    const [selectedClass, setSelectedClass] = useState<FilmOptionType | null>(null)
    const [instituteId, setInstituteId] = useState('');
    const [selectedClassId, setSelectedClassId] = useState('');
    const [selectStudyField, setSelectStudyField] = useState<FilmOptionType | null>(null)
    const [selectStudyFieldId, setSelectStudyFieldId] = useState('');

    const [selectGrade, setSelectGrade] = useState<FilmOptionType | null>(null);
    const [selectGradeId, setSelectGradeId] = useState('');

    useEffect(() => {
        setInstitute({ ...institute })
        OnboardingService.getInstitutionList()
            .then(res => {
                setInstitute({
                    ...institute, institutions: res.data.data
                })
            })
            .catch(err => setInstitute({
                ...institute, errorMsg: err.message
            }));
    }, [])
    const { institutions, errorMsg } = institute;

    useEffect(() => {
        OnboardingService.getStudyField()
            .then(res => {
                setStudyField({ ...studyField, studyFields: res.data.data[0].data })
            })

    }, [])

    useEffect(() => {
        setCurriculum({ ...curriculum })
        OnboardingService.getCurriculumTypes()
            .then(res => {
                setCurriculum({
                    ...curriculum, curriculumTypes: res.data.data
                })
            })
            .catch(err => setCurriculum({
                ...curriculum, errorMessage: err.message
            }));
    }, [])

    const navigate = useNavigate();
    const { curriculumTypes, errorMessage } = curriculum;
    const { grades, errorMsgs } = grade;
    const { studyFields, studyError } = studyField;

    function startMonthSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        let target = e.target as HTMLSelectElement;
        if (endMonth) {
            if (startYear == endYear) {
                if (+target.value > endMonth) {
                    toast.error("Start month should be lessthan end month")
                    setStartMonth(0)
                } else {
                    setStartMonth(+target.value)
                }
            } else {
                setStartMonth(+target.value)
            }
        } else {
            setStartMonth(+target.value)
        }
        if (target.value) {
            nextFlag = true
        } else {
            nextFlag = false
        }
    }

    function startYearSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        let target = e.target as HTMLSelectElement;
        if (endYear != 0) {
            if (+target.value > endYear) {
                toast.error("Start year should be lessthan end year")
            } else {
                setStartYear(+target.value)
            }
        } else {
            setStartYear(+target.value)
        }
        if (target.value) {
            nextFlag = true
        } else {
            nextFlag = false
        }
    }

    function endMonthSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        let target = e.target as HTMLSelectElement;
        if (startYear == endYear) {
            if (startMonth > +target.value) {
                toast.error("End month should be greaterthan start month")
                setEndMonth(0)
            } else {
                setEndMonth(+target.value)
            }
        } else {
            setEndMonth(+target.value)
        }
    }

    function endYearSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        let target = e.target as HTMLSelectElement;
        if (startYear > +target.value) {
            toast.error("End year should be greaterthan start year")
            setEndYear(0)
        } else {
            if (endMonth < startMonth) {
                if (+target.value <= startYear) {
                    toast.error("End year should be greaterthan start year")
                    setEndYear(0)
                } else {
                    setEndYear(+target.value)
                }

            } else {
                setEndYear(+target.value)
            }
        }
    }

    const achievementHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setAchievement(target.value);
    }

    const percentageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setPercentage(target.value);
    }

    const descriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setDescription(target.value);
        setCount(target.value.length)
    }

    const profession = () => {
        navigate('/professional-details');
    }

    const instituteChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let target = e.target as HTMLSelectElement;
        let instituteSelect = target.value;
        setSelectInstitute({
            name: instituteSelect,
        });
        institutions.filter(institute => institute.name === instituteSelect)
            .filter(instituteName => setInstituteId(instituteName._id));
    }

    const fieldOfStudyHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let target = e.target as HTMLSelectElement;
        let fieldOfSelect = target.value;
        studyFields.filter(field => field.name === fieldOfSelect)
            .filter(fieldName => setSelectStudyFieldId(fieldName.id));
    }

    function reset() {
        btnName = 'Add Education'
        setSelectedClassId('');
        setSelectedClass({
            name: '',
        });
        setSelectGradeId('');
        setSelectStudyFieldId('');
        setSelectGrade({
            name: '',
        });
        setSelectStudyField({
            name: '',
        });
        setStartYear(0);
        setStartMonth(0);
        setEndYear(0);
        setEndMonth(0);
        setAchievement('');
        setPercentage('');
        setDescription('');
        setSelectInstitute({
            name: ''
        });
    }

    function EditDetails(data: IEducation) {
        btnName = 'Update Education';
        educationId = data._id;
        setShow(!Show);
        if (data) {

            setSelectedClass({
                name: data.curr_cat_name,
            });
            setSelectInstitute({
                name: data.institute_name,
            });
            setPercentage(data.grade)
            setAchievement(data.achievements);
            setDescription(data.desc);
            setSelectStudyField({
                name: data.study_field,
            });
            setSelectStudyFieldId(data.study_field_id)
            setSelectedClassId(data.curr_cat_id)
            setInstituteId(data.institute_id)
            setSelectGradeId(data.curr_grade_id)
            setSelectGrade({
                name: data.curr_grade_name,
            });
            let endmonth = dateFormat(data.end_date, "mm");
            let endyear = dateFormat(data.end_date, "yyyy");
            let startmonth = dateFormat(data.start_date, "mm");
            let startyear = dateFormat(data.start_date, "yyyy");
            setStartMonth(+startmonth)
            setStartYear(+startyear)
            setEndMonth(+endmonth)
            setEndYear(+endyear)
            if (data.desc) {
                setCount(data.desc.length)
            }

        }

    }


    useEffect(() => {
        getProfileData();
    }, [])

    const { educationDetails } = details;

    function getProfileData() {
        let profileId = localStorage.getItem('profileId');
        if (localStorage.getItem('profileId')) {
            let profileId = localStorage.getItem('profileId');
            OnboardingService.getProfileData(profileId)
                .then(res => {
                    if (res.data.data.education_details.data.length) {
                        setShow(true);
                        Id = res.data.data._id;
                        setDetails({
                            ...details, educationDetails: res.data.data.education_details.data
                        })
                        nextFlag = true
                    } else {
                        setShow(false)
                        nextFlag = false
                    }
                })
                .catch(err => {
                    toast.error(err.message);
                    nextFlag = false
                });
        }
    }


    const gradeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let target = e.target as HTMLSelectElement;
        const gradeSelect = target.value;
        grades.filter(grade => grade.name === gradeSelect)
            .filter(gradeName => setSelectGradeId(gradeName.id))
    }

    const educationDetailsSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectInstitute) {
            selectInstitutename = selectInstitute.name
        }
        if (selectedClass) {
            selectedClassname = selectedClass.name
        }
        if (selectStudyField) {
            selectStudyFieldname = selectStudyField.name
        }
        if (selectGrade) {
            selectGradename = selectGrade.name
        }
        setError(EducationValidation(selectInstitutename, selectedClassname, selectStudyFieldname, startMonth, startYear));
        if (selectInstitutename && selectedClassname && selectStudyField && startMonth && startYear) {
            if (btnName == 'Add Education') {
                const profileId: string | null = localStorage.getItem('profileId');
                const profileSection = 'education_details';
                const body = {
                    "education_details": {
                        "data": [
                            {
                                "institute_id": instituteId,
                                "institute_name": selectInstitutename,
                                "curr_cat_id": selectedClassId,
                                "curr_cat_name": selectedClassname,
                                "curr_grade_id": selectGradeId,
                                "curr_grade_name": selectGradename,
                                "study_field_id": selectStudyFieldId,
                                "study_field": selectStudyFieldname,
                                "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                                "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                                "achievements": achievement,
                                "desc": description,
                                "grade": percentage
                            }
                        ]
                    }
                }
                OnboardingService.updateUserprofile(profileId, profileSection, body)
                    .then(res => {
                        if (res.data.status == 200) {
                            toast.success('Saved Successfully');
                            getProfileData();
                            setShow(!Show);
                            setSelectedClassId('');
                            setSelectedClass({
                                name: '',
                            });
                            setSelectInstitute({
                                name: '',
                            });
                            setSelectGradeId('');
                            setSelectGrade({
                                name: '',
                            });
                            setSelectStudyField({
                                name: '',
                            });
                            setSelectStudyFieldId('');
                            setStartYear(0);
                            setStartMonth(0);
                            setEndYear(0);
                            setEndMonth(0);
                        } else {
                            toast.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        toast.error(err.response.data.message);
                    });
            } else {
                const body = {
                    "education_id": educationId,
                    "_id": Id,
                    "institute_id": instituteId,
                    "institute_name": selectInstitutename,
                    "curr_cat_id": selectedClassId,
                    "curr_cat_name": selectedClassname,
                    "curr_grade_id": selectGradeId,
                    "curr_grade_name": selectGradename,
                    "study_field_id": selectStudyFieldId,
                    "study_field": selectStudyFieldname,
                    "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                    "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                    "achievements": achievement,
                    "desc": description,
                    "grade": percentage
                }
                OnboardingService.updateEducationalDetails(body)
                    .then(res => {
                        if (res.data.message == 'Update Success') {
                            toast.success('Updated Successfully');
                            getProfileData();
                            setShow(!Show);
                            setSelectedClassId('');
                            setSelectedClass({
                                name: '',
                            });
                            setSelectInstitute({
                                name: '',
                            });
                            setSelectGrade({
                                name: '',
                            });
                            setSelectStudyField({
                                name: '',
                            });
                            setSelectGradeId('');
                            setSelectStudyFieldId('');
                            setStartYear(0);
                            setStartMonth(0);
                            setEndYear(0);
                            setEndMonth(0);
                        } else {
                            toast.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        toast.error(err.response.data.message);
                    });
            }
        }
    }


    const remove = (data: IEducation) => {
        let dataId = Id;
        OnboardingService.deleteEducationDetails(data._id, dataId)
            .then(res => {
                if (res.data.message == "Delete Success") {
                    toast.success('Deleted Successfully');
                    reset();
                    btnName = 'Add Education'
                    let profileId = localStorage.getItem('profileId');
                    OnboardingService.getProfileData(profileId)
                        .then(res => {
                            if (res.data.data.education_details.data.length) {
                                setShow(true);
                                Id = res.data.data._id;
                                setDetails({
                                    ...details, educationDetails: res.data.data.education_details.data
                                })

                            } else {
                                setShow(false)
                            }
                        })
                        .catch(err => {
                            toast.error(err.message);
                        });
                } else {
                    // toast.error(res.data.msg);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    }
    const EducationValidation = (selectInstitute: string, selectedClass: string, selectStudyField: string, startMonth: number, startYear: number) => {
        let errors = {
            selectInstitute: '',
            selectedClass: '',
            selectStudyField: '',
            startMonth: '',
            startYear: '',
            countError: '',
        }
        if (!selectInstitute) {
            toast.error("Institution is Required")
        }
        else if (!selectedClass) {
            toast.error("Class Required")
        }
        else if (!selectStudyField) {
            toast.error("Field of Study Required")
        }
        else if (!startMonth) {
            toast.error("Please select Start Month")
        }
        else if (!startYear) {
            toast.error("Please select Start Year")
        }
        return errors;
    }


    function Previous() {
        navigate('/skills-interests');
    }

    function NextStep() {
        if (Show == true) {
            const data = { name: "/professional-details", coins: "20" };
            navigate("/congratulation", { state: data });
        } else {
            if (selectInstitute) {
                selectInstitutename = selectInstitute.name
            }
            if (selectedClass) {
                selectedClassname = selectedClass.name
            }
            if (selectStudyField) {
                selectStudyFieldname = selectStudyField.name
            }
            if (selectGrade) {
                selectGradename = selectGrade.name
            }
            setError(EducationValidation(selectInstitutename, selectedClassname, selectStudyFieldname, startMonth, startYear));
            if (selectInstitutename && selectedClass && selectStudyField && startMonth && startYear) {
                if (btnName == 'Add Education') {
                    const profileId: string | null = localStorage.getItem('profileId');
                    const profileSection = 'education_details';
                    const body = {
                        "education_details": {
                            "data": [
                                {
                                    "institute_id": instituteId,
                                    "institute_name": selectInstitutename,
                                    "curr_cat_id": selectedClassId,
                                    "curr_cat_name": selectedClassname,
                                    "curr_grade_id": selectGradeId,
                                    "curr_grade_name": selectGradename,
                                    "study_field_id": selectStudyFieldId,
                                    "study_field": selectStudyFieldname,
                                    "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                                    "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                                    "achievements": achievement,
                                    "desc": description,
                                    "grade": percentage
                                }
                            ]
                        }
                    }
                    OnboardingService.updateUserprofile(profileId, profileSection, body)
                        .then(res => {
                            if (res.data.status == 200) {
                                toast.success('Saved Successfully');
                                const data = { name: "/professional-details", coins: "20" };
                                navigate("/congratulation", { state: data });

                            } else {
                                toast.error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            toast.error(err.response.data.message);
                        });
                } else {
                    const body = {
                        "education_id": educationId,
                        "_id": Id,
                        "institute_id": instituteId,
                        "institute_name": selectInstitutename,
                        "curr_cat_id": selectedClassId,
                        "curr_cat_name": selectedClassname,
                        "curr_grade_id": selectGradeId,
                        "curr_grade_name": selectGradename,
                        "study_field_id": selectStudyFieldId,
                        "study_field": selectStudyFieldname,
                        "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                        "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                        "achievements": achievement,
                        "desc": description,
                        "grade": percentage
                    }
                    OnboardingService.updateEducationalDetails(body)
                        .then(res => {
                            if (res.data.message == 'Update Success') {
                                toast.success('Updated Successfully');

                                const data = { name: "/professional-details", coins: "20" };
                                navigate("/congratulation", { state: data });
                            } else {
                                toast.error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            toast.error(err.response.data.message);
                        });
                }
            }
        }

    }

    function AddMore(e: React.MouseEvent<HTMLButtonElement>) {
        reset();
        setShow(!Show)
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
                                    <Typography color="#62676C">Educational details</Typography>
                                </Breadcrumbs>
                            </div>

                            <div className="inner-page-content">

                                <div className="">
                                    <AppButton children="Skip this step" onClick={profession} styleClass='btn skip-this-btn' />
                                </div>

                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">Education Details</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        <h4 className="primary-color m-0">STEP 05/08</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="content-sec">
                                    <p><b>Note:-</b> We recommend you to add at least one educational detail.</p>
                                </div>

                                <div className="page-forms">
                                    {!Show && <form id="personData" noValidate>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Institution<sup>*</sup></label>
                                            <Autocomplete
                                                value={selectInstitute}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setSelectInstitute({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setSelectInstitute({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setSelectInstitute(newValue);
                                                    }
                                                    if (newValue?.name) {
                                                        nextFlag = true
                                                    } else {
                                                        nextFlag = false
                                                    }
                                                    if (newValue) {
                                                        institutions.filter(institute => institute.name === newValue.name)
                                                            .filter(instituteName => setInstituteId(instituteName._id));
                                                    }
                                                }

                                                }

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
                                                options={institutions}
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
                                                        placeholder="Select Institute"
                                                    />
                                                )}
                                            />
                                            {!selectInstitute && errors.selectInstitute ? <p style={{ color: 'red' }}>{errors.selectInstitute}</p> : ''}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Education Type<sup>*</sup></label>
                                            <Autocomplete
                                                value={selectedClass}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setSelectedClass({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setSelectedClass({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setSelectedClass(newValue);
                                                    }
                                                    setSelectGrade({
                                                        name: '',
                                                    });
                                                    if (newValue) {
                                                        curriculumTypes.map(curr => {
                                                            if (newValue.name === curr.name) {
                                                                setSelectedClassId(curr._id)
                                                                OnboardingService.getGradesdropdown(curr._id)
                                                                    .then(res => {
                                                                        setGrade({ ...grade, grades: res.data.data[0].grades })
                                                                    })
                                                            }


                                                        })
                                                    }
                                                    if (newValue?.name) {
                                                        nextFlag = true
                                                    } else {
                                                        nextFlag = false
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
                                                options={curriculumTypes}
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
                                                        placeholder="Select Education Type"
                                                    />
                                                )}
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Class/Degree</label>
                                            <Autocomplete
                                                value={selectGrade}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setSelectGrade({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setSelectGrade({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setSelectGrade(newValue);
                                                    }
                                                    if (selectGrade) {

                                                        selectGradename = selectGrade.name
                                                    }
                                                    if (newValue?.name) {
                                                        nextFlag = true
                                                    } else {
                                                        nextFlag = false
                                                    }
                                                    if (newValue) {
                                                        grades.filter(grade => grade.name === newValue.name)
                                                            .filter(gradeName => setSelectGradeId(gradeName.id))
                                                    }
                                                }

                                                }
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
                                                        placeholder="Select Class/Degree"
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Field of Study<sup>*</sup></label>
                                            <Autocomplete
                                                value={selectStudyField}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setSelectStudyField({
                                                            name: newValue
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        setSelectStudyField({
                                                            name: newValue.inputValue
                                                        });
                                                    } else {
                                                        setSelectStudyField(newValue);
                                                    }
                                                    if (selectStudyField) {
                                                        selectStudyFieldname = selectStudyField.name
                                                    }
                                                    if (newValue?.name) {
                                                        nextFlag = true
                                                    } else {
                                                        nextFlag = false
                                                    }
                                                    if (newValue) {
                                                        studyFields.filter(field => field.name == newValue.name)
                                                            .filter(fieldName => setSelectStudyFieldId(fieldName.id));

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
                                                options={studyFields}
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
                                                        placeholder="Select Field Of Study"
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="form-group">

                                            <label htmlFor="exampleFormControlSelect1">Start Date<sup>*</sup></label>
                                            <div className='start-date'>
                                                <Dropdown
                                                    name="startdate" id="startdate" value={startMonth}
                                                    options={options}
                                                    title="Month" selectStyle="w-100"
                                                    handleChange={startMonthSelect}
                                                    selectedValue={startMonth} />
                                            </div>

                                            <div className='end-date'>
                                                <Dropdown
                                                    name="startyear" id="startyear" value={startYear}
                                                    options={startyear}
                                                    title="Year" selectStyle="w-100"
                                                    handleChange={startYearSelect}
                                                    selectedValue={startYear} />
                                            </div>
                                            {!startMonth && errors.startMonth ? <p style={{ color: 'red' }}>{errors.startMonth}</p> : ''}
                                            {!startYear && errors.startYear ? <p style={{ color: 'red' }}>{errors.startYear}</p> : ''}
                                            <div className='clearfix'></div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">End Date (or Expected)</label>
                                            <div className='start-date'>
                                                <Dropdown
                                                    name="enddate" id="enddate" value={endMonth}
                                                    options={options}
                                                    title="Month" selectStyle="w-100"
                                                    handleChange={endMonthSelect}
                                                    selectedValue={endMonth} />
                                            </div>
                                            <div className='end-date'>
                                                <Dropdown
                                                    name="enddate" id="enddate" value={endYear}
                                                    options={year}
                                                    title="Year" selectStyle="w-100"
                                                    handleChange={endYearSelect}
                                                    selectedValue={endYear} />
                                            </div>
                                            <div className='clearfix'></div>

                                        </div>

                                        <div className="form-group">
                                            <AppInput name="percentage" id="percentage" value={percentage} label="Percentage/Grade" radius="5px"
                                                placeholder="Ex: 75%" onChange={percentageHandler} />
                                        </div>

                                        <div className="form-group">
                                            <AppInput name="achievement" value={achievement} id="achievement" onChange={achievementHandler} label="Achievements" radius="5px"
                                                placeholder="Ex: Topper in maths / Achieved gold medal etc." />
                                        </div>

                                        <div className="form-group">
                                            <AppTextarea name="comment" value={description} id="comment"
                                                onChange={descriptionHandler} label="Description" radius="5px"
                                                placeholder="Max 100 Characters" />
                                            {(count > 100 || errors.countError) ? <p style={{ color: 'red' }}>Description should not Exceed 100 characters</p> : ''}
                                            <div className='text-area-count text-right'>{count} /100</div>
                                        </div>
                                        <AppButton onClick={educationDetailsSubmitHandler} disabled={!nextFlag} children={btnName} styleClass='btn save-btn w-100 mb-2' />
                                        <div className="button-center text-center mt-4">
                                            <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn' />
                                            <AppButton onClick={reset} children="Clear" styleClass='btn clear-btn mr-2 ml-2' />
                                            <AppButton onClick={NextStep} disabled={!nextFlag} children="Next Step" styleClass='btn save-btn' />
                                        </div>

                                    </form>}
                                </div>

                                {Show && <div className="secondPage">
                                    {educationDetails.length ? educationDetails.map((data: IEducation) =>
                                        <div className="details-grid">
                                            <div className="card-left">
                                                <div className="show-details-left">
                                                    <div className="show-details-left-img">
                                                        <img src={`${assetUrl}/details-img.png`} alt="" />
                                                    </div>
                                                    <div className="show-details-left-con">
                                                        <h4>{data.curr_cat_name}</h4>
                                                        <b>{data.institute_name}
                                                        </b>
                                                        <p className="m-0">
                                                            {data.start_date ? dateFormat(`${data.start_date}`, "mmm") : ''}     {data.start_date ? dateFormat(`${data.start_date}`, "yyyy") : ''} -
                                                            {data.end_date ? dateFormat(`${data.end_date}`, "mmm") : ''}    {data.end_date ? dateFormat(`${data.end_date}`, "yyyy") : ''} <br />
                                                        </p>
                                                        <p className="m-0">Hyderabad, Telangana, India.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-right">
                                                <div className="show-details-left text-right">
                                                    <button type="button" className="btn primary-bg border-r mr-1" onClick={() => EditDetails(data)}>
                                                        <img src={`${assetUrl}/edit.svg`} alt="edit" />
                                                    </button>
                                                    <button type="button" className="btn bg-light border-r" onClick={() => remove(data)}>
                                                        <img src={`${assetUrl}/delete_red.svg`} alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='clearfix'></div>
                                        </div>
                                    ) : <div>  </div>}
                                    <div className="add-btn mt-2 mb-2">
                                        <button type="button" className="btn add-more-btn w-100" onClick={AddMore}>
                                            <img src={`${assetUrl}/add_circle.svg`} alt="Add More" />
                                            &nbsp;&nbsp;Add more education details
                                        </button>
                                    </div>


                                    <div className="button-center text-center mt-4">
                                        <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn' />
                                        <AppButton onClick={NextStep} disabled={!nextFlag} children="Next Step" styleClass='btn save-btn' />
                                    </div>
                                </div>}
                            </div>

                        </div>
                    </Box>

                </Box>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Education;