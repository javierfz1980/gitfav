import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesBadgeComponent } from './favourites-badge.component';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from '../../../states/root/root.reducer';
import * as FavouritesFeatureReducer from '../../../states/favourites/favourites.feature.reducer';
import { Router } from '@angular/router';
import { RouterStub } from '../../../testing/router-stub';
import { TranslateModule } from '@ngx-translate/core';

describe('FavouritesBadgeComponent', () => {
    let component: FavouritesBadgeComponent;
    let fixture: ComponentFixture<FavouritesBadgeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ...RootReducer.reducers,
                    [FavouritesFeatureReducer.FEATURE_NAME]: combineReducers(FavouritesFeatureReducer.reducers)
                }),
                TranslateModule.forRoot()
            ],
            declarations: [
                FavouritesBadgeComponent
            ],
            providers: [
                { provide: Router, useClass: RouterStub }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FavouritesBadgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
