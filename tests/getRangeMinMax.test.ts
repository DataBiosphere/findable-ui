import {
  getRangeMax,
  getRangeMin,
} from "../src/common/categories/views/range/utils";

describe("getRangeMin", () => {
  it("returns the min from a valid tuple", () => {
    expect(getRangeMin([5, 100])).toBe(5);
  });

  it("returns 0 when the min is 0", () => {
    expect(getRangeMin([0, 61.31])).toBe(0);
  });

  it("returns -Infinity when minMax is undefined", () => {
    expect(getRangeMin(undefined)).toBe(-Infinity);
  });

  it("returns a negative min", () => {
    expect(getRangeMin([-10, 50])).toBe(-10);
  });
});

describe("getRangeMax", () => {
  it("returns the max from a valid tuple", () => {
    expect(getRangeMax([5, 100])).toBe(100);
  });

  it("returns 0 when the max is 0", () => {
    expect(getRangeMax([-10, 0])).toBe(0);
  });

  it("returns Infinity when minMax is undefined", () => {
    expect(getRangeMax(undefined)).toBe(Infinity);
  });

  it("returns a negative max", () => {
    expect(getRangeMax([-50, -10])).toBe(-10);
  });
});
