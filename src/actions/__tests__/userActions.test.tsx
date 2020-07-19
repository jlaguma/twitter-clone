import moxios from 'moxios';
import axios from 'apis/jsonServer';
import { getUser } from 'actions/usersActions';
import { usersActionTypes } from 'constants/types';
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

describe('The usersActionTypes.GET_USER action:', () => {
    const store = mockStore([]);

    it('Has the correct type.', (done) => {
        const state = {
            loading: false,
            error: '',
            users: [
                {
                    id: 2,
                    username: '@IncredibleHulk',
                    role: 'user',
                    usersDetailsId: 2,
                    profilePic:
                        'https://i.pinimg.com/600x315/e7/71/26/e77126f6fe72a3063bfc84e1a0427a90.jpg',
                },
            ],
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(state));
        });

        const expected1 = usersActionTypes.GET_USER_REQUEST;
        const expected2 = usersActionTypes.GET_USER_SUCCESS;

        store.dispatch(getUser(2)).then(() => {
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
            users: [
                {
                    id: 2,
                    username: '@IncredibleHulk',
                    role: 'user',
                    usersDetailsId: 2,
                    profilePic:
                        'https://i.pinimg.com/600x315/e7/71/26/e77126f6fe72a3063bfc84e1a0427a90.jpg',
                },
            ],
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(state));
        });

        store.dispatch(getUser(2)).then(() => {
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

        const expected1 = usersActionTypes.GET_USER_ERROR;
        const expected2 = 'Request failed with status code 500';

        store.dispatch(getUser(2)).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[1].type).toEqual(expected1);
            expect(actionCalled[1].payload.message).toEqual(expected2);
            store.clearActions();
            done();
        });
    });
});
