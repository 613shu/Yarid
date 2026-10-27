import { createContext, useContext, useEffect, useState } from "react"
import type { StallContextType, StallProviderProps, stepType } from "../typs/contextTyps"
import type { decorationType, productType } from "../typs/gameTyps"
import FormInput from "../components/System/FormInput"
import { ProductSection } from "../pages/ProductsPage"
import { AuthContext } from "./AuthContext"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import type { stallFormValus } from "../typs/yups"
import { stallSchema } from "../typs/shemasResolver"

export const StallContext = createContext<StallContextType>({
    currentProduct: null,
    setCurrentProduct: (p: productType) => { },
    decorations: [],
    setDecorations: () => { },
    step: "NAME",
    stallId:-1,
    setStallId:(id:number)=>{},
    setStep: (s: stepType) => { }
})

export const StallProvider = ({ children }: StallProviderProps) => {
    const [step, setStep] = useState<stepType>("NAME");

    const [currentProduct, setProduct] = useState<productType | null>(null);

    const [decorations, setDecorations] = useState<decorationType[]>([]);

    const [stallId, setStallId] = useState<number >(-1);



    const setCurrentProduct = (p: productType) => {
        setProduct(p);
    }


    return (
        <StallContext.Provider value={{ setStallId,stallId,step, setStep, setCurrentProduct, currentProduct, decorations, setDecorations }}>
            {children}
        </StallContext.Provider>
    )
}

export const useStall = () => useContext(StallContext)