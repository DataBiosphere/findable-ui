import { setProjectAnnotations } from "@storybook/react";
import { decorators } from "../src/storybook/decorators";
import { parameters } from "../src/storybook/parameters";

// Set project annotations once before all tests
setProjectAnnotations({ decorators, parameters });
