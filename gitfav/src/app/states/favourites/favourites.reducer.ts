import * as FavouritesActions from './favourites.actions';
import { User } from '../../shared/models/user';

export interface State {
    users: User[];
}

/**
 * Initial defaults for the state
 */
export const initialState: State = {
    users: []
};

export function reducer(state: State = initialState, action: FavouritesActions.Actions): State {

    switch (action.type) {

        case FavouritesActions.ACTION_TYPES.FAVOURITES_ADD_USER: {
            return Object.assign({}, state, {
                users: [...state.users, action.payload]
            });
        }

        case FavouritesActions.ACTION_TYPES.FAVOURITES_REMOVE_USER: {
            return Object.assign({}, state, {
                users: state.users.filter(user => user.id !== action.payload)
            });
        }

        default:
            return state;
    }
}

export const getFavouritesUsers =
    (state: State) => state.users;

export const getTotalFavourites =
    (state: State) => state.users.length;
