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

    if (error) return <p className="fair-note fair-note-error mx-auto mt-10 w-fit">שגיאה בטעינת הסוחרים</p>

    return<>
    <section dir="rtl" className="mx-auto max-w-6xl px-4 pb-16">
        <p className="fair-kicker text-center">ניהול היריד</p>
        <h1 className="fair-banner mb-4">הסוחרים שלנו</h1>
        <p className="mb-10 text-center"><span className="fair-chip">{data.items.length} סוחרים ביריד</span></p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {data.items.map((m:MerchantType)=>
    {

        return <Merchant merchant={m} key={m.id}/>
    })}
        </div>
    </section>
    </>
}