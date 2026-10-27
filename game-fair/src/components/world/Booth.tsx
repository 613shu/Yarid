import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { stripeTexture, woodTexture } from "./textures";
import { AWNING_PALETTES, hashHue } from "./positions";
import type { BoothProps } from "../../typs/gameTyps";

/* דוכן יריד תלת-ממדי: דלפק עץ, עמודים, סוכך מפוספס, שלט, סחורה וקישוטים */


const W = 3.6; // רוחב
const D = 2.2; // עומק
const H = 3.1; // גובה העמודים

export const Booth = ({booth}: BoothProps) => {
  const  { name, goods, price, decorations, hot, selected, onSelect, onHover }=booth;
  
    const group = useRef<THREE.Group>(null);
    const lantern = useRef<THREE.Mesh>(null);
    const balloons = useRef<THREE.Group>(null);
    const lift = useRef(0);

    const hue = hashHue(name + goods);
    const [colA, colB] = AWNING_PALETTES[hue % AWNING_PALETTES.length];
    const awning = useMemo(() => stripeTexture(colA, colB, 10), [colA, colB]);
    const wood = woodTexture();

    // סחורה על הדלפק — צבעים לפי שם המוצר
    const goodsItems = useMemo(() => {
        const base = hashHue(goods);
        return Array.from({ length: 9 }, (_, i) => ({
            x: -1.2 + (i % 5) * 0.6 + (i > 4 ? 0.3 : 0),
            z: i > 4 ? -0.15 : 0.25,
            y: i > 4 ? 0.28 : 0.18,
            color: new THREE.Color().setHSL(((base + i * 23) % 360) / 360, 0.75, 0.55),
            shape: (base + i) % 3,
        }));
    }, [goods]);

    useFrame((state, delta) => {
        const dt = Math.min(delta, 0.05);
        const target = hot || selected ? 0.25 : 0;
        lift.current += (target - lift.current) * (1 - Math.exp(-8 * dt));
        if (group.current) {
            group.current.position.y = lift.current;
            const s = 1 + lift.current * 0.15;
            group.current.scale.setScalar(s);
        }
        const t = state.clock.elapsedTime;
        if (lantern.current) lantern.current.rotation.z = Math.sin(t * 1.6 + hue) * 0.12;
        if (balloons.current) {
            balloons.current.children.forEach((b, i) => {
                b.position.y = H + 1.2 + Math.sin(t * 1.3 + i * 1.7) * 0.18;
                b.rotation.z = Math.sin(t + i) * 0.1;
            });
        }
    });

    const pole = (x: number, z: number, h: number) => (
        <mesh position={[x, h / 2, z]} castShadow>
            <cylinderGeometry args={[0.09, 0.11, h, 8]} />
            <meshStandardMaterial map={wood} roughness={0.85} />
        </mesh>
    );

    // פסי דגלונים לפי מספר הקישוטים
    const flags = Math.min(Math.max(decorations.length * 4, 0), 18);
    const flagColors = ["#ffc857", "#d7263d", "#1fb5a4", "#ff6f91", "#fbf1da", "#3a4799"];

    return (
        <group
            ref={group}
            onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
            onPointerOver={(e) => { e.stopPropagation(); onHover?.(true); document.body.style.cursor = "pointer"; }}
            onPointerOut={() => { onHover?.(false); document.body.style.cursor = ""; }}
        >
            {/* במה / רצפת עץ */}
            <mesh position={[0, 0.08, 0]} receiveShadow>
                <boxGeometry args={[W + 0.6, 0.16, D + 1]} />
                <meshStandardMaterial map={wood} color="#b07a4a" roughness={0.9} />
            </mesh>

            {/* דלפק */}
            <mesh position={[0, 0.65, D / 2 - 0.35]} castShadow receiveShadow>
                <boxGeometry args={[W, 1.0, 0.7]} />
                <meshStandardMaterial map={wood} roughness={0.8} />
            </mesh>
            {/* פס צבעוני על הדלפק */}
            <mesh position={[0, 0.75, D / 2 + 0.005]}>
                <planeGeometry args={[W - 0.2, 0.35]} />
                <meshStandardMaterial map={awning} roughness={0.7} />
            </mesh>
            {/* קיר אחורי */}
            <mesh position={[0, H / 2 + 0.1, -D / 2]} castShadow receiveShadow>
                <boxGeometry args={[W, H, 0.12]} />
                <meshStandardMaterial map={wood} color="#8a5a3a" roughness={0.9} />
            </mesh>

            {pole(-W / 2, D / 2, H)}
            {pole(W / 2, D / 2, H)}
            {pole(-W / 2, -D / 2, H)}
            {pole(W / 2, -D / 2, H)}

            {/* סוכך משופע */}
            <mesh position={[0, H + 0.35, 0.1]} rotation={[0.38, 0, 0]} castShadow>
                <boxGeometry args={[W + 0.5, 0.06, D + 0.9]} />
                <meshStandardMaterial map={awning} roughness={0.6} />
            </mesh>
            {/* שוליים מעוגלים לסוכך */}
            {Array.from({ length: 10 }, (_, i) => (
                <mesh key={i} position={[-W / 2 - 0.05 + (i + 0.5) * ((W + 0.5) / 10), H - 0.08, D / 2 + 0.55]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.05, 12, 1, false, 0, Math.PI]} />
                    <meshStandardMaterial color={i % 2 ? colB : colA} side={THREE.DoubleSide} />
                </mesh>
            ))}

            {/* סחורה */}
            {goodsItems.map((g, i) => (
                <mesh key={i} position={[g.x, 1.15 + g.y, D / 2 - 0.35 + g.z]} castShadow>
                    {g.shape === 0 && <sphereGeometry args={[0.2, 14, 10]} />}
                    {g.shape === 1 && <boxGeometry args={[0.32, 0.32, 0.32]} />}
                    {g.shape === 2 && <cylinderGeometry args={[0.16, 0.18, 0.4, 10]} />}
                    <meshStandardMaterial color={g.color} roughness={0.4} metalness={0.05} />
                </mesh>
            ))}

            {/* פנס תלוי */}
            <group position={[W / 2 - 0.4, H - 0.2, D / 2 + 0.2]}>
                <mesh ref={lantern} position={[0, -0.35, 0]}>
                    <sphereGeometry args={[0.2, 12, 10]} />
                    <meshStandardMaterial color="#ffd27a" emissive="#ff9a3d" emissiveIntensity={hot || selected ? 6 : 3} toneMapped={false} />
                </mesh>
            </group>

            {/* דגלונים — כל קישוט מוסיף חבל צבעוני */}
            {flags > 0 && Array.from({ length: flags }, (_, i) => {
                const t = i / (flags - 1 || 1);
                const x = -W / 2 + t * W;
                const sag = Math.sin(t * Math.PI) * 0.35;
                return (
                    <mesh key={i} position={[x, H - 0.45 - sag, D / 2 + 0.62]} rotation={[0, 0, Math.PI]}>
                        <coneGeometry args={[0.1, 0.26, 3]} />
                        <meshStandardMaterial color={flagColors[i % flagColors.length]} emissive={flagColors[i % flagColors.length]} emissiveIntensity={0.35} />
                    </mesh>
                );
            })}

            {/* בלונים מעל דוכנים מקושטים */}
            <group ref={balloons}>
                {decorations.slice(0, 4).map((_, i) => (
                    <mesh key={i} position={[-1.2 + i * 0.8, H + 1.2, -0.4]}>
                        <sphereGeometry args={[0.3, 16, 14]} />
                        <meshStandardMaterial color={flagColors[(i + 1) % flagColors.length]} roughness={0.25} metalness={0.1} emissive={flagColors[(i + 1) % flagColors.length]} emissiveIntensity={0.25} />
                    </mesh>
                ))}
            </group>

            {/* הילה זהובה כשמצביעים או בוחרים */}
            {(hot || selected) && (
                <mesh position={[0, 0.2, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[2.6, 3.1, 48]} />
                    <meshBasicMaterial color="#ffc857" transparent opacity={selected ? 0.9 : 0.5} toneMapped={false} />
                </mesh>
            )}

            {/* שלט */}
            <Html position={[0, H + 0.85, D / 2]} center distanceFactor={14} zIndexRange={[20, 0]}>
                <div dir="rtl" className={`world-sign ${hot || selected ? "world-sign-hot" : ""}`}>
                    <div className="text-lg leading-tight">{name}</div>
                    <div className="font-body text-xs opacity-80">{goods}{price !== undefined ? ` · ${price} רובל` : ""}</div>
                </div>
            </Html>
        </group>
    );
};

/* מקום פנוי ביריד — מזמין לפתוח דוכן */
export const EmptyPlot = ({ onOpen }: { onOpen?: () => void }) => {
    const ring = useRef<THREE.Mesh>(null);
    useFrame((s) => {
        if (ring.current) {
            const k = 1 + Math.sin(s.clock.elapsedTime * 2) * 0.06;
            ring.current.scale.set(k, k, 1);
        }
    });
    const wood = woodTexture();
    return (
        <group>
            <mesh ref={ring} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.8, 2.05, 40]} />
                <meshBasicMaterial color="#ffc857" transparent opacity={0.55} toneMapped={false} />
            </mesh>
            <mesh position={[0, 0.6, 0]} castShadow>
                <cylinderGeometry args={[0.07, 0.07, 1.2, 6]} />
                <meshStandardMaterial map={wood} />
            </mesh>
            <Html position={[0, 1.6, 0]} center distanceFactor={14} zIndexRange={[10, 0]}>
                <button dir="rtl" onClick={onOpen} className="world-sign world-sign-empty text-sm">
                     מקום פנוי
                </button>
            </Html>
        </group>
    );
};
