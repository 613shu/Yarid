import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type Profile, type useMyQuaryProps, type useMyQuaryType, type userType } from "../typs/userType"
import type { AuthContextType, AuthProviderProps } from "../typs/contextTyps"
import axios from "axios"
import { api } from "../api/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import { useMyQuery } from "../hooks/useMyQuery"




export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: (t: string) => { },
    logout: () => { },
    currentRole: "Guest",
    isLoading: false,
    error: null
})


export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const { data: user, error, isLoading } = useMyQuery({ queryValues: { url: "/auth/me", queryKey:[token||"token"] } })
    

    const currentRole: Profile = user?.role || "Guest"


    const login = (token: string) => {

        localStorage.setItem('token', token);
        setToken(token);
    }




    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    }



    return (
        <AuthContext.Provider value={{ user, token, login, logout, currentRole, isLoading, error }}>
            {children}

        </AuthContext.Provider>
    )
}

