import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadSuggestionsAsync,
  selectLoadingSuggestions,
  selectSuggestions,
  selectSuggestionsPage,
} from '../../reducers/friendsSlice';
import Message from './Message';
import Loader from '../Loader';
import { sendRequestAsync } from '../../reducers/inviteSlice';

const styles = {
  noSuggestionsPrompt: {
    fontSize: '3rem',
    color: '#6e0c0c',
  },
  list: {
    listStyle: 'none',
    padding: '15px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  username: {
    width: '120px',
  },
  inviteBtn: {
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#137e07',
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },
};

/**
 * @param {Object} props
 * @param {Object} props.user
 * @param {number} props.user.id
 * @param {string} props.user.username
 */
const Row = ({ user }) => {
  const dispatch = useDispatch();

  const sendRequest = () => {
    dispatch(sendRequestAsync(user))
  };

  return (
    <li style={styles.row}>
      <span style={styles.username}>{user.username}</span>
      <button style={styles.inviteBtn} type="button" onClick={sendRequest}>Send Invite</button>
    </li>
  );
}

const FriendSuggestions = () => {
  const suggestions = useSelector(selectSuggestions);
  const loadingSuggestions = useSelector(selectLoadingSuggestions);
  const page = useSelector(selectSuggestionsPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingSuggestions && page === 0) {
      dispatch(loadSuggestionsAsync());
    }
  }, []);

  if (page === 0) {
    if (loadingSuggestions) return <Loader />;
  }

  if (!suggestions || suggestions.length <= 0) return <Message text="You do not have any friend suggestions!" />;

  const sendRequest = (id) => {

  };

  return(
    <ul style={styles.list}>
      {suggestions.map((user) => <Row key={user.id} user={user}  />)}
    </ul>
  );
}

export default FriendSuggestions;
