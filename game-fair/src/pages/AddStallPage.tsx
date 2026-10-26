import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../components/FormInput";
import type { stallFormValus } from "../typs/yups";
import { ProductSection } from "./ProductsPage";
import { useForm } from "react-hook-form";
import { stallSchema } from "../resolvers/loginResolver";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useStall } from "../context/StallContext";
import Link from "../components/Link";
import { api } from "../api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DecorationPage, DacorationSection } from "./DecorationPage";
import type { decorationType } from "../typs/gameTyps";
import { useAddDecoration } from "../hooks/apiHooks";
import { useBalance } from "../hooks/useBalance";


export const AddStallPage = () => {


    const { user, token } = useContext(AuthContext)
    const { addDecorations, isPending, isError } = useAddDecoration();
    const { balance } = useBalance();
    const queryClient = useQueryClient();

    const { currentProduct, setCurrentProduct, setDecorations, decorations, step, setStep } = useStall();
    useEffect(() => { setStep("NAME") }, [])
    useEffect(() => { setDecorations([]) }, [currentProduct, token])


    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<stallFormValus>({
        resolver: yupResolver(stallSchema)
    });

    const addStall = async (fields: stallFormValus) => {

        const response = await api.post("/stalls", fields)
        return response.data


    }

    const stallMutation = useMutation(
        {
            mutationFn: addStall,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["me"] });
                queryClient.invalidateQueries({ queryKey: ["stall"] });
            },
        }
    )


    const { data: currentStall } = stallMutation;

    const updateStall = async (fields: stallFormValus) => {
        (step === "NAME" && setStep("PRODUCT"));

        if (step === "PRICE") {
            const stallData = await stallMutation.mutateAsync({ ...fields, productId: currentProduct?.id });


            addDecorations(decorations, stallData.id);


            setStep("COMPLETE");
        }

    }







    switch (step) {
        case ("NAME"):
            if (balance < 300)
                return <>
                    <h1 className="fair-panel fair-gate [--gate-title:'הקופה_ריקה'] mx-auto w-fit text-center font-display text-2xl">אין לך מספיק רובלים</h1>
                    <Link to="/game" content="חזרה ליריד" className="fair-btn fair-btn-wood mx-auto mt-10 flex! w-fit" />
                </>
            return <>

                <form onSubmit={handleSubmit(updateStall)} className="fair-panel fair-gate [--gate-title:'דוכן_חדש'] mx-auto flex w-fit flex-col gap-2">

                    <FormInput type="text" id="name" lable="שם הדוכן" registration={register("name")} errors={errors.name?.message} />
                    <button type="submit" className="fair-btn mt-4 w-full">המשך לבחירת מוצר</button>
                </form>
            </>
        case ("PRODUCT"):
            return <>
                <ProductSection />
            </>

        case ("DECORATE"):
            return <>
                <div className="fair-panel fair-gate [--gate-title:'קישוט_הדוכן'] mx-auto flex w-fit flex-wrap items-center justify-center gap-4 text-center">
                    <h1 className="fair-title mb-2 w-full text-3xl">האם תרצה להוסיף קישוטים?</h1>
                    <button onClick={() => { setStep("CONFIRMDECORATE") }} className="fair-btn">כן,בשמחה</button>
                    <button onClick={() => { setStep("PRICE") }} className="fair-btn fair-btn-wood"> לא עכשיו</button>
                </div>
            </>

        case ("CONFIRMDECORATE"):
            return <DacorationSection />

        case ("PRICE"):
            return <>
                <form onSubmit={handleSubmit(updateStall)} className="fair-panel fair-gate [--gate-title:'דוכן_חדש'] mx-auto flex w-fit flex-col gap-2">

                    <FormInput type="number" id="price" lable="מחיר מוצר" registration={register("price")} errors={errors.price?.message} />
                    <button type="submit" className="fair-btn mt-4 w-full">פתח דוכן</button>
                </form>
            </>

        case ("COMPLETE"):
            if (isError)
                return <h1 className="fair-note mt-28 text-xl text-[#ff9b9b]!">לא הצלחנו להוסיף את הדוכן</h1>
            return <>
                {isPending && <h1 className="fair-note mt-28 animate-pulse text-xl">טוען...</h1>}
                {stallMutation.isSuccess && <h1 className="fair-panel fair-gate [--gate-title:'מזל_טוב!'] mx-auto w-fit text-center font-display text-3xl">הדוכן נוסף בהצלחה!</h1>}



                <Link content="מחכים לך ביריד" to="/game" className="fair-btn mx-auto mt-10 flex! w-fit" />

            </>
    }
}
