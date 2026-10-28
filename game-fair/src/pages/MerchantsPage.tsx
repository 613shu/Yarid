import { Merchant } from "../components/Models/Merchant"
import { useMyQuery } from "../hooks/useMyQuery"
import { Loader } from "../components/hud/Loader"
import type { MerchantType } from "../typs/userType"

export const MerchantsPage=()=>
{
        const { data, error, isLoading } = useMyQuery({
        queryValues: {
            queryKey: ["merchants"],
            url: "/admin/merchants"
        }

    })


    if (isLoading) return <Loader text="טוענים סוחרים..." />

    if (error) return <p>שגיאה בטעינת הסוחרים</p>

    return<>
    {data.items.map((m:MerchantType)=>
    {

        return <Merchant merchant={m} key={m.id}/>
    })}
    </>
}