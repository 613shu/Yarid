import { Loader } from "../components/hud/Loader"
import { useQuery } from "@tanstack/react-query"
import { Product } from "../components/Product"
import { api } from "../api/axiosInstance"
import type { productType } from "../typs/gameTyps"
import { useMyQuery } from "../hooks/apiHooks"
import { useStall } from "../context/StallContext"
import Link from "../components/Link"




export const ProductSection = () => {
    const { step } = useStall();
    const sort = "name";

    const { data: products = [], isLoading, error } = useMyQuery(
        { queryValues: { queryKey: ["products"], url: "/products", params: { sort } } })



    if (isLoading)
        return <>
            <Loader text="טוען מוצרים..." />
        </>
    if (error)
        return <h1 className="fair-note fair-note-error mt-20 text-xl">שגיאה בטעינת המוצרים</h1>

    return (

        <main dir="rtl" className="px-6 pt-10 pb-16">
            <div className="mx-auto max-w-7xl">
                {step != "PRODUCT" && <h1 className="fair-banner mb-16">המוצרים שלנו</h1>}
                {step === "PRODUCT" && <h1 className="fair-banner mb-16"> בחר מוצר עבור הדוכן החדש</h1>}

                <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((p: productType) => (
                        <Product key={p.id} product={p} />
                    ))}
                </section>
            </div>
        </main>
    );
}


export const ProductPage = () => {



    return <>
        <ProductSection />

    </>


}
