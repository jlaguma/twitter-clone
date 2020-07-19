import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import reducer from 'store';

const Root = ({ children, initialState = {} }) => {
    let store = createStore(
        reducer,
        initialState,
        applyMiddleware(thunk, reduxPromise)
    );
    return <Provider store={store}>{children}</Provider>;
};

export default Root;
