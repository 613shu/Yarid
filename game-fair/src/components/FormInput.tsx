
import type {FormInputProps} from "../typs/userType"



const FormInput=(valus:FormInputProps)=>
{
const {id,lable,type,registration,errors}=valus
return<>
<div className="mb-3 flex flex-col gap-2 text-right">
    <label htmlFor={id} className="font-display text-lg text-wood-800">{lable}</label>
    <input type={type} id={id} 
    className="fair-input"
    {...registration}
     />
     {errors&&<p className="text-sm font-semibold text-awning">{errors}</p>}
</div>
</>
}

export default FormInput