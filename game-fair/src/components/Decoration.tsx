import { useEffect, useState } from "react";
import { useStall } from "../context/StallContext";
import type { decorationProps } from "../typs/gameTyps";

export const Decoration = ({ decoration }: decorationProps) => {
    const { name, id, points, cost } = decoration;
    const { step, decorations, setDecorations } = useStall();
    const [selected,setSelected]=useState<boolean>(false);


    const toggleDeco = () => {
        if (selected) {
            setDecorations(decorations.filter((d) => d.id !== id));
            setSelected(false);
        } else {
            setDecorations([...decorations, decoration]);
            setSelected(true);
        }
    };

    return (
        <div
            dir="rtl"
            className={`fair-ornament relative w-full rounded-2xl p-5
                ${selected
                    ? "fair-ornament-selected"
                    : "cursor-default"
                }`}
        >
            {selected && (
                <span className="absolute -top-3 left-4 flex items-center gap-1 rounded-full bg-lantern px-3 py-1 text-xs font-bold text-wood-900 shadow-[0_0_18px_rgb(255_200_90/0.8)]">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                    </svg>
                    נבחר
                </span>
            )}

            <div className="mb-4 flex items-center justify-between gap-3">
                <p className={`font-display text-xl ${selected ? "text-lantern" : "text-parchment"}`}>
                    {name}
                </p>
                <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium
                        ${selected ? "bg-lantern/20 text-lantern" : "bg-white/10 text-parchment/70"}`}
                >
                    #{id}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className={`flex flex-col items-center rounded-xl border border-white/10 p-3 ${selected ? "bg-lantern/15" : "bg-white/5"}`}>
                    <span className="text-xs text-parchment/60">נקודות</span>
                    <p className="font-display text-2xl text-lantern">{points}</p>
                </div>

                <div className={`flex flex-col items-center rounded-xl border border-white/10 p-3 ${selected ? "bg-lantern/15" : "bg-white/5"}`}>
                    <span className="text-xs text-parchment/60">עלות</span>
                    <p className="font-display text-2xl text-[#ff9b7a]">₪{cost}</p>
                </div>
            </div>

            {step === "CONFIRMDECORATE" && (
                <button
                    onClick={toggleDeco}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-display text-lg
                        transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-4
                        ${selected
                            ? "border-2 border-lantern bg-transparent text-lantern hover:border-[#ff8a8a] hover:text-[#ff8a8a] focus-visible:ring-red-300/40"
                            : "border border-brass bg-gradient-to-b from-[#e5303f] to-[#8f0b21] text-parchment shadow-[0_5px_0_#5e0715] hover:brightness-110 focus-visible:ring-lantern/40"
                        }`}
                >
                    {selected ? "הסר בחירה" : "בחר את הקישוט הזה"}
                </button>
            )}
        </div>
    );
};