import { useState } from "react";
import { useStall } from "../../context/StallContext";
import type { decorationProps } from "../../typs/gameTyps";
import { useTilt } from "../../hooks/useTilt";
import { ICONS } from "../../constance/navLinks"


export const Decoration = ({ decoration,locked }: decorationProps) => {
    const { name, id, points, cost } = decoration;
    const { step, decorations, setDecorations } = useStall();
    const tilt = useTilt(8);
    const selected = decorations.some((d) => d.id === decoration.id);


    const toggleDeco = () => {
        if (selected) {
            setDecorations(decorations.filter((d) => d.id !== id));
        } else {
            setDecorations([...decorations, decoration]);
        }
    };

    return (
        <div
            dir="rtl"
            onPointerMove={tilt.onPointerMove}
            onPointerLeave={tilt.onPointerLeave}
            className={`fair-ornament tilt-card w-full ${selected ? "fair-ornament-selected" : ""}`}
        >
            {selected && <span className="selected-badge">✓ נבחר</span>}

            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="tilt-pop animate-float inline-block text-4xl">{ICONS[id % ICONS.length]}</span>
                    <p className={`font-display text-xl ${selected ? "text-lantern" : "text-parchment"}`}>{name}</p>
                </div>
                <span className="fair-chip">#{id}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="fair-stat">
                    <span className="text-xs text-parchment/60">נקודות משיכה</span>
                    <p className="font-display text-2xl text-lantern">+{points}</p>
                </div>
                <div className="fair-stat">
                    <span className="text-xs text-parchment/60">עלות</span>
                    <p className="font-display text-2xl text-rose">₪{cost}</p>
                </div>
            </div>
            { locked && <span className="fair-chip mt-4">✓ כבר בדוכן</span>}

            {step === "CONFIRMDECORATE" && !locked&&(

            <button onClick={toggleDeco} className={`fair-btn mt-4 w-full ${selected ? "fair-btn-ghost" : ""}`}>
                {selected ? "הסרת הקישוט" : "הוספה לדוכן"}
            </button>
            )}
        </div>
    );
};
