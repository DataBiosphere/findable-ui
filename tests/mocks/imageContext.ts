import { createContext } from "react";

// Stands in for `sb-original/image-context`, which @storybook/nextjs-vite's
// next/image shim imports and only Storybook's Vite build resolves (as an
// alias). The real module is this same empty context.
export const ImageContext = createContext({});
