import { spreader } from "../spreader";

const headers = ["Name", "Age", "Email", "Phone"];
const row = ["Bob", "", "bob@example.com", {}];

const cleaned = spreader(headers, row, 0);
console.log(cleaned.name); // "Name, Email"
console.log(cleaned.value); // ["Bob", "bob@example.com"]
