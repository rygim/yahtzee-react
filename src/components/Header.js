require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class HeaderComponent extends React.Component {
  render() {
    return (
      <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Yahtzee</span>
        </div>
      </header>
    );
  }
}


HeaderComponent.defaultProps = {
};

export default HeaderComponent;
