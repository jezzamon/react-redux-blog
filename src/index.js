import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './assets/css/material-kit.css';


import App from './components/App';
import Article from './components/Article'; //will look for index.js
import Home from './components/Home/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileFavorites from './components/ProfileFavorites';
import Register from './components/Register';
import Settings from './components/Settings';

import store from './store';

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="settings" component={Settings} />
        <Route path="article/:id" component={Article} />
        <Route path="@:username" component={Profile} />
				<Route path="@:username/favorites" component={ProfileFavorites} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('main'));