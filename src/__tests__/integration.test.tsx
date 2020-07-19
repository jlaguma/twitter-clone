import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import axios from 'apis/jsonServer';
import Root from 'Root';
import Home from 'components/Home';
import Claps from 'components/Claps';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);
// const store = mockStore(state);

let component;
const mockResponse = [
    {
        id: 1,
        tweet: 'Hulk Smash!',
        userId: 2,
        date: '2020-07-18',
        claps: 317,
    },
    {
        id: 2,
        tweet: 'Where is Thor???',
        userId: 2,
        date: '2020-07-18',
        claps: 321,
    },
    {
        id: 3,
        tweet: 'Sleeping...',
        userId: 4,
        date: '2020-07-18',
        claps: 12,
    },
];

beforeEach(() => {
    moxios.install(axios);
});

afterEach(() => {
    moxios.uninstall(axios);
});

describe('Integration Tests:', () => {
    describe('Home page:', () => {
        beforeEach(() => {
            moxios.stubRequest(`/tweets?_sort=date&_order=desc`, {
                status: 200,
                response: mockResponse,
            });
        });
        it('Loads tweets from API on load.', (done) => {
            const state = {
                auth: {
                    userId: 2,
                    loggedIn: true,
                },
                tweets: {
                    loading: false,
                    error: '',
                    tweets: [],
                },
            };
            component = mount(
                <Root initialState={state}>
                    <Home />
                </Root>
            );
            moxios.wait(function () {
                component.update();
                // // there are 2 ul elements, 2nd one is pagination
                expect(component.find('ul').at(0).find('li').length).toEqual(3);
                component.unmount();
                done();
            });
        });
    });
});
