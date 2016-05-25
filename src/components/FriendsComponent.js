require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {MenuContainer} from './Menu';
//import Cards from './Cards';
import FriendsActivity from './FriendsActivity';
import Header from './Header';
//import Notifications from './Notifications';

class FriendsComponent extends React.Component {
//          <Notifications />
//          <FriendsActivity />
//          <Cards />
  render() {
    return (
    <div className="mdl-layout__container">
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <Header />
      <MenuContainer />
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-grid demo-content">
          <FriendsActivity />
        </div>
      </main>
    </div>
</div>
    );
  }
}

FriendsComponent.defaultProps = {
};

export default FriendsComponent;
