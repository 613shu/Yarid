import * as THREE from "three";

/* טקסטורות פרוצדורליות שמצוירות על canvas — בלי קבצים חיצוניים */

const cache = new Map<string, THREE.Texture>();

const make = (key: string, w: number, h: number, draw: (c: CanvasRenderingContext2D) => void, repeat?: [number, number]) => {
    const hit = cache.get(key);
    if (hit) return hit;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    draw(ctx);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    if (repeat) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(repeat[0], repeat[1]);
    }
    cache.set(key, tex);
    return tex;
};

/** פסי סוכך בשני צבעים */
export const stripeTexture = (a: string, b: string, stripes = 8) =>
    make(`stripe-${a}-${b}-${stripes}`, 256, 64, (c) => {
        const w = 256 / stripes;
        for (let i = 0; i < stripes; i++) {
            c.fillStyle = i % 2 ? b : a;
            c.fillRect(i * w, 0, w, 64);
        }
        const g = c.createLinearGradient(0, 0, 0, 64);
        g.addColorStop(0, "rgba(255,255,255,0.18)");
        g.addColorStop(1, "rgba(0,0,0,0.25)");
        c.fillStyle = g;
        c.fillRect(0, 0, 256, 64);
    });

/** רצפת אבני מרצפת */
export const cobbleTexture = () =>
    make("cobble", 512, 512, (c) => {
        c.fillStyle = "#3b3346";
        c.fillRect(0, 0, 512, 512);
        let seed = 7;
        const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
        const size = 32;
        for (let y = 0; y < 512; y += size) {
            const off = (y / size) % 2 ? size / 2 : 0;
            for (let x = -size; x < 512 + size; x += size) {
                const l = 30 + rnd() * 18;
                c.fillStyle = `hsl(${255 + rnd() * 30}, ${10 + rnd() * 10}%, ${l}%)`;
                c.beginPath();
                c.roundRect(x + off + 2, y + 2, size - 4, size - 4, 8);
                c.fill();
                c.fillStyle = "rgba(255,220,170,0.06)";
                c.beginPath();
                c.roundRect(x + off + 5, y + 4, size - 14, 6, 3);
                c.fill();
            }
        }
    }, [14, 14]);

/** קרשי עץ */
export const woodTexture = () =>
    make("wood", 256, 256, (c) => {
        c.fillStyle = "#7a4220";
        c.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 8; i++) {
            c.fillStyle = i % 2 ? "#8a4f28" : "#6c3a1c";
            c.fillRect(0, i * 32, 256, 30);
            c.strokeStyle = "rgba(40,18,6,0.35)";
            for (let k = 0; k < 6; k++) {
                c.beginPath();
                const y = i * 32 + 4 + k * 4.5;
                c.moveTo(0, y);
                c.bezierCurveTo(80, y + 3, 170, y - 3, 256, y + 1);
                c.stroke();
            }
        }
    }, [1, 1]);

/** דשא כהה לשולי היריד */
export const grassTexture = () =>
    make("grass", 256, 256, (c) => {
        c.fillStyle = "#1a3326";
        c.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 2500; i++) {
            c.fillStyle = `hsla(${130 + Math.random() * 30}, 40%, ${14 + Math.random() * 16}%, 0.8)`;
            c.fillRect(Math.random() * 256, Math.random() * 256, 1.5, 3 + Math.random() * 3);
        }
    }, [30, 30]);
