import React, { FC } from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { createPostsPerDayData } from 'utils/Utils';
import { RootState } from 'store';
import { Tweet, UserDetails } from 'constants/types';

interface Props {
    user: UserDetails;
    tweets: Tweet[];
    match: object;
}

export const Stats: FC<Props> = ({ user, tweets, match }) => {
    const data = createPostsPerDayData(10, tweets).reverse();

    const description =
        user && user.id ? `${user.firstName} ${user.lastName}` : 'sitewaide';

    const renderLineChart = (data: object[]) => (
        <LineChart width={800} height={300} data={data}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    );

    return (
        <div className="stats-component">
            <h2 className="heading">Tweets per day ({description}).</h2>
            <div className="chart">{renderLineChart(data)}</div>
        </div>
    );
};

interface ownProps {
    match: {
        params: {
            id: string;
        };
    };
}

const mapStateToProps = (state: RootState, ownProps: ownProps) => {
    let tweets: Tweet[] = [];
    let user: UserDetails = {};
    if (ownProps.match.params.id) {
        tweets = state.tweets.tweets.filter(
            (t) => t.userId === parseInt(ownProps.match.params.id)
        );
        user = state.usersDetails.details.find(
            (u) => u.id === parseInt(ownProps.match.params.id)
        );
    } else {
        tweets = state.tweets.tweets;
    }
    return {
        tweets: tweets,
        user: user,
    };
};

export default connect(mapStateToProps)(Stats);
