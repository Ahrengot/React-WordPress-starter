import DummyReducer from './dummy-reducer';
import { combineReducers } from 'redux'


// Main wrapping reducer
export default combineReducers({
	dummy: DummyReducer,
})