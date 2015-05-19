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
    'analytics': 'UA-000000-1'
  });
});