import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../useauths'
// import { useAuth } from "./useauths"

function PublicRoutes() {
    const token = useAuth()
    return token ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoutes