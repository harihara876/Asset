import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './sidebar';
import TextField from '@mui/material/TextField';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AppInput from "vridhee_common_component_mf/AppInput";
import AppButton from "vridhee_common_component_mf/AppButton";
import AppTextarea from "vridhee_common_component_mf/AppTextarea"
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';
import 'react-toastify/dist/ReactToastify.css';
import IUser from '../Models/IUser';
import IAwards from '../Models/IUser'
import { OnboardingService } from '../Services/onboardingService';
import Dropdown from "vridhee_common_component_mf/Dropdown";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import configJson from "vridhee_common_component_mf/configJson";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Viewer } from '@react-pdf-viewer/core';

//Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker } from '@react-pdf-viewer/core';
import Tooltip from '@mui/material/Tooltip';

const drawerWidth = 300;


let Id: string;
let awardId: string;
let btnName: string = "Add Certification";
let fileData: any;
let imagePath: string
let imageVal: any
let universityname: string
let certificationname: string
let PdfFlag: boolean = false;
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

interface ICertificateDetails {
    certificates: IUser[],
    errorMsg: string
}

interface IAwardsDetails {
    awardsDetails: IUser[]
}

interface IUniversityDetails {
    universities: IUser[],
    errorMsgg: string
}

function Awards() {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const assetUrl = configJson.local.assetUrl;
    const [Show, setShow] = useState(false);
    const navigate = useNavigate();
    const [pdffile, setPdfFile] = useState('');
    const [image, setImage] = useState('');
    const [certname, setCertName] = React.useState<FilmOptionType | null>(null);
    const [uname, setUname] = React.useState<FilmOptionType | null>(null);
    const [certid, setCertid] = useState('');
    const [certurl, setCerturl] = useState('');
    const [startMonth, setStartMonth] = useState(0);
    const [startYear, setStartYear] = useState(0);
    const [PdfFilePath, setPdfFilePath] = useState<string | null>('');
    const [endMonth, setEndMonth] = useState(0);
    const [endYear, setEndYear] = useState(0);

    const [file, setFile] = useState('')
    const [errors, setError] = useState({
        certname: '',
        uname: '',
        certid: '',
        certurl: '',
        startMonth: '',
        startYear: '',

    });

    interface FilmOptionType {
        inputValue?: string;
        name: string;
        year?: number;
    }

    const filter = createFilterOptions<FilmOptionType>();

    const [certificate, setCertificate] = useState<ICertificateDetails>({
        certificates: [] as IUser[],
        errorMsg: ''
    })

    const [details, setDetails] = useState<IAwardsDetails>({
        awardsDetails: [] as IUser[]
    })

    useEffect(() => {
        setCertificate({ ...certificate })
        OnboardingService.getCertficationList()
            .then(res => {
                setCertificate({
                    ...certificate, certificates: res.data.data
                })
            })
            .catch(err => setCertificate({
                ...certificate, errorMsg: err.message
            }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { certificates, errorMsg } = certificate;

    const [university, setUniversity] = useState<IUniversityDetails>({
        universities: [] as IUser[],
        errorMsgg: ''
    })



    useEffect(() => {
        getProfileData();
    }, [])

    const { awardsDetails } = details;

    function getProfileData() {
        let profileId = localStorage.getItem('profileId');
        if (profileId) {
            OnboardingService.getProfileData(profileId)
                .then(res => {
                    Id = res.data.data._id;
                    let result = res.data.data.awards_certificates.data;
                    if (res.data.data.awards_certificates.data.length) {
                        setShow(true);
                        setDetails({
                            ...details, awardsDetails: res.data.data.awards_certificates.data
                        })
                        nextFlag = true
                    } else {
                        setShow(false)
                        nextFlag = false
                    }

                })
                .catch(err => {
                    toast.error(err.message);
                });
        }

    }

    useEffect(() => {
        setUniversity({ ...university })
        OnboardingService.getUniversityList()
            .then(res => {
                setUniversity({
                    ...university, universities: res.data.data
                })
            })
            .catch(err => setUniversity({
                ...university, errorMsgg: err.message
            }));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { universities, errorMsgg } = university;

    const network = () => {
        navigate('/network');
    }

    const remove = (data: IUser) => {
        let dataId = Id;
        let profileId = localStorage.getItem('profileId');
        OnboardingService.deleteAwardDetails(data._id, dataId)
            .then(res => {
                if (res.data.message == "Delete Success") {
                    btnName = "Add Certification";
                    toast.success('Deleted Successfully');
                    OnboardingService.getProfileData(profileId)
                        .then(res => {
                            Id = res.data.data._id;
                            if (res.data.data.awards_certificates.data.length) {
                                setShow(true);
                                setDetails({
                                    ...details, awardsDetails: res.data.data.awards_certificates.data
                                })
                            } else {
                                setShow(false)
                            }
                        })
                        .catch(err => {
                            toast.error(err.message);
                        });
                    reset();
                } else {
                    setShow(false);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    }

    const handleSubmit = () => {
        if (certname) {

            certificationname = certname.name
        }
        if (uname) {

            universityname = uname.name
        }
        setError(AwardsValidation(certificationname, universityname, certid, certurl, startMonth, startYear));
        let profileId: string | null = localStorage.getItem('profileId');
        if (btnName == 'Add Certification') {
            let profileSection = 'awards_certificates';
            const obj = {
                "cert_name": certificationname,
                "univ_name": universityname,
                "cert_no": certid,
                "cert_url": certurl,
                "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
            }

            const formData = new FormData();
            if (file) {
                formData.append("image", file);
            } else {
                formData.append("image", fileData);
            }
            formData.append("data", JSON.stringify(obj))
            if (certificationname && universityname && certid && (certurl || file) && startMonth && startYear) {
                OnboardingService.awardsUpdateUserprofile(profileId, profileSection, formData)
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
            }
        } else {
            const body = {
                "awards_id": awardId,
                "_id": Id,
                "cert_name": certificationname,
                "univ_name": universityname,
                "cert_no": certid,
                "cert_url": certurl,
                "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString()
            }
            const formData = new FormData();
            if (file) {
                formData.append("image", file);
            } else {
                formData.append("image", fileData);
            }
            formData.append("data", JSON.stringify(body))
            if (certificationname && universityname && certid && (certurl || imagePath) && startMonth && startYear) {
                OnboardingService.updateAwardDetails(formData)
                    .then(res => {
                        if (res.data.message == 'Update Success') {
                            toast.success('Updated Successfully');
                            getProfileData();
                            setShow(!Show)
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
            if (endYear < +target.value) {
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

    function reset() {
        setPdfFilePath('')
        btnName = "Add Certification";
        setCertName({
            name: '',
        });
        setUname({
            name: '',
        });
        setCertid('');
        setCerturl('');
        setStartMonth(0);
        setEndMonth(0);
        setEndYear(0);
        setStartYear(0);
        setFile('')
        setImage('')

    }


    const AwardsValidation = (certname: string, uname: string, certid: string, certurl: string, startMonth: number, startYear: number) => {

        if (btnName == "Add Certification") {
            imageVal = file;

        } else {
            imageVal = imagePath;
        }

        let errors = {
            certname: '',
            uname: '',
            certid: '',
            certurl: '',
            startMonth: '',
            startYear: '',
        }
        if (!certname) {
            toast.error("Certification Name Required")
        }
        else if (!uname) {
            toast.error("University Name Required")
        }
        else if (!certid) {
            toast.error("Certification Id Required")
        }
        else if (!certurl && !imageVal) {
            toast.error("Certification URL  or Upload Certificate Required")
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
        navigate('/professional-details');
    }

    function AddMore(e: React.MouseEvent<HTMLButtonElement>) {
        reset();
        setShow(!Show)
    }

    function NextStep() {
        if (Show == true) {
            const data = { name: "/network", coins: "20" };
            navigate("/congratulation", { state: data });
        } else {
            if (certname) {

                certificationname = certname.name
            }
            if (uname) {
                universityname = uname.name
            }
            setError(AwardsValidation(certificationname, universityname, certid, certurl, startMonth, startYear));

            let profileId: string | null = localStorage.getItem('profileId');
            if (btnName == 'Add Certification') {
                let profileSection = 'awards_certificates';
                const obj = {
                    "cert_name": certificationname,
                    "univ_name": universityname,
                    "cert_no": certid,
                    "cert_url": certurl,
                    "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                    "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                }

                const formData = new FormData();
                formData.append("image", file);
                formData.append("data", JSON.stringify(obj))
                if (certificationname && universityname && certid && (certurl || file) && startMonth && startYear) {
                    OnboardingService.awardsUpdateUserprofile(profileId, profileSection, formData)
                        .then(res => {
                            if (res.data.status == 200) {
                                toast.success('Saved Successfully');
                                const data = { name: "/network", coins: "20" };
                                navigate("/congratulation", { state: data });
                            } else {
                                toast.error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            toast.error(err.response.data.message);
                        });
                }
            } else {
                const body = {
                    "awards_id": awardId,
                    "_id": Id,
                    "cert_name": certificationname,
                    "univ_name": universityname,
                    "cert_no": certid,
                    "cert_url": certurl,
                    "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                    "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString()
                }
                const formData = new FormData();
                if (file) {
                    formData.append("image", file);
                } else {
                    formData.append("image", fileData);
                }
                formData.append("data", JSON.stringify(body))
                if (certificationname && universityname && certid && (certurl || imagePath) && startMonth && startYear) {
                    OnboardingService.updateAwardDetails(formData)
                        .then(res => {
                            if (res.data.message == 'Update Success') {
                                toast.success('Updated Successfully');
                                const data = { name: "/network", coins: "20" };
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
            // }
        }
    }

    const handleImageUpload = (e: any) => {
        setPdfFilePath('')
        const data = e.target.files[0]
        fileData = e.target.files[0]
        if (data.name.includes('pdf')) {
            setPdfFile(data.name);
            setPdfFilePath(data.name)
            PdfFlag = true;
        } else {
            PdfFlag = false;
            setPdfFile('');
            setPdfFilePath('')
        }
        if (!data.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            toast.error('Please select .jpg or .jpeg or .png image only');
        } else {
            setFile(data)
        }
        e.target.value = ''
    }

    function EditDetails(data: IAwards) {
        setPdfFilePath('')
        awardId = data._id;
        btnName = "Update Certification";
        if (!data.cert_img.includes('pdf')) {
            setImage("https://v3c.s3.ap-south-1.amazonaws.com" + data.cert_img);
        } else {
            setImage('')
            setPdfFilePath("https://v3c.s3.ap-south-1.amazonaws.com" + data.cert_img)
        }

        imagePath = data.cert_img;
        setShow(!Show);
        setCertName({
            name: data.cert_name,
        });
        setUname({
            name: data.univ_name,
        });
        setCertid(data.cert_no);
        setCerturl(data.cert_url);
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
                                    <Typography color="#62676C">Awards & Certifications</Typography>
                                </Breadcrumbs>
                            </div>

                            <div className="inner-page-content">

                                <div className="">
                                    <AppButton children="Skip this step" onClick={network} styleClass='btn skip-this-btn' />
                                </div>

                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">Awards & Certificates</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        <h4 className="primary-color m-0">STEP 07/08</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="page-forms">

                                    {!Show && <form id="awardsData" noValidate >

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Certification name<sup>*</sup></label>
                                            <Autocomplete
                                                value={certname}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setCertName({
                                                            name: newValue,
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        // Create a new value from the user input
                                                        setCertName({
                                                            name: newValue.inputValue,
                                                        });
                                                    } else {
                                                        setCertName(newValue);
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
                                                options={certificates}
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
                                                //   sx={{ width: 300 }}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        placeholder="Select Company Name"
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">University name<sup>*</sup></label>
                                            <Autocomplete
                                                value={uname}
                                                onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setUname({
                                                            name: newValue,
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        // Create a new value from the user input
                                                        setUname({
                                                            name: newValue.inputValue,
                                                        });
                                                    } else {
                                                        setUname(newValue);
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
                                                options={universities}
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
                                                //   sx={{ width: 300 }}
                                                freeSolo
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        // label="Free solo with text demo"
                                                        placeholder="Select University Name"
                                                    />
                                                )}
                                            />

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Certification ID <sup>*</sup></label>
                                            <AppInput type="tel" name="certid" id="certid" value={certid} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                if (e.target.value.length) {
                                                    nextFlag = true
                                                } else {
                                                    nextFlag = false
                                                }
                                                setCertid(e.target.value)
                                            }} placeholder="Ex:123JD2023" radius="5px" />
                                            {!certid && errors.certid != '' ? <p style={{ color: 'red' }}>{errors.certid}</p> : ''}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Upload Certificate or Paste URL<sup>*</sup></label>

                                            <div>


                                                <div className="upload-btn">
                                                    <input type="file" onChange={handleImageUpload} />
                                                    <div className="button mb-2">
                                                        <p className="m-0"><i className="fa fa-upload" aria-hidden="true"></i>&nbsp;Upload Certificate</p>
                                                    </div>

                                                </div>


                                                {file && btnName == "Add Certification" ?
                                                    <div>
                                                        {PdfFlag ?
                                                            <span >{PdfFilePath}</span>

                                                            :
                                                            <img src={URL.createObjectURL(file)} alt="1" className='profileImage' />}
                                                    </div>
                                                    : <div>
                                                        {file && btnName == "Update Certification" ?
                                                            <div>
                                                                {PdfFilePath && !PdfFilePath.includes('curriculum_onboarding_ms') ?

                                                                    <span >{PdfFilePath}</span>
                                                                    :
                                                                    <div>
                                                                        {
                                                                            PdfFilePath ?
                                                                                <a href={PdfFilePath} target="_blank" rel="noopener noreferrer">

                                                                                    <Tooltip title="View">
                                                                                        <VisibilityIcon style={{ color: "black", marginLeft: '30px' }} />
                                                                                    </Tooltip>
                                                                                </a>
                                                                                :
                                                                                <div>
                                                                                    {file && !image ? <img src={URL.createObjectURL(file)} alt="11" className='profileImage' /> :

                                                                                        <a href={image} target="_blank" rel="noopener noreferrer">
                                                                                            <Tooltip title="View">
                                                                                                <VisibilityIcon style={{ color: "black", marginLeft: '30px' }} />
                                                                                            </Tooltip>
                                                                                        </a>
                                                                                    }
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                            : <div >
                                                                {PdfFilePath && !image ?
                                                                    <a href={PdfFilePath} target="_blank" rel="noopener noreferrer">
                                                                        <Tooltip title="View">
                                                                            <VisibilityIcon style={{ color: "black", marginLeft: '30px' }} />
                                                                        </Tooltip>
                                                                    </a>
                                                                    :
                                                                    <div>
                                                                        {image && <a href={image} target="_blank" rel="noopener noreferrer">
                                                                            <Tooltip title="View">
                                                                                <VisibilityIcon style={{ color: "black", marginLeft: '30px' }} />
                                                                            </Tooltip>
                                                                        </a>}
                                                                    </div>
                                                                }
                                                            </div>}
                                                    </div>}



                                            </div>

                                            <div>
                                                <AppInput type="url" name="certurl" id="certurl" value={certurl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    if (e.target.value.length) {
                                                        nextFlag = true
                                                    } else {
                                                        nextFlag = false
                                                    }
                                                    setCerturl(e.target.value)
                                                }} placeholder="Paste Certification URL" radius="5px" />
                                                {!certurl && errors.certurl != '' ? <p style={{ color: 'red' }}>{errors.certurl}</p> : ''}
                                            </div>
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
                                            <div className="clearfix"></div>
                                        </div>

                                        <AppButton onClick={handleSubmit} children={btnName} disabled={!nextFlag} styleClass='btn save-btn w-100 mb-2' />

                                        <div className="button-center text-center">
                                            <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn mr-2' />
                                            <AppButton onClick={reset} children="Clear" styleClass='btn clear-btn mr-2' />
                                            <AppButton onClick={NextStep} children="Next Step" disabled={!nextFlag} styleClass='btn save-btn' />
                                        </div>

                                    </form>}
                                </div>


                                {Show && <div className="secondPage">
                                    {awardsDetails.length ? awardsDetails.map((data: IAwards, index: number) =>
                                        <div className="details-grid">
                                            <div className="card-left">
                                                <div className="show-details-left">
                                                    <div className="show-details-left-img">
                                                        <img src={`${assetUrl}/details-img.png`} alt="" />
                                                    </div>
                                                    <div className="show-details-left-con">
                                                        <h4>{data.cert_name}</h4>
                                                        <p className="m-0">{data.univ_name}
                                                            <br />
                                                            {data.start_date ? dateFormat(`${data.start_date}`, "mmm") : ''}     {data.start_date ? dateFormat(`${data.start_date}`, "yyyy") : ''} -
                                                            {data.end_date ? dateFormat(`${data.end_date}`, "mmm") : ''}    {data.end_date ? dateFormat(`${data.end_date}`, "yyyy") : ''} <br />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-right">
                                                <div className="show-details-left text-right">
                                                    <button type="button" className="btn primary-bg border-r mr-1" onClick={() => EditDetails(data)}>
                                                        <img src={`${assetUrl}/edit.svg`} alt="edit" />
                                                    </button>
                                                    <button type="button" className="btn bg-light border-r" onClick={() => remove(data)} >
                                                        <img src={`${assetUrl}/delete_red.svg`} alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='clearfix'></div>
                                        </div>
                                    ) : <div>  </div>}


                                    <div className="add-btn mt-3 form-group">
                                        <button type="button" className="btn add-more-btn w-100" onClick={AddMore}>
                                            <img src={`${assetUrl}/add_circle.svg`} alt="Add More" />
                                            &nbsp;&nbsp;Add more certifications
                                        </button>
                                    </div>

                                    <div className="button-center text-center">
                                        <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn mr-2' />
                                        <AppButton onClick={NextStep} children="Next Step" styleClass='btn save-btn' />
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

export default Awards;