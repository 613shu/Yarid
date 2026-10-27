import type { ReactNode } from "react"
import type { Profile, userType } from "./userType"
import type { decorationType, productType, stallType } from "./gameTyps";



export interface AuthContextType {
    user: userType | null,
    token: string | null
    login: (t: string) => void,
    logout: () => void,
    currentRole: Profile,
    isLoading: boolean,
    error: Error | null;

}

export type WorldContextType = {
    stalls: stallType[];
    setStalls: (s: stallType[]) => void;
    selectedId: number | null;
    setSelectId: (id: number | null) => void;
    clickedWakerId: number | null,
 setClickedWakerId: (id: number|null) => void
    /** אינדקס המקום ביריד של כל דוכן */
    slotOf: (stall: stallType) => number;
};

export interface AuthProviderProps {
    children: ReactNode

}
export type stepType = "DECORATE" | "PRODUCT" | "COMPLETE" | "PRICE" | "NAME" | "CONFIRMDECORATE"|"UPDATE"

export interface StallContextType {
    currentProduct: productType | null,
    decorations: decorationType[] | [],
    setDecorations: (dec: decorationType[]) => void,
    setCurrentProduct: (p: productType) => void,


    step: stepType,
    setStep: (s: stepType) => void

}

export interface StallProviderProps {
    children: ReactNode

}
