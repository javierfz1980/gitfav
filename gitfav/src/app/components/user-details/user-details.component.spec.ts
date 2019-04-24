import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { ActivatedRouteStub, RouterStub } from '../../testing/router-stub';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as RootReducer from '../../states/root/root.reducer';
import * as FavouritesFeatureReducer from '../../states/favourites/favourites.feature.reducer';

describe('UserDetailsComponent', () => {
    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                SharedComponentsModule,
                NgxPaginationModule,
                StoreModule.forRoot({
                    ...RootReducer.reducers,
                    [FavouritesFeatureReducer.FEATURE_NAME]: combineReducers(FavouritesFeatureReducer.reducers)
                }),
            ],
            declarations: [
                UserDetailsComponent
            ],
            providers: [
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useClass: ActivatedRouteStub },
                GithubService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
