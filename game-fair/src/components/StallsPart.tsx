import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axiosInstance";
import { Stall } from "../components/Stall"
import { AuthContext } from "../context/AuthContext";
import type { stallType } from "../typs/gameTyps";
import { useWorld } from "./world/WorldContext";
import { EmptyPlot } from "./world/Booth";
import { INNER_SLOTS, slotPlacement } from "./world/layout";

export const StallPart = () => {
    const { token } = useContext(AuthContext);
    const { setStalls } = useWorld();
    const navigate = useNavigate();

    const sort = "slot";

    const getMyStalls = async () => {
        const res = await api.get("/stalls/mine", { params: { sort } });
        return res.data;
    }

    const { data: myStalls = [] } = useQuery<stallType[]>({
        queryKey: ["stall", token],
        queryFn: getMyStalls,
        enabled: !!token
    })

    // משתפים את רשימת הדוכנים עם שכבת הממשק ועם הלקוחות
    useEffect(() => { setStalls(myStalls) }, [myStalls, setStalls]);

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
