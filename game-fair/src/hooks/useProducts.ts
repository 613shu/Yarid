import { useState } from "react";
import type { sortByType } from "../typs/userType";
import { useMyQuery } from "./useMyQuery";
import { keepPreviousData } from "@tanstack/react-query";

export const useProducts = () => {

    const [sortBy, setSortBy] = useState<sortByType>("name");


    const { data: products, isLoading, error } = useMyQuery({
        queryValues: {
            url: "/products",
            queryKey: ["products",sortBy],
            params: { sort: sortBy },
            placeholderData:keepPreviousData
        }
    });


    return { products, isLoading, error,setSortBy,sortBy };
}