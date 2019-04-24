import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SearchFeatureReducer from '../../../states/search/search.feature.reducer';
import * as SearchActions from '../../../states/search/search.actions';
import { ORDER_BY_FILTERS, OrderStr } from '../../../states/search/search.reducer';
import { takeUntil } from 'rxjs/operators';
import { BasicSubscriber } from '../../../shared/abstracts/basic-subscriber';

@Component({
  selector: 'favo-git-users-sorting',
  templateUrl: './users-sorting.component.html',
  styleUrls: ['./users-sorting.component.scss']
})
export class UsersSortingComponent extends BasicSubscriber implements OnInit {

    /**
     * Filters or fill the OrderBy select field
     */
    public orderByFilters = ORDER_BY_FILTERS;

    /**
     * Current values for both order and orderBy fields
     */
    public currentValues = {
        order: null,
        orderBy: null
    };

    constructor(private store: Store<SearchFeatureReducer.State>) {
        super();
    }

    ngOnInit(): void {
        // States subscriptions
        this.setStateSelectorSubscription(SearchFeatureReducer.searchSelectors.getSearchCurrentOrderBy, 'orderBy');
        this.setStateSelectorSubscription(SearchFeatureReducer.searchSelectors.getSearchCurrentOrder, 'order');
    }

    /**
     * Dispatch current page change action on page change
     * @param currentPage -> the current page selected
     */
    onPageChanged(currentPage: number) {
        this.store.dispatch(new SearchActions.SearchChangeCurrentPageAction(currentPage));
    }

    /**
     * Dispatch current order change action on order change
     * @param order -> the order criteria
     */
    onOrderChanged(order: OrderStr) {
        this.store.dispatch(new SearchActions.SearchChangeOrderAction(order));
    }

    /**
     * Dispatch orderBy change cation on orderBy change
     * @param orderBy -> the orderBy criteria
     */
    onOrderByChanged(orderBy: string) {
        this.store.dispatch(new SearchActions.SearchChangeOrderByAction(orderBy));
    }

    /**
     * Set specific current values based on specific state selectors
     * @param selector -> state slice selector
     * @param field -> field to be updated when selector slice emits
     */
    private setStateSelectorSubscription(selector: any, field: string) {
        this.store.select(selector)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((value) => this.currentValues[field] = value);
    }


}
