import type { LinkProps } from "../typs/userType";



export const headerLinks: LinkProps[] = [
   { to: "login", content: "כניסה" },
   { to: "register", content: "הרשמה" },
   { to: "game", content: "ליריד" }
];

export const sideBarLinks: LinkProps[] = [
   { to: "addStall", content: "הוסף דוכן" },
   { to: "decoration", content: "קישוטים" },
   { to: "products", content: "מוצרים" }
]

export const ICONS = ["🩷", "🎏", "🎈", "✨", "🌸", "🎀", "🪅", "🎊"];
