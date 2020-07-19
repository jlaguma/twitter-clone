import tweetsReducer from 'reducers/tweetsReducer';
import { twitterActionTypes } from 'constants/types';

const initialTweetsState = {
    loading: false,
    error: '',
    tweets: [],
};

describe('The tweetsReducer:', () => {
    it('Handles actions of type twitterActionTypes.GET_TWEETS_REQUEST.', () => {
        const action = {
            type: twitterActionTypes.GET_TWEETS_REQUEST,
        };

        const newState = tweetsReducer(initialTweetsState, action);
        expect(newState).toEqual({ loading: true, error: '', tweets: [] });
    });

    it('Handles actions of type twitterActionTypes.GET_TWEETS_SUCCESS.', () => {
        const action = {
            type: twitterActionTypes.GET_TWEETS_SUCCESS,
            payload: {
                data: [
                    {
                        id: 1,
                        tweet: 'Hulk Smash!',
                        userId: 2,
                        date: '2020-07-18',
                        claps: 0,
                    },
                ],
            },
        };

        const expected = {
            loading: false,
            error: '',
            tweets: [
                {
                    id: 1,
                    tweet: 'Hulk Smash!',
                    userId: 2,
                    date: '2020-07-18',
                    claps: 0,
                },
            ],
        };

        const newState = tweetsReducer(initialTweetsState, action);
        expect(newState).toEqual(expected);
    });

    it('Handles actions of type twitterActionTypes.GET_TWEETS_ERROR.', () => {
        const action = {
            type: twitterActionTypes.GET_TWEETS_ERROR,
            payload: {
                message: 'No power!',
            },
        };

        const newState = tweetsReducer(initialTweetsState, action);
        expect(newState).toEqual({
            loading: false,
            error: 'No power!',
            tweets: [],
        });
    });

    it('Handles actions of type twitterActionTypes.SAVE_TWEET_REQUEST.', () => {
        const action = {
            type: twitterActionTypes.SAVE_TWEET_REQUEST,
        };

        const newState = tweetsReducer(initialTweetsState, action);
        expect(newState).toEqual({ loading: true, error: '', tweets: [] });
    });

    it('Handles actions of type twitterActionTypes.SAVE_TWEET_SUCCESS.', () => {
        const action = {
            type: twitterActionTypes.SAVE_TWEET_SUCCESS,
            payload: {
                data: {
                    id: 1,
                    tweet: 'Hulk Smash!',
                    userId: 2,
                    date: '2020-07-18',
                    claps: 0,
                },
            },
        };

        const expected = {
            loading: false,
            error: '',
            tweets: [
                {
                    id: 1,
                    tweet: 'Hulk Smash!',
                    userId: 2,
                    date: '2020-07-18',
                    claps: 0,
                },
            ],
        };

        const newState = tweetsReducer(initialTweetsState, action);
        expect(newState).toEqual(expected);
    });

    it('Handles actions of type twitterActionTypes.SAVE_TWEET_ERROR.', () => {
        const action = {
            type: twitterActionTypes.SAVE_TWEET_ERROR,
            payload: {
                message: 'No power!',
            },
        };

        const newState = tweetsReducer(initialTweetsState, action);
        expect(newState).toEqual({
            loading: false,
            error: 'No power!',
            tweets: [],
        });
    });

    it('Handles actions of type twitterActionTypes.DELETE_TWEET_REQUEST.', () => {
        const action = {
            type: twitterActionTypes.DELETE_TWEET_REQUEST,
        };

        const newState = tweetsReducer(initialTweetsState, action);
        expect(newState).toEqual({ loading: true, error: '', tweets: [] });
    });

    it('Handles actions of type twitterActionTypes.DELETE_TWEET_SUCCESS.', () => {
        const tweetId = 1;
        const tweetsState = {
            loading: false,
            error: '',
            tweets: [
                {
                    id: tweetId,
                    tweet: 'Hulk Smash!',
                    userId: 2,
                    date: '2020-07-18',
                    claps: 0,
                },
            ],
        };
        const action = {
            type: twitterActionTypes.DELETE_TWEET_SUCCESS,
            payload: tweetId,
        };
        const expected = {
            loading: false,
            error: '',
            tweets: [],
        };

        const newState = tweetsReducer(tweetsState, action);
        expect(newState).toEqual(expected);
    });

    it('Handles actions of type twitterActionTypes.DELETE_TWEET_ERROR.', () => {
        const action = {
            type: twitterActionTypes.DELETE_TWEET_ERROR,
            payload: {
                message: 'No power!',
            },
        };

        const newState = tweetsReducer(initialTweetsState, action);
        expect(newState).toEqual({
            loading: false,
            error: 'No power!',
            tweets: [],
        });
    });

    it('Handles actions of type twitterActionTypes.CLAP_TWEET_REQUEST.', () => {
        const action = {
            type: twitterActionTypes.CLAP_TWEET_REQUEST,
        };

        const newState = tweetsReducer(initialTweetsState, action);
        expect(newState).toEqual({ loading: true, error: '', tweets: [] });
    });

    it('Handles actions of type twitterActionTypes.CLAP_TWEET_SUCCESS.', () => {
        const tweetId = 1;
        const tweetsState = {
            loading: false,
            error: '',
            tweets: [
                {
                    id: tweetId,
                    tweet: 'Hulk Smash!',
                    userId: 2,
                    date: '2020-07-18',
                    claps: 31336,
                },
            ],
        };
        const action = {
            type: twitterActionTypes.CLAP_TWEET_SUCCESS,
            payload: {
                data: {
                    id: tweetId,
                    tweet: 'Hulk Smash!',
                    userId: 2,
                    date: '2020-07-18',
                    claps: 31337,
                },
            },
        };
        const expected = {
            loading: false,
            error: '',
            tweets: [
                {
                    id: tweetId,
                    tweet: 'Hulk Smash!',
                    userId: 2,
                    date: '2020-07-18',
                    claps: 31337,
                },
            ],
        };

        const newState = tweetsReducer(tweetsState, action);
        expect(newState).toEqual(expected);
    });

    it('Handles actions of type twitterActionTypes.CLAP_TWEET_ERROR.', () => {
        const action = {
            type: twitterActionTypes.CLAP_TWEET_ERROR,
            payload: {
                message: 'No power!',
            },
        };

        const newState = tweetsReducer(initialTweetsState, action);
        expect(newState).toEqual({
            loading: false,
            error: 'No power!',
            tweets: [],
        });
    });

    it('Handles actions of unknown type.', () => {
        const newState = tweetsReducer(initialTweetsState, {});
        expect(newState).toEqual(initialTweetsState);
    });
});
