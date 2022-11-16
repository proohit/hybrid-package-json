# hybrid-package-json

This tool is used to generate `package.json` file for a hybrid ESM/CJS package. Specifically, it defines the `type` field to `module` for ESM and `commonjs` for CJS and copies it to a target location so that consumers can use either ESM or CJS. It uses the root package json by default.

## Usage

```sh
hybrid-package-json --esm-target=dist/esm --cjs-target=dist/cjs
```
