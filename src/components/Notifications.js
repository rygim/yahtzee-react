require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class NotificationComponent extends React.Component {
  render() {
    return (
          <div className="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
          </div>
    );
  }
}


NotificationComponent.defaultProps = {
};

export default NotificationComponent;
