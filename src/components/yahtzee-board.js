require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {MenuContainer} from './Menu';
import FriendsActivity from './FriendsActivity';
import Header from './Header';

class YahtzeeBoard extends React.Component {
  render() {
    return (
      <table><thead><tr><th>Move</th><th>Score</th></tr></thead>
       <tbody>
         <tr><td>Ones</td><td>-</td></tr>
         <tr><td>Twos</td><td>-</td></tr>
         <tr><td>Threes</td><td>-</td></tr>
         <tr><td>Fours</td><td>-</td></tr>
         <tr><td>Fives</td><td>-</td></tr>
         <tr><td>Sixes</td><td>-</td></tr>
         <tr><td>Upper Subtotal</td><td>-</td></tr>
         <tr><td>Bonus</td><td>-</td></tr>
         <tr><td>Upper Total</td><td>-</td></tr>
         <tr><td>Three of a kind</td><td>-</td></tr>
         <tr><td>Four of a kind</td><td>-</td></tr>
         <tr><td>Full House</td><td>-</td></tr>
         <tr><td>Small Straight</td><td>-</td></tr>
         <tr><td>Large Straight</td><td>-</td></tr>
         <tr><td>Yahtzee</td><td>-</td></tr>
         <tr><td>Chance</td><td>-</td></tr>
         <tr><td>Lower Total</td><td>-</td></tr>
         <tr><td>Upper Total</td><td>-</td></tr>
         <tr><td>Total</td><td>-</td></tr>
       </tbody>
      </table>
    );
  }
}

YahtzeeBoard.defaultProps = {
};

export default YahtzeeBoard;
