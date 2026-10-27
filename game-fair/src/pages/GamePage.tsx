import { lazy, Suspense } from "react";
import { StallPart } from "../components/StallsPart";
import { SideBar } from "../components/System/SideBar";
import { sideBarLinks } from "../constance/navLinks";
import { CustomersLayout } from "../components/CustomersLayout";

import { Loader } from "../components/hud/Loader";
import {Hud} from "../components/hud/Hud"

const FairWorld = lazy(() => import("../components/World/FairWorld"));



export const GamePage = () => {
    return <>
    
            <div className="fixed inset-0 z-0">
                <Suspense fallback={<Loader text="מדליקים את פנסי היריד..." />}>
                    <FairWorld mode="play">
                        <StallPart />
                        <CustomersLayout />
                    </FairWorld>
                </Suspense>
            </div>
            <Hud />
            </>
    
}
export default GamePage
