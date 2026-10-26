import { StallPart } from "../components/StallsPart";
import { SideBar } from "../components/SideBar";
import { sideBarLinks } from "../constance/navLinks";
import { useBalance } from "../hooks/useBalance";
import { CustomersLayout } from "../components/CustomersLayout";

const GamePage = () => {
    const { balance } = useBalance();

    return <>
        <div dir="rtl" className="flex min-h-[calc(100vh-72px)]">
            <SideBar links={sideBarLinks} />
            <h3 className="fair-purse fixed bottom-6 left-6 z-40 flex items-center gap-3 rounded-full py-2 ps-2 pe-6 text-lg text-lantern-soft">יש לך {balance} רובלים</h3>

            <main className="fair-street flex flex-1 flex-wrap content-start justify-center gap-x-14 gap-y-28 px-10">
                <StallPart />
                <CustomersLayout/>
            </main>
        </div>

    </>
}
export default GamePage
