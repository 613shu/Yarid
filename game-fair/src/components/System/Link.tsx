import { NavLink } from "react-router"
import type { LinkProps } from "../../typs/userType"



 const Link=({content,to,className}:LinkProps)=>
{
    
    return <NavLink to={to} className={className}>{content}</NavLink>
}
export default Link
