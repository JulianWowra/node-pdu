# Protocol Description Unit

- 👉🏻 This package provides functions to parse and generate **Protocol Description Unit** (PDU) for the **Short Message Service** (SMS).
- ✉️ The use case is to **send and receive SMS messages** via **GSM modems** or mobile phones.
- 🏃 It is written in **TypeScript** and can be used in **Node.js and browser environments**.

[![NPM](https://nodei.co/npm/node-pdu.png)](https://npmjs.org/package/node-pdu)

## Install

```sh
npm install node-pdu
```

## Usage

Usage in TypeScript/JavaScript (with ES Modules):

```typescript
import { Deliver, parse, Submit } from 'node-pdu';

/*
 * Parse a PDU string
 */

const str = '07919730071111F1000B919746121611F10000811170021222230DC8329BFD6681EE6F399B1C02';
const out = parse(str);

if (out instanceof Deliver) {
  console.log(out.data.getText());
  // Output: "Hello, world!"
}

/*
 * Generate a PDU string
 */

const address = '+999999999999';
const data = 'Hello everyone!';

const submit = new Submit(address, data);

console.log(submit.toString());
// Output: "0001000C9199999999999900000FC8329BFD0695ED6579FEED2E8700"
```

## 📚 Full documentation

Click [here](https://julianwowra.github.io/node-pdu/).

## 🧪 Test script

A small script allows you to scan the library for significant errors.

Clone the repository, [enable pnpm](https://pnpm.io/installation#using-corepack), download the dependencies (`pnpm i`) and run:

```sh
pnpm test
```

---

## ❤️ Contributors

**Thanks to these people who have contributed to this project:**

[![Contributors](https://contrib.rocks/image?repo=julianwowra/node-pdu)](https://github.com/julianwowra/node-pdu/graphs/contributors)

Made with [contrib.rocks](https://contrib.rocks).
