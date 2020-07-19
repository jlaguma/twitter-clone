import { Dispatch } from 'redux';
import jsonServer from 'apis/jsonServer';
import { usersActionTypes } from 'constants/types';

/**
 * Action creator to get extra details for a particular user.
 *
 * @param   {number}  userId  Users ID.
 */
export function getUserDetails(userId: number) {
    return async (dispatch: Dispatch<any>, getState: () => any) => {
        dispatch({ type: usersActionTypes.GET_USER_DETAILS_REQUEST });
        return jsonServer
            .get(`/usersDetails/${userId}`)
            .then((response) => {
                dispatch({
                    type: usersActionTypes.GET_USER_DETAILS_SUCCESS,
                    payload: response,
                });
            })
            .catch((error) => {
                dispatch({
                    type: usersActionTypes.GET_USER_DETAILS_ERROR,
                    payload: error,
                });
            });
    };
}
