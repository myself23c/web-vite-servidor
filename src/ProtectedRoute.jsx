import {Navigate, Outlet} from "react-router-dom"
import { useAuth } from "../context/authContext"

export function ProtectedRoute(){
    
    const {loading, user, isAuthenticated}= useAuth()
    if (loading) return <h1>Loading...</h1>;
    if(!isAuthenticated && !loading) return <Navigate to="/login" replace></Navigate>

    return (<Outlet></Outlet>)
}