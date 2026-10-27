import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { decorationType } from "../typs/gameTyps";
import { api } from "../api/axiosInstance";

export const useAStock = () => {
    const queryClient = useQueryClient();


    const stockMutation = useMutation(
        {
            mutationFn: ({ stallId, quantity }: { stallId: number, quantity: number }) =>
                api.post(`/stalls/${stallId}/stock`, { quantity: quantity }),

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["me"] });
                queryClient.invalidateQueries({ queryKey: ["stall"] });
            },

        }
    );

    const addStock = async (quantity: number, stallId: number) => {
        const res = await stockMutation.mutateAsync({ stallId, quantity });
    }
    return { addStock, ...stockMutation }

}


