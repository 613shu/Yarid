import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Stall } from "./Models/Stall"
import { AuthContext } from "../context/AuthContext";
import type { stallType } from "../typs/gameTyps";
import { useWorld } from "../context/WorldContext";
import { useMyQuery } from "../hooks/useMyQuery";
import { INNER_SLOTS, slotPlacement } from "./World/positions";
import { EmptyPlot } from "./World/Booth";

export const StallPart = () => {
    const { token } = useContext(AuthContext);
    const { setStalls } = useWorld();
    const navigate = useNavigate();
    const sort = "slot";

    const { data } = useMyQuery(
        {
            queryValues: {

                queryKey: ["stall", token || ""],
                url: "/stalls/mine",
                params: { sort }

            }
        }
    )

    // משתפים את רשימת הדוכנים עם שכבת הממשק ועם הלקוחות
    useEffect(() => {
        if (data) {
            setStalls(data);
        }
    }, [data]);

    let myStalls: stallType[] = [];
    if (data) {
        myStalls = data;
    }

    // מקומות פנויים בטבעת הפנימית
    const free = Array.from({ length: Math.max(0, INNER_SLOTS - myStalls.length) }, (_, i) => myStalls.length + i);

    return <>
        {myStalls.map((s: stallType) => (
            <Stall key={s.id} stall={s} />
        ))}
        {free.map((i) => {
            const p = slotPlacement(i);
            return (
                <group key={`free-${i}`} position={[p.x, 0, p.z]} rotation={[0, p.rotY, 0]}>
                    <EmptyPlot onOpen={() => navigate("/game/addStall")} />
                </group>
            );
        })}
    </>
}
