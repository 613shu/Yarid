import type { AxiosRequestConfig } from "axios";
import type { UseFormRegisterReturn } from "react-hook-form";
import { string } from "yup";



export type useMyMutateType={
     queryKey:string,
    enabled?:boolean,
    url:string



}


export type useMyQuaryType={
    queryKey:string[],
    enabled?:boolean,
    refetchOnWindowFocus?:boolean,
    url:string,
    params?:AxiosRequestConfig["params"],
    refetchInterval?:number



}

export interface useMyQuaryProps{
    queryValues:useMyQuaryType
}

export interface userType {
    email: string,
    password: string,
    id: number,
    displayName: string,
    role: string,
    balance: number,
    status: string,
    createdAt: string
}


export interface FormInputProps
{
  id:string,
    lable:string,
    type:string,
     registration?:UseFormRegisterReturn,
    errors?:string
}



export interface LinkProps
{
       to:string,
    content:string,
    className?:string
}
export interface NavProps
{
    links:LinkProps[],
    className?:string,
    linkClassName?:string
}


export type Profile="ADMIN" | "MERCHANT" | "Gvir" | "Guest"

export interface ProfileProps{
Profiles:Profile[]
}