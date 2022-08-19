import { Details } from "./order.interface";

export interface DetailsOrders{
    details:Details[];
    orderId:number;
    id?:number;
}