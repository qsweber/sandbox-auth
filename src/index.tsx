import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { App } from './pages/App';
import { Login } from './pages/Login';
import { Forgot } from './pages/Forgot';
import { Register } from './pages/Register';
import { Verify } from './pages/Verify';
import { Reset } from './pages/Reset';
import { SignOut } from './pages/SignOut';
import * as serviceWorker from './serviceWorker';


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot" component={Forgot} />
      <Route path="/reset" component={Reset} />
      <Route path="/verify" component={Verify} />
      <Route path="/logout" component={SignOut} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
