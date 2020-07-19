import { Dispatch } from 'redux';
import jsonServer from 'apis/jsonServer';
import { usersActionTypes } from 'constants/types';
import { getUserDetails } from 'actions/usersDetailsActions';

/**
 * Action creator to get a particular user data.
 *
 * @param   {number}  userId  Users ID.
 */
export function getUser(userId: number) {
    return async (dispatch: Dispatch<any>, getState: () => any) => {
        dispatch({ type: usersActionTypes.GET_USER_REQUEST });
        return jsonServer
            .get(`/users/${userId}`)
            .then((response) => {
                dispatch({
                    type: usersActionTypes.GET_USER_SUCCESS,
                    payload: response,
                });

                const user = getState().users.users.find(
                    (user) => user.id === userId
                );

                dispatch(getUserDetails(user.usersDetailsId));
            })
            .catch((error) => {
                dispatch({
                    type: usersActionTypes.GET_USER_ERROR,
                    payload: error,
                });
            });
    };
}
