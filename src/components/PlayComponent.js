require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {MenuContainer} from './Menu';
import Header from './Header';
import YahtzeeGameActivity from './YahtzeeGameActivity';

class PlayComponent extends React.Component {
  render() {

    return (
    <div className="mdl-layout__container">
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <Header />
      <MenuContainer />
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-grid demo-content">
          <YahtzeeGameActivity gameId={this.props.params.gameid} />
        </div>
      </main>
    </div>
    </div>
    );
  }
}

PlayComponent.defaultProps = {
};

export default PlayComponent;
