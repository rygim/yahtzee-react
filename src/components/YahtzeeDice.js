require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {connect} from 'react-redux';
import {roll} from '../actions/yahtzee.js';

class YahtzeeDice extends React.Component {

  render() {
    var game = this.props.game;
    var currentTurns = game.get('turns').toArray().filter(t => t.result === undefined);
    if(currentTurns.length === 0){
      return <div>error... no current turn?</div>;
    }

    var currentTurn = currentTurns[0];
    
    if(currentTurn.get('player').get('name') !== game.get('me').get('name')) {
      return <div>waiting on other player</div>;
    }

    var rollButton = <a onClick={
              () => {
              this.props.roll(game.get('id'));
         }} className='mdl-button mdl-js-button mdl-js-ripple-effect' data-upgraded=',MaterialButton,MaterialRipple'>Roll</a>;
    
    if(!currentTurn.get('roll')) {
        return (rollButton );
    }

    var dice = currentTurn.get('dice').toArray().map((d,index) => d.get('held') ? <div key={index}>held: {d.get('value')}</div> : <div key={index}>{d.get('value')}</div>);
    if(currentTurn.get('roll') > 2) {
       return <div>{dice}<div>Score the dice!</div></div>;
    }

    return (<div>{dice}<div>{rollButton}</div></div>);
       
  }
}

YahtzeeDice.contextTypes = {
  router: React.PropTypes.object
};

const mapDispatchToEvents = (dispatch) => {
  return {
    roll: (id) => {
      dispatch(roll(id));
    }
  };
};

function mapStateToProps(state) {
  return {
    games: state.activeGames
  };
}

export default YahtzeeDice = connect(mapStateToProps, mapDispatchToEvents)(YahtzeeDice);
