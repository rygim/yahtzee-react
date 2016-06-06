export function setActiveGame(gameId) {
  return {
    type: 'ACTIVE_GAME_SELECT',
    gameId: gameId
  };
}

export function startGame(otherPerson, id) {
  return {
    type: 'START_GAME',
    person: otherPerson,
    id: id
  };
}

export function roll(gameId) {
  return {
    type: 'ROLL',
    id: gameId
  };
}

export function toggleHold(gameId, index) {
  return {
    type: 'TOGGLE_HOLD',
    id: gameId,
    index: index
  };
}

export function scoreDice(gameId, score) {
  return {
    type: 'SCORE',
    id: gameId,
    score: score
  };
}
