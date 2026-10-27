import { FairWorld } from "./FairWorld";
import { Booth } from "./Booth";
import { Shopper } from "./Shopper";
import { frontOf, INNER_SLOTS, slotPlacement } from "./layout";

/* עולם תצוגה מסתובב מאחורי מסכי הכניסה — דוכנים ולקוחות לדוגמה, בלי נתונים אמיתיים */

const DEMO = [
    ["דוכן הדבש", "צנצנות דבש"], ["פירות הקיץ", "אבטיחים"], ["אוצרות המזרח", "תבלינים"],
    ["הממתקייה", "סוכריות"], ["בית הקדרות", "כדי חרס"], ["פרחי הבר", "זרי פרחים"],
    ["הנפחייה", "פנסים"], ["מאפיית הכפר", "לחמניות"], ["צעצועי עץ", "סביבונים"], ["השוק הירוק", "ירקות"],
];
const NAMES = ["מרים", "יוסי", "נועה", "אבי", "שרה", "דני", "רחל", "משה"];

export default function Backdrop() {
    return (
        <FairWorld mode="showcase">
            {DEMO.slice(0, INNER_SLOTS).map(([name, goods], i) => {
                const p = slotPlacement(i);
                return (
                    <group key={name} position={[p.x, 0, p.z]} rotation={[0, p.rotY, 0]}>
                        <Booth name={name} goods={goods} decorations={Array.from({ length: (i % 3) + 1 }, () => "")} />
                    </group>
                );
            })}
            {NAMES.map((n, i) => (
                <Shopper key={n} name={n} female={i % 2 === 0} old={i % 4 === 3} target={frontOf(slotPlacement(i), 3)} />
            ))}
        </FairWorld>
    );
}
