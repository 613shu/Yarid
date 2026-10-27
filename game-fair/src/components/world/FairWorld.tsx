import { Suspense, useEffect, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { Carousel, FerrisWheel, Fireworks, Ground, NightSky, SkyLanterns, StringLights, Trees } from "./Plaza";
import { useWorld } from "./WorldContext";
import { frontOf, slotPlacement } from "./layout";

/* הקנבס הראשי של היריד: אור, ערפל, מצלמה חופשית ואפקטים */

type Mode = "play" | "showcase";

const keys = new Set<string>();

const Rig = ({ mode }: { mode: Mode }) => {
    const controls = useRef<CameraControls>(null);
    const { selectedId, stalls, slotOf } = useWorld();

    // טיסת פתיחה דרמטית
    useEffect(() => {
        const c = controls.current;
        if (!c) return;
        c.setLookAt(0, 60, 95, 0, 0, 0, false);
        c.setLookAt(0, mode === "play" ? 15 : 12, mode === "play" ? 34 : 38, 0, 1.5, 0, true);
        c.setBoundary(new THREE.Box3(new THREE.Vector3(-32, 0, -32), new THREE.Vector3(32, 6, 32)));
    }, [mode]);

    // מעוף אל הדוכן הנבחר
    useEffect(() => {
        const c = controls.current;
        if (!c || mode !== "play") return;
        const stall = stalls.find((s) => s.id === selectedId);
        if (!stall) return;
        const p = slotPlacement(slotOf(stall));
        const f = frontOf(p, 9);
        c.setLookAt(f.x, 5.5, f.z, p.x, 2, p.z, true);
    }, [selectedId, stalls, slotOf, mode]);

    // הליכה במקלדת
    useEffect(() => {
        if (mode !== "play") return;
        const down = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement;
            if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
            keys.add(e.code);
        };
        const up = (e: KeyboardEvent) => keys.delete(e.code);
        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);
        return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); keys.clear(); };
    }, [mode]);

    useFrame((_, delta) => {
        const c = controls.current;
        if (!c) return;
        const dt = Math.min(delta, 0.05);
        if (mode === "showcase") {
            c.azimuthAngle += dt * 0.06;
            return;
        }
        const speed = 14 * dt;
        if (keys.has("KeyW") || keys.has("ArrowUp")) c.forward(speed, false);
        if (keys.has("KeyS") || keys.has("ArrowDown")) c.forward(-speed, false);
        if (keys.has("KeyA") || keys.has("ArrowLeft")) c.truck(-speed, 0, false);
        if (keys.has("KeyD") || keys.has("ArrowRight")) c.truck(speed, 0, false);
        if (keys.has("KeyQ")) c.rotate(dt * 1.2, 0, false);
        if (keys.has("KeyE")) c.rotate(-dt * 1.2, 0, false);
    });

    return (
        <CameraControls
            ref={controls}
            makeDefault
            enabled={mode === "play"}
            minDistance={5}
            maxDistance={60}
            minPolarAngle={0.25}
            maxPolarAngle={Math.PI / 2.15}
            smoothTime={0.6}
            draggingSmoothTime={0.15}
        />
    );
};

export const FairWorld = ({ mode = "play", children }: { mode?: Mode; children?: ReactNode }) => {
    const { select } = useWorld();
    return (
        <Canvas
            shadows
            dpr={mode === "play" ? [1, 1.75] : [1, 1.25]}
            camera={{ position: [0, 60, 95], fov: 50, near: 0.5, far: 400 }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            onPointerMissed={() => select(null)}
        >
            <color attach="background" args={["#0a0e2b"]} />
            <fog attach="fog" args={["#141a45", 45, 150]} />

            <hemisphereLight args={["#6d7ad8", "#2a1a2a", 0.9]} />
            <ambientLight intensity={0.25} />
            <directionalLight
                position={[-30, 40, 20]}
                intensity={1.1}
                color="#b9c4ff"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-40}
                shadow-camera-right={40}
                shadow-camera-top={40}
                shadow-camera-bottom={-40}
                shadow-bias={-0.0004}
            />
            <pointLight position={[0, 6, 22]} intensity={30} distance={30} color="#ff9a3d" />
            <pointLight position={[0, 6, -22]} intensity={30} distance={30} color="#ff6f91" />

            <Environment resolution={128}>
                <Lightformer intensity={1.5} color="#ffb04a" position={[0, 6, 0]} scale={[20, 20, 1]} rotation-x={Math.PI / 2} />
                <Lightformer intensity={0.8} color="#6d7ad8" position={[-10, 3, -10]} rotation-y={Math.PI / 4} scale={[30, 4, 1]} />
                <Lightformer intensity={0.6} color="#ff6f91" position={[10, 2, 10]} rotation-y={-Math.PI / 4} scale={[30, 3, 1]} />
            </Environment>

            <Suspense fallback={null}>
                <NightSky />
                <Ground />
                <Carousel />
                <StringLights />
                <FerrisWheel />
                <Trees />
                <SkyLanterns />
                <Fireworks />
                {children}
            </Suspense>

            <Rig mode={mode} />

            <EffectComposer multisampling={0}>
                <Bloom mipmapBlur intensity={0.9} luminanceThreshold={1} luminanceSmoothing={0.2} radius={0.7} />
                <Vignette eskil={false} offset={0.2} darkness={0.75} />
            </EffectComposer>
        </Canvas>
    );
};

export default FairWorld;
