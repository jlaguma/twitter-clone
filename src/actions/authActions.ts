import { authActionTypes, AuthActionTypes } from 'constants/types';
import { getRandomUserId } from 'utils/Utils';

/**
 * Action creator for a fake auth system for demo purposes.
 *
 * @param   {boolean}          isLoggedIn  auth state
 */
export function changeAuth(isLoggedIn: boolean): AuthActionTypes {
    let state = {
        userId: isLoggedIn ? getRandomUserId() : 0,
        loggedIn: isLoggedIn,
    };

    return {
        type: authActionTypes.CHANGE_AUTH,
        payload: state,
    };
}
