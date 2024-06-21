/* 
Function that accepts two strings (from, to) and returns a boolean:
Examples:
  - "BAL" to "LIB" returns true
  - "CON" to "JUU" returns false
  - "XBOX" to "XXBO" returns false
  - "XBOX" to "XOBX" returns true
  - "MMM" to "MID" returns false
  - "AA" to "MID" returns false
*/

import { describe, expect, it } from "vitest";
import { canReconfigure } from "../src/Examples/can-reconfigre";

describe("can-reconfigure", () => {
  it("should accept two strings as parameters", () => {
    const exp = /string.*two|two.*string/;

    expect(() => canReconfigure()).toThrow(exp);
    expect(() => canReconfigure(2)).toThrow(exp);
    expect(() => canReconfigure("a", 2)).toThrow(exp);
    expect(() => canReconfigure(NaN)).toThrow(exp);
    expect(() => canReconfigure("a", NaN)).toThrow(exp);
  });

  it("should return a boolean", () => {
    expect(canReconfigure("a", "b")).toBeTypeOf("boolean");
  });

  it("should return false is parameters has different length", () => {
    expect(canReconfigure("a", "ab")).toBe(false);
  });

  it("should return false if parameters has different length of unique leters", () => {
    expect(canReconfigure("aa", "ab")).toBe(false);
  });

  it("should return false if strings has different order of transformation", () => {
    expect(canReconfigure("XBOX", "XXBO")).toBe(false);
  });

  it("should return true if the transformation is correct", () => {
    expect(canReconfigure("XBOX", "XOBX")).toBe(true);
    expect(canReconfigure("BAL", "LIB")).toBe(true);
  });
});
