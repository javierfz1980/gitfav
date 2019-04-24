import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user';
import { UserSearchResult } from '../shared/models/user-search-result';
import { RESULTS_PER_PAGE } from '../shared/utils/consts';
import { map, switchMap } from 'rxjs/operators';
import { UserSearchInfo } from '../shared/models/user-search-info';
import { OrderStr } from '../states/search/search.reducer';
import { Repo } from '../shared/models/repo';

/**
 * Base service class to interact with github Api
 */
@Injectable()
export class GithubService {

    /**
     * Api basepath
     */
    private readonly basePath = 'https://api.github.com';

    constructor(private httpClient: HttpClient) {}

    /**
     * Fetch Users filtered by params
     * @param str -> string to be searched in login and fullname
     * @param page -> result page requested
     * @param orderBy -> order results by an specific field
     * @param order -> order resuls asc or desc
     */
    searchUsers(str: string, page: number, orderBy: string, order: OrderStr): Observable<UserSearchResult> {
        const q = `${str}+in:login+in:fullname`;
        return this.httpClient
            .get<UserSearchResult>(
                `${this.basePath}/search/users?q=${q}&page=${page}&per_page=${RESULTS_PER_PAGE}&sort=${orderBy}&order=${order}`)
            .pipe(
                switchMap((result: UserSearchResult) => {
                    const usersRequests$ = result.items.map((user: UserSearchInfo) => this.getUserDetailsByUrl(user.url));
                    return zip(...usersRequests$)
                        .pipe(map((users) => ({
                            total_count: result.total_count,
                            incomplete_results: result.incomplete_results,
                            items: users
                        })));
                })
            );
    }

    /**
     * Fetch User details by url
     * @param url -> full user url
     */
    getUserDetailsByUrl(url: string): Observable<User> {
        return this.httpClient.get<User>(url);
    }

    /**
     * Fetch user details by username (login)
     * @param login -> user username
     */
    getUserDetailsByLogin(login: string): Observable<User> {
        return this.getUserDetailsByUrl(`https://api.github.com/users/${login}`);
    }

    /**
     * Fetch User's repos by username. It gets 30 records per page
     * @param url -> full user's repos url
     */
    getReposByUsername(username: string, currentPage: number = 1): Observable<Repo[]> {
        const page = `page=${currentPage}&per_page=30`;
        const url = `${this.basePath}/users/${username}/repos?${page}`;
        return this.httpClient.get<Repo[]>(url);
    }

}
