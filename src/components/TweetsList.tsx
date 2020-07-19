import React, { FC } from 'react';
import DeleteTweetButton from 'components/DeleteTweetButton';
import Claps from 'components/Claps';
import TweetHeader from 'components/TweetHeader';
import TweetImage from 'components/TweetImage';
import { Tweet } from 'constants/types';

interface Props {
    tweets: Tweet[];
}

const TweetsList: FC<Props> = ({ tweets }) => {
    const renderTweets = () => {
        return tweets.map((tweet) => {
            return (
                <li className="tweet-block flex-row" key={tweet.id}>
                    <div className="tweet-image">
                        <TweetImage tweet={tweet} />
                    </div>
                    <div className="tweet-details flex-col">
                        <div className="tweet-header">
                            <TweetHeader tweet={tweet} />
                        </div>
                        <div className="tweet-body">{tweet.tweet}</div>
                        <div className="tweet-footer flex-row">
                            <div className="tweet-claps">
                                <Claps tweet={tweet} />
                            </div>
                            <div className="tweet-delete">
                                <DeleteTweetButton tweet={tweet} />
                            </div>
                        </div>
                    </div>
                </li>
            );
        });
    };

    return (
        <div className="tweets-list">
            <ul>{renderTweets()}</ul>
        </div>
    );
};

export default TweetsList;
