import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSortingComponent } from './users-sorting.component';
import { SortingComponent } from '../../../shared/components/sorting/sorting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from '../../../states/root/root.reducer';
import * as SearchFeatureReducer from '../../../states/search/search.feature.reducer';
import { TranslateModule } from '@ngx-translate/core';

describe('UsersSortingComponent', () => {
    let component: UsersSortingComponent;
    let fixture: ComponentFixture<UsersSortingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                NgxPaginationModule,
                StoreModule.forRoot({
                    ...RootReducer.reducers,
                    [SearchFeatureReducer.FEATURE_NAME]: combineReducers(SearchFeatureReducer.reducers)
                }),
                TranslateModule.forRoot()
            ],
            declarations: [
                UsersSortingComponent,
                SortingComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersSortingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
