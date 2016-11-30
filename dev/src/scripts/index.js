// Settings
import Settings from './settings'

import './util/object-assign-polyfill'

// Basic user agent detection (Touch and screensize)
import Tracker from './util/tracker'
new Tracker().printFeatures();

// Redux
import configreStore from './stores/configure-store'
let store = configreStore();

import { Provider } from 'react-redux'
import DummyComponent from 'dummy-component'

// Redux dev tools
let DevTools = null;
if (typeof __ENV__ !== 'undefined' && __ENV__ === 'development') {
  DevTools = require('devtools/devtools').default;
}

ReactDOM.render((
  <Provider store={ store }>
    <div>
      <div>
        <DummyComponent />
      </div>
      {DevTools && (
        <div className="redux-devtools" style={{ fontSize: 12.5, lineHeight: '1.3' }}>
          <DevTools />
        </div>
      )}
    </div>
  </Provider>
), document.querySelector('#app'));