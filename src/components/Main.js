require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import GameComponent from './GameComponent';
import FriendsComponent from './FriendsComponent';
import PlayComponent from './PlayComponent';
import StatsComponent from './StatsComponent';
import { Router, Route, hashHistory } from 'react-router';

class AppComponent extends React.Component {
  render() {
    return (
        <Router history={hashHistory}>
          <Route path="/" component={GameComponent} />
          <Route path="/list" component={GameComponent} />
          <Route path="/friends" component={FriendsComponent} />
          <Route path="/game" component={PlayComponent} />
          <Route path="/stats" component={StatsComponent} />
        </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
