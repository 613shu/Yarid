import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import type { productType } from "./gameTyps"

export const loginSchema = yup.object(
    {
        email: yup.string().email("כתובת האימייל אינה תקינה").required("יש להזין כתובת אימייל"),
        password: yup.string().required("יש להזין סיסמא")

    }
)

export const registerSchema = yup.object(
    {
        email: yup.string().email("כתובת האימייל אינה תקינה").required("יש להזין כתובת אימייל"),
        password: yup.string().required("יש להזין סיסמא").min(8, "הסיסמה חייבת לכלול לפחות 8 תווים"),
        displayName: yup.string()

    }
)



export const stallSchema = yup.object({
  name: yup.string().trim(),
  productId: yup.number(),
  decorationIds: yup.array(yup.number().required()).default([]),
  price: yup.number().typeError("יש להזין מחיר").positive("המחיר חייב להיות חיובי"),
});


export const stockSchema = yup.object({
    quantity: yup
        .number()
        .typeError("יש להקיש מספר")
        .positive("הכמות חייבת להיות חיובית")
        .integer("יש להקיש מספר שלם")
        .required("שדה חובה"),
});