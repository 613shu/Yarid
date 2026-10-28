import { useContext } from "react"
import type { LinkProps } from "../../typs/userType"
import { Nav } from "./Nav"
import { AuthContext } from "../../context/AuthContext"


export const SideBar = ({ links }: { links: LinkProps[] }) => {
    const {currentRole}=useContext(AuthContext);
    return <>
        <aside dir="rtl" className="hud-dock fair-glass w-56">
            <h2 className="fair-title mb-1 text-center text-xl">תפריט היריד</h2>
            <Nav links={links.filter((l: LinkProps) => {
                return l.profiles?.includes(currentRole);
            })}
                className="flex flex-col gap-2"
                linkClassName="hud-dock-link"></Nav>
        </aside>
    </>
}
