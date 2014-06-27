var MutationObserver = window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

function throttle(fn) {
  var timer;
  return function() {
    if (timer)
      clearTimeout(timer);
    var self = this;
    var args = arguments;
    timer = setTimeout(function() {
      fn.apply(self, args);
    }, 250);
  };
}

function init() {

  var elSongInfo = document.getElementById('playerSongInfo');
  var elPlayer = document.getElementById('player');

  if (!elSongInfo) {
    setTimeout(init, 50);
    return;
  }

  var observer = new MutationObserver(throttle(function(mutations) {
    if (elPlayer.querySelector('li[data-rating="1"].selected, li[data-rating="2"].selected'))
      elPlayer.querySelector('button[data-id="forward"]').click();
  }));

  observer.observe(elSongInfo, {
    childList: true
  });

}

init();
