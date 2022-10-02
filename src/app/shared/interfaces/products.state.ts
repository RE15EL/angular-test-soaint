import { Product } from "src/app/pages/products/interfaces/product.interface";


export interface ProductsState{
    loading:boolean;
    products:Product[]
}