import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginButton from 'components/LoginButton';
import { AuthState } from 'constants/types';
import Logo from 'images/logo.png';
import { RootState } from 'store';
import Notification from 'components/Notification';

interface Props {
    auth: AuthState;
}

const Header: FC<Props> = ({ auth }) => {
    return (
        <div className="header">
            <ul>
                <li className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Logo" />
                    </Link>
                </li>
                <li className={auth.loggedIn ? '' : 'hidden'}>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/stats">Stats</Link>
                </li>
                <li>
                    <LoginButton />
                </li>
            </ul>
            <Notification />
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
