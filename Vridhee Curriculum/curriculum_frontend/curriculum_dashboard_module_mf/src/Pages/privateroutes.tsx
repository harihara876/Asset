import { Outlet, Navigate } from 'react-router-dom'
// import { useAuth } from "./useauths"
import React, { useEffect } from "react";
import configJson from "vridhee_common_component_mf/configJson";
import { useAuth } from '../useauths';

const logout_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.accountMFUrl : configJson.server.accountMFUrl

function PrivateRoutes() {
    const token = useAuth()
    return token ? <Outlet /> :
    // return  
    window.location.replace(`${logout_URL}`)!
    // <Navigate to='/join-us' />
}

export default PrivateRoutes