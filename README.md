# quickjs-ui

Native UI helpers for applications running on QuickJS Native.

## API

- `alert(message, title?)`: show a dialog.
- `confirm(message, title?)`: show a confirmation dialog and return `true` when OK is pressed.

## Install and use

```shell
npm install quickjs-ui
```

```js
import { alert, confirm } from 'quickjs-ui';

alert('Hello');
if (confirm('Continue?')) {
    alert('You selected OK');
}
```

## Create an executable

After compiling your application's entry point to JavaScript, bundle it with
QuickJS Native:

```shell
npx quickjs-native bundle dist/index.js
```

Executables for all supported targets are written to `release/` by default.
Run `npx quickjs-native help` to see the available options.

## Development

```shell
npm install
npm run build
npm pack
```
