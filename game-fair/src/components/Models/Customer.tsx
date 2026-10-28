import { useEffect, useState } from "react";
import type { customerProps } from "../../typs/gameTyps";
import { randBetween } from "../../utils/random";
import { useWorld } from "../../context/WorldContext";
import { frontOf, slotPlacement } from "../World/positions";
import { Shopper } from "../World/Shopper";

/* טבעות ההליכה: הכיכר, השביל בין שתי שורות הדוכנים, והשוליים שמחוץ לשורה החיצונית */
const WALK_RINGS = [[7, 13], [20.5, 23.5], [30, 32]];

/* נקודה אקראית באחת מטבעות ההליכה */
const randomSpot = () => {
    const ring = WALK_RINGS[Math.floor(Math.random() * WALK_RINGS.length)];
    const a = Math.random() * Math.PI * 2;
    const r = randBetween(ring[0], ring[1]);
    return { x: Math.sin(a) * r, z: Math.cos(a) * r };
};

/* לקוח וירטואלי: מסתובב ביריד ומדי פעם ניגש לדוכן שהוא רוצה לקנות בו */
export const Customer = ({ customer }: customerProps) => {
    const { targetStallId, targetStallIds, purchases} = customer;
    const { stalls, slotOf } = useWorld();
    const { setClickedWakerId } = useWorld();
    const [stepMs] = useState(() => Math.round(randBetween(3000, 6000)));
    const [tick, setTick] = useState(0);
    const [target, setTarget] = useState(() => randomSpot());

    useEffect(() => {
        const intervalId = setInterval(() => { setTick((t) => t + 1) }, stepMs);
        return () => { clearInterval(intervalId); };
    }, [stepMs])

    // רשימת הדוכנים שהלקוח מעוניין בהם
 const wanted = stalls.filter((s) => targetStallIds.includes(s.id));

    // בכל "צעד": פעם אחת לדוכן מבוקש, פעם אחת שיטוט
    const goingToStall = wanted.length > 0 && tick % 2 === 1;
    // יעד חדש רק כשה-tick מתקדם (ולא בכל רינדור)
    useEffect(() => {
        if (goingToStall) {
            const s = wanted[Math.floor(tick / 2) % wanted.length];
            const f = frontOf(slotPlacement(slotOf(s)), 2.8);
            setTarget({ x: f.x + randBetween(-0.8, 0.8), z: f.z + randBetween(-0.8, 0.8) });
        } else {
            setTarget(randomSpot());
        }
    }, [tick]); // eslint-disable-line react-hooks/exhaustive-deps
    return <>
        <Shopper
            customer={customer}
            target={target}
            buying={goingToStall && purchases.length > 0}
            onSelect={setClickedWakerId}
        /></>
};
