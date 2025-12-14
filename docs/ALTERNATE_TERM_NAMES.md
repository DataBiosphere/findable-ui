# Alternate Term Names

This feature allows consuming applications to provide alternate display names for facet terms in the UI filtering system.

## Overview

The alternate term names system provides a way to display user-friendly names for facet terms while maintaining the original term values for filtering and data operations.

### Use Cases

- **Synonyms**: Display "Human" instead of "Homo sapiens"
- **UI Localization**: Show translated terms in different languages
- **User-friendly phrasing**: Replace technical terms with more accessible language

## Setup

### 1. Add the Provider

Wrap your application with the `AlternateTermNamesProvider` at a high level (typically alongside other providers):

```tsx
import { AlternateTermNamesProvider } from "@databiosphere/findable-ui/lib/providers/alternateTermNames/alternateTermNames";

function App() {
  return (
    <AlternateTermNamesProvider>
      {/* Your app components */}
    </AlternateTermNamesProvider>
  );
}
```

### 2. Create the Alternate Names File

Create a file at `/public/fe-api/alternateTermNames.json` in your app with the following structure:

```json
{
  "facetName": {
    "originalTermName": "Alternate Display Name"
  }
}
```

**Example:**

```json
{
  "species": {
    "Homo sapiens": "Human",
    "Mus musculus": "Mouse",
    "Rattus norvegicus": "Rat"
  },
  "tissue": {
    "cerebral cortex": "Brain Cortex",
    "myocardium": "Heart Muscle"
  }
}
```

## Behavior

### File Loading

- The file is loaded **once** when the app initializes
- The file is **optional** - if it doesn't exist, the system continues without errors
- If the file is missing or fails to load, facet terms display their original names

### Term Display

- When an alternate name is defined, it will be displayed in facet selection UI
- The original term name is still used for filtering and data operations
- If no alternate name is found for a term, the original name is displayed

### Fallback Behavior

The system is robust to various error conditions:

- **File not found**: No errors, terms display original names
- **Empty file**: Terms display original names
- **Missing facet**: Terms for that facet display original names
- **Missing term**: That specific term displays its original name
- **JSON parse error**: No errors, terms display original names

## Data Flow

1. **Term Creation**: Terms are created in `bindFacetTerms` with both `name` (original) and `alternateName` (if available)
2. **Term Display**: UI components use `term.alternateName ?? term.name` to display the user-friendly name
3. **Term Operations**: Filtering and data operations continue to use `term.name` (the original value)

## Important Notes

- **Facet UI Only**: Alternate names are used only in facet selection UI, not in result tables or data rows
- **Case Sensitive**: Term name matching is case-sensitive
- **Performance**: The file is loaded once and cached in memory for the session
- **No Retries**: There are no automatic retries if the file fails to load

## Testing

When testing alternate term names:

```typescript
import { AlternateTermNamesProvider } from "@databiosphere/findable-ui/lib/providers/alternateTermNames/alternateTermNames";
import { useAlternateTermNames } from "@databiosphere/findable-ui/lib/providers/alternateTermNames/useAlternateTermNames";

// In your test
const wrapper = ({ children }) => (
  <AlternateTermNamesProvider>{children}</AlternateTermNamesProvider>
);

// Mock the fetch call
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({
    species: { "Homo sapiens": "Human" },
  }),
});
```

## Migrating Existing Applications

1. Add the `AlternateTermNamesProvider` to your app's provider hierarchy
2. Create the `/public/fe-api/alternateTermNames.json` file (optional)
3. No code changes are required in components that display facet terms

The system is backward compatible - applications that don't provide alternate names will continue to work exactly as before.
