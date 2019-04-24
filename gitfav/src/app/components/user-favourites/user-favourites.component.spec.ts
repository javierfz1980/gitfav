import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavouritesComponent } from './user-favourites.component';
import { RowFavouriteComponent } from './row-favourite/row-favourite.component';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from '../../states/root/root.reducer';
import * as SearchFeatureReducer from '../../states/search/search.feature.reducer';

describe('UserFavouritesComponent', () => {
    let component: UserFavouritesComponent;
    let fixture: ComponentFixture<UserFavouritesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ...RootReducer.reducers,
                    [SearchFeatureReducer.FEATURE_NAME]: combineReducers(SearchFeatureReducer.reducers)
                })
            ],
            declarations: [
                UserFavouritesComponent,
                RowFavouriteComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserFavouritesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
