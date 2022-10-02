import { ActionReducer, ActionReducerMap } from "@ngrx/store";
import { ProductsState } from "../shared/interfaces/products.state";

import { productsReducer } from "./reducers/products.reducer";

export interface AppState{
    products: ProductsState
}

export const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    products: productsReducer
}