import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { UserFavouritesComponent } from './user-favourites.component';

const routes: Route[] = [
    { path: '**', component: UserFavouritesComponent },
];

export const USER_FAVOURITES_IMPORTS = [
    ClarityModule,
    CommonModule,
    RouterModule.forChild(routes)
];
