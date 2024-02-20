import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AppButton from "vridhee_common_component_mf/AppButton";
import { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Creatable from 'react-select/creatable'
import IUser from '../Models/IUser';
import Slider from '@mui/material/Slider';
import { OnboardingService } from '../Services/onboardingService';

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


interface IHobbies {
    hobbies: IUser[],
    errorMsg: string
}

interface IGetHobbies {
    gethobbies: IUser[]
}


interface IHobbyDetail {
    hobbydetails: IUser[]
}

interface IPassionDetail {
    passiondetails: IUser[]
}

interface IPassion {
    passions: IUser[],
    errorMsgs: string
}

function Hobbiespassion() {
    const navigate = useNavigate();

    const [hobbie, setHobbie] = useState<IHobbies>({
        hobbies: [] as IUser[],
        errorMsg: ''
    })

    const [gethobbie, setGetHobbie] = useState<IGetHobbies>({
        gethobbies: [] as IUser[]
    })

    const [hobbydetail, setHobbyDetail] = useState<IHobbyDetail>({
        hobbydetails: [] as IUser[]
    })

    const [passiondetail, setPassionDetail] = useState<IPassionDetail>({
        passiondetails: [] as IUser[]
    })

    const [hobbievalue, setHobbieValue] = useState([]);
    const [passionvalue, setPassionValue] = useState([]);

    const [hvalues, setHValues] = useState([]);
    const [pvalues, setPValues] = useState([]);

    const [hrating, setHRating] = useState(80);
    const [prating, setPRating] = useState(80);

    function valuetext(value: number) {
        setPRating(value);
    }

    function passionvaluetext(value: number) {
        setHRating(value);
    }

    interface IHobbie {
        name: string;
        rating: number;
        status: number;
    }

    useEffect(() => {
        if (localStorage.getItem('profileId')) {
            let profileId = localStorage.getItem('profileId');
            OnboardingService.getProfileData(profileId)
                .then(res => {
                    let addLabelInHobbies = res.data.data.hobbies_passion.hobbies.data.map((hobby: IUser) => {
                        return {
                            ...hobby,
                            value: hobby.name,
                            label: hobby.name,
                            rating: hobby.rating
                        }
                    })
                    if (addLabelInHobbies.length) {

                        setHobbyDetail({
                            ...hobbydetail, hobbydetails: addLabelInHobbies
                        })
                    }

                    setHValues(addLabelInHobbies);

                    let addLabelInPassions = res.data.data.hobbies_passion.passion.data.map((passion: IUser) => {
                        return {
                            ...passion,
                            value: passion.name,
                            label: passion.name,
                            rating: passion.rating
                        }
                    })
                    if (addLabelInPassions.length) {

                        setPassionDetail({
                            ...passiondetail, passiondetails: addLabelInPassions
                        })
                    }
                    setPValues(addLabelInPassions)
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }

    }, [])

    useEffect(() => {
        setHobbie({ ...hobbie })
        setTimeout(() => {
            OnboardingService.getHobbies()
                .then(res => {
                    let addLabelInHobbies = res.data.data[0].data.map((hobby: IUser) => {
                        return {
                            ...hobby,
                            value: hobby.name,
                            label: hobby.name,
                            rating: '80'
                        }
                    })
                    setHobbie({
                        ...hobbie, hobbies: addLabelInHobbies
                    })
                })
                .catch(err => setHobbie({
                    ...hobbie, errorMsg: err.message
                }));
        }, 1000)
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { hobbies, errorMsg } = hobbie;

    const { hobbydetails } = hobbydetail;

    const { passiondetails } = passiondetail;

    const handleOptionSelect = (event: any, newValue: any) => {

        if (newValue.action === 'select-option' || newValue.action === 'create-option') {


            let addLabelInHobbiesdd = event.map((hobby: IUser) => {
                return {
                    ...hobby,
                    value: hobby.value,
                    label: hobby.value,
                    name: hobby.value,
                    rating: '80'
                }
            })

            setHobbyDetail({
                ...hobbydetail, hobbydetails: addLabelInHobbiesdd
            })

            let data: any = [...hvalues];
            event.map((option: any) => {
                let index = hvalues.findIndex((x: IUser) => x.name === option.value);
                if (index == -1) {
                    let obj: any = {
                        "name": option.value,
                        "rating": hrating,
                        "status": 1.0
                    }
                    data.push(obj);
                }

            })
            setHValues(data);

        } else if (newValue.action === 'remove-value' || newValue.action === 'pop-value') {
            let removeHobbyValues: any = hobbydetails.filter((hobby: any) => {
                return hobby.name !== newValue.removedValue.value
            })
            setHobbyDetail({
                ...hobbydetail, hobbydetails: removeHobbyValues
            })
            setHValues(removeHobbyValues);
        }
    };

    const handlePassionOptionSelect = (event: any, newValue: any) => {
        if (newValue.action === 'select-option' || newValue.action === 'create-option') {

            let addPassionValues = event.map((passion: any) => {
                return {
                    ...passion,
                    value: passion.value,
                    label: passion.value,
                    name: passion.value,
                    rating: '80'
                }
            })

            setPassionDetail({
                ...passiondetail, passiondetails: addPassionValues
            })

            let data: any = [...pvalues];
            event.map((option: IUser) => {
                let index = pvalues.findIndex((x: IUser) => x.name === option.value);
                if (index == -1) {
                    let obj: IHobbie = {
                        "name": option.value,
                        "rating": prating,
                        "status": 1.0
                    }
                    data.push(obj);
                }
            })
            setPValues(data);

        } else if (newValue.action === 'remove-value' || newValue.action === 'pop-value') {

            let removePassionValues: any = passiondetails.filter((passion: IUser) => {
                return passion.name !== newValue.removedValue.value
            })

            setPassionDetail({
                ...passiondetail, passiondetails: removePassionValues
            })

            setPValues(removePassionValues);
        }
    };

    const [passion, setPassion] = useState<IPassion>({
        passions: [] as IUser[],
        errorMsgs: ''
    })

    useEffect(() => {
        setPassion({ ...passion })
        OnboardingService.getPassion()
            .then(res => {
                let addLabelInPassions = res.data.data[0].data.map((passion: IUser) => {
                    return {
                        ...passion,
                        value: passion.name,
                        label: passion.name,
                        rating: '80'
                    }
                })
                setPassion({
                    ...passion, passions: addLabelInPassions
                })
            })
            .catch(err => setPassion({
                ...passion, errorMsgs: err.message
            }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { passions, errorMsgs } = passion;



    const data = { name: "/skills-interests", coins: "20" };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let profileId: string | null = localStorage.getItem('profileId');
        let profileSection = 'hobbies_passion';
        const body = {
            "hobbies_passion": {
                "hobbies": {
                    "data": hvalues
                },
                "passion": {
                    "data": pvalues
                }
            }
        }
        OnboardingService.updateUserprofile(profileId, profileSection, body)
            .then(res => {
                if (res.data.data) {
                    toast.success('Updated Successfully');
                    navigate("/congratulation", { state: data });
                } else {
                    toast.error(res.data.msg);
                }
            })
            .catch(err => {
                toast.error(err.msg);
            });
    }

    function Previous() {
        navigate('/learning-interest');
    }

    const hobbyFormHandler = (e: React.ChangeEvent<EventTarget>, newValue: number, subject: string, type: string) => {
        let target = e.target as HTMLSelectElement;
        let index = hvalues.findIndex((x: IUser) => x.name == subject);
        let data: any = [...hvalues];
        if (index > -1) {
            if (type === 'hobby-rating') {
                data[index]['rating'] = target.value;
            }
        }
        setHValues(data);
    };

    const passionFormHandler = (e: React.ChangeEvent<EventTarget>, newValue: number, subject: string, type: string) => {
        let target = e.target as HTMLSelectElement;
        let index = pvalues.findIndex((x: IUser) => x.name == subject);
        let data: any = [...pvalues];
        if (index > -1) {
            if (type === 'passion-rating') {
                data[index]['rating'] = target.value;
            }
        }
        setPValues(data);
    };

    const skills = () => {
        navigate('/skills-interests');
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
                                    <Typography color="#62676C">Hobbies & Passions</Typography>
                                </Breadcrumbs>
                            </div>

                            <div className="inner-page-content">

                                <div className="">
                                    <AppButton children="Skip this step" onClick={skills} styleClass='btn skip-this-btn' />
                                </div>

                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">Hobbies</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        <h4 className="primary-color m-0">STEP 03/09</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="page-forms">
                                    <form id="hobbyData" noValidate>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">What are your hobbies?</label>

                                            <Creatable
                                                
                                                value={hobbydetails}
                                                onChange={handleOptionSelect}
                                                options={hobbies}
                                                placeholder="Select hobby"
                                                isMulti
                                            />
                                        </div>



                                        {hobbydetails.length > 0 ? hobbydetails.map((data: IUser, i: number) =>
                                            <div className="select-levels-teaching">
                                                <h4>{data.name}</h4>
                                                <div className="line-con">
                                                    <span className="float-left">Beginner</span>
                                                    <span className="float-right">Expert</span>
                                                </div>
                                                <Slider
                                                    aria-label="Always visible"
                                                    defaultValue={data.rating}
                                                    // getAriaValueText={valuetext} 
                                                    onChange={(e: any) => hobbyFormHandler(e, i, data.name, "hobby-rating")}
                                                    step={5}
                                                    marks={rating}
                                                    valueLabelDisplay="on"
                                                />
                                            </div>
                                        ) : <div>  </div>}

                                        <div className="person-name">
                                            <div className="left-end">
                                                <h3 className="primary-color m-0">Passions</h3>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">What are your passion?</label>

                                            <Creatable
                                                value={passiondetails}
                                                onChange={handlePassionOptionSelect}
                                                options={passions}
                                                placeholder="Select passion"
                                                isMulti
                                            />
                                        </div>

                                        {passiondetails.length > 0 ? passiondetails.map((data: IUser, i: number) =>
                                            <div className="select-levels-teaching">
                                                <h4>{data.name}</h4>
                                                <div className="line-con">
                                                    <span className="float-left">Beginner</span>
                                                    <span className="float-right">Expert</span>
                                                </div>
                                                <Slider
                                                    aria-label="Always visible"
                                                    defaultValue={data.rating}
                                                    // getAriaValueText={passionvaluetext}
                                                    onChange={(e: any) => passionFormHandler(e, i, data.name, "passion-rating")}
                                                    step={5}
                                                    marks={rating}
                                                    valueLabelDisplay="on"
                                                />

                                            </div>
                                        ) : <div>  </div>}
                                        <div className="button-center text-center mt-4">
                                            <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn' />
                                            <AppButton children="Clear" styleClass='btn clear-btn mr-2 ml-2' />
                                            <AppButton onClick={handleSubmit} children="Next Step" styleClass='btn save-btn' />
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

export default Hobbiespassion;