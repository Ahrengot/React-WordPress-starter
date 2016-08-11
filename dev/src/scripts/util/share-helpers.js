export let fbShareUrl = 'http://facebook.com/share.php?u='

export let defaultShareUrl = fbShareUrl + encodeURIComponent( config.url.home )

export const openSharePopup = (url = defaultShareUrl, image = false) => {
  if ( image ) {
    url += ('&p[images][0]=' + encodeURIComponent(image));
  }

  let center = {
    x: (screen.width / 2) - 260,
    y: (screen.height / 2) - 175,
  }

  let params = [
    'top=' + center.y,
    'left=' + center.x,
    'screenX=' + center.x,
    'screenY=' + center.y,
    'width=520',
    'height=350',
    'toolbar=no',
    'menubar=no',
    'scrollbars=no',
    'location=no',
    'directories=no'
  ];

  window.open( url, 'Del på Facebook', params.join(',') );
}