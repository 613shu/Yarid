import * as yup from "yup"
import {loginSchema, registerSchema,stallSchema,stockSchema} from "./shemasResolver"

export type loginFormValus=yup.InferType<typeof loginSchema>;

export type registerFormValus=yup.InferType<typeof registerSchema>;

export type stallFormValus=yup.InferType<typeof stallSchema>;

export type stockFormValus=yup.InferType<typeof stockSchema>;




