# Copilot Instructions for findable-ui

## Repository Purpose

This is a TypeScript library package (`@databiosphere/findable-ui`) that provides reusable UI components and utilities for Data Biosphere applications, particularly the Data Browser. It's designed as an npm package that exports compiled JavaScript from the `lib` directory.

## Key Project Information

- **Language**: TypeScript with strict mode enabled
- **Node Version**: 20.10.0 (enforced)
- **UI Framework**: React 18 with Material-UI (MUI) v7
- **Build System**: TypeScript compiler (tsc)
- **Testing**: Jest with React Testing Library
- **Package Type**: Library package that compiles to `lib/` directory

## Repository Structure

- `/src` - TypeScript source files (compiles to `/lib`)
  - `/components` - React UI components
  - `/hooks` - Custom React hooks
  - `/providers` - React context providers
  - `/utils` - Utility functions
  - `/theme` - MUI theme configuration
  - `/config` - Configuration files
  - `/apis` - API client code
  - `/services` - Business logic services
  - `/types` - TypeScript type definitions
  - `/views` - Page-level components
- `/tests` - Jest test files (separate from src)
- `/lib` - Compiled JavaScript output (git-ignored)
- `/.storybook` - Storybook configuration

## Code Style and Standards

### TypeScript Requirements

- **Strict mode enabled**: All TypeScript strict checks are enforced
- **Explicit return types required**: All functions must have explicit return type annotations (except in `.styles.ts(x)` files)
- **No implicit any**: Avoid `any` type; use proper typing (exceptions allowed in test files)
- **Null safety**: Strict null checks are enforced

### Code Organization

- **Sort keys**: Object keys, destructured keys, interface properties, and string enums must be sorted alphabetically (enforced by ESLint)
- **Import organization**: Imports are auto-organized with prettier-plugin-organize-imports
- **File naming**: Use kebab-case for file names (e.g., `my-component.tsx`)

### Documentation Requirements

All code must include JSDoc comments with:

- **Function descriptions**: Required for all functions
- **Parameter documentation**: `@param` tags with descriptions for all parameters
- **Return value documentation**: `@returns` tag with description
- **Hyphen before param descriptions**: Required format

Example:

```typescript
/**
 * Transforms a route by removing inactivity parameters.
 * @param routes - Array of route strings to transform.
 * @returns The first non-login route without inactivity param, or undefined.
 */
function transformRoute(routes: string[]): string | undefined {
  // implementation
}
```

### React Patterns

- **Hooks dependencies**: The `react-hooks/exhaustive-deps` rule is enforced - always include all dependencies in useEffect, useCallback, etc.
- **Component structure**: Use functional components with hooks
- **Styling**: Use Emotion styled components (`.styles.ts` or `.styles.tsx` files)

## Build, Test, and Validation Steps

### Before Making Changes

1. Install dependencies: `npm ci`
2. Run all checks to verify baseline:
   ```bash
   npm run check-format
   npm run lint
   npm run test
   npm run test-compile
   ```

### During Development

1. **Check formatting**: `npm run check-format` (Prettier)
2. **Lint code**: `npm run lint` (ESLint with TypeScript, SonarJS, and other plugins)
3. **Run tests**: `npm run test` (Jest with jsdom environment)
4. **Type check**: `npm run test-compile` (TypeScript compiler without emit)
5. **Compile library**: `npx tsc` (when making changes that need to be tested in consuming apps)

### All PRs Must Pass

- Prettier formatting check
- ESLint with no errors
- All Jest tests passing
- TypeScript compilation without errors

## Testing Guidelines

- **Test location**: Tests live in the `/tests` directory (not co-located with source files)
- **Test framework**: Jest with `@testing-library/react` for component tests
- **Test naming**: Use `.test.ts` or `.test.tsx` extension
- **Setup**: Tests use Storybook decorators and parameters (see `tests/setup.ts`)
- **Mocking**: Global mocks for ResizeObserver, TextEncoder, and TextDecoder are pre-configured
- **Test structure**: Follow the existing pattern of describe/it blocks with clear descriptions

Example test structure:

```typescript
describe("ComponentName", () => {
  it("should do something specific", () => {
    // Arrange
    const input = "test";
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toBe("expected");
  });
});
```

## Contribution Workflow

1. **Make minimal changes**: This is a library package - changes impact all consumers
2. **Maintain backward compatibility**: Breaking changes require major version bumps
3. **Update documentation**: Keep README and inline docs current
4. **No breaking test changes**: Don't remove or modify existing tests unless fixing bugs
5. **Test compilation**: Always run `npm run test-compile` to ensure TypeScript compilation succeeds

## Peer Dependencies

This package has extensive peer dependencies that consuming applications must provide:

- React 18.3+
- Material-UI (@mui/material, @mui/icons-material) v7
- Next.js 14.2+ and next-auth
- Emotion (@emotion/react, @emotion/styled)
- TanStack Table and Virtual (@tanstack/react-table, @tanstack/react-virtual)
- Various utilities (ky, uuid, yup, etc.)

**Do not add these as direct dependencies** - they must remain as peer dependencies.

## Common Pitfalls to Avoid

1. **Don't import from lib/**: Always import from src/ during development
2. **Don't add dependencies to dependencies**: New packages should go in peerDependencies or devDependencies
3. **Don't disable ESLint rules without justification**: The strict rules maintain code quality
4. **Don't skip JSDoc**: All public functions require documentation
5. **Don't modify package-lock.json manually**: Use npm commands
6. **Don't commit lib/ directory**: It's build output and git-ignored

## Special Notes

- **Storybook**: Available for component development (`npm run storybook`)
- **Husky hooks**: Pre-commit hooks are configured via `.husky`
- **Release management**: Uses release-please for automated versioning and changelog
- **Link for local development**: Use `npm link` to test changes in Data Browser locally (see README)

## Development with Data Browser

When developing findable-ui alongside the Data Browser:

1. Clone both repos in the same parent directory
2. In findable-ui: Run `npm ci`, bump version, run `npx tsc`
3. In data-browser/explorer: Run `npm link ../../findable-ui`
4. May need to comment out certain packages in next.config.mjs webpack config

See README.md for complete local development workflow.
