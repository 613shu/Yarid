import { useMyQuery } from "./apiHooks";

export const useCustomers = () => {


    const { data: fairCustomers, isLoading } = useMyQuery({
        queryValues: {
            url: "/fair/customers",
            queryKey: ["customers"],
            refetchInterval: 150000,
        }
    });

    

    return { customers: fairCustomers?.customers || [], isLoading };
}