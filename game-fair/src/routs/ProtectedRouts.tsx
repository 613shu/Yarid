import { Navigate, Outlet, useNavigate } from "react-router"
import type { Profile, ProfileProps } from "../typs/userType"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"



export const ProtectedRouts = ({ Profiles }: ProfileProps) => {
    const { currentRole, user, isLoading } = useContext(AuthContext);

    if(isLoading) return<h3>טוען...</h3>
    
    if (Profiles.includes(currentRole)) return <Outlet />
        
    return currentRole==="Guest"?<Navigate to="/login" replace />:<Navigate to="/game" replace />


}