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
   var opponentBoard = this.userBoard(otherUserName);
   var keyOrder = ['ones','twos','threes','fours','fives','sixes','three of a kind','four of a kind','full house','small straight','large straight','yahtzee','chance'];

  var totalFromNum = (dice, val) => {
     return dice.filter(d => d === val)
           .reduce((start, d) => d + start, 0) 
  };

  var sum = (dice) => {
      return dice.reduce((start, d) => d + start, 0);
  };

  var bucketDice = (dice) => {
    var diceCount = {};
    dice.forEach(d => {diceCount[d] = diceCount[d] || 0; diceCount[d] += 1;});
    return diceCount;
  };

  var numSame = (num) => {
    return (dice) => {
      var diceBucket = bucketDice(dice);
      return Object.keys(diceBucket).filter(k => diceBucket[k] >= num).length != 0;
    };
  };
 
  var total = (calc, success, dice) => {
    if(success(dice)){
      if(typeof calc === 'function'){
        return calc(dice);
      }
        
      return calc;
    }
  
    return 0;
  };

  var isFullHouse = (dice) => {
   var diceBucket = bucketDice(dice);
   var hasThree = false;
   var hasTwo = false;
   Object.keys(diceBucket).forEach(bucket => 
     {
       hasThree |= diceBucket[bucket] === 3;
       hasTwo |= diceBucket[bucket] === 2;
     })
 
    return hasThree && hasTwo;
  };

  var containsDice = (combos) => {
    return (dice) => {
       var matches = false;
       combos.forEach((combo) => {
         var comboValid = true;
         for(var i = 0; i < combo.length; i++){
           if(!dice.includes(combo[i])){
             return;
           }
         }
    
         matches = true;
       });

       return matches;
    };
  };

  var createFromScoreElement = (scoreElement) => {
     var show = " - ";
     var otherShow = " - ";
     var score = scoreElement.score;
     if(board[score].length > 0) {
       var diceValues = board[score][0].get('dice').toArray().map(d => d.get('value'));
       show = scoreElement.calc(diceValues);
     }

     if(opponentBoard[score].length > 0){
       var diceValues = opponentBoard[score][0].get('dice').toArray().map(d => d.get('value'));
       otherShow = scoreElement.calc(diceValues);
     }

     return (
       <tr key={score}>
         <td>{scoreElement.display}</td>
         <td>
           <a key={score} onClick={() => this.props.score(id, score)} className='mdl-button mdl-js-button mdl-js-ripple-effect' data-upgraded=',MaterialButton,MaterialRipple'>{show}</a>;
         </td>
         <td>{otherShow}</td>
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
                     { score: 'three of a kind', display: 'Three Of A Kind', calc: (dice) => total(sum, numSame(3), dice) },
                     { score: 'four of a kind', display: 'Four Of A Kind', calc: (dice) => total(sum, numSame(4), dice) },
                     { score: 'full house', display: 'Full House', calc: (dice) => total(25, isFullHouse, dice) },
                     { score: 'small straight', display: 'Small Straight', calc: (dice) => total(30, containsDice([[1,2,3,4],[2,3,4,5],[3,4,5,6]]), dice) },
                     { score: 'large straight', display: 'Large Straight', calc: (dice) => total(40, containsDice([[1,2,3,4,5],[2,3,4,5,6]]), dice) },
                     { score: 'yahtzee', display: 'Yahtzee', calc: (dice) => total(50, numSame(5), dice) },
                     { score: 'chance', display: 'Chance', calc: (dice) => total(sum, () => true, dice) },
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
