require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/yahtzee.js';
import YahtzeeBoard from './YahtzeeBoard';
import {Map} from 'immutable';

class YahtzeeGameActivity extends React.Component {
  render() {
    var gameId = this.props.gameId;
    var game = this.props.games.get(gameId);
    
    return (
        <div className='demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col'>
           <h2>Game with {game.get('otherUser').get('name')}</h2>
           <YahtzeeBoard game={game} />
        </div>
    );
  }
}

YahtzeeGameActivity.defaultProps = {
};

function mapStateToProps(state) {
  let games = state.yahtzee.get('activeGames', Map());
  
  return {
    games: games
  };
}


export default YahtzeeGameActivity = connect(mapStateToProps, actionCreators)(YahtzeeGameActivity);
