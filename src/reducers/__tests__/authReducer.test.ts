import authReducer from 'reducers/authReducer';
import { authActionTypes } from 'constants/types';

const initialAuthState = {
    userId: 0,
    loggedIn: false,
};

describe('The authReducer:', () => {
    it('Handles actions of type authActionTypes.CHANGE_AUTH.', () => {
        const action = {
            type: authActionTypes.CHANGE_AUTH,
            payload: {
                userId: 2,
                loggedIn: true,
            },
        };

        const newState = authReducer(initialAuthState, action);
        expect(newState).toEqual({ userId: 2, loggedIn: true });
    });

    it('Handles actions of unknown type.', () => {
        const newState = authReducer(initialAuthState, {});
        expect(newState).toEqual(initialAuthState);
    });
});
