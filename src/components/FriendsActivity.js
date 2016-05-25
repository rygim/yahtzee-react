require('normalize.css/normalize.css');
require('styles/App.css');
import * as actionCreators from '../actions/yahtzee.js';
import React from 'react';
import {connect} from 'react-redux';
import StartGameComponent from './StartGame';

class FriendsActivity extends React.Component {

  render() {
    return (
        <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col">
           <h2>Friends</h2>
            <ul>
           {this.props.friends.length == 0 ? 'Start playing with someone below!' :
                 this.props.friends.map(f => <li key={f.username}>{f.username}</li>)}
            </ul>
           <h4>People</h4>
             {this.props.people.map(p => <li key={p.username}><StartGameComponent username={p.username} /></li>)}
        </div>
    );
  }
}

FriendsActivity.defaultProps = {
};

function mapStateToProps(state) {
  let friends = state.yahtzee.friends || [];
  let people = state.yahtzee.users || [];

  return {
    friends: friends,
    people: people
  };
}

export default FriendsActivity = connect(mapStateToProps, actionCreators)(FriendsActivity);
