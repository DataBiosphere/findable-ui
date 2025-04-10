import { jest } from "@jest/globals";
import { setProjectAnnotations } from "@storybook/react";
import { TextDecoder, TextEncoder } from "util";
import { decorators } from "../src/storybook/decorators";
import { parameters } from "../src/storybook/parameters";

// Set project annotations once before all tests
setProjectAnnotations({ decorators, parameters });

// Polyfill ResizeObserver for environments (like Jest) where it's not globally available
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
})) as unknown as typeof ResizeObserver;

// Polyfill TextEncoder/TextDecoder for environments (like Jest) where they're not globally available
global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;
