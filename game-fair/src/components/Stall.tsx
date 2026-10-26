import { useQuery } from "@tanstack/react-query"
import type { decorationType, stallProps } from "../typs/gameTyps"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { api } from "../api/axiosInstance"




export const Stall = ({ stall }: stallProps) => {

    return <>
        <div dir="rtl" className="fair-booth">

            <div className="fair-booth-awning" />

            <h1 className="fair-booth-sign">
                דוכן {stall.name}
            </h1>

            <h2 className="fair-booth-goods break-words">
                {stall.product.name}
            </h2>

            <p className="fair-booth-counter">
                {stall.price} <span className="ms-1 font-body text-sm font-medium text-parchment/80">רובל ליחידה</span>
            </p>
            <div className="fair-booth-bunting">
                <h1 className="fair-booth-bunting-title">קישוטים</h1>
                {stall.decorations.map((d:decorationType) => 
                    
                   <p key={d.id} className="fair-booth-bunting-flag">{d.name}</p>
                    
                )}
            </div>
        </div>
    </>
}