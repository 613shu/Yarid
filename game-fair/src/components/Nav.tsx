import type { LinkProps, NavProps } from "../typs/userType"
import Link from "./Link"



export const Nav=({links,className,linkClassName}:NavProps)=>
{
return<>
<nav className={className}>
    {links.map((l)=>
    <Link to={l.to} content={l.content}  className={linkClassName}
    key={l.to} />

    )}

</nav>
</>
}
