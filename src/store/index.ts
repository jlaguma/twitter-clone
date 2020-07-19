import { combineReducers } from 'redux';
import tweetsReducer from 'reducers/tweetsReducer';
import usersReducer from 'reducers/usersReducer';
import usersDetailsReducer from 'reducers/usersDetailsReducer';
import authReducer from 'reducers/authReducer';
import notificationReducer from 'reducers/notificationReducer';
import { StateType } from 'typesafe-actions';

/**
 * Our Root Reducer
 */
export const reducer = combineReducers({
    tweets: tweetsReducer,
    users: usersReducer,
    usersDetails: usersDetailsReducer,
    auth: authReducer,
    notification: notificationReducer,
});

export type RootState = StateType<ReturnType<typeof reducer>>;
export default reducer;
