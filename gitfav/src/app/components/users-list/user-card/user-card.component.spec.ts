import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../shared/components/card/card.component';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from '../../../states/root/root.reducer';
import * as SearchFeatureReducer from '../../../states/search/search.feature.reducer';
import { mockedUser } from '../../../testing/mocked-data';
import { Router } from '@angular/router';
import { RouterStub } from '../../../testing/router-stub';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

describe('UserCardComponent', () => {
    let component: UserCardComponent;
    let fixture: ComponentFixture<UserCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                StoreModule.forRoot({
                    ...RootReducer.reducers,
                    [SearchFeatureReducer.FEATURE_NAME]: combineReducers(SearchFeatureReducer.reducers)
                }),
                SharedComponentsModule
            ],
            declarations: [
                UserCardComponent,
            ],
            providers: [
                { provide: Router, useClass: RouterStub }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserCardComponent);
        component = fixture.componentInstance;
        component.user = mockedUser;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
