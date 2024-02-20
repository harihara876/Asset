import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './sidebar';
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

import configJson from "vridhee_common_component_mf/configJson";


const drawerWidth = 300;

let Id: string;
let awardId: string;
let btnName: string = "Add Certification";
let fileData: any;
let image:any

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
    { value: 2023, name: 2023 },
    { value: 2024, name: 2024 },
    { value: 2025, name: 2025 },
    { value: 2026, name: 2026 },
    { value: 2027, name: 2027 },
    { value: 2028, name: 2028 },
    { value: 2029, name: 2029 },
    { value: 2030, name: 2030 },
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
    const assetUrl = configJson.local.assetUrl;
    const [Show, setShow] = useState(true);
    const navigate = useNavigate();
    const [certname, setCertName] = useState('');
    const [uname, setUname] = useState('');
    const [certid, setCertid] = useState('');
    const [certurl, setCerturl] = useState('');
    const [startMonth, setStartMonth] = useState(0);
    const [startYear, setStartYear] = useState(0);
    const data = { name: "/network", coins: "20" };
    const [endMonth, setEndMonth] = useState(0);
    const [endYear, setEndYear] = useState(0);

    const [file, setFile] = useState('')

    const [errors, setError] = useState({
        certname: '',
        uname: '',
        certid: '',
        certurl: '',

    });

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
                    // toast.error(res.data.msg);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
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
                                // toast.error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            toast.error(err.message);
                        });
                        reset();
                } else {
                    // toast.error(res.data.msg);
                    setShow(false);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    }

    const handleSubmit = () => {
        setError(AwardsValidation(certname, uname, certid, certurl));

        // e.preventDefault();
        let profileId: string | null = localStorage.getItem('profileId');
        if (btnName == 'Add Certification') {
            let profileSection = 'awards_certificates';
            const obj = {
                "cert_name": certname,
                "univ_name": uname,
                "cert_no": certid,
                "cert_url": certurl,
                "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
            }

            const formData = new FormData();
            formData.append("image", file);
            formData.append("data", JSON.stringify(obj))
            console.log(formData,"formData")

            // let awardsData = [];
            // awardsData.push(formData);

            // const body = {
            //     "awards_certificates": {
            //         "data": formData
            //     }
            // }
            // console.log(formData,"formData")
            // console.log(body,"body")
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
                    toast.error(err.message);
                });
        } else {
            const body = {
                "awards_id": awardId,
                "_id": Id,
                "cert_name": certname,
                "univ_name": uname,
                "cert_no": certid,
                "cert_url": certurl,
                "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString()
            }
            const formData = new FormData();
            formData.append("image", file);
            formData.append("data", JSON.stringify(body))
            console.log(formData,"formData")
            OnboardingService.updateAwardDetails(formData)
                .then(res => {
                    console.log(res.data,"0000000")
                    if (res.data.message == 'Update Success') {
                        toast.success('Updated Successfully');
                        getProfileData();
                        setShow(!Show)
                    } else {
                        toast.error(res.data.msg);
                    }
                })
                .catch(err => {
                    toast.error(err.message);
                });
        }

    }

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

    function reset() {
        btnName = "Add Certification";
        setCertName('');
        setCertid('');
        setUname('');
        setCerturl('');
        setStartMonth(0);
        setEndMonth(0);
        setEndYear(0);
        setStartYear(0);
        setFile('')
        image=''
    }


    const AwardsValidation = (certname: string, uname: string, certid: string, certurl: string) => {
        let errors = {
            certname: '',
            uname: '',
            certid: '',
            certurl: ''
        }
        if (!certname) {
            errors.certname = "Certification Name Required";
        }
        if (!uname) {
            errors.uname = "University Name Required";
        }
        if (!certid) {
            errors.certid = "Certification Id Required";
        }
        if (!certurl) {
            errors.certurl = "Certification URL Required";
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
        navigate("/congratulation", { state: data });
    }

    const handleImageUpload = (e: any) => {
        const data = e.target.files[0]
        setFile(data)
        fileData = e.target.files[0]
        console.log(data, "data")
      }

    function EditDetails(data: IAwards) {
        console.log(data)
        awardId = data._id;
        btnName = "Update Certification";
        image= "https://v3c.s3.ap-south-1.amazonaws.com" + data.cert_img;
        setShow(!Show);
        setCertName(data.cert_name);
        setUname(data.univ_name);
        setCertid(data.cert_no);
        setCerturl(data.cert_url);
        // setFile(image)
        let endmonth = dateFormat(data.end_date, "mm");
        let endyear = dateFormat(data.end_date, "yyyy");
        let startmonth = dateFormat(data.start_date, "mm");
        let startyear = dateFormat(data.start_date, "yyyy");
        setStartMonth(+startmonth)
        setStartYear(+startyear)
        setEndMonth(+endmonth)
        setEndYear(+endyear)
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
                                        <h4 className="primary-color m-0">STEP 08/09</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="page-forms">

                                    {!Show && <form id="awardsData" noValidate >

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Certification name<sup>*</sup></label>


                                            <Dropdown placeholder='Ex:- Design Thinking'
                                                name="certname" value={certname} id="certname" options={certificates} title="Ex:- Design Thinking" selectStyle="w-100"
                                                handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCertName(e.target.value)}
                                                selectedValue={certname}
                                            />
                                            {errors.certname && <p style={{ color: 'red' }}>{errors.certname}</p>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">University name<sup>*</sup></label>
                                            <Dropdown
                                                name="uname" id="uname" options={universities} title="Ex:- Stanford University" selectStyle="w-100"
                                                value={uname} handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUname(e.target.value)} selectedValue={uname} />
                                            {errors.uname && <p style={{ color: 'red' }}>{errors.uname}</p>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Certification ID <sup>*</sup></label>
                                            <AppInput type="tel" name="certid" id="certid" value={certid} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCertid(e.target.value)} placeholder="Ex:123JD2023" radius="5px" />
                                            {errors.certid && <span style={{ color: 'red' }}>{errors.certid}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Upload Certificate or Paste URL<sup>*</sup></label>
                                            {/* <div className="fileupload">
                                                <input className='float-left' type="file" id="file-input" name="file-input" />
                                                <label id="file-input-label" htmlFor="file-input" >Upload Certificate</label>
                                                <span className="float-right"><i className="fa fa-paperclip" aria-hidden="true"></i></span>
                                            </div> */}
                                             <div>


<div className="upload-btn">
  <input type="file" onChange={handleImageUpload} />
  <div className="button mb-2">
   <p className="m-0"><i className="fa fa-upload" aria-hidden="true"></i>&nbsp;Upload Certificate</p>
  </div>
  
</div>
{/* {file &&

  <div>
    <img src={URL.createObjectURL(file)} className='profileImage' />
  </div> 
} */}

{file && btnName == "Add Certification" ? 
  <div>
    <img src={URL.createObjectURL(file)} className='profileImage' />
  </div>
                                : <div>  
{file && btnName == "Update Certification" ? 
                                <div>
                                  <img src={URL.createObjectURL(file)} className='profileImage' />
                                </div> :   <div>
                                  <img src={image} className='profileImage' />
                                </div>} 
                                </div> }

</div>

                                            <div>
                                                <AppInput type="url" name="certurl" id="certurl" value={certurl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCerturl(e.target.value)} placeholder="Paste Certification URL" radius="5px" />
                                                {errors.certurl && <p style={{ color: 'red' }}>{errors.certurl}</p>}
                                            </div>
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
                                                    options={year}
                                                    title="Year" selectStyle="w-100"
                                                    handleChange={startYearSelect}
                                                    selectedValue={startYear} />
                                            </div>
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

                                        <AppButton onClick={handleSubmit} children={btnName} disabled={!certname && !uname && !certid} styleClass='btn save-btn w-100 mb-2' />

                                        <div className="button-center text-center">
                                            <AppButton children="Previous" onClick={Previous} styleClass='btn prev-btn mr-2' />
                                            <AppButton onClick={reset} children="Clear" styleClass='btn clear-btn mr-2' />
                                            <AppButton onClick={NextStep} children="Next Step" styleClass='btn save-btn' />
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
                                                            {/* Executive PG */}
                                                            <br />
                                                            {dateFormat(`${data.start_date}`, "mmm")}    {dateFormat(`${data.start_date}`, "yyyy")}- {dateFormat(`${data.end_date}`, "mmm")}    {dateFormat(`${data.end_date}`, "yyyy")} <br />
                                                            {/* Online */}
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
                                        <Button variant="outlined" className="btn prev-btn mr-2" onClick={Previous}>Previous</Button>
                                        <Button variant="contained" className="btn clear-btn mr-2" onClick={reset}>Clear</Button>
                                        <Button variant="contained" className="btn save-btn" onClick={NextStep}>Next Step</Button>
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