import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingComponent } from './sorting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';

describe('SortingComponent', () => {
    let component: SortingComponent;
    let fixture: ComponentFixture<SortingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                NgxPaginationModule,
                TranslateModule.forRoot()
            ],
            declarations: [
                SortingComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SortingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit the correct order', () => {
        const orderBy = 'username';
        spyOn(component.onOrderByChanged, 'emit').and.callThrough();
        component.orderByCurrentValue = orderBy;
        expect(component.onOrderByChanged.emit).toHaveBeenCalledWith(orderBy);

    });

    it('should emit the correct orderBy', () => {
        const order = 'asc';
        spyOn(component.onOrderChanged, 'emit').and.callThrough();
        component.orderCurrentValue = order;
        expect(component.onOrderChanged.emit).toHaveBeenCalledWith(order);
    });
});
