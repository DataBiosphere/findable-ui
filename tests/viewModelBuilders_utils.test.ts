import {
  sanitizeString,
  sanitizeStringArray,
} from "../src/viewModelBuilders/common/utils";

// sanitizeString tests:

test('sanitize "" to "Unspecified"', () => {
  expect(sanitizeString("")).toBe("Unspecified");
});

test('sanitize null to "Unspecified"', () => {
  expect(sanitizeString(null as any)).toBe("Unspecified");
});

test('sanitize undefined to "Unspecified"', () => {
  expect(sanitizeString(undefined as any)).toBe("Unspecified");
});

test('sanitize "example" with no change', () => {
  expect(sanitizeString("example")).toBe("example");
});

// sanitizeStringArray tests:

test('sanitize null string array to ["Unspecified"]', () => {
  expect(sanitizeStringArray(null as any)).toStrictEqual(["Unspecified"]);
});

test('sanitize empty string array to ["Unspecified"]', () => {
  expect(sanitizeStringArray([])).toStrictEqual(["Unspecified"]);
});

test("sanitize string array containing null, undefined, and empty string values", () => {
  expect(
    sanitizeStringArray([
      "a",
      "",
      null,
      "b",
      "c",
      undefined,
      null,
      "d",
      "e",
    ] as any)
  ).toStrictEqual([
    "a",
    "Unspecified",
    "Unspecified",
    "b",
    "c",
    "Unspecified",
    "Unspecified",
    "d",
    "e",
  ]);
});
