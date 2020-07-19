import usersReducer from 'reducers/usersReducer';
import { usersActionTypes } from 'constants/types';

const initialUsersState = {
    loading: false,
    error: '',
    users: [],
};

describe('The userReducer:', () => {
    it('Handles actions of type usersActionTypes.GET_USER_REQUEST.', () => {
        const action = {
            type: usersActionTypes.GET_USER_REQUEST,
        };

        const newState = usersReducer(initialUsersState, action);
        expect(newState).toEqual({ loading: true, error: '', users: [] });
    });

    it('Handles actions of type usersActionTypes.GET_USER_SUCCESS.', () => {
        const action = {
            type: usersActionTypes.GET_USER_SUCCESS,
            payload: {
                data: {
                    id: 2,
                    username: '@IncredibleHulk',
                    role: 'user',
                    usersDetailsId: 2,
                    profilePic:
                        'https://i.pinimg.com/600x315/e7/71/26/e77126f6fe72a3063bfc84e1a0427a90.jpg',
                },
            },
        };

        const expected = {
            loading: false,
            error: '',
            users: [
                {
                    id: 2,
                    username: '@IncredibleHulk',
                    role: 'user',
                    usersDetailsId: 2,
                    profilePic:
                        'https://i.pinimg.com/600x315/e7/71/26/e77126f6fe72a3063bfc84e1a0427a90.jpg',
                },
            ],
        };

        const newState = usersReducer(initialUsersState, action);
        expect(newState).toEqual(expected);
    });

    it('Handles actions of type usersActionTypes.GET_USER_ERROR.', () => {
        const action = {
            type: usersActionTypes.GET_USER_ERROR,
            payload: {
                message: 'No power!',
            },
        };

        const newState = usersReducer(initialUsersState, action);
        expect(newState).toEqual({
            loading: false,
            error: 'No power!',
            users: [],
        });
    });

    it('Handles actions of unknown type.', () => {
        const newState = usersReducer(initialUsersState, {});
        expect(newState).toEqual(initialUsersState);
    });
});
