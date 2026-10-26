import { useEffect, useState } from "react";
import { useStall } from "../context/StallContext";
import { imgFemales, imgMales } from "../constance/navLinks";
import type { customerProps, startPositionType } from "../typs/gameTyps";
import { randBetween, randPosition } from "../utils/random";

export const Customer = ({ customer }: customerProps) => {
    const { nickname, gender, targetStallId, ageGroup, targetStallIds, purchases } = customer;

    const [position, setPosition] = useState<startPositionType>(randPosition);
    const [stepMs, setStepMs] = useState(() => Math.round(randBetween(3000, 6000)));

    useEffect(() => {
        const intervalId = setInterval(() => { setPosition(randPosition) }, stepMs);
        return () => { clearInterval(intervalId); };

    }, [stepMs])


    const pickImage = () => {
        if (gender === "FEMALE") {
            return imgFemales[Math.floor(Math.random() * imgFemales.length)];
        }
        return imgMales[Math.floor(Math.random() * imgMales.length)];
    };

    const [img, setImg] = useState<string>(pickImage);






    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ease-linear transition-[left,top]"
            style={{
                left: position.startX + "%",
                top: position.startY + "%",
                transitionDuration: stepMs + "ms",
            }}
        >
            <span className="text-4xl leading-none">{img}</span>
            <span className="text-xs">{nickname}</span>
        </div>
    );
};
