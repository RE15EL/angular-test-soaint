import { createReducer, on } from "@ngrx/store";
import { ProductsState } from "src/app/shared/interfaces/products.state";

import { loadedProducts, loadProducts } from "../actions/products.action";

//estado inicial
export const initialState: ProductsState= {
    loading:false,
    products: []
};

//declara la funcion Reducer
export const productsReducer= createReducer(
    initialState,
    on(loadProducts, (state) => {
        return {...state, loading:true};
    }),
    on(loadedProducts, (state, {products}) => {
        return {...state, loading:false, products};
    }),
);