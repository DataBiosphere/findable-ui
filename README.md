# findable-ui

## General info

- `src` contains TypeScript source files; `lib` will contain compiled JavaScript, which is what should be imported by
  the external application.
- Import paths used by the external application need to specify the full path starting from the package name,
  in the form `@databiosphere/findable-ui/lib/<path>`, where `<path>` is the path of the file within the `lib`
  folder.

## Developing Findable UI alongside Data Biosphere Data Browser

1. Clone this repository into the same parent folder as
   the [Data Biosphere Data Browser](https://github.com/DataBiosphere/data-browser).
2. Set `node` version to `22.12.0` (this is also the version used by the Data Browser).
3. In the `findable-ui` repository directory:
    - Run `npm update`.
    - Run `npx tsc` (this should be run when this repository is first downloaded and when any changes are made to the
      source files; one way this can be done more efficiently is
      by [setting the default build task](https://code.visualstudio.com/docs/typescript/typescript-compiling#_step-3-make-the-typescript-build-the-default)
      in VS Code so that it can be done with a keyboard shortcut).
4. In the Data Browser `explorer` directory (e.g. `data-browser/explorer`):
    - Run `npm update`.
    - Run `npm link ../findable-ui`, which will create a symlink in node_modules pointing
      to findable-ui.
    - If any packages are later installed or uninstalled, the symlink will need to be created again, which can be done
      with the same command or by running `npm link @databiosphere/findable-ui`. 
    - To successfully link to findable-ui, you may need to comment out the following packages from the `next.config.mjs` webpack configuration:
      - `@tanstack/react-table`


