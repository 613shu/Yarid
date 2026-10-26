import { useEffect, useState } from "react";
import { useStall } from "../context/StallContext";
import Link from "./Link";
import type { productProps } from "../typs/gameTyps";

export const Product = ({ product }: productProps) => {
    const { currentProduct, setCurrentProduct, step, setStep } = useStall();
    const [isSelected,setIsSelected]=useState<boolean>(false);

    useEffect(() => { setIsSelected(false) }, [])

    const chooseProduct = () => {
        setCurrentProduct(product);
        setIsSelected(true);
        setStep("DECORATE");


    };


    return (
        <article
            dir="rtl"
            className={`fair-crate group relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl text-right ${isSelected ? "ring-4 ring-lantern" : "ring-0"
                }`}
        >
            <div className="fair-crate-stripe h-9 w-full" />

            {isSelected && (
                <span className="absolute left-4 top-12 rounded-full bg-lantern px-3 py-1 text-xs font-bold text-wood-900 shadow-[0_0_16px_rgb(255_200_90/0.7)]">
                    ✓ נבחר
                </span>
            )}




            <div className="flex flex-1 flex-col gap-4 p-6 pt-3">
                <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full border border-wood-300/60 bg-wood-700/10 px-2.5 py-0.5 font-mono text-xs text-wood-700">
                        #{product.id}
                    </span>
                </div>

                <h2 className="font-display text-2xl leading-tight text-wood-800 transition-colors group-hover:text-awning">
                    {product.name}
                </h2>

                <div className="fair-tag mt-auto flex items-center justify-between rounded-xl px-5 py-3">
                    <span className="text-sm font-medium text-wood-700">עלות מוצר זה</span>
                    <span className="font-display text-3xl text-awning">
                        ₪{product.supplierPrice}
                    </span>
                </div>

                {step === "PRODUCT" && <button onClick={chooseProduct} className="fair-btn w-full">לבחירת מוצר</button>}
                </div>
        </article>
    );
};