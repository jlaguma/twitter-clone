import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'css/styles.min.css';
import App from 'components/App';
import * as serviceWorker from 'serviceWorker';
import Root from 'Root';

ReactDOM.render(
    <React.StrictMode>
        <Root>
            <BrowserRouter>
                <Route path="/" component={App} />
            </BrowserRouter>
        </Root>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
