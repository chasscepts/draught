import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import style from './style.module.css';
import store from '../../app/store';
import Draught from '../Draught';
import LoginPage from '../LoginPage';
import RegistrationPage from '../RegistrationPage';
import Menu from '../Menu';

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className={style.container}>
          <main className={style.main}>
            <Switch>
              <Route exact path="/" component={Draught} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegistrationPage} />
            </Switch>
          </main>
          <Menu />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

export default App;
