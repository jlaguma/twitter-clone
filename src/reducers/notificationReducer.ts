import {
    notificationActionTypes,
    NotificationActionTypes,
} from 'constants/types';

const initialNotificationState = {
    message: '',
};

/**
 * Reducer handling all Notification related actions.
 */
const notificationReducer = (
    state = initialNotificationState,
    action: NotificationActionTypes
) => {
    switch (action.type) {
        case notificationActionTypes.NOTIFICATION:
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default notificationReducer;
