import type { MerchantType } from "../../typs/userType";

export const Merchant=({merchant}:{merchant:MerchantType})=>
{
    const {displayName,createdAt,balance,role,email}=merchant;
return<>
<div>
    <p>{displayName}</p>
    <p>{email}</p>
    <p>נרשם בתאריך {createdAt}</p>
    <p>{balance} רובל</p>
</div>
</>
}