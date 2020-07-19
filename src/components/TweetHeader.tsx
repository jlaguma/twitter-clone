import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Tweet, User, UserDetails } from 'constants/types';
import { RootState } from 'store';

interface Props {
    tweet: Tweet;
    user: User;
    userDetails: UserDetails;
}

export const TweetHeader: FC<Props> = ({ tweet, user, userDetails }) => {
    if (!user || !userDetails) {
        return <></>;
    }

    return (
        <div className="tweet-header-component flex-row">
            <div className="names flex-col">
                <div className="name">
                    {userDetails.firstName} {userDetails.lastName}
                </div>
                <div className="username">{user.username}</div>
            </div>
            <div className="date">{tweet.date}</div>
        </div>
    );
};

interface ownProps {
    tweet: {
        userId: number;
    };
}

const mapStateToProps = (state: RootState, ownProps: ownProps) => {
    return {
        userDetails: state.usersDetails.details.find(
            (u) => u.id === ownProps.tweet.userId
        ),
        user: state.users.users.find(
            (user) => user.id === ownProps.tweet.userId
        ),
    };
};

export default connect(mapStateToProps)(TweetHeader);
