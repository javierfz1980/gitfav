import * as SearchActions from './search.actions';
import { UserSearchResult } from '../../shared/models/user-search-result';

export type OrderStr = 'asc' | 'desc';
export const ORDER_BY_FILTERS: {[key: string]: string}[] = [
    {
        label: 'Followers',
        value: 'followers'
    },
    {
        label: 'Total repos',
        value: 'repositories'
    },
    {
        label: 'Date Joined',
        value: 'joined'
    }
];
export const DEFAULT_PAGE = 1;
export const DEFAULT_ORDER_BY = ORDER_BY_FILTERS[0].value;
export const DEFAULT_ORDER = 'asc';

export interface State {
    loading: boolean;
    currentData: UserSearchResult;
    currentSearch: string;
    currentPage: number;
    orderBy: string;
    order: OrderStr;
}

/**
 * Initial defaults for the state
 */
const initialData = {
    total_count: 0,
    incomplete_results: false,
    items: []
};

export const initialState: State = {
    loading: false,
    currentData: initialData,
    currentSearch: null,
    currentPage: DEFAULT_PAGE,
    orderBy: DEFAULT_ORDER_BY,
    order: DEFAULT_ORDER
};

export function reducer(state: State = initialState, action: SearchActions.Actions): State {

    switch (action.type) {

        case SearchActions.ACTION_TYPES.SEARCH_SEARCH_REQUEST: {
            return Object.assign({}, state, {
                currentSearch: action.payload,
                loading: true
            });
        }

        case SearchActions.ACTION_TYPES.SEARCH_SEARCH_REQUEST_SUCCESS: {
            return Object.assign({}, state, {
                currentData: action.payload,
                loading: false
            });
        }

        case SearchActions.ACTION_TYPES.SEARCH_SEARCH_REQUEST_FAIL: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case SearchActions.ACTION_TYPES.SEARCH_CHANGE_CURRENT_PAGE: {
            return Object.assign({}, state, {
                currentPage: action.payload
            });
        }

        case SearchActions.ACTION_TYPES.SEARCH_CHANGE_ORDER_BY: {
            return Object.assign({}, state, {
                orderBy: action.payload,
            });
        }

        case SearchActions.ACTION_TYPES.SEARCH_CHANGE_ORDER: {
            return Object.assign({}, state, {
                order: action.payload,
            });
        }

        case SearchActions.ACTION_TYPES.SEARCH_RESET_CURRENT_SEARCH: {
            return Object.assign({}, state, {
                currentSearch: null,
                currentData: initialData
            });
        }

        case SearchActions.ACTION_TYPES.SEARCH_RESET_STATE: {
            return Object.assign({}, state, initialState);
        }

        default:
            return state;
    }
}

export const getSearchLoadingStatus =
    (state: State) => state.loading;

export const getSearchCurrentData =
    (state: State) => state.currentData;

export const getSearchCurrentSearch =
    (state: State) => state.currentSearch;

export const getSearchCurrentPage =
    (state: State) => state.currentPage;

export const getSearchCurrentOrderBy =
    (state: State) => state.orderBy;

export const getSearchCurrentOrder =
    (state: State) => state.order;
