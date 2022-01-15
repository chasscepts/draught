import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../reducers/authSlice';
import FriendSuggestions from './FriendSuggestions';
import MyFriends from './MyFriends';
import PendingRequests from './PendingRequests';
import css from './style.module.css';

const headerClass = (isActive) => isActive ? `${css.headerBtn} ${css.active}` : css.headerBtn;

const Friends = () => {
  const user = useSelector(selectUser);
  const [selectedTab, setSelectedTab] = useState('friends');

  if (!user) return (
    <div className="centralize">
      <div className={css.loginPrompt}>
        <div>You must be logged in to view your friends.</div>
        <div>
          <span>Please</span>
          <Link to='/login'>Login</Link>
          <span>or</span>
          <Link to='/register'>create an account.</Link>
        </div>
      </div>
    </div>
  );

  const handleClick = ({ target: { name } }) => setSelectedTab(name);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <button
          className={headerClass(selectedTab === 'friends')}
          name="friends"
          type="button"
          onClick={handleClick}
        >
          My Friends
        </button>
        <button
          className={headerClass(selectedTab === 'pending')}
          name="pending"
          type="button"
          onClick={handleClick}
        >
          Friend Requests
        </button>
        <button
          className={headerClass(selectedTab === 'users')}
          name="users"
          type="button"
          onClick={handleClick}
        >
          Find Friends
        </button>
      </div>
      <div className={css.tabs}>
        {selectedTab === 'users' && <FriendSuggestions />}
        {selectedTab === 'friends' && <MyFriends />}
        {selectedTab === 'pending' && <PendingRequests />}
      </div>
    </div>
  );
}

export default Friends;
