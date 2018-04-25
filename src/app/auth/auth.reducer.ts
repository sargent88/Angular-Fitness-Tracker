import { Action } from "@ngrx/store";

import { AuthActions, SET_AUTHENTICATION, SET_UNAUTHENTICATION } from './auth.actions';

export interface State {
    isAuthenticated: boolean;
}

const initialState: State = {
    isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch(action.type) {
        case SET_AUTHENTICATION:
            return {
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATION:
            return {
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;