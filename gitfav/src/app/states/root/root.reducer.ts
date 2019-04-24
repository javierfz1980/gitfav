export interface State {
    appName: string;
}

/**
 * Initial defaults for the state
 */
export const initialState: State = {
    appName: 'favoGit'
};

export const ROOT_NAME = 'favoGitApp';
export const reducers = {
    favoGitApp: reducer
};

export function reducer(state: State = initialState, action: any): State {
    // since we don't have any specific state/action to be reduced, we return the inital state
    return state;
}

