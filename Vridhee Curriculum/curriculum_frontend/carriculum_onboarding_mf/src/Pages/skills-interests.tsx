import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AppButton from "vridhee_common_component_mf/AppButton";
import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Creatable from 'react-select/creatable'
import IUser from '../Models/IUser';
import { OnboardingService } from '../Services/onboardingService';
import Slider from '@mui/material/Slider';

interface ISkills {
    skills: IUser[],
    errorMsg: string
}

interface IInterests {
    interests: IUser[],
    errorMsgs: string
}

interface ISkillDetail {
    skilldetails: IUser[]
}

interface IInterestDetail {
    interestdetails: IUser[]
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

const drawerWidth = 300;

let skillArray: [{}];
let intArray: [{}];
let nextFlag = false
function Skills() {
    const navigate = useNavigate();
    const [skill, setSkill] = useState<ISkills>({
        skills: [] as IUser[],
        errorMsg: ''
    })

    const [skilldetail, setSkillDetail] = useState<ISkillDetail>({
        skilldetails: [] as IUser[]
    })

    const [interestdetail, setInterestDetail] = useState<IInterestDetail>({
        interestdetails: [] as IUser[]
    })

    const [svalues, setSValues] = useState([]);
    const [ivalues, setIValues] = useState([]);



    useEffect(() => {
        setSkill({ ...skill })
        OnboardingService.getSkills()
            .then(res => {
                let addLabelInSkills = res.data.data[0].data.map((skill: IUser) => {
                    return {
                        ...skill,
                        value: skill.name,
                        label: skill.name,
                        rating: '80'
                    }
                })
                setSkill({
                    ...skill, skills: addLabelInSkills
                })
            })
            .catch(err => setSkill({
                ...skill, errorMsg: err.message
            }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { skills, errorMsg } = skill;
    const [skillvalue, setSkillValue] = useState([]);


    useEffect(() => {
        if (localStorage.getItem('profileId')) {
            let profileId = localStorage.getItem('profileId');
            OnboardingService.getProfileData(profileId)
                .then((res: any) => {
                    let addLabelInSkills = res.data.data.skill_interest.skill.data.map((skill: any) => {
                        return {
                            ...skill,
                            value: skill.name,
                            label: skill.name,
                            rating: skill.rating
                        }
                    })
                    if (addLabelInSkills.length) {
                        setSkillDetail({
                            ...skilldetail, skilldetails: addLabelInSkills
                        })

                    }
                    setSValues(addLabelInSkills)

                    let addLabelInInterests = res.data.data.skill_interest.interest.data.map((interest: any) => {

                        return {
                            ...interest,
                            value: interest.name,
                            label: interest.name,
                            rating: interest.rating
                        }
                    })
                    if (addLabelInInterests.length) {
                        setInterestDetail({
                            ...interestdetail, interestdetails: addLabelInInterests
                        })
                    }
                    setIValues(addLabelInInterests)
                    if (addLabelInSkills && addLabelInInterests) {
                        nextFlag = true
                    } else {
                        nextFlag = false
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }

    }, [])


    const handleOptionSelect = (event: any, newValue: any) => {
        if (newValue.action === 'select-option' || newValue.action === 'create-option') {

            let addSkillValues = event.map((skill: any) => {
                return {
                    ...skill,
                    value: skill.value,
                    label: skill.value,
                    name: skill.value,
                    rating: '80'
                }
            })
            setSkillDetail({
                ...skilldetail, skilldetails: addSkillValues
            })


            let data: any = [...svalues];
            event.map((option: any) => {
                let index = svalues.findIndex((x: any) => x.name === option.value);
                if (index == -1) {
                    let obj: any = {
                        "name": option.value,
                        "rating": skillrating,
                        "status": 1.0
                    }
                    data.push(obj);
                }

            })
            setSValues(data);
            if (data.length) {
                nextFlag = true
            } else {
                nextFlag = false
            }
        } else if (newValue.action === 'remove-value' || newValue.action === 'pop-value') {
            let removeSkillValues: any = skilldetails.filter((skill: IUser) => {
                return skill.name !== newValue.removedValue.value
            })

            setSkillDetail({
                ...skilldetail, skilldetails: removeSkillValues
            })

            setSValues(removeSkillValues);
            if (removeSkillValues.length) {
                nextFlag = true
            } else {
                nextFlag = false
            }
        }
    };

    const handleOptionSelectval = (event: any, newValue: any) => {
        if (newValue.action === 'select-option' || newValue.action === 'create-option') {

            let addIntValues = event.map((int: any) => {
                return {
                    ...int,
                    value: int.value,
                    label: int.value,
                    name: int.value,
                    rating: '80'
                }
            })

            setInterestDetail({
                ...interestdetail, interestdetails: addIntValues
            })

            let data: any = [...ivalues];
            event.map((option: any) => {
                let index = ivalues.findIndex((x: any) => x.name === option.value);
                if (index == -1) {
                    let obj: any = {
                        "name": option.value,
                        "rating": intrating,
                        "status": 1.0
                    }
                    data.push(obj);
                }

            })
            setIValues(data);
            if (data.length) {
                nextFlag = true
            } else {
                nextFlag = false
            }
        } else if (newValue.action === 'remove-value' || newValue.action === 'pop-value') {
            let removeIntValues: any = interestdetails.filter((interest: IUser) => {
                return interest.name !== newValue.removedValue.value
            })

            setInterestDetail({
                ...interestdetail, interestdetails: removeIntValues
            })
            setIValues(removeIntValues);
            if (removeIntValues.length) {
                nextFlag = true
            } else {
                nextFlag = false
            }
        }
    };


    const { skilldetails } = skilldetail;

    const { interestdetails } = interestdetail;

    const [interest, setInterests] = useState<IInterests>({
        interests: [] as IUser[],
        errorMsgs: ''
    })

    useEffect(() => {
        setInterests({ ...interest })
        OnboardingService.getInterests()
            .then(res => {
                let addLabelInInterests = res.data.data[0].data.map((interest: IUser) => {
                    return {
                        ...interest,
                        value: interest.name,
                        label: interest.name,
                        rating: '80'
                    }
                })
                setInterests({
                    ...interest, interests: addLabelInInterests
                })
            })
            .catch(err => setInterests({
                ...interest, errorMsgs: err.message
            }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const education = () => {
        navigate('/educational-details');
    }

    const { interests, errorMsgs } = interest;
    const [intvalue, setIntValue] = useState([]);

    const [skillrating, setSkillRating] = useState(80);
    const [intrating, setIntRating] = useState(80);

    function valuetext(value: number) {
        setSkillRating(value);
    }

    function intvaluetext(value: number) {
        setIntRating(value);
    }

    const onSkillKeyDown = (e: any) => {
        if (!(/^[a-z][a-z\s]*$/i.test(e.key))) {
            e.preventDefault();
        }
    };
    const onInterestKeyDown = (e: any) => {
        if (!(/^[a-z][a-z\s]*$/i.test(e.key))) {
            e.preventDefault();
            //   toast.error("Value should contain only Alphabets and spaces")
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let profileId: string | null = localStorage.getItem('profileId');
        let profileSection = 'skill_interest';
        if (svalues.length && ivalues.length) {
            const body = {
                "skill_interest": {
                    "skill": {
                        "data": svalues
                    },
                    "interest": {
                        "data": ivalues
                    }
                }
            }
            OnboardingService.updateUserprofile(profileId, profileSection, body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Updated Successfully');
                        const data = { name: "/educational-details", coins: "20" };
                        navigate("/congratulation", { state: data });
                    } else {
                        toast.error(res.data.msg);
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        } else {
            if (!svalues.length && !ivalues.length) {
                toast.error("Please select atleast one skill and one interest")
            }
            else if (!svalues.length) {
                toast.error("Please select atleast one skill")
            }
            else if (!ivalues.length) {
                toast.error("Please select atleast one interest")
            }


        }


    }

    function reset(e: React.MouseEvent<EventTarget>) {
        e.preventDefault();
        setSkillDetail({
            ...skilldetail, skilldetails: []
        })
        setInterestDetail({
            ...interestdetail, interestdetails: []
        })
        setIValues([]);
        setSValues([]);
    }

    const skillFormHandler = (e: React.ChangeEvent<EventTarget>, newValue: number, subject: string, type: string) => {
        let target = e.target as HTMLSelectElement;
        let index = svalues.findIndex((x: IUser) => x.name == subject);
        let data: any = [...svalues];
        if (index > -1) {
            if (type === 'skill-rating') {
                data[index]['rating'] = target.value;
            }
        }
        setSValues(data);
    };

    const interestFormHandler = (e: React.ChangeEvent<EventTarget>, newValue: number, subject: string, type: string) => {
        let target = e.target as HTMLSelectElement;
        let index = ivalues.findIndex((x: IUser) => x.name == subject);
        let data: any = [...ivalues];
        if (index > -1) {
            if (type === 'interest-rating') {
                data[index]['rating'] = target.value;
            }
        }
        setIValues(data);
    };

    function Previous() {
        navigate('/hobbies-passion');
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
                                    <Typography color="#62676C">Skills & Interests</Typography>
                                </Breadcrumbs>
                            </div>

                            <div className="inner-page-content">

                                <div className="">
                                    <AppButton children="Skip this step" onClick={education} styleClass='btn skip-this-btn' />

                                </div>

                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">Skills</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        <h4 className="primary-color m-0">STEP 04/08</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="content-sec">
                                    <p><b>Note:-</b> We recommend adding your top 5 used in this experience. They’ll also appear in your Skills section.</p>
                                </div>

                                <div className="page-forms">

                                    <form id="SIData" noValidate>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">What are your Skills?</label>


                                            <Creatable
                                                onKeyDown={onSkillKeyDown}
                                                value={skilldetails}
                                                onChange={handleOptionSelect}
                                                options={skills}
                                                placeholder="Select Skill"
                                                isMulti
                                            />

                                        </div>

                                        {skilldetails.length > 0 ? skilldetails.map((data: any, i: any) =>
                                            <div className="select-levels-teaching">
                                                <h4>{data.name}</h4>

                                                <div className="line-con">
                                                    <span className="float-left">Beginner</span>
                                                    <span className="float-right">Expert</span>
                                                </div>
                                                <Slider aria-label="Always visible"
                                                    defaultValue={data.rating}
                                                    onChange={(e: any) => skillFormHandler(e, i, data.name, "skill-rating")}
                                                    step={5}
                                                    marks={rating}
                                                    valueLabelDisplay="on"
                                                />
                                            </div>
                                        ) : <div>  </div>}

                                        <div className="person-name">
                                            <div className="left-end">
                                                <h3 className="primary-color m-0 pt-0" > Interests</h3>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">What are your Interests?</label>

                                            <Creatable
                                                onKeyDown={onInterestKeyDown}
                                                value={interestdetails}
                                                onChange={handleOptionSelectval}
                                                options={interests}
                                                placeholder="Select Interest"
                                                isMulti
                                            />
                                        </div>

                                        {interestdetails.length > 0 ? interestdetails.map((data: any, i: any) =>
                                            <div className="select-levels-teaching">
                                                <h4>{data.name}</h4>

                                                <div className="line-con">
                                                    <span className="float-left">Beginner</span>
                                                    <span className="float-right">Expert</span>
                                                </div>
                                                <Slider
                                                    aria-label="Always visible"
                                                    defaultValue={data.rating}
                                                    onChange={(e: any) => interestFormHandler(e, i, data.name, "interest-rating")}
                                                    step={5}
                                                    marks={rating}
                                                    valueLabelDisplay="on"
                                                />
                                            </div>
                                        ) : <div>  </div>}
                                        <div className="button-center text-center mt-4">
                                            <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn' />
                                            <AppButton children="Clear" onClick={reset} styleClass='btnonClick={Previous} clear-btn mr-2 ml-2' />
                                            <AppButton onClick={handleSubmit} children="Next Step" disabled={!nextFlag} styleClass='btn save-btn' />
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

export default Skills;