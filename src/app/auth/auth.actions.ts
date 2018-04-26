import { Action } from "@ngrx/store";

export const SET_AUTHENTICATION = 'Training';
export const SET_UNAUTHENTICATION = '[Auth] Set Unauthentication';

export class SetAuthentication implements Action {
    readonly type = SET_AUTHENTICATION;
}

export class SetUnauthentication implements Action {
    readonly type = SET_UNAUTHENTICATION;
}

export type AuthActions = SetAuthentication | SetUnauthentication;
