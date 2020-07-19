import usersDetailsReducer from 'reducers/usersDetailsReducer';
import { usersActionTypes } from 'constants/types';

const initialUsersDetailsState = {
    loading: false,
    error: '',
    details: [],
};

describe('The usersDetailsReducer:', () => {
    it('Handles actions of type usersActionTypes.GET_USER_DETAILS_REQUEST.', () => {
        const action = {
            type: usersActionTypes.GET_USER_DETAILS_REQUEST,
        };

        const newState = usersDetailsReducer(initialUsersDetailsState, action);
        expect(newState).toEqual({ loading: true, error: '', details: [] });
    });

    it('Handles actions of type usersActionTypes.GET_USER_DETAILS_SUCCESS.', () => {
        const action = {
            type: usersActionTypes.GET_USER_DETAILS_SUCCESS,
            payload: {
                data: {
                    id: 2,
                    firstName: 'Bruce',
                    lastName: 'Banner',
                    birthday: '1969-12-18',
                },
            },
        };

        const expected = {
            loading: false,
            error: '',
            details: [
                {
                    id: 2,
                    firstName: 'Bruce',
                    lastName: 'Banner',
                    birthday: '1969-12-18',
                },
            ],
        };

        const newState = usersDetailsReducer(initialUsersDetailsState, action);
        expect(newState).toEqual(expected);
    });

    it('Handles actions of type usersActionTypes.GET_USER_DETAILS_ERROR.', () => {
        const action = {
            type: usersActionTypes.GET_USER_DETAILS_ERROR,
            payload: {
                message: 'No power!',
            },
        };

        const newState = usersDetailsReducer(initialUsersDetailsState, action);
        expect(newState).toEqual({
            loading: false,
            error: 'No power!',
            details: [],
        });
    });

    it('Handles actions of unknown type.', () => {
        const newState = usersDetailsReducer(initialUsersDetailsState, {});
        expect(newState).toEqual(initialUsersDetailsState);
    });
});
