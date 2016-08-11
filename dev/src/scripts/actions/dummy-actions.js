import _ from 'underscore'

/**
 * Actions creators
 */
export const DUMMY_ACTION = 'DUMMY_ACTION'
function dummyAction() {
	return {
		type: DUMMY_ACTION
	}
}

/**
 * Async actions
 */
export function triggerDummyAction() {
	return function(dispatch, getState) {
		dispatch(dummyAction());

    /**
    Example:

    setTimeout(() => {
      dispatch(otherAction());
    }, 500)
     */
	}
}