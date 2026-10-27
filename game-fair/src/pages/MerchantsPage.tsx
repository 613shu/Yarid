import { Merchant } from "../components/Models/Merchant"
import { useMyQuery } from "../hooks/useMyQuery"
import type { MerchantType } from "../typs/userType"

export const MerchantsPage=()=>
{
        const { data, error, isLoading } = useMyQuery({
        queryValues: {
            queryKey: ["merchants"],
            url: "/admin/merchants"
        }

    })


    return<>
    {data.items.map((m:MerchantType)=>
    {

        <Merchant merchant={m} key={m.id}/>
    })}
    </>
}