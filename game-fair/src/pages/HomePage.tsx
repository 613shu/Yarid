import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "../components/Link";

/* מסך הפתיחה */
const FEATURES = [
    { icon: "🏪", title: "פתחו דוכן", text: "בחרו שם, מוצר ומחיר — והדוכן שלכם עומד בכיכר." },
    { icon: "🏮", title: "קשטו בגדול", text: "פנסים, דגלונים ובלונים מושכים יותר קונים." },
    { icon: "🧺", title: "קונים חיים", text: "לקוחות וירטואליים מסתובבים ביריד ובוחרים איפה לקנות." },
    { icon: "🏆", title: "התחרו", text: "צברו רובלים וניקוד והפכו לגביר של היריד." },
];

export const HomePage = () => {
    const { currentRole } = useContext(AuthContext);
    const guest = currentRole === "Guest";

    return (
        <main dir="rtl" className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-6 py-16 text-center">
            <p className="fair-kicker mb-4 animate-rise">✦ היריד פתוח כל הלילה ✦</p>
            <h1 className="fair-title animate-rise text-6xl leading-[1.05] md:text-8xl">
                ברוכים הבאים<br /><span className="fair-shimmer-text">ליריד הלילה</span>
            </h1>
            <p className="mt-6 max-w-xl animate-rise text-lg text-parchment/80 md:text-xl">
                עולם תלת-ממדי קסום של אורות, מוזיקה וריח של ממתקים. פתחו דוכן, קשטו אותו ותנו לקונים להגיע.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4 animate-rise">
                {guest ? <>
                    <Link to="/register" content="🎟️ לכרטיס כניסה חינם" className="fair-btn fair-btn-gold text-xl" />
                    <Link to="/login" content="כבר יש לי כרטיס" className="fair-btn fair-btn-ghost text-xl" />
                </> : <Link to="/game" content="🎪 כניסה ליריד" className="fair-btn fair-btn-gold text-xl" />}
            </div>

            <section className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {FEATURES.map((f, i) => (
                    <div key={f.title} className="fair-ornament text-right" style={{ animationDelay: `${0.15 * i + 0.3}s` }}>
                        <span className="inline-block text-4xl animate-float" style={{ animationDelay: `${i * 0.6}s` }}>{f.icon}</span>
                        <h3 className="fair-title mt-2 text-xl">{f.title}</h3>
                        <p className="mt-1 text-sm text-parchment/70">{f.text}</p>
                    </div>
                ))}
            </section>
        </main>
    );
};
