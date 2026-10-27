import { useContext, useState, type FormEvent } from "react"
import type { userType } from "../../typs/userType"
import { useNavigate } from "react-router"
import { api } from "../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import type { SubmitEvent } from 'react'
import { useForm } from 'react-hook-form'
import type { loginFormValus } from "../../typs/yups"
import { loginSchema } from "../../resolvers/loginResolver"
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../../components/FormInput";


const LoginPage = () => {


    const navigate = useNavigate();
    const { login, logout, user } = useContext(AuthContext)

    const getTokenUser = async (data: loginFormValus) => {


        const response = await api.post("/auth/login", data)

        return response.data


    }


    const loginMutation = useMutation(
        {
            mutationFn: getTokenUser
        }
    )





    const connect = async (data: loginFormValus) => {


        const res = await loginMutation.mutateAsync(data);


       login(res.token);
        navigate("/game");


    }


    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<loginFormValus>({
        resolver: yupResolver(loginSchema)
    });


    return <div dir="rtl" className="pt-6">

        {loginMutation.isPending && <h1 className="fair-note mt-8 text-lg">טוען...</h1>}
        {loginMutation.isError && <h1 className="fair-note fair-note-error mt-8 text-lg">{loginMutation.error.message}</h1>}

        <form onSubmit={handleSubmit(connect)} className="fair-panel fair-gate mx-auto mb-16 flex w-fit flex-col gap-2" data-title="כניסה ליריד">
            <p className="mb-4 text-center text-parchment/75">הפנסים כבר דולקים. ברוכים השבים!</p>


            <FormInput type="email" id="email" lable="אימייל" registration={register("email")} errors={errors.email?.message} />

            <FormInput type="password" id="password" lable="סיסמא" registration={register("password")} errors={errors.password?.message} />


            <button type="submit" className="fair-btn fair-btn-gold mt-4 w-full">כניסה</button>
        </form>



    </div>




}

export default LoginPage
