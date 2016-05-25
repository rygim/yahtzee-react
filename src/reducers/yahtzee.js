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
  return state;
}

function startGame(state, person, id) {
  state.activeGames = state.activeGames || [];
  var game = { otherUser: { username: person }, id: id};
  state.activeGames.push(game);
  return state;
}

export default function(state = {}, action){
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'ACTIVE_GAME_SELECT':
      return setActiveGame(state, action.game);
    case 'LOGIN':
      return setUserName(state, action.username);
    case 'START_GAME':
      return startGame(state, action.person, action.id);
    case 'PERSON_ADD':
      return addUser(state, action.person);
  }

  return state;
}
