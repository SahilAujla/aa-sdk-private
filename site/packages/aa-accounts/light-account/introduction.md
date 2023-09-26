---
outline: deep
head:
  - - meta
    - property: og:title
      content: LightSmartContractAccount
  - - meta
    - name: description
      content: Overview of the LightSmartContractAccount class in aa-accounts
  - - meta
    - property: og:description
      content: Overview of the LightSmartContractAccount class in aa-accounts
---

# Light Account

`LightSmartContractAccount` is a simple, secure, and cost-effective smart account implementation which extends `SimpleSmartContractAccount` as an implementation of `BaseSmartContractAccount`. It supports features such as owner transfers, EIP-1271 message signing, and batched transactions. We recommend using Light Account for most use cases.

Notable differences between `LightSmartContrctAccount` and `SimpleSmartContractAccount` are implementations for:

1.  `signMessageWith6492` -- supports message signatures for deployed smart contract accounts, as well as undeployed accounts (counterfactual addresses) using EIP-6492.
2.  `signTypedData` -- supports typed data signatures from the smart contract account's owner address.
3.  `signTypedDataWith6492` -- supports typed data signatures for deployed smart contract accounts, as well as undeployed accounts (counterfactual addresses) using EIP-6492.
4.  `getOwner` -- returns the on-chain owner of the account.
5.  `encodeTransferOwnership` -- encodes the transferOwnership function call using the LightAccount ABI.
6.  `transferOwnership` -- transfers ownership of the account to a new owner, and returns either the UO hash or transaction hash.

## Usage

::: code-group

```ts [example.ts]
import { provider } from "./provider";

// sign message (works for undeployed and deployed accounts)
const signedMessageWith6492 = provider.signMessageWith6492("test");

// sign typed data
const signedTypedData = provider.signTypedData("test");

// sign typed data (works for undeployed and deployed accounts), using
const signedTypedDataWith6492 = provider.signTypedDataWith6492({
  types: {
    Request: [{ name: "hello", type: "string" }],
  },
  primaryType: "Request",
  message: {
    hello: "world",
  },
});

// get owner
const owner = provider.account.getOwner();

// encode transfer pownership
const newOwner = LocalAccountSigner.mnemonicToAccountSigner(NEW_OWNER_MNEMONIC);
const encodedTransferOwnershipData =
  LightSmartContractAccount.transferOwnership(newOwner);

// transfer ownership
const result = await LightSmartContractAccount.transferOwnership(
  provider,
  newOwner
  true, // wait for txn with UO to be mined
);
```

<<< @/snippets/provider.ts
:::
