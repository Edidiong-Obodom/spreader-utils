import { spreader } from "../spreader";

const paramNames = ["category", "status", "dateFrom", "dateTo"];
const paramValues = ["books", "", null, "2025-01-01"];

const { name, numberDollar, value } = spreader(paramNames, paramValues, 0);

console.log("Names:", name); // "category, dateTo"
console.log("NumberDollar:", numberDollar); // "$1, $2"
console.log("Values:", value); // ["books", "2025-01-01"]

const query = `SELECT * FROM products WHERE ${name
  .split(", ")
  .map((n, i) => `${n} = ${numberDollar.split(", ")[i]}`)
  .join(" AND ")}`;

console.log("Query:", query);
