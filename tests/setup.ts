import { setProjectAnnotations } from "@storybook/react";
import { TextDecoder, TextEncoder } from "util";
import { decorators } from "../src/storybook/decorators";
import { parameters } from "../src/storybook/parameters";

// Set project annotations once before all tests
setProjectAnnotations({ decorators, parameters });

global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;
