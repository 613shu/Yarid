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


export const useAddDecoration = () => {
    const queryClient = useQueryClient();


    const decoMutation = useMutation({
        mutationFn: ({ stallId, decoration }: { stallId: number, decoration: decorationType }) =>
            api.post(`/stalls/${stallId}/decorations`, { decorationId: decoration.id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            queryClient.invalidateQueries({ queryKey: ["stall"] });
        },

    });

    const addDecorations = (decorations: decorationType[], stallId: number) =>
        Promise.all(
            decorations.map((d: decorationType) => decoMutation.mutateAsync({ stallId, decoration: d }))
        )
    return { addDecorations, ...decoMutation }

}


