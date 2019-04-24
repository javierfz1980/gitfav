import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as SearchReducer from './search.reducer';
import * as FromApp from '../root/root.reducer';

export interface FeatureState {
    search: SearchReducer.State;
}

export const FEATURE_NAME = 'searchFeature';
export interface State extends FromApp.State {
    [FEATURE_NAME]: FeatureState;
}

/**
 * List of app reducers (only search  in this case...)
 */
export const reducers = {
    search: SearchReducer.reducer
};

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getFavoGitAppState = createFeatureSelector<FeatureState>(FEATURE_NAME);

export const getFavoGitAppSearchState = createSelector(getFavoGitAppState, (state: FeatureState) => state.search);

// Export Search selectors
export const searchSelectors = {
    getSearchLoadingStatus:
        createSelector(getFavoGitAppSearchState, SearchReducer.getSearchLoadingStatus),

    getSearchCurrentData:
        createSelector(getFavoGitAppSearchState, SearchReducer.getSearchCurrentData),

    getSearchCurrentSearch:
        createSelector(getFavoGitAppSearchState, SearchReducer.getSearchCurrentSearch),

    getSearchCurrentPage:
        createSelector(getFavoGitAppSearchState, SearchReducer.getSearchCurrentPage),

    getSearchCurrentOrderBy:
        createSelector(getFavoGitAppSearchState, SearchReducer.getSearchCurrentOrderBy),

    getSearchCurrentOrder:
        createSelector(getFavoGitAppSearchState, SearchReducer.getSearchCurrentOrder),
};
