require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/yahtzee.js';

class GameListActivity extends React.Component {

  render() {
    return (
        <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col">
           <h2>Games</h2>
           <h4>Active Games</h4>
           <ul>
           {this.props.games.length == 0 ? 'You have no active games!  Begin one with your friends' : this.props.games.map(g => g.otherUser.username)}
           </ul>
           <h4>Completed Games</h4>
           {this.props.completedGames.length == 0 ? 'You have no completed games!  Complete a game to make it show here' : this.props.completedGames.map(g => g.otherUser.username)}
        </div>
    );
  }
}


GameListActivity.defaultProps = {
};

function mapStateToProps(state) {
  let games = state.yahtzee.activeGames || [];
  let completedGames = state.yahtzee.completedGames || [];
  
  return {
    games: games,
    completedGames: completedGames
  };
}

export default GameListActivity = connect(mapStateToProps, actionCreators)(GameListActivity);
