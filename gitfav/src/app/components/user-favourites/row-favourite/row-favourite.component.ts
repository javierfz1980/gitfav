import { Component, Input } from '@angular/core';
import { User } from '../../../shared/models/user';
import { Store } from '@ngrx/store';
import * as FavouritesReducer from '../../../states/favourites/favourites.reducer';
import * as FavouritesActions from '../../../states/favourites/favourites.actions';
import { ROUTES } from '../../../shared/utils/consts';
import { Router } from '@angular/router';

@Component({
    selector: 'favo-git-row-favourite',
    templateUrl: './row-favourite.component.html',
    styleUrls: ['./row-favourite.component.scss']
})
export class RowFavouriteComponent {

    /**
     * Current User object to be displayed
     */
    @Input() user: User;

    constructor(private router: Router,
                private store: Store<FavouritesReducer.State>) { }

    /**
     * Dispatch remove from fav action in order to remove current user from favourites
     */
    removeFromFavs() {
        this.store.dispatch(new FavouritesActions.FavouritesRemoveUserAction(this.user.id));
    }

    /**
     * Navigates to user details
     */
    gotouserDetails(username: string) {
        this.router.navigate([ROUTES.userDetails, username]);
    }
}
