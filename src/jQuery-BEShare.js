;(function($, window, document, undefined) {
  "use strict";
  /*jshint scripturl:true, -W084*/

  var $window = $(window), $document = $(document);

  var SERVICES = {
    'Facebook': 'https://www.facebook.com/sharer/sharer.php?u={$url}&t={$title}',
    'Twitter': 'https://twitter.com/intent/tweet?text={$title}&url={$url}',
    'LinkedIn': 'https://www.linkedin.com/shareArticle?mini=true&url={$url}&title={$title}',
    'GPlus': 'https://plus.google.com/share?url={$url}',
    'Print': 'javascript:window.print()',
    'Email': 'mailto:?subject={$title}&body={$url}'
  };

  var PLUGIN_NAME = 'BEShare';
  var defaults = {
    'type': 'popup',
    'services': ['Facebook', 'Twitter'],
    'class': PLUGIN_NAME,
    'prefix': 'icon-',
    'width': '626',
    'height': '436',
    'analytics': ''
  };

  // Mini template engine.
  function template(tpl, data) {
    var re = /\{\$([^}]+)?\}/g, match;
    while(match = re.exec(tpl)) {
      tpl = tpl.replace(match[0], data[match[1]]);
    }
    return tpl;
  }

  function move($element, offset) {
    if (!offset) {
      offset = { 
        'top': '-9999px',
        'left': '-9999px'
      };
    }
    $element.css(offset);
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, defaults, options);
    
    this._name = PLUGIN_NAME;
    this.init();
  }

  Plugin.prototype.init = function() {
    var options = this.options, $container;
    if (options.type === "inline") {
      $container = this.element;
    } else {
      $container = $('<div/>');
      $container.appendTo(document.body);
      $container.css({
        'position': 'absolute'
      });
      move($container);
    }
    this.container = $container;
    $container.addClass(options.class);

    var services = options.services;
    if ($.type(services) === 'string') {
      // @TODO: Parse string 'ServiceA,ServiceB|ServiceC,ServiceD'
    }

    var i, total = services.length;
    for (i = 0; i < total; i++) {
      this.add(services[i]);
    }

    if (options.type === 'popup') {
      this.element.on('click.'+PLUGIN_NAME, function(event) {
        // Stop the event from bubbling up to the below handler.
        event.stopPropagation();

        var position = {
          'top': event.pageY - $window.scrollTop(),
          'left': event.pageX - $window.scrollLeft()
        };

        move($container, position);
        $container.addClass('active');
      });

      // Clicking anywhere outside will close the popup.
      $document.on('click.'+PLUGIN_NAME, function(event) { 
        if(!$(event.target).closest('.'+options.class).length) {
          if ($container.hasClass('active')) {
            $container.removeClass('active');
            move($container);
          }
        }
      });
    }
  };

  Plugin.prototype.add = function(serviceName) {
    var options = this.options;
    var service = SERVICES[serviceName];
    if (!service) {
      // Any string not of a service is output as is.
      this.container.append(serviceName);
      return this;
    }

    var url = template(service, {
      url: encodeURIComponent(document.location.href),
      title: encodeURIComponent(document.title),
    });

    var $link = $('<a href="' + url + '"><span>' + serviceName + '</span></a>');
    $link.attr('title', 'Share this page on ' + serviceName);

    if (url.indexOf('http') === 0) {
      // External links
      $link.attr('target', '_blank');
      $link.on('click.'+PLUGIN_NAME, function() {
        window.open(url, PLUGIN_NAME, 'toolbar=0,status=0,width='+options.width+',height='+options.height);

        if (options.analytics) {
          // Fire Google Analytics event
          ga('send', 'event', 'Social', 'Click', 'Share', serviceName);
        }
        return false;
      });
    }

    $link.addClass(options.prefix + serviceName.toLowerCase());
    $link.appendTo(this.container);
    return this;
  };

  $.fn[PLUGIN_NAME] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + PLUGIN_NAME)) {
        $.data(this, 'plugin_' + PLUGIN_NAME, 
        new Plugin( this, options ));
      }
    });
  };
})(jQuery, window, document);