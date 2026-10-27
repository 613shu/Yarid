import { useEffect, useMemo, useState } from "react";
import type { customerProps } from "../../typs/gameTyps";
import { randBetween } from "../../utils/random";
import { useWorld } from "../../context/WorldContext";
import { frontOf, slotPlacement } from "../World/positions";
import { Shopper } from "../World/Shopper";

/* נקודה אקראית בכיכר — בין הקרוסלה לדוכנים */
const randomSpot = () => {
    const a = Math.random() * Math.PI * 2;
    const r = randBetween(7, 14);
    return { x: Math.sin(a) * r, z: Math.cos(a) * r };
};

/* לקוח וירטואלי: מסתובב ביריד ומדי פעם ניגש לדוכן שהוא רוצה לקנות בו */
export const Customer = ({ customer }: customerProps) => {
    const { targetStallId, targetStallIds, purchases} = customer;
    const { stalls, slotOf } = useWorld();
    const { setClickedWakerId } = useWorld();
    const [stepMs] = useState(() => Math.round(randBetween(3000, 6000)));
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => { setTick((t) => t + 1) }, stepMs);
        return () => { clearInterval(intervalId); };
    }, [stepMs])

    // רשימת הדוכנים שהלקוח מעוניין בהם
 const wanted = stalls.filter((s) => targetStallIds.includes(s.id));

    // בכל "צעד": פעם אחת לדוכן מבוקש, פעם אחת שיטוט
    const goingToStall = wanted.length > 0 && tick % 2 === 1;
    const target = useMemo(() => {
        if (goingToStall) {
            const s = wanted[Math.floor(tick / 2) % wanted.length];
            const f = frontOf(slotPlacement(slotOf(s)), 2.8);
            return { x: f.x + randBetween(-0.8, 0.8), z: f.z + randBetween(-0.8, 0.8) };
        }
        return randomSpot();
    }, [tick, goingToStall, wanted, slotOf]);
    return <>
        <Shopper
            customer={customer}
            target={target}
            buying={goingToStall && purchases.length > 0}
            onSelect={setClickedWakerId}
        /></>
};
