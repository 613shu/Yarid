import type { BoothType, decorationType, stallProps } from "../../typs/gameTyps"
import { useWorld } from "../../context/WorldContext"
import { useState } from "react";
import { Booth } from "../World/Booth";
import { slotPlacement } from "../World/positions";
export const Stall = ({ stall }: stallProps) => {
    
    const { slotOf, setSelectId, selectedId } = useWorld();
    const p = slotPlacement(slotOf(stall));
    const [isHovered, setIsHovered] = useState(false);


    const booth: BoothType = {
        name: `דוכן ${stall.name}`,
        goods: stall.product?.name ?? "",
        price: stall.price,
        decorations: (stall.decorations ?? []).map((d: decorationType) => d.name),
        hot: isHovered,
        selected: selectedId === stall.id,
        onSelect: () => setSelectId(stall.id),
        onHover: (s: boolean) => setIsHovered(s),
    };

    return (
        <group position={[p.x, 0, p.z]} rotation={[0, p.rotY, 0]}>
            <Booth booth={booth} />
        </group>
    );
};