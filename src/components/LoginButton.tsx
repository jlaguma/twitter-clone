import React, { FC, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeAuth } from 'actions/authActions';
import { AuthState } from 'constants/types';
import { RootState } from 'store';

interface Props {
    auth: AuthState;
    changeAuth: any;
    history: any;
}

const LoginButton: FC<Props> = ({ auth, changeAuth, history }) => {
    const handleAuth = (e: MouseEvent) => {
        e.preventDefault();
        changeAuth(!auth.loggedIn);
        // redirect to home page at login or log out
        history.push('/');
    };

    return (
        <div>
            <a
                className="login-button-link"
                onClick={(e) => handleAuth(e)}
                href="/"
            >
                {auth.loggedIn ? 'Logout' : 'Login'}
            </a>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return { auth: state.auth };
};

const mapDispatchToProps = {
    changeAuth,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginButton)
);
