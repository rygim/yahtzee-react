require('normalize.css/normalize.css');
require('styles/App.css');
import {startGame} from '../actions/yahtzee.js';
import React from 'react';
import {connect} from 'react-redux';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

class StartGameComponent extends React.Component {
  render() {
    return (
      <div className="mdl-card__actions mdl-card--border">
        <a onClick={
              () => {
              var id = guid();
              this.props.startGame(this.props.username, id);
              this.context.router.push('/game/' + id);
         }} className="mdl-button mdl-js-button mdl-js-ripple-effect" data-upgraded=",MaterialButton,MaterialRipple">
          {this.props.username}
          <span className="mdl-button__ripple-container">
              <span className="mdl-ripple is-animating"></span>
          </span>
        </a>
      </div>
    );
  }
}

StartGameComponent.contextTypes = {
  router: React.PropTypes.object
};

const mapDispatchToEvents = (dispatch) => {
  return {
    startGame: (otherPerson, id) => {
      dispatch(startGame(otherPerson, id));
    }
  };
};

function mapStateToProps() {
  return {
    
  };
}

export default StartGameComponent = connect(mapStateToProps, mapDispatchToEvents)(StartGameComponent);

