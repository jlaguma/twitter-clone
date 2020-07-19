import {
    usersActionTypes,
    UseersActionTypes,
    UserState,
} from 'constants/types';

const initialUserState: UserState = {
    loading: false,
    error: '',
    users: [],
};

/**
 * Reducer handling User related actions.
 */
const usersReducer = (
    state: UserState = initialUserState,
    action: UseersActionTypes
) => {
    switch (action.type) {
        /**
         * GET_USER
         */
        case usersActionTypes.GET_USER_REQUEST:
            return { ...state, loading: true };
        case usersActionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                users: [...state.users, action.payload.data],
            };
        case usersActionTypes.GET_USER_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        default:
            return state;
    }
};

export default usersReducer;
