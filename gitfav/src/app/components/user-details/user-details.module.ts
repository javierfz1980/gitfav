import { NgModule } from '@angular/core';
import { USER_DETAILS_IMPORTS } from './user-details.imports';
import { UserDetailsComponent } from './user-details.component';

@NgModule({
    declarations: [
        UserDetailsComponent
    ],
    imports: [
        ...USER_DETAILS_IMPORTS
    ]
})
export class UserDetailsModule { }
