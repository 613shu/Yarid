import type { FormInputProps } from "../../typs/userType"

const FormInput = (valus: FormInputProps) => {
    const { id, lable, type, registration, errors } = valus
    return <>
        <div className="mb-2 flex flex-col gap-2 text-right">
            <label htmlFor={id} className="fair-label">{lable}</label>
            <input type={type} id={id}
                className="fair-input"
                {...registration}
            />
            {errors && <p className="fair-error">⚠ {errors}</p>}
        </div>
    </>
}

export default FormInput
