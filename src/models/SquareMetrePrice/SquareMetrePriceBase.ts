export type PropertyType = "apartment" | "house" | "other";

export interface SquareMetrePriceBase  {
    name: string;
    code: string;
    price: number;
    currency: string;
    propertyType: PropertyType;
    period:  Date
}

