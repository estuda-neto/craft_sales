export interface ProductIn {
    name: string;
    price: number;
    quantStock: number;
    description: string;
    userId: string;
}

export interface Product {
    productId: string;
    name: string;
    price: number;
    quantStock: number;
    onSale: boolean | null;
    discountpercentage: number | null;
    image: string | null;
    description: string;
    finalPrice: number | null;
    isValidated: boolean;
    userId: string | null;
    createdAt: Date;   // ou Date, caso você queira converter
    updatedAt: Date;   // ou Date
}
