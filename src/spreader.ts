/**
 * Generates a structured object from aligned `names` and `values` arrays,
 * filtering out invalid values and formatting the output for dynamic query or payload usage.
 *
 * ### Description
 * This utility function is ideal for dynamically constructing stringified name lists,
 * parameterized placeholders (e.g., `$1, $2, ...`), and filtered value arrays — commonly used in
 * SQL queries, templating engines, or API request bodies.
 *
 * By default, it **skips invalid values**, which include:
 * - `null`
 * - `undefined`
 * - empty arrays (`[]`)
 * - empty objects (`{}`)
 * - empty strings (including whitespace-only: " ")
 *
 * You can override this behavior by passing a custom `isValid` function.
 *
 * ### Parameters
 * @param names - An array of string labels corresponding to the values (e.g., column or field names).
 * @param values - An array of values matched by index to `names`.
 * @param lastNumber - The last index used for placeholder numbering; used to generate sequential `$` placeholders.
 * @param isValid - *(Optional)* A predicate function to determine which values are considered valid.
 *                  Defaults to a filter that removes nulls, undefined, empty arrays, empty objects, and empty strings (including whitespace-only: " ").
 *
 * ### Returns
 * An object containing:
 * - `name`: A comma-separated string of valid field names.
 * - `numberDollar`: A comma-separated string of `$`-prefixed placeholder numbers (e.g., `$1, $2`).
 * - `value`: A filtered array of values that passed the validity check.
 *
 * ### Example
 * ```ts
 * spreader(["username", "tags", "metadata"], ["johndoe", [], {}], 0);
 * // Returns:
 * // {
 * //   name: "username",
 * //   numberDollar: "$1",
 * //   value: ["johndoe"]
 * // }
 * ```
 */
export const spreader = (
  names: string[],
  values: any[],
  lastNumber: number,
  isValid: (val: any) => boolean = (val) => {
    if (val === null || val === undefined) return false;

    // Filter out empty strings (including whitespace-only)
    if (typeof val === "string" && val.trim() === "") return false;

    // Filter out empty arrays
    if (Array.isArray(val) && val.length === 0) return false;

    // Filter out empty objects (but not arrays)
    if (typeof val === "object" && !Array.isArray(val)) {
      return Object.keys(val).length > 0;
    }

    return true;
  }
) => {
  if (names.length !== values.length) {
    return {
      name: "",
      numberDollar: "",
      value: [],
    };
  }

  const filtered: { name: string; value: any; index: number }[] = [];

  values.forEach((val, i) => {
    if (isValid(val)) {
      filtered.push({ name: names[i], value: val, index: i });
    }
  });

  const nameList = filtered
    .map(
      // Avoid leading comma only when starting from scratch
      (entry, i) => `${!lastNumber && i === 0 ? "" : ", "}${entry.name}`
    )
    .join(", ");
  const numberDollar = filtered
    .map(
      // Avoid leading comma only when starting from scratch
      (_, i) => `${!lastNumber && i === 0 ? "" : ", "}$${lastNumber + i + 1}`
    )
    .join(", ");
  const valueList = filtered.map((entry) => entry.value);

  return {
    name: nameList,
    numberDollar,
    value: valueList,
  };
};
