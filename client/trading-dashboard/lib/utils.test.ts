import { formatCurrency, formatLargeNumber } from "./utils";

describe("utils", () => {
  test("formatCurrency formats USD correctly", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
    expect(formatCurrency(0.000123)).toMatch(/\$0\.000123/);
  });

  test("formatLargeNumber formats large values", () => {
    expect(formatLargeNumber(1_500_000)).toBe("$1.50M");
    expect(formatLargeNumber(2_000)).toBe("$2000.00");
  });
});
