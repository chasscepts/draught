import React from 'react';
import LdsRing from './LdsRing';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Loader = () => (
  <div style={styles.container}>
    <LdsRing width={60} color="blue" />
  </div>
);

export default Loader;
