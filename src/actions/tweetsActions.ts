import { Dispatch } from 'redux';
import jsonServer from 'apis/jsonServer';
import { getCurrentDate } from 'utils/Utils';
import { twitterActionTypes } from 'constants/types';
import { getUser } from 'actions/usersActions';
import _ from 'lodash';

/**
 * This action gets all available tweets from the server.
 * After tweets are fetched, we calculate the list of unique users.
 * We then fetch the data for each user only once,
 * thus preventing over-fetching.
 */
export function getTweets() {
    return async (dispatch: Dispatch<any>, getState: () => any) => {
        dispatch({ type: twitterActionTypes.GET_TWEETS_REQUEST });
        return jsonServer
            .get('/tweets?_sort=date&_order=desc')
            .then((response) => {
                /**
                 * The pattern we use with this action creator does the following:
                 * 1. We get all the tweets from API.
                 * 2. We get all the tweets from getState().tweets.
                 * 3. We extract all of they unique userId's from there.
                 * 4. We get user info for each of those unique userId's with getUser action.
                 * 5. We get user details for each of getState().users with getUserDetails action.
                 */
                dispatch({
                    type: twitterActionTypes.GET_TWEETS_SUCCESS,
                    payload: response,
                });

                const userIds = _.uniq(
                    _.map(getState().tweets.tweets, 'userId')
                );

                userIds.forEach((userId) => dispatch(getUser(userId)));
            })
            .catch((error) => {
                dispatch({
                    type: twitterActionTypes.GET_TWEETS_ERROR,
                    payload: error,
                });
            });
    };
}

/**
 * Action to save a new Tweet.
 *
 * @param   {number}              userId  UserID of the tweet being saved.
 * @param   {string}              tweet   Tweet text.
 */
export function saveTweet(userId: number, tweet: string) {
    return async (dispatch: Dispatch) => {
        dispatch({ type: twitterActionTypes.SAVE_TWEET_REQUEST });
        return jsonServer
            .post('/tweets', {
                tweet: tweet,
                date: getCurrentDate(),
                claps: 0,
                userId: userId,
            })
            .then((response) => {
                dispatch({
                    type: twitterActionTypes.SAVE_TWEET_SUCCESS,
                    payload: response,
                });
            })
            .catch((error) => {
                dispatch({
                    type: twitterActionTypes.SAVE_TWEET_ERROR,
                    payload: error,
                });
            });
    };
}

/**
 * Delete a particular tweet.
 *
 * @param   {number}              tweetId  Tweet id of the tweet to delete.
 */
export function deleteTweet(tweetId: number) {
    return async (dispatch: Dispatch) => {
        dispatch({ type: twitterActionTypes.DELETE_TWEET_REQUEST });
        return jsonServer
            .delete(`/tweets/${tweetId}`)
            .then((response) => {
                dispatch({
                    type: twitterActionTypes.DELETE_TWEET_SUCCESS,
                    payload: tweetId,
                });
            })
            .catch((error) => {
                dispatch({
                    type: twitterActionTypes.DELETE_TWEET_ERROR,
                    payload: error,
                });
            });
    };
}

/**
 * Increase "claps" counter for a particular tweet.
 *
 * @param   {number}              tweetId  Tweet id of the tweet receiving a clap.
 * @param   {number}              clap     New total number of claps for the tweet.
 */
export function clapTweet(tweetId: number, claps: number) {
    return async (dispatch: Dispatch) => {
        dispatch({ type: twitterActionTypes.CLAP_TWEET_REQUEST });
        const newClaps = claps + 1;
        return jsonServer
            .patch(`/tweets/${tweetId}`, {
                claps: newClaps,
            })
            .then((response) => {
                dispatch({
                    type: twitterActionTypes.CLAP_TWEET_SUCCESS,
                    payload: response,
                });
            })
            .catch((error) => {
                dispatch({
                    type: twitterActionTypes.CLAP_TWEET_ERROR,
                    payload: error,
                });
            });
    };
}
