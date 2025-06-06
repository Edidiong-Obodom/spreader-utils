# Spreader Utils 📌

A lightweight, flexible utility for dynamically filtering and mapping lists of field names and values—perfect for building parameterized queries, payloads, and dynamic forms.

## ✨ Features

- **Smart Filtering**: Automatically removes `null`, `undefined`, empty strings, arrays, and objects.
- **Dynamic Parameterization**: Generates placeholders (`$1`, `$2`, etc.) for easy query building.
- **Structured Output**: Returns a well-organized object ideal for database queries and template substitutions.
- **TypeScript Support**: Fully compatible with TypeScript for safe and scalable development.
- **Custom Validation**: Define custom logic via the `isValid` parameter.

## 📦 Installation

Install using your favorite package manager:

```bash
npm install spreader-utils
```

```bash
yarn add spreader-utils
```

```bash
pnpm add spreader-utils
```

## 🚀 Usage

### Basic Example

```ts
import { spreader } from "spreader-utils";

const names = ["firstName", "lastName", "age", "email"];
const values = ["John", "Doe", null, ""];
const result = spreader(names, values, 0);

console.log(result);
/*
{
  name: "firstName, lastName",
  numberDollar: "$1, $2",
  value: ["John", "Doe"],
  objectify: { firstName: "John", lastName: "Doe" }
}
*/
```

### Custom Validation Example

You can apply custom validation logic to filter values based on specific conditions:

```ts
const customValidator = (val: any) => typeof val === "number" && val > 0;
const result = spreader(["price", "discount"], [0, 15], 0, customValidator);
/*
{
  name: "discount",
  numberDollar: "$1",
  value: [15]
}
*/
```

## 🔧 API

### `spreader(names, values, lastNumber, isValid?)`

#### Parameters

| Parameter    | Type                     | Description                                                                                  |
|-------------|-------------------------|----------------------------------------------------------------------------------------------|
| `names`     | `string[]`               | Array of field names.                                                                       |
| `values`    | `any[]`                  | Array of corresponding values.                                                              |
| `lastNumber`| `number`                 | Offset used for `$` placeholders.                                                           |
| `isValid`   | `(val: any) => boolean`  | Optional custom validation function (default filters `null`, `undefined`, empty strings, etc.). |

#### Returns

An object:

```ts
{
  name: string;        // Comma-separated field names (e.g., "firstName, lastName")
  numberDollar: string; // Comma-separated placeholders (e.g., "$1, $2")
  value: any[];        // Array of filtered values
  objectify: {         // Object representation of key-value pairs
    [key: string]: any
  }
}
```

## 📁 Project Structure

```
spreader-utils/
├── src/                     # Source code directory
│   ├── examples/            # Example scripts demonstrating usage
│   │   ├── apiRequest.ts    # Handles API request operations
│   │   ├── cliArgs.ts       # Parses command-line arguments efficiently
│   │   ├── csvCleaner.ts    # Cleans and processes CSV data
│   │   ├── formSummary.ts   # Generates summaries from form input data
│   │   ├── gameInventory.ts # Manages game inventory dynamically
│   │   └── logging.ts       # Provides logging utilities
│   ├── tests/               # Unit tests for validation
│   │   └── spreader.test.ts # Test suite for `spreader` functionality
│   ├── index.ts             # Main entry point for the package
│   └── spreader.ts          # Core logic for filtering and mapping values
├── .gitignore               # Specifies ignored files in version control
├── README.md                # Project documentation and usage guide
├── package-lock.json        # Ensures consistent dependency versions
├── package.json             # Contains package metadata and dependencies
├── publish.js               # Automates package publishing process
└── tsconfig.json            # TypeScript configuration for compiling source code
```

## 🧪 Local Testing

Before publishing, ensure everything is working:

```bash
npm run build
npm pack --dry-run
```

## 📜 License

This project is licensed under the **MIT License**.

## 👤 Author

**Edidiong Obodom**  
GitHub: [@edidiong-obodom](https://github.com/Edidiong-Obodom)

---

Enjoy clean and efficient data filtering! 🚀✨

---
