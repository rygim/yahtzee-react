function setState(state, newState) {
  return newState;
}

function setActiveGame(state, gameId) {
  return state.set('activeGame', gameId);
}

function setUserName(state, userName) {
  return state.set('username', userName);
}

function addUser(state, person) {
  state.users = state.users || [];
  state.users.push(person);
  console.log("added", person);
  return state;
}

function startGame(state, person, id) {
  state.activeGames = state.activeGames || {};
  var game = { otherUser: { name: person }, startedGame: true, id: id, turns: [{ player: state.me.name }], me: state.me };
  state.activeGames[id] = game;
  console.log("started game with", person);
  return state;
}

function roll(state, id){
  var game = state.activeGames[id];
  var currentTurn = game.turns[game.turns.length - 1];
  
  if(currentTurn.roll === 3) {
    return state;
  }
  
  if(!currentTurn.roll) {
    currentTurn.roll = 1;
    currentTurn.dice = []; 
    for(var i = 0; i < 5; i++) {
      currentTurn.dice.push({ held:false, value: Math.floor(Math.random() * (6 - 1)) + 1});
    } 
    state.activeGames[id].turns[game.turns.length - 1] = currentTurn;
  }

  
  return state;
}

function login(state, person) {
  state.me = person;
  return state;
}

export default function(state = {}, action){
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'LOGIN':
      return login(state, action.person);
    case 'ACTIVE_GAME_SELECT':
      return setActiveGame(state, action.game);
    case 'LOGIN':
      return setUserName(state, action.username);
    case 'START_GAME':
      return startGame(state, action.person, action.id);
    case 'PERSON_ADD':
      return addUser(state, action.person);
    case 'ROLL':
      return roll(state, action.id);
  }

  return state;
}
