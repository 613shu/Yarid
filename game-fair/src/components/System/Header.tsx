import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Nav } from "./Nav"
import { headerLinks } from "../../constance/navLinks"
import { NavLink, useNavigate } from "react-router"
import type { LinkProps } from "../../typs/userType"

const Header = () => {
    const navigate = useNavigate();
    const { currentRole, logout, user } = useContext(AuthContext)
    const links =headerLinks.filter((l:LinkProps)=>{l.profiles?.includes(currentRole)})


    return <>
        <header dir="rtl" className="fair-header flex items-center gap-4 px-4 md:gap-8 md:px-8">
            <NavLink to="/" className="flex items-center gap-2">
                <span className="text-2xl animate-sway inline-block">🎪</span>
                <span className="fair-logo">היריד הגדול</span>
            </NavLink>

            {currentRole === "ADMIN" && <NavLink to="/admin" className="flex items-center gap-2">
                <span className="text-2xl animate-sway inline-block">🎪</span>
                <span className="fair-logo">ניהול היריד</span>
            </NavLink>}

            <Nav links={links} className="flex items-center gap-1" linkClassName="fair-nav-link" />
            <p>לחצו על הקונים כדי להכיר</p>
            {currentRole != "Guest" && <div className="ms-auto flex items-center gap-3">
                <p className="fair-user-chip">
                    <span className="fair-avatar">{user?.displayName?.[0] ?? "★"}</span>
                    <span className="hidden sm:inline">{user?.displayName}</span>
                </p>
                <button onClick={() => { logout(); navigate("/") }} className="fair-btn fair-btn-wood fair-btn-sm">יציאה</button>
            </div>}
        </header>
    </>
}

export default Header
