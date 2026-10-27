import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axiosInstance";
import type { useMyQuaryProps } from "../typs/userType";
import type { decorationType, updateDecorationsForStallType } from "../typs/gameTyps";





export const useMyQuery = ({ queryValues }: useMyQuaryProps) => {
    const { url, queryKey, refetchOnWindowFocus, enabled, refetchInterval, params } = queryValues


    const myQueryFn = async () => {
        const res = await api.get(url, { params });
        return res.data;
    }

    const { data, error, isLoading } = useQuery(
        {
            queryKey: queryKey,
            queryFn: myQueryFn,
            refetchOnWindowFocus,
            enabled,
            refetchInterval


        }
    )

    return { data, error, isLoading };
}

