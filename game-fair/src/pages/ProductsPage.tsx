import { Loader } from "../components/hud/Loader"
import { Product } from "../components/Models/Product"
import type { productType } from "../typs/gameTyps"
import { useMyQuery } from "../hooks/useMyQuery"
import { useStall } from "../context/StallContext"
import { useProducts } from "../hooks/useProducts"
import { useState, type ChangeEvent } from "react"
import type { sortByType } from "../typs/userType"




export const ProductSection = () => {
    const { step } = useStall();
    const { products, isLoading, error, setSortBy, sortBy } = useProducts();



    if (isLoading)
        return <>
            <Loader text="טוען מוצרים..." />
        </>
    if (error)
        return <h1 className="fair-note fair-note-error mt-20 text-xl">שגיאה בטעינת המוצרים</h1>

    return <>
     <div className="fair-glass mx-auto mb-6 flex w-fit items-center gap-3 rounded-2xl px-5 py-3">
        <label htmlFor="productSortBy" className="text-sm font-bold text-amber-200">
            ↕️ מיין לפי
        </label>
        <select
            name="productSortBy"
            id="productSortBy"
            value={sortBy}
            onChange={(e:ChangeEvent<HTMLSelectElement>)=>{setSortBy(e.target.value as sortByType)}}
            className="cursor-pointer rounded-xl border border-amber-500/40 bg-stone-900/70 px-4 py-2 text-amber-100 shadow-inner outline-none transition hover:border-amber-400 focus:border-amber-300 focus:ring-2 focus:ring-amber-400/40"
        >
            <option value="name">שם</option>
            <option value="popularity">פופולריות</option>
            <option value="price">מחיר</option>
        </select>
    </div>

        <main dir="rtl" className="px-6 pt-10 pb-16">
            <div className="mx-auto max-w-7xl">
                {step != "PRODUCT" && <h1 className="fair-banner mb-16">המוצרים שלנו</h1>}
                {step === "PRODUCT" && <h1 className="fair-banner mb-16">
                    בחר מוצר עבור הדוכן החדש
                    <p>שימו לב: בחירת מוצר אינה מזכה אתכם במלאי. יש לרכוש מלאי בנפרד</p>
                </h1>}

                <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((p: productType) => (
                        <Product key={p.id} product={p} />
                    ))}
                </section>
            </div>
        </main>
    </>
}


export const ProductPage = () => {


    return <>
        <ProductSection />

    </>


}
