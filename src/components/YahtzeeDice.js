require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {connect} from 'react-redux';
import {roll} from '../actions/yahtzee.js';

class YahtzeeDice extends React.Component {

  render() {
        console.log("yahtzee dice render");
    var game = this.props.game;
    var currentTurns = game.turns.filter(t => t.result === undefined);
    if(currentTurns.length === 0){
      return <div>error... no current turn?</div>;
    }

    var currentTurn = currentTurns[0];
    
    if(currentTurn.player !== this.props.game.me.name) {
      return <div>waiting on other player</div>;
    }
    
    if(!currentTurn.roll) {
        console.log("no roll yet");
        return ( <a onClick={
              () => {
              this.props.roll(game.id);
              this.context.router.push('/game/' + game.id);
         }} className="mdl-button mdl-js-button mdl-js-ripple-effect" data-upgraded=",MaterialButton,MaterialRipple">Roll</a>)
    }


    var dice = currentTurn.dice.map(d => d.held ? <div>held: {d.value}</div> : <div>{d.value}</div>);
    if(currentTurn.roll > 2) {
       return <div>{dice}</div>;
    }

    return (<div>{dice}<div>roll button here</div></div>);
       
  }
}

YahtzeeDice.contextTypes = {
  router: React.PropTypes.object
};

const mapDispatchToEvents = (dispatch) => {
  return {
    roll: (id) => {
console.log("dispatching roll");
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
