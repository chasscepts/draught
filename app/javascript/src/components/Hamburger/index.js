import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { selectIsDrawerOpen, toggleState } from '../../reducers/drawerSlice';
import style from './style.module.css';

const Hamburger = () => {
  const open = useSelector(selectIsDrawerOpen);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  if (pathname !== '/') return <></>;

  const handleClick = () => {
    dispatch(toggleState());
  };

  let className = style.hamburger;
  if (open) {
    className = `${className} ${style.open}`;
  }

  return (
    <button className={className} type="button" onClick={handleClick}><span /></button>
  );
}

export default Hamburger;
