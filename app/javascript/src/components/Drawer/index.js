import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import style from './style.module.css';
import { selectIsDrawerOpen } from '../../reducers/drawerSlice';

const Drawer = ({ children }) => {
  const open = useSelector(selectIsDrawerOpen);

  let drawerClass = style.drawer;
  if (open) {
    drawerClass = `${drawerClass} ${style.open}`;
  }

  return (
    <div className={drawerClass}>
      {children}
    </div>
  );
};

Drawer.propTypes = {
  children: PropTypes.elementType,
};

Drawer.defaultProps = {
  children: null,
};

export default Drawer;
