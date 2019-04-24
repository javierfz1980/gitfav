import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { Store } from '@ngrx/store';
import * as FavouritesReducer from '../../../states/favourites/favourites.reducer';
import * as FavouritesFeatureReducer from '../../../states/favourites/favourites.feature.reducer';
import * as FavouritesActions from '../../../states/favourites/favourites.actions';
import { BasicSubscriber } from '../../../shared/abstracts/basic-subscriber';
import { take, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ROUTES } from '../../../shared/utils/consts';

@Component({
    selector: 'favo-git-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent extends BasicSubscriber implements OnInit {

    /**
     * The User object to be displayed
     */
    @Input() user: User;

    /**
     * Flag indicating if current user is in favs
     */
    public isInFavs: boolean;

    constructor(private store: Store<FavouritesReducer.State>,
                private router: Router) {
        super();
    }

    ngOnInit() {
        /**
         * Check if user is in favs in order to initialize the form control
         */
        this.store.select(FavouritesFeatureReducer.favouritesSelectors.getFavouritesUsers)
            .pipe(
                take(1),
                takeUntil(this.unsubscribe))
            .subscribe((favUsers: User[]) => {
                this.isInFavs = favUsers.some(favUser => favUser.id === this.user.id);
            });
    }

    /**
     * Navigates to User details page
     */
    gotoDetails() {
        this.router.navigate([ROUTES.userDetails, this.user.login]);
    }

    /**
     * Adds removes, user from favourites
     * @param addToFav -> flag indicating add or remove action
     * @param user -> user object
     */
    favToggle(addToFav: boolean, user: User) {
        if (addToFav) {
            this.store.dispatch(new FavouritesActions.FavouritesAddUserAction(user));
        } else {
            this.store.dispatch(new FavouritesActions.FavouritesRemoveUserAction(user.id));
        }
    }

}
