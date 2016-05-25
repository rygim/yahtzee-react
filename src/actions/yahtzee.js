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
