require('normalize.css/normalize.css');
require('styles/App.css');
import * as actionCreators from '../actions/yahtzee.js';
import React from 'react';
import {connect} from 'react-redux';
import StartGameComponent from './StartGame';

class FriendsActivity extends React.Component {
  render() {
    return (
        <div className='demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col'>
           <h2>Friends</h2>
            <ul>
           {this.props.friends.length == 0 ? 'Start playing with someone below!' :
                 this.props.friends.toArray().map(f => <li key={f}>{f}</li>)}
            </ul>
           <h4>People</h4>
             {this.props.people.toArray().map(p => <li key={p}><StartGameComponent username={p} /></li>)}
        </div>
    );
  }
}

FriendsActivity.defaultProps = {
};

function mapStateToProps(state) {
  let friends = state.yahtzee.get('users');
  let people = state.yahtzee.get('users');

  return {
    friends: friends,
    people: people
  };
}

export default FriendsActivity = connect(mapStateToProps, actionCreators)(FriendsActivity);
