---
outline: deep
head:
  - - meta
    - property: og:title
      content: waitForUserOperationTransaction
  - - meta
    - name: description
      content: Overview of the waitForUserOperationTransaction method on ISmartAccountProvider
  - - meta
    - property: og:description
      content: Overview of the waitForUserOperationTransaction method on ISmartAccountProvider
---

# waitForUserOperationTransaction

Attempts to fetch for UserOperationReceipt `txMaxRetries` amount of times, at an interval of `txRetryIntervalMs` milliseconds (with a multiplier of `txRetryMulitplier`) using the connected account.

The transaction hash that includes the user operation is returned once the user operation has been included in a block (if included before retrying `txMaxRetries` times).

`txMaxRetries`, `txRetryIntervalMs`, and `txRetryMulitplier` can be configured in the smart account provider configuration  options.
<!-- TODO: link to constructor -->

## Usage

::: code-group

```ts [example.ts]
import { provider } from "./provider";

const userOperationResult = await provider.sendUserOperation({
  data: "0xCalldata",
  target: "0xTarget",
  value: 0n,
});

// [!code focus:99]
provider.waitForUserOperationTransaction({
    hash: result.hash
});
```

<<< @/snippets/provider.ts
:::

## Returns

### `Promise<hash: Hash>`

A Promise containing the hash of the transaction the user operation was included in.

If `txMaxRetries` is exceeded without the user operation included in a block yet, this endpoint will throw an error. You should handle this by retrying with a higher fee and/or changing the retry configurations.

## Parameters

### `hash`

- #### Type: `Hash`
The hash of the user operation returned from [sendUserOperation](./sendUserOperation).
<!-- TODO: link to hash type -->
::: code-group

```ts [example.ts]
import { provider } from "./provider";

provider.waitForUserOperationTransaction({
  hash: "0xUserOpResultHash", // [!code focus]
});
```
:::