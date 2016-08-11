import Promise from 'promise'

export const loadPolyfills = () => {
  return new Promise((resolve) => {
    let promises = []

    /*if ( !global.fetch ) {
      promises.push(new Promise((subResolve) => {
        window.Promise = Promise;
        require(['whatwg-fetch'], subResolve)
      }))
    }*/

    if ( promises.length ) {
      Promise.all(promises).then(resolve)
    } else {
      resolve()
    }
  });
}