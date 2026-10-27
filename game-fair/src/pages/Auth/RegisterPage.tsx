import { useMutation } from "@tanstack/react-query"
import type { userType } from "../../typs/userType"
import { api } from "../../api/axiosInstance"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import type { registerFormValus } from "../../typs/yups"
import FormInput from "../../components/System/FormInput"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { registerSchema } from "../../typs/shemasResolver"
import { useNavigate } from "react-router"


const RegisterPage = () => {
    const navigate = useNavigate();

    const { login, user } = useContext(AuthContext)

    const getTokenUser = async (fields: registerFormValus) => {


        const response = await api.post("/auth/register", fields)

        return response.data


    }

    const registerMutation = useMutation(
        {
            mutationFn: getTokenUser
        }
    )

    const newRegister = async (fields: registerFormValus) => {
        const data = await registerMutation.mutateAsync(fields);
        login(data.token);
        navigate("/game");


    }




    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<registerFormValus>({
        resolver: yupResolver(registerSchema)
    });



    return <div dir="rtl" className="pt-6">
        {registerMutation.isPending && <h1 className="fair-note mt-8 text-lg">טוען...</h1>}
        {registerMutation.isSuccess && <h1 className="fair-note mt-8 text-lg">{" ברוך הבא " + user?.displayName + " היקר "}</h1>}
        {registerMutation.isError && <h1 className="fair-note fair-note-error mt-8 text-lg">{registerMutation.error.message}</h1>}

        <form onSubmit={handleSubmit(newRegister)} className="fair-panel fair-gate mx-auto mb-16 flex w-fit flex-col gap-2" data-title="כרטיס כניסה חדש">
            <p className="mb-4 text-center text-parchment/75">הצטרפו ליריד, פתחו דוכן ראשון והתחילו למכור.</p>



            <FormInput type="email" id="email" lable="אימייל" registration={register("email")} errors={errors.email?.message} />

            <FormInput type="password" id="password" lable="סיסמא" registration={register("password")} errors={errors.password?.message} />

            <FormInput type="text" id="displayName" lable="שם" registration={register("displayName")} errors={errors.displayName?.message} />

            <button type="submit" className="fair-btn fair-btn-gold mt-4 w-full">הרשמה</button>
        </form>
    </div>

}

export default RegisterPage
