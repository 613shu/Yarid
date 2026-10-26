import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Nav } from "./Nav"
import {headerLinks } from "../constance/navLinks"
import { Outlet, useNavigate } from "react-router"



const Header=()=>
{
const navigate=useNavigate();
const {currentRole,logout,user}=useContext(AuthContext)
    return<>
    <header className="fair-header sticky top-0 z-50 flex h-[72px] items-center gap-6 px-6 text-parchment">
        {currentRole!="Guest"&&<button onClick={()=>{logout();navigate("/")}} className="fair-btn fair-btn-wood order-3 px-4! py-1.5! text-base!">יציאה</button>}
        {currentRole!="Guest"&&<p className="order-2 ms-auto rounded-full border border-brass/50 bg-black/30 px-4 py-1.5 font-display text-lantern-soft">{user?.displayName}</p>}
        <Nav links={headerLinks} className="order-1 flex flex-wrap items-center gap-1" linkClassName="rounded-lg px-4 py-2 font-display text-lg text-parchment/80 transition hover:bg-white/5 hover:text-lantern [&.active]:bg-white/10 [&.active]:text-lantern [&.active]:shadow-[inset_0_-3px_0_var(--color-lantern)]"/>
        
    </header>
    </>
}


export default Header