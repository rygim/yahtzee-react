import {fromJS, Map, List} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function setActiveGame(state, gameId) {
  return state.set('activeGame', gameId);
}

function addUser(state, person) {
  var users = state.get('users', List());
  return state.set('users', users.push(fromJS(person)));
}

function startGame(state, person, id) {
  var activeGames = state.get('activeGames', Map());
  
  var game = { otherUser: { name: person }, id: id, turns: [{ player: state.get('me') }], me: state.get('me') };
  
  return state.set('activeGames', activeGames.set(id, fromJS(game)));
}

function rollDie(){
  return fromJS({ held:false, value: Math.floor(Math.random() * (7 - 1)) + 1})
}

function score(state, gameId, score){
  var game = state.get('activeGames').get(gameId);
  var currentTurn = game.get('turns').last();

  if(!currentTurn.get('dice')){
    console.log("you have to roll!");
    return state;
  }
 
  if(currentTurn.get('player') != state.get('me')){
    console.log("it isnt your turn");
    return state;
  }

  if(currentTurn.get('score')){
    console.log("it isnt your turn because you just went");
    return state;
  }

  var nextTurn = currentTurn.set('score', score);
  var newGame = game.set('turns', game.get('turns', List()).pop().push(nextTurn));
  console.log("scored", gameId, score);
  return state.set('activeGames', state.get('activeGames').set(gameId, newGame));
}

function toggleHold(state, gameId, die) {
  var game = state.get('activeGames').get(gameId);
  var currentTurn = game.get('turns').last();
  var dice = currentTurn.get('dice') || List();
  dice = dice.set(die, dice.get(die).set('held', !dice.get(die).get('held')));
  var nextTurn = currentTurn.set('dice', dice);
  var newGame = game.set('turns', game.get('turns', List()).pop().push(nextTurn));
  return state.set('activeGames', state.get('activeGames').set(gameId, newGame));
}

function roll(state, id){
  var game = state.get('activeGames').get(id);
  var currentTurn = game.get('turns').last();

  var roll = currentTurn.get('roll') || 0;

  if(roll > 3){
    console.log('roll', roll);
    return state;
  }
  
  var dice = currentTurn.get('dice') || List();
  
  for(var i = 0; i < 5; i++) {
    if(dice.size < 5 || !dice.get(i).get('held')){
       dice = dice.set(i, rollDie());
    }
  }

  var nextTurn = currentTurn.set('dice', dice).set('roll', roll + 1);
  var newGame = game.set('turns', game.get('turns', List()).push(nextTurn));
  return state.set('activeGames', state.get('activeGames').set(id, newGame));
}

function login(state, person) {
  return state.set('me', fromJS(person));
}

export default function(state = Map(), action){
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'LOGIN':
      return login(state, action.person);
    case 'ACTIVE_GAME_SELECT':
      return setActiveGame(state, action.game);
    case 'START_GAME':
      return startGame(state, action.person, action.id);
    case 'PERSON_ADD':
      return addUser(state, action.person);
    case 'ROLL':
      return roll(state, action.id);
    case 'TOGGLE_HOLD':
      return toggleHold(state, action.id, action.index);
    case 'SCORE':
      return score(state, action.id, action.score);
  }

  return state;
}
