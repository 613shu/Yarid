import type { ReactNode } from "react"
import type { Profile, userType } from "./userType"
import type { decorationType, productType } from "./gameTyps";



export interface AuthContextType
{
    user:userType | null,
    token: string | null
    login: (t:string)=>void,
    logout:()=>void,
    currentRole:Profile,
    isLoading:boolean,
    error:Error| null;



}

export interface AuthProviderProps
{
   children:ReactNode

}
export type stepType="DECORATE"|"PRODUCT"|"COMPLETE"|"PRICE"|"NAME"|"CONFIRMDECORATE"

export interface StallContextType
{
    currentProduct:productType|null,
    decorations:decorationType[]|[],
    setDecorations:(dec:decorationType[])=>void,
    setCurrentProduct:(p:productType)=>void,
  

    step:stepType,
    setStep:(s:stepType)=>void




}

export interface StallProviderProps
{
   children:ReactNode

}
