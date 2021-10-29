import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout, selectUser } from '../../reducers/authSlice';
import style from './style.module.css';
import loginBtn from '../../images/login.png';
import logoutBtn from '../../images/logout.png';
import home from '../../images/home.png';
import registerBtn from '../../images/newmem.png';
import Hamburger from '../Hamburger';

const SessionButton = ({ pathname }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signout = () => {
    dispatch(logout());
  };

  if (user) {
    return (
      <button className={style.sideLink} type="button" onClick={signout} title="Sign Out">
        <img src={logoutBtn} alt="logout" />
      </button>
    );
  }

  if (pathname === '/login') return <></>;

  return (
    <Link className={style.sideLink} to="/login" title="Sign In">
      <img src={loginBtn} alt="login" />
    </Link>
  );
};

SessionButton.propTypes = {
  pathname: PropTypes.string.isRequired,
};

const Menu = () => {
  const { pathname } = useLocation();

  return (
    <aside className={style.aside}>
      <Hamburger />
      <Link className={style.sideLink} to="/" title="Home">
        <img src={home} alt="home" />
      </Link>
      <SessionButton pathname={pathname} />
      {pathname !== '/register' && (
      <Link className={style.sideLink} to="/register" title="New Member Registration">
        <img src={registerBtn} alt="register" />
      </Link>
      )}
    </aside>
  );
}

export default Menu;
