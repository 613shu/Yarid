import { Navigate, Outlet, useNavigate } from "react-router"
import type { Profile, ProfileProps } from "../typs/userType"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Loader } from "../components/hud/Loader"



export const ProtectedRouts = ({ Profiles }: ProfileProps) => {
    const { currentRole, user, isLoading } = useContext(AuthContext);

    if(isLoading) return <Loader text="פותחים את שערי היריד..." />
    
    if (Profiles.includes(currentRole)) return <Outlet />
        
    return currentRole==="Guest"?<Navigate to="/login" replace />:<Navigate to="/game" replace />


}
