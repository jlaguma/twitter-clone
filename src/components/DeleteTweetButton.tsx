import React, { FC, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { deleteTweet } from 'actions/tweetsActions';
import { AuthState, Tweet } from 'constants/types';
import SVG from 'react-inlinesvg';
import deleteImage from 'images/error.svg';
import { RootState } from 'store';

interface Props {
    auth: AuthState;
    tweet: Tweet;
    deleteTweet: any;
}

export const DeleteTweetButton: FC<Props> = ({ auth, tweet, deleteTweet }) => {
    const handleDelete = (e: MouseEvent, tweetId: number) => {
        e.preventDefault();
        deleteTweet(tweetId);
    };

    // Do not show the button if it's not the users tweet.
    if (auth.userId !== tweet.userId) {
        return <></>;
    }

    return (
        <div className="delete-tweet-component">
            <a onClick={(e) => handleDelete(e, tweet.id)} href="/">
                <SVG className="delete-image" src={deleteImage} />
            </a>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return { auth: state.auth };
};

const mapDispatchToProps = {
    deleteTweet,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTweetButton);
