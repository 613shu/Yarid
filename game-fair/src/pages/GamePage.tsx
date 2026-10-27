import { lazy, Suspense } from "react";
import { StallPart } from "../components/StallsPart";
import { SideBar } from "../components/SideBar";
import { sideBarLinks } from "../constance/navLinks";
import { useBalance } from "../hooks/useBalance";
import { CustomersLayout } from "../components/CustomersLayout";
import { WorldProvider, useWorld } from "../components/world/WorldContext";
import { StallDrawer } from "../components/hud/StallDrawer";
import { Purse } from "../components/hud/Purse";
import { Loader } from "../components/hud/Loader";
import { useCustomers } from "../hooks/useCustomers";

const FairWorld = lazy(() => import("../components/world/FairWorld"));

const Hud = () => {
    const { balance } = useBalance();
    const { stalls } = useWorld();
    const { customers } = useCustomers();

    return (
        <div dir="rtl" className="pointer-events-none fixed inset-0 top-[72px] z-20">
            <div className="pointer-events-auto absolute top-5 left-5 flex flex-col items-start gap-3">
                <Purse balance={balance} />
                <div className="flex gap-2">
                    <span className="fair-chip fair-glass">🏪 {stalls.length} דוכנים</span>
                    <span className="fair-chip fair-glass">🧺 {customers.length} קונים ביריד</span>
                </div>
            </div>

            <div className="pointer-events-auto absolute top-5 right-5">
                <SideBar links={sideBarLinks} />
            </div>

            <StallDrawer />

            <p className="hud-hint fair-glass absolute bottom-5 left-1/2 hidden -translate-x-1/2 md:block">
                גררו כדי להסתובב · גלגלת לזום · <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> להליכה · לחצו על דוכן
            </p>
        </div>
    );
};

const GamePage = () => {
    return (
        <WorldProvider>
            <div className="fixed inset-0 z-0">
                <Suspense fallback={<Loader text="מדליקים את פנסי היריד..." />}>
                    <FairWorld mode="play">
                        <StallPart />
                        <CustomersLayout />
                    </FairWorld>
                </Suspense>
            </div>
            <Hud />
        </WorldProvider>
    );
}
export default GamePage
