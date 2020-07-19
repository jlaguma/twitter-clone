import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import Header from 'components/Header';
import Home from 'components/Home';
import UserProfile from 'components/UserProfile';
import Stats from 'components/Stats';

const App: FC = () => {
    return (
        <>
            <Header />
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/profile" component={UserProfile} />
                <Route exact path="/stats" component={Stats} />
                <Route exact path="/stats/:id" component={Stats} />
            </div>
        </>
    );
};

export default App;
