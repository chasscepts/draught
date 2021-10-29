import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
  selectLoginError, loginAsyn, selectUser, clearLoginError,
} from '../../reducers/authSlice';
import style from './style.module.css';
import mb from '../css/mobileInput.module.css';
import LoadingButton from '../LoadingButton';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
  const [localError, setLocalError] = useState(null);
  const [busy, setBusy] = useState(false);
  const error = useSelector(selectLoginError);
  const user = useSelector(selectUser);
  const state = useLocation();
  const dispatch = useDispatch();

  if (user) {
    return <Redirect to={state?.from || '/'} />;
  }

  if (error) {
    if (busy) {
      setBusy(false);
    }
    if (error !== localError) {
      setLocalError(error);
    }
    setTimeout(() => dispatch(clearLoginError()), 0);
  }

  const handleTextChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassord(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setBusy(true);
      dispatch(loginAsyn(email, password));
    }
  };

  return (
    <div className={`${style.container} container`}>
      <form className={style.innerWrap} onSubmit={handleSubmit}>
        <h2 className={style.h2}>Sign In</h2>
        {localError && <div className={style.error}>{localError}</div>}
        <input className={mb.text} type="text" name="email" value={email} placeholder="Enter Email" onChange={handleTextChange} />
        <input className={mb.text} type="password" name="password" value={password} placeholder="Enter Password" onChange={handleTextChange} />
        <LoadingButton type="submit" label="Log In" loading={busy} />
        <div className={style.controls}>
          <Link to="/register" className={style.link}>Register</Link>
        </div>
      </form>
    </div>
  );
}
