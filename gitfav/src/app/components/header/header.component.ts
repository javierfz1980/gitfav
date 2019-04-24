import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../shared/utils/consts';

@Component({
    selector: 'favo-git-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    /**
     * Navigates to app home
     */
    gotoHome() {
        this.router.navigate([ROUTES.home]);
    }

}
