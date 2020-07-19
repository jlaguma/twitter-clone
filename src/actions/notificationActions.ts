import {
    notificationActionTypes,
    NotificationActionTypes,
} from 'constants/types';

/**
 * Action creator for Notification component.
 *
 * @param   {string}                   notification  String to show user.
 */
export function setNotification(notification: string): NotificationActionTypes {
    return {
        type: notificationActionTypes.NOTIFICATION,
        payload: {
            message: notification,
        },
    };
}
