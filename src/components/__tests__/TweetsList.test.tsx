import React from 'react';
import { mount } from 'enzyme';
import TweetsList from 'components/TweetsList';
import Root from 'Root';

let component: any;

beforeEach(() => {
    const tweets = [
        {
            id: 1,
            tweet: 'Hulk Smash!!!',
            date: '2020-07-19',
            claps: 123,
            userId: 2,
        },
        {
            id: 2,
            tweet: 'Just a random tweet...',
            date: '2020-07-19',
            claps: 321,
            userId: 2,
        },
    ];
    const initialState = {
        tweets: {
            loading: false,
            error: '',
            tweets: tweets,
        },
    };

    component = mount(
        <Root initialState={initialState}>
            <TweetsList tweets={tweets} />
        </Root>
    );
});

afterEach(() => {
    component.unmount();
});

describe('The TweetsList component:', () => {
    it('Creates one LI per tweet.', () => {
        expect(component.find('li').length).toEqual(2);
    });

    it('Shows the text for each tweet.', () => {
        expect(component.render().text()).toContain('Hulk Smash!!!');
        expect(component.render().text()).toContain('Just a random tweet...');
    });
});
