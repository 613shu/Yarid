import { useForm } from "react-hook-form";
import FormInput from "../components/System/FormInput";
import { Loader } from "../components/hud/Loader"
import { useAStock } from "../hooks/useStock"
import { yupResolver } from "@hookform/resolvers/yup";
import type { stallFormValus, stockFormValus } from "../typs/yups";
import { stockSchema } from "../typs/shemasResolver";

export const StockPage = ({stallId}:{stallId:number}) => {

    const { addStock,data, isError, isPending, isSuccess } = useAStock();

  const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<stockFormValus>({
        resolver: yupResolver(stockSchema)
    });


    if (isPending)
        return <Loader text="רוכש מלאי" />
    if (isSuccess)
        return <h1 className="fair-note mt-4 border-2! border-teal! text-lg text-lantern-soft shadow-[0_0_40px_-10px_rgb(31_181_164_/_0.75)]">✅ המלאי התווסף בהצלחה</h1>

    if (isError)
        return <h1 className="fair-note fair-note-error mt-4 border-2! border-danger/70! text-lg shadow-[0_0_40px_-10px_rgb(255_143_143_/_0.6)]">⚠️ לא הצלחנו להוסיף מלאי</h1>


    return <>
        <form  onSubmit={handleSubmit((v)=>addStock(v.quantity,stallId))}>
            <FormInput lable="הקש כמות" id="quantity" type="number" registration={register("quantity")} errors={errors.quantity?.message}/>
            <button type="submit" className="fair-btn fair-btn-ghost fair-btn-sm mt-3">רכוש מלאי</button>
        </form>
    </>

}