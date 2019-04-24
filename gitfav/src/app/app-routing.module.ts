import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ROUTES } from './shared/utils/consts';

const routes: Routes = [
    {
        path: '',
        redirectTo: ROUTES.home,
        pathMatch: 'full'
    },
    {
        path: ROUTES.home,
        component: UsersListComponent
    },
    {
        path: `${ROUTES.userDetails}/:username`,
        loadChildren: './components/user-details/user-details.module#UserDetailsModule'
    },
    {
        path: ROUTES.favourites,
        loadChildren: './components/user-favourites/user-favourites.module#UserFavouritesModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
