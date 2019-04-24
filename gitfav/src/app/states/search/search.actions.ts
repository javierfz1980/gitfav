import { Action } from '@ngrx/store';
import { type } from '../../shared/utils/actions/typeutil';
import { UserSearchResult } from '../../shared/models/user-search-result';
import { OrderStr } from './search.reducer';


export interface UserSearchPayload {
    str: string;
    page: number;
    orderBy: string;
    order: OrderStr;
}

/**
 * configuration file ACTION TYPES
 */
export const ACTION_TYPES = {
    SEARCH_SEARCH_REQUEST:
        type('[search] start a request'),

    SEARCH_SEARCH_REQUEST_SUCCESS:
        type('[search] request response success'),

    SEARCH_SEARCH_REQUEST_FAIL:
        type('[configuration-file] request response fail'),

    SEARCH_CHANGE_CURRENT_PAGE:
        type('[configuration-file] change current page'),

    SEARCH_CHANGE_ORDER_BY:
        type('[configuration-file] change sort by filed'),

    SEARCH_CHANGE_ORDER:
        type('[configuration-file] change sort'),

    SEARCH_RESET_CURRENT_SEARCH:
        type('[configuration-file] reset current search string'),

    SEARCH_RESET_STATE:
        type('[configuration-file] reset search state'),
};

export class SearchSearchRequestAction implements Action {
    readonly type = ACTION_TYPES.SEARCH_SEARCH_REQUEST;

    constructor(public payload: string) {}
}

export class SearchSearchRequestSuccessAction implements Action {
    readonly type = ACTION_TYPES.SEARCH_SEARCH_REQUEST_SUCCESS;

    constructor(public payload: UserSearchResult) {}
}

export class SearchSearchRequestFailAction implements Action {
    readonly type = ACTION_TYPES.SEARCH_SEARCH_REQUEST_FAIL;

    constructor(public payload: boolean) {}
}

export class SearchChangeCurrentPageAction implements Action {
    readonly type = ACTION_TYPES.SEARCH_CHANGE_CURRENT_PAGE;

    constructor(public payload: number) {}
}

export class SearchChangeOrderByAction implements Action {
    readonly type = ACTION_TYPES.SEARCH_CHANGE_ORDER_BY;

    constructor(public payload: string) {}
}

export class SearchChangeOrderAction implements Action {
    readonly type = ACTION_TYPES.SEARCH_CHANGE_ORDER;

    constructor(public payload: OrderStr) {}
}

export class SearchResetCurrentSearchAction implements Action {
    readonly type = ACTION_TYPES.SEARCH_RESET_CURRENT_SEARCH;

    constructor(public payload?: any) {}
}

export class SearchResetStateAction implements Action {
    readonly type = ACTION_TYPES.SEARCH_RESET_STATE;

    constructor(public payload?: any) {}
}

export type Actions
    = SearchSearchRequestAction
    | SearchSearchRequestSuccessAction
    | SearchSearchRequestFailAction
    | SearchChangeCurrentPageAction
    | SearchChangeOrderByAction
    | SearchChangeOrderAction
    | SearchResetCurrentSearchAction
    | SearchResetStateAction ;
