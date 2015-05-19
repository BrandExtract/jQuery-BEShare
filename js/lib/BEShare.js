;(function($, window, document, undefined) {
  "use strict";
  /*jshint scripturl:true, -W084*/

  var $window = $(window), $document = $(document);

  var SERVICES = {
    'Facebook': {
      'url': 'https://www.facebook.com/sharer/sharer.php?u={$url}&t={$title}'
    },
    'Twitter': {
      'url': 'https://twitter.com/intent/tweet?text={$title}&url={$url}'
    },
    'LinkedIn': {
      'url': 'https://www.linkedin.com/shareArticle?mini=true&url={$url}&title={$title}'
    },
    'GPlus': {
      'url': 'https://plus.google.com/share?url={$url}'
    },
    'Print': {
      'url': 'javascript:window.print()'
    },
    'Email': {
      'url': 'mailto:?subject={$title}&body={$url}'
    }
  };

  var PLUGIN_NAME = 'BEShare';
  var defaults = {
    'type': 'popup',
    'services': ['Facebook', 'Twitter'],
    'class': PLUGIN_NAME,
    'prefix': 'icon-',
    'width': '626',
    'height': '436'
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

    // Open a small window to share.
    $container.on('click', 'a[class^="' + options.prefix + '"]', function(event) {
      var href = $(this).attr('href');
      window.open(href, PLUGIN_NAME, 'toolbar=0,status=0,width='+options.width+',height='+options.height);
      return false;
    });

    if (options.type === "popup") {
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
    var service = SERVICES[serviceName];

    var link = template(service.url, {
      url: encodeURIComponent(document.location.href),
      title: encodeURIComponent(document.title),
    });

    var $link = $('<a href="' + link + '" target="_blank"><span>' + serviceName + '</span></a>');
    $link.addClass(this.options.prefix + serviceName.toLowerCase());
    $link.appendTo(this.container);
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