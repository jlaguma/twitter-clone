import React from 'react';
import { mount, shallow } from 'enzyme';
import TweetBox from 'components/TweetBox';
import Root from 'Root';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

let component: any;

// const shallowWithStore = (component, store) => {
//     const context = {
//         store,
//     };
//     return shallow(component, { context });
// };
// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);
// const store = mockStore(testState);
// component = shallowWithStore(
//     <Root initialState={testState} >
//         <TweetBox />
//     </Root>,
//     store
// );

describe('The TweetBox component when logged in:', () => {
    beforeEach(() => {
        const testState = {
            auth: {
                userId: 2,
                loggedIn: true,
            },
        };
        component = mount(
            <Root initialState={testState}>
                <TweetBox />
            </Root>
        );
    });

    afterEach(() => {
        component.unmount();
    });

    it('Has a text area and a button.', () => {
        expect(component.find('textarea').length).toEqual(1);
        expect(component.find('button').length).toEqual(1);
    });

    describe('The text area:', () => {
        beforeEach(() => {
            component.find('textarea').simulate('change', {
                target: {
                    value: 'Hulk Smash!!!',
                },
            });
            // because setState is async function
            component.update();
        });

        it('Allows user to type in a text area.', () => {
            expect(component.find('textarea').prop('value')).toEqual(
                'Hulk Smash!!!'
            );
        });

        it('Clears a text area after form submission.', () => {
            component.find('form').simulate('submit');
            component.update();
            expect(component.find('textarea').prop('value')).toEqual('');
        });
    });
});

describe('The TweetBox component when not logged in:', () => {
    beforeEach(() => {
        const testState = {
            auth: {
                userId: 0,
                loggedIn: false,
            },
        };
        component = mount(
            <Root initialState={testState}>
                <TweetBox />
            </Root>
        );
    });

    afterEach(() => {
        component.unmount();
    });

    it('Should not be visible.', () => {
        expect(component.find('textarea').length).toEqual(0);
        expect(component.find('button').length).toEqual(0);
    });
});
