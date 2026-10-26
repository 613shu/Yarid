import { useContext } from "react";
import { api } from "../api/axiosInstance";
import { Stall } from "../components/Stall"
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import type { stallProps, stallType } from "../typs/gameTyps";

export const StallPart = () => {


    const { token } = useContext(AuthContext);

    const sort = "slot";

    const getMyStalls = async () => {
        const res = await api.get("/stalls/mine", { params: { sort } });
        return res.data;
    }

    const { data: myStalls=[], isError, isLoading } = useQuery({
        queryKey: ["stall", token],
        queryFn: getMyStalls,
        enabled: !!token

    })



    return <>
        {myStalls.map((s:stallType) => (
            <Stall key={s.id} stall={s} />

        ))}
        




    </>
}