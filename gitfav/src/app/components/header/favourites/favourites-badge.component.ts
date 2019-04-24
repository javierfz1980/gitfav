import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FavouritesReducer from '../../../states/favourites/favourites.reducer';
import * as FavouritesFeatureReducer from '../../../states/favourites/favourites.feature.reducer';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTES } from '../../../shared/utils/consts';

@Component({
    selector: 'favo-git-favourites-badge',
    templateUrl: './favourites-badge.component.html',
    styleUrls: ['./favourites-badge.component.scss']
})
export class FavouritesBadgeComponent implements OnInit {

    /**
     * Current Observable total favourites info.
     */
    public totalFavourites$: Observable<number>;

    constructor(private store: Store<FavouritesReducer.State>,
                private router: Router) { }

    ngOnInit() {
        this.totalFavourites$ = this.store.select(FavouritesFeatureReducer.favouritesSelectors.getTotalFavourites);
    }

    /**
     * Navigates fo favourites page
     */
    gotoFavourites() {
        this.router.navigate([ROUTES.favourites]);
    }

}
