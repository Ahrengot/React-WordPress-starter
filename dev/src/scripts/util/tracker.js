
let isTouchScreen = function() {
  if ( 'ontouchstart' in window ) {
    return true;
  }

  /* eslint-disable */
  if ( window.DocumentTouch && document instanceof DocumentTouch ) {
    return true;
  }
  /* eslint-enable */

  return false;
}

export const touch = isTouchScreen();
export const screenType = (screen.width > 768) ? 'large' : 'small';
export const mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export default class tracker {
  constructor() {
    this.touch = touch;
    this.screenType = screenType;
  }

  printFeatures() {
    let c = document.documentElement.classList;
    c.add( touch ? 'touchevents' : 'no-touchevents' );
    c.add( 'screen-' + screenType );

    if ( mobileDevice ) {
      c.add( 'is-mobile' );
    }
  }
}