import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TweetsList from 'components/TweetsList';
import { AuthState, Tweet, User, UserDetails } from 'constants/types';
import { RootState } from 'store';

interface Props {
    auth: AuthState;
    tweets: Tweet[];
    user: User;
    userDetails: UserDetails;
    history: any;
}

const UserProfile: FC<Props> = ({
    auth,
    tweets,
    user,
    userDetails,
    history,
}) => {
    React.useEffect(() => {
        if (!auth.loggedIn) {
            history.push('/');
        }
    }, [auth, history]);

    if (!auth.loggedIn) {
        return <div>Please log in!</div>;
    }

    const profilePic = user.profilePic;
    const fullName = `${userDetails.firstName} ${userDetails.lastName}`;
    const username = user.username;
    const birthday = userDetails.birthday;
    const totalTweets = tweets.length;
    const totalClaps = tweets.reduce((a, c) => a + c.claps, 0);

    return (
        <div className="profile-page">
            <div className="profile-details-wrapper flex-row">
                <div className="profile-pic">
                    <img src={profilePic} alt="Profile Pic" />
                </div>
                <div className="profile-details flex-col">
                    <div className="profile-name">{fullName}</div>
                    <div className="profile-username">{username}</div>
                    <div className="profile-birthday">{birthday}</div>
                    <div className="profile-stats flex-row">
                        <div className="total-tweets">
                            [Tweets: {totalTweets}]
                        </div>
                        <div className="total-claps">[Claps: {totalClaps}]</div>
                        <div className="tweets-per-day">
                            [<Link to={`/stats/${user.id}`}>Stats</Link>]
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <TweetsList tweets={tweets} />
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        tweets: state.tweets.tweets.filter(
            (t) => t.userId === state.auth.userId
        ),
        auth: state.auth,
        userDetails: state.usersDetails.details.find(
            (u) => u.id === state.auth.userId
        ),
        user: state.users.users.find((u) => u.id === state.auth.userId),
    };
};

export default connect(mapStateToProps)(UserProfile);
