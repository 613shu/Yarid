import type { startPositionType } from "../typs/gameTyps";

export const randBetween = (min: number, max: number) => {
    return min + Math.random() * (max - min);
};


export const randPosition = () => {
    const spX = randBetween(5, 95);  
    const spY = randBetween(55, 90); 
    const res:startPositionType={ startX:spX, startY:spY }
    return res;
};