import { rollDice } from "../src/utils/common.js";

describe("rollDice function", () => {
  test("returns a number between 1 and 6", () => {
    const result = rollDice();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });

  test("returns an integer", () => {
    const result = rollDice();
    expect(Number.isInteger(result)).toBe(true);
  });
});
