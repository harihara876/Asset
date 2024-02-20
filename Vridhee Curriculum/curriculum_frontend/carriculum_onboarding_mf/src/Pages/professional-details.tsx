import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import dateFormat from 'dateformat';
import AppInput from "vridhee_common_component_mf/AppInput";
import AppButton from "vridhee_common_component_mf/AppButton";
import AppTextarea from "vridhee_common_component_mf/AppTextarea"
import Dropdown from "vridhee_common_component_mf/Dropdown"
import IUser from '../Models/IUser';
import { OnboardingService } from '../Services/onboardingService';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import configJson from "vridhee_common_component_mf/configJson";
const drawerWidth = 300;
let companyname: string;
let desgname: string;
let areaexpname: string;
let nextFlag = false
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


let Id: string;
let professionId: string;
let btnName: string = "Add Profession";

interface ICompanyDetails {
    companies: IUser[],
    errorMsg: string
}

interface IprofessionalDetails {
    professionalDetails: IUser[]
}

interface IDesignationDetails {
    roles: IUser[],
    errorMessage: string
}

interface IAreaExpert {
    areas: IUser[],
    errorMsgs: string
}
const dataval = ["One", "Two", "Three", "Four"];
function Professional() {
    const assetUrl = configJson.local.assetUrl;
    const navigate = useNavigate();
    const [Show, setShow] = useState(false);
    const [compId, setCompId] = useState('');
    const [areaexpId, setAreaexpId] = useState('');
    const [desgId, setDesgId] = useState('');
    const [desc, setDesc] = useState('');
    const [achieve, setAchieve] = useState('');
    const [startMonth, setStartMonth] = useState(0);
    const [startYear, setStartYear] = useState(0);
    const [count, setCount] = useState(0);
    const awards = () => {
        navigate('/awards-certificates');
    }

    const [errors, setError] = useState({
        compname: '',
        areaexp: '',
        desg: '',
        startMonth: '',
        startYear: '',
        countError: '',
    });

    const [endMonth, setEndMonth] = useState(0);
    const [endYear, setEndYear] = useState(0);

    const [company, setCompany] = useState<ICompanyDetails>({
        companies: [] as IUser[],
        errorMsg: ''
    })

    const [details, setDetails] = useState<IprofessionalDetails>({
        professionalDetails: [] as IUser[]
    })


    useEffect(() => {
        setCompany({ ...company })
        OnboardingService.getCompaniesList()
            .then(res => {
                setCompany({
                    ...company, companies: res.data.data
                })
            })
            .catch(err => setCompany({
                ...company, errorMsg: err.message
            }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { companies, errorMsg } = company;

    const [role, setRole] = useState<IDesignationDetails>({
        roles: [] as IUser[],
        errorMessage: ''
    })

    useEffect(() => {
        setRole({ ...role })
        OnboardingService.getDesignationList()
            .then(res => {
                setRole({
                    ...role, roles: res.data.data
                })
            })
            .catch(err => setRole({
                ...role, errorMessage: err.message
            }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { roles, errorMessage } = role;

    const [area, setArea] = useState<IAreaExpert>({
        areas: [] as IUser[],
        errorMsgs: ''
    })

    useEffect(() => {
        setArea({ ...area })
        OnboardingService.getarea_ExpertList()
            .then(res => {
                setArea({
                    ...area, areas: res.data.data
                })
            })
            .catch(err => setArea({
                ...area, errorMsgs: err.message
            }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { areas, errorMsgs } = area;

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




    const Validation = (compname: string, areaexp: string, desg: string, startMonth: number, startYear: number) => {
        let errors = {
            compname: '',
            areaexp: '',
            desg: '',
            startMonth: '',
            startYear: '',
            countError: '',
        }
        if (!compname) {
            toast.error("Comapny Name Required")
        }
        else if (!desg) {
            toast.error("Designation Required")
        }
        else if (!areaexp) {
            toast.error("Area of Expertise Required")
        }
        else if (!startMonth) {
            toast.error("Please select Start Month")
        }
        else if (!startYear) {
            toast.error("Please select Start Year")
        }

        return errors;
    }

    function EditDetails(data: IUser) {
        professionId = data._id;
        btnName = "Update Profession";
        setShow(!Show);
        setCompname({
            name: data.company_name,
        });
        setDesg({
            name: data.designation,
        });
        setAreaexp({
            name: data.area_expert,
        });
        setCompId(data.comp_id);
        setAreaexpId(data.area_exp_id);
        setDesgId(data.design_id);
        setAchieve(data.achievements);

        setDesc(data.Descr);
        if (data.end_date) {
            let endmonth = dateFormat(data.end_date, "mm");
            let endyear = dateFormat(data.end_date, "yyyy");
            setEndMonth(+endmonth)
            setEndYear(+endyear)
        }
        if (data.start_date) {
            let startmonth = dateFormat(data.start_date, "mm");
            let startyear = dateFormat(data.start_date, "yyyy");
            setStartMonth(+startmonth)
            setStartYear(+startyear)
        }
        setCount(data.Descr.length)
    }

    useEffect(() => {
        getProfileData();
    }, [])

    function getProfileData() {
        let profileId = localStorage.getItem('profileId');
        if (profileId) {
            OnboardingService.getProfileData(profileId)
                .then(res => {
                    if (res.data.data.profession_details.data.length) {
                        setShow(true);
                        if (res.data.data.profession_details.data.length) {
                            setShow(true);
                            Id = res.data.data._id;
                            setDetails({
                                ...details, professionalDetails: res.data.data.profession_details.data
                            })
                            nextFlag = true
                        } else {
                            setShow(false);
                            nextFlag = false
                        }
                    }
                    else {
                        setShow(false);
                        nextFlag = false
                    }
                })
                .catch(err => {
                    toast.error(err.message);
                });
        }

    }

    const { professionalDetails } = details;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (compname) {

            companyname = compname.name
        }
        if (desg) {

            desgname = desg.name
        }
        if (areaexp) {

            areaexpname = areaexp.name
        }

        setError(Validation(companyname, desgname, areaexpname, startMonth, startYear));
        if (compname && desg && areaexp && startMonth && startYear) {
            if (btnName == 'Add Profession') {
                let profileId: string | null = localStorage.getItem('profileId');
                let profileSection = 'profession_details';
                const body = {
                    "profession_details": {
                        "data": [
                            {
                                "comp_id": compId,
                                "company_name": compname.name,
                                "design_id": desgId,
                                "designation": desg.name,
                                "area_exp_id": areaexpId,
                                "area_expert": areaexp.name,
                                "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                                "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                                "achievements": achieve,
                                "Descr": desc
                            }
                        ]
                    }
                }
                OnboardingService.updateUserprofile(profileId, profileSection, body)
                    .then(res => {
                        if (res.data.status == 200) {
                            toast.success('Saved Successfully');
                            getProfileData();
                            setShow(!Show)
                        } else {
                            toast.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        toast.error(err.response.data.message);
                    });
            } else {
                const body = {
                    "profession_id": professionId,
                    "_id": Id,
                    "comp_id": compId,
                    "company_name": compname.name,
                    "design_id": desgId,
                    "designation": desg.name,
                    "area_exp_id": areaexpId,
                    "area_expert": areaexp.name,
                    "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                    "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                    "achievements": achieve,
                    "Descr": desc
                }
                OnboardingService.updateProfessionalDetails(body)
                    .then(res => {
                        if (res.data.message == 'Update Success') {
                            toast.success('Updated Successfully');
                            getProfileData();
                            setShow(!Show);
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

    function reset() {
        btnName = "Add Profession";
        setCompname({
            name: '',
        });
        setDesg({
            name: '',
        });
        setAreaexp({
            name: '',
        });
        setDesc('');
        setAchieve('');
        setStartMonth(0);
        setEndMonth(0);
        setEndYear(0);
        setStartYear(0);
    }

    function NextStep() {
        if (Show == true) {
            const data = { name: "/awards-certificates", coins: "20" };
            navigate("/congratulation", { state: data });
        } else {
            if (compname) {

                companyname = compname.name
            }
            if (desg) {

                desgname = desg.name
            }
            if (areaexp) {

                areaexpname = areaexp.name
            }
            setError(Validation(companyname, desgname, areaexpname, startMonth, startYear));
            if (compname && desg && areaexp && startMonth && startYear) {
                if (btnName == 'Add Profession') {
                    let profileId: string | null = localStorage.getItem('profileId');
                    let profileSection = 'profession_details';
                    const body = {
                        "profession_details": {
                            "data": [
                                {
                                    "comp_id": compId,
                                    "company_name": compname.name,
                                    "design_id": desgId,
                                    "designation": desg.name,
                                    "area_exp_id": areaexpId,
                                    "area_expert": areaexp.name,
                                    "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                                    "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                                    "achievements": achieve,
                                    "Descr": desc
                                }
                            ]
                        }
                    }
                    OnboardingService.updateUserprofile(profileId, profileSection, body)
                        .then(res => {
                            if (res.data.status == 200) {
                                toast.success('Saved Successfully');
                                const data = { name: "/awards-certificates", coins: "20" };
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
                        "profession_id": professionId,
                        "_id": Id,
                        "comp_id": compId,
                        "company_name": compname.name,
                        "design_id": desgId,
                        "designation": desg.name,
                        "area_exp_id": areaexpId,
                        "area_expert": areaexp.name,
                        "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                        "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                        "achievements": achieve,
                        "Descr": desc
                    }
                    OnboardingService.updateProfessionalDetails(body)
                        .then(res => {
                            if (res.data.message == 'Update Success') {
                                toast.success('Updated Successfully');
                                const data = { name: "/awards-certificates", coins: "20" };
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

    const remove = (data: IUser) => {
        let dataId = Id;
        OnboardingService.deleteProfessionalDetails(data._id, dataId)
            .then(res => {
                if (res.data.message == "Delete Success") {
                    btnName = "Add Profession";
                    toast.success('Deleted Successfully');
                    reset();
                    let profileId = localStorage.getItem('profileId');
                    OnboardingService.getProfileData(profileId)
                        .then(res => {
                            if (res.data.data.profession_details.data.length) {
                                setShow(true);
                                if (res.data.data.profession_details.data.length) {
                                    setShow(true);
                                    Id = res.data.data._id;
                                    setDetails({
                                        ...details, professionalDetails: res.data.data.profession_details.data
                                    })
                                } else {
                                    setShow(false);
                                }
                            }
                            else {
                                setShow(false);
                            }
                        })
                        .catch(err => {
                            toast.error(err.message);
                        });
                } else {
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    }

    function Previous() {
        navigate('/educational-details');
    }

    function AddMore(e: React.MouseEvent<HTMLButtonElement>) {
        reset();
        setShow(!Show)
    }

    interface FilmOptionType {
        inputValue?: string;
        name: string;
        year?: number;
    }

    const [compname, setCompname] = React.useState<FilmOptionType | null>(null);
    const [desg, setDesg] = React.useState<FilmOptionType | null>(null);
    const [areaexp, setAreaexp] = React.useState<FilmOptionType | null>(null);

    const filter = createFilterOptions<FilmOptionType>();

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
                                    <Typography color="#62676C">Professional Details</Typography>
                                </Breadcrumbs>
                            </div>

                            <div className="inner-page-content">

                                <div className="">
                                    <AppButton children="Skip this step" onClick={awards} styleClass='btn skip-this-btn' />
                                </div>


                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">Professional Details</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        <h4 className="primary-color m-0">STEP 06/08</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="page-forms">

                                    {!Show && <form id="professionData" noValidate >

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Company name<sup>*</sup></label>

                                            <Autocomplete
                                                value={compname}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setCompname({
                                                            name: newValue,
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        // Create a new value from the user input
                                                        setCompname({
                                                            name: newValue.inputValue,
                                                        });
                                                    } else {
                                                        setCompname(newValue);
                                                    }
                                                    if (newValue) {
                                                        companies.filter(data =>
                                                            data.name == newValue.name).filter(filteredNames => {
                                                                let compId = filteredNames._id;
                                                                setCompId(compId);
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
                                                    // Suggest the creation of a new value
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
                                                options={companies}
                                                getOptionLabel={(option: any) => {
                                                    // Value selected with enter, right from the input
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    // Add "xxx" option created dynamically
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    // Regular option
                                                    return option.name;
                                                }}
                                                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        placeholder="Select Company Name"
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Designation<sup>*</sup></label>
                                            <Autocomplete
                                                value={desg}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setDesg({
                                                            name: newValue,
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        // Create a new value from the user input
                                                        setDesg({
                                                            name: newValue.inputValue,
                                                        });
                                                    } else {
                                                        setDesg(newValue);
                                                    }
                                                    if (newValue) {
                                                        roles.filter(data =>
                                                            data.name == newValue.name).filter(filteredNames => {
                                                                let desgId = filteredNames._id;
                                                                setDesgId(desgId);
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
                                                    // Suggest the creation of a new value
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
                                                options={roles}
                                                getOptionLabel={(option: any) => {
                                                    // Value selected with enter, right from the input
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    // Add "xxx" option created dynamically
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    // Regular option
                                                    return option.name;
                                                }}
                                                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        placeholder="Select Designation"
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Area of Expertise<sup>*</sup></label>
                                            <Autocomplete
                                                value={areaexp}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setAreaexp({
                                                            name: newValue,
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        // Create a new value from the user input
                                                        setAreaexp({
                                                            name: newValue.inputValue,
                                                        });
                                                    } else {
                                                        setAreaexp(newValue);
                                                    }
                                                    if (newValue) {
                                                        areas.filter(data =>
                                                            data.name == newValue.name).filter(filteredNames => {
                                                                let areaexpId = filteredNames._id;
                                                                setAreaexpId(areaexpId);
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
                                                    // Suggest the creation of a new value
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
                                                options={areas}
                                                getOptionLabel={(option: any) => {
                                                    // Value selected with enter, right from the input
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    // Add "xxx" option created dynamically
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    // Regular option
                                                    return option.name;
                                                }}
                                                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        placeholder="Select Area of Expertise"
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="form-group">

                                            <label htmlFor="exampleFormControlSelect1">Start Date <sup>*</sup></label>

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
                                            <div className="clearfix"></div>
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
                                            <div className="clearfix"></div>
                                        </div>

                                        <div className="form-group">
                                            <AppInput name="achieve" value={achieve} id="achieve" onChange={(e: any) => setAchieve(e.target.value)} label="Achievements" radius="5px"
                                                placeholder="Ex: Topper in maths / Achieved gold medal etc." />
                                        </div>

                                        <div className="form-group">
                                            <AppTextarea name="desc" value={desc} id="desc"
                                                onChange={(e: any) => {
                                                    setDesc(e.target.value);
                                                    setCount(e.target.value.length)
                                                    if (e.target.value.length > 100) {
                                                        nextFlag = false
                                                    } else {
                                                        nextFlag = true
                                                    }
                                                }}
                                                label="Tell us something about your work." radius="5px"
                                                placeholder="Max 100 Characters" />
                                            {(count > 100 || errors.countError) ? <p style={{ color: 'red' }}>Description should not Exceed 100 characters</p> : ''}
                                            <div className='text-area-count text-right'>{count} /100</div>
                                        </div>

                                        <AppButton onClick={handleSubmit} disabled={!nextFlag} children={btnName} styleClass='btn save-btn w-100' />
                                        <div className="button-center text-center mt-3">
                                            <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn mr-2' />
                                            <AppButton onClick={reset} children="Clear" styleClass='btn clear-btn mr-2' />
                                            <AppButton onClick={NextStep} disabled={!nextFlag} children="Next Step" styleClass='btn save-btn' />
                                        </div>

                                    </form>}
                                </div>

                                {Show && <div className="secondPage">
                                    {professionalDetails.length ? professionalDetails.map((data: IUser) =>
                                        <div className="details-grid">
                                            <div className="card-left">
                                                <div className="show-details-left">
                                                    <div className="show-details-left-img">
                                                        <img src={`${assetUrl}/details-img.png`} alt="" />
                                                    </div>
                                                    <div className="show-details-left-con">
                                                        <h4>{data.designation}</h4>
                                                        <p className="m-0">{data.company_name}
                                                            <br />
                                                            {data.start_date ? dateFormat(`${data.start_date}`, "mmm") : ''}     {data.start_date ? dateFormat(`${data.start_date}`, "yyyy") : ''} -
                                                            {data.end_date ? dateFormat(`${data.end_date}`, "mmm") : ''}    {data.end_date ? dateFormat(`${data.end_date}`, "yyyy") : ''} <br />
                                                            <br />
                                                            Hyderabad, Telangana, India.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-right">
                                                <div className="show-details-left text-right">
                                                    <button type="button" className="btn primary-bg border-r  mr-1" onClick={() => EditDetails(data)}>
                                                        <img src={`${assetUrl}/edit.svg`} alt="edit" />
                                                    </button>
                                                    <button type="button" className="btn bg-light border-r" onClick={() => remove(data)}>
                                                        <img src={`${assetUrl}/delete_red.svg`} alt="" />
                                                    </button>
                                                    <p className="mt-2">6Yrs present</p>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    ) : <div>  </div>}
                                    <div className="add-btn mt-3 mb-3">
                                        <button type="button" className="btn add-more-btn w-100" onClick={AddMore}>
                                            <img src={`${assetUrl}/add_circle.svg`} alt="Add More" />
                                            &nbsp;&nbsp;Add more proffesional details
                                        </button>
                                    </div>
                                    <div className="button-center text-center mt-3">
                                        <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn mr-2' />
                                        <AppButton onClick={NextStep} children="Next Step" disabled={!nextFlag} styleClass='btn save-btn' />
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
export default Professional;