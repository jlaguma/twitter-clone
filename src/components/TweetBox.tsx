import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { saveTweet } from 'actions/tweetsActions';
import { AuthState } from 'constants/types';
import { RootState } from 'store';

interface Props {
    auth: AuthState;
    saveTweet: any;
}

export const TweetBox: FC<Props> = ({ auth, saveTweet }) => {
    const [tweet, setTweet] = useState('');

    const handleTweetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveTweet(auth.userId, tweet);
        setTweet('');
    };

    if (!auth.loggedIn) {
        return <></>;
    }

    return (
        <div className="tweetbox-component">
            <form onSubmit={handleTweetSubmit}>
                <textarea
                    className="tweets-textarea"
                    placeholder="What's happening?"
                    onChange={(e) => setTweet(e.target.value)}
                    value={tweet}
                    rows={5}
                    cols={50}
                />
                <div>
                    <button type="submit" className="tweet-submit-btn">
                        Tweet
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = {
    saveTweet,
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetBox);
