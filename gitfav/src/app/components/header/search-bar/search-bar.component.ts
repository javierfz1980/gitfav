import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';
import { BasicSubscriber } from '../../../shared/abstracts/basic-subscriber';
import { Store } from '@ngrx/store';
import * as SearchReducer from '../../../states/search/search.reducer';
import * as SearchFeatureReducer from '../../../states/search/search.feature.reducer';
import * as SearchActions from '../../../states/search/search.actions';
import { Router } from '@angular/router';
import { ROUTES } from '../../../shared/utils/consts';
import { UserSearchResult } from '../../../shared/models/user-search-result';

@Component({
    selector: 'favo-git-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent extends BasicSubscriber implements OnInit {

    /**
     * The reference to the input field on the template
     */
    @ViewChild('search_input') inputElRef: ElementRef;

    private readonly ENTER_KEY_CODE = 'Enter';

    constructor(private store: Store<SearchReducer.State>,
                private router: Router) {
        super();
    }

    ngOnInit() {
        fromEvent(this.inputElRef.nativeElement, 'keydown')
            .pipe(
                filter((keyboardEvent: KeyboardEvent) => {
                    const keyIsEnter = keyboardEvent.code === this.ENTER_KEY_CODE;
                    const searchIsNotEmpty = (keyboardEvent.target as HTMLInputElement).value !== ''
                        && (keyboardEvent.target as HTMLInputElement).value !== null;
                    return keyIsEnter && searchIsNotEmpty;
                }),
                tap((keyboardEvent: KeyboardEvent) => {
                    const currentInputStr = (keyboardEvent.target as HTMLInputElement).value;
                    this.store.dispatch(new SearchActions.SearchSearchRequestAction(currentInputStr));
                    this.router.navigate([ROUTES.home]);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    /**
     * Resets current search input, and also dispatch a full state reset action. It will reset the entire search state.
     */
    reset() {
        this.inputElRef.nativeElement.value = '';
        this.store.dispatch(new SearchActions.SearchResetStateAction());
        this.router.navigate([ROUTES.home]);
    }

}
