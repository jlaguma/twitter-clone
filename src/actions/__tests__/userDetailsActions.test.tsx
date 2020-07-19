import moxios from 'moxios';
import axios from 'apis/jsonServer';
import { getUserDetails } from 'actions/usersDetailsActions';
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

describe('The usersActionTypes.GET_USER_DETAILS action:', () => {
    const store = mockStore([]);

    it('Has the correct type.', (done) => {
        const userId = 2;
        const state = {
            loading: false,
            error: '',
            details: [
                {
                    id: userId,
                    firstName: 'Bruce',
                    lastName: 'Banner',
                    birthday: '1969-12-18',
                },
            ],
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(state));
        });

        const expected1 = usersActionTypes.GET_USER_DETAILS_REQUEST;
        const expected2 = usersActionTypes.GET_USER_DETAILS_SUCCESS;

        store.dispatch(getUserDetails(userId)).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[0].type).toEqual(expected1);
            expect(actionCalled[1].type).toEqual(expected2);
            store.clearActions();
            done();
        });
    });

    it('Has the correct payload.', (done) => {
        const userId = 2;
        const state = {
            loading: false,
            error: '',
            details: [
                {
                    id: userId,
                    firstName: 'Bruce',
                    lastName: 'Banner',
                    birthday: '1969-12-18',
                },
            ],
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(state));
        });

        store.dispatch(getUserDetails(userId)).then(() => {
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

        const expected1 = usersActionTypes.GET_USER_DETAILS_ERROR;
        const expected2 = 'Request failed with status code 500';

        store.dispatch(getUserDetails(1)).then(() => {
            const actionCalled = store.getActions();
            expect(actionCalled[1].type).toEqual(expected1);
            expect(actionCalled[1].payload.message).toEqual(expected2);
            store.clearActions();
            done();
        });
    });
});
