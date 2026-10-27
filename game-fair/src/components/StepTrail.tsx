import { Fragment } from "react";
import type { stepType } from "../typs/contextTyps";

const STEPS: { key: stepType[]; label: string }[] = [
    { key: ["NAME"], label: "שם" },
    { key: ["PRODUCT"], label: "מוצר" },
    { key: ["DECORATE", "CONFIRMDECORATE"], label: "קישוט" },
    { key: ["PRICE"], label: "מחיר" },
    { key: ["COMPLETE"], label: "פתיחה" },
];

/* שביל שלבים ליצירת דוכן */
export const StepTrail = ({ step }: { step: stepType }) => {
    const current = STEPS.findIndex((s) => s.key.includes(step));
    return (
        <div dir="rtl" className="step-trail mx-auto mb-4 px-4 pt-8">
            {STEPS.map((s, i) => (
                <Fragment key={s.label}>
                    {i > 0 && <span className="step-line" />}
                    <span className={`step-dot ${i < current ? "step-dot-done" : ""} ${i === current ? "step-dot-active" : ""}`}>
                        <i>{i < current ? "✓" : i + 1}</i>{s.label}
                    </span>
                </Fragment>
            ))}
        </div>
    );
};
