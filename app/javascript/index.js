import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.querySelector('#root'),
  );
};

document.addEventListener('DOMContentLoaded', () => {
  render(App);
});
