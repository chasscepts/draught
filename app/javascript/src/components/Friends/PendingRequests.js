import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../reducers/authSlice';
import { loadPendingRequestsAsync, selectLoadingRequests, selectPendingRequests } from '../../reducers/friendsSlice';
import { confirmFriendAsync, rejectFriendAsync } from '../../reducers/inviteSlice';
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
  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(confirmFriendAsync(user))
  };

  const reject = () => {
    dispatch(rejectFriendAsync(user));
  };

  return (
    <li className={css.row}>
      <span className={css.username}>{user.username}</span>
      <button className={`${css.btn} ${css.green}`} type="button" onClick={confirm}>confirm</button>
      <button className={`${css.btn} ${css.red}`} type="button" onClick={reject}>reject</button>
    </li>
  );
};

const PendingRequests = () => {
  const user = useSelector(selectUser);
  const requests = useSelector(selectPendingRequests);
  const loading = useSelector(selectLoadingRequests);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      dispatch(loadPendingRequestsAsync());
    }
  }, []);

  if (!user) return <Message text="Please Login To View Your Friends" />;

  if (loading) return <Loader />;

  if (!(requests && requests.length)) return <Message text="You do not have any pending friend requests." />;

  return (<ul className={css.list}>
    {requests.map((friend) => <Row key={friend.id} user={friend} />)}
  </ul>);
};

export default PendingRequests;
