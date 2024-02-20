import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import CustomSelect from "vridhee_common_component_mf/CustomSelect";
// import AddIcon from "../../../assets/img/add_circle.svg";
// import Edit from '../../../assets/img/edit.svg';
// import DeailsImg from '../../../assets/img/details-img.png';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
// import { OnboardingService } from '../../../services/onboarding-services';
// import IUser from '../../../models/IUser';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
// import Delete from '../../../assets/img/delete_red.svg'
import dateFormat from 'dateformat';
import AppInput from "vridhee_common_component_mf/AppInput";
import AppButton from "vridhee_common_component_mf/AppButton";
import AppTextarea from "vridhee_common_component_mf/AppTextarea"
import  Dropdown from "vridhee_common_component_mf/Dropdown"
import IUser from '../Models/IUser';
import { OnboardingService } from '../Services/onboardingService';
// import CustomSelect from './';

const drawerWidth = 300;

const options = [
    {value: 1, label: 1 },
    {value: 2, label: 2},
    {value: 3, label: 3 },
    {value: 4, label: 4},
    {value: 5, label: 5 },
    {value: 6, label: 6 },
    {value: 7, label: 7},
    {value: 8, label: 8}, 
    {value: 9, label: 9 },
    {value: 10, label: 10 },
    {value: 11, label: 11 },
    {value: 12, label: 12 },
  ];
  const year = [
    {value: 2023, label: 2023},
    {value: 2024, label: 2024},
    {value: 2025, label: 2025},
    {value: 2026, label: 2026},
    {value: 2027, label: 2027 },
    {value: 2028, label: 2028 },
    {value: 2029, label:2029},
    {value: 2030, label: 2030},
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

    const navigate = useNavigate();
    const [Show, setShow] = useState(true);
    const [compname, setCompname] = useState('');
    const [areaexp, setAreaexp] = useState('');
    const [desg, setDesg] = useState('');
    const [desc, setDesc] = useState('');
    const [achieve, setAchieve] = useState('');
    const [startMonth, setStartMonth] = useState(0);
    const [startYear, setStartYear] = useState(0);

    const awards = () => {
        navigate('/awards-certificates');
    }

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

    const data = { name: "/awards-certificates", coins: "20" };

    function EditDetails(data: IUser) {
        professionId = data._id;
        console.log(professionId, "professionId");
        btnName = "Update Profession";
        setShow(!Show);
        setCompname(data.company_name);
        setDesg(data.designation);
        setAchieve(data.achievements);
        setAreaexp(data.area_expert);
        setDesc(data.Descr);
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

    function getProfileData() {
        let profileId = localStorage.getItem('profileId');
        OnboardingService.getProfileData(profileId)
            .then(res => {
                if (res.data.data.profession_details.data.length) {
                    setShow(true);
                    if (res.data.data.profession_details.data.length) {
                        setShow(true);
                        console.log(res.data.data.profession_details.data, "profileData");
                        Id = res.data.data._id;
                        console.log(Id, "Id");
                        setDetails({
                            ...details, professionalDetails: res.data.data.profession_details.data
                        })
                    } else {
                        setShow(false);
                        // toast.error(res.data.msg);
                    }
                }
                else {
                    setShow(false);
                    // toast.error(res.data.msg);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    }

    const { professionalDetails } = details;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (btnName == 'Add Profession') {
            let profileId: string | null = localStorage.getItem('profileId');
            console.log(localStorage.getItem('profileId'), "profileId@123");
            let profileSection = 'profession_details';
            const body = {
                "profession_details": {
                    "data": [
                        {
                            "comp_id": "",
                            "company_name": compname,
                            "design_id": "",
                            "designation": desg,
                            "area_exp_id": "",
                            "area_expert": areaexp,
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
                    console.log(res, "errw");
                    if (res.data.data) {
                        toast.success('Saved Successfully');
                        getProfileData();
                        setShow(!Show)
                    } else {
                        toast.error(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err, "err");
                    toast.error(err.message);
                });
        } else {
            const body = {
                "profession_id": professionId,
                "_id": Id,
                "comp_id": "",
                "company_name": compname,
                "design_id": "",
                "designation": desg,
                "area_exp_id": "",
                "area_expert": areaexp,
                "start_date": moment({ year: startYear, month: startMonth - 1 }).utc().toISOString(),
                "end_date": moment({ year: endYear, month: endMonth - 1 }).utc().toISOString(),
                "achievements": achieve,
                "Descr": desc
            }
            OnboardingService.updateProfessionalDetails(body)
                .then(res => {
                    console.log(res, "errw");
                    if (res.data.status == 'Update Success') {
                        toast.success('Updated Successfully');
                        getProfileData();
                        setShow(!Show);
                    } else {
                        toast.error(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err, "err");
                    toast.error(err.message);
                });
        }
    }

    function reset() {
        // ev.preventDefault();
        btnName = "Add Profession";
        setCompname('');
        setDesg('');
        setAreaexp('');
        setDesc('');
        setAchieve('');
        setStartMonth(0);
        setEndMonth(0);
        setEndYear(0);
        setStartYear(0);
    }

    function NextStep() {
        navigate("/congratulation", { state: data });
    }
    
    const remove = (data: IUser) => {
        let dataId = Id;
        console.log(dataId, "dataid");
        OnboardingService.deleteProfessionalDetails(data._id, dataId)
            .then(res => {
                if (res.data.status == "Delete Success") {
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
                                    console.log(res.data.data.profession_details.data, "profileData");
                                    Id = res.data.data._id;
                                    console.log(Id, "Id");
                                    setDetails({
                                        ...details, professionalDetails: res.data.data.profession_details.data
                                    })
                                } else {
                                    setShow(false);
                                    // toast.error(res.data.msg);
                                }
                            }
                            else {
                                setShow(false);
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
        navigate('/educational-details');
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
                                    <Typography color="#62676C">Professional Details</Typography>
                                </Breadcrumbs>
                            </div>

                            <div className="inner-page-content">

                            <div className="">
                                     <AppButton  children="Skip this step" onClick={awards} styleClass='btn skip-this-btn'  />
                             </div>

                               
                                <div className="person-name">
                                    <div className="left-end">
                                        <h3 className="primary-color m-0">Professional Details</h3>
                                    </div>
                                    <div className="right-end text-right">
                                        <h4 className="primary-color m-0">STEP 07/09</h4>
                                        <p className="m-0">Complete to Win 20vCoins</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="page-forms">

                                    {!Show && <form id="professionData" noValidate >

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Company name<sup>*</sup></label>
                                            {/* <select className="form-control" name="compname" id="compname" value={compname} onChange={e => setCompname(e.target.value)} placeholder='some'>
                                                <option>Select Company Name</option>
                                                {companies.length ? companies.map((data) =>
                                                    <option title={data._id}>{data.name}</option>
                                                ) : <div>  <Alert severity="error" >{errorMsg}</Alert>  </div>}
                                            </select> */}
                                              <Dropdown 
                                              name="compname" id="compname" value={compname}  options={companies}   title="Select Company Name" selectStyle="w-100"
                                             handleChange={e => setCompname(e.target.value)}    selectedValue={compname} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Designation<sup>*</sup></label>
                                            {/* <select className="form-control" name="desg" id="desg" placeholder='some' value={desg} onChange={e => setDesg(e.target.value)}>
                                                <option>Select Designation</option>
                                                {roles.length ? roles.map((data) =>
                                                    <option title={data._id}>{data.name}</option>
                                                ) : <div>  <Alert severity="error" >{errorMessage}</Alert>  </div>}
                                            </select> */}
                                              <Dropdown 
                                              name="desg" id="desg" value={desg}  options={roles}   title="Select Designation" selectStyle="w-100"
                                             handleChange={e => setDesg(e.target.value)}    selectedValue={desg} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Area of Expertise<sup>*</sup></label>
                                            {/* <select className="form-control" name="area" id="area" placeholder='some' value={areaexp} onChange={e => setAreaexp(e.target.value)}>
                                                <option>Select area of expertise</option>
                                                {areas.length ? areas.map((data) =>
                                                    <option title={data._id}>{data.name}</option>
                                                ) : <div>  <Alert severity="error" >{errorMsgs}</Alert>  </div>}
                                            </select> */}
                                               <Dropdown 
                                              name="area" id="area" value={areaexp}  options={areas}   title="Select area of expertise" selectStyle="w-100"
                                             handleChange={e => setAreaexp(e.target.value)}    selectedValue={areaexp} />
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
                                            <div className="clearfix"></div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">End Date (or Expected)</label>
                                                <div className='start-date'>
                                                   
                                                       <CustomSelect
                                          name="enddate" id="enddate" value={endMonth} 
                                            options={options}
                                            title="-Select-" selectStyle="w-100"
                                            handleChange={endMonthSelect}
                                            selectedValue={endMonth} />
                                                </div>
                                                <div className='end-date'>
                                                   
                                                    <CustomSelect
                                          name="enddate" id="enddate" value={endYear} 
                                            options={year}
                                            title="-Select-" selectStyle="w-100"
                                            handleChange={endYearSelect}
                                            selectedValue={endYear} />
                                                </div>
                                           <div className="clearfix"></div>
                                        </div>

                                        <div className="form-group">
                                            {/* <label htmlFor="exampleFormControlSelect1">Achievements</label> */}
                                            <AppInput  name="achieve" value={achieve} id="achieve" onChange={e => setAchieve(e.target.value)} label="Achievements" radius="5px"
                                        placeholder="Ex: Topper in maths / Achieved gold medal etc."/>
                                            {/* <input type="text" className="form-control" name="achieve" id="achieve" value={achieve} onChange={e => setAchieve(e.target.value)} aria-describedby="emailHelp" placeholder="Ex: Topper in maths / Achieved gold medal etc." /> */}
                                        </div>

                                        <div className="form-group">
                                            {/* <label htmlFor="exampleFormControlSelect1">Tell us something about your work.</label> */}
                                            {/* <textarea className="form-control" name="desc" id="desc" value={desc} onChange={e => setDesc(e.target.value)} placeholder='Max 100 Characters'></textarea> */}
                                            <AppTextarea  name="desc" value={desc} id="desc" onChange={e => setDesc(e.target.value)} label="Tell us something about your work." radius="5px"
                                        placeholder="Max 100 Characters"/>
                                            <div className='text-area-count text-right'>1 /100</div>
                                        </div>


                                        {/* <CustomSelect
          data={dataval}
          title="Select number of bedrooms"
          onSelectChange={(event:any) => console.log("dgfdgf")}
        /> */}
                                    <AppButton onClick={handleSubmit} children={btnName} styleClass='btn save-btn w-100 mb-3' />
                                        {/* <button type='submit' className="btn save-btn w-100 mb-3" >{btnName}</button> */}

                                        {/* <div className="add-btn">
                                            <button type="button" className="btn add-more-btn w-100">
                                                <img src={AddIcon} alt="Add More" />&nbsp;&nbsp;Add more proffesional details
                                            </button>
                                        </div> */}

                                        <div className="button-center text-center">
                                            {/* <Button variant="outlined" className="btn prev-btn mr-2" onClick={Previous}>Previous</Button>
                                            <Button variant="contained" className="btn clear-btn mr-2" onClick={reset}>Clear</Button>
                                            <Button variant="contained" onClick={NextStep} className="btn save-btn" >Next Step</Button> */}
                                            <AppButton  children="Previous" onClick={Previous} styleClass='btn prev-btn mr-2'  />
                                    <AppButton onClick={reset} children="Clear" styleClass='btn clear-btn mr-2'  />              
                                    <AppButton onClick={NextStep} children="Next Step" styleClass='btn save-btn' />
                                        </div>

                                    </form>}
                                </div>

                                {Show && <div className="secondPage">
                                    {professionalDetails.length ? professionalDetails.map((data: IUser) =>
                                        <div className="row">
                                            <div className="col-md-9 col-lg-9">
                                                <div className="show-details-left">
                                                    <div className="show-details-left-img">
                                                        {/* <img src={DeailsImg} alt="" /> */}
                                                        <img src="http://localhost:3000/assets/img/details-img.png" alt="" />
                                                    </div>
                                                    <div className="show-details-left-con">
                                                        <h4>{data.designation}</h4>
                                                        <p className="m-0">{data.company_name}
                                                            {/* , Full Time */}
                                                            <br />
                                                            {dateFormat(`${data.start_date}`, "mmm")}    {dateFormat(`${data.start_date}`, "yyyy")}- {dateFormat(`${data.end_date}`, "mmm")}    {dateFormat(`${data.end_date}`, "yyyy")} <br />
                                                            Hyderabad, Telangana, India.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-lg-3">
                                                <div className="show-details-left text-right">
                                                    <button type="button" className="btn primary-bg border-r" onClick={() => EditDetails(data)}>
                                                        {/* <img src={Edit} alt="edit" /> */}
                                                        <img src="http://localhost:3000/static/media/edit.0fd9a6237530e39a92d928e6e8cc621f.svg" alt="edit" />
                                                        </button>
                                                    <button type="button" className="btn bg-light border-r" onClick={() => remove(data)}>
                                                        {/* <img src={Delete} alt="" /> */}
                                                        <img src="http://localhost:3000/static/media/delete_red.31e0fe54a6041abd500fa5c58489a1b4.svg" alt="" />
                                                        </button>
                                                    <p className="mt-2">6Yrs present</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : <div>  </div>}
                                    <div className="add-btn mt-3">
                                        <button type="button" className="btn add-more-btn w-100" onClick={AddMore}>
                                            {/* <img src={AddIcon} alt="Add More" /> */}
                                            <img src="http://localhost:3000/static/media/add_circle.4a9831b78aadd01ec280f44eb9711314.svg" alt="Add More" />
                                            &nbsp;&nbsp;Add more proffesional details
                                        </button>
                                    </div>

                                    <div className="button-center text-center mt-4">
                                        <Button variant="outlined" className="btn prev-btn mr-2" onClick={Previous}>Previous</Button>
                                        <Button variant="contained" className="btn clear-btn mr-2" onClick={reset}>Clear</Button>
                                        <Button variant="contained" className="btn save-btn" onClick={NextStep}> Next Step </Button>
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