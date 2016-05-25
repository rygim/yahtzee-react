require('normalize.css/normalize.css');
require('styles/App.css');
import {startGame} from '../actions/yahtzee.js';
import React from 'react';
import {connect} from 'react-redux';

class StartGameComponent extends React.Component {
  render() {
    return (
      <div className="mdl-card__actions mdl-card--border">
        <a onClick={() => this.props.startGame(this.props.username)} class="mdl-button mdl-js-button mdl-js-ripple-effect" data-upgraded=",MaterialButton,MaterialRipple">
          {this.props.username}
          <span class="mdl-button__ripple-container">
              <span class="mdl-ripple is-animating"></span>
          </span>
        </a>
      </div>
    );
  }
}

const mapDispatchToEvents = (dispatch) => {
  return {
    startGame: (otherPerson) => {
      dispatch(startGame(otherPerson));
    }
  };
};

export default StartGameComponent = connect(() => { return {} }, mapDispatchToEvents)(StartGameComponent);

