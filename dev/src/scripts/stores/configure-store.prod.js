import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/app-reducer';

const finalCreateStore = compose(
  // Middleware you want to use in production:
  // applyMiddleware(p1, p2, p3),
  // Other store enhancers if you use any
  applyMiddleware(thunkMiddleware)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}