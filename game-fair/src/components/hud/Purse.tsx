import { useEffect, useRef, useState } from "react";
import { useBalance } from "../../hooks/useBalance";

/* ארנק עם מונה שמתגלגל לערך החדש */
export const Purse = () => {
    const { balance } = useBalance();
    const [shown, setShown] = useState(balance);


    useEffect(() => {
        setShown(balance)
    }, [balance]);

    return (
        <div className="hud-purse fair-glass">
            <span className="hud-coin">₽</span>
            <div className="leading-tight">
                <div className="text-xs text-parchment/60">הקופה שלך</div>
                <div className="text-2xl">{shown} <span className="text-sm text-parchment/70">רובל</span></div>
            </div>
        </div>
    );
};
