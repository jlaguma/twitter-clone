import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import TweetBox from 'components/TweetBox';
import TweetsList from 'components/TweetsList';
import Pagination from 'components/Pagination';
import * as actions from 'actions/tweetsActions';
import { Tweet } from 'constants/types';
import { RootState } from 'store';

interface Props {
    tweets: Tweet[];
    getTweets: any;
}

const Home: FC<Props> = ({ tweets, getTweets }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const tweetsPerPage = 10;

    React.useEffect(() => {
        getTweets();
    }, [getTweets]);

    const indexOfLastTweet = currentPage * tweetsPerPage;
    const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
    const currentTweets = tweets.slice(indexOfFirstTweet, indexOfLastTweet);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <TweetBox />
            <TweetsList tweets={currentTweets} />
            <Pagination
                tweetsPerPage={tweetsPerPage}
                totalTweets={tweets.length}
                paginate={paginate}
            />
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return { tweets: state.tweets.tweets };
};

export default connect(mapStateToProps, actions)(Home);
