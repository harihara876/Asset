import Box from '@mui/material/Box';
import React, { useState, useEffect, useRef } from 'react';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import AppButton from 'vridhee_common_component_mf/AppButton';
import Autocomplete from '@mui/material/Autocomplete';
import AutocompleteSearch from 'vridhee_common_component_mf/AutocompleteSearch';
import TextField from '@mui/material/TextField';
import { OnboardingService } from '../Services/onboardingService';
import IUser from '../Models/IUser';
import Sidebar from "./sidebar"
import jwt_decode from "jwt-decode";
const drawerWidth = 300;
let token: string
let type: string
let sid: string
let userId: string
let userdetails: any
let languageId :string
interface ILocation {
    locations: IUser[],
    errorMsg: string
}

interface ILanguage {
    languages: IUser[],
    errorMsgs: string
}

export default function Lang() {
    const locationr = useLocation();
    const navigate = useNavigate();

    if (window.location.search) {
        var prmstr = window.location.search.split("?");
        // token = prmstr[1];
        // localStorage.setItem('token', token);
        // type = prmstr[2];
        // localStorage.setItem('actorType', type);
        type = prmstr[1];
        localStorage.setItem('actorType', type);
        sid = prmstr[2];
        localStorage.setItem('sid', sid);
         userId = prmstr[3];
         console.log(prmstr[3],"prmstr[3]")
        localStorage.setItem('Tokenuserid', prmstr[3]);
    if(sid){
        const body = {
            "sid": sid
          }
        OnboardingService.getToken(body)
        .then(res => {
            if(res.data.code == 200) {
                console.log(res.data.data.accessToken,"tokeeennn") 
                localStorage.setItem('token', res.data.data.accessToken);
                userdetails = jwt_decode(res.data.data.accessToken);
         localStorage.setItem('tabFlag', "false")
         localStorage.setItem('profileId', userdetails.profileId)
        localStorage.setItem('Tokenuserid', res.data.data._id);
         localStorage.setItem('id', userdetails.act_typ[0].typ_id);
              token = res.data.data.accessToken;
        
            } else{
                OnboardingService.checkIsUserLogin()
                .then(ress => {
                    if (ress.data.code == 200) {
                        if (ress.data.data.accessToken) {
                            console.log(ress.data.data.accessToken,"tokeeennn") 
                userdetails = jwt_decode(ress.data.data.accessToken);
         localStorage.setItem('tabFlag', "false")
         localStorage.setItem('profileId', userdetails.profileId)
      localStorage.setItem('Tokenuserid', ress.data.data.user_id);
         localStorage.setItem('id', userdetails.act_typ[0].typ_id);
              token = ress.data.data.accessToken;
         localStorage.setItem('token', ress.data.data.accessToken);
                        }
                    }
                })
                .catch(e =>
                    console.log(e)
                ); 
            }
          
        })
        .catch(e =>
            console.log(e)
        );  
    }
      
    } else {
        if (locationr.state) {
            token = locationr.state.token;
            type = locationr.state.type;
            localStorage.setItem('token', token);
            localStorage.setItem('actorType', type);
            // localStorage.setItem('Tokenuserid', res.data.data.user_id);
        } 
    }

    // if (token) {
    //     userdetails = jwt_decode(token);
    //     localStorage.setItem('tabFlag', "false")
    //     localStorage.setItem('profileId', userdetails.profileId)
    //     localStorage.setItem('Tokenuserid', userdetails.user_id);
    //     localStorage.setItem('id', userdetails.act_typ[0].typ_id);
    // }


    const [location, setlocation] = useState<ILocation>({
        locations: [] as IUser[],
        errorMsg: ''
    })

    const [values, setValues] = useState('');
    const [value, setValue] = useState('')
    const [language, setlanguage] = useState('')
    const clearSelected = () => {
        setValues('');
        setValue('');
    };



    useEffect(() => {
        OnboardingService.checkIsUserLogin()
        .then(res => {
            if (res.data.code == 200) {
                if (res.data.data.accessToken) {
                    let userdetails: any = jwt_decode(res.data.data.accessToken);
                    const userId = userdetails.user_id;
                    localStorage.setItem('Tokenuserid', userdetails.user_id)
                    localStorage.setItem('token', res.data.data.accessToken)
                    getLocations();
                    getLanguages();
                    userdetails = jwt_decode(res.data.data.accessToken);
                    localStorage.setItem('profileId', userdetails.profileId)
                }
            } else{
                getLocations();
                getLanguages();  
            }
        })
        .catch(e =>
            console.log(e)
        );
        
    }, [])


    const getLocations = () => {
        setlocation({ ...location })
        OnboardingService.getLocations()
            .then(res => {
                setlocation({
                    ...location, locations: res.data.data[0].data
                })
            })
            .catch(error => setlocation({
                ...location, errorMsg: error.message
            }));
    }

    const getLanguages = () => {
        setLang({ ...lang })
        OnboardingService.getLanguages()
            .then(res => {
                setLang({
                    ...lang, languages: res.data.data[0].data
                })
            })
            .catch(err => setLang({
                ...lang, errorMsgs: err.message
            }));
    }


    const { locations, errorMsg } = location;

    const [lang, setLang] = useState<ILanguage>({
        languages: [] as IUser[],
        errorMsgs: ''
    })



    const { languages, errorMsgs } = lang;

    const goNext = () => {
        if (window.location.search) {
            var prmstr = window.location.search.split("?");
            // token = prmstr[1];
            sid = prmstr[2];
            localStorage.setItem('sid', sid);
           
        if(sid){
            const body = {
                "sid": sid
              }
            OnboardingService.getToken(body)
            .then(res => {
              console.log(res.data.data.accessToken,"tokeeennn999999") 
                 token = res.data.data.accessToken;
            })
            .catch(e =>
                console.log(e)
            );  
        }

        } else {
            if (locationr.state) {
                token = locationr.state.token;
            }
        }
        if (token) {
            userdetails = jwt_decode(token);
        }else{
            let token = localStorage.getItem('token')
            if(token){
                userdetails = jwt_decode(token);  
            }
        }
        if (userdetails) {
            let profileId = userdetails.profileId;
            localStorage.setItem('profileId', profileId)
            localStorage.setItem('Tokenuserid', userdetails.user_id)
        }

if(value){
    let profileSection = 'personal_info';

    languages.filter(lang =>{
        if(lang.name == value){
setlanguage(lang.id)
languageId = lang.id
        }
    })
    console.log(languageId,"languageId")
    const body = {
        "personal_info": {
            pref_language :languageId
        }
      }
    OnboardingService.updateUserprofile(userdetails.profileId,profileSection,body)
    .then(res => {
        console.log(res.data.data,"preferredlanguage")
    })
    .catch(err => setLang({
        ...lang, errorMsgs: err.message
    }));
}
        const data = { token: token };
        navigate('/personal-information', { state: data });

    }

    return (
        <div>
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
                    anchor="left"  >
                {token ? <Sidebar  token ={token}  id={ userdetails.act_typ[0].typ_id}/>  :  <Sidebar  token ={localStorage.getItem('token')} id ={localStorage.getItem('id')}/>}   

                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}  >

                    <div className="page-wrapper">
                        <div className="breadcrumbs-sec">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="#62676C">Language & Location</Typography>
                            </Breadcrumbs>
                        </div>
                        <form >
                            <div className="select-language mt-3">
                                <div className="form-group">
                                    <label>Which language do you prefer to learn?</label>
                                    <AutocompleteSearch
                                        id="lang"
                                        value={value}
                                        onChange={(event: any, newValue: any) => {
                                            setValue(newValue);
                                        }}
                                        options={languages.map((option) => option.name)}
                                        renderInput={(params: any) => <TextField {...params} InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }} />}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Where are you from?</label>
                                    <AutocompleteSearch
                                        id="location" value={values}
                                        onChange={(event: any, newValue: any) => {
                                            setValues(newValue);
                                            
                                        }}
                                        options={locations.map((option) => option.name)}
                                        renderInput={(params: any) => <TextField {...params} InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }} />}
                                    />
                                </div>
                                <div className="button-center text-center">
                                    <AppButton
                                        onClick={clearSelected}
                                        children="Clear"
                                        styleClass='btn clear-btn' />
                                    <AppButton
                                        onClick={goNext}
                                        children="Next Step" disabled={!values && !value}
                                        styleClass='btn save-btn' />
                                </div>

                            </div>
                        </form>

                    </div>

                </Box>
            </Box>
        </div>
    );
}