import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Tweet, User } from 'constants/types';
import { RootState } from 'store';

interface Props {
    tweet: Tweet;
    user: User;
}

export const TweetImage: FC<Props> = ({ tweet, user }) => {
    if (!user) {
        return <></>;
    }

    return (
        <div className="tweet-image-component">
            <img src={user.profilePic} alt="Profile Pic" />
        </div>
    );
};

interface ownProps {
    tweet: {
        userId: number;
    };
}

const mapStateToProps = (state: RootState, ownProps: ownProps) => {
    const user = state.users.users.find((u) => u.id === ownProps.tweet.userId);
    return {
        user: user,
    };
};

export default connect(mapStateToProps)(TweetImage);
