import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from './states/root/root.reducer';
import * as SearchFeatureReducer from './states/search/search.feature.reducer';
import { APP_DECLARATIONS } from './app.declarations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedComponentsModule } from './shared/components/shared-components.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ClarityModule,
                NgxPaginationModule,
                ReactiveFormsModule,
                SharedComponentsModule,
                StoreModule.forRoot({
                    ...RootReducer.reducers,
                    [SearchFeatureReducer.FEATURE_NAME]: combineReducers(SearchFeatureReducer.reducers)
                }),
                TranslateModule.forRoot(),
            ],
            declarations: [
                ...APP_DECLARATIONS,
            ],
            providers: [
                AlertService,
                TranslateService
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
