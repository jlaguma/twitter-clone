import moxios from 'moxios';
import axios from 'apis/jsonServer';
import { changeAuth } from 'actions/authActions';
import { authActionTypes } from 'constants/types';
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
const mockSuccess = (data) => ({ status: 200, response: [data] });
const mockError = (data) => ({ status: 500, response: [data] });

describe('The authActionTypes.CHANGE_AUTH action:', () => {
    const store = mockStore([]);

    it('Has the correct type.', () => {
        const action = changeAuth(true);
        expect(action.type).toEqual(authActionTypes.CHANGE_AUTH);
        store.clearActions();
    });

    it('Has the correct payload when logged in.', () => {
        const action = changeAuth(true);
        const userId = action.payload.userId;
        const loggedIn = action.payload.loggedIn;
        expect(userId > 0).toBeTruthy();
        expect(loggedIn).toEqual(true);
        store.clearActions();
    });

    it('Has the correct payload when logged out.', () => {
        const action = changeAuth(false);
        const userId = action.payload.userId;
        const loggedIn = action.payload.loggedIn;
        expect(userId).toEqual(0);
        expect(loggedIn).toEqual(false);
        store.clearActions();
    });
});
