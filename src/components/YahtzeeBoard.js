require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import YahtzeeDice from './YahtzeeDice';

class YahtzeeBoard extends React.Component {

  userBoard(user) {
    var turns = this.props.game.turns.filter((t) => t.player === user);
    var keyOrder = ['ones','twos','threes','fours','fives','sixes','three of a kind','four of a kind','full house','small straight','large straight','yahtzee','chance'];
    var userTurns = {};
    keyOrder.forEach(key => userTurns[key] = turns.filter(t => t.result === key));
    return userTurns;
  }
  
  render() {
   var game = this.props.game;
   var board = this.userBoard(this.props.game.me.name);
   var opponentBoard = this.userBoard(this.props.game.otherUser.name);

    return (
      <div>
      <YahtzeeDice game={this.props.game} />
      <table>
         <thead>
           <tr><th></th><th>{game.me.name}</th><th>{game.otherUser.name}</th></tr>
           <tr><th>Move</th><th>Your Score</th><th>Their Score</th></tr>
         </thead>
       <tbody>
         <tr><td>Ones</td><td>-</td><td>-</td></tr>
         <tr><td>Twos</td><td>-</td><td>-</td></tr>
         <tr><td>Threes</td><td>-</td><td>-</td></tr>
         <tr><td>Fours</td><td>-</td><td>-</td></tr>
         <tr><td>Fives</td><td>-</td><td>-</td></tr>
         <tr><td>Sixes</td><td>-</td><td>-</td></tr>
         <tr><td>Upper Subtotal</td><td>-</td><td>-</td></tr>
         <tr><td>Bonus</td><td>-</td><td>-</td></tr>
         <tr><td>Upper Total</td><td>-</td><td>-</td></tr>
         <tr><td>Three of a kind</td><td>-</td><td>-</td></tr>
         <tr><td>Four of a kind</td><td>-</td><td>-</td></tr>
         <tr><td>Full House</td><td>-</td><td>-</td></tr>
         <tr><td>Small Straight</td><td>-</td><td>-</td></tr>
         <tr><td>Large Straight</td><td>-</td><td>-</td></tr>
         <tr><td>Yahtzee</td><td>-</td><td>-</td></tr>
         <tr><td>Chance</td><td>-</td><td>-</td></tr>
         <tr><td>Lower Total</td><td>-</td><td>-</td></tr>
         <tr><td>Upper Total</td><td>-</td><td>-</td></tr>
         <tr><td>Total</td><td>-</td><td>-</td></tr>
       </tbody>
      </table>
      </div>
    );
  }
}

YahtzeeBoard.defaultProps = {
};

export default YahtzeeBoard;
