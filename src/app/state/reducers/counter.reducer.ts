import { createReducer, on } from "@ngrx/store";
import * as states from '../actions/counter.action';


export const oldstate = 0;

const _counterReducer = createReducer(
    oldstate,
    on( states.inc, state => state  + 1 ),
    on( states.dec, state => state  - 1 ),
);

export function counterReducer( state:any, action:any ){
    return _counterReducer( state, action );
}
