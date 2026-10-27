import { Purse } from "./Purse";
import { StallDrawer } from "./StallDrawer";
import { ShopperCard } from "../World/ShopperCard";
import { SideBar } from "../System/SideBar";
import { sideBarLinks } from "../../constance/navLinks";
import { useWorld } from "../../context/WorldContext";
import { useCustomers } from "../../hooks/useCustomers";

export const Hud = () => {
    const { stalls } = useWorld();
    const { customers } = useCustomers();

    return (
        <div dir="rtl" className="pointer-events-none fixed inset-0 top-[72px] z-20">
            <div className="pointer-events-auto absolute top-5 left-5 flex flex-col items-start gap-3">
                <Purse  />
                <div className="flex gap-2">
                    <span className="fair-chip fair-glass"> {stalls.length} דוכנים</span>
                    <span className="fair-chip fair-glass"> {customers.length} קונים ביריד</span>
                </div>
            </div>

            <div className="pointer-events-auto absolute top-5 right-5">
                <SideBar links={sideBarLinks} />
            </div>

            <StallDrawer />
            <div className="pointer-events-auto">
                <ShopperCard />
            </div>

            <p className="hud-hint fair-glass absolute bottom-5 left-1/2 hidden -translate-x-1/2 md:block">
                  נווטו בעזרת החיצים והעכבר או<kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
            </p>
        </div>
    );
};