import React, { TextareaHTMLAttributes } from 'react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import DropdownNew from "vridhee_common_component_mf/DropdownNew"
// import AddIcon from "../../../assets/img/add_circle.svg";
// import Edit from '../../../assets/img/edit.svg';
// import DeailsImg from '../../../assets/img/details-img.png';
import Button from '@mui/material/Button';
// import Delete from '../../../assets/img/delete_red.svg'
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
// import { OnboardingService } from '../../../services/onboarding-services';
import CustomSelect from "vridhee_common_component_mf/CustomSelect";
import { useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';
import IUser from '../Models/IUser';
import { OnboardingService } from '../Services/onboardingService';
// import IUser from '../../../models/IUser';
import IEducation from '../Models/IActorProfile'
// import IActorProfile from '../../../models/IActorProfile';
import AppInput from "vridhee_common_component_mf/AppInput";
import AppButton from "vridhee_common_component_mf/AppButton";
import AppTextarea from "vridhee_common_component_mf/AppTextarea"
import Dropdown from "vridhee_common_component_mf/Dropdown"
import Grid from '@mui/material/Grid';

const drawerWidth = 300;
let Id: string;
let educationId: string;
let btnName: string = 'Add Education'

let instituteSelect: string[];
let fieldOfSelect: string[];

interface IInstitutions {
    institutions: IUser[],
    errorMsg: string
}
const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
];
const year = [
    { value: 2023, label: 2023 },
    { value: 2024, label: 2024 },
    { value: 2025, label: 2025 },
    { value: 2026, label: 2026 },
    { value: 2027, label: 2027 },
    { value: 2028, label: 2028 },
    { value: 2029, label: 2029 },
    { value: 2030, label: 2030 },
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

    const [Show, setShow] = useState(true);

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
    const data = { name: "/professional-details", coins: "20" };
    const [startMonth, setStartMonth] = useState(0);
    const [startYear, setStartYear] = useState(0);
    const [endMonth, setEndMonth] = useState(0);
    const [endYear, setEndYear] = useState(0);

    const [achievement, setAchievement] = useState('');
    const [description, setDescription] = useState('');

    const [selectInstitute, setSelectInstitute] = useState('');
    const [instituteId, setInstituteId] = useState('');

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedClassId, setSelectedClassId] = useState('');

    const [selectStudyField, setSelectStudyField] = useState('');
    const [selectStudyFieldId, setSelectStudyFieldId] = useState('');

    const [selectGrade, setSelectGrade] = useState('');
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
        setStartMonth(+target.value)
    }
    function startYearSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        let target = e.target as HTMLSelectElement;
        setStartYear(+target.value)
    }
    function endMonthSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        let target = e.target as HTMLSelectElement;
        setEndMonth(+target.value)
    }
    function endYearSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        let target = e.target as HTMLSelectElement;
        setEndYear(+target.value)
    }

    const classSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let target = e.target as HTMLSelectElement;
        const selectedClass = target.value;
        setSelectedClass(selectedClass);
        curriculumTypes.map(curr => {
            if (selectedClass === curr.name) {
                setSelectedClassId(curr._id)
                setGrade({ ...grade, grades: curr.grades })
                setStudyField({ ...studyField, studyFields: curr.study_field })
            }
        })
    }

    const achievementHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setAchievement(target.value);
    }

    const descriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target as HTMLTextAreaElement;
        setDescription(target.value);
    }

    const profession = () => {
        navigate('/professional-details');
    }

    const instituteChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let target = e.target as HTMLSelectElement;
        let instituteSelect = target.value;
        setSelectInstitute(instituteSelect);
        institutions.filter(institute => institute.name === instituteSelect)
            .filter(instituteName => setInstituteId(instituteName._id));
    }

    const fieldOfStudyHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let target = e.target as HTMLSelectElement;
        let fieldOfSelect = target.value;
        setSelectStudyField(fieldOfSelect);
        studyFields.filter(field => field.val === fieldOfSelect)
            .filter(fieldName => setSelectStudyFieldId(fieldName.id));
    }

    function reset() {
        // ev.preventDefault();
        btnName = 'Add Education'
        setSelectedClassId('');
        setSelectedClass('');
        setSelectGradeId('');
        setSelectGrade('');
        setSelectStudyFieldId('');
        setSelectStudyField('');
        setStartYear(0);
        setStartMonth(0);
        setEndYear(0);
        setEndMonth(0);
        setAchievement('');
        setDescription('');
    }

    function EditDetails(data: IEducation) {
        btnName = 'Update Education'
        console.log(data, "dataa");
        educationId = data._id;
        console.log(educationId, "educationId");
        setShow(!Show);
        setSelectedClass(data.curr_cat_name);
        setSelectInstitute(data.institute_name);
        setAchievement(data.achievements);
        setDescription(data.desc);
        setSelectStudyField(data.study_field);

        curriculumTypes.map(curr => {
            if (data.curr_cat_name === curr.name) {
                setSelectedClassId(curr._id)
                setGrade({ ...grade, grades: curr.grades })
                setStudyField({ ...studyField, studyFields: curr.study_field })
            }
        })
        setSelectGrade(data.curr_grade_name)

        // studyFields.filter(field => field.val === data.study_field)
        //     .filter(fieldName => setSelectStudyFieldId(fieldName.id));

        setSelectGrade(data.curr_grade_name);
        let endmonth = dateFormat(data.end_date, "mm");
        let endyear = dateFormat(data.end_date, "yyyy");
        let startmonth = dateFormat(data.start_date, "mm");
        let startyear = dateFormat(data.start_date, "yyyy");
        console.log(startmonth, "0")
        console.log(startyear, "1")
        console.log(endmonth, "2")
        console.log(endyear, "3")
        setStartMonth(+startmonth)
        setStartYear(+startyear)
        setEndMonth(+endmonth)
        setEndYear(+endyear)
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
                    console.log(res.data.data.education_details.data.length, "ppppppppp")
                    if (res.data.data.education_details.data.length) {
                        setShow(true);
                        console.log(res.data.data, "profileData")
                        Id = res.data.data._id;
                        console.log(Id, "Id");
                        setDetails({
                            ...details, educationDetails: res.data.data.education_details.data
                        })

                    } else {
                        setShow(false)
                        // toast.error(res.data.msg);
                    }
                })
                .catch(err => {
                    toast.error(err.message);
                });
        }
    }


    const gradeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let target = e.target as HTMLSelectElement;
        const gradeSelect = target.value;
        setSelectGrade(gradeSelect);
        grades.filter(grade => grade.val === gradeSelect)
            .filter(gradeName => setSelectGradeId(gradeName.id))
    }

    const educationDetailsSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (btnName == 'Add Education') {
            const profileId: string | null = localStorage.getItem('profileId');
            const profileSection = 'education_details';
            const body = {
                "education_details": {
                    "data": [
                        {
                            "institute_id": instituteId,
                            "institute_name": selectInstitute,
                            "curr_cat_id": selectedClassId,
                            "curr_cat_name": selectedClass,
                            "curr_grade_id": selectGradeId,
                            "curr_grade_name": selectGrade,
                            "study_field_id": selectStudyFieldId,
                            "study_field": selectStudyField,
                            "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                            "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                            "achievements": achievement,
                            "desc": description
                        }
                    ]
                }
            }
            OnboardingService.updateUserprofile(profileId, profileSection, body)
                .then(res => {
                    if (res.data.data) {
                        toast.success('Saved Successfully');
                        getProfileData();
                        // navigate("/congratulation", { state: data });
                        setShow(!Show);
                        setSelectedClassId('');
                        setSelectedClass('');
                        setSelectGradeId('');
                        setSelectGrade('');
                        setSelectStudyFieldId('');
                        setSelectStudyField('');
                        setStartYear(0);
                        setStartMonth(0);
                        setEndYear(0);
                        setEndMonth(0);
                    } else {
                        toast.error(res.data.msg);
                    }
                })
                .catch(err => {
                    toast.error(err.message);
                });
        } else {
            const body = {
                "education_id": educationId,
                "_id": Id,
                "institute_id": instituteId,
                "institute_name": selectInstitute,
                "curr_cat_id": selectedClassId,
                "curr_cat_name": selectedClass,
                "curr_grade_id": selectGradeId,
                "curr_grade_name": selectGrade,
                "study_field_id": selectStudyFieldId,
                "study_field": selectStudyField,
                "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                "achievements": achievement,
                "desc": description

            }
            OnboardingService.updateEducationalDetails(body)
                .then(res => {
                    if (res.data.status == 'Update Success') {
                        toast.success('Updated Successfully');
                        getProfileData();
                        setShow(!Show);
                        setSelectedClassId('');
                        setSelectedClass('');
                        setSelectGradeId('');
                        setSelectGrade('');
                        setSelectStudyFieldId('');
                        setSelectStudyField('');
                        setStartYear(0);
                        setStartMonth(0);
                        setEndYear(0);
                        setEndMonth(0);
                    } else {
                        toast.error(res.data.msg);
                    }
                })
                .catch(err => {
                    toast.error(err.message);
                });
        }
    }


    const remove = (data: IEducation) => {
        let dataId = Id;
        console.log(dataId, "dataid");
        OnboardingService.deleteEducationDetails(data._id, dataId)
            .then(res => {
                if (res.data.status == "Delete Success") {
                    toast.success('Deleted Successfully');
                    reset();
                    btnName = 'Add Education'
                    let profileId = localStorage.getItem('profileId');
                    OnboardingService.getProfileData(profileId)
                        .then(res => {
                            console.log(res.data.data.education_details.data.length, "ppppppppp")
                            if (res.data.data.education_details.data.length) {
                                setShow(true);
                                console.log(res.data.data, "profileData")
                                Id = res.data.data._id;
                                console.log(Id, "Id");
                                setDetails({
                                    ...details, educationDetails: res.data.data.education_details.data
                                })

                            } else {
                                setShow(false)
                                // toast.error(res.data.msg);
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

    function Previous() {
        navigate('/skills-interests');
    }

    function NextStep() {
        navigate("/congratulation", { state: data });
    }

    function AddMore(e: React.MouseEvent<HTMLButtonElement>) {
        reset(e);
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
                                    <Link color="#174392" to="/">
                                        Splash
                                    </Link>
                                    <Typography color="#62676C">Educational details</Typography>
                                </Breadcrumbs>
                            </div>

                            <div className="inner-page-content">

                                <div className="">
                                     <AppButton  children="Skip this step" onClick={profession} styleClass='btn skip-this-btn'  />
                                </div>

                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">Education Details</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        <h4 className="primary-color m-0">STEP 06/09</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="content-sec">
                                    <p><b>Note:-</b> We recommend you add at least one educational detail.</p>
                                </div>

                                <div className="page-forms">
                                    {!Show && <form id="personData" noValidate>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Institution<sup>*</sup></label>
                                            <Dropdown
                                                name="location" id="location" value={selectInstitute} options={institutions} title="-Select-" selectStyle="w-100"
                                                handleChange={instituteChangeHandler} selectedValue={selectInstitute} />
                                            {/* <select className="form-control" name="location" id="exampleFormControlSelect1"
                                                placeholder='some' value={selectInstitute} onChange={instituteChangeHandler}>
                                                <option>-Select-</option>
                                                {institutions.length ?
                                                    institutions.map(institute =>
                                                        <option id={institute._id} >{institute.name}</option>
                                                    ) : <div>  <Alert severity="error" >{errorMsg}</Alert>  </div>
                                                }
                                            </select> */}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Class<sup>*</sup></label>
                                            <Dropdown
                                                name="class" id="class" value={selectedClass} options={curriculumTypes} title="-Select-" selectStyle="w-100"
                                                handleChange={classSelectHandler} selectedValue={selectedClass} />
                                            {/* <select className="form-control" name="location" id="exampleFormControlSelect1"
                                                placeholder='some' value={selectedClass} onChange={classSelectHandler}>
                                                <option>-Select-</option>
                                                {curriculumTypes.length ?
                                                    curriculumTypes.map(curriculum =>
                                                        <option id={curriculum._id} >{curriculum.name}</option>
                                                    ) : <div>  <Alert severity="error" >{errorMsg}</Alert>  </div>}
                                            </select> */}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Field of Study<sup>*</sup></label>
                                            {/* <select className="form-control" name="location" id="exampleFormControlSelect1"
                                                placeholder='some' value={selectStudyField} onChange={fieldOfStudyHandler}>
                                                <option>-Select-</option>
                                                {studyFields.length ? studyFields.map(study =>
                                                    <option id={study.id} >{study.val}</option>
                                                ) : <div>  <Alert severity="error" >{studyError}</Alert>  </div>}
                                            </select> */}
                                            <DropdownNew
                                                name="studyField" id="studyField" value={selectStudyField} options={studyFields} title="-Select-" selectStyle="w-100"
                                                handleChange={fieldOfStudyHandler} selectedValue={selectStudyField} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Start Date<sup>*</sup></label>
                                            <div className='start-date'>
                                                <CustomSelect
                                                    name="startdate" id="startdate" value={startMonth}
                                                    options={options}
                                                    title="-Select-" selectStyle="w-100"
                                                    handleChange={startMonthSelect}
                                                    selectedValue={startMonth} />
                                            </div>
                                            <div className='end-date'>
                                                <CustomSelect
                                                    name="startyear" id="startyear" value={startYear}
                                                    options={year}
                                                    title="-Select-" selectStyle="w-100"
                                                    handleChange={startYearSelect}
                                                    selectedValue={startYear} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">End Date (or Expected)</label>
                                            <div className="row">
                                                <div className='col-md-6'>
                                                    {/* <select className="form-control" name="location" id="exampleFormControlSelect1"
                                                        placeholder='some' value={endMonth} onChange={endMonthSelect}>
                                                        <option value=''>Month</option>
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                        <option value='4'>4</option>
                                                        <option value='5'>5</option>
                                                        <option value='6'>6</option>
                                                        <option value='7'>7</option>
                                                        <option value='8'>8</option>
                                                        <option value='9'>9</option>
                                                        <option value='10'>10</option>
                                                        <option value='11'>11</option>
                                                        <option value='12'>12</option>
                                                    </select> */}
                                                    <CustomSelect
                                                        name="enddate" id="enddate" value={endMonth}
                                                        options={options}
                                                        title="-Select-" selectStyle="w-50"
                                                        handleChange={endMonthSelect}
                                                        selectedValue={endMonth} />
                                                </div>
                                                <div className='col-md-6'>
                                                    {/* <select className="form-control" name="location" id="exampleFormControlSelect1"
                                                        placeholder='some' value={endYear} onChange={endYearSelect}>
                                                        <option value="">Year</option>
                                                        <option value="2023">2023</option>
                                                        <option value="2024">2024</option>
                                                        <option value="2025">2025</option>
                                                        <option value="2026">2026</option>
                                                        <option value="2027">2027</option>
                                                        <option value="2028">2028</option>
                                                    </select> */}
                                                    <CustomSelect
                                                        name="enddate" id="enddate" value={endYear}
                                                        options={year}
                                                        title="-Select-" selectStyle="w-50"
                                                        handleChange={endYearSelect}
                                                        selectedValue={endYear} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Grade</label>
                                            {/* <select className="form-control" name="location" id="exampleFormControlSelect1"
                                                placeholder='some' value={selectGrade} onChange={gradeSelectHandler}>
                                                <option>-Select-</option>
                                                {grades.length ? grades.map(grd =>
                                                    <option id={grd._id} >{grd.val}</option>
                                                ) : <div>  <Alert severity="error" >{errorMsg}</Alert>  </div>}
                                            </select> */}
                                            <DropdownNew
                                                name="gradeVal" id="gradeVal" value={selectGrade} options={grades} title="-Select-" selectStyle="w-100"
                                                handleChange={gradeSelectHandler} selectedValue={selectGrade} />
                                        </div>

                                        <div className="form-group">
                                            <AppInput name="achievement" value={achievement} id="achievement" onChange={achievementHandler} label="Achievements" radius="5px"
                                                placeholder="Ex: Topper in maths / Achieved gold medal etc." />
                                            {/* <label htmlFor="exampleFormControlSelect1">Achievements</label>
                                            <input type="text" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                placeholder="Ex: Topper in maths / Achieved gold medal etc." value={achievement} onChange={achievementHandler} /> */}
                                        </div>

                                        <div className="form-group">
                                            <AppTextarea name="comment" value={description} id="comment" onChange={descriptionHandler} label="Description" radius="5px"
                                                placeholder="Max 100 Characters" />
                                            {/* <label htmlFor="exampleFormControlSelect1">Description</label>
                                            <textarea className="form-control" name="comment" id="exampleFormControlTextarea1"
                                                placeholder='Max 100 Characters' value={description} onChange={descriptionHandler}></textarea> */}
                                            <div className='text-area-count text-right'>1 /100</div>
                                        </div>
                                        <AppButton onClick={educationDetailsSubmitHandler} children={btnName} styleClass='btn save-btn w-100' />
                                        {/* <button type="submit" className="btn save-btn w-100 mb-3" >{btnName}</button> */}
                                        {/* 
                                        <div className="add-btn">
                                            <button type="button" className="btn add-more-btn w-100">
                                                <img src={AddIcon} alt="Add More" />&nbsp;&nbsp;Add more education details
                                            </button>
                                        </div> */}

                                        <div className="button-center text-center mt-4">
                                            <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn mr-2' />
                                            <AppButton onClick={reset} children="Clear" styleClass='btn clear-btn mr-2' />
                                            <AppButton onClick={NextStep} children="Next Step" styleClass='btn save-btn' />
                                            {/* <Button variant="outlined" className="btn prev-btn mr-2" onClick={Previous}>Previous</Button>
                                            <Button variant="contained" className="btn clear-btn mr-2" onClick={reset}>Clear</Button>
                                            <Button variant="contained" type='submit' className="btn save-btn" onClick={NextStep}>Next Step</Button> */}
                                        </div>

                                    </form>}
                                </div>

                                {Show && <div className="secondPage">
                                    {educationDetails.length ? educationDetails.map((data: IEducation) =>
                                        <div className="row">
                                            <div className="col-md-9 col-lg-9">
                                                <div className="show-details-left">
                                                    <div className="show-details-left-img">
                                                        {/* <img src={DeailsImg} alt="" /> */}
                                                        <img src="http://localhost:3000/assets/img/details-img.png" alt="" />
                                                    </div>
                                                    <div className="show-details-left-con">
                                                        <h4>{data.curr_cat_name}</h4>
                                                        <b>{data.institute_name}
                                                            {/* , Full Time */}
                                                        </b>
                                                        <p className="m-0"> {dateFormat(`${data.start_date}`, "mmm")}    {dateFormat(`${data.start_date}`, "yyyy")}- {dateFormat(`${data.end_date}`, "mmm")}    {dateFormat(`${data.end_date}`, "yyyy")}</p>
                                                        <p className="m-0">Hyderabad, Telangana, India.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-lg-3">
                                                <div className="show-details-left text-right">
                                                    <button type="button" className="btn primary-bg border-r mr-2" onClick={() => EditDetails(data)}>
                                                        {/* <img src={Edit} alt="edit" /> */}
                                                        <img src="http://localhost:3000/static/media/edit.0fd9a6237530e39a92d928e6e8cc621f.svg" alt="edit" />
                                                    </button>
                                                    <button type="button" className="btn bg-light border-r" onClick={() => remove(data)}>
                                                        {/* <img src={Delete} alt="" /> */}
                                                        <img src="http://localhost:3000/static/media/delete_red.31e0fe54a6041abd500fa5c58489a1b4.svg" alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : <div>  </div>}
                                    <div className="add-btn mt-3">
                                        <button type="button" className="btn add-more-btn w-100" onClick={AddMore}>
                                            {/* <img src={AddIcon} alt="Add More" /> */}
                                            <img src="http://localhost:3000/static/media/add_circle.4a9831b78aadd01ec280f44eb9711314.svg" alt="Add More" />
                                            &nbsp;&nbsp;Add more education details
                                        </button>
                                    </div>

                                    <div className="button-center text-center mt-4">
                                        <Button variant="outlined" className="btn prev-btn mr-2" onClick={Previous}>Previous</Button>
                                        <Button variant="contained" className="btn clear-btn mr-2" onClick={reset}>Clear</Button>
                                        <Button variant="contained" className="btn save-btn" onClick={NextStep}>Next Step </Button>
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