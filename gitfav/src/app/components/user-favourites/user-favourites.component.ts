import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FavouritesReducer from '../../states/favourites/favourites.reducer';
import * as FavouritesFeatureReducer from '../../states/favourites/favourites.feature.reducer';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';

@Component({
    selector: 'favo-git-user-favourites',
    templateUrl: './user-favourites.component.html',
    styleUrls: ['./user-favourites.component.scss']
})
export class UserFavouritesComponent implements OnInit {

    /**
     * Current Observable users favs list
     */
    public usersFavs$: Observable<User[]>;

    constructor(private store: Store<FavouritesReducer.State>) { }

    ngOnInit() {
        this.usersFavs$ = this.store.select(FavouritesFeatureReducer.favouritesSelectors.getFavouritesUsers);
    }

}
