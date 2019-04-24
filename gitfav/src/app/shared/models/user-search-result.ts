import { User } from './user';

export interface UserSearchResult {
    total_count: number;
    incomplete_results: boolean;
    items: User[];
}
