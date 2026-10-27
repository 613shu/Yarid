
export type genderType = "MALE" | "FEMALE" | "ANY";
export type ageType = "YOUNG" | "OLD" | "ANY"
export type StallStatusType = "ACTIVE" | "SUSPENDED"
export type BoothType = {
    name: string;
    goods: string;
    price?: number;
    decorations: string[];
    hot?: boolean;
    selected?: boolean;
    onSelect?: () => void;
    onHover?: (on: boolean) => void;
};

export type updateDecorationsForStallType =
    {
        stallId: number,
        decorations: decorationType[] | []
    }
export type productType = {
    id: number,
    name: string,
    categoryId: number,
    category: categoryProps,
    supplierPrice?: number,
    marketPrice?: number,
    popularity?: number,
    targetGender: genderType,
    targetAge: ageType,
    isActive: boolean

}
export type decorationType = {
    id: number,
    name: string,
    cost: number,
    points: number
}
export type stallType = {
    id: number
    merchantId: number,
    name: string,
    slotNumber: number,
    status: StallStatusType,
    suspensionReason?: string,

    product: productType,
    price: number,
    stock: number,


    decorations: decorationType[],
    decorationPoints: number,
    decorationSpent: number,

    createdGameDay: number,
    ageInGameDays: number,
    score: number,

    sales: salesProps

}
export interface BoothProps {
    booth: BoothType
}
export interface SideBarButtonType {
    content: string,
    onClick: () => {},

}

export type startPositionType =
    {
        startX: number,
        startY: number
    }



export interface categoryProps {
    id: number,
    name: string
}
export interface updateDecorationForStallProps {
    decoData: updateDecorationsForStallType
}

export interface productProps {
    product: productType


}

export interface salesProps {
    todayUnits: number,
    todayRevenue: number,
    totalUnits: number,
    totalRevenue: number
}



export type purchasType = {
    stallId: number,
    price: number
}

export interface decorationProps {
    decoration: decorationType
}
export type shopListType=
{
    productId:number,
    purchased:boolean
}

export type customerType = {

    id: number,
    nickname: string,
    gender: genderType,
    ageGroup: ageType,
    targetStallId: number,
    targetStallIds: number[],
    purchases: purchasType[],
    shoppingList:shopListType[]
}

export interface ShopperProps {
    customer: customerType,
    target: { x: number, z: number },
    buying: boolean,
    onSelect: (id: number) => void,
}

export interface customerProps {
    customer: customerType,

}

export interface stallProps {
    stall: stallType;

}

