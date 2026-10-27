/* מיקום הדוכנים במעגלים סביב הקרוסלה שבמרכז היריד */

export const INNER_SLOTS = 10;
export const INNER_RADIUS = 17;
export const OUTER_SLOTS = 16;
export const OUTER_RADIUS = 27;

export type SlotPlacement = { x: number; z: number; rotY: number };

export const slotPlacement = (index: number): SlotPlacement => {
    const inner = index < INNER_SLOTS;
    const count = inner ? INNER_SLOTS : OUTER_SLOTS;
    const radius = inner ? INNER_RADIUS : OUTER_RADIUS;
    const i = inner ? index : index - INNER_SLOTS;
    const angle = (i / count) * Math.PI * 2 + (inner ? 0 : Math.PI / count);
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    // הדוכן פונה למרכז הכיכר
    return { x, z, rotY: Math.atan2(-x, -z) };
};

/** נקודה קטנה מול חזית הדוכן — לשם הלקוחות הולכים */
export const frontOf = (p: SlotPlacement, distance = 3.2) => ({
    x: p.x + Math.sin(p.rotY) * distance,
    z: p.z + Math.cos(p.rotY) * distance,
});

/** צבע קבוע לכל טקסט (כדי שלכל דוכן יהיו צבעים משלו) */
export const hashHue = (text: string) => {
    let h = 0;
    for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
    return h % 360;
};

export const AWNING_PALETTES: [string, string][] = [
    ["#d7263d", "#fbf1da"],
    ["#1fb5a4", "#fbf1da"],
    ["#f29e2e", "#5a2e14"],
    ["#3a4799", "#ffe7a8"],
    ["#ff6f91", "#fbf1da"],
    ["#2d8a4e", "#ffe7a8"],
];
