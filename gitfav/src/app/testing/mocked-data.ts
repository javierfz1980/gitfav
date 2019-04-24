import { User } from '../shared/models/user';
import { UserSearchResult } from '../shared/models/user-search-result';

export const mockedUser = {
    login: 'login',
    name: 'name',
    followers: 5,
    public_repos: 10,
    created_at: new Date().toString()
} as User;

export const mockedUserSearchResult = {
    total_count: 3,
    incomplete_results: false,
    items: [{...mockedUser}, {...mockedUser}, {...mockedUser}],
};

export const mockedRepo = {
    id: 1,
    name: 'repo',
    html_url: 'repo url'
};

export const mockedRepos = [{...mockedRepo}, {...mockedRepo}, {...mockedRepo}];
