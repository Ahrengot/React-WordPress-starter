export const triggerResize = () => {
  // http://stackoverflow.com/questions/8712036/dom-event-fired-by-window-resize
  if (document.createEvent) { // W3C
    var ev = document.createEvent('Event');
    ev.initEvent('resize', true, true);
    window.dispatchEvent(ev);
  } else { // IE
    document.fireEvent('onresize');
  }
}