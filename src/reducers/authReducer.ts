import { authActionTypes, AuthActionTypes, AuthState } from 'constants/types';

const initialAuthState: AuthState = {
    userId: 0,
    loggedIn: false,
};

/**
 * Reducer handling all Auth related actions.
 */
const usersReducer = (
    state = initialAuthState,
    action: AuthActionTypes
): AuthState => {
    switch (action.type) {
        case authActionTypes.CHANGE_AUTH:
            return action.payload;
        default:
            return state;
    }
};

export default usersReducer;
