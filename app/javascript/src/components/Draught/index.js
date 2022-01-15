import React from 'react';
import Drawer from '../Drawer';
import style from './style.module.css';

const cellBg = (x, y) => {
  let bg;
  if (x === y) {
    bg =  '#701c1c';
  } else if ((x % 2 !== 0 && y % 2 === 0) || (x % 2 === 0 && y % 2 !== 0)) {
    bg = '#e8c797';
  } else {
    bg = '#312b25';
  }
  return { backgroundColor: bg };
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
    <div className={style.container}>
      <div className={style.board}>
        {cells.map((cell) => <div className={style.cell} style={cellBg(cell.row, cell.col) } key={cell.name} />)}
      </div>
      <Drawer />
    </div>
  );
};

export default App;
