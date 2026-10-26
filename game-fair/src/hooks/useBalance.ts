import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMyQuery } from "./apiHooks";

export const useBalance = () => {

    const { data: myDetails, isLoading } = useMyQuery({
        queryValues: {
            url: "/me/summary",
            queryKey: ["me", "summery"],
            refetchInterval: 10_000,
        }
    });

    let balance = 0;
    if (myDetails) {
        balance = myDetails.balance;
    }

    return { balance, isLoading };
}
