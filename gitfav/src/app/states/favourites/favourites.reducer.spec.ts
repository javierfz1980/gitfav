import * as FavouritesReducer from './favourites.reducer';
import * as FavouritesActions from './favourites.actions';
import { mockedUser } from '../../testing/mocked-data';

describe('ISOLATED: Test Favourites reducer > Favourites actions', () => {
    const defaultState = FavouritesReducer.initialState;

    it('should return the default state', () => {
        const action = {} as any;
        const result = FavouritesReducer.reducer(undefined, action);
        expect(result).toEqual(defaultState);
    });

    it('should process Add user to favourites action', () => {
        const action = new FavouritesActions.FavouritesAddUserAction(mockedUser);
        const result = FavouritesReducer.reducer(defaultState, action);
        expect(result.users.length).toBe(1);
        expect(JSON.stringify(result.users[0])).toBe(JSON.stringify(mockedUser));
    });

    it('should process Remove user from favourites action', () => {
        const actionAdd = new FavouritesActions.FavouritesAddUserAction(mockedUser);
        const resultAdd = FavouritesReducer.reducer(defaultState, actionAdd);

        const action = new FavouritesActions.FavouritesRemoveUserAction(mockedUser.id);
        const result = FavouritesReducer.reducer(defaultState, action);
        expect(result.users.length).toBe(0);
    });

});
