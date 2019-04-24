import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../shared/models/user';
import { UserSearchResult } from '../shared/models/user-search-result';
import { OrderStr } from '../states/search/search.reducer';
import { Repo } from '../shared/models/repo';
import { mockedRepos, mockedUser, mockedUserSearchResult } from './mocked-data';

@Injectable()
export class GithubServiceStub {

    private readonly basePath = 'https://api.github.com';

    searchUsers(str: string, page: number, orderBy: string, order: OrderStr): Observable<UserSearchResult> {
        return of(mockedUserSearchResult);
    }

    getUserDetailsByUrl(url: string): Observable<User> {
        return of({...mockedUser});
    }

    getUserDetailsByLogin(login: string): Observable<User> {
        return this.getUserDetailsByUrl('');
    }

    getReposByUrl(url: string): Observable<Repo[]> {
        return of(mockedRepos);
    }

}
