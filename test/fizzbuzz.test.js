/* Function that accepts a number as a parameter and returns:
- "fizz" if the number is a multiple of 3
- "buzz" if the number is a multiple of 5
- "fizzbuzz" if the number is a multiple of both 3 and 5
- the number itself if none of the above cases apply
*/

import { describe, expect, it } from "vitest";
import { fizzbuzz } from "../src/Examples/fizzbuzz"

describe("fizzbuzz", () => {
  it("should accept only a number as parameter", () => {
    expect(() => fizzbuzz()).toThrow("number");
    expect(() => fizzbuzz("a")).toThrow("number");
    expect(() => fizzbuzz(NaN)).toThrow("number");
  });

  it("should return 1 if parameter is 1", () => {
    expect(fizzbuzz(1)).toBe(1);
  });

  it("should return 2 if parameter is 2", () => {
    expect(fizzbuzz(2)).toBe(2);
  });

  it("should return 'fizz' if parameter is multiple of 3", () => {
    expect(fizzbuzz(3)).toBe("fizz");
    expect(fizzbuzz(6)).toBe("fizz");
    expect(fizzbuzz(9)).toBe("fizz");
  });

  it("should return 'buzz' if parameter is multiple of 5", () => {
    expect(fizzbuzz(5)).toBe("buzz");
    expect(fizzbuzz(10)).toBe("buzz");
    expect(fizzbuzz(20)).toBe("buzz");
  });

  it("should return 'fizzbuzz' if parameter is multiple of 3 and 5", () => {
    expect(fizzbuzz(15)).toBe("fizzbuzz");
    expect(fizzbuzz(30)).toBe("fizzbuzz");
    expect(fizzbuzz(45)).toBe("fizzbuzz");
  });
});
