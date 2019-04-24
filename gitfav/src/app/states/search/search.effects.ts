import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import * as SearchActions from './search.actions';
import { GithubService } from '../../services/github.service';
import { UserSearchResult } from '../../shared/models/user-search-result';
import { AlertService } from '../../services/alert.service';
import * as SearchReducer from './search.reducer';
import * as SearchFeatureReducer from './search.feature.reducer';

/**
 * Search effects...
 */
@Injectable()
export class SearchEffects {

    private readonly currentSearch$ = this.store.select(SearchFeatureReducer.searchSelectors.getSearchCurrentSearch);
    private readonly currentPage$ = this.store.select(SearchFeatureReducer.searchSelectors.getSearchCurrentPage);
    private readonly currentOrderBy$ = this.store.select(SearchFeatureReducer.searchSelectors.getSearchCurrentOrderBy);
    private readonly currentOrder$ = this.store.select(SearchFeatureReducer.searchSelectors.getSearchCurrentOrder);

    constructor(private actions: Actions,
                private store: Store<SearchReducer.State>,
                private githubService: GithubService,
                private alertService: AlertService) {
    }

    /**
     * Change order by effect
     */
    @Effect()
    changeOrderBy$ = this.actions
        .pipe(
            ofType(
                SearchActions.ACTION_TYPES.SEARCH_CHANGE_ORDER_BY),
            switchMap(() => of(new SearchActions.SearchChangeCurrentPageAction(1))));

    /**
     * Change order 'asc' - 'desc' and change page effect
     */
    @Effect()
    changeOrderOrPage$ = this.actions
        .pipe(
            ofType(
                SearchActions.ACTION_TYPES.SEARCH_CHANGE_CURRENT_PAGE,
                SearchActions.ACTION_TYPES.SEARCH_CHANGE_ORDER),
            switchMap(() => this.currentSearch$
                    .pipe(
                        filter((currentSearch: string) => currentSearch && currentSearch !== ''),
                        map((currentSearch: string) => new SearchActions.SearchSearchRequestAction(currentSearch)))
            ));

    /**
     * Search effect
     */
    @Effect()
    searchUsers$ = this.actions
        .pipe(
            ofType(
                SearchActions.ACTION_TYPES.SEARCH_SEARCH_REQUEST),
            filter((action: SearchActions.SearchSearchRequestAction) => action.payload && action.payload !== ''),
            map((action: SearchActions.SearchSearchRequestAction) => action.payload),
            withLatestFrom(this.currentPage$, this.currentOrderBy$, this.currentOrder$),
            switchMap(([currentSearch, currentPage, currentOrderBy, currentOrder]) => {
                return this.githubService.searchUsers(currentSearch, currentPage, currentOrderBy, currentOrder)
                    .pipe(
                        map((res: UserSearchResult) => {
                            return new SearchActions.SearchSearchRequestSuccessAction(res);
                        }),
                        catchError((err) => {
                            console.log(err);
                            const errorStr = err.error && err.error.message ? err.error.message : 'Error searching for users...';
                            this.alertService.showError(errorStr);
                            return of(new SearchActions.SearchSearchRequestFailAction(errorStr));
                        }));
            }));
}
