import _ from 'underscore';

import { connect } from 'react-redux'
import { triggerDummyAction } from '../actions/dummy-actions';

const DummyComponent = React.createClass({
  onClickBtn() {
    this.props.dispatch(triggerDummyAction());
  },
  render() {
    return (
      <div>
        <h1>{ this.props.triggered ? 'Triggered' : 'Not triggered' }</h1>
        <button onClick={ this.onClickBtn }>Toggle</button>
      </div>
    )
  }
})

export default connect(state => {
  return state.dummy
})(DummyComponent)