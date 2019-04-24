import { Action } from '@ngrx/store';
import { type } from '../../shared/utils/actions/typeutil';
import { User } from '../../shared/models/user';


/**
 * configuration file ACTION TYPES
 */
export const ACTION_TYPES = {
    FAVOURITES_ADD_USER:
        type('[favourites] add an user to favourites'),

    FAVOURITES_REMOVE_USER:
        type('[favourites] remove an user to favourites'),
};

export class FavouritesAddUserAction implements Action {
    readonly type = ACTION_TYPES.FAVOURITES_ADD_USER;

    constructor(public payload: User) {}
}

export class FavouritesRemoveUserAction implements Action {
    readonly type = ACTION_TYPES.FAVOURITES_REMOVE_USER;

    constructor(public payload: number) {}
}

export type Actions
    = FavouritesAddUserAction
    | FavouritesRemoveUserAction;
