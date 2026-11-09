# quickjs-native-ui

Quick JS native ui wrapper to provide cross-platform UI components to Quick JS

## API

- `alert` : show an alert dialog (message, title), return true if OK is pressed

## Install

```shell
git submodule update --init --force --remote
cd quickjs-native
./make.command
cd ..
```

## Package

```shell
npm run build -- --input src/samples/hello.ts
npm run start -- hello
```
