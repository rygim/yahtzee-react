require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {connect} from 'react-redux';
import {roll,toggleHold} from '../actions/yahtzee.js';

class YahtzeeDice extends React.Component {

  render() {
    var game = this.props.game;
    var id = game.get('id');
    var currentTurn = game.get('turns').last();

    if(currentTurn.get('player').get('name') !== game.get('me').get('name')) {
      return <div>waiting on other player</div>;
    }

    var rollButton = <a onClick={
              () => {
              this.props.roll(id);
         }} className='mdl-button mdl-js-button mdl-js-ripple-effect' data-upgraded=',MaterialButton,MaterialRipple'>Roll</a>;
    
    if(!currentTurn.get('roll')) {
        return (rollButton );
    }

    var dice = currentTurn.get('dice').toArray().map(
        (d,index) => {
            var val = d.get('value');
            if(d.get('held')) {
              val += ' - held';
            }

            return (<a key={index} onClick={
              () => {
                  this.props.toggleHold(id, index);
               }} className='mdl-button mdl-js-button mdl-js-ripple-effect' data-upgraded=',MaterialButton,MaterialRipple'>{val}</a>);
        });


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
    },
    toggleHold: (id, index) => {
      dispatch(toggleHold(id, index));
    }
  };
};

function mapStateToProps(state) {
  return {
    games: state.activeGames
  };
}

export default YahtzeeDice = connect(mapStateToProps, mapDispatchToEvents)(YahtzeeDice);
