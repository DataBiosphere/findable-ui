# data-explorer-ui

## General info
- `src` contains TypeScript source files; `lib` will contain compiled JavaScript, which is what should be imported by the external application
- Currently, import paths used by the external application need to specify the full path starting from the package name, in the form `@clevercanary/data-explorer-ui/lib/<path>`, where `<path>` is the path of the file within the `lib` folder
    - See [`explorer/app/apis/catalog/anvil-catalog/common/utils.ts`](https://github.com/clevercanary/data-browser/blob/%40hunterckx/data-explorer-import/explorer/app/apis/catalog/anvil-catalog/common/utils.ts) in the `@hunterckx/data-explorer-import` branch of cc-data-browser for an example of importing `viewModelBuilders/common/utils`

## Developing alongside cc-data-browser
- Clone this repository into the same parent folder as cc-data-browser
- In this directory (`data-explorer/packages/data-explorer-ui`):
    - run `npm ci` after first downloading or when dependencies may have changed
    - `npx tsc` will need to be run when this repository is first downloaded and when any changes are made to the source files; one way this can be done more efficiently is by [setting the default build task](https://code.visualstudio.com/docs/typescript/typescript-compiling#_step-3-make-the-typescript-build-the-default) in VS Code so that it can be done with a keyboard shortcut
- In `cc-data-browser/explorer`:
    - Checkout the `@hunterckx/data-explorer-import` branch and run `npm ci` if needed/desired
    - Run `npm link ../../data-explorer/packages/data-explorer-ui`, which will create a symlink in node_modules pointing to data-explorer-ui
    - If any packages are later installed or uninstalled, the symlink will need to be created again, which can be done with the same command or by running `npm link @clevercanary/data-explorer-ui`