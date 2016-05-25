
require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class StatsActivity extends React.Component {
  render() {
    return (
        <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col">
           This is the stats activity
        </div>
    );
  }
}


StatsActivity.defaultProps = {
};

export default StatsActivity;
