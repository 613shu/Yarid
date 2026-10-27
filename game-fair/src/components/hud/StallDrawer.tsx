import { useWorld } from "../world/WorldContext";
import type { decorationType } from "../../typs/gameTyps";

/* כרטיס פרטים שנפתח כשלוחצים על דוכן ביריד */
export const StallDrawer = () => {
    const { stalls, selectedId, select } = useWorld();
    const stall = stalls.find((s) => s.id === selectedId);
    if (!stall) return null;

    const stats: [string, string | number][] = [
        ["מחיר ליחידה", `${stall.price} ₪`],
        ["במלאי", stall.stock ?? "—"],
        ["נמכרו היום", stall.sales?.todayUnits ?? 0],
        ["הכנסות היום", `${stall.sales?.todayRevenue ?? 0} ₪`],
        ["סה״כ נמכרו", stall.sales?.totalUnits ?? 0],
        ["ניקוד", stall.score ?? 0],
    ];

    return (
        <aside key={stall.id} dir="rtl" className="hud-drawer fair-glass pointer-events-auto absolute bottom-20 left-5 w-[min(22rem,calc(100vw-2.5rem))]">
            <div className="fair-stripe h-7" />
            <div className="p-5 pt-3">
                <div className="mb-1 flex items-start justify-between gap-3">
                    <div>
                        <p className="fair-kicker">דוכן מס׳ {stall.slotNumber ?? stall.id}</p>
                        <h3 className="fair-title text-2xl">{stall.name}</h3>
                    </div>
                    <button onClick={() => select(null)} aria-label="סגירה" className="fair-btn fair-btn-ghost fair-btn-sm">✕</button>
                </div>
                <p className="mb-4 text-parchment/80">🛍️ {stall.product?.name}</p>

                <div className="grid grid-cols-3 gap-2">
                    {stats.map(([label, value]) => (
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
            </div>
        </aside>
    );
};
