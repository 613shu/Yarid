import * as yup from "yup"
import {loginSchema, registerSchema, stallSchema} from "../resolvers/loginResolver"

export type loginFormValus=yup.InferType<typeof loginSchema>;

export type registerFormValus=yup.InferType<typeof registerSchema>;

export type stallFormValus=yup.InferType<typeof stallSchema>;



