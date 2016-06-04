require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/yahtzee.js';

class GameListActivity extends React.Component {
  render() {
    var self = this;
    return (
        <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col">
           <h2>Games</h2>
           <h4>Active Games</h4>
           <ul>
           {Object.keys(this.props.games).map(gameId =>
        <li key={this.props.games[gameId]}><a onClick={
              () => {
              self.context.router.push('/game/' + gameId);
         }} className="mdl-button mdl-js-button mdl-js-ripple-effect" data-upgraded=",MaterialButton,MaterialRipple">{this.props.games[gameId].otherUser.name}</a></li>)}
           </ul>
           <h4>Completed Games</h4>
        </div>
    );
  }
}

GameListActivity.defaultProps = {
};

GameListActivity.contextTypes = {
  router: React.PropTypes.object
};

function mapStateToProps(state) {
  let games = state.yahtzee.activeGames || {};
  
  return {
    games: games
  };
}

export default GameListActivity = connect(mapStateToProps, actionCreators)(GameListActivity);
