import PropTypes from 'prop-types';
import style from './style.module.css';
import LdsRing from '../LdsRing';

/* eslint-disable react/forbid-prop-types */

export default function LoadingButton({
  type, label, loading, styles, onClick, ringColor,
}) {
  if (!loading) {
    return (
      <button
        style={styles}
        className={style.btn}
        type={type === 'submit' ? 'submit' : 'button'}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
  return (
    <div style={{ ...styles }} className={`${style.btn} ${style.busy}`}>
      <LdsRing width={30} color={ringColor} />
    </div>
  );
}

LoadingButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  styles: PropTypes.object,
  onClick: PropTypes.func,
  ringColor: PropTypes.string,
};

LoadingButton.defaultProps = {
  type: 'button',
  loading: false,
  styles: {},
  ringColor: '#fff',
  onClick: null,
};
