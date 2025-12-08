import { Product } from "./products";

export enum TypeOrigin { CAR = 'CAR', PEDIDO = 'PEDIDO' };

export interface ItemIn {}

export interface ItemWithProduct {
    itemId: string,
    sizeVariation: string,
    typeOrigin: TypeOrigin,
    quantProduct: number,
    price: number,
    subtotal: number | null,
    carId: string,
    orderId: string | null,
    productId: string,
    createdAt: Date,
    updatedAt: Date,
    product: Product;
};