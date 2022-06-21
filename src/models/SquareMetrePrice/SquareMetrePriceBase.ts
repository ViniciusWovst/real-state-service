type TPropertyType = "apartment" | "house" | "other";

export interface SquareMetrePriceBase  {
    name: string;
    code: string;
    price: number;
    currency: string;
    propertyType: TPropertyType;
    year: number;
    month: number;
}

