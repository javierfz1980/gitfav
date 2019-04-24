import { Observable, of, BehaviorSubject } from 'rxjs';
import { NavigationExtras, NavigationEnd } from '@angular/router';

export class ActivatedRouteStub {

    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    // Test parameters
    private _testParams: {};
    get testParams() {
        return this._testParams;
    }
    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }

    private _testQueryParams: {};
    get testQueryParams() {
        return this._testQueryParams;
    }
    set testQueryParams(params: {}) {
        this._testQueryParams = params;
    }
    get queryParams(): Observable<{[key: string]: any}> {
        return of(this._testQueryParams);
    }
}

export class RouterStub {
    public results: any;
    public routeReuseStrategy = {
        shouldReuseRoute: () => true
    };
    public events: Observable<NavigationEnd> = of({
        urlAfterRedirects: '',
        id: 1,
        url: ''
    });

    createUrlTree() {
        return '';
    }

    serializeUrl() {
        return '';
    }

    navigate(commands: any[], extras?: NavigationExtras) {
        let serializedQueryParams = null;
        if (extras && extras.queryParams) {
            serializedQueryParams = Object.keys(extras.queryParams).map(key => {
                return `${key}=${extras.queryParams[key]}`;
            }).join('&');
        }

        this.results = commands.join(',') + (serializedQueryParams ? ',' + serializedQueryParams : '');
    }
}
