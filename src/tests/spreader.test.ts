import { spreader } from "../../src/spreader";

describe("spreader utility", () => {
  it("filters out invalid values and matches names", () => {
    const names = ["a", "b", "c"];
    const values = [null, "hello", {}];
    const result = spreader(names, values, 0);

    expect(result.name).toBe("b");
    expect(result.value).toEqual(["hello"]);
    expect(result.numberDollar).toBe("$1");
  });
});
