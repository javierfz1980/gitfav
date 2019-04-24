import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavComponent } from './user-fav.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserFavComponent', () => {
    let component: UserFavComponent;
    let fixture: ComponentFixture<UserFavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            declarations: [
                UserFavComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserFavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
