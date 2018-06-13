# jQuery-BEShare #

This is a simple jQuery plugin to add social sharing links to your webpage. It supports two modes, as a popup attached to an anchor link, and inline inside a container.

The share icon next to the heading is of popup type. The social icons at the bottom of the page is of inline type.

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
  'targets': ['Facebook', 'Twitter', 'LinkedIn', 'Google+', 'Print', 'Email'],
  'class': 'BEShare',
  'prefix': 'icon-',
  'width': '626',
  'height': '436',
  'via': 'BrandExtract', // A username associated with the shared content, usually for Twitter
  'onShare': null
});
```

## Building ##
    npm run build

or

    yarn build
