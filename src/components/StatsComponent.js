require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {MenuContainer} from './Menu';
import Cards from './Cards';
import StatsActivity from './StatsActivity';
import Header from './Header';
import Notifications from './Notifications';

class StatsComponent extends React.Component {
  render() {
    return (
    <div className="mdl-layout__container">
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <Header />
      <MenuContainer />
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-grid demo-content">
          <Notifications />
          <StatsActivity />
          <Cards />
        </div>
      </main>
    </div>
</div>
    );
  }
}

StatsComponent.defaultProps = {
};

export default StatsComponent;
