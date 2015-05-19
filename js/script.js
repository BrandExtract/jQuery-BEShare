jQuery(function($) {
  var services = ['Facebook', 'LinkedIn', 'Twitter', 'GPlus'];
  $('.popup').BEShare({
    'class': 'popup-share',
    //'services': 'Facebook,Twitter|Print,Email',
    'services': services
  });

  $('.inline-share').BEShare({
    'type': 'inline',
    'services': services.concat(['|', 'Print', 'Email']),
    'analytics': 'UA-000000-1'
  });
});