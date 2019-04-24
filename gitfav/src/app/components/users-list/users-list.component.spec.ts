import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { UsersSortingComponent } from './users-sorting/users-sorting.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserCardComponent } from './user-card/user-card.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { SortingComponent } from '../../shared/components/sorting/sorting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from '../../states/root/root.reducer';
import * as SearchFeatureReducer from '../../states/search/search.feature.reducer';
import * as SearchActions from '../../states/search/search.actions';
import { ORDER_BY_FILTERS } from '../../states/search/search.reducer';
import { GithubService } from '../../services/github.service';
import { GithubServiceStub } from '../../testing/github-service-stub';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

describe('UsersListComponent', () => {
    let component: UsersListComponent;
    let fixture: ComponentFixture<UsersListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxPaginationModule,
                ReactiveFormsModule,
                StoreModule.forRoot({
                    ...RootReducer.reducers,
                    [SearchFeatureReducer.FEATURE_NAME]: combineReducers(SearchFeatureReducer.reducers)
                }),
                TranslateModule.forRoot(),
                SharedComponentsModule
            ],
            declarations: [
                UsersListComponent,
                UsersSortingComponent,
                UserCardComponent
            ],
            providers: [
                { provide: GithubService, useClass: GithubServiceStub },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should retrieve the expected state info', () => {
        const search = 'test';
        const page = 5;
        const orderBy = ORDER_BY_FILTERS[2]['value'];
        const order = 'desc';

        component['store'].dispatch(new SearchActions.SearchSearchRequestAction(search));
        component['store'].select(SearchFeatureReducer.searchSelectors.getSearchCurrentSearch)
            .subscribe(data => expect(data).toBe(search));

        component['store'].dispatch(new SearchActions.SearchChangeCurrentPageAction(page));
        component['store'].select(SearchFeatureReducer.searchSelectors.getSearchCurrentPage)
            .subscribe(data => expect(data).toBe(page));

        component['store'].dispatch(new SearchActions.SearchChangeOrderByAction(orderBy));
        component['store'].select(SearchFeatureReducer.searchSelectors.getSearchCurrentOrderBy)
            .subscribe(data => expect(data).toBe(orderBy));

        component['store'].dispatch(new SearchActions.SearchChangeOrderAction(order));
        component['store'].select(SearchFeatureReducer.searchSelectors.getSearchCurrentOrder)
            .subscribe(data => expect(data).toBe(order));
    });
});
