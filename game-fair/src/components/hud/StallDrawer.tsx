import { useEffect, useState } from "react";
import { useWorld } from "../../context/WorldContext";
import type { decorationType } from "../../typs/gameTyps";
import { StockPage } from "../../pages/StockPage";
import { DacorationSection, DecorationPage } from "../../pages/DecorationPage";
import { useNavigate } from "react-router";
import { useStall } from "../../context/StallContext";
import { AddStallPage } from "../../pages/AddStallPage";

/* כרטיס פרטים שנפתח כשלוחצים על דוכן ביריד */
export const StallDrawer = () => {
    const [addStock, setAddStock] = useState<boolean>(false);
    const [editDecorations, setEditDecorations] = useState<boolean>(false);
    const { stalls, selectedId, setSelectId } = useWorld();
    const stall = stalls.find((s) => s.id === selectedId);
    const navigate = useNavigate();
    const { setStep, setDecorations, setStallId } = useStall();

    useEffect(() => {
        setAddStock(false);
        setEditDecorations(false);
    }, [selectedId]);

const closeEditDecorations = () => {
    setStep("NAME");          // הערך ההתחלתי של step, כמו שמוגדר ב-StallContext
    setDecorations([]);
    setStallId(-1);
    setEditDecorations(false);
};

    if (!stall) return null;
    const openEditDecorations = () => {
        setStallId(stall.id);
        setDecorations(stall.decorations);   // הקישוטים שכבר יש לדוכן
        setStep("CONFIRMDECORATE");
        setEditDecorations(true);
    }

    if (editDecorations) {
        return <div className="pointer-events-auto fair-glass absolute inset-0 overflow-y-auto">
            <DacorationSection isEdit={true} onClose={closeEditDecorations} />
        </div>
    }

    const boothCardDetails: [string, string | number][] = [
        ["מחיר ליחידה", `${stall.price} ₪`],
        ["במלאי", stall.stock ?? "—"],
        ["נמכרו היום", stall.sales?.todayUnits ?? 0],
        ["סה״כ נמכרו", stall.sales?.totalUnits ?? 0],

    ];

    return <>
        < aside key={stall.id} dir="rtl" className="hud-drawer fair-glass pointer-events-auto absolute bottom-20 left-5 w-[min(22rem,calc(100vw-2.5rem))]" >
            <div className="fair-stripe h-7" />
            <div className="p-5 pt-3">
                <div className="mb-1 flex items-start justify-between gap-3">
                    <div>
                        <p className="fair-kicker">דוכן מס׳ {stall.slotNumber ?? stall.id}</p>
                        <h3 className="fair-title text-2xl">{stall.name}</h3>
                    </div>
                    <button onClick={() => setSelectId(null)} aria-label="סגירה" className="fair-btn fair-btn-ghost fair-btn-sm">✕</button>
                </div>
                <p className="mb-4 text-parchment/80">🛍️ {stall.product?.name}</p>

                <button onClick={() => setAddStock(true)} className="fair-btn fair-btn-ghost fair-btn-sm mt-3">רכישת מלאי</button>
                <button onClick={openEditDecorations} className="fair-btn fair-btn-ghost fair-btn-sm mt-3">עריכת קישוטים</button>

                {addStock ?
                    (
                        <>
                            <StockPage stallId={stall.id} />
                            <button onClick={() => setAddStock(false)} className="fair-btn fair-btn-ghost fair-btn-sm mt-3">חזרה</button>
                        </>
                    ) : (
                        <>

                            <div className="grid grid-cols-3 gap-2">
                                {boothCardDetails.map(([label, value]) => (
                                    <div key={label} className="fair-stat">
                                        <span className="text-[0.7rem] text-parchment/60">{label}</span>
                                        <span className="font-display text-lg text-lantern">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {stall.decorations?.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {stall.decorations.map((d: decorationType) => (
                                        <span key={d.id} className="fair-chip">🎏 {d.name}</span>
                                    ))}
                                </div>
                            )}
                            {stall.status === "SUSPENDED" && (
                                <p className="fair-note fair-note-error mt-4 text-sm">הדוכן מושעה{stall.suspensionReason ? `: ${stall.suspensionReason}` : ""}</p>
                            )}
                        </>
                    )}
            </div>
        </aside >
    </>
};
