import { describe, expect, it } from "vitest";
import { capacity } from "@/data/stays";

describe("capacity", () => {
  it("1 doble + 1 simple = 3 personas", () => expect(capacity(1, 1)).toBe(3));
  it("sin camas = 0 personas", () => expect(capacity(0, 0)).toBe(0));
});
