````markdown
# spreader

A lightweight, flexible utility to dynamically filter and map lists of field names and values — particularly useful when building parameterized queries, payloads, or dynamic forms.

---

## ✨ Features

- Filters out `null`, `undefined`, empty strings, arrays, and objects by default
- Auto-generates parameter names like `$1`, `$2`, etc.
- Returns a structured object ready for database queries or template substitutions
- Fully TypeScript-compatible
- Customizable validation logic via `isValid` parameter

---

## 📦 Installation

```bash
npm install spreader
````

or with yarn:

```bash
yarn add spreader
```

---

## 🚀 Usage

### Basic Example

```ts
import { spreader } from 'spreader';

const names = ['firstName', 'lastName', 'age', 'email'];
const values = ['John', 'Doe', null, ''];

const result = spreader(names, values, 0);

console.log(result);
/*
{
  name: 'firstName, lastName',
  numberDollar: '$1, $2',
  value: ['John', 'Doe']
}
*/
```

---

## 🧩 Custom Validation Example

```ts
const customValidator = (val: any) => typeof val === 'number' && val > 0;

const result = spreader(['price', 'discount'], [0, 15], 0, customValidator);
/*
{
  name: 'discount',
  numberDollar: '$1',
  value: [15]
}
*/
```

---

## 🛠 API

### `spreader(names, values, lastNumber, isValid?)`

#### Parameters

| Name         | Type                    | Description                                                                                                                         |
| ------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `names`      | `string[]`              | Array of field names.                                                                                                               |
| `values`     | `any[]`                 | Array of corresponding values.                                                                                                      |
| `lastNumber` | `number`                | Offset used to continue `$` placeholders.                                                                                           |
| `isValid`    | `(val: any) => boolean` | Optional custom validation function. Defaults to filtering out `null`, `undefined`, empty strings, empty arrays, and empty objects. |

#### Returns

An object:

```ts
{
  name: string;         // Comma-separated names (e.g., "firstName, lastName")
  numberDollar: string; // Comma-separated placeholders (e.g., "$1, $2")
  value: any[];         // Array of filtered values
}
```

---

## 📁 Project Structure

```
spreader/
├── dist/
│   └── index.js
├── src/
│   └── spreader.ts
├── package.json
├── README.md
├── LICENSE
└── tsconfig.json
```

---

## 🧪 Local Testing

Before publishing:

```bash
npm run build
npm pack --dry-run
```

---

## 📜 License

MIT License

```
MIT License

Copyright (c) 2025 Edidiong Obodom

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  
THE SOFTWARE.
```

---

## 🔗 Author

**Edidiong Obodom**
[@edidiong-obodom](https://github.com/Edidiong-Obodom)

---

Enjoy clean and reliable data mapping ✨

```
