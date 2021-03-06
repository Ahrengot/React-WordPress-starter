import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../reducers/app-reducer'
import DevTools from '../components/devtools/devtools'


const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
)(createStore)

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers/app-reducer', () =>
      store.replaceReducer(require('../reducers/app-reducer').default/*.default if you use Babel 6+ */)
    )
  }

  return store;
}