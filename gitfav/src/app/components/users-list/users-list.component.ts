import { Component, OnInit, ViewChild } from '@angular/core';
import { UserSearchResult } from '../../shared/models/user-search-result';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SearchFeatureReducer from '../../states/search/search.feature.reducer';
import { ClrDatagridPagination } from '@clr/angular';
import { RESULTS_PER_PAGE } from '../../shared/utils/consts';

@Component({
    selector: 'favo-git-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    @ViewChild(ClrDatagridPagination) pagination: ClrDatagridPagination;

    /**
     * State slices streams
     */
    public readonly itemsPerPage: number;
    public usersSearchResult$: Observable<UserSearchResult>;
    public searchLoading$: Observable<boolean>;
    public currentPage$: Observable<number>;

    constructor(private store: Store<SearchFeatureReducer.State>) {
        this.itemsPerPage = RESULTS_PER_PAGE;
    }

    ngOnInit() {
        this.searchLoading$ = this.store.select(SearchFeatureReducer.searchSelectors.getSearchLoadingStatus);
        this.currentPage$ = this.store.select(SearchFeatureReducer.searchSelectors.getSearchCurrentPage);
        this.usersSearchResult$ = this.store.select(SearchFeatureReducer.searchSelectors.getSearchCurrentData);
    }
}
