import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { ClarityModule } from '@clr/angular';
import { AlertService } from '../../services/alert.service';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from '../../states/root/root.reducer';
import * as SearchFeatureReducer from '../../states/search/search.feature.reducer';

describe('AlertComponentComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ClarityModule,
                StoreModule.forRoot({
                    ...RootReducer.reducers,
                    [SearchFeatureReducer.FEATURE_NAME]: combineReducers(SearchFeatureReducer.reducers)
                })
            ],
            declarations: [
                AlertComponent
            ],
            providers: [
                AlertService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
