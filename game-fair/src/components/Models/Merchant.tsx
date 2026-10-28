import type { MerchantType } from "../../typs/userType";

export const Merchant=({merchant}:{merchant:MerchantType})=>
{
    const {displayName,createdAt,balance,role,email}=merchant;
return<>
<div className="tilt-card fair-panel overflow-hidden p-0!">
    <div className="fair-stripe h-6" />
    <div className="p-5 pt-4">
        <div className="mb-4 flex items-center gap-3">
            <span className="fair-avatar h-12! w-12! text-xl!">{displayName[0]}</span>
            <div className="min-w-0">
                <p className="fair-title truncate text-xl">{displayName}</p>
                <p className="truncate text-sm text-parchment/60" dir="ltr">{email}</p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div className="fair-stat">
                <span className="text-xs text-parchment/60">יתרה</span>
                <p className="font-display text-2xl text-lantern">{balance} רובל</p>
            </div>
            <div className="fair-stat">
                <span className="text-xs text-parchment/60">נרשם בתאריך</span>
                <p className="font-display text-lg text-parchment">{createdAt}</p>
            </div>
        </div>
    </div>
</div>
</>
}
