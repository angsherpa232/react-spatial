# Images

Folder where to store images.

## How to use SVG

Before adding an SVG file in this folder please clean it using [svgo](https://www.npmjs.com/package/svgo) or [svgomg](https://jakearchibald.github.io/svgomg/).

After optimization, verify you can use it Openlayers using this [code sandbox](https://codesandbox.io/s/5w5o4mqwlk).

Then use one of the 4 ways to load it depending on what you want:

```javascript
// Import as a React component:
import NorthArrow from 'northArrow.svg';
// Use: <NorthArrow />

// Import as an inline svg:
import northArrow from '!svg-inline-loader?noquotes!northArrow.svg';
// northArrow = "<svg xmlns='http://www.w3.org/2000/svg' height='192' ...> ... </svg>"

// Import as a base64 data URI (or with an url the file is too big):
import northArrow from '!url-loader!northArrow.svg';
// northArrow = "data:image/svg+xml;base64,PHN2ZyB4...."


// Import as an encoded inline svg data URI (or with an url the file is too big):
import northArrow from '!svg-url-loader?noquotes!northArrow.svg';
// northArrow = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='192' ...%3E ... %3C/svg%3E"
```

svg-inline-loader , svg-url-loader are npm modules add them if you need it:

```bash
yarn add svg-inline-loader svg-url-loader
```

## How to use SVG with a dynamic size

In case you want your SVG fits perfectly his parent div you need to remove `width` and `height` attributes of `<svg>` and replace it by a `viewBox` property, like this:

Replace

    `<svg width="192" height="192">`

by

    `<svg viewBox="0 0 192 192">`