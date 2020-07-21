import React, { FC, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeAuth } from 'actions/authActions';
import { State } from 'constants/types';

interface Props {
    history: any;
}

const LoginButton: FC<Props> = ({ history }) => {
    const auth = useSelector((state: State) => state.auth);
    const dispatch = useDispatch();

    const handleAuth = (e: MouseEvent) => {
        e.preventDefault();
        // changeAuth(!auth.loggedIn);
        dispatch(changeAuth(!auth.loggedIn));
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

// const mapStateToProps = (state: RootState) => {
//     return { auth: state.auth };
// };

// const mapDispatchToProps = {
//     changeAuth,
// };

export default withRouter(LoginButton);
