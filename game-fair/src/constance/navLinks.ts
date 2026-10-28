import type { LinkProps } from "../typs/userType";




export const headerLinks: LinkProps[] = [
   { to: "login", content: "כניסה" ,profiles:["Guest"]},
   { to: "register", content: "הרשמה",profiles:["Guest"] },
   { to: "game", content: "ליריד", profiles:["ADMIN","MERCHANT"] },
   { to: "admin", content: "לניהול היריד", profiles:["ADMIN"] },

];

export const sideBarLinks: LinkProps[] = [
   { to: "addStall", content: "הוסף דוכן",profiles:["MERCHANT"] },
   { to: "decoration", content: "קישוטים", profiles:["ADMIN","MERCHANT"] },
   { to: "products", content: "מוצרים", profiles:["ADMIN","MERCHANT"]}
]

export const ICONS = ["🩷", "🎏", "🎈", "✨", "🌸", "🎀", "🪅", "🎊"];
