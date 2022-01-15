import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../reducers/authSlice';
import { loadFriendsAsync, selectFriends, selectLoadingFriends } from '../../reducers/friendsSlice';
import css from './style.module.css';
import Loader from '../Loader';
import Message from './Message';

/**
 * @param {Object} props
 * @param {Object} props.user
 * @param {number} props.user.id
 * @param {string} props.user.username
 */
const Row = ({ user }) => {
  const unfriend = () => {
    
  };

  return (
    <li className={css.row}>
      <span className={css.username}>{user.username}</span>
      <button className={`${css.btn} ${css.red}`} type="button" onClick={unfriend}>unfriend</button>
    </li>
  );
};

const MyFriends = () => {
  const user = useSelector(selectUser);
  const friends = useSelector(selectFriends);
  const loading = useSelector(selectLoadingFriends);
  const dispatch = useDispatch();

  useEffect(() => dispatch(loadFriendsAsync()), []);

  if (!user) return <Message text="Please Login To View Your Friends" />;

  if (loading) return <Loader />;

  if (!(friends && friends.length)) return <Message text="You have not made any friends yet!" />;

  return (<ul className={css.list}>
    {friends.map((friend) => <Row key={friend.id} user={friend} />)}
  </ul>);
};

export default MyFriends;
