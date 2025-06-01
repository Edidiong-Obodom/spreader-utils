import { spreader } from "../spreader";

const argNames = ["--input", "--output", "--verbose"];
const argValues = ["file.txt", "", false];

const summary = spreader(argNames, argValues, 0);

console.log(`Used arguments: ${summary.name}`);  // "--input"
console.log("Values:", summary.value);           // ["file.txt"]
