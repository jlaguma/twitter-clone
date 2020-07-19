import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import Home from 'components/Home';
import TweetBox from 'components/TweetBox';
import TweetsList from 'components/TweetsList';
import Pagination from 'components/Pagination';

let component: any;

beforeEach(() => {
    const testState = {
        auth: {
            userId: 2,
            loggedIn: true,
        },
    };
    component = mount(
        <Root initialState={testState}>
            <Home />
        </Root>
    );
});

describe('The Home component:', () => {
    it('Shows a tweeting box.', () => {
        expect(component.find(TweetBox).length).toEqual(1);
    });

    it('Shows a list of tweets.', () => {
        expect(component.find(TweetsList).length).toEqual(1);
    });

    it('Shows pagination.', () => {
        expect(component.find(Pagination).length).toEqual(1);
    });
});
