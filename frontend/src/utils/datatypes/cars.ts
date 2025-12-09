import { ItemWithProduct } from "./items";

export enum CarStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    PENDING = "PENDING",
};

export interface CarWithItems {
    carId: string,
    name: string,
    status: CarStatus,
    total: number | null,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
    items: ItemWithProduct[];
};