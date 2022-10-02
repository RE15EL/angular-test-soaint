import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ProductsState } from "src/app/shared/interfaces/products.state";
import { AppState } from "../app.state";

export const selectProductsFeature = (state:AppState) => state.products;

export const selectProductsList= createSelector(
    selectProductsFeature,
    (state:ProductsState) => state.products
);

export const selectLoading= createSelector(
    selectProductsFeature,
    (state:ProductsState) => state.loading
);