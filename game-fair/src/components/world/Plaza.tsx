import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import { cobbleTexture, grassTexture, stripeTexture, woodTexture } from "./textures";
import { INNER_SLOTS, slotPlacement } from "./positions";

/* הכיכר: רצפה, קרוסלה, גלגל ענק, שרשראות אורות, עצים, פנסי שמיים וזיקוקים */

const BULB_COLORS = ["#ffd27a", "#ff8a3d", "#ff6f91", "#7fe7d8", "#fff3c4"];

export const Ground = () => {
    const cobble = cobbleTexture();
    const grass = grassTexture();
    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
                <circleGeometry args={[150, 64]} />
                <meshStandardMaterial map={grass} roughness={1} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <circleGeometry args={[33, 72]} />
                <meshStandardMaterial map={cobble} roughness={0.75} metalness={0.05} />
            </mesh>
            {/* טבעת אבן מסביב לכיכר */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <ringGeometry args={[33, 34, 72]} />
                <meshStandardMaterial color="#8a7a6a" roughness={0.9} />
            </mesh>
        </>
    );
};

export const Carousel = () => {
    const spin = useRef<THREE.Group>(null);
    const horses = useRef<THREE.Group>(null);
    const roof = useMemo(() => stripeTexture("#d7263d", "#ffe7a8", 16), []);
    const wood = woodTexture();
    const horseColors = ["#fbf1da", "#ffc857", "#1fb5a4", "#ff6f91", "#fbf1da", "#3a4799"];

    useFrame((s, delta) => {
        const dt = Math.min(delta, 0.05);
        if (spin.current) spin.current.rotation.y += dt * 0.35;
        if (horses.current) {
            horses.current.children.forEach((h, i) => {
                h.position.y = 1.5 + Math.sin(s.clock.elapsedTime * 2.2 + i * 1.1) * 0.35;
            });
        }
    });

    return (
        <group>
            <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[5, 5.3, 0.5, 40]} />
                <meshStandardMaterial map={wood} color="#c9a07a" />
            </mesh>
            <group ref={spin}>
                <mesh position={[0, 3.5, 0]} castShadow>
                    <cylinderGeometry args={[0.35, 0.35, 7, 16]} />
                    <meshStandardMaterial color="#e3b25a" metalness={0.8} roughness={0.25} />
                </mesh>
                <mesh position={[0, 7.6, 0]} castShadow>
                    <coneGeometry args={[5.6, 2.4, 16, 1]} />
                    <meshStandardMaterial map={roof} roughness={0.5} />
                </mesh>
                <mesh position={[0, 9.15, 0]}>
                    <sphereGeometry args={[0.4, 16, 12]} />
                    <meshStandardMaterial color="#ffd27a" emissive="#ffb04a" emissiveIntensity={4} toneMapped={false} />
                </mesh>
                {/* נורות סביב הגג */}
                {Array.from({ length: 24 }, (_, i) => {
                    const a = (i / 24) * Math.PI * 2;
                    return (
                        <mesh key={i} position={[Math.sin(a) * 5.45, 6.35, Math.cos(a) * 5.45]}>
                            <sphereGeometry args={[0.11, 8, 6]} />
                            <meshStandardMaterial color={BULB_COLORS[i % 5]} emissive={BULB_COLORS[i % 5]} emissiveIntensity={5} toneMapped={false} />
                        </mesh>
                    );
                })}
                <group ref={horses}>
                    {horseColors.map((c, i) => {
                        const a = (i / horseColors.length) * Math.PI * 2;
                        return (
                            <group key={i} position={[Math.sin(a) * 3.6, 1.5, Math.cos(a) * 3.6]} rotation={[0, a + Math.PI / 2, 0]}>
                                <mesh position={[0, 2, 0]}>
                                    <cylinderGeometry args={[0.05, 0.05, 5, 6]} />
                                    <meshStandardMaterial color="#e3b25a" metalness={0.9} roughness={0.2} />
                                </mesh>
                                {/* סוס מסוגנן */}
                                <mesh castShadow>
                                    <capsuleGeometry args={[0.32, 0.9, 6, 12]} />
                                    <meshStandardMaterial color={c} roughness={0.35} />
                                </mesh>
                                <mesh position={[0, 0.45, 0.6]} rotation={[0.7, 0, 0]} castShadow>
                                    <capsuleGeometry args={[0.17, 0.5, 4, 8]} />
                                    <meshStandardMaterial color={c} roughness={0.35} />
                                </mesh>
                                <mesh position={[0, 0.8, 0.85]} castShadow>
                                    <boxGeometry args={[0.26, 0.26, 0.5]} />
                                    <meshStandardMaterial color={c} roughness={0.35} />
                                </mesh>
                                <mesh position={[0, 0.32, 0]}>
                                    <boxGeometry args={[0.5, 0.08, 0.5]} />
                                    <meshStandardMaterial color="#d7263d" />
                                </mesh>
                            </group>
                        );
                    })}
                </group>
            </group>
            <pointLight position={[0, 5, 0]} intensity={40} distance={18} color="#ffb04a" />
        </group>
    );
};

export const FerrisWheel = ({ position = [0, 0, -55] as [number, number, number] }) => {
    const wheel = useRef<THREE.Group>(null);
    const cabins = useRef<THREE.Group>(null);
    const R = 11;
    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.05);
        if (wheel.current) wheel.current.rotation.z += dt * 0.12;
        if (cabins.current && wheel.current) {
            cabins.current.children.forEach((c) => { c.rotation.z = -wheel.current!.rotation.z; });
        }
    });
    return (
        <group position={position}>
            {[-1.2, 1.2].map((z) => (
                <group key={z}>
                    <mesh position={[-4, R / 2 + 0.6, z]} rotation={[0, 0, -0.33]}>
                        <boxGeometry args={[0.4, R + 3, 0.4]} />
                        <meshStandardMaterial color="#5a4a6a" />
                    </mesh>
                    <mesh position={[4, R / 2 + 0.6, z]} rotation={[0, 0, 0.33]}>
                        <boxGeometry args={[0.4, R + 3, 0.4]} />
                        <meshStandardMaterial color="#5a4a6a" />
                    </mesh>
                </group>
            ))}
            <group ref={wheel} position={[0, R + 1.5, 0]}>
                <mesh>
                    <torusGeometry args={[R, 0.18, 8, 64]} />
                    <meshStandardMaterial color="#ffd27a" emissive="#ff9a3d" emissiveIntensity={2.5} toneMapped={false} />
                </mesh>
                <mesh>
                    <torusGeometry args={[R * 0.55, 0.12, 6, 48]} />
                    <meshStandardMaterial color="#ff6f91" emissive="#ff6f91" emissiveIntensity={2} toneMapped={false} />
                </mesh>
                {Array.from({ length: 12 }, (_, i) => (
                    <mesh key={i} rotation={[0, 0, (i / 12) * Math.PI]}>
                        <boxGeometry args={[R * 2, 0.08, 0.08]} />
                        <meshStandardMaterial color="#c9b8d8" />
                    </mesh>
                ))}
                <group ref={cabins}>
                    {Array.from({ length: 12 }, (_, i) => {
                        const a = (i / 12) * Math.PI * 2;
                        return (
                            <group key={i} position={[Math.cos(a) * R, Math.sin(a) * R, 0]}>
                                <mesh position={[0, -0.9, 0]}>
                                    <boxGeometry args={[1.2, 1.1, 1.2]} />
                                    <meshStandardMaterial color={BULB_COLORS[i % 5]} emissive={BULB_COLORS[i % 5]} emissiveIntensity={0.6} />
                                </mesh>
                            </group>
                        );
                    })}
                </group>
            </group>
        </group>
    );
};

/** שרשראות נורות מהקרוסלה אל כל דוכן */
export const StringLights = () => {
    const ref = useRef<THREE.InstancedMesh>(null);
    const bulbs = useMemo(() => {
        const pts: { p: THREE.Vector3; c: THREE.Color }[] = [];
        const top = new THREE.Vector3(0, 8.6, 0);
        for (let i = 0; i < INNER_SLOTS; i++) {
            const s = slotPlacement(i);
            const end = new THREE.Vector3(s.x * 0.92, 4.6, s.z * 0.92);
            const n = 18;
            for (let k = 1; k < n; k++) {
                const t = k / n;
                const p = top.clone().lerp(end, t);
                p.y -= Math.sin(t * Math.PI) * 1.6;
                pts.push({ p, c: new THREE.Color(BULB_COLORS[(i + k) % 5]) });
            }
        }
        return pts;
    }, []);

    useLayoutEffect(() => {
        if (!ref.current) return;
        const m = new THREE.Matrix4();
        bulbs.forEach((b, i) => {
            m.makeTranslation(b.p.x, b.p.y, b.p.z);
            ref.current!.setMatrixAt(i, m);
            ref.current!.setColorAt(i, b.c.clone().multiplyScalar(5));
        });
        ref.current.instanceMatrix.needsUpdate = true;
        if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
    }, [bulbs]);

    return (
        <instancedMesh ref={ref} args={[undefined, undefined, bulbs.length]}>
            <sphereGeometry args={[0.09, 8, 6]} />
            <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
    );
};

/** יער נמוך מסביב לכיכר */
export const Trees = () => {
    const crowns = useRef<THREE.InstancedMesh>(null);
    const trunks = useRef<THREE.InstancedMesh>(null);
    const count = 70;
    useLayoutEffect(() => {
        const m = new THREE.Matrix4();
        const q = new THREE.Quaternion();
        let seed = 3;
        const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
        for (let i = 0; i < count; i++) {
            const a = (i / count) * Math.PI * 2 + rnd() * 0.08;
            const r = 38 + rnd() * 14;
            const s = 0.8 + rnd() * 0.9;
            const x = Math.sin(a) * r;
            const z = Math.cos(a) * r;
            m.compose(new THREE.Vector3(x, 3.4 * s, z), q, new THREE.Vector3(s, s, s));
            crowns.current?.setMatrixAt(i, m);
            crowns.current?.setColorAt(i, new THREE.Color().setHSL(0.36 + rnd() * 0.08, 0.45, 0.16 + rnd() * 0.08));
            m.compose(new THREE.Vector3(x, 0.8 * s, z), q, new THREE.Vector3(s, s, s));
            trunks.current?.setMatrixAt(i, m);
        }
        if (crowns.current) { crowns.current.instanceMatrix.needsUpdate = true; if (crowns.current.instanceColor) crowns.current.instanceColor.needsUpdate = true; }
        if (trunks.current) trunks.current.instanceMatrix.needsUpdate = true;
    }, []);
    return (
        <>
            <instancedMesh ref={crowns} args={[undefined, undefined, count]} castShadow>
                <coneGeometry args={[1.9, 5, 7]} />
                <meshStandardMaterial roughness={0.9} flatShading />
            </instancedMesh>
            <instancedMesh ref={trunks} args={[undefined, undefined, count]}>
                <cylinderGeometry args={[0.25, 0.35, 1.6, 6]} />
                <meshStandardMaterial color="#3a2414" />
            </instancedMesh>
        </>
    );
};

/** פנסי שמיים שעולים לאט לשמיים */
export const SkyLanterns = ({ count = 45 }) => {
    const ref = useRef<THREE.InstancedMesh>(null);
    const data = useMemo(() => Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 120,
        z: (Math.random() - 0.5) * 120 - 20,
        y: Math.random() * 60,
        speed: 0.6 + Math.random() * 0.9,
        phase: Math.random() * 10,
        s: 0.5 + Math.random() * 0.6,
    })), [count]);
    const m = useMemo(() => new THREE.Matrix4(), []);
    const q = useMemo(() => new THREE.Quaternion(), []);
    useFrame((st, delta) => {
        const dt = Math.min(delta, 0.05);
        const t = st.clock.elapsedTime;
        data.forEach((d, i) => {
            d.y += d.speed * dt;
            if (d.y > 70) d.y = 8;
            const v = new THREE.Vector3(d.x + Math.sin(t * 0.3 + d.phase) * 2, d.y, d.z);
            m.compose(v, q, new THREE.Vector3(d.s, d.s * 1.3, d.s));
            ref.current?.setMatrixAt(i, m);
        });
        if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
    });
    return (
        <instancedMesh ref={ref} args={[undefined, undefined, count]}>
            <cylinderGeometry args={[0.45, 0.32, 0.9, 8]} />
            <meshBasicMaterial color={new THREE.Color("#ff9a3d").multiplyScalar(3)} toneMapped={false} />
        </instancedMesh>
    );
};

/** זיקוקים: פרצי חלקיקים שמתפוצצים בשמיים */
const Burst = ({ delay }: { delay: number }) => {
    const N = 90;
    const pts = useRef<THREE.Points>(null);
    const state = useRef({ t: -delay, vel: new Float32Array(N * 3), origin: new THREE.Vector3() });
    const positions = useMemo(() => new Float32Array(N * 3), []);
    const mat = useRef<THREE.PointsMaterial>(null);

    const reset = () => {
        const s = state.current;
        s.t = 0;
        s.origin.set((Math.random() - 0.5) * 70, 26 + Math.random() * 14, -30 - Math.random() * 30);
        for (let i = 0; i < N; i++) {
            const dir = new THREE.Vector3().randomDirection().multiplyScalar(5 + Math.random() * 3);
            s.vel.set([dir.x, dir.y, dir.z], i * 3);
            positions.set([s.origin.x, s.origin.y, s.origin.z], i * 3);
        }
        mat.current?.color.setHSL(Math.random(), 0.9, 0.6).multiplyScalar(4);
    };

    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.05);
        const s = state.current;
        s.t += dt;
        if (s.t < 0) { if (mat.current) mat.current.opacity = 0; return; }
        if (s.t > 3.2) reset();
        for (let i = 0; i < N; i++) {
            s.vel[i * 3 + 1] -= 3.5 * dt;
            const damp = Math.exp(-1.4 * dt);
            s.vel[i * 3] *= damp; s.vel[i * 3 + 1] *= damp; s.vel[i * 3 + 2] *= damp;
            positions[i * 3] += s.vel[i * 3] * dt;
            positions[i * 3 + 1] += s.vel[i * 3 + 1] * dt;
            positions[i * 3 + 2] += s.vel[i * 3 + 2] * dt;
        }
        if (pts.current) pts.current.geometry.attributes.position.needsUpdate = true;
        if (mat.current) mat.current.opacity = Math.max(0, 1 - s.t / 2.6);
    });

    return (
        <points ref={pts}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial ref={mat} size={0.55} sizeAttenuation transparent depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
        </points>
    );
};

export const Fireworks = () => (
    <>
        <Burst delay={0.5} />
        <Burst delay={1.7} />
        <Burst delay={2.9} />
    </>
);

export const NightSky = () => (
    <>
        <Stars radius={180} depth={60} count={4000} factor={5} saturation={0.4} fade speed={0.6} />
        <mesh position={[-60, 55, -110]}>
            <sphereGeometry args={[6, 32, 24]} />
            <meshBasicMaterial color={new THREE.Color("#fff3c4").multiplyScalar(2)} toneMapped={false} />
        </mesh>
        {/* גחליליות קסומות מעל הכיכר */}
        <Sparkles count={120} scale={[60, 8, 60]} position={[0, 4, 0]} size={4} speed={0.4} color="#ffd27a" />
    </>
);
