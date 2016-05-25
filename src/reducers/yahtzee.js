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

function startGame(state, person) {
  state.activeGames = state.activeGames || [];
  state.activeGames.push({ otherUser: { username: person }});
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
      return startGame(state, action.person);
    case 'PERSON_ADD':
      return addUser(state, action.person);
  }

  return state;
}
