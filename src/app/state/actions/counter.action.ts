import { createAction, props } from "@ngrx/store";

export const inc = createAction(
    '[Inc] Incrementar el contador',
)
export const dec = createAction(
    '[Dec] Decrementar el contador',
)

