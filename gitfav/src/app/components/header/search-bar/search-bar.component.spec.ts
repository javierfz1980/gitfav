import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from '../../../states/root/root.reducer';
import * as SearchFeatureReducer from '../../../states/search/search.feature.reducer';
import { RouterStub } from '../../../testing/router-stub';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('SearchBarComponent', () => {
    let component: SearchBarComponent;
    let fixture: ComponentFixture<SearchBarComponent>;

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
                SearchBarComponent
            ],
            providers: [
                { provide: Router, useClass: RouterStub },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
