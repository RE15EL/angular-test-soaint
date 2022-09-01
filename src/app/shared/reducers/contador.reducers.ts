import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import * as state from './contador.actions';

export const initial=0;

const _counterReducer = createReducer(
    initial,
    on( state.inc, state => state + 1 ),
    on( state.dec, state => state - 1 ),
);

export function ounterReducer( state:any, action:any ){
    return _counterReducer( state, action);
}