import { useWorld } from "../../context/WorldContext";
import { useCustomers } from "../../hooks/useCustomers";
import { useProducts } from "../../hooks/useProducts";
import type { customerType, productType, purchasType, salesProps, shopListType } from "../../typs/gameTyps";

export const ShopperCard = () => {
    const { stalls, clickedWakerId, setClickedWakerId } = useWorld();
    const { customers } = useCustomers();
    const { products } = useProducts();
    const customer = customers.find((c: customerType) => c.id === clickedWakerId);
    if (!customer) {return null;}
    const { nickname, ageGroup, targetStallIds, purchases, shoppingList } = customer;



    // כמה כסף הוציא בסך הכול
    let totalSpent = 0;
    purchases.forEach((p: purchasType) => {
        totalSpent += p.price;
    });

    return <>
        <aside dir="rtl" className="hud-drawer fair-glass absolute bottom-20 right-5 w-[min(20rem,calc(100vw-2.5rem))]">
            <div className="fair-stripe-teal h-7" />
            <div className="p-5 pt-3">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div>
                            <h3 className="fair-title text-2xl">{nickname}</h3>
                            <h4> גיל {ageGroup === "YOUNG" ? "צעיר" : "מבוגר"}</h4>
                        </div>
                    </div>
                    <button onClick={() => setClickedWakerId(null)} aria-label="סגירה" className="fair-btn fair-btn-ghost fair-btn-sm">✕</button>
                </div>

                /</div>
            <div className="mt-4">
                <h3>אני רוצה לקנות:</h3>
                <ul>
                    {shoppingList.map((item: shopListType) => {
                        if (products) {
                            const pro = products.find((p: productType) => p.id === item.productId);


                            return (
                                <li key={item.productId}>
                                    {pro.name} {item.purchased && "✓"}
                                </li>);
                        }

                    })}
                </ul>
            </div>




            <p className="mt-4 mb-2 text-sm text-parchment/70">קניתי בדוכנים:</p>
            {targetStallIds.length === 0 ? (
                <p className="fair-note text-sm">עדיין לא קניתי כלום בשעה הזו</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {targetStallIds.map((id: number) => {
                        const stl = stalls.find((s) => s.id === id);
                        let stallName = "דוכן שנסגר";
                        if (stl) {
                            stallName = stl.name;
                        }
                        return <span key={id} className="fair-chip"> {stallName}</span>;
                    })}
                </div>
            )}
        </aside>
    </>
};
