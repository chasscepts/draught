import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  clearRegistrationError, registerAsync, selectRegistrationError,
  selectRegistrationSuccess, selectUser, setRegistrationSuccess,
} from '../../reducers/authSlice';
import style from './style.module.css';
import mb from '../css/mobileInput.module.css';
import LoadingButton from '../LoadingButton';

export default function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassord] = useState('');
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState(null);
  const user = useSelector(selectUser);
  const success = useSelector(selectRegistrationSuccess);
  const error = useSelector(selectRegistrationError);
  const dispatch = useDispatch();

  if (user) {
    return <Redirect to="/" />;
  }
  if (success) {
    setTimeout(() => dispatch(setRegistrationSuccess(false)), 0);
    return <Redirect to="/login" />;
  }
  if (error) {
    if (busy) {
      setBusy(false);
    }
    if (error !== localError) {
      setLocalError(error);
    }
    setTimeout(() => dispatch(clearRegistrationError()), 0);
  }

  const handleTextChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassord(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && username && password) {
      setBusy(true);
      dispatch(registerAsync(email, username, password));
    }
  };

  return (
    <div className={`${style.container} container`}>
      <form className={style.innerWrap} onSubmit={handleSubmit}>
        <h2 className={style.h2}>Registration</h2>
        {localError && <div className={style.error}>{localError}</div>}
        <input className={mb.text} type="email" name="email" value={email} placeholder="Enter Email" onChange={handleTextChange} />
        <input className={mb.text} type="text" name="username" value={username} placeholder="Enter Username" onChange={handleTextChange} />
        <input className={mb.text} type="password" name="password" value={password} placeholder="Enter Password" onChange={handleTextChange} />
        <LoadingButton type="submit" label="Register" loading={busy} styles={{ backgroundColor: '#9e0606' }} />
        <div className={style.controls}>
          <Link to="/login" className={style.link}>Login</Link>
        </div>
      </form>
    </div>
  );
}
