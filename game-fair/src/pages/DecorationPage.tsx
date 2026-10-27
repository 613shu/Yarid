import { Loader } from "../components/hud/Loader"
import Link from "../components/System/Link";
import { Decoration } from "../components/Models/Decoration";
import { useStall } from "../context/StallContext";
import { useMyQuery } from "../hooks/useMyQuery";
import type { decorationProps, decorationSectionProps, decorationType, updateDecorationForStallProps, updateDecorationsForStallType } from "../typs/gameTyps";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../api/axiosInstance";
import { useAddDecoration } from "../hooks/useAddDecoration";
import { useWorld } from "../context/WorldContext";
import { useState } from "react";









export const DacorationSection = (({ isEdit, onClose }: decorationSectionProps) => {
  const { step, setStep, decorations, setDecorations, stallId } = useStall();
  const { stalls } = useWorld();
  const sort = "name";
  const { addDecorations } = useAddDecoration();
  const [saveError, setSaveError] = useState<boolean>(false);


  const { data: decos = [], isLoading, error } = useMyQuery(
    { queryValues: { queryKey: ["decorations"], url: "/decorations", params: { sort } } })

  const stall = stalls.find((s) => s.id === stallId);
  let oldDecos: decorationType[] = [];
  if (stall) { oldDecos = stall.decorations; }

  const isOld = (d: decorationType) => { return oldDecos.some((o) => o.id === d.id); }
  const saveChanges = async () => {
    const newDecos = decorations.filter((d) => !isOld(d));
    try {
      await addDecorations(newDecos, stallId);
      setStep("UPDATE");
    } catch {
      setSaveError(true);
    }
  }

  if (step === "UPDATE") {
    return <div className="fair-panel mx-auto mt-24 w-fit text-center border-2! border-teal! px-12! py-10! shadow-[0_0_80px_-12px_rgb(31_181_164_/_0.75)]">
      <h1 className="fair-title fair-shimmer-text text-4xl">✨ השינויים נשמרו בהצלחה ✨</h1>
      <button onClick={onClose} className="fair-btn fair-btn-gold mt-6">חזרה ליריד</button>
    </div>
  }

  if (isLoading)
    return <>
      <Loader text="טוען קישוטים..." />
    </>
  if (error)
    return <h1 className="fair-panel mx-auto mt-24 w-fit max-w-md border-2! border-danger/70! text-center font-display text-3xl text-danger shadow-[0_0_60px_-12px_rgb(255_143_143_/_0.65)]">⚠️ שגיאה בטעינת הקישוטים</h1>

  const completeDecorate = () => {
    setStep("PRICE");

  }

  return (
    <>
      <main dir="rtl" className="px-6 pt-10 pb-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="fair-banner mb-16">הקישוטים שלנו</h1>

          <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {decos.map((d: decorationType) => (
              <Decoration key={d.id} decoration={d} locked={isOld(d)} />
            ))}
          </section>
        </div>
      </main>
      {step === "CONFIRMDECORATE" && !isEdit && <button onClick={completeDecorate} className="fair-btn fair-btn-gold sticky bottom-6 z-40 mx-auto mb-12 flex! w-fit">המשך לקביעת מחיר ←</button>}
      {step === "CONFIRMDECORATE" && isEdit && <div className="sticky bottom-6 z-40 mx-auto mb-12 flex w-fit flex-col items-center gap-3">
        <div className="flex gap-3">
          <button onClick={saveChanges} className="fair-btn fair-btn-gold">💾 שמירת השינויים</button>
          <button onClick={onClose} className="fair-btn fair-btn-wood">ביטול</button>
        </div>
        { saveError && <p className="fair-note fair-note-error border-2! border-danger/70! px-6! py-3! text-lg shadow-[0_0_40px_-10px_rgb(255_143_143_/_0.6)]">⚠️ השמירה נכשלה — אולי אין מספיק רובלים בקופה</p> }
      </div>}

    </>
  );
}
)

export const DecorationPage = () => {

  return <>
    <DacorationSection />

  </>
}
