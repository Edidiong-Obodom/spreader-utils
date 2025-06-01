import { spreader } from "../spreader";

export function logActiveParams(paramNames: string[], paramValues: any[]) {
  const { name, value } = spreader(paramNames, paramValues, 0);
  console.log(`Active params: ${name}`);
  console.log("Values:", value);
}

// Usage example:
logActiveParams(["x", "y", "z"], [0, null, 42]);
