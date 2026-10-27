import { createContext, useContext,  useState, type ReactNode } from "react";
import type { stallType } from "../typs/gameTyps";
import type {WorldContextType} from "../typs/contextTyps"



const WorldContext = createContext<WorldContextType>({
    stalls: [],
    setStalls: () => { },
    selectedId: null,
    setSelectId: () => { },
clickedWakerId:null,
setClickedWakerId:()=>{},
    slotOf: () => 0,
});

export const WorldProvider = ({ children }: { children: ReactNode }) => {
    const [stalls, setStalls] = useState<stallType[]>([]);
    const [selectedId, setSelectId] = useState<number | null>(null);
    const [clickedWakerId,setClickedWakerId]=useState<number|null>(null);

    // מחזירה את המיקום (האינדקס) של הדוכן במערך
    const slotOf = (s: stallType) => {
        const index = stalls.findIndex(x => x.id === s.id);
        return index === -1 ? 0 : index;
    };

    return (
        <WorldContext.Provider
            value={{ stalls, setStalls, selectedId, setSelectId, slotOf ,clickedWakerId,setClickedWakerId}}
        >
            {children}
        </WorldContext.Provider>
    );
};

export const useWorld = () => useContext(WorldContext);
