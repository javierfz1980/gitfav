import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { Route, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Route[] = [
    { path: '**', component: UserDetailsComponent },
];

export const USER_DETAILS_IMPORTS = [
    CommonModule,
    ClarityModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
    NgxPaginationModule,
];
