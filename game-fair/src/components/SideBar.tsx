import type { LinkProps } from "../typs/userType"
import { Nav } from "./Nav"

export const SideBar=({links}:{links:LinkProps[]})=>
{
    return <>
    <aside dir="rtl" className="fair-sidebar sticky top-[72px] z-10 flex h-[calc(100vh-72px)] w-64 shrink-0 flex-col self-start overflow-y-auto">

        <div className="fair-crate-stripe h-10 shrink-0" />

        <h2 className="mx-4 mt-6 mb-2 border-b border-brass/40 pb-4 text-center font-display text-2xl text-lantern-soft [text-shadow:0_2px_0_#1a0c06,0_0_14px_rgb(255_200_90/0.45)]">
            תפריט היריד
        </h2>

        <Nav links={links}
            className="flex flex-col gap-3 p-4"
            linkClassName="fair-sidebar-link"></Nav>

        <p className="mt-auto p-5 text-center text-sm text-parchment/60">ברוכים הבאים ליריד הגדול</p>
    </aside>
    </>
}
