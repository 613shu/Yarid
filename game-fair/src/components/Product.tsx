import { useEffect, useState } from "react";
import { useStall } from "../context/StallContext";
import type { productProps } from "../typs/gameTyps";
import { useTilt } from "../hooks/useTilt";

const GENDER: Record<string, string> = { MALE: "גברים", FEMALE: "נשים", ANY: "כולם" };
const AGE: Record<string, string> = { YOUNG: "צעירים", OLD: "מבוגרים", ANY: "כל הגילאים" };

export const Product = ({ product }: productProps) => {
    const { setCurrentProduct, step, setStep } = useStall();
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const tilt = useTilt(8);

    useEffect(() => { setIsSelected(false) }, [])

    const chooseProduct = () => {
        setCurrentProduct(product);
        setIsSelected(true);
        setStep("DECORATE");
    };

    return (
        <article
            dir="rtl"
            onPointerMove={tilt.onPointerMove}
            onPointerLeave={tilt.onPointerLeave}
            className={`fair-crate tilt-card group mx-auto flex w-full max-w-sm flex-col text-right ${isSelected ? "fair-crate-selected" : ""}`}
        >
            <div className="fair-stripe h-10 w-full" />

            {isSelected && <span className="selected-badge top-12!">✓ נבחר</span>}

            <div className="flex flex-1 flex-col gap-4 p-6 pt-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="fair-chip fair-chip-wood">#{product.id}</span>
                    {product.category?.name && <span className="fair-chip fair-chip-wood">{product.category.name}</span>}
                    {product.targetGender && <span className="fair-chip fair-chip-wood">👥 {GENDER[product.targetGender] ?? product.targetGender}</span>}
                    {product.targetAge && <span className="fair-chip fair-chip-wood">🎂 {AGE[product.targetAge] ?? product.targetAge}</span>}
                </div>

                <h2 className="tilt-pop font-display text-3xl leading-tight transition-colors group-hover:text-awning">
                    {product.name}
                </h2>

                {product.popularity !== undefined && (
                    <div>
                        <div className="mb-1 flex justify-between text-xs"><span>פופולריות</span><span>{product.popularity}</span></div>
                        <div className="h-2 overflow-hidden rounded-full bg-wood-700/15">
                            <div className="h-full rounded-full bg-linear-to-l from-awning to-lantern" style={{ width: `${Math.min(100, Number(product.popularity))}%` }} />
                        </div>
                    </div>
                )}

                <div className="fair-price-tag mt-auto">
                    <span className="text-sm font-medium">מחיר ספק</span>
                    <span className="font-display text-3xl text-awning">₪{product.supplierPrice}</span>
                </div>

                {step === "PRODUCT" && <button onClick={chooseProduct} className="fair-btn w-full">בחירת המוצר הזה</button>}
            </div>
        </article>
    );
};
