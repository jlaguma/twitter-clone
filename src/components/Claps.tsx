import React, { FC, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { clapTweet } from 'actions/tweetsActions';
import { Tweet } from 'constants/types';
import SVG from 'react-inlinesvg';
import clapImage from 'images/clap.svg';

interface Props {
    tweet: Tweet;
    clapTweet: any;
}

export const Claps: FC<Props> = ({ tweet, clapTweet }) => {
    const handleClap = (e: MouseEvent, tweetId: number, claps: number) => {
        e.preventDefault();
        clapTweet(tweetId, claps);
    };

    return (
        <div className="claps-component flex-row">
            <div className="claps-button">
                <a
                    onClick={(e) => handleClap(e, tweet.id, tweet.claps)}
                    href="/"
                >
                    <SVG className="clap-image" src={clapImage} />
                </a>
            </div>
            <div className="claps-number">{tweet.claps}</div>
        </div>
    );
};

const mapDispatchToProps = {
    clapTweet,
};

export default connect(null, mapDispatchToProps)(Claps);
