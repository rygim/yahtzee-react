require('normalize.css/normalize.css');
require('styles/App.css');

import {connect} from 'react-redux';
import React from 'react';
import YahtzeeDice from './YahtzeeDice';
import {scoreDice} from '../actions/yahtzee.js';

class YahtzeeBoard extends React.Component {

  userBoard(user) {
    var turns = this.props.game.get('turns').toArray().filter((t) => t.get('player').get('name') === user);
    var keyOrder = ['ones','twos','threes','fours','fives','sixes','three of a kind','four of a kind','full house','small straight','large straight','yahtzee','chance'];
    var userTurns = {};
    keyOrder.forEach(key => userTurns[key] = turns.filter(t => t.get('score') === key));
    return userTurns;
  }
  
  render() {
   var game = this.props.game;
   var id = game.get('id');
   var name = game.get('me').get('name');
   var otherUserName = game.get('otherUser').get('name');
   var board = this.userBoard(name);
   console.log(board);
//   var opponentBoard = this.userBoard(otherUserName);
    var keyOrder = ['ones','twos','threes','fours','fives','sixes','three of a kind','four of a kind','full house','small straight','large straight','yahtzee','chance'];


//},'twos','threes','fours','fives','sixes'].map((scoreElement) => {

  var totalFromNum = (dice, val) => {
     return dice.filter(d => d === val)
           .reduce((start, d) => d + start, 0) 
  };
 
  var total = (dice, success) => {
    if(success(dice)){
      return dice.reduce((start, d) => d + start, 0);
    }
  
    return 0;
  };

  var createFromScoreElement = (scoreElement) => {
     var show = " - ";
     var score = scoreElement.score;
     if(board[score].length > 0) {
       var diceValues = board[score][0].get('dice').toArray().map(d => d.get('value'));
       show = scoreElement.calc(diceValues);
     }

     return (
       <tr key={score}>
         <td>{scoreElement.display}</td>
         <td>
           <a key={score} onClick={() => this.props.score(id, score)} className='mdl-button mdl-js-button mdl-js-ripple-effect' data-upgraded=',MaterialButton,MaterialRipple'>{show}</a>;
         </td>
         <td>-</td>
       </tr>)
  };
    
  var topSection = [
                     { score: 'ones', display: 'Ones', calc: (dice) => totalFromNum(dice, 1) },
                     { score: 'twos', display: 'Twos', calc: (dice) => totalFromNum(dice, 2) },
                     { score: 'threes', display: 'Threes', calc: (dice) => totalFromNum(dice, 3) },
                     { score: 'fours', display: 'Fours', calc: (dice) => totalFromNum(dice, 4) },
                     { score: 'fives', display: 'Fives', calc: (dice) => totalFromNum(dice, 5) },
                     { score: 'sixes', display: 'Sixes', calc: (dice) => totalFromNum(dice, 6) }
                  ].map(createFromScoreElement);

  var lowerSection = [
                     { score: 'three of a kind', display: 'Three Of A Kind', calc: (dice) => total(dice, (dice) => {
                        var diceCount = {};
                        dice.forEach(d => {diceCount[d] = diceCount[d] || 0; diceCount[d] += 1;});
                        return Object.keys(diceCount).filter(k => diceCount[k] >= 3).length != 0;
                     }) },
                  ].map(createFromScoreElement);



//    var lowerSection = ['three of a kind','four of a kind','full house','small straight','large straight','yahtzee','chance'].map((score) => {return (
//         <tr key={score}>
//           <td>{score}</td>
//           <td>
//             <a key={score} onClick={() => this.props.score(id, score)} className='mdl-button mdl-js-button mdl-js-ripple-effect' data-upgraded=',MaterialButton,MaterialRipple'>-</a>;
//           </td>
//           <td>-</td>
//         </tr>);});

    return (
      <div>
      <YahtzeeDice game={this.props.game} />
      <table>
         <thead>
           <tr><th></th><th>{name}</th><th>{otherUserName}</th></tr>
           <tr><th>Move</th><th>Your Score</th><th>Their Score</th></tr>
         </thead>
       <tbody>
         {topSection}
         <tr><td>Upper Subtotal</td><td>-</td><td>-</td></tr>
         <tr><td>Bonus</td><td>-</td><td>-</td></tr>
         <tr><td>Upper Total</td><td>-</td><td>-</td></tr>
         {lowerSection}
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

const mapDispatchToEvents = (dispatch) => {
  return {
    score: (id, score) => {
      dispatch(scoreDice(id, score));
    }
  };
};

function mapStateToProps() {
  return {
  };
}

export default YahtzeeBoard = connect(mapStateToProps, mapDispatchToEvents)(YahtzeeBoard);
