# findable-ui

## General info

- `src` contains TypeScript source files; `lib` will contain compiled JavaScript, which is what should be imported by
  the external application.
- Import paths used by the external application need to specify the full path starting from the package name,
  in the form `@databiosphere/findable-ui/lib/<path>`, where `<path>` is the path of the file within the `lib`
  folder.

## Developing findable-ui alongside a consuming app

Use `scripts/link.sh` to build and install a local copy of findable-ui
into a consuming project (e.g. ncpi-dataset-catalog, data-browser):

1. Clone this repository into the same parent folder as the consuming app.
2. Set `node` version to `22.12.0`.
3. Run `npm install` in both repositories.
4. From the consuming project directory:
   ```bash
   ../findable-ui/scripts/link.sh
   ```
   This compiles TypeScript, packs the output, installs it into
   `node_modules`, clears the Next.js cache, and starts the dev server.

5. To iterate: Ctrl+C the dev server, make changes in findable-ui, and
   hit up-arrow to re-run the script.

6. To restore the published version:
   ```bash
   ../findable-ui/scripts/unlink.sh
   ```

Consuming projects can optionally add thin wrappers in their `package.json` scripts:
```json
{
  "scripts": {
    "link-findable": "../findable-ui/scripts/link.sh",
    "unlink-findable": "../findable-ui/scripts/unlink.sh"
  }
}
```
