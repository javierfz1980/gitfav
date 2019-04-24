import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FavouritesReducer from './favourites.reducer';
import * as FromApp from '../root/root.reducer';

export interface FeatureState {
    favourites: FavouritesReducer.State;
}

export const FEATURE_NAME = 'favouritesFeature';
export interface State extends FromApp.State {
    [FEATURE_NAME]: FeatureState;
}

/**
 * List of app reducers (only search  in this case...)
 */
export const reducers = {
    favourites: FavouritesReducer.reducer
};

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getFavoGitAppState = createFeatureSelector<FeatureState>(FEATURE_NAME);

export const getFavoGitAppFavouritesState = createSelector(getFavoGitAppState, (state: FeatureState) => state.favourites);

// Export Favourites selectors
export const favouritesSelectors = {
    getFavouritesUsers:
        createSelector(getFavoGitAppFavouritesState, FavouritesReducer.getFavouritesUsers),

    getTotalFavourites:
        createSelector(getFavoGitAppFavouritesState, FavouritesReducer.getTotalFavourites),
};
