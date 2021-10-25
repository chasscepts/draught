import React from 'react';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gridTemplateRows: 'repeat(10, 1fr)',
  },
  cell: (x, y) => {
    let bg;
    if (x === y) {
      bg = 'red';
    } else if ((x % 2 !== 0 && y % 2 === 0) || (x % 2 === 0 && y % 2 !== 0)) {
      bg = '#e8c797';
    } else {
      bg = '#312b25';
    }
    return {
      width: '100%',
      height: '100%',
      backgroundColor: bg,
    };
  },
};

const cells = (() => {
  const cells = [];
  [...Array(10)].forEach((it1, idx1) => {
    [...Array(10)].forEach((it2, idx2) => {
      cells.push({ row: idx1, col: idx2, name: `cell ${idx2}${idx1}` });
    });
  });
  return cells;
})();

const App = () => {

  return (
    <div style={styles.container}>
      {cells.map((cell) => <div style={styles.cell(cell.row, cell.col)} key={cell.name} />)}
    </div>
  );
};

export default App;
