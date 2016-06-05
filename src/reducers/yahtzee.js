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

function roll(state, id){
  var game = state.get('activeGames').get(id);
  var currentTurn = game.get('turns').last();
  
  if(currentTurn.roll === 3) {
    return state;
  }
  
  if(!currentTurn.roll) {
    var dice = List();
    for(var i = 0; i < 5; i++) {
      dice = dice.push(fromJS({ held:false, value: Math.floor(Math.random() * (6 - 1)) + 1}));
    }
 
    var nextTurn = currentTurn.set('dice', dice).set('roll', 1);
    
    var newGame = game.set('turns', game.get('turns', List()).pop().push(nextTurn));
   
    var newState = state.set('activeGames', state.get('activeGames').set(id, newGame));
    return newState;
  }

  
  return state;
}

function login(state, person) {
  var newState = state.set('me', fromJS(person));
  
  return newState;
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
  }

  return state;
}
