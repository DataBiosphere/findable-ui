# data-explorer-ui

## General info

- `src` contains TypeScript source files; `lib` will contain compiled JavaScript, which is what should be imported by
  the external application.
- Import paths used by the external application need to specify the full path starting from the package name,
  in the form `@clevercanary/data-explorer-ui/lib/<path>`, where `<path>` is the path of the file within the `lib`
  folder.

## Developing the Clever Canary Data Explorer alongside Clever Canary Data Browser

1. Clone this repository into the same parent folder as
   the [Clever Canary Data Browser](https://github.com/clevercanary/data-browser).
2. Set `node` version to `16.15.0` (this is also the version used by the Data Browser).
3. In the Data Explorer `packages/data-explorer-ui` directory (e.g. `data-explorer/packages/data-explorer-ui`):
    - Run `npm ci`.
    - [Bump the version number](https://docs.npmjs.com/cli/v6/commands/npm-version) in `package.json`
      e.g. `npm version <update_type>`.
    - Run `npx tsc` (this should be run when this repository is first downloaded and when any changes are made to the
      source files; one way this can be done more efficiently is
      by [setting the default build task](https://code.visualstudio.com/docs/typescript/typescript-compiling#_step-3-make-the-typescript-build-the-default)
      in VS Code so that it can be done with a keyboard shortcut).
4. In the Data Browser `explorer` directory (e.g. `data-browser/explorer`):
    - Run `npm ci`.
    - Update the `@clevercanary/data-explorer-ui` dependency in the `package.json` file to use the new version
      of `data-explorer-ui`.
    - Run `npm link ../../data-explorer/packages/data-explorer-ui`, which will create a symlink in node_modules pointing
      to data-explorer-ui.
    - If any packages are later installed or uninstalled, the symlink will need to be created again, which can be done
      with the same command or by running `npm link @clevercanary/data-explorer-ui`.
