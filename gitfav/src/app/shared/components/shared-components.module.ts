import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { SortingComponent } from './sorting/sorting.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { UserFavComponent } from './user-fav/user-fav.component';

@NgModule({
    declarations: [
        CardComponent,
        SortingComponent,
        UserFavComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        TranslateModule.forChild(),
    ],
    exports: [
        CardComponent,
        SortingComponent,
        UserFavComponent
    ]
})
export class SharedComponentsModule { }
