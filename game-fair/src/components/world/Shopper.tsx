import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { hashHue } from "./layout";

/* לקוח וירטואלי מסוגנן (בובת עץ צבעונית) שמתהלך ביריד */

type ShopperProps = {
    name: string;
    female: boolean;
    old: boolean;
    target: { x: number; z: number };
    /** מוצג מטבע קופץ כשהלקוח מגיע ליעד */
    buying?: boolean;
};

const SPEED = 2.2;

export const Shopper = ({ name, female, old, target, buying }: ShopperProps) => {
    const root = useRef<THREE.Group>(null);
    const body = useRef<THREE.Group>(null);
    const [arrived, setArrived] = useState(false);
    const arrivedRef = useRef(false);
    const start = useMemo<[number, number, number]>(() => [target.x + (Math.random() - 0.5) * 6, 0, target.z + (Math.random() - 0.5) * 6], []); // eslint-disable-line react-hooks/exhaustive-deps

    const look = useMemo(() => {
        const h = hashHue(name);
        return {
            cloth: new THREE.Color().setHSL(h / 360, 0.6, 0.5),
            accent: new THREE.Color().setHSL(((h + 140) % 360) / 360, 0.7, 0.55),
            skin: new THREE.Color().setHSL(0.07, 0.45, 0.45 + ((h % 7) / 7) * 0.3),
            hair: old ? "#d8d8d8" : ["#2a1a10", "#6a3a1a", "#c98e52", "#1a1a1a"][h % 4],
            scale: old ? 0.92 : 1,
        };
    }, [name, old]);

    useFrame((s, delta) => {
        const g = root.current;
        if (!g) return;
        const dt = Math.min(delta, 0.05);
        const dx = target.x - g.position.x;
        const dz = target.z - g.position.z;
        const dist = Math.hypot(dx, dz);
        const moving = dist > 0.15;
        if (moving) {
            const step = Math.min(dist, SPEED * dt * (old ? 0.7 : 1));
            g.position.x += (dx / dist) * step;
            g.position.z += (dz / dist) * step;
            const want = Math.atan2(dx, dz);
            let diff = want - g.rotation.y;
            diff = Math.atan2(Math.sin(diff), Math.cos(diff));
            g.rotation.y += diff * (1 - Math.exp(-8 * dt));
        }
        if (arrivedRef.current !== !moving) {
            arrivedRef.current = !moving;
            setArrived(!moving);
        }
        if (body.current) {
            const t = s.clock.elapsedTime * 9;
            body.current.position.y = moving ? Math.abs(Math.sin(t)) * 0.12 : Math.sin(s.clock.elapsedTime * 2) * 0.02;
            body.current.rotation.z = moving ? Math.sin(t) * 0.08 : 0;
        }
    });

    return (
        <group ref={root} position={start} scale={look.scale}>
            <group ref={body}>
                {/* גוף */}
                <mesh position={[0, 0.65, 0]} castShadow>
                    {female ? <coneGeometry args={[0.42, 1.1, 12]} /> : <capsuleGeometry args={[0.28, 0.6, 4, 10]} />}
                    <meshStandardMaterial color={look.cloth} roughness={0.6} />
                </mesh>
                {/* ראש */}
                <mesh position={[0, 1.45, 0]} castShadow>
                    <sphereGeometry args={[0.25, 16, 12]} />
                    <meshStandardMaterial color={look.skin} roughness={0.7} />
                </mesh>
                {/* שיער / כובע */}
                {female ? (
                    <mesh position={[0, 1.52, -0.04]}>
                        <sphereGeometry args={[0.27, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
                        <meshStandardMaterial color={look.hair} roughness={0.8} />
                    </mesh>
                ) : (
                    <group position={[0, 1.66, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.38, 0.38, 0.04, 16]} />
                            <meshStandardMaterial color={look.accent} />
                        </mesh>
                        <mesh position={[0, 0.12, 0]}>
                            <cylinderGeometry args={[0.2, 0.22, 0.24, 14]} />
                            <meshStandardMaterial color={look.accent} />
                        </mesh>
                    </group>
                )}
                {/* סל קניות */}
                <mesh position={[0.32, 0.7, 0.12]}>
                    <cylinderGeometry args={[0.12, 0.09, 0.18, 8]} />
                    <meshStandardMaterial color="#c98e52" />
                </mesh>
            </group>
            <Html position={[0, 2.25, 0]} center distanceFactor={12} zIndexRange={[5, 0]}>
                <div dir="rtl" className="world-name">{name}</div>
            </Html>
            {arrived && buying && (
                <Html position={[0, 2.6, 0]} center distanceFactor={12} zIndexRange={[6, 0]}>
                    <div className="world-coin">+🪙</div>
                </Html>
            )}
        </group>
    );
};
