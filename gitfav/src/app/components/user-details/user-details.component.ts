import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicSubscriber } from '../../shared/abstracts/basic-subscriber';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { GithubService } from '../../services/github.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { Repo } from '../../shared/models/repo';
import * as FavouritesReducer from '../../states/favourites/favourites.reducer';
import * as FavouritesFeatureReducer from '../../states/favourites/favourites.feature.reducer';
import * as FavouritesActions from '../../states/favourites/favourites.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'favo-git-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent extends BasicSubscriber implements OnInit {

    /**
     * Current Observable user details info
     */
    public userDetails$: Observable<User>;

    /**
     * Current Observable user's repos list
     */
    public userRepos$: Observable<Repo[]>;

    /**
     * Flag indicating if current user is in favs
     */
    public isInFavs: boolean;

    /**
     * Current repos page
     */
    public currentReposPage: number;

    /**
     * Current repos per page
     */
    public currentReposPerPage: number;

    constructor(private store: Store<FavouritesReducer.State>,
                private route: ActivatedRoute,
                public githubService: GithubService) {
        super();
        this.currentReposPerPage = 30;
    }

    ngOnInit() {
        this.userDetails$ = this.route.params
            .pipe(
                takeUntil(this.unsubscribe),
                tap(params => {
                    this.setInitialFav(params['username']);
                    this.getUserReposByUsernameAndPage(params['username'], 1);
                }),
                switchMap(params => this.githubService.getUserDetailsByLogin(params['username'])));
    }

    /**
     * Adds removes, user from favourites
     * @param addToFav -> flag indication if action should be add or remove
     * @param addToFav -> user object
     */
    favToggle(addToFav: boolean, user: User) {
        if (addToFav) {
            this.store.dispatch(new FavouritesActions.FavouritesAddUserAction(user));
        } else {
            this.store.dispatch(new FavouritesActions.FavouritesRemoveUserAction(user.id));
        }
    }

    /**
     * Retrieves User's repos by page
     * @param username -> username requested
     * @param page -> page requested
     */
    getUserReposByUsernameAndPage(username: string, page: number) {
        this.currentReposPage = page;
        this.userRepos$ = this.githubService.getReposByUsername(username, page);
    }

    /**
     * Check if user is in favs in order to set local component initial flag
     */
    private setInitialFav(username: string) {
        this.store.select(FavouritesFeatureReducer.favouritesSelectors.getFavouritesUsers)
            .pipe(
                take(1),
                takeUntil(this.unsubscribe))
            .subscribe((favUsers: User[]) => {
                this.isInFavs = favUsers.some(favUser => favUser.login === username);
            });
    }


}
