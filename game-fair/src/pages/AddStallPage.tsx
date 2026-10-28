import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../components/System/FormInput";
import type { stallFormValus } from "../typs/yups";
import { ProductSection } from "./ProductsPage";
import { useForm } from "react-hook-form";
import { stallSchema } from "../typs/shemasResolver";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useStall } from "../context/StallContext";
import Link from "../components/System/Link";
import { api } from "../api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DacorationSection } from "./DecorationPage";
import { useAddDecoration } from "../hooks/useAddDecoration";
import { useBalance } from "../hooks/useBalance";
import { StepTrail } from "../components/StepTrail";
import { Loader } from "../components/hud/Loader";


export const AddStallPage = () => {


    const { user, token } = useContext(AuthContext)
    const { addDecorations, isPending, isError } = useAddDecoration();
    const { balance ,isLoading: balanceLoading} = useBalance();
    const queryClient = useQueryClient();
    const { currentProduct, setCurrentProduct, setDecorations, decorations, step, setStep, stallId, setStallId } = useStall();

    useEffect(() => { setStep("NAME") }, [])
    useEffect(() => { setDecorations([]) }, [currentProduct, token]);


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
    useEffect(() => { setStallId(currentStall?.id) }, [step])


    const updateStall = async (fields: stallFormValus) => {
        (step === "NAME" && setStep("PRODUCT"));

        if (step === "PRICE") {
            const stallData = await stallMutation.mutateAsync({ ...fields, productId: currentProduct?.id||-1 });

            addDecorations(decorations, stallData.id);

            setStep("COMPLETE");
        }

    }







    const content = (() => {
        switch (step) {
            case ("NAME"):
                if (balance < 300)
                    if(balanceLoading) return <Loader text="סופרים את הקופה..."/> 
                    return <div data-title="הקופה ריקה" className="fair-panel fair-gate mx-auto w-fit text-center">
                        <p className="text-6xl">🪙</p>
                        <h1 className="fair-title mt-3 text-2xl">אין לך מספיק רובלים לדוכן חדש</h1>
                        <p className="mt-2 text-parchment/70">פתיחת דוכן עולה 300 רובל. מכרו עוד קצת וחזרו!</p>
                        <Link to="/game" content="חזרה ליריד" className="fair-btn fair-btn-wood mt-6" />
                    </div>
                return <>
                    <form onSubmit={handleSubmit(updateStall)} data-title="דוכן חדש" className="fair-panel fair-gate mx-auto flex w-fit flex-col items-center gap-2">
                        <p className="mb-4 max-w-xs text-center text-parchment/75">כל דוכן גדול מתחיל בשם טוב. איך יקראו לדוכן שלך?</p>
                        <FormInput type="text" id="name" lable="שם הדוכן" registration={register("name")} errors={errors.name?.message} />
                        <p>עלות שכירות דוכן :20 רובל ליום</p>
                        <button type="submit" className="fair-btn mt-4 w-full">המשך לבחירת מוצר ←</button>
                    </form>
                </>
            case ("PRODUCT"):
                return <>
                    <ProductSection />
                </>

            case ("DECORATE"):
                return <>
                    <div data-title="קישוט הדוכן" className="fair-panel fair-gate mx-auto flex max-w-lg flex-wrap items-center justify-center gap-4 text-center">
                        <p className="w-full text-5xl">🩷💛🧡💚🤍</p>
                        <h1 className="fair-title w-full text-3xl">להוסיף קישוטים לדוכן?</h1>
                        <p className="mb-2 w-full text-parchment/75">דוכן מקושט מושך יותר קונים ומעלה את הניקוד שלך.</p>
                        <button onClick={() => { setStep("CONFIRMDECORATE") }} className="fair-btn fair-btn-gold">כן, בשמחה!</button>
                        <button onClick={() => { setStep("PRICE") }} className="fair-btn fair-btn-wood">לא עכשיו</button>
                    </div>
                </>

            case ("CONFIRMDECORATE"):
                return <DacorationSection  />

            case ("PRICE"):
                return <>
                    <form onSubmit={handleSubmit(updateStall)} data-title="קביעת מחיר" className="fair-panel fair-gate mx-auto flex w-fit flex-col items-center gap-2">
                        {currentProduct && <p className="fair-chip mb-3">🛍️ {currentProduct.name} · מחיר ספק ₪{currentProduct.supplierPrice}</p>}
                        <FormInput type="number" id="price" lable="מחיר מכירה ליחידה" registration={register("price")} errors={errors.price?.message} />
                        {decorations.length > 0 && <p className="text-sm text-parchment/70"> {decorations.length} קישוטים נבחרו</p>}
                        <button type="submit" className="fair-btn fair-btn-gold mt-4 w-full">🎉 פתיחת הדוכן</button>
                    </form>
                </>
            case ("UPDATE"):
                return <>
                    <h1 className="fair-panel mx-auto mt-24 w-fit text-center fair-title text-4xl border-2! border-teal! px-12! py-10! shadow-[0_0_80px_-12px_rgb(31_181_164_/_0.75)]">השינויים נשמרו בהצלחה</h1>
                </>
            case ("COMPLETE"):
                if (isError)
                    return <h1 className="fair-panel mx-auto mt-24 w-fit max-w-md border-2! border-danger/70! text-center font-display text-3xl text-danger shadow-[0_0_60px_-12px_rgb(255_143_143_/_0.65)]">⚠️ לא הצלחנו להוסיף את הדוכן</h1>
                return <div className="flex flex-col items-center">
                    {isPending && <Loader text="בונים את הדוכן שלך..." />}
                    {stallMutation.isSuccess && <div data-title="מזל טוב!" className="fair-panel fair-gate mx-auto w-fit text-center border-2! border-teal! px-12! py-10! shadow-[0_0_80px_-12px_rgb(31_181_164_/_0.75)]">
                        <p className="text-6xl animate-float">🎀</p>
                        <h1 className="fair-title fair-shimmer-text mt-3 text-5xl">הדוכן נפתח בהצלחה!</h1>
                        <p className="mt-2 text-parchment/75">הקונים כבר בדרך...</p>
                    </div>}
                    <Link content="מחכים לך ביריד ←" to="/game" className="fair-btn fair-btn-gold mt-10" />
                </div>

        }
    })();

    return <div dir="rtl" className="pb-16">
        <StepTrail step={step} />
        {content}
    </div>
}
