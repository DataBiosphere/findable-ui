# findable-ui

## General info

- `src` contains TypeScript source files; `lib` will contain compiled JavaScript, which is what should be imported by
  the external application.
- Import paths used by the external application need to specify the full path starting from the package name,
  in the form `@databiosphere/findable-ui/lib/<path>`, where `<path>` is the path of the file within the `lib`
  folder.

## Consumer setup for Next.js 16 (Pages Router, static export)

Consuming apps on Next.js 16 must wire up MUI's Emotion cache helpers in `_app.tsx` and `_document.tsx`. Without this wiring, the browser will report React hydration warnings on components styled by MUI + Emotion (which is most of findable-ui).

### Terminology note

This setup involves a package called `@mui/material-nextjs` and a helper called `documentGetInitialProps`. The naming uses "SSR" / "document" terminology because the package targets Next.js generally, including deployments that do run a runtime HTTP server. **It still applies to static-export deployments.** All the work described below runs at `next build` time, during the same step that generates the static `.html` files. There is no runtime server involved.

When the docs say "extract styles on the server," read it as "extract styles during the static HTML build step."

### Why this is needed

- findable-ui components are styled with MUI + Emotion (CSS-in-JS).
- Emotion generates `css-XXXXXXX` class names by hashing styles in the order they are first encountered during the React render tree walk.
- Next.js builds the static HTML by running the React tree once during `next build`, then the browser runs the same tree again during hydration. For hydration to succeed, both passes must produce the same class names.
- Under Next 16 (Turbopack is the default bundler), the module evaluation order during the build can diverge from the order in the browser, so the same component can be assigned a different hash on each pass. React 19 reports this as a hydration mismatch.
- The fix: capture Emotion's style cache during the build's HTML generation step and inject the resulting `<style>` tags into the static HTML. The browser then hydrates against the exact class names the build wrote.

### Required packages

Install in the consuming project:

```bash
npm install @mui/material-nextjs @emotion/server
```

- `@mui/material-nextjs` — MUI's official integration package; provides the cache provider and the document-head extractor
- `@emotion/server` — peer dependency of the document helper; used during the build to flush Emotion styles into the HTML

### Opt out of Turbopack (required for now)

Next 16 makes Turbopack the default bundler. Turbopack + Pages Router + MUI is currently broken — Emotion class names diverge between the static HTML and the browser hydration pass, producing the exact hydration mismatch this section is meant to fix. The wiring above is still required, but it does not work under Turbopack.

Until the upstream fix lands ([vercel/next.js#82607](https://github.com/vercel/next.js/issues/82607)), pin every `next dev` / `next build` invocation to webpack:

```jsonc
// package.json
"scripts": {
  "dev": "next dev --webpack",
  "build": "next build --webpack"
}
```

Webpack is still fully supported in Next 16 — Turbopack was promoted to default, not "webpack removed." The deprecation timeline for the webpack fallback hasn't been published, but the `--webpack` flag is a temporary workaround and is expected to be removed in a future major. **Subscribe to [vercel/next.js#82607](https://github.com/vercel/next.js/issues/82607) for status**, and review this pin whenever Next.js publishes a webpack removal notice or the upstream Turbopack + Pages Router + MUI bug is resolved.

This is a Next.js / Turbopack bug, not a findable-ui one. Re-enable Turbopack when [vercel/next.js#82607](https://github.com/vercel/next.js/issues/82607) is closed.

### `_app.tsx`

Wrap the app in `AppCacheProvider`:

```tsx
import { AppCacheProvider } from "@mui/material-nextjs/v16-pagesRouter";
import type { EmotionCache } from "@emotion/react";
import type { AppProps } from "next/app";
import type { JSX } from "react";

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache, pageProps } = props;
  return (
    <AppCacheProvider emotionCache={emotionCache}>
      {/* existing theme providers and layout */}
      <Component {...pageProps} />
    </AppCacheProvider>
  );
}

export default MyApp;
```

### `_document.tsx`

Add `DocumentHeadTags` inside `<Head>` and assign `documentGetInitialProps` as the static `getInitialProps`:

```tsx
import {
  documentGetInitialProps,
  DocumentHeadTags,
} from "@mui/material-nextjs/v16-pagesRouter";
import type { DocumentHeadTagsProps } from "@mui/material-nextjs/v16-pagesRouter";
import Document, { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";
import type { JSX } from "react";

class MyDocument extends Document<DocumentHeadTagsProps> {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <DocumentHeadTags {...this.props} />
          {/* other head content */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  return await documentGetInitialProps(ctx);
};

export default MyDocument;
```

### Note on `next-mdx-remote@6`

Consumers using `next-mdx-remote` to render MDX content must pass `blockJS: false` to `serialize()`. Version 6 added a `blockJS: true` default that strips all JavaScript expressions from MDX during compilation — including JSX attribute expressions like `<Breadcrumbs breadcrumbs={[...]} />`. With the default, those props are silently dropped at build time and the receiving component renders with no props. Setting `blockJS: false` preserves expression-valued attributes. The narrower `blockDangerousJS: true` setting (default) still blocks `eval` / `new Function` / etc., so the safety net for actually-dangerous patterns is retained.

```ts
import { serialize } from "next-mdx-remote/serialize";

const mdxSource = await serialize(content, {
  blockJS: false,
  // ...your existing options
});
```

If you use findable-ui's `buildStaticProps` helper (`@databiosphere/findable-ui/lib/utils/mdx/staticGeneration/staticProps`), `blockJS: false` is already the default — no consumer change needed.

## Developing findable-ui alongside a consuming app

Use `scripts/link.sh` to build and install a local copy of findable-ui
into a consuming project (e.g. ncpi-dataset-catalog, data-browser):

1. Clone this repository into the same parent folder as the consuming app.
2. Set `node` version to `22.13.0`.
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
