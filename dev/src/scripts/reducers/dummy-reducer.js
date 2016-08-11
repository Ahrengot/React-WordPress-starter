import {
	DUMMY_ACTION
} from '../actions/dummy-actions';

let defaultState = {
	triggered: false
};

export default (state = defaultState, action) => {
	switch (action.type) {

		case DUMMY_ACTION:
			return Object.assign({}, state, {
				triggered: !state.triggered
			})

		default:
			return state;
	}
}