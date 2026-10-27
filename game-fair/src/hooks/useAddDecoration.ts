import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { decorationType } from "../typs/gameTyps";
import { api } from "../api/axiosInstance";

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


