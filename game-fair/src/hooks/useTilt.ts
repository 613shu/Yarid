import { useCallback, useRef, type PointerEvent } from "react";

/* הטיית כרטיס בתלת-ממד לפי תנועת העכבר */
export const useTilt = (max = 10) => {
    const ref = useRef<HTMLElement | null>(null);

    const onPointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
        el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        el.style.setProperty("--glare", "1");
    }, [max]);

    const onPointerLeave = useCallback((e: PointerEvent<HTMLElement>) => {
        const el = e.currentTarget;
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--glare", "0");
    }, []);

    return { ref, onPointerMove, onPointerLeave };
};
