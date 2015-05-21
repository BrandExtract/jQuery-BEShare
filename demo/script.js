jQuery(function($) {
  var targets = ['Facebook', 'LinkedIn', 'Twitter', 'GPlus'];
  $('.popup').BEShare({
    'class': 'popup-share',
    //'targets': 'Facebook,Twitter|Print,Email',
    'targets': targets
  });

  $('.inline-share').BEShare({
    'type': 'inline',
    'targets': targets.concat(['|', 'Print', 'Email']),
    'onShare': function(targetName) {
      ga('send', 'event', 'Social', 'Click', 'Share', targetName);
    }
  });
});