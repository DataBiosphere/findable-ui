import { jest } from "@jest/globals";

/**
 * Mock for Storybook's @storybook/addon-actions function.
 * The mock keeps the same function signature as the real Storybook action,
 * does not trigger any Storybook logic, and simply returns a Jest mock function
 * for use in tests.
 * @returns A Jest mock function.
 */
export const action = (): jest.Mock => jest.fn();
