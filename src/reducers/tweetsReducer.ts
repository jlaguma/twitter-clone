import {
    twitterActionTypes,
    TwitterActionTypes,
    TweetState,
} from 'constants/types';

const initialTweetsState: TweetState = {
    loading: false,
    error: '',
    tweets: [],
};

/**
 * Reducer handling all Twitter related actions.
 */
const tweetsReducer = (
    state: TweetState = initialTweetsState,
    action: TwitterActionTypes
): TweetState => {
    switch (action.type) {
        /**
         * GET_TWEETS
         */
        case twitterActionTypes.GET_TWEETS_REQUEST:
            return { ...state, loading: true };
        case twitterActionTypes.GET_TWEETS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                tweets: action.payload.data,
            };
        case twitterActionTypes.GET_TWEETS_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        /**
         * SAVE_TWEET
         */
        case twitterActionTypes.SAVE_TWEET_REQUEST:
            return { ...state, loading: true };
        case twitterActionTypes.SAVE_TWEET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                tweets: [action.payload.data, ...state.tweets],
            };
        case twitterActionTypes.SAVE_TWEET_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        /**
         * DELETE_TWEET
         */
        case twitterActionTypes.DELETE_TWEET_REQUEST:
            return { ...state, loading: true };
        case twitterActionTypes.DELETE_TWEET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                tweets: state.tweets.filter(
                    (tweet) => tweet.id !== action.payload
                ),
            };
        case twitterActionTypes.DELETE_TWEET_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        /**
         * CLAP_TWEET
         */
        case twitterActionTypes.CLAP_TWEET_REQUEST:
            return { ...state, loading: true };
        case twitterActionTypes.CLAP_TWEET_SUCCESS:
            const payload = action.payload.data;
            const index = state.tweets.findIndex(
                (tweet) => tweet.id === payload.id
            );
            let newTweets = [...state.tweets];
            newTweets[index] = payload;
            return { ...state, loading: false, error: '', tweets: newTweets };
        case twitterActionTypes.CLAP_TWEET_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        default:
            return state;
    }
};

export default tweetsReducer;
