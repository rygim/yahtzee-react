require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {MenuContainer} from './Menu';
//import Cards from './Cards';
import GameListActivity from './GameListActivity';
import Header from './Header';
//import Notifications from './Notifications';

class GameComponent extends React.Component {

//          <Notifications />
//          <GameListActivity />
//          <Cards />


  render() {
    return (
    <div className="mdl-layout__container">
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <Header />
      <MenuContainer />
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-grid demo-content">
          <GameListActivity />
        </div>
      </main>
    </div>
</div>
    );
  }
}

GameComponent.defaultProps = {
};

export default GameComponent;
