import React from 'react';
import PropTypes from 'prop-types';
import css from './style.module.css';

const Message = ({ text }) => (
  <div className="centralize">
    <div className={css.centeredText}>
      {text}
    </div>
  </div>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;
