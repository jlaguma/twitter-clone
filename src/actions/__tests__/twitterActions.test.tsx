import moxios from 'moxios';
import axios from 'apis/jsonServer';
import {
    getTweets,
    saveTweet,
    deleteTweet,
    clapTweet,
} from 'actions/tweetsActions';
import { twitterActionTypes } from 'constants/types';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

beforeEach(() => {
    moxios.install(axios);
});

afterEach(() => {
    moxios.uninstall(axios);
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mockSuccess = (data) => ({ status: 200, response: data });
const mockError = (data) => ({ status: 500, response: data });

describe('The twitterActionTypes.GET_TWEETS action:', () => {
    const store = mockStore([]);

    it('Has the correct type.', (done) => {
        const state = {
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

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(state));
        });

        const expected1 = twitterActionTypes.GET_TWEETS_REQUEST;
        const expected2 = twitterActionTypes.GET_TWEETS_SUCCESS;

        store.dispatch(getTweets()).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[0].type).toEqual(expected1);
            expect(actionCalled[1].type).toEqual(expected2);
            store.clearActions();
            done();
        });
    });

    it('Has the correct payload.', (done) => {
        const state = {
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

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(state));
        });

        store.dispatch(getTweets()).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[1].payload.data).toEqual(state);
            store.clearActions();
            done();
        });
    });

    it('Handles errors.', (done) => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockError({}));
        });

        const expected1 = twitterActionTypes.GET_TWEETS_ERROR;
        const expected2 = 'Request failed with status code 500';

        store.dispatch(getTweets()).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[1].type).toEqual(expected1);
            expect(actionCalled[1].payload.message).toEqual(expected2);
            store.clearActions();
            done();
        });
    });
});

describe('The twitterActionTypes.SAVE_TWEET action:', () => {
    const store = mockStore([]);

    it('Has the correct type.', (done) => {
        const state = {
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

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(state));
        });

        const expected1 = twitterActionTypes.SAVE_TWEET_REQUEST;
        const expected2 = twitterActionTypes.SAVE_TWEET_SUCCESS;

        store.dispatch(saveTweet(2, 'Hulk Smash!')).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[0].type).toEqual(expected1);
            expect(actionCalled[1].type).toEqual(expected2);
            store.clearActions();
            done();
        });
    });

    it('Has the correct payload.', (done) => {
        const state = {
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

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(state));
        });

        const expected = state;

        store.dispatch(saveTweet(2, 'Hulk Smash!')).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[1].payload.data).toEqual(expected);
            store.clearActions();
            done();
        });
    });

    it('Handles errors.', (done) => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockError({}));
        });

        const expected1 = twitterActionTypes.SAVE_TWEET_ERROR;
        const expected2 = 'Request failed with status code 500';

        store.dispatch(saveTweet(2, 'Hulk Smash!')).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[1].type).toEqual(expected1);
            expect(actionCalled[1].payload.message).toEqual(expected2);
            store.clearActions();
            done();
        });
    });
});

describe('The twitterActionTypes.DELETE_TWEET action:', () => {
    const tweetId = 1;
    const state = {
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
    const store = mockStore(state);

    it('Has the correct type.', (done) => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess({}));
        });

        const expected1 = twitterActionTypes.DELETE_TWEET_REQUEST;
        const expected2 = twitterActionTypes.DELETE_TWEET_SUCCESS;

        store.dispatch(deleteTweet(tweetId)).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[0].type).toEqual(expected1);
            expect(actionCalled[1].type).toEqual(expected2);
            store.clearActions();
            done();
        });
    });

    it('Has the correct payload.', (done) => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess({}));
        });

        const expected = tweetId;

        store.dispatch(deleteTweet(tweetId)).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[1].payload).toEqual(expected);
            store.clearActions();
            done();
        });
    });

    it('Handles errors.', (done) => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockError({}));
        });

        const expected1 = twitterActionTypes.DELETE_TWEET_ERROR;
        const expected2 = 'Request failed with status code 500';

        store.dispatch(deleteTweet(tweetId)).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[1].type).toEqual(expected1);
            expect(actionCalled[1].payload.message).toEqual(expected2);
            store.clearActions();
            done();
        });
    });
});

describe('The twitterActionTypes.CLAP_TWEET action:', () => {
    const tweetId = 1;
    const claps = 31337;
    const state = {
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
    const store = mockStore(state);

    it('Has the correct type.', (done) => {
        const state = {
            loading: false,
            error: '',
            tweets: [
                {
                    id: tweetId,
                    tweet: 'Hulk Smash!',
                    userId: 2,
                    date: '2020-07-18',
                    claps: claps,
                },
            ],
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(state));
        });

        const expected1 = twitterActionTypes.CLAP_TWEET_REQUEST;
        const expected2 = twitterActionTypes.CLAP_TWEET_SUCCESS;

        store.dispatch(clapTweet(tweetId, claps)).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[0].type).toEqual(expected1);
            expect(actionCalled[1].type).toEqual(expected2);
            store.clearActions();
            done();
        });
    });

    it('Has the correct payload.', (done) => {
        const state = {
            loading: false,
            error: '',
            tweets: [
                {
                    id: tweetId,
                    tweet: 'Hulk Smash!',
                    userId: 2,
                    date: '2020-07-18',
                    claps: claps,
                },
            ],
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(state));
        });

        const expected = state;

        store.dispatch(clapTweet(tweetId, claps)).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[1].payload.data).toEqual(expected);
            store.clearActions();
            done();
        });
    });

    it('Handles errors.', (done) => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockError({}));
        });

        const expected1 = twitterActionTypes.CLAP_TWEET_ERROR;
        const expected2 = 'Request failed with status code 500';

        store.dispatch(clapTweet(tweetId, claps)).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[1].type).toEqual(expected1);
            expect(actionCalled[1].payload.message).toEqual(expected2);
            store.clearActions();
            done();
        });
    });
});
