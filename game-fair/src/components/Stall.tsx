import type { decorationType, stallProps } from "../typs/gameTyps"
import { Booth } from "./world/Booth"
import { slotPlacement } from "./world/layout"
import { useWorld } from "./world/WorldContext"

/* דוכן בתוך עולם התלת-ממד (חייב להיות מרונדר בתוך FairWorld) */
export const Stall = ({ stall }: stallProps) => {
    const { slotOf, select, selectedId, hover, hoveredId } = useWorld();
    const p = slotPlacement(slotOf(stall));

    return (
        <group position={[p.x, 0, p.z]} rotation={[0, p.rotY, 0]}>
            <Booth
                name={`דוכן ${stall.name}`}
                goods={stall.product?.name ?? ""}
                price={stall.price}
                decorations={(stall.decorations ?? []).map((d: decorationType) => d.name)}
                hot={hoveredId === stall.id}
                selected={selectedId === stall.id}
                onSelect={() => select(stall.id)}
                onHover={(on) => hover(on ? stall.id : null)}
            />
        </group>
    )
}
