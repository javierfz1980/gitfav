import { NgModule } from '@angular/core';
import { UserFavouritesComponent } from './user-favourites.component';
import { USER_FAVOURITES_IMPORTS } from './user-favourites.imports';
import { RowFavouriteComponent } from './row-favourite/row-favourite.component';

@NgModule({
  declarations: [
      UserFavouritesComponent,
      RowFavouriteComponent
  ],
  imports: [
      ...USER_FAVOURITES_IMPORTS
  ]
})
export class UserFavouritesModule { }
