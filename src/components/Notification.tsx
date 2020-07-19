import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store';
import { NotificationState } from 'constants/types';

interface Props {
    notification: NotificationState;
}

export const Notification: FC<Props> = ({ notification }) => {
    if (!notification.message) {
        return <></>;
    }

    return <div className="notification-component">{notification.message}</div>;
};

const mapStateToProps = (state: RootState) => {
    return {
        notification: state.notification,
    };
};

export default connect(mapStateToProps)(Notification);
