require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class ActivityComponent extends React.Component {
  render() {
    return (
        <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col">
        </div>
    );
  }
}


ActivityComponent.defaultProps = {
};

export default ActivityComponent;
