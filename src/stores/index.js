const redux = require('redux');
const reducers = require('../reducers');

module.exports = function(initialState) {
  const store = redux.createStore(reducers, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  //init
  store.dispatch({
    type: 'SET_STATE',
    state: {
      'users': [{ username: 'rgimmy'}, {username: 'jgimmy'}]
    }
  });

  return store;
}
