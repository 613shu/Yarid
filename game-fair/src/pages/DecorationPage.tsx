import { Loader } from "../components/hud/Loader"
import Link from "../components/Link";
import { Decoration } from "../components/Decoration";
import { useStall } from "../context/StallContext";
import { useMyQuery } from "../hooks/apiHooks";
import type { decorationProps, decorationType, updateDecorationForStallProps, updateDecorationsForStallType } from "../typs/gameTyps";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axiosInstance";









export const DacorationSection = () => {
  const { step, setStep } = useStall();
  const sort = "name";

  const { data: products = [], isLoading, error } = useMyQuery(
    { queryValues: { queryKey: ["decorations"], url: "/decorations", params: { sort } } })



  if (isLoading)
    return <>
      <Loader text="טוען קישוטים..." />
    </>
  if (error)
    return <h1 className="fair-note fair-note-error mt-20 text-xl">שגיאה בטעינת הקישוטים</h1>

  const completeDecorate = () => {
    setStep("PRICE");

  }

  return (
    <>
      <main dir="rtl" className="px-6 pt-10 pb-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="fair-banner mb-16">הקישוטים שלנו</h1>

          <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((d: decorationType) => (
              <Decoration key={d.id} decoration={d} />
            ))}
          </section>
        </div>
      </main>

      {step==="CONFIRMDECORATE"&& <button onClick={completeDecorate} className="fair-btn fair-btn-gold sticky bottom-6 z-40 mx-auto mb-12 flex! w-fit"> המשך לקביעת מחיר ←</button>}
    </>
  );
}


export const DecorationPage = () => {

  return <>
    <DacorationSection />

  </>
}
