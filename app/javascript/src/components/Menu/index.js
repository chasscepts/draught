import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout, selectUser } from '../../reducers/authSlice';
import style from './style.module.css';
import loginBtn from '../../images/login.png';
import logoutBtn from '../../images/logout.png';
import home from '../../images/draught.png';
import registerBtn from '../../images/newmem.png';
import friendsBtn from '../../images/friends.png';
import Hamburger from '../Hamburger';

const ItemWrap = ({ size, children }) => (
  <div className={style.sideLink} style={{ display: 'flex', justifyContent: 'center', alignchilds: 'center' }}>
    <div style={{ width: `${size}px`, height: `${size}px` }}>{children}</div>
  </div>
);

ItemWrap.propTypes = {
  size: PropTypes.number,
};

ItemWrap.defaultProps = {
  size: 16,
}

const SessionButton = () => {
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

  return (
    <Link className={style.sideLink} to="/login" title="Sign In">
      <img src={loginBtn} alt="login" />
    </Link>
  );
};

const HomeButton = ({ pathname }) => {
  if (pathname === '/') return <ItemWrap size={16}><Hamburger /></ItemWrap>;
  return (
    <Link className={style.sideLink} to="/" title="Home">
      <ItemWrap>
        <img src={home} alt="home" />
      </ItemWrap>
    </Link>
  )
};

HomeButton.propTypes = {
  pathname: PropTypes.string.isRequired,
};

const Menu = () => {
  const { pathname } = useLocation();

  return (
    <aside className={style.aside}>
      <HomeButton pathname={pathname} />
      <SessionButton />
      <Link className={style.sideLink} to="/register" title="New Member Registration">
        <img src={registerBtn} alt="register" />
      </Link>
      <Link className={style.sideLink} to="/friends" title="Friends">
        <ItemWrap size={24}>
          <img src={friendsBtn} alt="friends" />
        </ItemWrap>
      </Link>
    </aside>
  );
};

export default Menu;
