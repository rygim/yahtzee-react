require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/yahtzee.js';
import {Map} from 'immutable';

class GameListActivity extends React.Component {
  render() {
    return (
        <div className='demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col'>
           <h2>Games</h2>
           <h4>Active Games</h4>
           <ul>
           {this.props.games.keySeq().toArray().map(gameId =>
        <li key={this.props.games.get(gameId)}><a onClick={
              () => {
              this.context.router.push('/game/' + gameId);
         }} className='mdl-button mdl-js-button mdl-js-ripple-effect' data-upgraded=',MaterialButton,MaterialRipple'>{this.props.games.get(gameId).get('otherUser').get('name')}</a></li>)}
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
  let games = state.yahtzee.get('activeGames', Map());
  
  return {
    games: games
  };
}

export default GameListActivity = connect(mapStateToProps, actionCreators)(GameListActivity);
