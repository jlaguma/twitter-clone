import {
    usersActionTypes,
    UseersDetailsActionTypes,
    UsersDetailsState,
} from 'constants/types';

const initialUsersDetailsState: UsersDetailsState = {
    loading: false,
    error: '',
    details: [],
};

/**
 * Reducer handling User Details related actions.
 */
const usersDetailsReducer = (
    state: UsersDetailsState = initialUsersDetailsState,
    action: UseersDetailsActionTypes
) => {
    switch (action.type) {
        /**
         * GET_USER_DETAILS
         */
        case usersActionTypes.GET_USER_DETAILS_REQUEST:
            return { ...state, loading: true, error: '' };
        case usersActionTypes.GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                details: [...state.details, action.payload.data],
            };
        case usersActionTypes.GET_USER_DETAILS_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        default:
            return state;
    }
};

export default usersDetailsReducer;
