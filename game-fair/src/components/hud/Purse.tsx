import { useEffect, useRef, useState } from "react";

/* ארנק עם מונה שמתגלגל לערך החדש */
export const Purse = ({ balance }: { balance: number }) => {
    const [shown, setShown] = useState(0);
    const from = useRef(0);

    useEffect(() => {
        const start = performance.now();
        const a = from.current;
        const b = Number(balance) || 0;
        let raf = 0;
        const step = (now: number) => {
            const t = Math.min(1, (now - start) / 900);
            const eased = 1 - Math.pow(1 - t, 3);
            const v = Math.round(a + (b - a) * eased);
            setShown(v);
            from.current = v;
            if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [balance]);

    return (
        <div className="hud-purse fair-glass">
            <span className="hud-coin">₽</span>
            <div className="leading-tight">
                <div className="text-xs text-parchment/60">הקופה שלך</div>
                <div className="text-2xl">{shown.toLocaleString("he-IL")} <span className="text-sm text-parchment/70">רובל</span></div>
            </div>
        </div>
    );
};
