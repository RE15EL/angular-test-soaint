import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/pages/products/interfaces/product.interface";


//llamada para cargar los productos
export const loadProducts= createAction(
    '[Products List] Load products'
);

//agregar productos
export const addProduct= createAction(
    '[Products List] Add products',
    props< { product:Product } >()  
);

//los productos se hhan cargadoo correctamente
export const loadedProducts= createAction(
    '[Products List/API] Loaded success',
    props<{ products:Product[] }>()
);