import type { LinkProps } from "../typs/userType"
import { Nav } from "./Nav"

/* תפריט צף מעל היריד */
export const SideBar = ({ links }: { links: LinkProps[] }) => {
    return <>
        <aside dir="rtl" className="hud-dock fair-glass w-56">
            <h2 className="fair-title mb-1 text-center text-xl">תפריט היריד</h2>
            <Nav links={links}
                className="flex flex-col gap-2"
                linkClassName="hud-dock-link"></Nav>
        </aside>
    </>
}
