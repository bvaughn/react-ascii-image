### Demos available here: http://bvaughn.github.io/react-ascii-image/

Getting started
---------------

Install `react-ascii-image` using npm.

```shell
npm install react-ascii-image --save
```

ES6, CommonJS, and UMD builds are available with each distribution.
For example:

```js
import { AsciiImage } from 'react-ascii-image'
```

Alternately you can load a global-friendly UMD build:

```html
<script src="path-to-react-ascii-image/dist/umd/react-ascii-image.js"></script>
```

Dependencies
---------------

React Virtualized has very few dependencies and most are managed by NPM automatically.
However the following peer dependencies must be specified by your project in order to avoid version conflicts:
[`react`](https://www.npmjs.com/package/react),
[`react-addons-shallow-compare`](https://www.npmjs.com/package/react-addons-shallow-compare), and
[`react-dom`](https://www.npmjs.com/package/react-dom).
NPM will not automatically install these for you but it will show you a warning message with instructions on how to install them.

Documentation
---------------

### Prop Types
| Property | Required? | Type | Default | Description |
|:---|:---:|:---|:---|:---|
| animated |  | bool | false | Text should be animated. |
| animationInterval |  | number | 500ms | Interval (in ms) of animation. |
| blockSize |  | number | 4 | Interval sizes to use when sample pixel colors. |
| characterDensity |  | number | 1 | Number of characters rendered per font block. |
| characters |  | string | ૱, Ǖ, ¤, ℥, Ω, ⚭, ⚮, ᵯ, ᵿ, §, ₯ | Text (characters) to use when rendering the image. |
| fontSize |  | number | 8 | Font size used for text image. |
| renderMode |  | (inline-block \| svg) | inline-block | Controls rendering method of text image. |
| url |  ✓ | string | | URL of image (can be either remote URL or `require`ed data) |

### Examples

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { AsciiImage } from 'react-ascii-image';

// Could also be a string URL for remote images
const url = require('path/to/local/image.png')

ReactDOM.render(
  <AsciiImage url={url} />,
  document.getElementById('example')
);
```

Contributions
------------

Use [GitHub issues](https://github.com/bvaughn/react-ascii-image/issues) for requests.

I actively welcome pull requests.

Changelog
---------

Changes are tracked in the [changelog](https://github.com/bvaughn/react-ascii-image/blob/master/CHANGELOG.md).

License
---------

*react-ascii-image* is available under the MIT License.
