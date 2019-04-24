import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowFavouriteComponent } from './row-favourite.component';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from '../../../states/root/root.reducer';
import * as SearchFeatureReducer from '../../../states/search/search.feature.reducer';
import { mockedUser } from '../../../testing/mocked-data';
import { Router } from '@angular/router';
import { RouterStub } from '../../../testing/router-stub';

describe('RowFavouriteComponent', () => {
    let component: RowFavouriteComponent;
    let fixture: ComponentFixture<RowFavouriteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ...RootReducer.reducers,
                    [SearchFeatureReducer.FEATURE_NAME]: combineReducers(SearchFeatureReducer.reducers)
                })
            ],
            declarations: [
                RowFavouriteComponent
            ],
            providers: [
                { provide: Router, useClass: RouterStub }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RowFavouriteComponent);
        component = fixture.componentInstance;
        component.user = mockedUser;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
