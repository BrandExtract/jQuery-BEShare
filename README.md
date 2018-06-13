# jQuery-BEShare #

This is a simple jQuery plugin to add social sharing links to your webpage. It supports two modes, as a popup attached to an anchor link, and inline inside a container.

Currently provides the following social shares:

- Facebook
- Twitter
- LinkedIn
- Google+

It also provides Print and Email for convenience.

### [See a demo here](http://brandextract.github.io/jQuery-BEShare/demo/) ###

## Usage ##
```javascript
jQuery('.popup').BEShare({
  'type': 'popup', // or 'inline'
  'targets': ['Facebook', 'Twitter'], // and/or 'LinkedIn', 'Google+', 'Print', 'Email'
  'class': 'BEShare',
  'prefix': 'icon-',
  'suffix': '-v2',
  'aria-prefix': 'Share on ',
  'width': '626',
  'height': '436',
  'message': document.title,
  'via': 'BrandExtract', // A username associated with the shared content, usually for Twitter
  'onShare': null,  // A function to run when share button is clicked
  'altLink': null  // To share as a different link than the page you are on, for example: permlinks or canonical
});
```

## Building ##
    npm run build

or

    yarn build
