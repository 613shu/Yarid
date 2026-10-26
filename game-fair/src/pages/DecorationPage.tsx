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
      <h1 className="fair-note mt-28 animate-pulse text-xl">טוען קישוטים---</h1>
    </>
  if (error)
    return <h1 className="fair-note mt-28 text-xl text-[#ff9b9b]!">שגיאה בטעינת הקישוטים</h1>

  const completeDecorate = () => {
    setStep("PRICE");

  }

  return (
    <>
      <main dir="rtl" className="px-6 pt-24 pb-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="fair-banner mb-16">הקישוטים שלנו</h1>

          <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((d: decorationType) => (
              <Decoration key={d.id} decoration={d} />
            ))}
          </section>
        </div>
      </main>

      {step==="CONFIRMDECORATE"&& <button onClick={completeDecorate} className="fair-btn sticky bottom-6 z-40 mx-auto mb-12 flex! w-fit"> המשך הלאה</button>}
    </>
  );
}


export const DecorationPage = () => {

  return <>
    <DacorationSection />

  </>
}
