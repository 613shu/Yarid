import { useMyQuery } from "./useMyQuery";

export const useProducts = () => {


    const { data: products, isLoading ,error} = useMyQuery({
        queryValues: {
            url: "/products",
            queryKey: ["products"],
            params:{sort:"name"}
        }
    });


    return { products, isLoading,error};
}