import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ClrDatagridPagination } from '@clr/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderStr } from '../../../states/search/search.reducer';
import { BasicSubscriber } from '../../abstracts/basic-subscriber';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface OrderFilters {
    [key: string]: string;
}

@Component({
    selector: 'favo-git-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss']
})
export class SortingComponent extends BasicSubscriber implements OnInit {

    /**
     * Emitters triggered when something change
     */
    @Output() onPageChanged: EventEmitter<number>;
    @Output() onOrderChanged: EventEmitter<OrderStr>;
    @Output() onOrderByChanged: EventEmitter<string>;

    /**
     * Input setting the current value for orderBy form field
     */
    @Input() set orderByCurrentValue(value: string) {
        this.form.controls['orderBy'].setValue(value);
    }

    /**
     * Input setting the current value for order form field
     * @param value -> current order value
     */
    @Input() set orderCurrentValue(value: OrderStr) {
        this.form.controls['order'].setValue(value);
    }

    /**
     * Order by field options
     */
    @Input() orderByFilters: OrderFilters[];

    /**
     * Reference to the pagination object
     */
    @ViewChild(ClrDatagridPagination) pagination: ClrDatagridPagination;

    /**
     * Current component form
     */
    public form: FormGroup;

    constructor() {
        super();

        this.onPageChanged = new EventEmitter();
        this.onOrderChanged = new EventEmitter();
        this.onOrderByChanged = new EventEmitter();

        this.form = new FormGroup({
            orderBy: new FormControl(null),
            order: new FormControl(null),
        });
    }

    ngOnInit(): void {

        // Emits OrderBy criteria changes
        this.getFormFiledChangeStream('orderBy')
            .subscribe((value: OrderStr) => {
                this.onOrderByChanged.emit(value);
            });

        // Emits Order criteria changes
        this.getFormFiledChangeStream('order')
            .subscribe((value: OrderStr) => {
                this.onOrderChanged.emit(value);
            });

    }

    /**
     * Emits the current page every time current page changes
     * @param currentPage -> current page selected
     */
    pageChanged(currentPage: number) {
        this.onPageChanged.emit(currentPage);
    }

    /**
     * Returs an stream from a form field
     * @param field -> the form field
     */
    private getFormFiledChangeStream(field): Observable<string> {
        return this.form.get(field).valueChanges
            .pipe(
                takeUntil(this.unsubscribe),
                distinctUntilChanged());
    }
}
