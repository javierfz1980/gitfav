import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FavouritesBadgeComponent } from './favourites/favourites-badge.component';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from '../../states/root/root.reducer';
import * as SearchFeatureReducer from '../../states/search/search.feature.reducer';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stub';
import { TranslateModule } from '@ngx-translate/core';
import { LangSwitchComponent } from './lang-switch/lang-switch.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ...RootReducer.reducers,
                    [SearchFeatureReducer.FEATURE_NAME]: combineReducers(SearchFeatureReducer.reducers)
                }),
                TranslateModule.forRoot()
            ],
            declarations: [
                HeaderComponent,
                SearchBarComponent,
                FavouritesBadgeComponent,
                LangSwitchComponent
            ],
            providers: [
                { provide: Router, useClass: RouterStub },
            ]
    })
    .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
