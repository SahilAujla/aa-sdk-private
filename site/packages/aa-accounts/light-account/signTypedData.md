---
outline: deep
head:
  - - meta
    - property: og:title
      content: LightSmartContractAccount
  - - meta
    - name: description
      content: Overview of the signTypedData method on LightSmartContractAccount
  - - meta
    - property: og:description
      content: Overview of the signTypedData method on LightSmartContractAccount
---

# signTypedData

`signTypedData` supports signing typed data from the smart contract account's owner address.

## Usage

::: code-group

```ts [example.ts]
import { provider } from "./provider";

// sign typed data
const signedTypedData = provider.signTypedData({
  domain: {
    name: "Ether Mail",
    version: "1",
    chainId: 1,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  },
  types: {
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "string" },
    ],
  },
  primaryType: "Mail",
  message: {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  },
});
```

<<< @/snippets/provider.ts
:::

## Returns

### `Promise<Hash>`

A Promise containing the signature of the typed data.

## Parameters

### `params: SignTypedDataParams` -- the typed data to sign
