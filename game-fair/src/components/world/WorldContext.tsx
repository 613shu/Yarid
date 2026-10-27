import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { stallType } from "../../typs/gameTyps";

/* מצב משותף בין עולם התלת-ממד לבין שכבת הממשק שמעליו */

type WorldContextType = {
    stalls: stallType[];
    setStalls: (s: stallType[]) => void;
    selectedId: number | null;
    select: (id: number | null) => void;
    hoveredId: number | null;
    hover: (id: number | null) => void;
    /** אינדקס המקום ביריד של כל דוכן */
    slotOf: (stall: stallType) => number;
};

const WorldContext = createContext<WorldContextType>({
    stalls: [],
    setStalls: () => { },
    selectedId: null,
    select: () => { },
    hoveredId: null,
    hover: () => { },
    slotOf: () => 0,
});

export const WorldProvider = ({ children }: { children: ReactNode }) => {
    const [stalls, setStalls] = useState<stallType[]>([]);
    const [selectedId, select] = useState<number | null>(null);
    const [hoveredId, hover] = useState<number | null>(null);

    const value = useMemo<WorldContextType>(() => {
        const order = new Map(stalls.map((s, i) => [s.id, i]));
        return {
            stalls, setStalls, selectedId, select, hoveredId, hover,
            slotOf: (s) => order.get(s.id) ?? 0,
        };
    }, [stalls, selectedId, hoveredId]);

    return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>;
};

export const useWorld = () => useContext(WorldContext);
